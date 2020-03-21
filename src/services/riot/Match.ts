import { riotClient } from "./Axios"

export async function getMatchList(accountId: string, server: string, amount: number) {
  let endpoint = `https://${server}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`

  if (amount) {
    endpoint += `?endIndex=${amount}`
  }

  return riotClient.get(endpoint)
}

export function getMatch(gameId: number, server: string) {
  let endpoint = `https://${server}.api.riotgames.com/lol/match/v4/matches/${gameId}`
  return riotClient.get(endpoint)
}