import { schema } from "nexus"
import { fetchSummonerParticipants } from "../../services/ally/Participant"
import { redisClient } from "../../app"

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('participants', {
      type: 'Participant',
      list: true,
      args: {
        server: schema.stringArg({ required: false }),
        summonerId: schema.stringArg({ required: false }),
        summonerName: schema.stringArg({ required: false })
      },
      async resolve(parent, { server, summonerId, summonerName }, ctx) {
        if (server && (summonerId || summonerName)) {
          return summonerId
            ? ctx.db.participant.findMany({ where: { summoner: { server: server, summonerId: summonerId } } })
            : ctx.db.participant.findMany({ where: { summoner: { server: server, summonerName: summonerName } } })
        } else {
          return ctx.db.participant.findMany()
        }
      }
    })
  }
})

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('getSummonerParticipants', {
      type: 'Participant',
      list: true,
      args: {
        server: schema.stringArg({ required: true }),
        summonerId: schema.stringArg({ required: true }),
        accountId: schema.stringArg({ required: true }),
        amount: schema.intArg()
      },
      async resolve(parent, { server, summonerId, accountId, amount }, ctx) {
        return await fetchSummonerParticipants(server, summonerId, accountId, amount, ctx)
      }
    })
  }
})