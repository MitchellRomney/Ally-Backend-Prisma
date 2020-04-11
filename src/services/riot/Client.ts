import axios from 'axios'
import { log } from "nexus"
import { redisClient } from "../../app"

export const http = axios.create({
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    "X-Riot-Token": process.env.RIOT_TOKEN
  }
});

export function RiotRequestHandler(url: string, method: string) {

  redisClient.get(method, (err: any, result: any) => {
    console.log(result)

    if (result) {
      redisClient.incr(method)
    } else {
      redisClient.setex(method, 10, 1)
    }
  })

  return http.get(url).then(response => {

    console.log(`${method} - ${response.headers['x-app-rate-limit-count']}`)

    switch(response.status) {
      case 400:
        log.error(`400: Bad Request - Aborting`)
        return

      case 401:
        log.error(`401: Unauthorized - Aborting`)
        return

      case 403:
        log.error(`403: Forbidden - Aborting`)
        return

      case 415:
        log.error(`415: Unsupported Media Type - Aborting`)
        return

      case 429:
        log.error(`429: Rate Limit Exceeded - Aborting, Headers Below`)
        log.debug(response.headers)
        return

      case 500:
        log.error(`500: Internal Server Error - Aborting`)
        return

      case 503:
        log.error(`503: Service Unavailable - Aborting`)
        return

      default:
        return response
    }
  })
}