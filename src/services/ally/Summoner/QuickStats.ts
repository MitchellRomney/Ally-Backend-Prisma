import { Participant, } from "@prisma/client";

export async function getWinrateQuickStat(data: any) {
  let latestWins = 0
  let previousWins = 0

  data.forEach((participant: Participant, index: number) => {
    latestWins += participant.win && index < 20 ? 1 : 0
    previousWins += participant.win && (index >= 20 && index < 40) ? 1 : 0
  })

  const currentWinrate = Math.round((latestWins / 20) * 100)
  const previousWinrate = Math.round((previousWins / 20) * 100)
  const growth = currentWinrate - previousWinrate

  return {
    title: 'Winrate',
    value: currentWinrate.toString(),
    growth: growth.toString(),
    suffix: '%',
    icon: 'trophy',
    significant: growth >= 30 || growth <= -30
  }
}

export async function getCSQuickStat(data: any) {
  let currentTotalCS10 = 0
  let previousTotalCS10 = 0

  data.forEach((participant: any, index: number) => {
    console.log(participant)
    const durationSeconds = participant.match.gameDuration % 60
    const durationMinutes = (participant.match.gameDuration - durationSeconds) / 60
    const totalTime = durationMinutes + (durationSeconds / 60)
    const totalCS = (participant.neutralMinionsKilled + participant.totalMinionsKilled)
    currentTotalCS10 += index < 20 ? totalCS / totalTime : 0
    previousTotalCS10 += (index >= 20 && index < 40) ? totalCS / totalTime : 0
  })

  const currentCS10 = (currentTotalCS10 / 20)
  const previousCS10 =(previousTotalCS10 / 20)
  const growth = currentCS10 - previousCS10

  return {
    title: 'CS Per Min',
    value: currentCS10.toFixed(1),
    growth: growth.toFixed(1),
    suffix: '',
    icon: 'coins',
    significant: growth >= 2 || growth <= -2
  }
}

export async function getKDAQuickStat(data: any) {
  let currentTotalKills = 0
  let currentTotalDeaths = 0
  let currentTotalAssists = 0

  let previousTotalKills = 0
  let previousTotalDeaths = 0
  let previousTotalAssists = 0

  data.forEach((participant: Participant, index: number) => {
    currentTotalKills += index < 20 ? participant.kills : 0
    currentTotalDeaths += index < 20 ? participant.deaths : 0
    currentTotalAssists += index < 20 ? participant.assists : 0
    previousTotalKills += (index >= 20 && index < 40) ? participant.kills : 0
    previousTotalDeaths += (index >= 20 && index < 40) ? participant.deaths : 0
    previousTotalAssists += (index >= 20 && index < 40) ? participant.assists : 0
  })

  const currentAverageKDA = (currentTotalKills + currentTotalAssists) / currentTotalDeaths
  const previousAverageKDA = (previousTotalKills + previousTotalAssists) / previousTotalDeaths
  const growth = currentAverageKDA - previousAverageKDA

  return {
    title: 'K/D/A',
    value: currentAverageKDA.toFixed(2).toString(),
    growth: growth.toFixed(2),
    suffix: ':1',
    icon: 'skull-crossbones',
    significant: growth >= 2 || growth <= -2
  }
}

export async function getVisionScoreQuickStat(data: any) {
  let currentTotalVisionScore = 0
  let previousTotalVisionScore = 0

  data.forEach((participant: Participant, index: number) => {
    currentTotalVisionScore += index < 20 ? participant.visionScore : 0
    previousTotalVisionScore += (index >= 20 && index < 40) ? participant.visionScore : 0
  })

  const currentAverageVisionScore = Math.round(currentTotalVisionScore / 20)
  const previousAverageVisionScore = Math.round(previousTotalVisionScore / 20)
  const growth = currentAverageVisionScore - previousAverageVisionScore

  return {
    title: 'Vision Score',
    value: currentAverageVisionScore.toString(),
    growth: growth.toString(),
    suffix: '',
    icon: 'eye',
    significant: false
  }
}