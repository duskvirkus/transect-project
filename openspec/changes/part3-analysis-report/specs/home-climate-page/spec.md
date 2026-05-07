## MODIFIED Requirements

### Requirement: Climate data is displayed per station
The home page SHALL display monthly climate data for each station after fetching completes. Temperature values SHALL be converted from the stored Celsius values to the currently active temperature scale using `convertTemp()`. Row labels SHALL reflect the active scale symbol (e.g., `Max °F`, `Min K`). Precipitation values SHALL be converted from the stored mm values to the currently active precipitation unit using `convertPrecip()`. Row labels SHALL reflect the active unit (e.g., `Precip (cm)`, `Precip (in)`).

#### Scenario: Climate data rendered in Celsius and mm (defaults)
- **WHEN** climate data has been fetched or loaded from the default dataset and both scales are at defaults
- **THEN** each station shows its name, coordinates, and 12-month arrays for average max temp (°C), average min temp (°C), and total precipitation (mm)

#### Scenario: Climate data rendered in Fahrenheit
- **WHEN** the active scale is `'fahrenheit'`
- **THEN** temperature values are converted to °F and row labels show `Max °F` and `Min °F`

#### Scenario: Climate data rendered in Kelvin
- **WHEN** the active scale is `'kelvin'`
- **THEN** temperature values are converted to K and row labels show `Max K` and `Min K`

#### Scenario: Climate data rendered in Felsius
- **WHEN** the active scale is `'felsius'`
- **THEN** temperature values are converted to °Ꞓ and row labels show `Max °Ꞓ` and `Min °Ꞓ`

#### Scenario: Scale change updates displayed values reactively
- **WHEN** the user changes the active scale via the toggle
- **THEN** all temperature cells on the climate data page update immediately without re-fetching

#### Scenario: Precipitation displayed in cm
- **WHEN** the active precipitation unit is `'cm'`
- **THEN** precipitation values are converted to cm and the row label shows `Precip (cm)`

#### Scenario: Precipitation displayed in inches
- **WHEN** the active precipitation unit is `'in'`
- **THEN** precipitation values are converted to inches and the row label shows `Precip (in)`

#### Scenario: Precipitation unit change updates reactively
- **WHEN** the user changes the active precipitation unit
- **THEN** all precipitation cells update immediately without re-fetching
