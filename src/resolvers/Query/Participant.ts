import { intArg, queryField, stringArg } from "nexus";
import { getMatchList, getMatch } from "../../services/riot/Match"
import { saveMatch } from "../../services/ally/Match"
import { Match } from "@prisma/client";
import * as async from 'async'

export const getSummonerParticipants = queryField('getSummonerParticipants', {
  type: 'Participant',
  list: true,
  args: {
    server: stringArg({ nullable: false }),
    summonerId: stringArg({ nullable: false }),
    accountId: stringArg({ nullable: false }),
    amount: intArg()
  },
  async resolve(parent, { server, summonerId, accountId, amount }, ctx) {
    const returnAmount = amount ? amount : 10
    const riotResponse = await getMatchList(accountId, server, returnAmount)
    const matches = riotResponse.data.matches
    const gameIdList: number[] = []
    const existingMatchIdList: number[] = []

    matches.forEach((match: Match) => gameIdList.push(match.gameId))

    const existingMatches = await ctx.prisma.match.findMany({
      where: {
        gameId: {
          in: gameIdList
        }
      }
    })

    existingMatches.forEach(match => existingMatchIdList.push(match.gameId))

    const newGames: number[] = gameIdList.filter(gameId => !existingMatchIdList.includes(gameId))

    if (newGames.length > 0) {
      await async.each(newGames, function(gameId) {
        getMatch(gameId, server).then(result => saveMatch(result.data, ctx))
      })
    }

    return await ctx.prisma.participant.findMany({
      where: {
        summoner: {
          server,
          summonerId
        }
      }
    })
  }
})