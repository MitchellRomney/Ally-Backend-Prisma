import { Context } from "../../context";
import { buildMatchParticipants } from "./Participant"

export async function saveMatch(matchData: any, ctx: Context) {
  await ctx.prisma.match.create({
    data: {
      dateCreated: new Date(),
      dateModified: new Date(),
      gameDuration: matchData.gameDuration,
      gameId: matchData.gameId,
      gameMode: matchData.gameMode,
      gameType: matchData.gameType,
      gameVersion: matchData.gameVersion,
      mapId: matchData.mapId,
      queueId: matchData.queueId,
      seasonId: matchData.seasonId,
      server: matchData.server,
      timestamp: new Date(matchData.gameCreation),
      participants: {
        create: await buildMatchParticipants(matchData, ctx)
      }
    }
  }).catch(err => {
    console.log(err)
  })
}