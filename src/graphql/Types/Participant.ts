import { schema } from 'nexus'

schema.objectType({
  name: 'Participant',
  definition(t) {
    t.model.assists()
    t.model.champLevel()
    t.model.combatPlayerScore()
    t.model.cs10Deltas()
    t.model.damageDealtToObjectives()
    t.model.damageDealtToTurrets()
    t.model.damageSelfMitigated()
    t.model.dateCreated()
    t.model.dateModified()
    t.model.deaths()
    t.model.doubleKills()
    t.model.firstBloodAssist()
    t.model.firstBloodKill()
    t.model.firstInhibitorAssist()
    t.model.firstInhibitorKill()
    t.model.firstTowerAssist()
    t.model.firstTowerKill()
    t.model.goldEarned()
    t.model.goldSpent()
    t.model.id()
    t.model.inhibitorKills()
    t.model.item0()
    t.model.item1()
    t.model.item2()
    t.model.item3()
    t.model.item4()
    t.model.item5()
    t.model.item6()
    t.model.killingSprees()
    t.model.kills()
    t.model.largestCriticalStrike()
    t.model.largestKillingSpree()
    t.model.largestMultiKill()
    t.model.longestTimeSpentLiving()
    t.model.magicDamageDealt()
    t.model.magicDamageDealtToChampions()
    t.model.magicalDamageTaken()
    t.model.matchHistoryUri()
    t.model.neutralMinionsKilled()
    t.model.neutralMinionsKilledEnemyJungle()
    t.model.neutralMinionsKilledTeamJungle()
    t.model.objectivePlayerScore()
    t.model.participantId()
    t.model.pentaKills()
    t.model.perk0()
    t.model.perk0Var1()
    t.model.perk0Var2()
    t.model.perk0Var3()
    t.model.perk1()
    t.model.perk1Var1()
    t.model.perk1Var2()
    t.model.perk1Var3()
    t.model.perk2()
    t.model.perk2Var1()
    t.model.perk2Var2()
    t.model.perk2Var3()
    t.model.perk3()
    t.model.perk3Var1()
    t.model.perk3Var2()
    t.model.perk3Var3()
    t.model.perk4()
    t.model.perk4Var1()
    t.model.perk4Var2()
    t.model.perk4Var3()
    t.model.perk5()
    t.model.perk5Var1()
    t.model.perk5Var2()
    t.model.perk5Var3()
    t.model.perkPrimaryStyle()
    t.model.perkSubStyle()
    t.model.physicalDamageDealt()
    t.model.physicalDamageDealtToChampions()
    t.model.physicalDamageTaken()
    t.model.platformId()
    t.model.playerScore0()
    t.model.playerScore1()
    t.model.playerScore2()
    t.model.playerScore3()
    t.model.playerScore4()
    t.model.playerScore5()
    t.model.playerScore6()
    t.model.playerScore7()
    t.model.playerScore8()
    t.model.playerScore9()
    t.model.position()
    t.model.quadraKills()
    t.model.sightWardsBoughtInGame()
    t.model.skillOrder()
    t.model.spell1()
    t.model.spell1Id()
    t.model.spell2()
    t.model.spell2Id()
    t.model.statPerk0()
    t.model.statPerk1()
    t.model.statPerk2()
    t.model.teamId()
    t.model.timeCCingOthers()
    t.model.totalDamageDealt()
    t.model.totalDamageDealtToChampions()
    t.model.totalDamageTaken()
    t.model.totalHeal()
    t.model.totalMinionsKilled()
    t.model.totalPlayerScore()
    t.model.totalScoreRank()
    t.model.totalTimeCrowdControlDealt()
    t.model.totalUnitsHealed()
    t.model.tripleKills()
    t.model.trueDamageDealt()
    t.model.trueDamageDealtToChampions()
    t.model.trueDamageTaken()
    t.model.turretKills()
    t.model.unrealKills()
    t.model.visionScore()
    t.model.visionWardsBoughtInGame()
    t.model.wardsKilled()
    t.model.wardsPlaced()
    t.model.win()
    t.model.champion()
    t.model.match()
    t.model.summoner()
  },
})