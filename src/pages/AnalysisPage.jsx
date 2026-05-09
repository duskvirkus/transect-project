import { useState, useEffect, useRef } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area,
} from 'recharts'
import defaultData from '../../data/default-climate.json'
import KoppenMap from '../components/KoppenMap.jsx'
import { useTempScale } from '../components/TempScaleContext.jsx'
import { usePrecipUnit } from '../components/PrecipUnitContext.jsx'
import { convertTemp, TEMP_SCALES } from '../lib/temperature.js'
import { convertPrecip } from '../lib/precipitation.js'
import { classifyStation } from '../lib/koppen.js'
import { STATION_BLURBS } from '../data/stationBlurbs.js'
import { CLIMATE_CONTROLS } from '../data/climateControls.js'
import Cite from '../components/Cite.jsx'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const DEFAULT_STATION_IDS = defaultData.stations.map(s => s.id).join(',')

function isDefaultDataset(transect) {
  if (!transect?.stations) return false
  return transect.stations.map(s => s.id).join(',') === DEFAULT_STATION_IDS
}

function validateEnriched(obj) {
  if (!obj || !Array.isArray(obj.stations) || obj.stations.length === 0) return false
  return obj.stations.every(s => typeof s.lat === 'number' && typeof s.lng === 'number' && s.name)
}

// Temperature heatmap: months on Y axis, stations on X axis
// Each cell = average of max + min for that station × month
function tempColor(value, minVal, maxVal, scale) {
  if (value == null) return '#ccc'
  const t = Math.max(0, Math.min(1, (value - minVal) / (maxVal - minVal || 1)))
  // blue (cold) → white (mid) → red (hot)
  if (t < 0.5) {
    const f = t * 2
    const r = Math.round(f * 255)
    const g = Math.round(f * 255)
    return `rgb(${r},${g},255)`
  } else {
    const f = (t - 0.5) * 2
    const g = Math.round((1 - f) * 255)
    const b = Math.round((1 - f) * 255)
    return `rgb(255,${g},${b})`
  }
}

