const Bull = require('bull')

export const SummonerQueue = new Bull('SummonerQueue')

SummonerQueue.process(async (job: any) => {
  console.log(job.data)
});