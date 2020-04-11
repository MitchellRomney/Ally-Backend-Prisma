import { schema } from 'nexus'

schema.objectType({
  name: 'Match',
  definition(t) {
    t.model.dateCreated()
    t.model.dateModified()
    t.model.gameDuration()
    t.model.gameId()
    t.model.gameMode()
    t.model.gameType()
    t.model.gameVersion()
    t.model.mapId()
    t.model.queueId()
    t.model.seasonId()
    t.model.server()
    t.model.timestamp()
    t.model.teams()
  },
})