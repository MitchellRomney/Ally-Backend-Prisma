import { schema } from 'nexus'

schema.objectType({
  name: 'SummonerProfile',
  definition(t) {
    t.field('summoner', { type: 'Summoner', nullable: true })
    t.field('matches', { type: 'Participant', list: true, nullable: true })
    t.field('quickStats', { type: 'QuickStat', list: true, nullable: true })
  },
})