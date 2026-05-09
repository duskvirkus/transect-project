## ADDED Requirements

### Requirement: Station tab UI displays one tab per default-dataset station
The analysis page SHALL render a horizontal tab strip with one tab per station (10 total) when the default dataset is active. The active tab SHALL show that station's photo, city name, population, a short Wikipedia-citable blurb, and per-station answers to the 7 climatic controls. The tab strip SHALL be positioned above the charts.

#### Scenario: Tab strip renders all 10 station tabs
- **WHEN** the default dataset is active on the analysis page
- **THEN** a horizontal tab strip displays 10 tabs, one per station, labeled with the station name

#### Scenario: Clicking a tab shows that station's content
- **WHEN** the user clicks a station tab
- **THEN** the content panel updates to show the selected station's photo, name, population, blurb, and 7-controls answers

#### Scenario: Tab UI is hidden for external datasets
- **WHEN** a user-uploaded dataset is active
- **THEN** the station tab UI is not rendered

### Requirement: Station tab content panel shows photo, name, and population
Each station's tab content SHALL display a photo image (direct URL to Wikimedia Commons or approved external source, falling back to `public/stations/placeholder.png` on error), the station name, and the station population as sourced from Wikipedia or official government sources.

#### Scenario: Photo renders for stations with a known image URL
- **WHEN** a station tab is selected and the station has a configured image URL
- **THEN** the content panel shows that image

#### Scenario: Placeholder shown when image fails or is unavailable
- **WHEN** a station has no configured image URL or the image fails to load
- **THEN** the placeholder image (`public/stations/placeholder.png`) is displayed

### Requirement: Station tab content includes a Wikipedia-citable blurb
Each station's content panel SHALL include a short blurb (1–3 sentences) summarizing the city's geography or climate significance. Every claim in the blurb SHALL be traceable to a Wikipedia article or official source listed in the project bibliography. Claims that cannot be sourced SHALL not appear.

#### Scenario: Blurb renders with inline citation
- **WHEN** a station tab is selected
- **THEN** a short blurb is displayed with at least one `<Cite />` link to the bibliography

### Requirement: Per-station 7-controls answers appear in the tab
Each station's content panel SHALL display answers to all 7 climatic controls (Latitude/Insolation, Land-Sea Distribution, Ocean Currents, Prevailing Winds, Semi-Permanent Pressure Systems, Mountains/Topography, Altitude). Each answer SHALL be brief (1–3 sentences). If a control cannot be answered from available sources, the answer SHALL display the literal string `!needs more information!`.

#### Scenario: All 7 controls shown for each station
- **WHEN** a station tab is selected
- **THEN** the content panel shows all 7 control labels, each with a text answer or `!needs more information!`

#### Scenario: Unsourced controls flagged
- **WHEN** a climatic control answer cannot be confirmed from available Wikipedia/official sources
- **THEN** that control's answer displays `!needs more information!` rather than an unsourced claim

### Requirement: Tab strip aligns horizontally with charts
The tab strip SHALL have left and right padding that visually aligns its content edges with the chart plot area (matching the chart legend insets), so station positions correspond horizontally with the charts below.

#### Scenario: Tab strip padded to match chart insets
- **WHEN** the analysis page is rendered
- **THEN** the tab strip's content edges are horizontally aligned with the chart x-axis extent
