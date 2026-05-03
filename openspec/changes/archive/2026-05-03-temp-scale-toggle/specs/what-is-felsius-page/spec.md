## ADDED Requirements

### Requirement: What Is Felsius page is accessible
The app SHALL render a `WhatIsFelsiusPage` component at `/what-is-felsius` that explains the Felsius temperature scale.

#### Scenario: Page renders at correct route
- **WHEN** a user navigates to `/what-is-felsius`
- **THEN** the What Is Felsius page is displayed

### Requirement: Page explains the Felsius scale
The page SHALL include a human-readable explanation of Felsius: that it is a satirical scale created by Randall Munroe (xkcd) as the arithmetic mean of Celsius and Fahrenheit, with the formula °Ꞓ = °C × 7/5 + 16 and symbol °Ꞓ.

#### Scenario: Explanation content present
- **WHEN** the user views the What Is Felsius page
- **THEN** the page displays a description of what Felsius is, including its formula and origin

### Requirement: Page links to FelsiusWeather project
The page SHALL contain a link to the FelsiusWeather app at `https://duskvirkus.github.io/FelsiusWeather/` that opens in a new tab.

#### Scenario: FelsiusWeather link present
- **WHEN** the user views the What Is Felsius page
- **THEN** there is a link to the FelsiusWeather site that opens in a new tab

### Requirement: Page links to original xkcd comic
The page SHALL contain a link to xkcd comic #1923 at `https://xkcd.com/1923/` that opens in a new tab.

#### Scenario: xkcd link present
- **WHEN** the user views the What Is Felsius page
- **THEN** there is a link to xkcd #1923 that opens in a new tab
