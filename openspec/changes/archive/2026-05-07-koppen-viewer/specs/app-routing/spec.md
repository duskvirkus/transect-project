## ADDED Requirements

### Requirement: Koppen Viewer route renders at /koppen
The app SHALL serve a Koppen Viewer page at the `/koppen` route. The page SHALL render `KoppenViewerPage`, which displays the `KoppenMap` component with a brief explanatory header describing the Koppen-Geiger classification system.

#### Scenario: Koppen route renders viewer page
- **WHEN** a user navigates to `/#/koppen`
- **THEN** the Koppen Viewer page renders with the map and header visible

#### Scenario: Unknown routes still redirect to /
- **WHEN** a user navigates to an unrecognized path
- **THEN** the app redirects to `/` (unchanged behavior)

## MODIFIED Requirements

### Requirement: Navigation header links between pages
The app SHALL display a persistent navigation header with links to Builder, Climate Data, Analysis, and Koppen — in that order.

#### Scenario: Nav links are visible on all pages
- **WHEN** the user is on any page
- **THEN** the nav header shows links to Builder (`/builder`), Climate Data (`/climate-data`), Analysis (`/analysis`), and Koppen (`/koppen`) in that order

#### Scenario: Active route is indicated
- **WHEN** the user is on a given route
- **THEN** that route's nav link is visually distinguished as active
