import { riotClient } from "./Axios";

export async function getChampions(patch: string) {
  return riotClient.get(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`)
}

export async function getVersions() {
  return riotClient.get(`http://ddragon.leagueoflegends.com/api/versions.json`)
}