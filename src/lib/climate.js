/**
 * Fetches 1996–2025 climatological normals for a given lat/lng using the
 * Open-Meteo ERA5 archive API. Returns 12-month arrays (Jan–Dec) for:
 *   - monthlyMaxTemp: average daily max temperature (°C)
 *   - monthlyMinTemp: average daily min temperature (°C)
 *   - monthlyPrecip:  average monthly total precipitation (mm)
 */
export async function fetchStationClimate(lat, lng, onCountdown) {
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
    // Back off 15s, 30s, 45s, 60s — tick countdown each second
    const waitSec = attempt * 15
    for (let t = waitSec; t > 0; t--) {
      onCountdown?.(t)
      await new Promise(r => setTimeout(r, 1000))
    }
    onCountdown?.(0)
  }
  if (!res.ok) throw new Error(`Open-Meteo error ${res.status} for (${lat}, ${lng})`)

  const data = await res.json()
  const elevation = data.elevation ?? null
  const { time, temperature_2m_max, temperature_2m_min, precipitation_sum } = data.daily

  // Accumulators for temperature (straight daily average per calendar month)
  const maxSum = new Array(12).fill(0)
  const maxCount = new Array(12).fill(0)
  const minSum = new Array(12).fill(0)
  const minCount = new Array(12).fill(0)

  // For precip: accumulate daily values into monthly totals, keyed by year
  // so we can average monthly totals across the 30 years
  const precipByYearMonth = {}

  for (let i = 0; i < time.length; i++) {
    const month = parseInt(time[i].slice(5, 7), 10) - 1  // 0–11
    const year = parseInt(time[i].slice(0, 4), 10)

    if (temperature_2m_max[i] != null) {
      maxSum[month] += temperature_2m_max[i]
      maxCount[month]++
    }
    if (temperature_2m_min[i] != null) {
      minSum[month] += temperature_2m_min[i]
      minCount[month]++
    }
    if (precipitation_sum[i] != null) {
      if (!precipByYearMonth[year]) precipByYearMonth[year] = new Array(12).fill(0)
      precipByYearMonth[year][month] += precipitation_sum[i]
    }
  }

  const monthlyMaxTemp = maxSum.map((s, m) =>
    maxCount[m] > 0 ? Math.round((s / maxCount[m]) * 10) / 10 : null
  )
  const monthlyMinTemp = minSum.map((s, m) =>
    minCount[m] > 0 ? Math.round((s / minCount[m]) * 10) / 10 : null
  )

  const yearlyTotals = Object.values(precipByYearMonth)
  const monthlyPrecip = Array.from({ length: 12 }, (_, m) => {
    const totals = yearlyTotals.map(y => y[m])
    return Math.round((totals.reduce((a, b) => a + b, 0) / totals.length) * 10) / 10
  })

  return { monthlyMaxTemp, monthlyMinTemp, monthlyPrecip, elevation }
}
