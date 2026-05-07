## 1. Data Preparation (one-time, done outside the app)

- [ ] 1.1 Download Beck et al. (2018) `KG_1986-2010.tif` from gloh2o.org
- [ ] 1.2 Run `gdal2tiles.py --xyz -z 0-5 KG_1986-2010.tif koppen-tiles/` for global zoom 0–5; run z6 with a regional bounding box (`-te 80 30 145 50`) for the transect area
- [ ] 1.3 Create a Cloudflare R2 public bucket and configure a CORS policy allowing browser GET requests from any origin
- [ ] 1.4 Upload the generated `koppen-tiles/` directory to the R2 bucket
- [ ] 1.5 Verify tiles load in a browser by fetching a sample tile URL directly

## 2. Koppen Data Constants

- [ ] 2.1 Create `src/lib/koppen.js` with the `KOPPEN_TILE_URL` constant pointing to the R2 bucket XYZ tile pattern (`{z}/{x}/{y}.png`)
- [ ] 2.2 Add the `KOPPEN_CLASSES` array to `src/lib/koppen.js` — 30 entries, each with `{ code, name, color }` sourced from the Beck 2018 legend (e.g., `{ code: 'Af', name: 'Tropical rainforest', color: '#0000FF' }`)

## 3. KoppenMap Component

- [ ] 3.1 Create `src/components/KoppenMap.jsx` with props: `stations` (optional array), `showTransect` (optional bool, default false), `initialViewState` (optional object)
- [ ] 3.2 Add the MapLibre GL map with OpenFreeMap base tiles (same style URL as BuilderPage)
- [ ] 3.3 Add the Koppen raster `Source` and `Layer` using `KOPPEN_TILE_URL`; include Beck 2018 attribution
- [ ] 3.4 Add opacity state (default 0.7) and bind it to a `<input type="range">` slider; wire slider value to `raster-opacity` paint property
- [ ] 3.5 Render station `Marker` components when `stations` prop is non-empty; show station name as a label
- [ ] 3.6 When `showTransect={true}` and stations exist, render a GeoJSON `Source` + `Layer` LineString connecting stations (matching BuilderPage line style)
- [ ] 3.7 Render the `KOPPEN_CLASSES` legend as a scrollable color-swatch grid below (or alongside) the map

## 4. KoppenViewerPage

- [ ] 4.1 Create `src/pages/KoppenViewerPage.jsx` with a brief header explaining the Koppen-Geiger classification system (2–3 sentences + link to Beck et al. 2018)
- [ ] 4.2 Embed `<KoppenMap />` with default props (no stations, no transect line) in the page

## 5. Routing and Navigation

- [ ] 5.1 Import `KoppenViewerPage` in `src/App.jsx` and add `<Route path="/koppen" element={<KoppenViewerPage />} />`
- [ ] 5.2 Add `{ to: '/koppen', label: 'Koppen' }` to the `NAV_LINKS` array in `src/components/NavHeader.jsx`

## 6. Verification

- [ ] 6.1 Run `npm run dev` and navigate to `/#/koppen` — confirm the map renders with the overlay and legend visible
- [ ] 6.2 Confirm the opacity slider adjusts overlay transparency in real time
- [ ] 6.3 Confirm station markers render correctly by temporarily passing the transect stations as a prop
- [ ] 6.4 Confirm the "Koppen" nav link is active when on `/koppen` and navigates correctly
- [ ] 6.5 Run `npm run build` — confirm no build errors
