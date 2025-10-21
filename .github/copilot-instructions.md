<!--
This file is intended to help AI coding assistants become productive in this repository quickly.
Keep entries concrete and tied to discoverable files. Avoid aspirational rules.
-->

# Copilot / AI assistant instructions (concise)

Be concrete, minimal, and repository-aware. Focus fixes and suggestions on the files and patterns below.

1. Big-picture architecture
   - Monorepo with two primary apps:
     - `backend/`: Laravel 12 PHP application (API + blade view at `/resources/views/welcome.blade.php`). Primary PHP entry: `backend/artisan`.
     - `frontend/`: Vite + React application (entries under `frontend/src/`, main mount in `frontend/src/main.jsx`).
   - Integration: The Laravel app uses `laravel-vite-plugin` to include frontend assets. See `backend/vite.config.js` and `backend/resources/views/welcome.blade.php` where `@vite(['resources/css/app.css', 'resources/js/app.js'])` is used.

2. Common developer workflows (commands you can suggest or modify)
   - Backend composer scripts (run from `backend/`):
     - Install & setup: `composer install` then copy env and `php artisan key:generate`.
     - Development: `php artisan serve` (the repository's `composer.json` includes a `dev` script that coordinates `php artisan serve`, queue listener, etc. with `concurrently`).
     - Tests: `composer test` triggers `@php artisan test` (see `backend/composer.json` scripts).
   - Frontend npm scripts (run from `frontend/`):
     - Dev: `npm run dev` (starts Vite dev server).
     - Build: `npm run build` (Vite build).
     - Lint: `npm run lint` (ESLint configured at project root of frontend).
   - Full local dev (monorepo): The backend `composer.json` defines a compound `dev` script that uses `concurrently` to run `php artisan serve`, queue and pail, and `npm run dev` together. Examine `backend/composer.json` -> `scripts.dev` for exact composition.

3. Project-specific conventions & patterns
   - Frontend entry point: `frontend/src/main.jsx` mounts `<App />` into the HTML element with id "root" (see `frontend/index.html`). Edit React components in `frontend/src/` and update `frontend/index.html` for static changes.
   - Laravel routes: Minimal default route at `backend/routes/web.php` returning the Blade view. For API endpoints, check `backend/app/Http/Controllers/`.
   - Assets and Vite: Frontend assets are compiled by Vite and injected into blade views using `@vite(...)`. When editing CSS/JS, update `backend/resources/js/app.js` or `frontend/src` depending on which side owns the source; this repo uses `frontend/` for React and `backend/resources/js` for Laravel-specific bootstrap (see `backend/vite.config.js` and `frontend/package.json`).
   - Database/migrations: Migrations are under `backend/database/migrations`. If you create models, also add factories under `backend/database/factories`.

4. Where to make common changes (examples)
   - Add a new API route: `backend/routes/web.php` or `routes/api.php` (if present) and implement controller in `backend/app/Http/Controllers/`.
   - Change frontend UI: edit `frontend/src/App.jsx` or components under `frontend/src/components/` and run `frontend/npm run dev`.
   - Wire new frontend bundle into Laravel: ensure `backend/resources/views/*.blade.php` calls `@vite([...])` for the compiled assets; update `backend/vite.config.js` if changing vite input paths.

5. Tests and linting
   - Backend tests: `composer test` runs `php artisan test`. Tests live in `backend/tests/`.
   - Frontend lint: `npm run lint` from `frontend/`.

6. Integration points & external dependencies
   - laravel/framework and other PHP deps are in `backend/composer.json`. Frontend uses Vite + React declared in `frontend/package.json`.
   - The repo uses `laravel-vite-plugin` (backend) to integrate Vite outputs into Blade templates.
   - Background workers / queues: Composer `dev` script config shows queue listener usage (`php artisan queue:listen`) — be conservative when editing queue or pail-related code.

7. Examples to reference in suggested edits
   - `backend/resources/views/welcome.blade.php` — shows how `@vite([...])` is used.
   - `frontend/src/main.jsx` — the React mount point.
   - `backend/routes/web.php` — default route returning the blade view.
   - `backend/composer.json` and `frontend/package.json` — scripts and dev workflows.

8. Editing rules for AI suggestions
   - Always prefer small, incremental changes in existing files. Provide tests where behavior is changed.
   - When adding commands or scripts, target the correct workspace folder (`backend/` or `frontend/`) and update both package manifests and README snippets.
   - Preserve Laravel conventions: route registration, controller namespacing (PSR-4 under `App\\Http\\Controllers\\`), and migration timestamps.
   - If introducing new PHP packages, update `backend/composer.json` and run `composer install` in the instructions.

9. When to ask the user
   - If a change requires environment credentials (DB, mail, third-party APIs), ask before suggesting secrets or changes to `.env`.
   - If a proposed change affects CI/CD or deploy scripts, flag it and request confirmation (these can be sensitive).

If anything above is unclear or you'd like additional examples (CI, Docker, or specific controller/component walkthroughs), tell me which area to expand.
