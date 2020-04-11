import * as async from 'async'
import { getMatch, getMatchList } from "../riot/Match";
import { Match } from "@prisma/client";
import { saveMatches } from "./Match"
import { log } from "nexus"

export async function fetchSummonerParticipants(server: string, summonerId: string, accountId: string, amount: number | null | undefined, ctx: NexusContext) {
  const returnAmount = amount ? amount : 10
  const riotResponse = await getMatchList(accountId, server, returnAmount)

  if (riotResponse) {
    const matches: any = riotResponse.data.matches
    const gameIdList: number[] = []
    const existingMatchIdList: number[] = []

    matches.forEach((match: Match) => gameIdList.push(match.gameId))

    const existingMatches = await ctx.db.match.findMany({ where: { gameId: { in: gameIdList } }, select: { gameId: true } })

    existingMatches.forEach((match: any) => existingMatchIdList.push(match.gameId))

    const newGames: number[] = gameIdList.filter(gameId => !existingMatchIdList.includes(gameId))

    if (newGames.length > 0) {
      log.info(`${newGames.length} new games to fetch.`)
      const fetchedGames: any[] = []

      await async.each(newGames, function (gameId, callback) {

        getMatch(gameId, server).then(result => {
          if (result) {
            log.info(`Fetched #${gameId}`)
            fetchedGames.push(result.data)
          }
          callback()
        }).catch((err) => log.error(err))
      }).catch((err) => log.error(err))

      await saveMatches(fetchedGames, ctx).catch((err) => log.error(err))
    }
  }

  return await ctx.db.participant.findMany({ where: { summoner: { server, summonerId } }, first: returnAmount })
}

export async function createMatchTeams(matchData: any, match: Match, ctx: NexusContext) {
  await async.each(matchData.teams, async function (team: any, callback) {

    const bans: any = []

    team.bans.forEach((ban: any) => {
      bans.push({ key: ban.championId })
    })

    ctx.db.team.create({
      data: {
        dateCreated: new Date(),
        dateModified: new Date(),
        baronKills: team.baronKills,
        dominionVictoryScore: team.dominionVictoryScore,
        dragonKills: team.dragonKills,
        firstBaron: team.firstBaron,
        firstBlood: team.firstBlood,
        firstDragon: team.firstDragon,
        firstInhibitor: team.firstInhibitor,
        firstRiftHerald: team.firstRiftHerald,
        firstTower: team.firstTower,
        inhibitorKills: team.inhibitorKills,
        riftHeraldKills: team.riftHeraldKills,
        teamId: team.teamId,
        towerKills: team.towerKills,
        vilemawKills: team.vilemawKills,
        win: team.win === 'Win',
        match: { connect: { gameId: match.gameId } },
        bans: { connect: bans }
      }
    })

    callback()
  })
}

export async function createMatchParticipants(matchData: any, match: Match, ctx: NexusContext) {
  await async.each(matchData.participantIdentities, async function (participantObject: any, callback) {
    const participantAccountInfo = participantObject["player"]
    const participant: any = matchData.participants[participantObject.participantId - 1]
    const isBot: boolean = !participantAccountInfo.summonerId
    const server = participantAccountInfo.currentPlatformId

    ctx.db.participant.create({
      data: {
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
        item0: participant.stats.item0 ? { connect: { itemId: participant.stats.item0 } } : undefined,
        item1: participant.stats.item1 ? { connect: { itemId: participant.stats.item1 } } : undefined,
        item2: participant.stats.item2 ? { connect: { itemId: participant.stats.item2 } } : undefined,
        item3: participant.stats.item3 ? { connect: { itemId: participant.stats.item3 } } : undefined,
        item4: participant.stats.item4 ? { connect: { itemId: participant.stats.item4 } } : undefined,
        item5: participant.stats.item5 ? { connect: { itemId: participant.stats.item5 } } : undefined,
        item6: participant.stats.item6 ? { connect: { itemId: participant.stats.item6 } } : undefined,
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
        perk0: participant.stats.perk0 ? { connect: { runeId: participant.stats.perk0 } } : undefined,
        perk0Var1: participant.stats.perk0Var1,
        perk0Var2: participant.stats.perk0Var2,
        perk0Var3: participant.stats.perk0Var3,
        perk1: participant.stats.perk1 ? { connect: { runeId: participant.stats.perk1 } } : undefined,
        perk1Var1: participant.stats.perk1Var1,
        perk1Var2: participant.stats.perk1Var2,
        perk1Var3: participant.stats.perk1Var3,
        perk2: participant.stats.perk2 ? { connect: { runeId: participant.stats.perk2 } } : undefined,
        perk2Var1: participant.stats.perk2Var1,
        perk2Var2: participant.stats.perk2Var2,
        perk2Var3: participant.stats.perk2Var3,
        perk3: participant.stats.perk3 ? { connect: { runeId: participant.stats.perk3 } } : undefined,
        perk3Var1: participant.stats.perk3Var1,
        perk3Var2: participant.stats.perk3Var2,
        perk3Var3: participant.stats.perk3Var3,
        perk4: participant.stats.perk4 ? { connect: { runeId: participant.stats.perk4 } } : undefined,
        perk4Var1: participant.stats.perk4Var1,
        perk4Var2: participant.stats.perk4Var2,
        perk4Var3: participant.stats.perk4Var3,
        perk5: participant.stats.perk5 ? { connect: { runeId: participant.stats.perk5 } } : undefined,
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
        skillOrder: undefined,
        spell1: { connect: { key: participant.spell1Id } },
        spell2: { connect: { key: participant.spell2Id } },
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
        champion: { connect: { key: participant.championId } },
        summoner: !isBot ? { connect: { server_summonerId: { server: server, summonerId: participantAccountInfo.summonerId } } } : undefined,
        match: { connect: { gameId: match.gameId } }
      }
    }).then(() => callback()).catch(err => log.error(err))
  })
}