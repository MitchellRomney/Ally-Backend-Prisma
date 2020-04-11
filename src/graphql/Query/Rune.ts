import { schema } from "nexus"

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('allRunes', {
      type: 'Rune',
      nullable: true,
      list: true,
      async resolve(parent, args,  ctx) {
        return await ctx.db.rune.findMany()
      }
    })
  }
})