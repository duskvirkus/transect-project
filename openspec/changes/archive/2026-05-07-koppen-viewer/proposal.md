## Why

The analysis of climate across the transect benefits greatly from a visual reference showing global Koppen-Geiger climate classifications — but no such visualization exists in the app yet. Building a reusable `KoppenMap` component now lets the Part III analysis page embed it directly, while also giving students a dedicated `/koppen` page to explore the classification system in context.

## What Changes

- New route `/koppen` added to the app with a dedicated Koppen Viewer page
- New reusable React component `KoppenMap` renders a MapLibre GL map with a Koppen-Geiger classification raster overlay, opacity control, and a classification legend
- `KoppenMap` accepts optional props to display transect station markers, enabling direct reuse on the Analysis page
- Nav header gains a "Koppen" link
- A one-time data processing step converts the Beck et al. (2018) 1 km resolution GeoTIFF into a single georeferenced PNG bundled in the app's `public/` directory
- New spec: `koppen-map` (the reusable component)
- Modified spec: `app-routing` (new `/koppen` route + nav link)

## Capabilities

### New Capabilities

- `koppen-map`: A reusable `KoppenMap` React component that renders a MapLibre GL map with a Koppen-Geiger raster overlay, legend, opacity slider, and optional transect station markers via props

### Modified Capabilities

- `app-routing`: Adds a `/koppen` route (KoppenViewerPage) and a "Koppen" nav link to the persistent navigation header

## Impact

- `src/components/KoppenMap.jsx` — new reusable component (primary deliverable)
- `src/pages/KoppenViewerPage.jsx` — thin page wrapper around KoppenMap
- `src/App.jsx` — new route
- `src/components/NavHeader.jsx` — new nav link
- `openspec/specs/app-routing/spec.md` — update to document `/koppen` route
- External tile hosting: Beck 2018 Koppen GeoTIFF → static XYZ tiles hosted on a CDN (Cloudflare R2 or similar); tile URL referenced in the component as a config constant
- No new npm packages required (react-map-gl + MapLibre GL already installed)
