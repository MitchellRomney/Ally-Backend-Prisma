import { objectType } from 'nexus'

export const QuickStat = objectType({
  name: 'QuickStat',
  definition(t) {
    t.string('title')
    t.int('value')
    t.int('growth')
    t.string('suffix')
    t.string('icon')
    t.boolean('significant')
  },
})