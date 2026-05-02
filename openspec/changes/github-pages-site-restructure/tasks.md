## 1. Move App to Repo Root

- [x] 1.1 Use `git mv` to move all `frontend/` contents (src/, public/, package.json, vite.config.js, index.html, etc.) to the repo root
- [x] 1.2 Verify `npm install` runs cleanly from repo root and `npm run dev` starts the dev server

## 2. Configure GitHub Pages Build

- [x] 2.1 Update `vite.config.js`: set `base` to the GitHub Pages repo subpath (`"/transect-project/"`)
- [x] 2.2 Create `.github/workflows/deploy.yml`: build with `npm ci && npm run build`, upload `dist/` via `actions/upload-pages-artifact`, deploy via `actions/deploy-pages`
- [x] 2.3 Run `npm run build` locally and confirm `dist/index.html` and assets are generated
- [ ] 2.4 In GitHub repo settings, set Pages source to "GitHub Actions"

## 3. Switch to HashRouter

- [x] 3.1 Replace `BrowserRouter` with `HashRouter` in `App.jsx` (update import and JSX)
- [x] 3.2 Verify existing `/builder` route still works in dev after the switch

## 4. Add New Page Components

- [x] 4.1 Create `src/LandingPage.jsx` with project title, brief description, and two buttons: "View Fuji 278 Transect" (→ `/climate-data`) and "Create a Transect" (→ `/create-a-transect`)
- [x] 4.2 Create `src/AnalysisPage.jsx` with an "Under Construction" placeholder message
- [x] 4.3 Create `src/CreateATransectPage.jsx` with three numbered steps (Builder, Climate Data, Analysis), each with a short description and a link to its route

## 5. Update Routing

- [x] 5.1 Update `App.jsx` routes: `/` → `LandingPage`, `/climate-data` → `HomePage`, `/builder` → `BuilderPage`, `/analysis` → `AnalysisPage`, `/create-a-transect` → `CreateATransectPage`
- [x] 5.2 Update the catch-all `*` redirect to point to `/`

## 6. Update Navigation

- [x] 6.1 Update `NavHeader.jsx` to show links in order: Builder (`/builder`), Climate Data (`/climate-data`), Analysis (`/analysis`)
- [x] 6.2 Remove the old Climate Data link pointing to `/` (now the landing page)

## 7. Verify and Deploy

- [x] 7.1 Manually test all five routes in dev: `/`, `/builder`, `/climate-data`, `/analysis`, `/create-a-transect`
- [x] 7.2 Run `npm run build` locally and verify `dist/index.html` and assets exist; run `npm run preview` to check hash routing
- [ ] 7.3 Push to `main` and confirm the GitHub Actions deploy workflow runs successfully
- [ ] 7.4 Confirm the live Pages URL loads the landing page and all nav links work
