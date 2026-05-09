import { useState } from 'react'
import Cite from './Cite.jsx'

const CONTROL_LABELS = [
  { key: 'latitude', label: '1. Latitude / Insolation' },
  { key: 'land-sea', label: '2. Land-Sea Distribution' },
  { key: 'ocean-currents', label: '3. Ocean Currents' },
  { key: 'winds', label: '4. Prevailing Winds' },
  { key: 'pressure', label: '5. Pressure Systems' },
  { key: 'topography', label: '6. Mountains / Topography' },
  { key: 'altitude', label: '7. Altitude' },
]

const BASE_URL = import.meta.env.BASE_URL

function photoSrc(photo) {
  if (!photo) return `${BASE_URL}stations/placeholder.png`
  if (photo.startsWith('http')) return photo
  return `${BASE_URL}${photo}`
}

function ControlAnswer({ answer }) {
  if (!answer) return null
  const { text, citeIds = [] } = answer
  const isFlag = text === '!needs more information!'
  return (
    <span className={isFlag ? 'station-tab-needs-info' : 'station-tab-control-answer'}>
      {text}
      {citeIds.map(id => <span key={id}>{' '}<Cite id={id} /></span>)}
    </span>
  )
}

export default function StationTabs({ stations, stationData, koppenClasses = {} }) {
  const [active, setActive] = useState(0)

  const st = stations[active]
  const data = stationData[st?.id]
  const koppenClass = koppenClasses[st?.id]

  return (
    <div className="station-tabs">
      {/* Tab strip — padded to align with chart plot area */}
      <div className="station-tabs-strip-wrap">
        <div className="station-tabs-strip">
          {stations.map((s, i) => (
            <button
              key={s.id}
              className={`station-tab-btn${active === i ? ' station-tab-btn-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="station-tab-num">{i + 1}</span>
              <span className="station-tab-name">{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content panel */}
      {st && data && (
        <div className="station-tab-panel">
          <div className="station-tab-photo-col">
            <img
              src={photoSrc(data.photo)}
              alt={data.name}
              className="station-tab-photo"
              onError={e => { e.currentTarget.src = `${BASE_URL}stations/placeholder.png` }}
            />
            {data.photoCredit && (
              <p className="station-tab-photo-credit">
                {data.photoCredit.url
                  ? <a href={data.photoCredit.url} target="_blank" rel="noopener noreferrer">{data.photoCredit.text}</a>
                  : data.photoCredit.text
                }
              </p>
            )}
          </div>

          <div className="station-tab-info">
            <div className="station-tab-title-row">
              <h3 className="station-tab-city-name">{data.name}</h3>
              {koppenClass && (
                <div className="station-koppen">
                  <span className="koppen-swatch-small" style={{ background: koppenClass.color }} />
                  <span className="koppen-code">{koppenClass.code}</span>
                  <span className="koppen-name-small">{koppenClass.name}</span>
                </div>
              )}
            </div>
            <p className="station-tab-pop">
              Population: {data.population.toLocaleString()}
              {data.populationCiteId && <> <Cite id={data.populationCiteId} /></>}
            </p>
            <p className="station-tab-blurb">
              {data.blurb}
              {data.citationId && <> <Cite id={data.citationId} /></>}
            </p>

            <div className="station-tab-controls">
              <h4 className="station-tab-controls-heading">Climatic Controls</h4>
              {CONTROL_LABELS.map(({ key, label }) => (
                <div key={key} className="station-tab-control-row">
                  <span className="station-tab-control-label">{label}</span>
                  <ControlAnswer answer={data.controls[key]} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
