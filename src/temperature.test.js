import { describe, test, expect } from 'vitest'
import { convertTemp, TEMP_SCALES } from './temperature.js'

describe('convertTemp', () => {
  test('celsius passthrough', () => {
    expect(convertTemp(22, 'celsius')).toBe(22)
  })

  test('0°C → 32°F', () => {
    expect(convertTemp(0, 'fahrenheit')).toBe(32)
  })

  test('100°C → 212°F', () => {
    expect(convertTemp(100, 'fahrenheit')).toBe(212)
  })

  test('-40°C = -40°F (equivalence point)', () => {
    expect(convertTemp(-40, 'fahrenheit')).toBe(-40)
  })

  test('0°C → 273.2 K (rounded to 1 decimal)', () => {
    expect(convertTemp(0, 'kelvin')).toBe(273.2)
  })

  test('-273.15°C → 0 K (absolute zero)', () => {
    expect(convertTemp(-273.15, 'kelvin')).toBe(0)
  })

  test('0°C → 16°Ꞓ (Felsius reference point)', () => {
    expect(convertTemp(0, 'felsius')).toBe(16)
  })

  test('100°C → 156°Ꞓ', () => {
    expect(convertTemp(100, 'felsius')).toBe(156)
  })

  test('-40°C → -40°Ꞓ (equivalence point)', () => {
    expect(convertTemp(-40, 'felsius')).toBe(-40)
  })

  test('null passthrough', () => {
    expect(convertTemp(null, 'fahrenheit')).toBeNull()
    expect(convertTemp(null, 'kelvin')).toBeNull()
    expect(convertTemp(null, 'felsius')).toBeNull()
    expect(convertTemp(null, 'celsius')).toBeNull()
  })

  test('rounds to 1 decimal', () => {
    // 37°C = 98.6°F exactly, 22°C = 71.6°F exactly
    expect(convertTemp(37, 'fahrenheit')).toBe(98.6)
    expect(convertTemp(22, 'fahrenheit')).toBe(71.6)
  })
})

describe('TEMP_SCALES', () => {
  test('has exactly 4 scales', () => {
    expect(TEMP_SCALES).toHaveLength(4)
  })

  test('each scale has key, name, and symbol', () => {
    for (const scale of TEMP_SCALES) {
      expect(scale).toHaveProperty('key')
      expect(scale).toHaveProperty('name')
      expect(scale).toHaveProperty('symbol')
    }
  })

  test('contains celsius, fahrenheit, kelvin, felsius keys', () => {
    const keys = TEMP_SCALES.map(s => s.key)
    expect(keys).toContain('celsius')
    expect(keys).toContain('fahrenheit')
    expect(keys).toContain('kelvin')
    expect(keys).toContain('felsius')
  })
})
