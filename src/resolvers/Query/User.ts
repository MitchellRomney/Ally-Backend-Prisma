import { queryField } from 'nexus'
import { getUserId } from '../../utils'

export const me = queryField('me', {
  type: 'User',
  nullable: true,
  async resolve(parent, args, ctx) {
    const userId = getUserId(ctx)
    return ctx.prisma.user.findOne({
      where: {
        userId: Number(userId),
      },
    })
  }
})