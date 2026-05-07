## Context

The project is a static React/Vite site deployed to GitHub Pages (zero hosting cost). It has three steps: transect builder, climate data collection, and analysis (Part 3). The existing codebase has:
- `TempScaleContext` + `TempScaleToggle` as the pattern for global unit state
- `KoppenMap` rendering a bundled `public/koppen.png` as a MapLibre image source
- `climate.js` fetching from Open-Meteo ERA5 archive (1996–2025 normals)
- No charting library — charts must be added
- `data/default-climate.json` with 10 stations (Fuji → Lopnur), no elevation yet

The transect runs nearly due west (~278° heading) from Japan to western China, spanning ~138°E to ~91°E with minimal latitude variation (~35–41°N).

## Goals / Non-Goals

**Goals:**
- Full analysis report page with vertically-aligned layout (map + charts stacked so stations line up)
- Precipitation unit toggle (mm/cm/in) on CollectDataPage and AnalysisPage only
- Elevation auto-fetched from Open-Meteo and stored in enriched JSON
- Per-station Koppen classification derived from pixel-color lookup on the bundled PNG
- Per-station blurbs (climate-focused, 1–2 sentences) and placeholder images for default dataset
- Inline citation system (superscript links opening `/bibliography` in a new tab) usable across all pages
- Bibliography page at `/bibliography` covering both data sources and tools/libraries
- 7-controls analysis sections manually authored for default dataset only
- Analysis map locked (non-interactive, full-transect view)

**Non-Goals:**
- Real station photos (placeholder images used; real photos can be swapped in later)
- Koppen lookup for arbitrary external datasets (pixel-color lookup works only for the bundled PNG)
- Interactive editing of the 7-controls text
- Server-side rendering or any paid services

## Decisions

### 1. Charting Library: Recharts

**Decision**: Add `recharts` as a dependency.

**Rationale**: Recharts is the most widely used React chart library, has zero runtime cost (client-only), and covers all needed chart types (bar, line, custom cell grids for heatmaps). Alternatives: Victory (heavier), Chart.js (not React-native), plain SVG (too much custom code for heatmaps).

### 2. Koppen Classification Lookup via Canvas Pixel Sampling

**Decision**: Draw `public/koppen.png` onto an off-screen `<canvas>` and sample the pixel at a station's geographic coordinates using the image's Mercator projection bounds (−180 to 180 lon, −85.051 to 85.051 lat).

**Rationale**: The PNG is already bundled and used as a MapLibre image source with those exact bounds. Pixel color → closest KOPPEN_CLASSES entry by Euclidean RGB distance. This avoids any external API call and works offline. Export a `classifyStation(lat, lng)` async function from `src/lib/koppen.js` that caches the canvas after first load.

**Caveat**: Canvas `getImageData` requires same-origin — satisfied since the image is in `public/`. Add `crossOrigin="anonymous"` when loading the image.

### 3. Map Orientation for Vertical Alignment

**Decision**: Display the Koppen map in a horizontal strip with the full transect visible. Apply `transform: scaleX(-1)` to the map container so Japan (station 1) appears on the left and western China (station 10) on the right, matching left-to-right chart axis order. The map is non-interactive (`interactive={false}`), so reversed drag behavior is not an issue. Station marker labels get `transform: scaleX(-1)` to remain readable.

**Rationale**: The transect goes west→east in station order 0→9 (Fuji=0 is easternmost). Charts render station 0 on the left. Flipping the map keeps visual alignment consistent without reordering data.

**Alternative**: Re-order stations in charts to match geographic west→east — rejected because assignment station numbering is fixed.

### 4. Elevation: Fetched from Open-Meteo Response

**Decision**: Open-Meteo archive API returns a top-level `elevation` field (meters) in its JSON response. Capture it in `fetchStationClimate()` and return it alongside climate arrays. Update `default-climate.json` with elevation per station.

**Rationale**: Zero additional API call. The value is already being returned; we just weren't saving it.

### 5. Precipitation Unit: PrecipUnitContext (mirrors TempScaleContext)

