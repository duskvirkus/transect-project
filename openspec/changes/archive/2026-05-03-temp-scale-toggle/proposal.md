## Why

The climate data page displays all temperatures in Celsius (°C) with no way to change units, which limits accessibility for users accustomed to Fahrenheit or scientific contexts using Kelvin — and adds an easter-egg scale (Felsius, °Ꞓ) for fun. A global temperature-scale toggle lets each user view the same underlying data in their preferred unit without any re-fetching.

## What Changes

- Add a persistent temperature scale toggle in the bottom-right corner of the app (fixed overlay), supporting four scales: Celsius (°C), Fahrenheit (°F), Kelvin (K), and Felsius (°Ꞓ)
- Internally, all data remains stored in Celsius; conversion happens only at display time
- The toggle shows symbol-only labels for unselected options and `Full Name (symbol)` for the active option
- When Felsius is selected, a small contextual link appears pointing to the `/what-is-felsius` page
- Add a new `/what-is-felsius` page that explains the satirical Felsius scale, links to the user's FelsiusWeather project and the original xkcd comic #1923
- All temperature values on all pages (currently `HomePage`) convert reactively when the scale changes
- Add unit tests for temperature conversion logic

## Capabilities

### New Capabilities

- `temp-scale-toggle`: Global UI widget (fixed bottom-right) that controls the active temperature scale across the app; persists selection in a React context/global state
- `temp-conversions`: Pure conversion functions (°C → °F, °C → K, °C → °Ꞓ) with formula `°Ꞓ = °C × 7/5 + 16`; used site-wide for display
- `what-is-felsius-page`: Informational page at `/what-is-felsius` describing the Felsius scale with links to FelsiusWeather and xkcd #1923

### Modified Capabilities

- `home-climate-page`: Temperature display rows now use the active scale instead of hard-coded °C labels and raw values
- `app-routing`: Add route for `/what-is-felsius`

## Impact

- **New files**: `src/TempScaleContext.jsx`, `src/TempScaleToggle.jsx`, `src/temperature.js`, `src/temperature.test.js`, `src/WhatIsFelsiusPage.jsx`
- **Modified files**: `src/App.jsx` (add context provider, route, toggle overlay), `src/HomePage.jsx` (consume context for display), `src/App.css` (toggle overlay styles)
- No API changes, no data format changes; purely display-layer
