### Requirement: App uses client-side routing
The app SHALL use React Router to serve two routes: `/` (home/climate page) and `/builder` (transect builder).

#### Scenario: Home route renders climate page
- **WHEN** a user navigates to `/`
- **THEN** the home climate page is rendered

#### Scenario: Builder route renders builder
- **WHEN** a user navigates to `/builder`
- **THEN** the transect builder is rendered (equivalent to the current app behavior)

#### Scenario: Unknown route
- **WHEN** a user navigates to an unrecognized path
- **THEN** the app redirects to `/`

### Requirement: Navigation header links between pages
The app SHALL display a persistent navigation header with links to both routes.

#### Scenario: Nav links are visible on all pages
- **WHEN** the user is on any page
- **THEN** the nav header shows links to both Home (`/`) and Builder (`/builder`)

#### Scenario: Active route is indicated
- **WHEN** the user is on a given route
- **THEN** that route's nav link is visually distinguished as active
