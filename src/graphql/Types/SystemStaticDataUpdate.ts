import { schema } from 'nexus'

schema.objectType({
  name: 'SystemStaticDataUpdate',
  definition(t) {
    t.string('LatestPatch')
    t.boolean('ChampionsUpdated')
    t.boolean('ItemsUpdated')
    t.boolean('RunesUpdated')
    t.boolean('SummonerSpellsUpdated')
  },
})