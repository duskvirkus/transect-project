## Context

The app is a React + Vite SPA with react-router-dom v7 using `BrowserRouter`. It currently lives in a `frontend/` subdirectory of the repo alongside `data/`, `docs/`, and `openspec/`. There is no backend and none is planned.

GitHub Pages serves static files with no server-side routing support. A cold navigation to `/climate-data` returns a 404 because there is no `climate-data/index.html`. The standard solutions are (a) `HashRouter` — routes become `/#/climate-data`, no server config needed — or (b) a `404.html` redirect hack. This project is a student assignment with no SEO requirements, so clean URLs are not a priority.

## Goals / Non-Goals

**Goals:**
- Move the Vite app from `frontend/` to the repo root (no backend, no reason for the subdirectory)
- Site loads correctly when served from GitHub Pages at the repo's Pages URL
- Landing page (`/`) orients visitors to the project and links to key pages
- Nav order is Builder → Climate Data → Analysis
- `/climate-data` hosts the existing climate data page
- `/analysis` exists as a placeholder
- `/create-a-transect` provides a guided multi-step walkthrough
- GitHub Actions workflow deploys `dist/` to GitHub Pages on push to `main`

**Non-Goals:**
- Pretty URLs (hash-based routing is acceptable)
- Server-side rendering or a backend
- Committing build artifacts to the repository
- A functional Analysis page (Part 3 is out of scope)

## Decisions

### Move `frontend/` to repo root

**Decision:** Hoist all `frontend/` contents (package.json, vite.config, src/, etc.) to the repo root. Remove the `frontend/` directory.

**Rationale:** There is no backend and no anticipated need for one. The subdirectory adds friction without benefit — every `npm` command requires `cd frontend/` or `-C frontend`. Existing non-source directories (`data/`, `openspec/`, `docs/`) are distinct enough that they won't conflict with Vite's `src/` or `public/` conventions.

**Migration:** Use `git mv` to move files so history is preserved.

### HashRouter over BrowserRouter + 404.html hack

**Decision:** Switch from `BrowserRouter` to `HashRouter`.

**Rationale:** GitHub Pages cannot rewrite 404s to `index.html` reliably — the 404.html trick is fragile. `HashRouter` requires zero server configuration and is the idiomatic choice for static-hosted SPAs with no SEO requirement. Trade-off is `/#/` prefixes in all URLs, which is fine here.

### GitHub Actions workflow for deployment

**Decision:** Use a `.github/workflows/deploy.yml` that runs `npm ci && npm run build` on push to `main`, then uploads `dist/` via `actions/upload-pages-artifact` and deploys via `actions/deploy-pages`. GitHub Pages source is set to "GitHub Actions" in repo settings.

**Rationale:** GitHub Pages branch-based publishing only supports `/` (root) or `/docs` as the source folder — no custom directory names. Using GitHub Actions avoids committing build artifacts to the repo entirely, which is the cleaner long-term approach. The workflow also sets the correct `permissions` (`pages: write`, `id-token: write`) required by the deploy action.

**Vite `base` config:** Set `base` to `"/transect-project/"` in `vite.config.js`. GitHub Pages for a project repo serves from `https://<user>.github.io/<repo>/`; without `base`, all asset paths 404.

### `/create-a-transect` as a static instructional page

**Decision:** The guided workflow page is informational (steps + links) rather than a wizard with shared state.

**Rationale:** Each step (Builder, Climate Data, Analysis) is already its own full page. Orchestrating cross-page state is over-engineered for this assignment. A page that explains the three steps with links to each is sufficient.

### Analysis page as immediate placeholder

**Decision:** Create a minimal `AnalysisPage.jsx` that renders only an "Under Construction" message, wired to `/analysis`.

**Rationale:** The route needs to exist so nav links don't 404. No Part 3 implementation details are known yet.

## Risks / Trade-offs

- **HashRouter URL aesthetics** → Mitigation: Acceptable for a student project; can be changed later if the repo moves to a host with rewrite support.
- **`base` path hardcoded to repo name** → Mitigation: Document the `vite.config.js` `base` value in README so future contributors know to update it if the repo is renamed.
- **GitHub Actions workflow permissions** → Mitigation: Workflow requires `pages: write` and `id-token: write`; these are set in the workflow file. Repo must have Pages enabled with source set to "GitHub Actions" before the first deploy succeeds.
- **Moving files loses IDE history if not using `git mv`** → Mitigation: Use `git mv` for all file moves so `git log --follow` works.

## Migration Plan

1. Move all `frontend/` contents to repo root using `git mv`
2. Change `BrowserRouter` → `HashRouter` in `App.jsx`
3. Set `base: "/transect-project/"` in `vite.config.js`; remove `server.fs.allow` (no longer needed at root)
4. Create `.github/workflows/deploy.yml` with build + upload-pages-artifact + deploy-pages jobs
5. Add new page components: `LandingPage.jsx`, `CreateATransectPage.jsx`, `AnalysisPage.jsx`
6. Update `App.jsx` routes: `/` → `LandingPage`, `/climate-data` → `HomePage`, `/builder` → `BuilderPage`, `/analysis` → `AnalysisPage`, `/create-a-transect` → `CreateATransectPage`
7. Update `NavHeader.jsx` link order: Builder → Climate Data → Analysis (omit landing page from nav)
8. Run `npm run build` locally, verify `dist/` output
9. Push to `main`; in repo settings set Pages source to "GitHub Actions"; confirm workflow deploys successfully

Rollback: revert commits; Pages will fall back to prior state (or disable Pages).
