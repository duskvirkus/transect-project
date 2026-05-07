## 1. Data Preparation (one-time, done outside the app)

- [x] 1.1 Download Beck et al. (2018) `KG_1986-2010.tif` from gloh2o.org
- [x] 1.2 Run `gdal_translate -of PNG -outsize 8192 4096 KG_1986-2010.tif public/koppen.png` to produce the bundled overlay image
- [x] 1.3 Verify `public/koppen.png` exists and is ~2–5 MB
- [x] 1.4 Commit `public/koppen.png` to the repo

## 2. Koppen Data Constants

- [x] 2.1 Update `src/lib/koppen.js` — rename constant to `KOPPEN_IMAGE_URL`, set to `'/koppen.png'`
- [x] 2.2 Add the `KOPPEN_CLASSES` array to `src/lib/koppen.js` — 30 entries, each with `{ code, name, color }` sourced from the Beck 2018 legend

## 3. KoppenMap Component

- [x] 3.1 Create `src/components/KoppenMap.jsx` with props: `stations` (optional array), `showTransect` (optional bool, default false), `initialViewState` (optional object)
- [x] 3.2 Add the MapLibre GL map with OpenFreeMap base tiles (same style URL as BuilderPage)
- [x] 3.3 Update KoppenMap to use MapLibre `image` source type (not `raster`) with `KOPPEN_IMAGE_URL` and global corner coordinates; include Beck 2018 attribution
- [x] 3.4 Add opacity state (default 0.65) and bind it to a `<input type="range">` slider (max 0.9); wire slider value to `raster-opacity` paint property
- [x] 3.5 Render station `Marker` components when `stations` prop is non-empty; show station name as a label
- [x] 3.6 When `showTransect={true}` and stations exist, render a GeoJSON `Source` + `Layer` LineString connecting stations (matching BuilderPage line style)
- [x] 3.7 Render the `KOPPEN_CLASSES` legend as a collapsible color-swatch grid above the map; swatch colors blend with white to match current opacity

## 4. KoppenViewerPage

- [x] 4.1 Create `src/pages/KoppenViewerPage.jsx` with a brief header explaining the Koppen-Geiger classification system (2–3 sentences + link to Beck et al. 2018)
- [x] 4.2 Embed `<KoppenMap />` with default props (no stations, no transect line) in the page

## 5. Routing and Navigation

- [x] 5.1 Import `KoppenViewerPage` in `src/App.jsx` and add `<Route path="/koppen" element={<KoppenViewerPage />} />`
- [x] 5.2 Add `{ to: '/koppen', label: 'Koppen' }` to the `NAV_LINKS` array in `src/components/NavHeader.jsx`

## 6. Verification

- [x] 6.1 Run `npm run dev` and navigate to `/#/koppen` — confirm the map renders with the overlay and legend visible
- [x] 6.2 Confirm the opacity slider adjusts overlay transparency in real time
- [x] 6.3 Confirm station markers render correctly by temporarily passing the transect stations as a prop
- [x] 6.4 Confirm the "Koppen" nav link is active when on `/koppen` and navigates correctly
- [x] 6.5 Run `npm run build` — confirm no build errors
