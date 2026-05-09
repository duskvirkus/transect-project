# analysis-report Specification

## Purpose
Defines requirements for the analysis report page content: dataset loading, vertically-aligned transect layout, Koppen classification per station, temperature heatmap, precipitation chart, elevation profile, 7-controls analysis sections, and per-station blurbs/photos.

## Requirements

### Requirement: Analysis page loads default or uploaded dataset
The analysis page SHALL load the default enriched dataset automatically on mount. A file upload control SHALL allow the user to replace the dataset with an uploaded enriched transect JSON. When an external dataset is loaded, the 7-controls sections and per-station blurbs/photos SHALL be hidden (those are default-dataset-only content).

#### Scenario: Default dataset on mount
- **WHEN** the user navigates to `/analysis`
- **THEN** the page displays the default dataset with all sections visible (Koppen map, charts, 7-controls, station cards)

#### Scenario: External dataset loaded
- **WHEN** the user uploads a valid enriched transect JSON
- **THEN** the Koppen map, temperature heatmap, precipitation chart, and elevation profile update to the uploaded data, and the 7-controls sections and station blurbs/photos are hidden

#### Scenario: Invalid file uploaded
- **WHEN** the user uploads a file that is not valid JSON or lacks a `stations` array
- **THEN** an error message is shown and the previous dataset is retained

### Requirement: Vertically-aligned transect layout
The analysis page SHALL render a horizontally-oriented Koppen map strip followed directly below by the temperature heatmap, precipitation bar chart, and elevation profile — all sharing the same horizontal axis so station positions are vertically aligned across all views. The map SHALL be oriented so that station 1 (Fuji, easternmost) appears on the left and station 10 (Lopnur, westernmost) appears on the right, matching the left-to-right order of the charts.

#### Scenario: Map and charts share station axis
- **WHEN** the analysis page is rendered with a dataset
- **THEN** the vertical gridlines or station positions in the charts are horizontally aligned with the corresponding station markers on the Koppen map above

#### Scenario: Map orientation matches chart order
- **WHEN** the analysis page is rendered
- **THEN** the Koppen map shows Japan on the left and western China on the right, consistent with the chart x-axis order (station 1 left, station 10 right)

### Requirement: Koppen classification displayed per station
The analysis page SHALL display the Koppen classification code and name for each station by sampling the pixel color of the bundled `koppen.png` at the station's coordinates and matching it to the nearest classification by RGB distance.

#### Scenario: Koppen code shown for each station
- **WHEN** the analysis page finishes loading
- **THEN** each station in the layout shows its Koppen classification code (e.g., "Cfa") and name (e.g., "Humid subtropical")

#### Scenario: Classification matches map color
- **WHEN** a station marker is shown on the Koppen map
- **THEN** the classification code displayed for that station corresponds to the color visible on the raster overlay at that location

### Requirement: Temperature heatmap across stations and months
The analysis page SHALL render a heatmap grid with stations on one axis and months (Jan–Dec) on the other. Each cell SHALL show the average of monthly max and min temperature, colored on a blue→white→red diverging scale calibrated to the dataset's temperature range. Cell values SHALL be converted to the active temperature scale.

#### Scenario: Heatmap renders all cells
- **WHEN** the analysis page is rendered with a dataset
- **THEN** a grid of 10 × 12 cells is shown, one per station-month combination

#### Scenario: Temperature scale changes update heatmap
- **WHEN** the user changes the active temperature scale
- **THEN** all heatmap cell values and the color scale recalibrate to the new scale immediately

### Requirement: Precipitation chart along the transect
The analysis page SHALL render a bar or line chart showing monthly precipitation totals per station. The chart SHALL use the active precipitation unit (mm/cm/in).

#### Scenario: Precipitation chart renders
- **WHEN** the analysis page is rendered with a dataset
- **THEN** a chart shows monthly precipitation data for each station, labeled with the active unit

#### Scenario: Unit change updates precipitation chart
- **WHEN** the user changes the precipitation unit
- **THEN** the chart values and axis label update immediately to the new unit

### Requirement: Elevation profile chart
The analysis page SHALL render a line or area chart showing the elevation (meters) of each station along the transect x-axis.

#### Scenario: Elevation chart renders
- **WHEN** the analysis page is rendered with a dataset containing elevation values
- **THEN** a chart shows elevation in meters for each station from left to right

### Requirement: 7-controls analysis sections (default dataset only)
The analysis page SHALL render seven labeled sections — one per climatic control (Latitude/Insolation, Land-Sea Distribution, Ocean Currents, Prevailing Winds, Semi-Permanent Pressure Systems, Mountains/Topography, Altitude) — containing manually authored analysis text. These sections SHALL only appear when the default dataset is active.

#### Scenario: 7-controls visible for default dataset
- **WHEN** the default dataset is active
- **THEN** all seven climatic control sections are rendered with their analysis text

#### Scenario: 7-controls hidden for external dataset
- **WHEN** a user-uploaded dataset is active
- **THEN** the seven climatic control sections are not rendered

### Requirement: Per-station blurb and photo (default dataset only)
The analysis page SHALL display a short climate-focused blurb (1–2 sentences) and a photo for each station when the default dataset is active. Photos SHALL fall back to a shared placeholder image when no station-specific photo is available.

#### Scenario: Station card shows blurb and photo
- **WHEN** the default dataset is active
- **THEN** each station card displays its name, climate blurb, and an image

#### Scenario: Placeholder shown when no photo
- **WHEN** a station has no dedicated photo file
- **THEN** a placeholder image is displayed in its place

#### Scenario: Blurbs and photos hidden for external dataset
- **WHEN** a user-uploaded dataset is active
- **THEN** station blurbs and photos are not shown
