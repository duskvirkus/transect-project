---
name: geotiff-to-maplibre-overlay
description: Converts a GeoTIFF raster file into a working MapLibre GL image overlay in a Vite/React project. Use when the user wants to "add a raster overlay", "use a GeoTIFF on the map", "overlay a tif on maplibre", "add geotiff to map", or "convert geotiff for web map".
metadata:
  category: workflow-automation
---

# GeoTIFF to MapLibre Overlay

Converts a GeoTIFF into a web-compatible PNG overlay for MapLibre GL. There are three compounding gotchas that will silently break the overlay if skipped — this skill handles all of them in the correct order.

## Instructions

### Step 1: Inspect the source GeoTIFF

```bash
gdalinfo <input.tif>
```

Check two things in the output:
- **ColorInterp**: If it says `Palette`, the file is indexed — must be expanded before reprojection
- **Coordinate System**: Note the EPSG code — if not EPSG:3857, reprojection is required

### Step 2: Convert indexed palette to RGBA (if needed)

**CRITICAL: MapLibre GL uses WebGL, which cannot render indexed/palette PNGs. Always expand to RGBA.**

```bash
gdal_translate -of GTiff -expand rgba <input.tif> /tmp/rgba.tif
```

If ColorInterp was already RGBA, skip this step and use the original file.

### Step 3: Reproject to Web Mercator (EPSG:3857)

**CRITICAL: The MapLibre base map uses Web Mercator. A geographic/equirectangular source will appear vertically stretched if not reprojected.**

```bash
gdalwarp \
  -t_srs EPSG:3857 \
  -te -20037508.34 -20037508.34 20037508.34 20037508.34 \
  -ts 4096 4096 \
  -r near \
  -of PNG \
  /tmp/rgba.tif \
  public/overlay.png
```

**Parameter notes:**
- `-te` bounds define a global square Web Mercator extent (±85.051129° lat, ±180° lon)
- `-ts 4096 4096` — good default for global categorical rasters; increase for regional detail
- `-r near` — use nearest-neighbour resampling for categorical data (preserves class boundaries); use `bilinear` for continuous data (elevation, temperature)
- `gdalwarp` cannot overwrite an existing PNG; delete the output file first if re-running

**If the source is already EPSG:3857**, skip reprojection and just export:
```bash
gdal_translate -of PNG /tmp/rgba.tif public/overlay.png
```

### Step 4: Gitignore GDAL sidecar files

GDAL generates `.aux.xml` metadata files alongside outputs. Add to `.gitignore`:

```
public/*.aux.xml
```

Remove any already staged: `git rm --cached public/*.aux.xml`

### Step 5: Reference the PNG in Vite

**CRITICAL: Never hardcode `/overlay.png`. Vite's `base` config (e.g., `/transect-project/`) means `/overlay.png` will 404 in production.**

In your constants or component file:

```js
export const OVERLAY_URL = import.meta.env.BASE_URL + 'overlay.png'
```

`import.meta.env.BASE_URL` always includes the trailing slash, so no separator needed.

### Step 6: Wire up the MapLibre image source

```jsx
import Map, { Source, Layer } from 'react-map-gl/maplibre'

// Global Web Mercator corner coordinates: [lng, lat] clockwise from top-left
const GLOBAL_COORDS = [
  [-180,  85.051129],  // top-left
  [ 180,  85.051129],  // top-right
  [ 180, -85.051129],  // bottom-right
  [-180, -85.051129],  // bottom-left
]

// Inside your Map component:
<Source id="overlay" type="image" url={OVERLAY_URL} coordinates={GLOBAL_COORDS}>
  <Layer
    id="overlay-raster"
    type="raster"
    paint={{ 'raster-opacity': 0.7 }}
  />
</Source>
```

For regional overlays, replace `GLOBAL_COORDS` with the actual bounding box corners of the reprojected image.

## Troubleshooting

**Overlay renders but is vertically stretched / misaligned with the base map**
- Cause: Source PNG is in equirectangular (geographic) projection, not Web Mercator
- Fix: Re-run Step 3 with `gdalwarp -t_srs EPSG:3857`

**Overlay doesn't appear at all (no error)**
- Cause 1: PNG is indexed/palette — WebGL silently drops it
- Fix: Re-run Step 2 with `-expand rgba`
- Cause 2: Asset URL is 404 due to Vite base path
- Fix: Use `import.meta.env.BASE_URL + 'overlay.png'` instead of `/overlay.png`
- Debug: Check the network tab in DevTools for the PNG request status

**`gdalwarp` fails with "cannot open in update mode"**
- Cause: Output PNG already exists; gdalwarp cannot overwrite PNGs
- Fix: `rm public/overlay.png` then re-run

**Image looks pixelated at target zoom levels**
- Cause: Output resolution (`-ts`) is too low for the zoom level being used
- Fix: Increase `-ts` (e.g., `8192 8192`); or switch to XYZ tiles for zoom-level-appropriate detail
