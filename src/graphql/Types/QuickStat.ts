import { schema } from 'nexus'

schema.objectType({
  name: 'QuickStat',
  definition(t) {
    t.string('title')
    t.string('value')
    t.string('growth')
    t.string('suffix')
    t.string('icon')
    t.boolean('significant')
  },
})