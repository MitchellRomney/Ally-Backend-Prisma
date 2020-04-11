import { getChampions, getItems, getRunes, getSummonerSpells, getVersions } from "../riot/DDragon"
import { AxiosError } from "axios";
import { Enumerable, ItemWhereUniqueInput } from "@prisma/client";
import { log } from "nexus"

export async function updateChampions(patch: string, ctx: NexusContext) {
  const champions = (await getChampions(patch)).data.data

  Object.keys(champions).forEach((championKey: any) => {
    const champion = champions[championKey]

    ctx.db.champion.upsert({
      where: {
        key: Number(champion.key)
      },
      update: {
        blurb: champion.blurb,
        champId: champion.id,
        imageFull: champion.imageFull,
        imageGroup: champion.imageGroup,
        imageH: champion.imageH,
        imageSprite: champion.imageSprite,
        imageW: champion.imageW,
        imageX: champion.imageX,
        imageY: champion.imageY,
        infoAttack: champion.infoAttack,
        infoDefense: champion.infoDefense,
        infoDifficulty: champion.infoDifficulty,
        infoMagic: champion.infoMagic,
        name: champion.name,
        partype: champion.partype,
        statsArmor: champion.statsArmor,
        statsArmorPerLevel: champion.statsArmorPerLevel,
        statsAttackDamage: champion.statsAttackDamage,
        statsAttackDamagePerLevel: champion.statsAttackDamagePerLevel,
        statsAttackRange: champion.statsAttackRange,
        statsAttackSpeed: champion.statsAttackSpeed,
        statsAttackSpeedPerLevel: champion.statsAttackSpeedPerLevel,
        statsCrit: champion.statsCrit,
        statsCritPerLevel: champion.statsCritPerLevel,
        statsHP: champion.statsHP,
        statsHPPerLevel: champion.statsHPPerLevel,
        statsHPRegen: champion.statsHPRegen,
        statsHPRegenPerLevel: champion.statsHPRegenPerLevel,
        statsMP: champion.statsMP,
        statsMPPerLevel: champion.statsMPPerLevel,
        statsMPRegen: champion.statsMPRegen,
        statsMPRegenPerLevel: champion.statsMPRegenPerLevel,
        statsMoveSpeed: champion.statsMoveSpeed,
        statsSpellBlock: champion.statsSpellBlock,
        statsSpellBlockPerLevel: champion.statsSpellBlockPerLevel,
        tags: {
          set: champion.tags
        },
        title: champion.title,
        version: champion.version
      },
      create: {
        blurb: champion.blurb,
        champId: champion.id,
        dateCreated: new Date(),
        dateModified: new Date(),
        imageFull: champion.imageFull,
        imageGroup: champion.imageGroup,
        imageH: champion.imageH,
        imageSprite: champion.imageSprite,
        imageW: champion.imageW,
        imageX: champion.imageX,
        imageY: champion.imageY,
        infoAttack: champion.infoAttack,
        infoDefense: champion.infoDefense,
        infoDifficulty: champion.infoDifficulty,
        infoMagic: champion.infoMagic,
        key: Number(champion.key),
        name: champion.name,
        partype: champion.partype,
        statsArmor: champion.statsArmor,
        statsArmorPerLevel: champion.statsArmorPerLevel,
        statsAttackDamage: champion.statsAttackDamage,
        statsAttackDamagePerLevel: champion.statsAttackDamagePerLevel,
        statsAttackRange: champion.statsAttackRange,
        statsAttackSpeed: champion.statsAttackSpeed,
        statsAttackSpeedPerLevel: champion.statsAttackSpeedPerLevel,
        statsCrit: champion.statsCrit,
        statsCritPerLevel: champion.statsCritPerLevel,
        statsHP: champion.statsHP,
        statsHPPerLevel: champion.statsHPPerLevel,
        statsHPRegen: champion.statsHPRegen,
        statsHPRegenPerLevel: champion.statsHPRegenPerLevel,
        statsMP: champion.statsMP,
        statsMPPerLevel: champion.statsMPPerLevel,
        statsMPRegen: champion.statsMPRegen,
        statsMPRegenPerLevel: champion.statsMPRegenPerLevel,
        statsMoveSpeed: champion.statsMoveSpeed,
        statsSpellBlock: champion.statsSpellBlock,
        statsSpellBlockPerLevel: champion.statsSpellBlockPerLevel,
        tags: {
          set: champion.tags
        },
        title: champion.title,
        version: champion.version
      }
    }).then(() => {
      // log.info(`Champion successfully updated/created: ${champion.name}`)
    }).catch((error: AxiosError) => {
      log.error(`Error: ${error}`)
    })
  })

  return true
}

