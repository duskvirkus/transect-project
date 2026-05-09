# analysis-page Specification

## Purpose
Defines requirements for the analysis report page, which renders a full visualized climate analysis of the transect including maps, charts, a station tab UI (default dataset only), and per-station climatic control details.

## Requirements

### Requirement: Analysis page renders the full analysis report
The `/analysis` route SHALL render the full Part 3 analysis report page. The page SHALL display in this order from top to bottom: (1) station tab UI, (2) Koppen map, (3) temperature heatmap, (4) precipitation chart, (5) elevation profile. The "Under Construction" placeholder SHALL be removed. The global 7-controls sections SHALL be removed from the page.

#### Scenario: Analysis page renders report content in correct order
- **WHEN** a user navigates to `/analysis`
- **THEN** the page displays station tabs first, then the Koppen map, then the three charts — not an "Under Construction" message and not global 7-controls sections

### Requirement: Analysis page loads default or uploaded dataset
The analysis page SHALL load the default enriched dataset automatically on mount. A file upload control SHALL allow the user to replace the dataset with an uploaded enriched transect JSON. When an external dataset is loaded, the station tab UI SHALL be hidden (it is default-dataset-only content).

#### Scenario: Default dataset on mount
- **WHEN** the user navigates to `/analysis`
- **THEN** the page displays the default dataset with all sections visible (station tabs, Koppen map, charts)

#### Scenario: External dataset loaded
- **WHEN** the user uploads a valid enriched transect JSON
- **THEN** the Koppen map, temperature heatmap, precipitation chart, and elevation profile update to the uploaded data, and the station tab UI is hidden

#### Scenario: Invalid file uploaded
- **WHEN** the user uploads a file that is not valid JSON or lacks a `stations` array
- **THEN** an error message is shown and the previous dataset is retained

### Requirement: Station 7 displayed as Zhangye
Wherever station names are rendered on the analysis page, station 7 SHALL display as "Zhangye" (not "Gansu").

#### Scenario: Station 7 shows correct name
- **WHEN** the analysis page is rendered with the default dataset
- **THEN** station 7 is labeled "Zhangye" in all UI elements (tabs, charts, map)

### Requirement: Vertically-aligned transect layout
The analysis page SHALL render a horizontally-oriented Koppen map strip followed by the temperature heatmap, precipitation bar chart, and elevation profile — all sharing the same horizontal axis so station positions are vertically aligned across all views. The map SHALL be oriented so that station 1 (Fuji, easternmost) appears on the left and station 10 (Lopnur, westernmost) appears on the right for the default dataset.

#### Scenario: Map and charts share station axis
- **WHEN** the analysis page is rendered with a dataset
- **THEN** the vertical gridlines or station positions in the charts are horizontally aligned with the corresponding station markers on the Koppen map above

#### Scenario: Map orientation matches chart order
- **WHEN** the analysis page is rendered with the default dataset
- **THEN** the Koppen map shows Japan on the left and western China on the right, consistent with the chart x-axis order (station 1 left, station 10 right)

### Requirement: Map refits to loaded dataset
When a new dataset is uploaded, the Koppen map SHALL animate to fit all stations of the new dataset in view, using bearing 0 for non-default datasets.

#### Scenario: Map refits on new dataset load
- **WHEN** the user uploads a valid enriched transect JSON
- **THEN** the Koppen map smoothly animates to fit all stations of the new dataset, oriented with bearing 0

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
The analysis page SHALL render a stacked bar chart showing monthly precipitation totals per station. The chart SHALL use the active precipitation unit (mm/cm/in). The tooltip SHALL display months in chronological order (Jan–Dec).

#### Scenario: Precipitation chart renders
- **WHEN** the analysis page is rendered with a dataset
- **THEN** a chart shows monthly precipitation data for each station, labeled with the active unit

#### Scenario: Tooltip shows months in chronological order
- **WHEN** the user hovers over a station bar in the precipitation chart
- **THEN** the tooltip lists months Jan through Dec in order, not alphabetically

#### Scenario: Unit change updates precipitation chart
- **WHEN** the user changes the precipitation unit
- **THEN** the chart values and axis label update immediately to the new unit

### Requirement: Elevation profile chart
The analysis page SHALL render a line or area chart showing the elevation (meters) of each station along the transect x-axis. Elevation SHALL be sourced from `station.elevation` (top-level field on each station object, populated by the climate data fetch).

#### Scenario: Elevation chart renders
- **WHEN** the analysis page is rendered with a dataset containing elevation values
- **THEN** a chart shows elevation in meters for each station from left to right
