import { objectType } from 'nexus'

export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.model.colloq()
    t.model.consumeOnFull()
    t.model.consumed()
    t.model.depth()
    t.model.description()
    t.model.flatArmorMod()
    t.model.flatAttackSpeedMod()
    t.model.flatBlockMod()
    t.model.flatCritChanceMod()
    t.model.flatCritDamageMod()
    t.model.flatEnergyPoolMod()
    t.model.flatEnergyRegenMod()
    t.model.flatExpBonus()
    t.model.flatHPPoolMod()
    t.model.flatHPRegenMod()
    t.model.flatMPPoolMod()
    t.model.flatMPRegenMod()
    t.model.flatMagicDamageMod()
    t.model.flatMovementSpeedMod()
    t.model.flatPhysicalDamageMod()
    t.model.flatSpellBlockMod()
    t.model.goldBase()
    t.model.goldPurchasable()
    t.model.goldSell()
    t.model.goldTotal()
    t.model.hideFromAll()
    t.model.imageFull()
    t.model.imageGroup()
    t.model.imageH()
    t.model.imageSprite()
    t.model.imageW()
    t.model.imageX()
    t.model.imageY()
    t.model.inStore()
    t.model.itemId()
    t.model.name()
    t.model.percentArmorMod()
    t.model.percentAttackSpeedMod()
    t.model.percentBlockMod()
    t.model.percentCritChanceMod()
    t.model.percentCritDamageMod()
    t.model.percentDodgeMod()
    t.model.percentExpBonus()
    t.model.percentHPPoolMod()
    t.model.percentHPRegenMod()
    t.model.percentLifeStealMod()
    t.model.percentMPPoolMod()
    t.model.percentMPRegenMod()
    t.model.percentMagicDamageMod()
    t.model.percentMovementSpeedMod()
    t.model.percentPhysicalDamageMod()
    t.model.percentSpellBlockMod()
    t.model.percentSpellVampMod()
    t.model.plaintext()
    t.model.rFlatArmorModPerLevel()
    t.model.rFlatArmorPenetrationMod()
    t.model.rFlatArmorPenetrationModPerLevel()
    t.model.rFlatCritChanceModPerLevel()
    t.model.rFlatCritDamageModPerLevel()
    t.model.rFlatDodgeMod()
    t.model.rFlatDodgeModPerLevel()
    t.model.rFlatEnergyModPerLevel()
    t.model.rFlatEnergyRegenModPerLevel()
    t.model.rFlatGoldPer10Mod()
    t.model.rFlatHPModPerLevel()
    t.model.rFlatHPRegenModPerLevel()
    t.model.rFlatMPModPerLevel()
    t.model.rFlatMPRegenModPerLevel()
    t.model.rFlatMagicDamageModPerLevel()
    t.model.rFlatMagicPenetrationMod()
    t.model.rFlatMagicPenetrationModPerLevel()
    t.model.rFlatMovementSpeedModPerLevel()
    t.model.rFlatPhysicalDamageModPerLevel()
    t.model.rFlatSpellBlockModPerLevel()
    t.model.rFlatTimeDeadMod()
    t.model.rFlatTimeDeadModPerLevel()
    t.model.rPercentArmorPenetrationMod()
    t.model.rPercentArmorPenetrationModPerLevel()
    t.model.rPercentAttackSpeedModPerLevel()
    t.model.rPercentCooldownMod()
    t.model.rPercentCooldownModPerLevel()
    t.model.rPercentMagicPenetrationMod()
    t.model.rPercentMagicPenetrationModPerLevel()
    t.model.rPercentMovementSpeedModPerLevel()
    t.model.rPercentTimeDeadMod()
    t.model.rPercentTimeDeadModPerLevel()
    t.model.requiredAlly()
    t.model.requiredChampion()
    t.model.specialRecipe()
    t.model.stacks()
    t.model.version()
    t.model.builtInto()
    t.model.builtFrom()
  },
})