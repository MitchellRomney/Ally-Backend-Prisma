import { signup, login } from './Auth'
import { addSummonerToUser } from "./Summoner"
import { updateSystemStaticData } from "./System";

export const Mutation = {
  signup,
  login,
  addSummonerToUser,
  updateSystemStaticData
}