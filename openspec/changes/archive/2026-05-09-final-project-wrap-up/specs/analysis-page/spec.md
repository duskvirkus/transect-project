## MODIFIED Requirements

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

## REMOVED Requirements

### Requirement: 7-controls analysis sections (default dataset only)
**Reason**: Replaced by per-station 7-controls answers in the station tab UI (see `station-tab-ui` spec). The global section format is being removed in favor of per-station answers that directly connect each control to the specific conditions at each city.
**Migration**: Per-station answers are authored in `src/data/stationBlurbs.js` under each station's `controls` key. `src/data/climateControls.js` is deleted.

### Requirement: Per-station blurb and photo (default dataset only)
**Reason**: Replaced by the new station tab UI which covers blurb, photo, and more (see `station-tab-ui` spec). The old card layout is removed in favor of the tab-based design.
**Migration**: Blurbs and photos are now configured in `src/data/stationBlurbs.js` and rendered by `StationTabs.jsx`.
