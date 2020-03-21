import { riotClient } from "./Axios"

export async function getSummoner(summonerName: string, server: string) {
  const endpoint = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`
  return riotClient.get(endpoint)
}