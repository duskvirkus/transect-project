## Why

The app currently has no public landing page and is not deployed — users navigating to the site have no orientation to the project. Hosting on GitHub Pages requires a hash-based router and a clear entry point; restructuring the nav and adding a landing page makes the app self-explanatory for anyone grading or reviewing the Fuji 278 transect work.

## What Changes

- Add a landing page (`/`) with a brief project explanation and two CTA buttons: "View Fuji 278 Transect" and "Create a Transect"
- Move the existing climate data page from `/` (or current home route) to `/climate-data`
- Add an `/analysis` route (Part 3 placeholder) showing an "Under Construction" message
- Add a `/create-a-transect` guided workflow page walking users through Builder → Climate Data → Analysis steps
- Reorder top nav to: Builder → Climate Data → Analysis
- **BREAKING**: `home-climate-page` capability moves from root route to `/climate-data`
- Configure GitHub Pages deployment via GitHub Actions workflow (hash router, `dist/` build output uploaded by CI)

## Capabilities

### New Capabilities

- `landing-page`: Project landing page at `/` with project summary and navigation CTAs
- `create-a-transect`: Step-by-step guided workflow page walking through Builder → Climate Data → Analysis
- `analysis-page`: Placeholder `/analysis` route with "Under Construction" message
- `github-pages-deploy`: GitHub Pages hosting configuration (hash router, build output, deploy workflow)

### Modified Capabilities

- `app-routing`: Route table changes — root becomes landing page, climate data moves to `/climate-data`, new routes added, nav order updated
- `home-climate-page`: Page component unchanged but moved from root route to `/climate-data`

## Impact

- `src/App.tsx` (or router config): route definitions reordered/added
- `src/components/Nav` (or equivalent): nav link order updated
- `vite.config.ts` or build config: base path may need adjustment for GitHub Pages
- `.github/workflows/deploy.yml`: new GitHub Actions workflow for CI/CD deploy
- GitHub repository settings: Pages source set to "GitHub Actions"
