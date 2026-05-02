### Requirement: Fetch monthly climate normals from Open-Meteo
The climate fetch module SHALL query the Open-Meteo ERA5 archive API for the 1991–2020 climatological normal period and return 12-month arrays of average max temp, average min temp, and total precipitation for a given lat/lng.

#### Scenario: Successful fetch for a station
- **WHEN** a valid latitude and longitude are provided
- **THEN** the module returns an object with `monthlyMaxTemp`, `monthlyMinTemp`, and `monthlyPrecip` arrays, each containing 12 numeric values (January through December), derived by averaging daily ERA5 data across 1991–2020

#### Scenario: Fetch failure
- **WHEN** the Open-Meteo API returns an error or is unreachable
- **THEN** the module throws an error that the caller can handle, with a message identifying which station failed

### Requirement: Monthly normals are computed by averaging daily data across years
The climate fetch module SHALL aggregate daily ERA5 values by calendar month across the 30-year period to produce a single representative value per month.

#### Scenario: Monthly max temp calculation
- **WHEN** daily `temperature_2m_max` values are returned for 1991–2020
- **THEN** the module averages all January values across all years to produce `monthlyMaxTemp[0]`, all February values for `monthlyMaxTemp[1]`, and so on through December

#### Scenario: Monthly precipitation calculation
- **WHEN** daily `precipitation_sum` values are returned for 1991–2020
- **THEN** the module sums daily precipitation within each month then averages across years to produce `monthlyPrecip[0]` through `monthlyPrecip[11]`

### Requirement: Enriched JSON schema includes climateData per station
The enriched transect JSON SHALL include a `climateData` field on each station object containing the 12-month climate normal arrays.

#### Scenario: Enriched JSON structure
- **WHEN** climate data has been fetched for all stations
- **THEN** each station object in the output JSON contains a `climateData` object with `monthlyMaxTemp` (°C, 12 values), `monthlyMinTemp` (°C, 12 values), and `monthlyPrecip` (mm, 12 values)
