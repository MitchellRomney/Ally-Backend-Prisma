import { objectType } from 'nexus'

export const SystemStaticDataUpdate = objectType({
  name: 'SystemStaticDataUpdate',
  definition(t) {
    t.string('LatestPatch')
    t.boolean('ChampionsUpdated')
    t.boolean('ItemsUpdated')
    t.boolean('RunesUpdated')
    t.boolean('SummonerSpellsUpdated')
  },
})