export async function updateItems(patch: string, ctx: NexusContext) {
  const items = (await getItems(patch)).data.data

  Object.keys(items).forEach((itemKey) => {
    const item = items[itemKey]

    const intoItems: Enumerable<ItemWhereUniqueInput> = []
    if (item['into']) {
      item['into'].forEach((intoItemKey: string) => {
        intoItems.push({ itemId: Number(intoItemKey) })
      })
    }

    const fromItems: Enumerable<ItemWhereUniqueInput> = []
    if (item['from']) {
      item['from'].forEach((fromItemKey: string) => {
        fromItems.push({ itemId: Number(fromItemKey) })
      })
    }

    ctx.db.item.upsert({
      where: {
        itemId: Number(itemKey)
      },
      update: {
        colloq: item.colloq ? item.colloq : '',
        consumeOnFull: item.consumeOnFull ? item.consumeOnFull : false,
        consumed: item.consumed ? item.consumed : false,
        depth: item.depth ? item.depth : 1,
        description: item.description ? item.description : '',
        flatArmorMod: item.stats.flatArmorMod ? item.stats.flatArmorMod : 0,
        flatAttackSpeedMod: item.stats.flatAttackSpeedMod ? item.stats.flatAttackSpeedMod : 0,
        flatBlockMod: item.stats.flatBlockMod ? item.stats.flatBlockMod : 0,
        flatCritChanceMod: item.stats.flatCritChanceMod ? item.stats.flatCritChanceMod : 0,
        flatCritDamageMod: item.stats.flatCritDamageMod ? item.stats.flatCritDamageMod : 0,
        flatEnergyPoolMod: item.stats.flatEnergyPoolMod ? item.stats.flatEnergyPoolMod : 0,
        flatEnergyRegenMod: item.stats.flatEnergyRegenMod ? item.stats.flatEnergyRegenMod : 0,
        flatExpBonus: item.stats.flatExpBonus ? item.stats.flatExpBonus : 0,
        flatHPPoolMod: item.stats.flatHPPoolMod ? item.stats.flatHPPoolMod : 0,
        flatHPRegenMod: item.stats.flatHPRegenMod ? item.stats.flatHPRegenMod : 0,
        flatMPPoolMod: item.stats.flatMPPoolMod ? item.stats.flatMPPoolMod : 0,
        flatMPRegenMod: item.stats.flatMPRegenMod ? item.stats.flatMPRegenMod : 0,
        flatMagicDamageMod: item.stats.flatMagicDamageMod ? item.stats.flatMagicDamageMod : 0,
        flatMovementSpeedMod: item.stats.flatMovementSpeedMod ? item.stats.flatMovementSpeedMod : 0,
        flatPhysicalDamageMod: item.stats.flatPhysicalDamageMod ? item.stats.flatPhysicalDamageMod : 0,
        flatSpellBlockMod: item.stats.flatSpellBlockMod ? item.stats.flatSpellBlockMod : 0,
        goldBase: item.gold.base ? item.gold.base : 0,
        goldPurchasable: item.gold.purchasable ? item.gold.purchasable : true,
        goldSell: item.gold.sell ? item.gold.sell : 0,
        goldTotal: item.gold.total ? item.gold.total : 0,
        hideFromAll: item.hideFromAll ? item.hideFromAll : false,
        imageFull: item.image.full ? item.image.full : '',
        imageGroup: item.image.group ? item.image.group : '',
        imageH: item.image.h ? item.image.h : 0,
        imageSprite: item.image.sprite ? item.image.sprite : '',
        imageW: item.image.w ? item.image.w : 0,
        imageX: item.image.x ? item.image.x : 0,
        imageY: item.image.y ? item.image.y : 0,
        inStore: item.inStore ? item.inStore : true,
        name: item.name,
        percentArmorMod: item.stats.percentArmorMod ? item.stats.percentArmorMod : 0,
        percentAttackSpeedMod: item.stats.percentAttackSpeedMod ? item.stats.percentAttackSpeedMod : 0,
        percentBlockMod: item.stats.percentBlockMod ? item.stats.percentBlockMod : 0,
        percentCritChanceMod: item.stats.percentCritChanceMod ? item.stats.percentCritChanceMod : 0,
        percentCritDamageMod: item.stats.percentCritDamageMod ? item.stats.percentCritDamageMod : 0,
        percentDodgeMod: item.stats.percentDodgeMod ? item.stats.percentDodgeMod : 0,
        percentExpBonus: item.stats.percentExpBonus ? item.stats.percentExpBonus : 0,
        percentHPPoolMod: item.stats.percentHPPoolMod ? item.stats.percentHPPoolMod : 0,
        percentHPRegenMod: item.stats.percentHPRegenMod ? item.stats.percentHPRegenMod : 0,
        percentLifeStealMod: item.stats.percentLifeStealMod ? item.stats.percentLifeStealMod : 0,
        percentMPPoolMod: item.stats.percentMPPoolMod ? item.stats.percentMPPoolMod : 0,
        percentMPRegenMod: item.stats.percentMPRegenMod ? item.stats.percentMPRegenMod : 0,
        percentMagicDamageMod: item.stats.percentMagicDamageMod ? item.stats.percentMagicDamageMod : 0,
        percentMovementSpeedMod: item.stats.percentMovementSpeedMod ? item.stats.percentMovementSpeedMod : 0,
        percentPhysicalDamageMod: item.stats.percentPhysicalDamageMod ? item.stats.percentPhysicalDamageMod : 0,
        percentSpellBlockMod: item.stats.percentSpellBlockMod ? item.stats.percentSpellBlockMod : 0,
        percentSpellVampMod: item.stats.percentSpellVampMod ? item.stats.percentSpellVampMod : 0,
        plaintext: item.stats.plaintext ? item.stats.plaintext : '',
        rFlatArmorModPerLevel: item.stats.rFlatArmorModPerLevel ? item.stats.rFlatArmorModPerLevel : 0,
        rFlatArmorPenetrationMod: item.stats.rFlatArmorPenetrationMod ? item.stats.rFlatArmorPenetrationMod : 0,
        rFlatArmorPenetrationModPerLevel: item.stats.rFlatArmorPenetrationModPerLevel ? item.stats.rFlatArmorPenetrationModPerLevel : 0,
        rFlatCritChanceModPerLevel: item.stats.rFlatCritChanceModPerLevel ? item.stats.rFlatCritChanceModPerLevel : 0,
        rFlatCritDamageModPerLevel: item.stats.rFlatCritDamageModPerLevel ? item.stats.rFlatCritDamageModPerLevel : 0,
        rFlatDodgeMod: item.stats.rFlatDodgeMod ? item.stats.rFlatDodgeMod : 0,
        rFlatDodgeModPerLevel: item.stats.rFlatDodgeModPerLevel ? item.stats.rFlatDodgeModPerLevel : 0,
        rFlatEnergyModPerLevel: item.stats.rFlatEnergyModPerLevel ? item.stats.rFlatEnergyModPerLevel : 0,
        rFlatEnergyRegenModPerLevel: item.stats.rFlatEnergyRegenModPerLevel ? item.stats.rFlatEnergyRegenModPerLevel : 0,
        rFlatGoldPer10Mod: item.stats.rFlatGoldPer10Mod ? item.stats.rFlatGoldPer10Mod : 0,
        rFlatHPModPerLevel: item.stats.rFlatHPModPerLevel ? item.stats.rFlatHPModPerLevel : 0,
        rFlatHPRegenModPerLevel: item.stats.rFlatHPRegenModPerLevel ? item.stats.rFlatHPRegenModPerLevel : 0,
        rFlatMPModPerLevel: item.stats.rFlatMPModPerLevel ? item.stats.rFlatMPModPerLevel : 0,
        rFlatMPRegenModPerLevel: item.stats.rFlatMPRegenModPerLevel ? item.stats.rFlatMPRegenModPerLevel : 0,
        rFlatMagicDamageModPerLevel: item.stats.rFlatMagicDamageModPerLevel ? item.stats.rFlatMagicDamageModPerLevel : 0,
        rFlatMagicPenetrationMod: item.stats.rFlatMagicPenetrationMod ? item.stats.rFlatMagicPenetrationMod : 0,
        rFlatMagicPenetrationModPerLevel: item.stats.rFlatMagicPenetrationModPerLevel ? item.stats.rFlatMagicPenetrationModPerLevel : 0,
        rFlatMovementSpeedModPerLevel: item.stats.rFlatMovementSpeedModPerLevel ? item.stats.rFlatMovementSpeedModPerLevel : 0,
        rFlatPhysicalDamageModPerLevel: item.stats.rFlatPhysicalDamageModPerLevel ? item.stats.rFlatPhysicalDamageModPerLevel : 0,
        rFlatSpellBlockModPerLevel: item.stats.rFlatSpellBlockModPerLevel ? item.stats.rFlatSpellBlockModPerLevel : 0,
        rFlatTimeDeadMod: item.stats.rFlatTimeDeadMod ? item.stats.rFlatTimeDeadMod : 0,
        rFlatTimeDeadModPerLevel: item.stats.rFlatTimeDeadModPerLevel ? item.stats.rFlatTimeDeadModPerLevel : 0,
        rPercentArmorPenetrationMod: item.stats.rPercentArmorPenetrationMod ? item.stats.rPercentArmorPenetrationMod : 0,
        rPercentArmorPenetrationModPerLevel: item.stats.rPercentArmorPenetrationModPerLevel ? item.stats.rPercentArmorPenetrationModPerLevel : 0,
        rPercentAttackSpeedModPerLevel: item.stats.rPercentAttackSpeedModPerLevel ? item.stats.rPercentAttackSpeedModPerLevel : 0,
        rPercentCooldownMod: item.stats.rPercentCooldownMod ? item.stats.rPercentCooldownMod : 0,
        rPercentCooldownModPerLevel: item.stats.rPercentCooldownModPerLevel ? item.stats.rPercentCooldownModPerLevel : 0,
        rPercentMagicPenetrationMod: item.stats.rPercentMagicPenetrationMod ? item.stats.rPercentMagicPenetrationMod : 0,
        rPercentMagicPenetrationModPerLevel: item.stats.rPercentMagicPenetrationModPerLevel ? item.stats.rPercentMagicPenetrationModPerLevel : 0,
        rPercentMovementSpeedModPerLevel: item.stats.rPercentMovementSpeedModPerLevel ? item.stats.rPercentMovementSpeedModPerLevel : 0,
        rPercentTimeDeadMod: item.stats.rPercentTimeDeadMod ? item.stats.rPercentTimeDeadMod : 0,
        rPercentTimeDeadModPerLevel: item.stats.rPercentTimeDeadModPerLevel ? item.stats.rPercentTimeDeadModPerLevel : 0,
        requiredAlly: item.requiredAlly ? item.requiredAlly : '',
        requiredChampion: item.requiredChampion ? item.requiredChampion : '',
        specialRecipe: item.specialRecipe ? item.specialRecipe : 0,
        stacks: item.stacks ? item.stacks : 0,
        version: patch,
        builtInto: {
          set: intoItems
        },
        builtFrom: {
          set: fromItems
        }
      },
      create: {
        colloq: item.colloq ? item.colloq : '',
        consumeOnFull: item.consumeOnFull ? item.consumeOnFull : false,
        consumed: item.consumed ? item.consumed : false,
        depth: item.depth ? item.depth : 1,
        description: item.description ? item.description : '',
        flatArmorMod: item.stats.flatArmorMod ? item.stats.flatArmorMod : 0,
        flatAttackSpeedMod: item.stats.flatAttackSpeedMod ? item.stats.flatAttackSpeedMod : 0,
        flatBlockMod: item.stats.flatBlockMod ? item.stats.flatBlockMod : 0,
        flatCritChanceMod: item.stats.flatCritChanceMod ? item.stats.flatCritChanceMod : 0,
        flatCritDamageMod: item.stats.flatCritDamageMod ? item.stats.flatCritDamageMod : 0,
        flatEnergyPoolMod: item.stats.flatEnergyPoolMod ? item.stats.flatEnergyPoolMod : 0,
        flatEnergyRegenMod: item.stats.flatEnergyRegenMod ? item.stats.flatEnergyRegenMod : 0,
        flatExpBonus: item.stats.flatExpBonus ? item.stats.flatExpBonus : 0,
        flatHPPoolMod: item.stats.flatHPPoolMod ? item.stats.flatHPPoolMod : 0,
        flatHPRegenMod: item.stats.flatHPRegenMod ? item.stats.flatHPRegenMod : 0,
        flatMPPoolMod: item.stats.flatMPPoolMod ? item.stats.flatMPPoolMod : 0,
        flatMPRegenMod: item.stats.flatMPRegenMod ? item.stats.flatMPRegenMod : 0,
        flatMagicDamageMod: item.stats.flatMagicDamageMod ? item.stats.flatMagicDamageMod : 0,
        flatMovementSpeedMod: item.stats.flatMovementSpeedMod ? item.stats.flatMovementSpeedMod : 0,
        flatPhysicalDamageMod: item.stats.flatPhysicalDamageMod ? item.stats.flatPhysicalDamageMod : 0,
        flatSpellBlockMod: item.stats.flatSpellBlockMod ? item.stats.flatSpellBlockMod : 0,
        goldBase: item.gold.base ? item.gold.base : 0,
        goldPurchasable: item.gold.purchasable ? item.gold.purchasable : true,
        goldSell: item.gold.sell ? item.gold.sell : 0,
        goldTotal: item.gold.total ? item.gold.total : 0,
        hideFromAll: item.hideFromAll ? item.hideFromAll : false,
        imageFull: item.image.full ? item.image.full : '',
        imageGroup: item.image.group ? item.image.group : '',
        imageH: item.image.h ? item.image.h : 0,
        imageSprite: item.image.sprite ? item.image.sprite : '',
        imageW: item.image.w ? item.image.w : 0,
        imageX: item.image.x ? item.image.x : 0,
        imageY: item.image.y ? item.image.y : 0,
        inStore: item.inStore ? item.inStore : true,
        itemId: Number(itemKey),
        name: item.name,
        percentArmorMod: item.stats.percentArmorMod ? item.stats.percentArmorMod : 0,
        percentAttackSpeedMod: item.stats.percentAttackSpeedMod ? item.stats.percentAttackSpeedMod : 0,
        percentBlockMod: item.stats.percentBlockMod ? item.stats.percentBlockMod : 0,
        percentCritChanceMod: item.stats.percentCritChanceMod ? item.stats.percentCritChanceMod : 0,
        percentCritDamageMod: item.stats.percentCritDamageMod ? item.stats.percentCritDamageMod : 0,
        percentDodgeMod: item.stats.percentDodgeMod ? item.stats.percentDodgeMod : 0,
        percentExpBonus: item.stats.percentExpBonus ? item.stats.percentExpBonus : 0,
        percentHPPoolMod: item.stats.percentHPPoolMod ? item.stats.percentHPPoolMod : 0,
        percentHPRegenMod: item.stats.percentHPRegenMod ? item.stats.percentHPRegenMod : 0,
        percentLifeStealMod: item.stats.percentLifeStealMod ? item.stats.percentLifeStealMod : 0,
        percentMPPoolMod: item.stats.percentMPPoolMod ? item.stats.percentMPPoolMod : 0,
        percentMPRegenMod: item.stats.percentMPRegenMod ? item.stats.percentMPRegenMod : 0,
        percentMagicDamageMod: item.stats.percentMagicDamageMod ? item.stats.percentMagicDamageMod : 0,
        percentMovementSpeedMod: item.stats.percentMovementSpeedMod ? item.stats.percentMovementSpeedMod : 0,
        percentPhysicalDamageMod: item.stats.percentPhysicalDamageMod ? item.stats.percentPhysicalDamageMod : 0,
        percentSpellBlockMod: item.stats.percentSpellBlockMod ? item.stats.percentSpellBlockMod : 0,
        percentSpellVampMod: item.stats.percentSpellVampMod ? item.stats.percentSpellVampMod : 0,
        plaintext: item.stats.plaintext ? item.stats.plaintext : '',
        rFlatArmorModPerLevel: item.stats.rFlatArmorModPerLevel ? item.stats.rFlatArmorModPerLevel : 0,
        rFlatArmorPenetrationMod: item.stats.rFlatArmorPenetrationMod ? item.stats.rFlatArmorPenetrationMod : 0,
        rFlatArmorPenetrationModPerLevel: item.stats.rFlatArmorPenetrationModPerLevel ? item.stats.rFlatArmorPenetrationModPerLevel : 0,
        rFlatCritChanceModPerLevel: item.stats.rFlatCritChanceModPerLevel ? item.stats.rFlatCritChanceModPerLevel : 0,
        rFlatCritDamageModPerLevel: item.stats.rFlatCritDamageModPerLevel ? item.stats.rFlatCritDamageModPerLevel : 0,
        rFlatDodgeMod: item.stats.rFlatDodgeMod ? item.stats.rFlatDodgeMod : 0,
        rFlatDodgeModPerLevel: item.stats.rFlatDodgeModPerLevel ? item.stats.rFlatDodgeModPerLevel : 0,
        rFlatEnergyModPerLevel: item.stats.rFlatEnergyModPerLevel ? item.stats.rFlatEnergyModPerLevel : 0,
        rFlatEnergyRegenModPerLevel: item.stats.rFlatEnergyRegenModPerLevel ? item.stats.rFlatEnergyRegenModPerLevel : 0,
        rFlatGoldPer10Mod: item.stats.rFlatGoldPer10Mod ? item.stats.rFlatGoldPer10Mod : 0,
        rFlatHPModPerLevel: item.stats.rFlatHPModPerLevel ? item.stats.rFlatHPModPerLevel : 0,
        rFlatHPRegenModPerLevel: item.stats.rFlatHPRegenModPerLevel ? item.stats.rFlatHPRegenModPerLevel : 0,
        rFlatMPModPerLevel: item.stats.rFlatMPModPerLevel ? item.stats.rFlatMPModPerLevel : 0,
        rFlatMPRegenModPerLevel: item.stats.rFlatMPRegenModPerLevel ? item.stats.rFlatMPRegenModPerLevel : 0,
        rFlatMagicDamageModPerLevel: item.stats.rFlatMagicDamageModPerLevel ? item.stats.rFlatMagicDamageModPerLevel : 0,
        rFlatMagicPenetrationMod: item.stats.rFlatMagicPenetrationMod ? item.stats.rFlatMagicPenetrationMod : 0,
        rFlatMagicPenetrationModPerLevel: item.stats.rFlatMagicPenetrationModPerLevel ? item.stats.rFlatMagicPenetrationModPerLevel : 0,
        rFlatMovementSpeedModPerLevel: item.stats.rFlatMovementSpeedModPerLevel ? item.stats.rFlatMovementSpeedModPerLevel : 0,
        rFlatPhysicalDamageModPerLevel: item.stats.rFlatPhysicalDamageModPerLevel ? item.stats.rFlatPhysicalDamageModPerLevel : 0,
        rFlatSpellBlockModPerLevel: item.stats.rFlatSpellBlockModPerLevel ? item.stats.rFlatSpellBlockModPerLevel : 0,
        rFlatTimeDeadMod: item.stats.rFlatTimeDeadMod ? item.stats.rFlatTimeDeadMod : 0,
        rFlatTimeDeadModPerLevel: item.stats.rFlatTimeDeadModPerLevel ? item.stats.rFlatTimeDeadModPerLevel : 0,
        rPercentArmorPenetrationMod: item.stats.rPercentArmorPenetrationMod ? item.stats.rPercentArmorPenetrationMod : 0,
        rPercentArmorPenetrationModPerLevel: item.stats.rPercentArmorPenetrationModPerLevel ? item.stats.rPercentArmorPenetrationModPerLevel : 0,
        rPercentAttackSpeedModPerLevel: item.stats.rPercentAttackSpeedModPerLevel ? item.stats.rPercentAttackSpeedModPerLevel : 0,
        rPercentCooldownMod: item.stats.rPercentCooldownMod ? item.stats.rPercentCooldownMod : 0,
        rPercentCooldownModPerLevel: item.stats.rPercentCooldownModPerLevel ? item.stats.rPercentCooldownModPerLevel : 0,
        rPercentMagicPenetrationMod: item.stats.rPercentMagicPenetrationMod ? item.stats.rPercentMagicPenetrationMod : 0,
        rPercentMagicPenetrationModPerLevel: item.stats.rPercentMagicPenetrationModPerLevel ? item.stats.rPercentMagicPenetrationModPerLevel : 0,
        rPercentMovementSpeedModPerLevel: item.stats.rPercentMovementSpeedModPerLevel ? item.stats.rPercentMovementSpeedModPerLevel : 0,
        rPercentTimeDeadMod: item.stats.rPercentTimeDeadMod ? item.stats.rPercentTimeDeadMod : 0,
        rPercentTimeDeadModPerLevel: item.stats.rPercentTimeDeadModPerLevel ? item.stats.rPercentTimeDeadModPerLevel : 0,
        requiredAlly: item.requiredAlly ? item.requiredAlly : '',
        requiredChampion: item.requiredChampion ? item.requiredChampion : '',
        specialRecipe: item.specialRecipe ? item.specialRecipe : 0,
        stacks: item.stacks ? item.stacks : 0,
        version: patch
      }
    }).then(() => {
      // log.info(`Item successfully updated/created: ${item.name}`)
    }).catch((error: AxiosError) => {
      log.error(error.message)
    })
  })

  return true
}

