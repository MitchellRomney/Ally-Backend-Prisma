import { schema } from "nexus"

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('allChampions', {
      type: 'Champion',
      nullable: true,
      list: true,
      async resolve(parent, args,  ctx) {
        return await ctx.db.champion.findMany()
      }
    })
  }
})