## MODIFIED Requirements

### Requirement: App uses client-side routing
The app SHALL use React Router to serve six routes: `/` (landing page), `/builder` (transect builder), `/climate-data` (climate data page), `/analysis` (analysis placeholder), `/create-a-transect` (guided workflow), and `/what-is-felsius` (Felsius informational page).

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

#### Scenario: Unknown route
- **WHEN** a user navigates to an unrecognized path
- **THEN** the app redirects to `/`
