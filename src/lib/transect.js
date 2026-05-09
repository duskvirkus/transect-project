import * as turf from '@turf/turf'

export const STATION_COUNT = 10
export const INTERVAL_MILES = 300

/**
 * Compute STATION_COUNT evenly-spaced transect points using rhumb-line
 * navigation (constant bearing). This keeps east/west lines on the same
 * parallel and north/south lines on the same meridian, which is the
 * intuitive behavior on a Mercator map.
 *
 * Using turf.destination() (great-circle) instead would arc toward lower
 * latitudes on an east/west heading at mid-latitudes.
 */
export function computeStations(startLng, startLat, heading, intervalMiles = INTERVAL_MILES) {
  const intervalKm = turf.convertLength(intervalMiles, 'miles', 'kilometers')
  const stations = []
  for (let i = 0; i < STATION_COUNT; i++) {
    const pt = turf.rhumbDestination(
      turf.point([startLng, startLat]),
      i * intervalKm,
      heading,
      { units: 'kilometers' }
    )
    const [lng, lat] = pt.geometry.coordinates
    stations.push({
      id: i,
      transectLat: lat,
      transectLng: lng,
      lat,
      lng,
      name: null,
      offset: 0,
    })
  }
  return stations
}
