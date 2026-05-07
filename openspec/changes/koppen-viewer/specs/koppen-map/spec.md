# koppen-map Specification

## Purpose
Defines the reusable KoppenMap React component that renders a MapLibre GL map with a Koppen-Geiger climate classification raster overlay, opacity control, classification legend, and optional transect station markers.

## Requirements

### Requirement: KoppenMap renders a MapLibre GL map with Koppen raster overlay
The `KoppenMap` component SHALL render a full-width MapLibre GL map (using react-map-gl/maplibre with OpenFreeMap tiles) with a Koppen-Geiger classification raster layer loaded from the configured static XYZ tile URL. The raster overlay SHALL render above the base map but below station markers.

#### Scenario: Map renders with overlay on mount
- **WHEN** `KoppenMap` is mounted
- **THEN** the map displays with the OpenFreeMap base tiles and the Koppen raster overlay visible at the default opacity

#### Scenario: Tile URL is configurable via a constant
- **WHEN** the tile URL constant in `src/lib/koppen.js` is updated
- **THEN** all instances of `KoppenMap` use the new URL without any other code changes

### Requirement: Opacity slider controls overlay transparency
The `KoppenMap` component SHALL include a range input that adjusts the Koppen raster overlay opacity from 0 (transparent) to 1 (fully opaque). The default opacity SHALL be 0.7.

#### Scenario: Slider adjusts overlay opacity
- **WHEN** a user moves the opacity slider
- **THEN** the Koppen raster overlay opacity updates in real time without a page reload

#### Scenario: Default opacity on mount
- **WHEN** `KoppenMap` is mounted without an explicit opacity prop
- **THEN** the overlay renders at 70% opacity

### Requirement: Classification legend displays all Koppen classes
The `KoppenMap` component SHALL render a legend listing all 30 Koppen-Geiger classification codes with their corresponding color swatches and human-readable names, sourced from the Beck et al. (2018) color palette hardcoded in `src/lib/koppen.js`.

#### Scenario: Legend is visible on mount
- **WHEN** `KoppenMap` is mounted
- **THEN** the legend is displayed showing color swatches and labels for all Koppen classes

#### Scenario: Legend colors match tile colors
- **WHEN** the user views the map overlay and the legend simultaneously
- **THEN** the swatch color for each class in the legend matches the corresponding color rendered on the raster tiles

### Requirement: Optional station markers via `stations` prop
When a `stations` array is provided, `KoppenMap` SHALL render a marker for each station at its lat/lng coordinates. Each marker SHALL display the station name on hover or as a visible label. When `stations` is omitted or empty, no markers are rendered.

#### Scenario: Stations prop renders markers
- **WHEN** `KoppenMap` receives a non-empty `stations` array
- **THEN** one marker per station is displayed at the correct coordinates on the map

#### Scenario: No markers without stations prop
- **WHEN** `KoppenMap` is mounted without a `stations` prop
- **THEN** no station markers appear on the map

### Requirement: Optional transect line via `showTransect` prop
When `showTransect={true}` and a `stations` array is provided, `KoppenMap` SHALL render a GeoJSON LineString connecting the stations in order. The line style SHALL match the transect line used in BuilderPage.

#### Scenario: Transect line renders when enabled
- **WHEN** `KoppenMap` receives `showTransect={true}` and a non-empty `stations` array
- **THEN** a line connecting the stations in order is rendered on the map

#### Scenario: No transect line by default
- **WHEN** `showTransect` is omitted or false
- **THEN** no connecting line is drawn between stations

### Requirement: Default view centers on the transect region
When no `initialViewState` prop is provided, `KoppenMap` SHALL default to a view centered on East Asia (approximately longitude 114°E, latitude 37°N) at zoom level 3, which frames the full transect from Japan to Xinjiang.

#### Scenario: Default view shows full transect region
- **WHEN** `KoppenMap` is mounted without an `initialViewState` prop
- **THEN** the map is centered near 114°E, 37°N at zoom 3

#### Scenario: Custom view state overrides default
- **WHEN** `KoppenMap` receives an `initialViewState` prop
- **THEN** the map initializes to the specified center and zoom
