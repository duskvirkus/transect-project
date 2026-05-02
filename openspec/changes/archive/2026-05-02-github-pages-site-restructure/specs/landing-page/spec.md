## ADDED Requirements

### Requirement: Landing page displays project summary
The landing page at route `/` SHALL display a brief explanation of the MET 1050 Fuji 278 transect project.

#### Scenario: Landing page renders on root route
- **WHEN** a user navigates to `/`
- **THEN** the landing page is displayed with a project title and a short description of the transect project

### Requirement: Landing page provides CTA buttons
The landing page SHALL display two call-to-action buttons: "View Fuji 278 Transect" and "Create a Transect".

#### Scenario: View Fuji 278 Transect button navigates to climate data
- **WHEN** a user clicks "View Fuji 278 Transect"
- **THEN** the app navigates to `/climate-data`

#### Scenario: Create a Transect button navigates to guided workflow
- **WHEN** a user clicks "Create a Transect"
- **THEN** the app navigates to `/create-a-transect`
