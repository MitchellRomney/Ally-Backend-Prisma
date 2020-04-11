import { schema } from "nexus"

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('allItems', {
      type: 'Item',
      nullable: true,
      list: true,
      async resolve(parent, args,  ctx) {
        return await ctx.db.item.findMany()
      }
    })
  }
})