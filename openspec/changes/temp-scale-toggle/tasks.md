## 1. Temperature Conversion Library

- [x] 1.1 Create `src/temperature.js` with `TEMP_SCALES` array (celsius, fahrenheit, kelvin, felsius) each with `key`, `name`, and `symbol` fields
- [x] 1.2 Implement `convertTemp(celsius, scale)` function with formulas: °F = °C×9/5+32, K = °C+273.15, °Ꞓ = °C×7/5+16; return value rounded to 1 decimal; passthrough null; passthrough for celsius
- [x] 1.3 Create `src/temperature.test.js` with unit tests covering all four scale conversions, null passthrough, the -40 equivalence point, and the Felsius 0°C→16°Ꞓ reference

## 2. Global Scale Context

- [x] 2.1 Create `src/TempScaleContext.jsx` with `TempScaleContext`, `TempScaleProvider` (default scale `'celsius'`), and `useTempScale()` hook

## 3. Toggle UI Component

- [x] 3.1 Create `src/TempScaleToggle.jsx` — segmented button strip rendering one button per entry in `TEMP_SCALES`; inactive buttons show symbol only, active button shows `Name (symbol)`; calls `setScale` on click
- [x] 3.2 Add conditional "What is Felsius?" link below the toggle that only renders when active scale is `'felsius'`, linking to `/what-is-felsius` using React Router `<Link>`
- [x] 3.3 Add toggle overlay styles to `src/App.css`: fixed positioning, bottom-right corner, appropriate z-index, button group styling

## 4. What Is Felsius Page

- [x] 4.1 Create `src/WhatIsFelsiusPage.jsx` with explanation of the Felsius scale (satirical average of °C and °F by Randall Munroe/xkcd, formula °Ꞓ = °C×7/5+16, symbol °Ꞓ)
- [x] 4.2 Add external link to `https://duskvirkus.github.io/FelsiusWeather/` (opens in new tab) in `WhatIsFelsiusPage`
- [x] 4.3 Add external link to `https://xkcd.com/1923/` (opens in new tab) in `WhatIsFelsiusPage`

## 5. App Integration

- [x] 5.1 Wrap the `<HashRouter>` tree in `App.jsx` with `<TempScaleProvider>`
- [x] 5.2 Add `<TempScaleToggle />` inside the app shell div in `App.jsx` (renders on all pages)
- [x] 5.3 Add route `<Route path="/what-is-felsius" element={<WhatIsFelsiusPage />} />` in `App.jsx` and import `WhatIsFelsiusPage`

## 6. Climate Data Page Integration

- [x] 6.1 In `HomePage.jsx`, import `useTempScale` and `convertTemp` and `TEMP_SCALES`
- [x] 6.2 Replace hard-coded `Max °C` / `Min °C` row labels with dynamic labels using the active scale symbol (e.g., `Max ${symbol}`, `Min ${symbol}`)
- [x] 6.3 Apply `convertTemp(v, scale)` to each temperature cell value in the climate table rows (max temp and min temp rows only; leave precipitation unchanged)

## 7. Verification

- [x] 7.1 Run existing tests and new unit tests (`npm test` or equivalent) — all pass
- [ ] 7.2 Manually verify toggle renders fixed bottom-right on all pages
- [ ] 7.3 Manually verify scale changes update climate table values and labels reactively
- [ ] 7.4 Manually verify Felsius "What is Felsius?" link appears/disappears correctly
- [ ] 7.5 Manually verify `/what-is-felsius` page renders with both external links
