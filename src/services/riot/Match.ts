import { RiotRequestHandler } from "./Client"

export async function getMatchList(accountId: string, server: string, amount: number) {
  let endpoint = `https://${server}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`

  if (amount) {
    endpoint += `?endIndex=${amount}`
  }

  return RiotRequestHandler(endpoint, 'match-matchlists')
}

export async function getMatch(gameId: number, server: string) {
  let endpoint = `https://${server}.api.riotgames.com/lol/match/v4/matches/${gameId}`

  return RiotRequestHandler(endpoint, 'match-matches')
}