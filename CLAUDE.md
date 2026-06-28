# Portfolio

Vue 3 + TypeScript + Vite static site deployed to Cloudflare Pages.

## After every code change

Run these two commands before considering any task complete:

```
npm run typecheck   # vue-tsc type check (no emit)
npm run test        # vitest unit + component tests
```

Both must pass with zero errors.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type-check + Vite build |
| `npm run preview` | Serve built `dist/` locally |
| `npm run typecheck` | Type-check only, no emit |
| `npm run test` | Unit + component tests (vitest) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:e2e` | Playwright E2E tests (requires `npm run build` first) |

## Test layout

- `src/__tests__/` — vitest unit and component tests
- `e2e/` — Playwright E2E specs (run in CI after build)

## Deploy pipeline

Push to `master` → unit tests → build → E2E tests → Cloudflare Pages deploy.
E2E tests use `npm run preview` (serves the built `dist/`) so build must complete first.

## Architecture notes

- `src/data/*.ts` — all portfolio content; also consumed by `vite.config.ts` to generate static HTML injected at build time
- `index.html` has a dual-mode: normal Vue app, or `?plain` query param for a fully static/no-JS view (used by crawlers and reader mode)
- Theme (dark/light) is set via `localStorage` and synced to `html.dark` class
