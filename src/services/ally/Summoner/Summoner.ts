export async function saveSummoner(summonerData: any, server: string, ctx: NexusContext) {
  const summoner = summonerData.data
  return ctx.db.summoner.upsert({
    where: {
      server_summonerId: {
        server: server,
        summonerId: summoner.id
      }
    },
    update: {
      summonerName: summoner.summonerName ? summoner.summonerName : summoner.name,
      accountId: summoner.currentAccountId ? summoner.currentAccountId : summoner.accountId,
      puuid: summoner.puuid,
      summonerLevel: summoner.summonerLevel,
      profileIconId: summoner.profileIcon ? summoner.profileIcon : summoner.profileIconId
    },
    create: {
      server: server,
      summonerName: summoner.summonerName ? summoner.summonerName : summoner.name,
      summonerId: summoner.id,
      puuid: summoner.puuid,
      summonerLevel: summoner.summonerLevel,
      accountId: summoner.currentAccountId ? summoner.currentAccountId : summoner.accountId,
      profileIconId: summoner.profileIcon ? summoner.profileIcon : summoner.profileIconId
    }
  })
}