export const PRECIP_UNITS = [
  { key: 'mm', label: 'mm', name: 'Millimeters' },
  { key: 'cm', label: 'cm', name: 'Centimeters' },
  { key: 'in', label: 'in', name: 'Inches' },
]

export function convertPrecip(mm, unit) {
  if (mm == null) return null
  if (unit === 'cm') return Math.round((mm / 10) * 10) / 10
  if (unit === 'in') return Math.round((mm / 25.4) * 10) / 10
  return Math.round(mm * 10) / 10
}
