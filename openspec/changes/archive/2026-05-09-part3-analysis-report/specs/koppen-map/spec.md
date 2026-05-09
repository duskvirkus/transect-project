## ADDED Requirements

### Requirement: KoppenMap supports non-interactive locked mode
The `KoppenMap` component SHALL accept an `interactive` prop (boolean, default `true`). When `interactive={false}`, the map SHALL disable all pan, zoom, and click interactions.

#### Scenario: Interactive mode enabled by default
- **WHEN** `KoppenMap` is mounted without an `interactive` prop
- **THEN** the map responds to pan and zoom interactions normally

#### Scenario: Locked map disables interaction
- **WHEN** `KoppenMap` is mounted with `interactive={false}`
- **THEN** the map cannot be panned or zoomed by the user

### Requirement: classifyStation function derives Koppen code from PNG pixel color
The `src/lib/koppen.js` module SHALL export an async `classifyStation(lat, lng)` function that draws the bundled `koppen.png` onto an off-screen canvas (cached after first use), samples the pixel color at the projected coordinates, and returns the `KOPPEN_CLASSES` entry whose color is nearest by Euclidean RGB distance. The canvas SHALL load the image with `crossOrigin="anonymous"`.

#### Scenario: Classification returned for a valid coordinate
- **WHEN** `classifyStation(35.16, 138.68)` is called (Fuji, Japan)
- **THEN** it returns a `{ code, name, color }` object from `KOPPEN_CLASSES`

#### Scenario: Canvas is cached across calls
- **WHEN** `classifyStation` is called multiple times
- **THEN** the PNG is only loaded and drawn onto the canvas once

#### Scenario: Nearest color match used
- **WHEN** the sampled pixel does not exactly match any KOPPEN_CLASSES color
- **THEN** the entry with the smallest Euclidean RGB distance is returned
