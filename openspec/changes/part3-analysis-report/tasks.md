## 1. Dependencies and Utilities

- [x] 1.1 Add `recharts` to package.json dependencies and install
- [x] 1.2 Update `fetchStationClimate` in `src/lib/climate.js` to capture and return `elevation` from Open-Meteo response
- [x] 1.3 Add `elevation` field to each station in `data/default-climate.json` (look up from Open-Meteo or a free elevation API)
- [x] 1.4 Add `classifyStation(lat, lng)` async function to `src/lib/koppen.js` (canvas pixel sampling with cached canvas)
- [x] 1.5 Create `src/lib/precipitation.js` with `convertPrecip(mm, unit)` and unit metadata
- [x] 1.6 Create `src/lib/citations.js` with `CITATIONS` array covering data sources and tools/libraries

## 2. Precipitation Unit Toggle

- [x] 2.1 Create `src/components/PrecipUnitContext.jsx` with `PrecipUnitProvider` and `usePrecipUnit()` hook
- [x] 2.2 Create `src/components/PrecipUnitToggle.jsx` component (mm / cm / in segments, matches TempScaleToggle style)
- [x] 2.3 Wrap app in `PrecipUnitProvider` in `src/App.jsx`
- [x] 2.4 Update `CollectDataPage.jsx` to render `PrecipUnitToggle` and convert precipitation display via `convertPrecip()`

## 3. Citation System and Bibliography

- [x] 3.1 Create `src/components/Cite.jsx` component (superscript `[n]` link opening `/bibliography#ref-{id}` in new tab)
- [x] 3.2 Create `src/pages/BibliographyPage.jsx` rendering all citations grouped by type with anchor IDs
- [x] 3.3 Add `/bibliography` route to `src/App.jsx`
- [x] 3.4 Add Bibliography link to `src/components/NavHeader.jsx`

## 4. KoppenMap Enhancements

- [x] 4.1 Add `interactive` prop to `KoppenMap` component (default `true`); pass to MapLibre map instance

## 5. Station Content

- [x] 5.1 Create `public/stations/placeholder.jpg` (a simple grey placeholder image)
- [x] 5.2 Create `src/data/stationBlurbs.js` with climate-focused 1–2 sentence blurbs for all 10 default stations

## 6. Analysis Page — Layout and Data Loading

- [x] 6.1 Rewrite `src/pages/AnalysisPage.jsx`: load default dataset on mount, add file upload control for external datasets
- [x] 6.2 Implement `isDefaultDataset` detection (compare station IDs/coords to known default)
- [x] 6.3 Add `PrecipUnitToggle` to `AnalysisPage`

## 7. Analysis Page — Koppen Map Strip

- [x] 7.1 Render locked `KoppenMap` (`interactive={false}`) in a horizontal strip with `scaleX(-1)` CSS flip
- [x] 7.2 Run `classifyStation()` for each loaded station and display Koppen code + name per station marker

## 8. Analysis Page — Charts

- [x] 8.1 Build temperature heatmap component (SVG grid, 10 stations × 12 months, blue→white→red scale, respects active temp scale)
- [x] 8.2 Build precipitation bar/line chart component using recharts (respects active precip unit)
- [x] 8.3 Build elevation profile chart component using recharts (meters, station x-axis)
- [x] 8.4 Align map strip and all three charts so station positions share a common horizontal axis

## 9. Analysis Page — Default Dataset Sections

- [x] 9.1 Create `src/data/climateControls.js` with 7-controls analysis text (placeholder text for now — final content to be manually authored)
- [x] 9.2 Render 7-controls sections in `AnalysisPage` (visible only for default dataset)
- [x] 9.3 Render per-station cards with blurb and photo (visible only for default dataset)

## 10. Cleanup and Verification

- [x] 10.1 Verify `<Cite>` usage can be added to relevant pages (CollectDataPage, AnalysisPage at minimum)
- [x] 10.2 Run existing tests and confirm nothing is broken
- [ ] 10.3 Manually verify: analysis page layout, Koppen classification lookup accuracy, chart alignment, precipitation unit toggle, bibliography deep links
