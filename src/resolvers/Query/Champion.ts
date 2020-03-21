import { queryField } from "nexus";

export const allChampions = queryField('allChampions', {
  type: 'Champion',
  nullable: true,
  list: true,
  async resolve(parent, {},  ctx) {
    return await ctx.prisma.champion.findMany()
  }
})