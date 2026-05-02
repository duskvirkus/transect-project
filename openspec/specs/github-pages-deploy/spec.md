# github-pages-deploy Specification

## Purpose
TBD - created by archiving change github-pages-site-restructure. Update Purpose after archive.
## Requirements
### Requirement: App source lives at repo root
The Vite app source files SHALL reside at the repository root (not in a subdirectory), with `package.json`, `vite.config.js`, and `src/` at the top level.

#### Scenario: npm commands run from repo root
- **WHEN** a developer runs `npm run dev` or `npm run build` from the repository root
- **THEN** the development server starts or the production build completes without requiring a directory change

### Requirement: Vite base path is set for GitHub Pages
The Vite config SHALL set `base` to the repository's GitHub Pages subpath so that all asset URLs resolve correctly when hosted at `https://<user>.github.io/<repo>/`.

#### Scenario: Built assets use correct base path
- **WHEN** the app is built with `npm run build`
- **THEN** all script, stylesheet, and asset references in `dist/index.html` are prefixed with the configured base path

### Requirement: GitHub Actions workflow deploys to Pages on push to main
A `.github/workflows/deploy.yml` workflow SHALL build the app and deploy it to GitHub Pages automatically on every push to `main`.

#### Scenario: Push to main triggers deployment
- **WHEN** a commit is pushed to the `main` branch
- **THEN** the GitHub Actions workflow runs `npm ci && npm run build`, uploads the `dist/` directory as a Pages artifact, and deploys it to the GitHub Pages environment

#### Scenario: Workflow can be triggered manually
- **WHEN** a developer triggers the workflow manually via `workflow_dispatch`
- **THEN** the build and deploy jobs run as if triggered by a push

### Requirement: App uses HashRouter for client-side routing
The app SHALL use `HashRouter` (hash-based routing) so that all routes are resolvable from a static file host without server-side URL rewriting.

#### Scenario: Direct navigation to a hash route succeeds on GitHub Pages
- **WHEN** a user navigates directly to a URL such as `https://<user>.github.io/<repo>/#/climate-data`
- **THEN** the correct page renders without a 404 error

