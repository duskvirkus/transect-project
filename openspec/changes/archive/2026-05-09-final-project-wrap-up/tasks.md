## 1. Bibliography Updates

- [x] 1.1 In `src/lib/citations.js`, update `openfreemap` year to `'2026'`
- [x] 1.2 In `src/lib/citations.js`, update `openstreetmap` year to `'2026'`
- [x] 1.3 In `src/lib/citations.js`, update `react` year to `'2026'`
- [x] 1.4 In `src/lib/citations.js`, update `vite` authors to `'VoidZero Inc. and Vite contributors'` and year to `'2026'`
- [x] 1.5 In `src/lib/citations.js`, update `react-router` authors to `'Shopify, Inc.'` and year to `'2026'`
- [x] 1.6 In `src/lib/citations.js`, update `maplibre-gl` year to `'2026'`
- [x] 1.7 In `src/lib/citations.js`, update `react-map-gl` authors to `'OpenJS Foundation and vis.gl contributors'` and year to `'2026'`
- [x] 1.8 In `src/lib/citations.js`, update `recharts` year to `'2026'`
- [x] 1.9 In `src/lib/citations.js`, update `turf` year to `'2026'`
- [x] 1.10 Add new `claude-code` entry to `src/lib/citations.js`: `{ id: 'claude-code', type: 'tool', authors: 'Anthropic, PBC', year: '2026', title: 'Claude Code — Agentic AI coding tool', publisher: 'Anthropic', url: 'https://claude.ai/code' }`

## 2. Station 7 Zhangye Rename and Coordinates

- [x] 2.1 In `data/transect.json`, update station id 7: set `name` to `"Zhangye"`, `lat` to `38.9247`, `lng` to `100.45`; recalculate `offset` as the rhumb-line distance (km, rounded to nearest integer) from `(38.9247, 100.45)` to the transect point `(transectLat, transectLng)` using turf.js `rhumbDistance` — approximate value is ~62 km
- [x] 2.2 In `data/default-climate.json`, find the station with `name: "Gansu"` (id 7) and update its name to `"Zhangye"`
- [x] 2.3 Verify no other data files reference "Gansu" as a station name (grep `src/` and `data/` for "Gansu")

## 3. Station Data — Photos, Blurbs, Populations, 7-Controls

- [x] 3.1 Rewrite `src/data/stationBlurbs.js` to add `photo`, `population`, `populationSource`, and `controls` fields for all 10 stations. Use the structure below. Controls object keys: `latitude`, `land-sea`, `ocean-currents`, `winds`, `pressure`, `topography`, `altitude`. Use `"!needs more information!"` where sources are insufficient.

  **Station 0 — Fuji, Shizuoka**
  - photo: `'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Fuji_City_Panorama.jpg/1280px-Fuji_City_Panorama.jpg'`
  - population: `245015`, populationSource: `'https://en.wikipedia.org/wiki/Fuji,_Shizuoka'`
  - blurb: Derive 1–3 sentences from https://en.wikipedia.org/wiki/Fuji,_Shizuoka describing its location and climate significance; cite with `<Cite id="fuji-wikipedia" />` (add this citation to citations.js)

  **Station 1 — Matsue**
  - photo: `'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Matsue_City_center_seen_from_Mt.Shinyama.jpg/1280px-Matsue_City_center_seen_from_Mt.Shinyama.jpg'`
  - population: `196748`, populationSource: `'https://en.wikipedia.org/wiki/Matsue'`
  - blurb: Derive from https://en.wikipedia.org/wiki/Matsue; cite with `<Cite id="matsue-wikipedia" />`

  **Station 2 — Sangju**
  - photo: `null` (Google Maps URL is not a direct image; use placeholder)
  - population: `101237`, populationSource: `'https://www.sangju.go.kr/eng/page/15013/10790.tc'`
  - blurb: Derive from https://en.wikipedia.org/wiki/Sangju if available; cite appropriately or use `!needs more information!`

  **Station 3 — Rongcheng, Shandong**
  - photo: `'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Rongcheng%2C_Weihai.jpg/1280px-Rongcheng%2C_Weihai.jpg'`
  - population: `738600`, populationSource: `'https://en.wikipedia.org/wiki/Rongcheng,_Shandong'`
  - blurb: Derive from https://en.wikipedia.org/wiki/Rongcheng,_Shandong; cite with `<Cite id="rongcheng-wikipedia" />`

  **Station 4 — Yangxin County, Hubei**
  - photo: `'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/%E9%BE%99%E6%B8%AF%E5%85%A8%E8%B2%8C_-_panoramio.jpg/1280px-%E9%BE%99%E6%B8%AF%E5%85%A8%E8%B2%8C_-_panoramio.jpg'`
  - population: `901971`, populationSource: `'https://en.wikipedia.org/wiki/Yangxin_County,_Hubei'`
  - blurb: Derive from https://en.wikipedia.org/wiki/Yangxin_County,_Hubei; cite with `<Cite id="yangxin-wikipedia" />`

  **Station 5 — Loufan County**
  - photo: `'https://ak-d.tripcdn.com/images/10040u000000j3ut8F300.jpg'`
  - population: `91208`, populationSource: `'https://en.wikipedia.org/wiki/Loufan_County'`
  - blurb: Derive from https://en.wikipedia.org/wiki/Loufan_County; cite with `<Cite id="loufan-wikipedia" />`

  **Station 6 — Shizuishan**
  - photo: `'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/%E6%B2%99%E6%B9%96-2008_-_panoramio.jpg/1280px-%E6%B2%99%E6%B9%96-2008_-_panoramio.jpg'`
  - population: `730400`, populationSource: `'https://en.wikipedia.org/wiki/Shizuishan'`
  - blurb: Derive from https://en.wikipedia.org/wiki/Shizuishan; cite with `<Cite id="shizuishan-wikipedia" />`

  **Station 7 — Zhangye**
  - photo: `'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Sunset_glow_in_Zhangye_Arial.jpg/1280px-Sunset_glow_in_Zhangye_Arial.jpg'`
  - population: `1199515`, populationSource: `'https://en.wikipedia.org/wiki/Zhangye'`
  - blurb: Derive from https://en.wikipedia.org/wiki/Zhangye; cite with `<Cite id="zhangye-wikipedia" />`

  **Station 8 — Dunhuang**
  - photo: `'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Jiucenglou_of_Mogao_Caves.jpg/1280px-Jiucenglou_of_Mogao_Caves.jpg'`
  - population: `185231`, populationSource: `'https://en.wikipedia.org/wiki/Dunhuang'`
  - blurb: Derive from https://en.wikipedia.org/wiki/Dunhuang; cite with `<Cite id="dunhuang-wikipedia" />`

  **Station 9 — Lopnur**
  - photo: `null` (Reddit URL is not a stable image source; use placeholder)
  - population: `4300`, populationSource: `'https://baike.baidu.com/en/item/Lop%20Nor%20Town/933310'` (Luobupo Town, closest settlement)
  - blurb: Derive from https://en.wikipedia.org/wiki/Lop_Nur; cite with `<Cite id="lopnur-wikipedia" />`

