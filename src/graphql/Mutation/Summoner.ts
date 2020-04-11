import { schema } from "nexus";


schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addSummonerToUser', {
      type: 'User',
      args: {
        server: schema.stringArg({ nullable: false }),
        summonerId: schema.stringArg({ nullable: false }),
        userId: schema.intArg(),
      },
      async resolve(_parent, { server, summonerId, userId }, ctx) {
        const summoner = await ctx.db.summoner.findOne(
          {
            where: {
              server_summonerId: { server, summonerId }
            }
          })

        if (!summoner) {
          throw new Error('No summoner found.')
        }

        return ctx.db.user.update({
          where: { userId },
          data: {
            summoners: {
              connect: [{ id: summoner.id }]
            }
          }
        })
      }
    })
  }
})
