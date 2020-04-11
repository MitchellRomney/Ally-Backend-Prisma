import { schema } from 'nexus'
import { getSummoner } from "../../services/riot/Summoner"
import {
  getCSQuickStat,
  getKDAQuickStat,
  getVisionScoreQuickStat,
  getWinrateQuickStat, saveSummoner
} from "../../services/ally/Summoner";
import { fetchSummonerParticipants } from "../../services/ally/Participant"
import { Participant } from "@prisma/client";

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('summoner', {
      type: 'Summoner',
      nullable: true,
      args: {
        server: schema.stringArg({ nullable: false }),
        summonerName: schema.stringArg({ nullable: false }),
        summonerId: schema.stringArg({ nullable: true })
      },
      async resolve(parent, { server, summonerName, summonerId }, ctx) {
        return summonerId
          ? ctx.db.summoner.findOne({
            where: { server_summonerId: { server: server, summonerId: summonerId } }
          })
          : ctx.db.summoner.findOne({
            where: { server_summonerName: { server: server, summonerName: summonerName } }
          })
      }
    })
  }
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('allSummoners', {
      type: 'Summoner',
      nullable: true,
      list: true,
      async resolve(parent, {}, ctx) {
        return await ctx.db.summoner.findMany()
      }
    })
  }
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('getSummonerProfile', {
      type: 'SummonerProfile',
      nullable: true,
      args: {
        server: schema.stringArg({ nullable: false }),
        summonerName: schema.stringArg({ nullable: false }),
        amount: schema.intArg({ nullable: true })
      },
      async resolve(parent, { server, summonerName, amount }, ctx) {
        let summonerNotFound = false
        let participants: Participant[] = []
        const getAmount = amount ? amount : 10

        let summoner = await ctx.db.summoner.findOne({
          where: { server_summonerName: { server: server, summonerName: summonerName } }
        })

        if (!summoner) {
          summoner = await getSummoner(summonerName, server).then(summonerData => {
            if (summonerData) {
              return saveSummoner(summonerData, server, ctx)
            } else {
              return null
            }
          })
        }

        if (summoner && !summonerNotFound) {
          participants = await fetchSummonerParticipants(server, summoner.summonerId, summoner.accountId, getAmount, ctx)
        }

        return {
          summoner: summoner,
          matches: participants,
          quickStats: [
            // await getWinrateQuickStat(participants),
            // await getCSQuickStat(participants),
            // await getKDAQuickStat(participants),
            // await getVisionScoreQuickStat(participants)
          ]
        }
      }
    })
  }
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('getQuickStats', {
      type: 'QuickStat',
      list: true,
      nullable: true,
      args: {
        server: schema.stringArg({ nullable: false }),
        summonerId: schema.stringArg({ nullable: false }),
        accountId: schema.stringArg({ nullable: false })
      },
      async resolve(parent, { server, summonerId, accountId }, ctx) {
        await fetchSummonerParticipants(server, summonerId, accountId, 40, ctx)

        // Fetch latest 40 participants.
        const latestParticipants = await ctx.db.participant.findMany({
          where: { summoner: { server: server, summonerId: summonerId } },
          select: { win: true, visionScore: true, kills: true, deaths: true, assists: true },
          first: 40
        })

        return [
          await getWinrateQuickStat(latestParticipants),
          await getCSQuickStat(latestParticipants),
          await getKDAQuickStat(latestParticipants),
          await getVisionScoreQuickStat(latestParticipants)
        ]
      }
    })
  }
})