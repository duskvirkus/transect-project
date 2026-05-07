## ADDED Requirements

### Requirement: Precipitation unit context provides global unit state
The system SHALL provide a `PrecipUnitContext` React context and a `PrecipUnitProvider` component in `src/components/PrecipUnitContext.jsx`. A `usePrecipUnit()` hook SHALL expose `{ unit, setUnit }` to any component in the tree. The default unit SHALL be `'mm'`. Supported units: `'mm'`, `'cm'`, `'in'`.

#### Scenario: Default unit is mm
- **WHEN** a component calls `usePrecipUnit()` without the user having changed the unit
- **THEN** `unit` is `'mm'`

#### Scenario: Unit change propagates
- **WHEN** `setUnit('in')` is called from any component
- **THEN** all components consuming `usePrecipUnit()` receive `unit === 'in'` on next render

### Requirement: Precipitation unit toggle is displayed on CollectDataPage and AnalysisPage only
The app SHALL render a `PrecipUnitToggle` component on `CollectDataPage` and `AnalysisPage`. It SHALL NOT appear on other pages. The toggle SHALL display three interactive segments: mm, cm, in. The active segment SHALL be visually distinct.

#### Scenario: Toggle visible on CollectDataPage
- **WHEN** the user navigates to `/climate-data`
- **THEN** the precipitation unit toggle is visible on the page

#### Scenario: Toggle visible on AnalysisPage
- **WHEN** the user navigates to `/analysis`
- **THEN** the precipitation unit toggle is visible on the page

#### Scenario: Toggle absent on other pages
- **WHEN** the user is on any page other than `/climate-data` or `/analysis`
- **THEN** the precipitation unit toggle is not rendered

#### Scenario: Selecting a segment changes the active unit
- **WHEN** the user clicks a non-active unit segment
- **THEN** that unit becomes active and the toggle updates accordingly

### Requirement: Precipitation conversion utilities are available
The system SHALL provide a `convertPrecip(mm, unit)` function in `src/lib/precipitation.js` that converts a millimeter value to the specified unit. Conversion: cm = mm / 10, in = mm / 25.4, mm = no-op. Values SHALL be rounded to 1 decimal place.

#### Scenario: Convert mm to cm
- **WHEN** `convertPrecip(100, 'cm')` is called
- **THEN** it returns `10.0`

#### Scenario: Convert mm to inches
- **WHEN** `convertPrecip(25.4, 'in')` is called
- **THEN** it returns `1.0`

#### Scenario: mm passthrough
- **WHEN** `convertPrecip(50, 'mm')` is called
- **THEN** it returns `50.0`

#### Scenario: Null passthrough
- **WHEN** `convertPrecip(null, 'in')` is called
- **THEN** it returns `null`
