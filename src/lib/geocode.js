import * as turf from '@turf/turf'

export async function findNearbyCity(transectLat, transectLng, radiusMiles) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${transectLat}&lon=${transectLng}&format=json&zoom=10`,
      { headers: { 'Accept-Language': 'en' } }
    )
    const data = await res.json()
    const a = data.address || {}
    const name = a.city || a.town || a.village || a.hamlet || a.county || a.state

    const cityLat = parseFloat(data.lat)
    const cityLng = parseFloat(data.lon)
    const offsetMi = turf.distance(
      [transectLng, transectLat],
      [cityLng, cityLat],
      { units: 'miles' }
    )

    if (name && offsetMi <= radiusMiles) {
      return { name, lat: cityLat, lng: cityLng, offset: Math.round(offsetMi) }
    }
    return {
      name: `${transectLat.toFixed(2)}°, ${transectLng.toFixed(2)}°`,
      lat: transectLat,
      lng: transectLng,
      offset: 0,
    }
  } catch {
    return {
      name: `${transectLat.toFixed(2)}°, ${transectLng.toFixed(2)}°`,
      lat: transectLat,
      lng: transectLng,
      offset: 0,
    }
  }
}
