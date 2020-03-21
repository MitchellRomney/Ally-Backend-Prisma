import { Context } from "../../context";
import * as async from 'async'

export async function buildMatchParticipants(matchData: any, ctx: Context) {
  const databaseParticipants: any = []

  await async.each(matchData.participantIdentities, async function(participantObject: any) {
    const participantAccountInfo = participantObject["player"]
    const participant: any = matchData.participants[participantObject.participantId - 1]

    await ctx.prisma.summoner.upsert({
      where: {
        server_summonerId: {
          server: participantAccountInfo.currentPlatformId,
          summonerId: participantAccountInfo.summonerId
        }
      },
      update: {
        summonerName: participantAccountInfo.summonerName,
        profileIconId: participantAccountInfo.profileIcon
      },
      create: {
        server: participantAccountInfo.currentPlatformId,
        summonerName: participantAccountInfo.summonerName,
        summonerId: participantAccountInfo.summonerId,
        accountId: participantAccountInfo.currentAccountId,
        profileIconId: participantAccountInfo.profileIcon
      }
    })

    databaseParticipants.push({
      assists: participant.stats.assists,
      champLevel: participant.stats.champLevel,
      combatPlayerScore: participant.stats.combatPlayerScore,
      dateCreated: new Date(),
      dateModified: new Date(),
      damageDealtToObjectives: participant.stats.damageDealtToObjectives,
      damageDealtToTurrets: participant.stats.damageDealtToTurrets,
      damageSelfMitigated: participant.stats.damageSelfMitigated,
      deaths: participant.stats.deaths,
      doubleKills: participant.stats.doubleKills,
      firstBloodAssist: participant.stats.firstBloodAssist,
      firstBloodKill: participant.stats.firstBloodKill,
      firstInhibitorAssist: participant.stats.firstInhibitorAssist,
      firstInhibitorKill: participant.stats.firstInhibitorKill,
      firstTowerAssist: participant.stats.firstTowerAssist,
      firstTowerKill: participant.stats.firstTowerKill,
      goldEarned: participant.stats.goldEarned,
      goldSpent: participant.stats.goldSpent,
      inhibitorKills: participant.stats.inhibitorKills,
      item0: participant.stats.item0,
      item1: participant.stats.item1,
      item2: participant.stats.item2,
      item3: participant.stats.item3,
      item4: participant.stats.item4,
      item5: participant.stats.item5,
      item6: participant.stats.item6,
      killingSprees: participant.stats.killingSprees,
      kills: participant.stats.kills,
      largestCriticalStrike: participant.stats.largestCriticalStrike,
      largestKillingSpree: participant.stats.largestKillingSpree,
      largestMultiKill: participant.stats.largestMultiKill,
      longestTimeSpentLiving: participant.stats.longestTimeSpentLiving,
      magicDamageDealt: participant.stats.magicDamageDealt,
      magicDamageDealtToChampions: participant.stats.magicDamageDealtToChampions,
      magicalDamageTaken: participant.stats.magicalDamageTaken,
      matchHistoryUri: participantAccountInfo.matchHistoryUri,
      neutralMinionsKilled: participant.stats.neutralMinionsKilled,
      neutralMinionsKilledEnemyJungle: participant.stats.neutralMinionsKilledEnemyJungle,
      neutralMinionsKilledTeamJungle: participant.stats.neutralMinionsKilledTeamJungle,
      objectivePlayerScore: participant.stats.objectivePlayerScore,
      participantId: participantObject.participantId,
      pentaKills: participant.stats.pentaKills,
      perk0: participant.stats.perk0,
      perk0Var1: participant.stats.perk0Var1,
      perk0Var2: participant.stats.perk0Var2,
      perk0Var3: participant.stats.perk0Var3,
      perk1: participant.stats.perk1,
      perk1Var1: participant.stats.perk1Var1,
      perk1Var2: participant.stats.perk1Var2,
      perk1Var3: participant.stats.perk1Var3,
      perk2: participant.stats.perk2,
      perk2Var1: participant.stats.perk2Var1,
      perk2Var2: participant.stats.perk2Var2,
      perk2Var3: participant.stats.perk2Var3,
      perk3: participant.stats.perk3,
      perk3Var1: participant.stats.perk3Var1,
      perk3Var2: participant.stats.perk3Var2,
      perk3Var3: participant.stats.perk3Var3,
      perk4: participant.stats.perk4,
      perk4Var1: participant.stats.perk4Var1,
      perk4Var2: participant.stats.perk4Var2,
      perk4Var3: participant.stats.perk4Var3,
      perk5: participant.stats.perk5,
      perk5Var1: participant.stats.perk5Var1,
      perk5Var2: participant.stats.perk5Var2,
      perk5Var3: participant.stats.perk5Var3,
      perkPrimaryStyle: participant.stats.perkPrimaryStyle,
      perkSubStyle: participant.stats.perkSubStyle,
      physicalDamageDealt: participant.stats.physicalDamageDealt,
      physicalDamageDealtToChampions: participant.stats.physicalDamageDealtToChampions,
      physicalDamageTaken: participant.stats.physicalDamageTaken,
      playerScore0: participant.stats.playerScore0,
      playerScore1: participant.stats.playerScore1,
      playerScore2: participant.stats.playerScore2,
      playerScore3: participant.stats.playerScore3,
      playerScore4: participant.stats.playerScore4,
      playerScore5: participant.stats.playerScore5,
      playerScore6: participant.stats.playerScore6,
      playerScore7: participant.stats.playerScore7,
      playerScore8: participant.stats.playerScore8,
      playerScore9: participant.stats.playerScore9,
      quadraKills: participant.stats.quadraKills,
      sightWardsBoughtInGame: participant.stats.sightWardsBoughtInGame,
      skillOrder: participant.stats.skillOrder,
      spell1Id: participant.spell1Id,
      spell2Id: participant.spell2Id,
      statPerk0: participant.stats.statPerk0,
      statPerk1: participant.stats.statPerk1,
      statPerk2: participant.stats.statPerk2,
      teamId: participant.teamId,
      timeCCingOthers: participant.stats.timeCCingOthers,
      totalDamageDealt: participant.stats.totalDamageDealt,
      totalDamageDealtToChampions: participant.stats.totalDamageDealtToChampions,
      totalDamageTaken: participant.stats.totalDamageTaken,
      totalHeal: participant.stats.totalHeal,
      totalMinionsKilled: participant.stats.totalMinionsKilled,
      totalPlayerScore: participant.stats.totalPlayerScore,
      totalScoreRank: participant.stats.totalScoreRank,
      totalTimeCrowdControlDealt: participant.stats.totalTimeCrowdControlDealt,
      totalUnitsHealed: participant.stats.totalUnitsHealed,
      tripleKills: participant.stats.tripleKills,
      trueDamageDealt: participant.stats.trueDamageDealt,
      trueDamageDealtToChampions: participant.stats.trueDamageDealtToChampions,
      trueDamageTaken: participant.stats.trueDamageTaken,
      turretKills: participant.stats.turretKills,
      unrealKills: participant.stats.unrealKills,
      visionScore: participant.stats.visionScore,
      visionWardsBoughtInGame: participant.stats.visionWardsBoughtInGame,
      wardsKilled: participant.stats.wardsKilled,
      wardsPlaced: participant.stats.wardsPlaced,
      win: participant.stats.win,
      champion: {
        connect: {
          key: String(participant.championId)
        }
      },
      summoner: {
        connect: {
          server_summonerId: {
            server: participantAccountInfo.currentPlatformId,
            summonerId: participantAccountInfo.summonerId
          }
        }
      }
    })
  })

  return databaseParticipants
}