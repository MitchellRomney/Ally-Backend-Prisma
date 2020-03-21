import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.userId()
    t.model.username()
    t.model.email()
    t.model.summoners()
    t.model.isAdmin()
  },
})