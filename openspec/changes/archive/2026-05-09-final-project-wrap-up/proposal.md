## Why

The project is feature-complete but needs a final polish pass before submission: citations are outdated or missing, the analysis page station cards need a UI overhaul with properly sourced content, one station's name and coordinates are wrong, and several pages show UI chrome (TempToggle) that isn't relevant to them.

## What Changes

- **Bibliography**: Add Claude Code citation; correct copyright holders and update years to 2026 for Vite (VoidZero Inc.), React Router (Shopify, Inc.), MapLibre, react-map-gl (OpenJS Foundation & vis.gl contributors), and Recharts; leave Beck et al. (2018) and Open-Meteo (2023) unchanged
- **Analysis page station display**: Replace existing card list with a tab-style UI positioned above the charts, horizontally aligned with the map. Each tab shows: city photo (linked from Wikimedia/external URLs), city name + population, a short Wikipedia-citable blurb, and per-station answers to all 7 climatic controls. Answers must cite sources; use `!needs more information!` where sources are insufficient
- **Station 7 rename**: "Gansu" → "Zhangye" everywhere in the project; update coordinates to 38°55′29″N 100°27′00″E and recalculate transect distance offset
- **TempToggle visibility**: Hide TempToggle from Bibliography, Koppen Viewer, Builder, Create-a-Transect, What Is Felsius, and Home pages
- **Create-a-Transect page**: Add the Analysis step as a third step in the workflow (step currently missing from the page)

## Capabilities

### New Capabilities
- `station-tab-ui`: Tab-style station viewer on the analysis page with photos, citable blurbs, and per-station 7-controls content

### Modified Capabilities
- `bibliography-page`: Citation data corrected — new Claude Code entry, updated copyright holders and years
- `analysis-page`: Station display redesigned from cards to tabs above charts; content replaced with cited material; per-station 7-controls replaces global 7-controls sections
- `create-a-transect`: Analysis step added to the workflow page

## Impact

- `src/lib/citations.js`: Add Claude Code entry; update authors/years for Vite, React Router, MapLibre, react-map-gl, Recharts
- `src/data/stationBlurbs.js`: Rename station 7 from Gansu → Zhangye; update all station entries with Wikipedia-sourced blurbs, photos, population, and per-station 7-controls answers
- `src/data/climateControls.js`: Replaced by per-station data in stationBlurbs (or a new parallel structure); global sections removed from analysis page
- `src/pages/AnalysisPage.jsx`: Replace station cards with tab component; reorder so tabs appear above charts; remove global 7-controls rendering
- `src/components/StationTabs.jsx` (new): Tab UI component
- `src/pages/CreateATransectPage.jsx`: Add Analysis step
- `App.jsx` or layout component: Conditionally hide TempToggle on listed pages
- Station coordinate data (wherever station 7 coords are stored): Update to 38.9247°N, 100.45°E; recalculate transect distance
