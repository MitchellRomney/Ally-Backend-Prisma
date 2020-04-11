import { schema } from 'nexus'

schema.objectType({
  name: 'PlatformStatistics',
  definition(t) {
    t.string('latestVersion')
    t.int('totalUsers')
    t.int('totalSummoners')
    t.int('totalMatches')
  },
})