## Context

The app is a static Vite/React site deployed to GitHub Pages via HashRouter. It already uses `react-map-gl` + MapLibre GL (OpenFreeMap tiles) in BuilderPage, so the map infrastructure is established. No charting or raster tile library is installed.

The Koppen-Geiger classification data comes from Beck et al. (2018) "Present and future Köppen-Geiger climate classification maps at 1 km resolution" — a widely used, publicly available dataset (Figshare / gloh2o.org). It is distributed as a GeoTIFF with an embedded categorical color map (30 Koppen classes). The Hylken 2023 dataset (the Nature article linked in exploration) is the same approach updated to CMIP6; both are suitable — Beck 2018 is chosen for wider tooling availability.

Tile hosting is a key constraint: the app repo is GitHub Pages (static, no server). The GeoTIFF must be pre-processed into XYZ tiles and hosted externally. The tiles are read-only reference data that never change, so a free CDN is appropriate.

## Goals / Non-Goals

**Goals:**
- `KoppenMap` React component: MapLibre GL map with Koppen raster overlay, opacity slider, classification legend, and optional `stations` prop for rendering transect markers
- `/koppen` page as a standalone viewer with a brief explanatory header
- Tiles sourced from Beck 2018 GeoTIFF, pre-processed to static XYZ tiles, hosted on Cloudflare R2 (free tier) with public bucket access
- One-time local tile generation documented in a script/README note (not automated in CI)

**Non-Goals:**
- Future climate projections overlay (present-day only)
- Server-side rendering or a tile proxy
- Editing or classifying new stations interactively (read-only viewer)
- Bundling tiles into the app repo

## Decisions

### Tile data: Beck 2018 GeoTIFF → static XYZ tiles via GDAL
**Choice:** Download `KG_1986-2010.tif` from gloh2o.org, run `gdal2tiles.py --xyz -z 0-6` to generate zoom 0–6 tiles (sufficient for continental-scale viewing of the transect region), host on Cloudflare R2.

**Why not COG + tiles.rdnt.io:** tiles.rdnt.io is a free third-party service with no SLA — it could go offline. Static pre-generated tiles on our own R2 bucket are more reliable and have no per-request constraints. COG streaming also requires the client to make range-request HTTP calls, which is more latency than pre-tiled PNGs.

**Why not bundle tiles in the repo:** The full global tile set at zoom 0–6 is ~50–150 MB. That's within GitHub's limits but would bloat the repo permanently. External hosting keeps repo size clean and keeps map data separate from app code.

**Zoom levels 0–6:** At zoom 6 (~1 km/px at mid-latitudes), the Koppen data's native 1 km resolution is fully represented without over-zooming. The transect spans 89–139°E at 35–41°N, so a regional bounding box crop (`-te 80 30 145 50`) can reduce tile count significantly if full global coverage isn't needed. Decision: generate global tiles at z0–5 and regional tiles at z6 to keep storage manageable.

### Tile hosting: Cloudflare R2 with public bucket
**Choice:** Cloudflare R2 free tier (10 GB storage, 10M reads/month free).

**Why not GitHub Pages sub-repo:** Managing a separate repo just for tiles is cumbersome; tiles never need versioning.

**Why not AWS S3:** R2 has no egress fees, which matters for a map tile service.

### Component API: `KoppenMap` props
```jsx
<KoppenMap
  stations={[]}        // optional: array of station objects with lat/lng/name
  initialViewState={{  // optional: override default view
    longitude: 114,
    latitude: 37,
    zoom: 3
  }}
  showTransect={false} // optional: draw transect line between stations
/>
```
Default view centers on the transect region (East Asia). When `stations` is provided, markers are rendered. When `showTransect` is true, a GeoJSON line connects them (reusing the same pattern as BuilderPage).

### Koppen color palette: hardcoded from Beck 2018 legend
The GeoTIFF stores class indices (1–30). The published color palette (from the paper's legend) maps each index to an RGB color and a label. This lookup table will be hardcoded as a JS constant in the component. The raster overlay renders raw colors from the tile PNGs (already color-mapped by GDAL during tile generation), so no runtime color mapping is needed — the constant is used only for the legend.

### Raster overlay: MapLibre `raster` source + layer
```js
// source
{ type: 'raster', tiles: [KOPPEN_TILE_URL], tileSize: 256, attribution: 'Beck et al. 2018' }
// layer
{ type: 'raster', paint: { 'raster-opacity': opacityState } }
```
Opacity is controlled by a React state variable bound to a range input. No new library needed.

### Legend: static HTML/CSS grid
The 30 Koppen classes are rendered as a scrollable color-swatch grid below the map (or in a collapsible panel). Each swatch shows the class code (e.g., "Cfa") and name ("Humid subtropical"). Not a canvas or SVG — plain CSS is sufficient and simpler.

## Risks / Trade-offs

- [Tile generation is a manual one-time step] → Document the GDAL command in a `scripts/README.md`; tiles don't change so this only needs to happen once.
- [R2 bucket URL is a hardcoded constant in source] → Acceptable for a static educational app; if URL changes, update the constant and redeploy.
- [CORS headers on R2 bucket] → Cloudflare R2 public buckets require a CORS policy to allow browser tile requests; this must be configured when setting up the bucket.
- [Tile quality at high zoom] → Zoom 6 is the cap; if users zoom in further the raster tiles will appear pixelated. This is acceptable — the Koppen classification is inherently a regional, not street-level, visualization.

## Migration Plan

1. Developer runs GDAL tile generation locally (one-time)
2. Tiles uploaded to Cloudflare R2 with public read + CORS policy
3. Tile URL constant set in `src/lib/koppen.js`
4. Component and page implemented, route + nav added
5. Deploy via existing GitHub Actions workflow (no changes to CI needed)

**Rollback:** Remove the `/koppen` route and nav link; `KoppenMap` component can remain unused without impact.

## Open Questions

- Should the `/koppen` page title explain Koppen classification briefly (1–2 sentences + link to Wikipedia) or be map-only? Lean toward a brief header for educational context.
- Should the Koppen overlay also appear on the Builder page as a toggleable layer? Out of scope for now; can be added later since the component is reusable.
