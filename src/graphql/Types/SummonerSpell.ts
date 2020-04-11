import { schema } from 'nexus'

schema.objectType({
  name: 'SummonerSpell',
  definition(t) {
    t.model.cooldown()
    t.model.cooldownBurn()
    t.model.cost()
    t.model.costBurn()
    t.model.costType()
    t.model.description()
    t.model.imageFull()
    t.model.imageGroup()
    t.model.imageH()
    t.model.imageSprite()
    t.model.imageW()
    t.model.imageX()
    t.model.imageY()
    t.model.key()
    t.model.maxAmmo()
    t.model.maxRank()
    t.model.name()
    t.model.range()
    t.model.rangeBurn()
    t.model.resource()
    t.model.summonerLevel()
    t.model.summonerSpellId()
    t.model.tooltip()
    t.model.version()
  },
})