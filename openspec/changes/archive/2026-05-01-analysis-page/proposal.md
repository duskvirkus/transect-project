## Why

Part II of the Transect Project requires monthly average max/min temperature and precipitation (rainfall/snowfall) for all 10 stations. There is currently no tool to automate that data collection, and the app has no home page — the builder occupies `/` directly.

## What Changes

- Repurpose `/` as the climate data home page: displays a default pre-cached dataset (bundled JSON derived from `transect-278deg.json` with climate data pre-fetched), but allows any user to upload their own transect JSON to fetch fresh data via Open-Meteo
- Move the transect builder to `/builder`
- Integrate the Open-Meteo climate API (ERA5 reanalysis, no API key required) to fetch monthly avg max temp, avg min temp, and precipitation for any station lat/lng, fully client-side
- Add a download button to export the enriched JSON
- Pre-fetch and commit a cached climate data file so the home page loads instantly by default

## Capabilities

### New Capabilities
- `home-climate-page`: The `/` route — loads default cached climate dataset, accepts transect JSON uploads, fetches Open-Meteo data for uploaded transects, displays per-station climate data, and provides JSON download
- `climate-data-fetch`: Client-side Open-Meteo climate API integration returning 12-month arrays of avg max temp, avg min temp, and total precipitation for a given lat/lng
- `app-routing`: Multi-route React app (`/` and `/builder`)

### Modified Capabilities
<!-- None -->

## Impact

- `frontend/src/App.jsx`: Add React Router, home route, move builder to `/builder`
- `frontend/src/`: New components for file upload, per-station climate display, download
- `frontend/src/data/` or `frontend/public/`: Bundled default climate JSON (pre-fetched from `transect-278deg.json`)
- `package.json`: Add `react-router-dom`
- No backend required — all API calls are client-side to Open-Meteo's public endpoint
- Enriched JSON schema: each station gains a `climateData` object with `monthlyMaxTemp`, `monthlyMinTemp`, and `monthlyPrecip` arrays (12 values each, Jan–Dec)
