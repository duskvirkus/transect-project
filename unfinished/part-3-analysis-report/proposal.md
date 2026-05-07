## Why

Parts I and II of the Transect Project are complete: the 10-station west-northwest transect (Fuji, Japan → Lopnur, China) is defined and all climate data has been collected and displayed. Part III requires writing the climatic analysis and report that synthesizes this data into explanations of *why* the climate changes dramatically across the transect — plus visual aids (climatographs, elevation profile, transect map) to support the analysis.

## What Changes

- A new Analysis page (`AnalysisPage.jsx`) replacing the current "Under Construction" placeholder with the full Part III report
- The report includes:
  - An interactive transect map showing all 10 stations, visually aligned with the data below
  - An elevation profile graph across the transect
  - Per-station climatographs: monthly max/min temperature bars and precipitation line
  - Koppen Climate Classification for all 10 stations
  - Grouping of stations into climate zones
  - Discussion of all 7 primary climatic controls zone by zone
  - A references cited section

## Capabilities

### New Capabilities

- `climate-analysis-report`: Full Part III report rendered in the Analysis page — Koppen classifications, climate zones, seven climatic controls, and references
- `transect-visualizations`: Interactive map of the transect aligned with per-station climatographs (monthly temp + precip) and an elevation profile chart

### Modified Capabilities

- `analysis-page`: The existing `AnalysisPage.jsx` stub is replaced with substantive report and visualization content

## Impact

- `src/pages/AnalysisPage.jsx` — primary file to rewrite
- `data/default-climate.json` and `data/transect.json` — read-only reference; station coordinates, elevation, and climate data
- A charting library (e.g., Recharts, already used elsewhere, or Chart.js) will be needed for climatographs and elevation profile
- A map component (e.g., Leaflet via react-leaflet, consistent with existing map usage in BuilderPage) for the transect map
- No backend changes
