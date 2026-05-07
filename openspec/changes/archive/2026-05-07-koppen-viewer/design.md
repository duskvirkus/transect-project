## Context

The app is a static Vite/React site deployed to GitHub Pages via HashRouter. It already uses `react-map-gl` + MapLibre GL (OpenFreeMap tiles) in BuilderPage, so the map infrastructure is established. No charting or raster tile library is installed.

The Koppen-Geiger classification data comes from Beck et al. (2018) "Present and future Köppen-Geiger climate classification maps at 1 km resolution" — a widely used, publicly available dataset (Figshare / gloh2o.org). It is distributed as a GeoTIFF with an embedded categorical color map (30 Koppen classes). The Hylken 2023 dataset is the same approach updated to CMIP6; Beck 2018 is chosen for wider tooling availability.

Hosting cost is a hard constraint: no paid services, no surprise bills. The chosen approach must work entirely within free tiers with hard limits (or no billing at all).

## Goals / Non-Goals

**Goals:**
- `KoppenMap` React component: MapLibre GL map with Koppen raster overlay, opacity slider, classification legend, and optional `stations` prop for rendering transect markers
- `/koppen` page as a standalone viewer with a brief explanatory header
- Koppen image sourced from Beck 2018 GeoTIFF, converted once via GDAL, bundled directly in `public/` — zero external hosting dependency
- One-time image generation documented in `scripts/README.md`

**Non-Goals:**
- Future climate projections overlay (present-day only)
- Server-side rendering or a tile proxy
- Editing or classifying new stations interactively (read-only viewer)
- Paid hosting of any kind

## Decisions

### Koppen image delivery: single PNG bundled in `public/` (primary)

**Choice:** Convert `KG_1986-2010.tif` to a single 8192×4096 georeferenced PNG:
```bash
gdal_translate -of PNG -outsize 8192 4096 KG_1986-2010.tif public/koppen.png
```
Reference it in MapLibre as an `image` source type with global corner coordinates:
```js
{
  type: 'image',
  url: '/koppen.png',
  coordinates: [[-180, 85.051129], [180, 85.051129], [180, -85.051129], [-180, -85.051129]]
}
```

**Why this over XYZ tiles:** Eliminates all hosting infrastructure. The PNG is ~2–4 MB, loads as a single HTTP request, and renders correctly at zoom 0–7 — the full range useful for Koppen classification viewing. No CDN, no CORS configuration, no third-party dependency, no billing risk.

**Why 8192×4096:** At the zoom levels this app uses (3–7), 8192×4096 provides enough resolution to distinguish Koppen zones without pixelation. The original 1 km GeoTIFF has ~43200×21600 px; 8192×4096 is a ~25× downscale that keeps file size under 5 MB while preserving all visually meaningful zone boundaries.

**Quality tradeoff:** The image will appear pixelated if zoomed beyond ~zoom 8. This is acceptable — Koppen classification is inherently a regional, not street-level, visualization.

### Fallback: XYZ tiles on a separate GitHub Pages repo

If the single-PNG approach proves insufficient (e.g., quality unacceptable at desired zoom levels), the fallback is to generate static XYZ tiles and host them on a separate `transect-tiles` GitHub repository deployed to GitHub Pages. Estimated tile set size: ~1,450 tiles, ~5 MB total (zoom 0–5 global + zoom 6 regional crop). GitHub Pages is free with no billing mechanism — cannot generate unexpected charges. This fallback avoids any paid service.

```bash
# Fallback tile generation commands (documented for reference)
gdal2tiles.py --xyz -z 0-5 KG_1986-2010.tif koppen-tiles/
gdal2tiles.py --xyz -z 6-6 -te 80 30 145 50 KG_1986-2010.tif koppen-tiles/
```

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
The GeoTIFF stores class indices (1–30). The published color palette maps each index to an RGB color and a label. This lookup table is hardcoded in `src/lib/koppen.js` and used only for rendering the legend — the PNG already carries the correct colors embedded by GDAL.

### Raster overlay: MapLibre `image` source + `raster` layer
```js
{ type: 'image', url: KOPPEN_IMAGE_URL, coordinates: [...] }  // source
{ type: 'raster', paint: { 'raster-opacity': opacityState } } // layer
```
Opacity is controlled by React state bound to a range input.

### Legend: static HTML/CSS grid
30 Koppen classes rendered as a scrollable color-swatch grid. Plain CSS — no canvas or SVG needed.

## Risks / Trade-offs

- [PNG loads all at once, not progressively] → At ~3 MB over a fast connection this is imperceptible; on a slow connection there may be a brief delay before the overlay appears. Mitigation: show a loading indicator while the image source is loading.
- [Pixelation at zoom > 8] → Acceptable; Koppen data is regional. Document the zoom cap in the UI.
- [PNG committed to repo increases repo size ~3 MB] → One-time, permanent, acceptable for this project scale.
- [Fallback tile repo adds maintenance overhead] → Tiles are static data that never change; once generated and pushed, no ongoing maintenance is needed.

## Migration Plan

1. Developer downloads `KG_1986-2010.tif` and runs the GDAL command to produce `public/koppen.png` (one-time)
2. PNG committed to the main app repo under `public/`
3. `KOPPEN_IMAGE_URL` constant set to `'/koppen.png'` in `src/lib/koppen.js`
4. Component and page implemented, route + nav added
5. Deploy via existing GitHub Actions workflow (no CI changes needed)

**Fallback activation:** If PNG quality is insufficient, generate XYZ tiles, create `transect-tiles` GitHub repo, push tiles, enable GitHub Pages, update `KOPPEN_IMAGE_URL` to XYZ tile pattern and switch MapLibre source type from `image` to `raster`.

**Rollback:** Remove the `/koppen` route and nav link; `KoppenMap` component can remain unused without impact.

## Open Questions

- Should the Koppen overlay also appear on the Builder page as a toggleable layer? Out of scope for now; can be added later since the component is reusable.
