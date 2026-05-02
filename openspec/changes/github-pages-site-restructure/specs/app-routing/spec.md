## MODIFIED Requirements

### Requirement: App uses client-side routing
The app SHALL use React Router to serve five routes: `/` (landing page), `/builder` (transect builder), `/climate-data` (climate data page), `/analysis` (analysis placeholder), and `/create-a-transect` (guided workflow).

#### Scenario: Root route renders landing page
- **WHEN** a user navigates to `/`
- **THEN** the landing page is rendered

#### Scenario: Builder route renders builder
- **WHEN** a user navigates to `/builder`
- **THEN** the transect builder is rendered

#### Scenario: Climate data route renders climate page
- **WHEN** a user navigates to `/climate-data`
- **THEN** the climate data page is rendered

#### Scenario: Analysis route renders analysis placeholder
- **WHEN** a user navigates to `/analysis`
- **THEN** the analysis placeholder page is rendered

#### Scenario: Create-a-Transect route renders guided workflow
- **WHEN** a user navigates to `/create-a-transect`
- **THEN** the create-a-transect guided workflow page is rendered

#### Scenario: Unknown route
- **WHEN** a user navigates to an unrecognized path
- **THEN** the app redirects to `/`

## MODIFIED Requirements

### Requirement: Navigation header links between pages
The app SHALL display a persistent navigation header with links to Builder, Climate Data, and Analysis — in that order.

#### Scenario: Nav links are visible on all pages
- **WHEN** the user is on any page
- **THEN** the nav header shows links to Builder (`/builder`), Climate Data (`/climate-data`), and Analysis (`/analysis`) in that order

#### Scenario: Active route is indicated
- **WHEN** the user is on a given route
- **THEN** that route's nav link is visually distinguished as active
