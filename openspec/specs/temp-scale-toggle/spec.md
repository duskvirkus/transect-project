## Purpose
Defines requirements for the global temperature scale toggle UI and its context.
## Requirements
### Requirement: Temperature scale context provides global scale state
The system SHALL provide a `TempScaleContext` React context and a `TempScaleProvider` component in `src/TempScaleContext.jsx`. A `useTempScale()` hook SHALL expose `{ scale, setScale }` to any component in the tree.

The default scale SHALL be `'celsius'`.

#### Scenario: Default scale is celsius
- **WHEN** a component calls `useTempScale()` without the user having changed the scale
- **THEN** `scale` is `'celsius'`

#### Scenario: Scale change propagates globally
- **WHEN** `setScale('fahrenheit')` is called from any component
- **THEN** all components consuming `useTempScale()` receive `scale === 'fahrenheit'` on next render

### Requirement: Temperature scale toggle is visible on every page
The app SHALL render a `TempScaleToggle` component as a fixed overlay in the bottom-right corner of the viewport. It SHALL be visible on all pages and not scroll with the page.

#### Scenario: Toggle visible on any page
- **WHEN** the user navigates to any route
- **THEN** the temperature scale toggle is visible in the bottom-right corner

### Requirement: Toggle displays all four scale options
The toggle SHALL display four interactive segments: Celsius, Fahrenheit, Kelvin, and Felsius. The unselected segments SHALL show only the scale symbol. The active segment SHALL show the full name and symbol (e.g., `Celsius (°C)`).

#### Scenario: Unselected segment shows symbol only
- **WHEN** a scale is not active
- **THEN** its toggle segment displays only its symbol (`°C`, `°F`, `K`, or `°Ꞓ`)

#### Scenario: Active segment shows full name
- **WHEN** a scale is active
- **THEN** its toggle segment displays the full name and symbol (e.g., `Fahrenheit (°F)`)

#### Scenario: Selecting a segment changes the active scale
- **WHEN** the user clicks a non-active segment
- **THEN** that scale becomes active and the toggle updates accordingly

### Requirement: Felsius selection shows a contextual info link
When the active scale is Felsius, the toggle SHALL display a small link reading "What is Felsius?" that navigates to `/what-is-felsius`.

#### Scenario: Link appears for Felsius scale
- **WHEN** the active scale is `'felsius'`
- **THEN** a "What is Felsius?" link is shown adjacent to the toggle

#### Scenario: Link absent for other scales
- **WHEN** the active scale is not `'felsius'`
- **THEN** no "What is Felsius?" link is shown