export async function updateRunes(patch: string, ctx: NexusContext) {
  const styles = (await getRunes(patch)).data

  Object.keys(styles).forEach((styleKey: string) => {
    styles[styleKey].slots.forEach((slot: any) => {
      slot.runes.forEach((rune: any) => {
        ctx.db.rune.upsert({
          where: {
            runeId: rune.id
          },
          create: {
            icon: rune.icon,
            key: rune.key,
            longDesc: rune.longDesc,
            name: rune.name,
            runeId: rune.id,
            shortDesc: rune.shortDesc,
            version: rune.version
          },
          update: {
            icon: rune.icon,
            key: rune.key,
            longDesc: rune.longDesc,
            name: rune.name,
            shortDesc: rune.shortDesc,
            version: rune.version
          }
        }).then(() => {
          // log.info(`Rune successfully updated/created: ${rune.name}`)
        }).catch((error: AxiosError) => {
          log.error(`Error: ${error}`)
        })
      })
    })
  })

  return true
}

export async function updateSummonerSpells(patch: string, ctx: NexusContext) {
  const spells = (await getSummonerSpells(patch)).data.data

  Object.keys(spells).forEach((spellKey: string) => {
    const spell = spells[spellKey]

    ctx.db.summonerSpell.upsert({
      where: {
        key: Number(spell.key)
      },
      create: {
        cooldown: spell.cooldown[0],
        cooldownBurn: spell.cooldownBurn,
        cost: spell.cost[0],
        costBurn: spell.costBurn,
        costType: spell.costType,
        description: spell.description,
        imageFull: spell.image.full,
        imageGroup: spell.image.group,
        imageH: spell.image.h,
        imageSprite: spell.image.sprite,
        imageW: spell.image.w,
        imageX: spell.image.x,
        imageY: spell.image.y,
        key: Number(spell.key),
        maxAmmo: spell.maxammo,
        maxRank: spell.maxrank,
        name: spell.name,
        range: spell.range[0],
        rangeBurn: spell.rangeBurn,
        resource: spell.resource,
        summonerLevel: spell.summonerLevel,
        summonerSpellId: spell.id,
        tooltip: spell.tooltip,
        version: patch,
      },
      update: {
        cooldown: spell.cooldown[0],
        cooldownBurn: spell.cooldownBurn,
        cost: spell.cost[0],
        costBurn: spell.costBurn,
        costType: spell.costType,
        description: spell.description,
        imageFull: spell.image.full,
        imageGroup: spell.image.group,
        imageH: spell.image.h,
        imageSprite: spell.image.sprite,
        imageW: spell.image.w,
        imageX: spell.image.x,
        imageY: spell.image.y,
        maxAmmo: spell.maxammo,
        maxRank: spell.maxrank,
        name: spell.name,
        range: spell.range[0],
        rangeBurn: spell.rangeBurn,
        resource: spell.resource,
        summonerLevel: spell.summonerLevel,
        summonerSpellId: spell.id,
        tooltip: spell.tooltip,
        version: patch,
      }
    }).then(() => {
      // log.info(`Summoner Spell successfully updated/created: ${spell.name}`)
    }).catch((error: AxiosError) => {
      log.error(`Error: ${error}`)
    })
  })

  return true
}

export async function updateStaticData(ctx: NexusContext) {
  const latest_version = (await getVersions()).data[0]
  return {
    LatestPatch: latest_version,
    ChampionsUpdated: await updateChampions(latest_version, ctx),
    ItemsUpdated: await updateItems(latest_version, ctx),
    SummonerSpellsUpdated: await updateSummonerSpells(latest_version, ctx),
    RunesUpdated: await updateRunes(latest_version, ctx)
  }
}