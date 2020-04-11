import { http } from "./Client"

export async function getChampions(patch: string) {
  return http.get(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`)
}

export async function getItems(patch: string) {
  return http.get(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/item.json`)
}

export async function getRunes(patch: string) {
  return http.get(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/runesReforged.json`)
}

export async function getSummonerSpells(patch: string) {
  return http.get(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/summoner.json`)
}

export async function getVersions() {
  return http.get(`http://ddragon.leagueoflegends.com/api/versions.json`)
}