import { getChampions, getVersions } from "../riot/DDragon"
import { Context } from "../../context";

export async function updateChampions(patch: string, ctx: Context) {
  const champions = (await getChampions(patch)).data.data

  Object.keys(champions).forEach((championKey: any) => {
    const champion = champions[championKey]

    ctx.prisma.champion.upsert({
      where: {
        key: champion.key
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
        key: champion.key,
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
    }).then(response => {
      console.log(`Champion successfully updated/created: ${champion.name}`)
    }).catch(error => {
      console.log(`Error: ${error}`)
    })
  })

  return true
}

export async function updateStaticData(ctx: Context) {
  const latest_version = (await getVersions()).data[0]
  return {
    LatestPatch: latest_version,
    ChampionsUpdated: await updateChampions(latest_version, ctx),
    ItemsUpdated: false,
    SummonerSpellsUpdated: false,
    RunesUpdated: false,
  }
}