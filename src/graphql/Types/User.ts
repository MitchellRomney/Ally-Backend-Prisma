import { schema } from 'nexus'

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.userId()
    t.model.username()
    t.model.email()
    t.model.summoners()
    t.model.isAdmin()
  },
})