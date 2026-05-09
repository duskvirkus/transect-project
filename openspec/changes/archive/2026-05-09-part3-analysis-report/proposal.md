## Why

Part 3 of the assignment requires a full climatic analysis report for the transect, including Koppen classification of all stations and a 7-control climate discussion by zone. The existing analysis page is a placeholder that needs to become a functional, data-driven report page. A bibliography page is also needed to properly cite all data sources and tools used across the project.

## What Changes

- Replace the "Under Construction" `AnalysisPage` with a full analysis report page
- Add a dedicated Bibliography page (`/bibliography`) listing all project sources and tools
- Add precipitation unit toggle (mm / cm / inches), shown only on CollectDataPage and AnalysisPage
- Add vertically-aligned transect layout: Koppen map (rotated to align west→east left→right), with station temperature heatmap, precipitation bar chart, and elevation profile chart aligned below it so stations line up across all views
- Auto-fetch and store elevation per station via Open-Meteo API (returned alongside climate data)
- Add per-station climate blurb (1–2 sentences, climate-focused) for the default dataset, bundled as static data
- Add per-station photo for the default dataset, sourced from Wikimedia Commons and bundled in `public/`
- Support loading an enriched transect JSON (from Steps 1–2) into the analysis page; loaded datasets show Koppen + charts but not the 7-controls discussion or station blurbs/photos (those are default-only)
- Determine Koppen classification per station by reading pixel color from the Koppen raster tile at station coordinates
- Display manually authored 7-climatic-controls analysis sections (for default dataset only)

## Capabilities

### New Capabilities
- `analysis-report`: Full analysis page with vertically-aligned transect layout (rotated map + stacked charts), per-station Koppen classification lookup, temperature heatmap, precipitation chart, elevation profile, 7-controls discussion (default only), station blurbs and photos (default only)
- `bibliography-page`: Dedicated `/bibliography` route listing all data sources (Open-Meteo, Koppen raster, OpenFreeMap, Wikimedia images, etc.) and tools (libraries, frameworks) used in the project
- `precip-unit-toggle`: Precipitation unit toggle (mm / cm / inches) with a PrecipUnitContext provider, displayed only on CollectDataPage and AnalysisPage

### Modified Capabilities
- `analysis-page`: Replace under-construction stub with full report requirements
- `home-climate-page`: Precipitation display must respect active precipitation unit from PrecipUnitContext
- `koppen-map`: Add support for a rotated/reoriented layout prop and a pixel-color Koppen classification lookup function for station coordinates
- `climate-data-fetch`: Enrich station objects with `elevation` (meters) from Open-Meteo API response alongside existing climate data
- `app-routing`: Add `/bibliography` route

## Impact

- `src/pages/AnalysisPage.jsx` — complete rewrite
- `src/pages/CollectDataPage.jsx` — add PrecipUnitToggle display, update precip rendering
- `src/components/KoppenMap.jsx` — rotation/orientation prop, classification lookup
- `src/lib/climate.js` — store elevation from Open-Meteo response
- New: `src/pages/BibliographyPage.jsx`
- New: `src/components/PrecipUnitContext.jsx`, `src/components/PrecipUnitToggle.jsx`
- New: `src/data/station-blurbs.js` — static climate blurbs for default stations
- New: `public/stations/` — bundled station photos (Wikimedia Commons, CC licensed)
- Charts via recharts or similar zero-cost library
- `data/default-climate.json` — add `elevation` field per station
- `src/App.jsx` — add `/bibliography` route
