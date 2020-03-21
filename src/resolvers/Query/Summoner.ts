import { queryField, stringArg } from 'nexus'
import { getSummoner } from "../../services/riot/Summoner"

export const summoner = queryField('summoner', {
  type: 'Summoner',
  nullable: true,
  args: {
    server: stringArg({ nullable: false }),
    summonerName: stringArg({ nullable: false })
  },
  async resolve(parent, { server, summonerName }, ctx) {
    let summoner = await ctx.prisma.summoner.findOne({
      where: {
        server_summonerName: {
          server: server,
          summonerName: summonerName
        }
      }
    })

    if (!summoner) {
      const response = await getSummoner(summonerName, server)
      summoner = await ctx.prisma.summoner.create({
        data: {
          summonerId: response.data.id,
          accountId: response.data.accountId,
          puuid: response.data.puuid,
          summonerName: response.data.name,
          profileIconId: response.data.profileIconId,
          summonerLevel: response.data.summonerLevel,
          server: server,
        }
      })
    }

    return summoner
  }
})

export const allSummoners = queryField('allSummoners', {
  type: 'Summoner',
  nullable: true,
  list: true,
  async resolve(parent, {},  ctx) {
    return await ctx.prisma.summoner.findMany()
  }
})

export const getQuickStats = queryField('getQuickStats', {
  type: 'QuickStat',
  list: true,
  nullable: true,
  args: {
    server: stringArg({ nullable: false }),
    summonerName: stringArg({ nullable: false })
  },
  async resolve(parent, { server, summonerName }, ctx) {
    const winrate = {
      title: 'Winrate',
      value: 65,
      growth: 10,
      suffix: '%',
      icon: 'trophy',
      significant: false
    }

    return [winrate,]
  }
})