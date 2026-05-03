## Context

The app displays climate temperature values fetched from Open-Meteo, which returns data in Celsius. Currently all temperature values are displayed as-is (°C) with hard-coded labels. The change adds a user-selectable temperature scale (Celsius, Fahrenheit, Kelvin, Felsius) that converts values at display time without touching the stored data.

The app is a React SPA using React Router (HashRouter). There is no existing global state management — components are standalone with local `useState`.

## Goals / Non-Goals

**Goals:**
- Global temperature scale preference that affects all temperature displays site-wide
- Fixed bottom-right overlay toggle visible on every page
- Pure display-layer conversion; stored data always remains °C
- `/what-is-felsius` informational page with external links
- Unit-tested conversion functions
- Contextual "What is Felsius?" link in the toggle when Felsius is active

**Non-Goals:**
- Persisting the scale preference across browser sessions (no localStorage)
- Converting precipitation or any non-temperature values
- Affecting the JSON download format (always exports °C)

## Decisions

### Decision: React Context for global scale state

Use a `TempScaleContext` (React Context + Provider) wrapping the entire app in `App.jsx`. Any component that displays temperatures consumes the context with `useTempScale()` hook.

**Alternatives considered:**
- Prop drilling: rejected — too many component layers to thread through
- Zustand/Redux: rejected — overkill for a single string state; adds a dependency
- URL query param: rejected — clutters URLs and breaks deep links unexpectedly

### Decision: Conversion at render time in components

Components call `convertTemp(value, scale)` from `src/temperature.js` when rendering each cell. The raw °C data is never mutated.

**Alternative**: Convert when data is fetched and store in a different format. Rejected — would require re-fetching or re-processing when scale changes.

### Decision: Toggle UI — segmented button strip, not a dropdown

Four labeled segments in a fixed bottom-right overlay. Unselected segments show only the symbol (`°C`, `°F`, `K`, `°Ꞓ`). Selected segment shows `Full Name (symbol)` e.g. `Celsius (°C)`. This fits in a small footprint and makes all options immediately visible.

### Decision: Felsius symbol — use `°Ꞓ` (U+A793, Latin small letter c with bar)

This matches the xkcd comic's intent and renders well in standard fonts. The `⋲` (U+22F2) option was considered but is a mathematical operator and may render poorly in UI fonts.

### Decision: New route `/what-is-felsius` via HashRouter

Add as a standard `<Route>` in `App.jsx`. Not linked from the nav header (too niche) — only accessible via the contextual link in the toggle when Felsius is active, and through direct URL.

## Risks / Trade-offs

- [Felsius symbol rendering] The `Ꞓ` character may not render in all fonts → Mitigation: test in target browsers; fall back to `°F̈` description in text if needed, but keep symbol in code
- [Context provider wrapping] Adding a provider at the `App` level is a small structural change but has no risk of breaking existing routing or page behavior
- [Rounding] Converting °C → other scales then rounding to 1 decimal may show slightly different precision than expected → Mitigation: round after conversion, same as current °C display

## Open Questions

- None — scope is clear and self-contained.
