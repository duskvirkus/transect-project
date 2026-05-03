## Purpose
Defines requirements for the temperature conversion utilities used site-wide.
## Requirements
### Requirement: Temperature conversion functions are available
The system SHALL provide pure functions in `src/temperature.js` that convert a Celsius value to Fahrenheit, Kelvin, and Felsius.

Conversion formulas:
- °F = °C × 9/5 + 32
- K = °C + 273.15
- °Ꞓ = °C × 7/5 + 16

A `convertTemp(celsius, scale)` function SHALL return the converted value rounded to 1 decimal place. When `scale` is `'celsius'`, it SHALL return the original value unchanged.

#### Scenario: Convert to Fahrenheit
- **WHEN** `convertTemp(0, 'fahrenheit')` is called
- **THEN** it returns `32.0`

#### Scenario: Convert to Kelvin
- **WHEN** `convertTemp(0, 'kelvin')` is called
- **THEN** it returns `273.2` (rounded to 1 decimal)

#### Scenario: Convert to Felsius
- **WHEN** `convertTemp(0, 'felsius')` is called
- **THEN** it returns `16.0`

#### Scenario: Convert to Celsius (no-op)
- **WHEN** `convertTemp(22, 'celsius')` is called
- **THEN** it returns `22.0`

#### Scenario: Convert negative value
- **WHEN** `convertTemp(-40, 'fahrenheit')` is called
- **THEN** it returns `-40.0` (the equivalence point)

#### Scenario: Null passthrough
- **WHEN** `convertTemp(null, 'fahrenheit')` is called
- **THEN** it returns `null`

### Requirement: Temperature scale metadata is available
The system SHALL export a `TEMP_SCALES` array from `src/temperature.js` defining the four supported scales with their keys, display names, and symbols.

Scales: `celsius` (Celsius, °C), `fahrenheit` (Fahrenheit, °F), `kelvin` (Kelvin, K), `felsius` (Felsius, °Ꞓ).

#### Scenario: Scales metadata is accessible
- **WHEN** `TEMP_SCALES` is imported
- **THEN** it contains exactly four entries with `key`, `name`, and `symbol` fields
