export const TEMP_SCALES = [
  { key: 'celsius',    name: 'Celsius',    symbol: '°C' },
  { key: 'fahrenheit', name: 'Fahrenheit', symbol: '°F' },
  { key: 'kelvin',     name: 'Kelvin',     symbol: 'K'  },
  { key: 'felsius',    name: 'Felsius',    symbol: '°Ꞓ' },
]

/**
 * Convert a Celsius value to the given scale, rounded to 1 decimal.
 * Returns null if celsius is null/undefined.
 */
export function convertTemp(celsius, scale) {
  if (celsius == null) return null
  let value
  switch (scale) {
    case 'fahrenheit': value = celsius * 9 / 5 + 32; break
    case 'kelvin':     value = celsius + 273.15;      break
    case 'felsius':    value = celsius * 7 / 5 + 16;  break
    default:           value = celsius;                break
  }
  return Math.round(value * 10) / 10
}
