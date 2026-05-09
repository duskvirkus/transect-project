## MODIFIED Requirements

### Requirement: Analysis page renders the full analysis report
The `/analysis` route SHALL render the full Part 3 analysis report page. The page SHALL display a vertically-aligned transect layout (Koppen map + charts), per-station Koppen classifications, climate charts, and — for the default dataset — the 7-controls analysis and per-station blurbs/photos. The "Under Construction" placeholder SHALL be removed.

#### Scenario: Analysis page renders report content
- **WHEN** a user navigates to `/analysis`
- **THEN** the page displays the Koppen map, temperature heatmap, precipitation chart, elevation profile, and station information — not an "Under Construction" message