**Decision**: Create `src/components/PrecipUnitContext.jsx` with `PrecipUnitProvider` and `usePrecipUnit()` hook exposing `{ unit, setUnit }`. Units: `'mm'` (default), `'cm'`, `'in'`. Create `PrecipUnitToggle` component. Render it in `CollectDataPage` and `AnalysisPage` only (not in the global App overlay).

**Rationale**: Precipitation unit is relevant only on data-display pages, unlike temperature which appears globally.

### 6. Station Blurbs and Placeholder Images

**Decision**: Author climate blurbs as a JS object in `src/data/stationBlurbs.js` keyed by station `id`. Use a single bundled grey placeholder image at `public/stations/placeholder.jpg` for all stations now; real photos can be swapped in per-station later by adding `public/stations/station-{id}.jpg` and updating the data file.

**Rationale**: Decouples the content work (finding real photos) from the feature implementation.

### 7. Inline Citation System

**Decision**: Create `src/lib/citations.js` exporting a `CITATIONS` array (each entry: `{ id, authors, year, title, url, type }`) covering data sources (Open-Meteo, Beck et al. Koppen raster, OpenFreeMap, Wikimedia) and tools/libraries (React, Vite, MapLibre, recharts, Turf.js, react-map-gl, etc.). Create a `<Cite>` component that renders a superscript link (`[n]`) which opens `/bibliography#ref-{id}` in a new tab. `BibliographyPage` renders the full list anchored by `id`.

**Rationale**: Simple, zero-dependency, and produces readable inline references. Opening in a new tab preserves the user's place in the analysis page.

### 8. Temperature Heatmap: Custom SVG Grid

**Decision**: Render a months (x, Jan–Dec) × stations (y) heatmap as a custom SVG grid. Each cell is colored using a diverging blue→white→red scale computed from the min/max temperature range across the dataset. Values converted via `convertTemp()`.

**Rationale**: Recharts doesn't have a native heatmap. A flat SVG grid (10×12 = 120 rects) is simple to implement without adding d3. Gives full control over styling and alignment.

### 9. 7-Controls Sections: Hardcoded JSX

**Decision**: Write the 7 climatic controls analysis as static text blocks in `src/data/climateControls.js`, rendered in `AnalysisPage.jsx`. Only rendered when the active dataset is the default (guard with `isDefaultDataset` boolean).

**Rationale**: Assignment-specific prose — hardcoding is correct.

### 10. Analysis Map: Non-Interactive, Fixed View

**Decision**: Pass `interactive={false}` to the KoppenMap instance on AnalysisPage. Use a fixed `initialViewState` that frames the full transect. Add an `interactive` prop to `KoppenMap` (default `true`) to support this.

**Rationale**: Analysis map is display-only — interaction would distract from the report layout and break station alignment.

## Risks / Trade-offs

- **Canvas cross-origin**: `koppen.png` is served from the same origin; `getImageData()` works. If the base URL changes, the canvas may be tainted. Mitigation: explicit `crossOrigin="anonymous"` when loading the image.
- **Koppen pixel accuracy**: The PNG is low-resolution in some areas; pixel sampling may misclassify border stations. Mitigation: accept minor inaccuracies — the classification is a best-effort visual lookup matching what the map shows.
- **Map CSS flip and MapLibre**: `scaleX(-1)` is CSS-only; MapLibre's WebGL canvas renders correctly, only the container div is flipped. Non-interactive mode removes all event handling concerns.
- **Recharts bundle size**: ~150KB gzipped — acceptable for a static assignment site.

## Migration Plan

1. Add `recharts` to dependencies
2. Update `climate.js` to capture and return `elevation` from Open-Meteo response
3. Update `default-climate.json` with elevation per station
4. Add `classifyStation()` to `koppen.js`
5. Add `interactive` prop to `KoppenMap`
6. Create `PrecipUnitContext` + `PrecipUnitToggle`; update `CollectDataPage`
7. Create `src/lib/citations.js` + `<Cite>` component
8. Add `BibliographyPage` and `/bibliography` route
9. Build `AnalysisPage` (layout, charts, Koppen lookup, 7-controls, blurbs, photos)
10. Add station blurbs to `src/data/stationBlurbs.js`
11. Add placeholder image to `public/stations/`

No rollback complexity — all changes are additive.
