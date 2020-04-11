import { schema } from "nexus"

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('allSummonerSpells', {
      type: 'SummonerSpell',
      nullable: true,
      list: true,
      async resolve(parent, args,  ctx) {
        return await ctx.db.summonerSpell.findMany()
      }
    })
  }
})