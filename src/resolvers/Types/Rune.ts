import { objectType } from 'nexus'

export const Rune = objectType({
  name: 'Rune',
  definition(t) {
    t.model.icon()
    t.model.key()
    t.model.longDesc()
    t.model.name()
    t.model.runeId()
    t.model.shortDesc()
    t.model.version()
  },
})