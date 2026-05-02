## 1. Branch and Dependencies

- [x] 1.1 Create a new git branch (e.g., `git checkout -b feature/home-climate-page`)
- [x] 1.2 Install `react-router-dom` in `frontend/` (`npm install react-router-dom`)

## 2. Routing Shell

- [x] 2.1 Rename current `App.jsx` builder content: extract all JSX and state into `frontend/src/BuilderPage.jsx`
- [x] 2.2 Rewrite `App.jsx` as the router shell: import `BrowserRouter`, `Routes`, `Route`, render `HomePage` at `/` and `BuilderPage` at `/builder`, redirect unknown routes to `/`
- [x] 2.3 Add a `NavHeader` component with links to `/` (Home) and `/builder` (Builder), with active-link styling

## 3. Climate Fetch Module

- [x] 3.1 Create `frontend/src/climate.js` — export an async `fetchStationClimate(lat, lng)` function
- [x] 3.2 Inside `fetchStationClimate`: call `https://archive-api.open-meteo.com/v1/archive` with `start_date=1991-01-01`, `end_date=2020-12-31`, `daily=temperature_2m_max,temperature_2m_min,precipitation_sum`, `timezone=UTC`
- [x] 3.3 Aggregate the returned daily values by calendar month: average `temperature_2m_max` per month across all years for `monthlyMaxTemp`, same for `monthlyMinTemp`, sum-then-average `precipitation_sum` per month for `monthlyPrecip`
- [x] 3.4 Return `{ monthlyMaxTemp, monthlyMinTemp, monthlyPrecip }` (arrays of 12 numbers, Jan–Dec)

## 4. Default Dataset

- [x] 4.1 Write a one-off fetch script (or run manually in the browser console / Node) to call `fetchStationClimate` for each of the 10 stations in `transect-278deg.json` and merge the results into an enriched JSON
- [x] 4.2 Save the output as `data/default-climate.json` (project root data dir, in version control)

## 5. Home Page

- [x] 5.1 Create `frontend/src/HomePage.jsx` — on mount, import and display `default-climate.json`
- [x] 5.2 Add a file upload input that parses the selected JSON file and validates it has a `stations` array with `lat`, `lng`, `name` fields; show an error message on invalid input
- [x] 5.3 On valid upload, fetch climate data station-by-station using `fetchStationClimate`, updating per-station status (`pending` → `loading` → `done`) after each completes
- [x] 5.4 Render a station list showing name, coordinates, and the 12-month climate values (max temp, min temp, precipitation) once data is loaded
- [x] 5.5 Add a Download JSON button that triggers browser download of the enriched JSON; button is disabled while fetching

## 6. Styling and Polish

- [x] 6.1 Add CSS for the nav header (consistent with existing `App.css` style)
- [x] 6.2 Add CSS for the home page station cards / climate data display
- [ ] 6.3 Verify the builder still works correctly at `/builder` and the Save JSON download still functions

## 7. Verification

- [ ] 7.1 Confirm home page loads default data with no network requests
- [ ] 7.2 Upload `transect-278deg.json` and verify all 10 stations fetch and display correctly
- [ ] 7.3 Upload an invalid JSON and verify the error message appears without replacing the dataset
- [ ] 7.4 Download enriched JSON and verify the schema includes `climateData` on each station with 12-value arrays
- [ ] 7.5 Navigate between `/` and `/builder` and verify both routes render correctly
