import { useState, useMemo, useRef, useCallback } from 'react'
import Map, { Marker, Source, Layer, NavigationControl } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { KOPPEN_IMAGE_URL, KOPPEN_CLASSES } from '../lib/koppen.js'

const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty'

const DEFAULT_VIEW = { longitude: 114, latitude: 37, zoom: 3 }

function stationLng(s) { return s.transectLng ?? s.lng }
function stationLat(s) { return s.transectLat ?? s.lat }

// Blend a hex color with white to simulate raster-opacity over a light base map
function blendWithWhite(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${Math.round(opacity * r + (1 - opacity) * 255)},${Math.round(opacity * g + (1 - opacity) * 255)},${Math.round(opacity * b + (1 - opacity) * 255)})`
}

export default function KoppenMap({ stations = [], showTransect = false, initialViewState, interactive = true, bearing = 0, fitStations = false }) {
  const [opacity, setOpacity] = useState(0.65)
  const [legendOpen, setLegendOpen] = useState(false)
  const mapRef = useRef(null)

  const lineGeoJSON = useMemo(() => {
    if (!showTransect || stations.length < 2) return null
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: stations.map(s => [stationLng(s), stationLat(s)]),
      },
    }
  }, [stations, showTransect])

  const handleLoad = useCallback(() => {
    if (!fitStations || stations.length < 1 || !mapRef.current) return
    const lngs = stations.map(stationLng)
    const lats = stations.map(stationLat)
    mapRef.current.fitBounds(
      [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
      { padding: 80, duration: 0, bearing }
    )
  }, [fitStations, stations, bearing])

  return (
    <div className="koppen-map-wrapper">
      <div className="koppen-legend">
        <button
          className="koppen-legend-toggle"
          onClick={() => setLegendOpen(o => !o)}
        >
          <span className="koppen-legend-title">Koppen-Geiger Classifications</span>
          <span className="koppen-legend-chevron">{legendOpen ? '▲' : '▼'}</span>
        </button>
        {legendOpen && (
          <div className="koppen-legend-grid">
            {KOPPEN_CLASSES.map(({ code, name, color }) => (
              <div key={code} className="koppen-legend-item">
                <span
                  className="koppen-legend-swatch"
                  style={{ background: blendWithWhite(color, opacity) }}
                />
                <span className="koppen-legend-code">{code}</span>
                <span className="koppen-legend-name">{name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="koppen-map-container">
        <Map
          ref={mapRef}
          initialViewState={{ ...(initialViewState ?? DEFAULT_VIEW), bearing }}
          style={{ width: '100%', height: '100%' }}
          mapStyle={MAP_STYLE}
          interactive={interactive}
          onLoad={handleLoad}
        >
          <NavigationControl position="top-right" />

          <Source
            id="koppen"
            type="image"
            url={KOPPEN_IMAGE_URL}
            coordinates={[
              [-180, 85.051129],
              [ 180, 85.051129],
              [ 180, -85.051129],
              [-180, -85.051129],
            ]}
          >
            <Layer
              id="koppen-raster"
              type="raster"
              paint={{ 'raster-opacity': opacity }}
            />
          </Source>

          {lineGeoJSON && (
            <Source id="koppen-transect" type="geojson" data={lineGeoJSON}>
              <Layer
                id="koppen-transect-line"
                type="line"
                paint={{
                  'line-color': '#f59e0b',
                  'line-width': 2.5,
                  'line-dasharray': [5, 3],
                }}
              />
            </Source>
          )}

          {stations.map((s, i) => (
            <Marker key={s.id ?? i} longitude={stationLng(s)} latitude={stationLat(s)} anchor="center">
              <div className="koppen-marker" title={s.name}>
                {i + 1}
              </div>
            </Marker>
          ))}
        </Map>

        <div className="koppen-opacity-control">
          <label className="field-label" htmlFor="koppen-opacity">Overlay opacity</label>
          <input
            id="koppen-opacity"
            type="range"
            min={0}
            max={0.9}
            step={0.05}
            value={opacity}
            onChange={e => setOpacity(parseFloat(e.target.value))}
            className="koppen-slider"
          />
          <span className="koppen-opacity-value">{Math.round(opacity * 100)}%</span>
        </div>
      </div>
    </div>
  )
}
