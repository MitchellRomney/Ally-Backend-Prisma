import axios from 'axios'

export const riotClient = axios.create({
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    "X-Riot-Token": process.env.RIOT_TOKEN
  }
});