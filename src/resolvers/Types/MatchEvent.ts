import { objectType } from 'nexus'

export const MatchEvent = objectType({
  name: 'MatchEvent',
  definition(t) {
    t.model.assistingParticipantIds()
    t.model.buildingType()
    t.model.creatorId()
    t.model.id()
    t.model.itemId()
    t.model.killerId()
    t.model.laneType()
    t.model.levelUpType()
    t.model.monsterSubType()
    t.model.monsterType()
    t.model.participantId()
    t.model.positionX()
    t.model.positionY()
    t.model.skillSlot()
    t.model.teamId()
    t.model.timestamp()
    t.model.towerType()
    t.model.type()
    t.model.victimId()
    t.model.wardType()
    t.model.match()
  },
})