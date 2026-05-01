import { useState, useCallback, useRef } from 'react'
import Map, { Marker, Source, Layer, NavigationControl } from 'react-map-gl/maplibre'
import * as turf from '@turf/turf'
import 'maplibre-gl/dist/maplibre-gl.css'
import './App.css'

const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty'
const STATION_COUNT = 10
const INTERVAL_KM = turf.convertLength(300, 'miles', 'kilometers')

const COMPASS_DIRS = [
  ['N', 0], ['NE', 45], ['E', 90], ['SE', 135],
  ['S', 180], ['SW', 225], ['W', 270], ['NW', 315],
]

async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await res.json()
    const a = data.address || {}
    return a.city || a.town || a.village || a.hamlet || a.county || a.state || `${lat.toFixed(2)}, ${lng.toFixed(2)}`
  } catch {
    return `${lat.toFixed(2)}, ${lng.toFixed(2)}`
  }
}

function computeStations(startLng, startLat, heading) {
  const stations = []
  for (let i = 0; i < STATION_COUNT; i++) {
    const pt = turf.destination(
      turf.point([startLng, startLat]),
      i * INTERVAL_KM,
      heading,
      { units: 'kilometers' }
    )
    const [lng, lat] = pt.geometry.coordinates
    stations.push({ id: i, lng, lat, name: null })
  }
  return stations
}

export default function App() {
  const [startPoint, setStartPoint] = useState(null)
  const [heading, setHeading] = useState(0)
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchTimer = useRef(null)

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

  const generateTransect = async () => {
    if (!startPoint) return
    setLoading(true)
    const raw = computeStations(startPoint.lng, startPoint.lat, heading)
    // Show positions immediately, then fill in names one by one
    setStations(raw.map(s => ({ ...s, name: '…' })))
    const named = [...raw]
    for (let i = 0; i < named.length; i++) {
      named[i] = { ...named[i], name: await reverseGeocode(named[i].lat, named[i].lng) }
      setStations([...named])
      // Nominatim rate limit: 1 req/s
      if (i < named.length - 1) await new Promise(r => setTimeout(r, 1100))
    }
    setLoading(false)
  }

  const lineGeoJSON = stations.length >= 2 ? {
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: stations.map(s => [s.lng, s.lat]) }
  } : null

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Transect Builder</h1>
          <p className="subtitle">MET 1050 · 10 stations · ~300 mi apart</p>
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
          <label className="field-label">Heading: {heading}°</label>
          <div className="compass-grid">
            {COMPASS_DIRS.map(([label, deg]) => (
              <button
                key={deg}
                className={`compass-btn${heading === deg ? ' active' : ''}`}
                onClick={() => setHeading(deg)}
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
            onChange={e => setHeading(Number(e.target.value))}
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
          initialViewState={{ longitude: -98, latitude: 38, zoom: 4 }}
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
