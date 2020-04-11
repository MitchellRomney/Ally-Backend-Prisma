import { RiotRequestHandler } from "./Client"

export async function getSummoner(summonerName: string, server: string, summonerId?: string) {
  const endpoint = summonerId
    ? `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}`
    : `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`
  return RiotRequestHandler(endpoint, 'summoner-summoners')
}