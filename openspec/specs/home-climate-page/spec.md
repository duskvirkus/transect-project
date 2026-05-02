## Purpose
Defines requirements for the climate data page, which displays 30-year climate normals per station.
## Requirements
### Requirement: Default dataset loads on home page
The climate data page SHALL load and display climate data from the bundled default dataset without requiring any user action or network request.

#### Scenario: Default data visible on page load
- **WHEN** a user navigates to `/climate-data`
- **THEN** the page displays climate data for the 10 default transect stations immediately, without prompting for a file upload or making any API calls

### Requirement: User can upload a transect JSON
The home page SHALL accept a transect JSON file upload and trigger climate data fetching for the uploaded transect.

#### Scenario: Valid transect JSON uploaded
- **WHEN** a user selects a valid transect JSON file (containing a `stations` array with `lat`, `lng`, and `name` fields)
- **THEN** the app begins fetching climate data for each station from Open-Meteo and replaces the displayed dataset with the uploaded transect's data

#### Scenario: Invalid file uploaded
- **WHEN** a user selects a file that is not valid JSON or lacks the required `stations` array
- **THEN** the app displays an error message and retains the previously displayed dataset

### Requirement: Per-station fetch progress is displayed
The home page SHALL show the fetch status for each station while climate data is loading.

#### Scenario: Fetching in progress
- **WHEN** climate data is being fetched for a transect
- **THEN** each station shows its fetch status (pending, loading, or complete) so the user can track progress

### Requirement: Climate data is displayed per station
The home page SHALL display monthly climate data for each station after fetching completes.

#### Scenario: Climate data rendered
- **WHEN** climate data has been fetched or loaded from the default dataset
- **THEN** each station shows its name, coordinates, and 12-month arrays for average max temp, average min temp, and total precipitation

### Requirement: User can download enriched JSON
The home page SHALL provide a button to download the current dataset as a JSON file containing both transect and climate data.

#### Scenario: Download button clicked
- **WHEN** climate data is loaded and the user clicks the download button
- **THEN** the browser downloads a JSON file with the full enriched transect (stations with `climateData` fields)

#### Scenario: Download unavailable during fetch
- **WHEN** climate data is still being fetched
- **THEN** the download button is disabled

