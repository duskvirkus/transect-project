#!/usr/bin/env node
// One-time script to pre-fetch climate data for the default transect.
// Run from the project root:
//   node scripts/fetch-default-climate.js
// Writes to data/default-climate.json

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const transectPath = resolve(__dirname, '../data/transect-278deg.json')
const outputPath = resolve(__dirname, '../data/default-climate.json')

async function fetchStationClimate(lat, lng) {
  const url = new URL('https://archive-api.open-meteo.com/v1/archive')
  url.searchParams.set('latitude', lat)
  url.searchParams.set('longitude', lng)
  url.searchParams.set('start_date', '1996-01-01')
  url.searchParams.set('end_date', '2025-12-31')
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum')
  url.searchParams.set('timezone', 'UTC')

  let res
  for (let attempt = 1; attempt <= 5; attempt++) {
    res = await fetch(url)
    if (res.status !== 429) break
    const wait = attempt * 10000
    process.stdout.write(`(rate limited, waiting ${wait / 1000}s) `)
    await new Promise(r => setTimeout(r, wait))
  }
  if (!res.ok) throw new Error(`Open-Meteo error ${res.status} for (${lat}, ${lng})`)

  const data = await res.json()
  const { time, temperature_2m_max, temperature_2m_min, precipitation_sum } = data.daily

  const maxSum = new Array(12).fill(0), maxCount = new Array(12).fill(0)
  const minSum = new Array(12).fill(0), minCount = new Array(12).fill(0)
  const precipByYearMonth = {}

  for (let i = 0; i < time.length; i++) {
    const month = parseInt(time[i].slice(5, 7), 10) - 1
    const year = parseInt(time[i].slice(0, 4), 10)
    if (temperature_2m_max[i] != null) { maxSum[month] += temperature_2m_max[i]; maxCount[month]++ }
    if (temperature_2m_min[i] != null) { minSum[month] += temperature_2m_min[i]; minCount[month]++ }
    if (precipitation_sum[i] != null) {
      if (!precipByYearMonth[year]) precipByYearMonth[year] = new Array(12).fill(0)
      precipByYearMonth[year][month] += precipitation_sum[i]
    }
  }

  const monthlyMaxTemp = maxSum.map((s, m) => maxCount[m] > 0 ? Math.round((s / maxCount[m]) * 10) / 10 : null)
  const monthlyMinTemp = minSum.map((s, m) => minCount[m] > 0 ? Math.round((s / minCount[m]) * 10) / 10 : null)
  const yearlyTotals = Object.values(precipByYearMonth)
  const monthlyPrecip = Array.from({ length: 12 }, (_, m) => {
    const totals = yearlyTotals.map(y => y[m])
    return Math.round((totals.reduce((a, b) => a + b, 0) / totals.length) * 10) / 10
  })

  return { monthlyMaxTemp, monthlyMinTemp, monthlyPrecip }
}

async function main() {
  const transect = JSON.parse(readFileSync(transectPath, 'utf8'))
  const enriched = { ...transect, stations: [] }

  for (const station of transect.stations) {
    process.stdout.write(`Fetching ${station.name} (${station.lat.toFixed(3)}, ${station.lng.toFixed(3)})… `)
    const climateData = await fetchStationClimate(station.lat, station.lng)
    enriched.stations.push({ ...station, climateData })
    console.log('done')
    await new Promise(r => setTimeout(r, 3000))
  }

  writeFileSync(outputPath, JSON.stringify(enriched, null, 2))
  console.log(`\nWrote ${outputPath}`)
}

main().catch(err => { console.error(err); process.exit(1) })
