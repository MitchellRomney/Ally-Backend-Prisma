import {objectType} from "nexus";

export const Summoner = objectType({
  name: 'Summoner',
  definition(t) {
    t.model.id()
    t.model.summonerName()
    t.model.summonerId()
    t.model.puuid()
    t.model.accountId()
    t.model.profileIconId()
    t.model.summonerLevel()
    t.model.server()
    t.model.user()
  },
})