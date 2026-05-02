import { describe, test, expect } from 'vitest'
import * as turf from '@turf/turf'
import { computeStations, STATION_COUNT, INTERVAL_MILES } from './transect.js'

// A mid-latitude US starting point used across all tests.
const START_LNG = -98
const START_LAT = 40

describe('computeStations', () => {
  test('returns exactly STATION_COUNT stations', () => {
    const stations = computeStations(START_LNG, START_LAT, 0)
    expect(stations).toHaveLength(STATION_COUNT)
  })

  test('first station is the start point', () => {
    const stations = computeStations(START_LNG, START_LAT, 0)
    expect(stations[0].transectLat).toBeCloseTo(START_LAT, 5)
    expect(stations[0].transectLng).toBeCloseTo(START_LNG, 5)
  })

  test('heading 0 (north): latitude increases, longitude stays constant', () => {
    const stations = computeStations(START_LNG, START_LAT, 0)
    for (let i = 1; i < stations.length; i++) {
      expect(stations[i].transectLat).toBeGreaterThan(stations[i - 1].transectLat)
      expect(stations[i].transectLng).toBeCloseTo(START_LNG, 3)
    }
  })

  test('heading 90 (east): longitude increases, latitude stays constant', () => {
    const stations = computeStations(START_LNG, START_LAT, 90)
    for (let i = 1; i < stations.length; i++) {
      expect(stations[i].transectLng).toBeGreaterThan(stations[i - 1].transectLng)
      expect(stations[i].transectLat).toBeCloseTo(START_LAT, 3)
    }
  })

  test('heading 180 (south): latitude decreases, longitude stays constant', () => {
    const stations = computeStations(START_LNG, START_LAT, 180)
    for (let i = 1; i < stations.length; i++) {
      expect(stations[i].transectLat).toBeLessThan(stations[i - 1].transectLat)
      expect(stations[i].transectLng).toBeCloseTo(START_LNG, 3)
    }
  })

  test('heading 270 (west): longitude decreases, latitude stays constant', () => {
    const stations = computeStations(START_LNG, START_LAT, 270)
    for (let i = 1; i < stations.length; i++) {
      expect(stations[i].transectLng).toBeLessThan(stations[i - 1].transectLng)
      // This is the case that failed with turf.destination (great-circle).
      // Rhumb-line west follows the parallel — latitude must not drift.
      expect(stations[i].transectLat).toBeCloseTo(START_LAT, 3)
    }
  })

  test('consecutive stations are ~300 miles apart', () => {
    const stations = computeStations(START_LNG, START_LAT, 45)
    for (let i = 1; i < stations.length; i++) {
      const dist = turf.rhumbDistance(
        [stations[i - 1].transectLng, stations[i - 1].transectLat],
        [stations[i].transectLng, stations[i].transectLat],
        { units: 'miles' }
      )
      expect(dist).toBeCloseTo(INTERVAL_MILES, 0) // within 0.5 miles
    }
  })

  test('NE diagonal: latitude and longitude both increase', () => {
    const stations = computeStations(START_LNG, START_LAT, 45)
    for (let i = 1; i < stations.length; i++) {
      expect(stations[i].transectLat).toBeGreaterThan(stations[i - 1].transectLat)
      expect(stations[i].transectLng).toBeGreaterThan(stations[i - 1].transectLng)
    }
  })

  test('SW diagonal: latitude and longitude both decrease', () => {
    const stations = computeStations(START_LNG, START_LAT, 225)
    for (let i = 1; i < stations.length; i++) {
      expect(stations[i].transectLat).toBeLessThan(stations[i - 1].transectLat)
      expect(stations[i].transectLng).toBeLessThan(stations[i - 1].transectLng)
    }
  })
})
