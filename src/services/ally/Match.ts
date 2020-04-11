import { createMatchParticipants, createMatchTeams } from "./Participant"
import * as async from "async";
import { getSummoner } from "../riot/Summoner";
import { saveSummoner } from "./Summoner";
import { Enumerable, Match, Summoner, SummonerWhereInput } from "@prisma/client";
import { log } from "nexus"
import { SummonerQueue } from "../../jobs/queues"

export async function saveMatches(matchList: any[], ctx: any) {

  // Make sure all Summoners exist for all games before building Match/Participant data for any.
  await prepareSummoners(matchList, ctx)

  // Save all Match & Participant to database.
  await async.each(matchList, async function (matchData, matchCallback) {

    ctx.db.match.create({
      data: {
        dateCreated: new Date(),
        dateModified: new Date(),
        gameDuration: matchData.gameDuration,
        gameId: matchData.gameId,
        gameMode: matchData.gameMode,
        gameType: matchData.gameType,
        gameVersion: matchData.gameVersion,
        mapId: matchData.mapId,
        queueId: matchData.queueId,
        seasonId: matchData.seasonId,
        server: matchData.platformId,
        timestamp: new Date(matchData.gameCreation),
      }
    }).then(async (match: Match) => {
      Promise.all([createMatchTeams(matchData, match, ctx), createMatchParticipants(matchData, match, ctx)])
        .then(() => {
          matchCallback()
        })
    }).catch((err: any) => log.error(err.message))
  })
}

export async function prepareSummoners(matchList: any, ctx: any) {
  const allParticipants: any[] = []
  const summonerDict: { [server: string]: string[] } = {}
  const existingSummonerDict: { [server: string]: string[] } = {}
  const databaseConditions: Enumerable<SummonerWhereInput> = []

  // Build dictionary of all necessary Summoners.
  matchList.forEach((match: any) => {
    match.participantIdentities.forEach((participantObject: any) => {
      if (participantObject["player"].summonerId) {
        const server = participantObject["player"].currentPlatformId
        const summonerId = participantObject["player"].summonerId

        if (summonerDict[server]) {
          if (!summonerDict[server].includes(summonerId)) {
            allParticipants.push(participantObject)
            summonerDict[server].push(summonerId)
          }
        } else {
          allParticipants.push(participantObject)
          summonerDict[server] = [summonerId]
        }
      }
    })
  })

  // Build database conditional search for all Summoners.
  Object.keys(summonerDict).forEach(server => {
    databaseConditions.push({ server: server, summonerId: { in: summonerDict[server] } })
  })

  // Get all existing Summoners in the database.
  const existing = await ctx.db.summoner.findMany({
    where: { OR: databaseConditions }, select: { summonerId: true, server: true, summonerName: true }
  })

  // Build existing Summoner dictionary.
  existing.forEach((summoner: Summoner) => {
    if (existingSummonerDict[summoner.server]) {
      existingSummonerDict[summoner.server].push(summoner.summonerId)
    } else {
      existingSummonerDict[summoner.server] = [summoner.summonerId]
    }
  })

  let totalSummoners = 0
  let totalExistingSummoners = 0

  Object.keys(summonerDict).forEach(server => {
    totalSummoners += summonerDict[server].length
  })

  Object.keys(existingSummonerDict).forEach(server => {
    totalExistingSummoners += existingSummonerDict[server].length
  })

  await async.each(allParticipants, async function (participantObject: any, participantCallback) {

    const participantAccountInfo = participantObject["player"]
    const isBot = !participantAccountInfo.summonerId
    const server = participantAccountInfo.currentPlatformId

    if (!isBot && (!existingSummonerDict[server] || !existingSummonerDict[server].includes(participantAccountInfo.summonerId))) {
      log.info(`Creating New Summoner: ${participantAccountInfo.summonerName} [${server}] [${participantAccountInfo.summonerId}]`)
      await ctx.db.summoner.create({
        data: {
          server: server,
          summonerName: participantAccountInfo.summonerName,
          summonerId: participantAccountInfo.summonerId,
          accountId: participantAccountInfo.currentAccountId,
          profileIconId: participantAccountInfo.profileIcon,
        }
      }).then(() => {
        participantCallback()
        SummonerQueue.add({
          test: 'Test'
        })
        getSummoner(participantAccountInfo.summonerName, server, participantAccountInfo.summonerId).then(summoner => {
          saveSummoner(summoner, server, ctx)
        })
      }).catch((error: any) => {
        log.error(error)
        log.info(participantAccountInfo.summonerId)
        console.log(existingSummonerDict[server])
        participantCallback()
      })
    } else {
      participantCallback()
    }
  })
}