function TempHeatmap({ stations, scale }) {
  const { symbol } = TEMP_SCALES.find(s => s.key === scale)

  // Compute all avg temps to find global min/max for color scaling
  const allAvgs = []
  for (const st of stations) {
    const cd = st.climateData
    if (!cd) continue
    for (let m = 0; m < 12; m++) {
      const avg = (cd.monthlyMaxTemp[m] + cd.monthlyMinTemp[m]) / 2
      allAvgs.push(convertTemp(avg, scale))
    }
  }
  const minVal = Math.min(...allAvgs)
  const maxVal = Math.max(...allAvgs)

  const cellH = 28
  const svgH = 12 * cellH
  // 30px SVG-unit padding on each side (half-cell) matches recharts band-scale edge padding
  const padX = 30
  const viewW = stations.length * 60 + padX * 2

  return (
    <div className="analysis-chart-section">
      <h3 className="analysis-chart-title">Temperature Heatmap ({symbol})</h3>
      <div className="analysis-heatmap-wrap">
        <div className="analysis-heatmap-months">
          {MONTHS.map(m => (
            <div key={m} className="analysis-heatmap-month-label">{m}</div>
          ))}
        </div>
        <div className="analysis-heatmap-right">
          {/* Padding matches SVG padX inset so each flex item spans exactly one cell column */}
          <div
            className="analysis-heatmap-station-labels"
            style={{ paddingLeft: `${(padX / viewW) * 100}%`, paddingRight: `${(padX / viewW) * 100}%` }}
          >
            {stations.map(st => (
              <div key={st.id} className="analysis-heatmap-slabel-wrap">
                <span className="analysis-heatmap-slabel">{st.name}</span>
              </div>
            ))}
          </div>
          <svg
            className="analysis-heatmap-svg"
            viewBox={`0 0 ${viewW} ${svgH}`}
            preserveAspectRatio="none"
            style={{ width: '100%', height: `${svgH}px` }}
          >
            {MONTHS.map((_, mi) =>
              stations.map((st, si) => {
                const cd = st.climateData
                if (!cd) return null
                const avg = (cd.monthlyMaxTemp[mi] + cd.monthlyMinTemp[mi]) / 2
                const val = convertTemp(avg, scale)
                const color = tempColor(val, minVal, maxVal, scale)
                const cx = padX + si * 60
                return (
                  <g key={`${si}-${mi}`}>
                    <rect
                      x={cx + 1}
                      y={mi * cellH + 1}
                      width={58}
                      height={cellH - 2}
                      fill={color}
                      rx="2"
                    />
                    <text
                      x={cx + 30}
                      y={mi * cellH + cellH / 2 + 4}
                      textAnchor="middle"
                      fontSize="8"
                      fill={val > (minVal + maxVal) / 2 ? '#000' : '#fff'}
                      opacity="0.8"
                    >
                      {val?.toFixed(1)}
                    </text>
                  </g>
                )
              })
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}

function PrecipChart({ stations, precipUnit }) {
  const stationTotals = stations.map(st => ({
    name: st.name,
    ...Object.fromEntries(
      MONTHS.map((m, i) => [m, convertPrecip(st.climateData?.monthlyPrecip[i] ?? null, precipUnit)])
    ),
  }))

  return (
    <div className="analysis-chart-section">
      <h3 className="analysis-chart-title">Monthly Precipitation ({precipUnit})</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={stationTotals} margin={{ top: 4, right: 8, left: 8, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" tick={{ fill: '#ccc', fontSize: 11 }} angle={-35} textAnchor="end" interval={0} padding={{ left: 40, right: 40 }} />
          <YAxis tick={{ fill: '#ccc', fontSize: 11 }} label={{ value: precipUnit, angle: -90, position: 'insideLeft', fill: '#aaa', fontSize: 11 }} />
          <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #444', color: '#fff' }} />
          {MONTHS.map((m, i) => (
            <Bar key={m} dataKey={m} stackId="a" fill={`hsl(${200 + i * 12},70%,${40 + i * 2}%)`} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function ElevationChart({ stations }) {
  const data = stations.map(st => ({
    name: st.name,
    elevation: st.elevation ?? null,
  }))

  return (
    <div className="analysis-chart-section">
      <h3 className="analysis-chart-title">Elevation Profile (m)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 40 }}>
          <defs>
            <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#64b5f6" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#64b5f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" tick={{ fill: '#ccc', fontSize: 11 }} angle={-35} textAnchor="end" interval={0} padding={{ left: 40, right: 40 }} />
          <YAxis tick={{ fill: '#ccc', fontSize: 11 }} label={{ value: 'm', angle: -90, position: 'insideLeft', fill: '#aaa', fontSize: 11 }} />
          <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #444', color: '#fff' }} formatter={v => [`${v} m`, 'Elevation']} />
          <Area type="monotone" dataKey="elevation" stroke="#64b5f6" fill="url(#elevGrad)" strokeWidth={2} dot={{ fill: '#64b5f6', r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function StationCard({ station, index, koppenClass, blurb }) {
  const photoSrc = blurb?.photo
    ? `${import.meta.env.BASE_URL}stations/${blurb.photo}`
    : `${import.meta.env.BASE_URL}stations/placeholder.png`

  return (
    <div className="station-card">
      <div className="station-card-header">
        <span className="station-badge">{index + 1}</span>
        <div>
          <div className="station-name">{station.name}</div>
          <div className="station-coords">{station.lat.toFixed(3)}°N, {station.lng.toFixed(3)}°E</div>
          {station.elevation != null && (
            <div className="station-elevation">{station.elevation} m elevation</div>
          )}
        </div>
        {koppenClass && (
          <div className="station-koppen">
            <span
              className="koppen-swatch-small"
              style={{ background: koppenClass.color }}
            />
            <span className="koppen-code">{koppenClass.code}</span>
            <span className="koppen-name-small">{koppenClass.name}</span>
          </div>
        )}
      </div>
      {blurb && (
        <>
          <img
            src={photoSrc}
            alt={station.name}
            className="station-photo"
            onError={e => { e.currentTarget.src = `${import.meta.env.BASE_URL}stations/placeholder.png` }}
          />
          <p className="station-blurb">{blurb.blurb}</p>
        </>
      )}
    </div>
  )
}

export default function AnalysisPage() {
  const { scale } = useTempScale()
  const { unit: precipUnit } = usePrecipUnit()
  const [transect, setTransect] = useState(defaultData)
  const [isDefault, setIsDefault] = useState(true)
  const [error, setError] = useState(null)
  const [koppenClasses, setKoppenClasses] = useState({})

  // Classify stations via canvas pixel sampling
  useEffect(() => {
    let cancelled = false
    async function classify() {
      const results = {}
      for (const st of transect.stations) {
        try {
          results[st.id] = await classifyStation(st.lat, st.lng)
        } catch {
          results[st.id] = null
        }
      }
      if (!cancelled) setKoppenClasses(results)
    }
    classify()
    return () => { cancelled = true }
  }, [transect])

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      let parsed
      try { parsed = JSON.parse(ev.target.result) } catch {
        setError('Invalid JSON file.')
        e.target.value = ''
        return
      }
      if (!validateEnriched(parsed)) {
        setError('JSON must have a stations array with lat, lng, and name fields.')
        e.target.value = ''
        return
      }
      setError(null)
      setTransect(parsed)
      setIsDefault(isDefaultDataset(parsed))
      e.target.value = ''
    }
    reader.readAsText(file)
  }

  const stations = transect.stations

  return (
    <div className="analysis-page-outer">
    <div className="analysis-page">
      <div className="analysis-toolbar">
        <h1 className="analysis-title">Transect Analysis Report</h1>
        <div className="analysis-toolbar-right">
          <label className="upload-label">
            Load Transect JSON
            <input type="file" accept=".json" className="upload-input" onChange={handleUpload} />
          </label>
        </div>
      </div>

      {error && <div className="upload-error analysis-error">{error}</div>}

      {/* Koppen Map Strip */}
      <section className="analysis-section">
        <h2>Koppen-Geiger Classification Map <Cite id="beck-koppen" /></h2>
        <div className="analysis-map-strip">
          <KoppenMap
            stations={stations}
            showTransect
            interactive={false}
            bearing={188}
            fitStations
          />
        </div>
      </section>

      {/* Aligned Charts */}
      <section className="analysis-section analysis-charts-section">
        <h2>Transect Climate Overview <Cite id="open-meteo" /></h2>
        <TempHeatmap stations={stations} scale={scale} />
        <PrecipChart stations={stations} precipUnit={precipUnit} />
        <ElevationChart stations={stations} />
      </section>

      {/* Station Cards */}
      <section className="analysis-section">
        <h2>Station Details</h2>
        <div className="station-cards-grid">
          {stations.map((st, i) => (
            <StationCard
              key={st.id}
              station={st}
              index={i}
              koppenClass={koppenClasses[st.id]}
              blurb={isDefault ? STATION_BLURBS[st.id] : null}
            />
          ))}
        </div>
      </section>

      {/* 7 Climatic Controls — default dataset only */}
      {isDefault && (
        <section className="analysis-section">
          <h2>Climatic Controls Along the Transect</h2>
          {CLIMATE_CONTROLS.map(control => (
            <div key={control.id} className="climate-control-section">
              <h3>{control.title}</h3>
              {control.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ))}
        </section>
      )}
    </div>
    </div>
  )
}
