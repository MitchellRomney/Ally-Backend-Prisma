import { schema } from "nexus";

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('match', {
      type: 'Match',
      nullable: true,
      args: {
        gameId: schema.intArg({ nullable: false })
      },
      async resolve(parent, { gameId }, ctx) {
        return ctx.db.match.findOne({ where: { gameId: gameId } })
      }
    })
  }
})