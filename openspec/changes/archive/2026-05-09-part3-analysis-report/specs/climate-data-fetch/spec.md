## MODIFIED Requirements

### Requirement: Enriched JSON schema includes climateData and elevation per station
The enriched transect JSON SHALL include a `climateData` field on each station object containing the 12-month climate normal arrays and an `elevation` field (meters, number) at the station object level (not nested inside `climateData`).

#### Scenario: Enriched JSON structure includes elevation
- **WHEN** climate data has been fetched for all stations
- **THEN** each station object in the output JSON contains a top-level `elevation` field (meters, numeric) alongside the existing `climateData` object

## ADDED Requirements

### Requirement: fetchStationClimate returns elevation
The `fetchStationClimate` function SHALL return the `elevation` field from the Open-Meteo API response alongside the existing `monthlyMaxTemp`, `monthlyMinTemp`, and `monthlyPrecip` arrays.

#### Scenario: Elevation included in return value
- **WHEN** `fetchStationClimate(lat, lng)` completes successfully
- **THEN** the returned object includes an `elevation` property (number, meters) in addition to the three monthly arrays
