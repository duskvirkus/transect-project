# bibliography-page Specification

## Purpose
Defines requirements for the bibliography page, which lists all project data sources and tools with deep-linkable anchors, and the inline Cite component used throughout the app.

## Requirements

### Requirement: Bibliography page lists all project sources and tools
The `/bibliography` route SHALL render a page listing every entry in `src/lib/citations.js`, organized by type (data sources, tools/libraries). Each entry SHALL display authors, year, title, and a link to the source URL. Each entry SHALL have an HTML anchor (`id="ref-{id}"`) for deep linking from inline citations.

#### Scenario: Bibliography renders all citations
- **WHEN** a user navigates to `/bibliography`
- **THEN** all entries from `CITATIONS` are displayed, grouped by type, each with authors, year, title, and URL link

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
