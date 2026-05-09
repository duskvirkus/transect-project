# bibliography-page Specification

## Purpose
Defines requirements for the bibliography page, which lists all project data sources and tools with deep-linkable anchors, and the inline Cite component used throughout the app.

## Requirements

### Requirement: Bibliography page lists all project sources and tools
The `/bibliography` route SHALL render a page listing every entry in `src/lib/citations.js`, organized by type (data sources, tools/libraries). Each entry SHALL display authors, year, title, and a link to the source URL. Each entry SHALL have an HTML anchor (`id="ref-{id}"`) for deep linking from inline citations.

The `CITATIONS` array SHALL contain the following entries with these exact values:

**Data sources (unchanged except year updates):**
- `open-meteo`: Zippenfenig, P., 2023 (unchanged)
- `beck-koppen`: Beck et al., 2018 (unchanged)
- `openfreemap`: OpenFreeMap contributors, 2026
- `openstreetmap`: OpenStreetMap contributors, 2026

**Tools/libraries (updated copyright holders and years):**
- `react`: Meta Platforms, Inc., 2026
- `vite`: VoidZero Inc. and Vite contributors, 2026
- `react-router`: Shopify, Inc., 2026
- `maplibre-gl`: MapLibre contributors, 2026
- `react-map-gl`: OpenJS Foundation and vis.gl contributors, 2026
- `recharts`: Recharts Group, 2026
- `turf`: Turfjs contributors, 2026
- `claude-code` (NEW): Anthropic, PBC, 2026, "Claude Code — Agentic AI coding tool", url: `https://claude.ai/code`

#### Scenario: Bibliography renders all citations including Claude Code
- **WHEN** a user navigates to `/bibliography`
- **THEN** all entries from `CITATIONS` are displayed, including the new Claude Code entry, each with correct authors, year, title, and URL link

#### Scenario: Deep link anchor works
- **WHEN** the user navigates to `/bibliography#ref-open-meteo`
- **THEN** the page scrolls to the Open-Meteo citation entry

### Requirement: Inline Cite component links to bibliography
The app SHALL provide a `<Cite id="..." />` component that renders a superscript reference number (e.g., `[1]`) as a link. Clicking the link SHALL open `/bibliography#ref-{id}` in a new browser tab. The reference number SHALL correspond to the 1-based index of the citation in the `CITATIONS` array.

#### Scenario: Cite renders superscript link
- **WHEN** `<Cite id="open-meteo" />` is rendered
- **THEN** a superscript link showing the citation's index number is displayed

#### Scenario: Cite opens bibliography in new tab
- **WHEN** the user clicks a `<Cite />` link
- **THEN** `/bibliography#ref-{id}` opens in a new browser tab, not replacing the current page

#### Scenario: Unknown citation id is handled
- **WHEN** `<Cite id="nonexistent" />` is rendered
- **THEN** the component renders a visually distinct placeholder (e.g., `[?]`) without throwing an error
