## MODIFIED Requirements

### Requirement: Default dataset loads on home page
The climate data page SHALL load and display climate data from the bundled default dataset without requiring any user action or network request.

#### Scenario: Default data visible on page load
- **WHEN** a user navigates to `/climate-data`
- **THEN** the page displays climate data for the 10 default transect stations immediately, without prompting for a file upload or making any API calls
