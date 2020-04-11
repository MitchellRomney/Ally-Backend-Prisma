import { schema } from 'nexus'

schema.objectType({
  name: 'ParticipantFrame',
  definition(t) {
    t.model.current_gold()
    t.model.id()
    t.model.jungle_minions_killed()
    t.model.level()
    t.model.minions_killed()
    t.model.participant_id()
    t.model.position_x()
    t.model.position_y()
    t.model.timestamp()
    t.model.total_gold()
    t.model.xp()
    t.model.match()
  },
})