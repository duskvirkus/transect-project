import { useState, useCallback, useRef } from 'react'
import Map, { Marker, Source, Layer, NavigationControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { computeStations } from '../lib/transect.js'
import { findNearbyCity } from '../lib/geocode.js'
import transectData from '../../data/transect.json'

const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty'

const COMPASS_DIRS = [
  ['N', 0], ['NE', 45], ['E', 90], ['SE', 135],
  ['S', 180], ['SW', 225], ['W', 270], ['NW', 315],
]

export default function BuilderPage() {
  const [startPoint, setStartPoint] = useState(transectData.startPoint)
  const [heading, setHeading] = useState(transectData.heading)
  const [headingInput, setHeadingInput] = useState(String(transectData.heading))
  const [cityRadius, setCityRadius] = useState(transectData.cityRadius)
  const [stationSpacing, setStationSpacing] = useState(300)
  const [stations, setStations] = useState(transectData.stations)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('Fuji, Shizuoka Prefecture')
  const [searchResults, setSearchResults] = useState([])
  const searchTimer = useRef(null)

  const setHeadingValue = (val) => {
    setHeading(val)
    setHeadingInput(String(val))
  }

  const handleHeadingText = (raw) => {
    setHeadingInput(raw)
    const n = parseInt(raw, 10)
    if (!isNaN(n) && n >= 0 && n <= 359) setHeading(n)
  }

  const handleHeadingBlur = () => {
    const n = parseInt(headingInput, 10)
    const clamped = isNaN(n) ? heading : Math.max(0, Math.min(359, n))
    setHeading(clamped)
    setHeadingInput(String(clamped))
  }

  const handleSearchInput = (q) => {
    setSearchQuery(q)
    clearTimeout(searchTimer.current)
    if (!q.trim()) { setSearchResults([]); return }
    searchTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`,
          { headers: { 'Accept-Language': 'en' } }
        )
        setSearchResults(await res.json())
      } catch { setSearchResults([]) }
    }, 400)
  }

  const selectResult = (result) => {
    const lat = parseFloat(result.lat)
    const lng = parseFloat(result.lon)
    setStartPoint({ lat, lng })
    setSearchQuery(result.display_name.split(',').slice(0, 2).join(',').trim())
    setSearchResults([])
    setStations([])
  }

  const handleMapClick = useCallback((e) => {
    setStartPoint({ lat: e.lngLat.lat, lng: e.lngLat.lng })
    setStations([])
    setSearchQuery('')
    setSearchResults([])
  }, [])

  const saveTransect = () => {
    const config = { startPoint, heading, cityRadius, stations }
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transect-${heading}deg.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const generateTransect = async () => {
    if (!startPoint) return
    setLoading(true)
    const raw = computeStations(startPoint.lng, startPoint.lat, heading, stationSpacing)
    setStations(raw.map(s => ({ ...s, name: '…' })))
    const named = [...raw]
    for (let i = 0; i < named.length; i++) {
      const { name, lat, lng, offset } = await findNearbyCity(
        named[i].transectLat,
        named[i].transectLng,
        cityRadius
      )
      named[i] = { ...named[i], name, lat, lng, offset }
      setStations([...named])
      if (i < named.length - 1) await new Promise(r => setTimeout(r, 1100))
    }
    setLoading(false)
  }

  const lineGeoJSON = stations.length >= 2 ? {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: stations.map(s => [s.transectLng, s.transectLat]),
    }
  } : null

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Transect Builder</h1>
          <p className="subtitle">MET 1050 · 10 stations · ~{stationSpacing} mi apart</p>
        </div>

        <section className="section">
          <label className="field-label">Start Location</label>
          <div className="search-wrapper">
            <input
              type="text"
              className="text-input"
              placeholder="Search city, or click the map…"
              value={searchQuery}
              onChange={e => handleSearchInput(e.target.value)}
            />
            {searchResults.length > 0 && (
              <ul className="search-dropdown">
                {searchResults.map(r => (
                  <li key={r.place_id} onClick={() => selectResult(r)}>
                    {r.display_name.split(',').slice(0, 3).join(', ')}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {startPoint && (
            <p className="coords">
              {startPoint.lat.toFixed(4)}°N &nbsp; {startPoint.lng.toFixed(4)}°E
            </p>
          )}
        </section>

        <section className="section">
          <div className="heading-header">
            <label className="field-label">Heading</label>
            <div className="heading-input-wrap">
              <input
                type="number"
                className="degree-input"
                min="0"
                max="359"
                value={headingInput}
                onChange={e => handleHeadingText(e.target.value)}
                onBlur={handleHeadingBlur}
              />
              <span className="degree-symbol">°</span>
            </div>
          </div>
          <div className="compass-grid">
            {COMPASS_DIRS.map(([label, deg]) => (
              <button
                key={deg}
                className={`compass-btn${heading === deg ? ' active' : ''}`}
                onClick={() => setHeadingValue(deg)}
              >
                {label}
              </button>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max="359"
            value={heading}
            onChange={e => setHeadingValue(Number(e.target.value))}
            className="heading-slider"
          />
        </section>

        <section className="section">
          <label className="field-label">City search radius: {cityRadius} mi</label>
          <input
            type="range"
            min="0"
            max="300"
            step="10"
            value={cityRadius}
            onChange={e => setCityRadius(Number(e.target.value))}
            className="heading-slider"
          />
          <p className="radius-hint">
            {cityRadius === 0
              ? 'Stations placed at exact transect points'
              : `Snap to nearest city within ${cityRadius} mi of each point`}
          </p>
        </section>

        <section className="section">
          <label className="field-label">Station spacing: {stationSpacing} mi</label>
          <input
            type="range"
            min="5"
            max="500"
            step="5"
            value={stationSpacing}
            onChange={e => setStationSpacing(Number(e.target.value))}
            className="heading-slider"
          />
        </section>

        <button
          className="generate-btn"
          onClick={generateTransect}
          disabled={!startPoint || loading}
        >
          {loading ? 'Geocoding stations…' : 'Generate Transect'}
        </button>

        {stations.length > 0 && (
          <button
            className="save-btn"
            onClick={saveTransect}
            disabled={loading}
          >
            Save JSON
          </button>
        )}

        {stations.length > 0 && (
          <section className="section stations-section">
            <label className="field-label">Stations</label>
            <ol className="station-list">
              {stations.map((s, i) => (
                <li key={s.id} className="station-item">
                  <span className="station-badge">{i + 1}</span>
                  <span className="station-info">
                    <span className="station-name">{s.name}</span>
                    <span className="station-coords">
                      {s.lat.toFixed(3)}°, {s.lng.toFixed(3)}°
                      {s.offset > 0 && (
                        <span className="station-offset"> · {s.offset} mi off line</span>
                      )}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </aside>

      <main className="map-container">
        <Map
          initialViewState={{ longitude: 114, latitude: 38, zoom: 4 }}
          style={{ width: '100%', height: '100%' }}
          mapStyle={MAP_STYLE}
          onClick={handleMapClick}
          cursor="crosshair"
        >
          <NavigationControl position="top-right" />

          {lineGeoJSON && (
            <Source id="transect" type="geojson" data={lineGeoJSON}>
              <Layer
                id="transect-line"
                type="line"
                paint={{
                  'line-color': '#f59e0b',
                  'line-width': 2.5,
                  'line-dasharray': [5, 3],
                }}
              />
            </Source>
          )}

          {startPoint && stations.length === 0 && (
            <Marker longitude={startPoint.lng} latitude={startPoint.lat} anchor="center">
              <div className="marker marker-start">★</div>
            </Marker>
          )}

          {stations.map((s, i) => (
            <Marker key={s.id} longitude={s.lng} latitude={s.lat} anchor="center">
              <div className={`marker ${i === 0 ? 'marker-start' : 'marker-station'}`}>
                {i + 1}
              </div>
            </Marker>
          ))}
        </Map>
      </main>
    </div>
  )
}
