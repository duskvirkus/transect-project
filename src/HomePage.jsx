import { useState } from 'react'
import defaultData from '../data/default-climate.json'
import { fetchStationClimate } from './climate.js'
import { useTempScale } from './TempScaleContext.jsx'
import { convertTemp, TEMP_SCALES } from './temperature.js'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function downloadJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'transect-climate.json'
  a.click()
  URL.revokeObjectURL(url)
}

function validateTransect(obj) {
  if (!obj || !Array.isArray(obj.stations) || obj.stations.length === 0) return false
  return obj.stations.every(s => typeof s.lat === 'number' && typeof s.lng === 'number' && s.name)
}

export default function HomePage() {
  const { scale } = useTempScale()
  const { symbol } = TEMP_SCALES.find(s => s.key === scale)
  const [transect, setTransect] = useState(defaultData)
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(defaultData.stations.map(s => [s.id, 'done']))
  )
  const [fetching, setFetching] = useState(false)
  const [countdowns, setCountdowns] = useState({})
  const [showSaveNotice, setShowSaveNotice] = useState(false)
  const [error, setError] = useState(null)

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (ev) => {
      let parsed
      try {
        parsed = JSON.parse(ev.target.result)
      } catch {
        setError('Invalid JSON file.')
        e.target.value = ''
        return
      }
      if (!validateTransect(parsed)) {
        setError('JSON must have a stations array with lat, lng, and name fields.')
        e.target.value = ''
        return
      }
      setError(null)
      // Strip any existing climateData so we fetch fresh
      const base = {
        ...parsed,
        stations: parsed.stations.map(({ climateData: _cd, ...s }) => s),
      }
      // Show all stations immediately; update in-place as data arrives
      const working = base.stations.map(s => ({ ...s }))
      setTransect({ ...base, stations: working })
      setStatuses(Object.fromEntries(base.stations.map(s => [s.id, 'pending'])))
      setCountdowns({})
      setFetching(true)

      for (let i = 0; i < working.length; i++) {
        const station = working[i]
        setStatuses(prev => ({ ...prev, [station.id]: 'loading' }))
        await new Promise(r => setTimeout(r, 150))
        try {
          const climateData = await fetchStationClimate(station.lat, station.lng, (t) => {
            setCountdowns(prev => ({ ...prev, [station.id]: t || null }))
          })
          working[i] = { ...station, climateData }
          setTransect(t => ({ ...t, stations: [...working] }))
          setStatuses(prev => ({ ...prev, [station.id]: 'done' }))
          setCountdowns(prev => ({ ...prev, [station.id]: null }))
        } catch {
          setStatuses(prev => ({ ...prev, [station.id]: 'error' }))
        }
        if (i < working.length - 1) await new Promise(r => setTimeout(r, 3000))
      }
      setFetching(false)
      setShowSaveNotice(true)
      e.target.value = ''
    }
    reader.readAsText(file)
  }

  const allDone = transect.stations.every(s => statuses[s.id] === 'done')

  return (
    <div className="home-page">
      <div className="home-toolbar">
        <div className="home-toolbar-left">
          <label className="upload-label">
            Upload Transect JSON
            <input
              type="file"
              accept=".json"
              className="upload-input"
              onChange={handleUpload}
              disabled={fetching}
            />
          </label>
          {error && <span className="upload-error">{error}</span>}
        </div>
        <button
          className="save-btn download-btn"
          onClick={() => { downloadJSON(transect); setShowSaveNotice(false) }}
          disabled={fetching || !allDone}
        >
          Download JSON
        </button>
      </div>

      {showSaveNotice && (
        <div className="save-notice">
          Download your JSON to save your climate data — it will be lost if you reload and you'll have to fetch it again.
          <button className="save-notice-dismiss" onClick={() => setShowSaveNotice(false)}>✕</button>
        </div>
      )}

      {fetching && (
        <div className="fetch-banner">
          Fetching climate data from Open-Meteo — this may take a few minutes. Please keep this tab open.
        </div>
      )}

      <div className="stations-grid">
        {transect.stations.map((station, i) => {
          const status = statuses[station.id] ?? 'pending'
          const countdown = countdowns[station.id]
          const cd = station.climateData
          return (
            <div key={station.id} className="climate-card">
              <div className="climate-card-header">
                <span className="station-badge">{i + 1}</span>
                <div className="climate-card-title">
                  <span className="station-name">{station.name}</span>
                  <span className="station-coords">
                    {station.lat.toFixed(3)}°N, {station.lng.toFixed(3)}°E
                  </span>
                </div>
                {status !== 'done' && (
                  <span className={`fetch-status fetch-status-${countdown ? 'retry' : status}`}>
                    {countdown
                      ? `Rate limited — retrying in ${countdown}s`
                      : status === 'loading' ? 'Fetching…'
                      : status === 'error' ? 'Error'
                      : 'Queued'}
                  </span>
                )}
              </div>

              {cd && (
                <div className="climate-table-wrap">
                  <table className="climate-table">
                    <thead>
                      <tr>
                        <th></th>
                        {MONTHS.map(m => <th key={m}>{m}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="row-label">Max {symbol}</td>
                        {cd.monthlyMaxTemp.map((v, m) => (
                          <td key={m}>{convertTemp(v, scale) ?? '–'}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="row-label">Min {symbol}</td>
                        {cd.monthlyMinTemp.map((v, m) => (
                          <td key={m}>{convertTemp(v, scale) ?? '–'}</td>
                        ))}
                      </tr>
                      <tr>
                        <td className="row-label">Precip mm</td>
                        {cd.monthlyPrecip.map((v, m) => (
                          <td key={m}>{v ?? '–'}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
