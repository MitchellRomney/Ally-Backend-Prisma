import { schema } from 'nexus'

schema.objectType({
  name: 'Team',
  definition(t) {
    t.model.bans()
    t.model.baronKills()
    t.model.dateCreated()
    t.model.dateModified()
    t.model.dominionVictoryScore()
    t.model.dragonKills()
    t.model.firstBaron()
    t.model.firstBlood()
    t.model.firstDragon()
    t.model.firstInhibitor()
    t.model.firstRiftHerald()
    t.model.firstTower()
    t.model.id()
    t.model.inhibitorKills()
    t.model.match()
    t.model.riftHeraldKills()
    t.model.teamId()
    t.model.towerKills()
    t.model.vilemawKills()
    t.model.win()
  },
})