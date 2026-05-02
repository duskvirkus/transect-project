## Context

The app is currently a single React component (`App.jsx`) that renders the transect builder at `/`. There is no routing, no home page, and no climate data layer. Part II of the assignment requires monthly average max temp, min temp, and precipitation for each of the 10 stations.

The existing builder already exports a transect JSON with station `lat`/`lng` fields. The enriched JSON needs to add `climateData` per station with 12-month arrays.

## Goals / Non-Goals

**Goals:**
- Add `/` home page that shows climate data for a default (pre-fetched) transect and allows uploading any transect JSON to fetch fresh data
- Move builder to `/builder` with a nav link back to home
- Fetch monthly climate normals (avg max temp, avg min temp, total precipitation) from Open-Meteo ERA5 archive for any station lat/lng
- Bundle a pre-fetched default dataset so the home page loads without any API calls
- Allow downloading the enriched JSON

**Non-Goals:**
- Part III analysis/visualization (Köppen classification, climate control report) — deferred
- Elevation lookup (lat/lng is sufficient for Open-Meteo; elevation is already a Part I concern)
- Any backend or server-side component

## Decisions

### Open-Meteo ERA5 Archive API for climate normals

Use `https://archive-api.open-meteo.com/v1/archive` with the 1991–2020 WMO climatological normal period.

Request parameters per station:
```
latitude=<lat>&longitude=<lng>
&start_date=1991-01-01&end_date=2020-12-31
&daily=temperature_2m_max,temperature_2m_min,precipitation_sum
&timezone=UTC
```

The API returns daily values. To compute monthly normals, aggregate by calendar month across all 30 years (average each January, February, etc.). This yields 12 values per variable.

**Alternative considered: Open-Meteo Climate API** — Returns future climate model projections, not observational reanalysis. ERA5 archive is more appropriate for historical climate normals.

**Alternative considered: Wikipedia** — Embeds climate tables as wikitext in city articles; unreliable across arbitrary global locations, requires HTML/wikitext parsing, not all cities have climate data.

### Pre-fetched default dataset

Run a one-time script (or manual fetch) to produce `frontend/src/data/default-climate.json` containing the full enriched JSON for `transect-278deg.json`. This file is committed to the repo. The home page imports it directly — zero API calls for the default view.

When a user uploads their own transect JSON, the app fetches Open-Meteo for each station sequentially (to avoid hammering the API) and displays a per-station loading state.

### Routing with React Router

Add `react-router-dom`. App.jsx becomes the router shell with two routes:
- `/` → `HomePage` component
- `/builder` → `BuilderPage` component (the current App content extracted into a new file)

A minimal nav header links between the two pages.

### Sequential station fetching with progress display

Open-Meteo has no official rate limit for the archive API, but fetching 10 stations at once with 30-year daily data is a large payload. Fetch stations one at a time, updating UI state after each completes. Show station name + "fetching…" / "done" status.

Each daily-resolution fetch for 30 years is ~10,950 records. Response size per station is roughly 300–500 KB JSON. Ten stations = ~3–5 MB total. Acceptable for a one-time fetch.

## Risks / Trade-offs

- **Open-Meteo availability** → The free tier has no SLA. If the API is down, uploads won't work. The default dataset is always available as a fallback.
- **30-year daily fetch size** → ~300–500 KB per station. For stations in remote areas, ERA5 may have lower accuracy. Mitigation: ERA5 is a global reanalysis product with global coverage; accuracy is consistent worldwide.
- **No caching for uploaded transects** → Each upload triggers fresh API calls. Acceptable for a class project; add browser caching if needed later.

## Migration Plan

1. Create a new git branch before implementation
2. Install `react-router-dom`
3. Extract builder JSX from `App.jsx` into `BuilderPage.jsx`; `App.jsx` becomes the router shell
4. Add `HomePage.jsx` and climate fetch logic
5. Manually run the default data fetch script to produce `default-climate.json` and commit it
6. Update `vite.config.js` if needed for the new file imports
