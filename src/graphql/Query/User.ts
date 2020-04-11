import { schema } from 'nexus'
import { getUserId } from '../../utils'

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      async resolve(parent, args, ctx) {
        const userId = getUserId(ctx)
        return ctx.db.user.findOne({
          where: {
            userId: Number(userId),
          },
        })
      }
    })
  }
})