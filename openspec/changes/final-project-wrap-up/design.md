## Context

The project is a static React + Vite app hosted on GitHub Pages (no backend, $0 cost constraint). The current analysis page has global 7-controls sections and per-station card blurbs that are uncited. Citations live in `src/lib/citations.js`. Station data is split across `data/transect.json` (coordinates, offsets), `src/data/stationBlurbs.js` (names, blurbs, photos), and `src/data/climateControls.js` (global 7-controls text). The `GlobalOverlay` component renders TempToggle on every route unconditionally (except PrecipToggle which is already route-gated).

## Goals / Non-Goals

**Goals:**
- All bibliography entries accurate (correct copyright holders, years, new Claude Code entry)
- Analysis page station section uses tab UI with photos, citable blurbs, and per-station 7-controls answers
- Station 7 renamed "Zhangye" with corrected coordinates throughout
- TempToggle shown only on `/climate-data` and `/analysis`
- Create-a-Transect page includes the Analysis step

**Non-Goals:**
- Changes to Koppen map, temperature heatmap, precipitation chart, or elevation profile
- Fetching or storing any new climate data
- Backend or build-time image optimization

## Decisions

### D1: Per-station 7-controls stored in stationBlurbs.js
Merge the per-station climatic controls into `stationBlurbs.js` alongside existing blurb/photo data. Alternative: keep `climateControls.js` and add a parallel structure. Rejected: two files for the same station data creates sync overhead; the global controls sections are being removed, so `climateControls.js` becomes dead code after this change and will be deleted.

Each station entry gains a `controls` object keyed by the 7 control IDs (`latitude`, `land-sea`, `ocean-currents`, `winds`, `pressure`, `topography`, `altitude`). Values are short strings (1–3 sentences). Use the literal string `"!needs more information!"` as the value when sources are insufficient.

### D2: Station images linked directly (not downloaded to assets)
Images are sourced from Wikimedia Commons and other public URLs. Linking directly avoids binary bloat in the repo and keeps the bundle small (GitHub Pages constraint). Wikimedia Commons images are stable long-term URLs. The one exception is Sangju — its image is a Google Maps embed URL that may be unreliable; use the placeholder if it fails.

### D3: Tab UI implemented as a new StationTabs component
A new `src/components/StationTabs.jsx` handles the tab strip and content panel. Placement: rendered in `AnalysisPage.jsx` above the charts, horizontally padded to match the chart legend insets (matching the `pl-[52px] pr-[16px]` or equivalent values already used by charts). Tabs scroll horizontally on narrow screens rather than wrapping.

### D4: TempToggle allow-listed in GlobalOverlay
Add a `TEMP_ROUTES` set in `GlobalOverlay.jsx` (same pattern as existing `PRECIP_ROUTES`). TempToggle renders only on `/climate-data` and `/analysis`. This mirrors the existing PrecipToggle pattern — no prop drilling or context changes needed.

### D5: Zhangye coordinates updated in data/transect.json; offset recalculated
New coordinates: 38°55′29″N, 100°27′00″E → `{ lat: 38.9247, lng: 100.45 }`. The `transectLat`/`transectLng` for station 7 remain what the transect line intersects at that segment — the `offset` value must be recalculated as the rhumb-line distance from (38.9247, 100.45) to the transect point using turf.js `rhumbDistance`, rounding to the nearest km. Also update `stationBlurbs.js` station 7 name from "Gansu" → "Zhangye" and update all text references in `climateControls.js` before it is deleted (references are moot once the file is removed).

### D6: default-climate.json station 7 name update
`data/default-climate.json` contains the pre-fetched climate data with station names. Station 7 must be renamed "Zhangye" there as well so the analysis page renders the correct name.

## Risks / Trade-offs

- [External image URLs] Wikimedia Commons URLs are stable but could theoretically change → Mitigation: use the canonical `/wiki/File:...` redirect URLs which are more stable than direct upload paths; fall back to `public/stations/placeholder.png`
- [Sangju image] Google Maps link provided by user is not a direct image URL → Mitigation: omit the Sangju image and use placeholder; note this in the task
- [Zhangye offset] Manual recalculation of rhumb distance needed → Mitigation: compute in task using turf formula; document the math
- [Per-station 7-controls content] Some controls may have no clear Wikipedia source for interior Chinese cities → Mitigation: `!needs more information!` per D1; never fabricate citations

## Migration Plan

No deployment changes needed — static build deployed to GitHub Pages as usual. Steps: update data files → update components → run `npm run build` to verify no broken imports (especially after deleting `climateControls.js`).