- [x] 3.2 Add Wikipedia citation entries to `src/lib/citations.js` for each station used in blurbs (fuji-wikipedia, matsue-wikipedia, etc.). Type: `'data'`. Authors: `'Wikipedia contributors'`. Year: `'2026'`. Title: the article title. URL: the Wikipedia article URL.
- [x] 3.3 Fill in `controls` for each station based on Wikipedia sources. For controls that cannot be answered from available sources, use `"!needs more information!"`. Keep answers to 1–3 sentences each.

## 4. TempToggle Visibility

- [x] 4.1 In `src/components/GlobalOverlay.jsx`, add a `TEMP_ROUTES` set: `new Set(['/climate-data', '/analysis'])`. Wrap `<TempScaleToggle />` to only render when `TEMP_ROUTES.has(pathname)`, matching the existing `PRECIP_ROUTES` pattern.

## 5. StationTabs Component

- [x] 5.1 Create `src/components/StationTabs.jsx` — a tab strip with one tab per station. Props: `stations` array (from dataset), `stationData` (the `STATION_BLURBS` map). Active tab state managed internally (default: station 0).
- [x] 5.2 Tab strip: horizontal, scrollable on narrow screens. Each tab button shows the station name. Active tab visually highlighted.
- [x] 5.3 Content panel: shows station photo (with `onError` fallback to `/stations/placeholder.png`), city name as heading, population with source attribution, blurb paragraph, then a labeled list of all 7 climatic controls with their answers.
- [x] 5.4 Apply left/right padding to the tab strip container to align with chart plot area. Inspect existing chart components (`AnalysisPage.jsx`) for the margin/padding values used — match those values so station positions in the tabs visually align with the charts below.

## 6. Analysis Page Refactor

- [x] 6.1 In `src/pages/AnalysisPage.jsx`, import and render `<StationTabs />` above the Koppen map section. Only render it when `isDefaultDataset` is true.
- [x] 6.2 Remove the existing per-station card blurb/photo section from `AnalysisPage.jsx`.
- [x] 6.3 Remove the global 7-controls sections (`CLIMATE_CONTROLS` rendering) from `AnalysisPage.jsx`.
- [x] 6.4 Remove the `import` of `climateControls.js` from `AnalysisPage.jsx`.

## 7. Create-a-Transect Page Update

- [x] 7.1 In `src/pages/CreateATransectPage.jsx`, ensure the Analysis step (step 3) is present with a description explaining that the analysis page visualizes climate data across the transect and provides per-station breakdowns of the 7 climatic controls. Ensure the step links to `/analysis`.

## 8. Cleanup and Verification

- [x] 8.1 Delete `src/data/climateControls.js` (it will have no remaining imports after step 6.4).
- [x] 8.2 Run `npm run build` and confirm no import errors or build failures.
- [ ] 8.3 Smoke-test the analysis page: tabs appear above charts, clicking a tab shows photo/blurb/controls, TempToggle is hidden.
- [ ] 8.4 Smoke-test the bibliography page: Claude Code entry visible, all years/authors correct, TempToggle hidden.
- [ ] 8.5 Confirm TempToggle is hidden on Home, Builder, Koppen, Create-a-Transect, What Is Felsius, and Bibliography pages.
