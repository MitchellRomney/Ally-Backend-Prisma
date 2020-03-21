import { stringArg, intArg, mutationField } from "nexus";

export const addSummonerToUser = mutationField('addSummonerToUser', {
  type: 'User',
  args: {
    server: stringArg({ nullable: false }),
    summonerId: stringArg({ nullable: false }),
    userId: intArg(),
  },
  async resolve(_parent, { server, summonerId, userId }, ctx) {
    const summoner = await ctx.prisma.summoner.findOne(
      {
        where: {
          server_summonerId: { server, summonerId }
        }
      })

    if (!summoner) {
      throw new Error('No summoner found.')
    }

    return ctx.prisma.user.update({
      where: { userId },
      data: {
        summoners: {
          connect: [{ id: summoner.id }]
        }
      }
    })
  }
})