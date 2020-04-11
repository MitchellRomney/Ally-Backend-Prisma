import { server } from 'nexus'

const session = require('express-session');
const redis = require('redis');
export const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);
const Arena = require('bull-arena')

server.express.use(
  session({
    secret: 'ThisIsHowYouUseRedisSessionStorage',
    name: '_redisPractice',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
  })
)

server.express.use('/', Arena(
    {
      queues: [
        {
          name: 'SummonerQueue',
          hostId: 'Worker',
          redis: { host: 'localhost', port: 6379 }
        }
      ]
    },
    {
      basePath: '/arena',
      disableListen: true
    }
  )
)