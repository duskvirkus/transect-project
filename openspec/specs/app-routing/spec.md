## Purpose
Defines the client-side routing structure and navigation header for the app.
## Requirements
### Requirement: App uses client-side routing
The app SHALL use React Router to serve seven routes: `/` (landing page), `/builder` (transect builder), `/climate-data` (climate data page), `/analysis` (analysis placeholder), `/create-a-transect` (guided workflow), `/what-is-felsius` (Felsius informational page), and `/koppen` (Koppen-Geiger viewer).

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

#### Scenario: What Is Felsius route renders informational page
- **WHEN** a user navigates to `/what-is-felsius`
- **THEN** the What Is Felsius page is rendered

#### Scenario: Koppen route renders viewer page
- **WHEN** a user navigates to `/#/koppen`
- **THEN** the Koppen Viewer page renders with the map and header visible

#### Scenario: Unknown route
- **WHEN** a user navigates to an unrecognized path
- **THEN** the app redirects to `/`

### Requirement: Navigation header links between pages
The app SHALL display a persistent navigation header with links to Builder, Climate Data, Analysis, and Koppen — in that order.

#### Scenario: Nav links are visible on all pages
- **WHEN** the user is on any page
- **THEN** the nav header shows links to Builder (`/builder`), Climate Data (`/climate-data`), Analysis (`/analysis`), and Koppen (`/koppen`) in that order

#### Scenario: Active route is indicated
- **WHEN** the user is on a given route
- **THEN** that route's nav link is visually distinguished as active

