import { rule, shield, allow, deny } from 'graphql-shield'
import { getUserId } from '../utils'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    const userId = getUserId(ctx)
    return Boolean(userId)
  },
)

export const permissions = shield({
  Query: {
    allSummoners: isAuthenticated
  },
})