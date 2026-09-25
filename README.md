# Gio Motion Portfolio

A multilingual motion design and video editing portfolio for Gio, built as a pnpm TypeScript monorepo.

The public portfolio is available in English, Portuguese, and Japanese. On a visitor's first visit, the site detects the browser's preferred language: Portuguese locales use Portuguese, Japanese locales use Japanese, and all other locales use English. A language selected in the site header is saved for future visits.

## Requirements

- Node.js 24 or a compatible current Node.js release
- pnpm 10
- PostgreSQL, only when working with the database or API server

Install dependencies from the repository root:

```bash
pnpm install
```

The workspace enforces a one-day minimum package release age through `pnpm-workspace.yaml` as a supply-chain protection.

## Run The Portfolio

Start the Vite development server:

```bash
pnpm --filter @workspace/gio-portfolio dev
```

The site runs on `http://localhost:5173` by default. Set `PORT` to use another port:

```bash
PORT=5174 pnpm --filter @workspace/gio-portfolio dev
```

Create and preview a production build:

```bash
pnpm --filter @workspace/gio-portfolio build
pnpm --filter @workspace/gio-portfolio serve
```

On Windows PowerShell, set environment variables with `$env:PORT = "5174"` before running the command.

## Run The API

The API server requires both `PORT` and `DATABASE_URL`:

```bash
$env:PORT = "5000"
$env:DATABASE_URL = "postgresql://user:password@localhost:5432/gio_portfolio"
pnpm --filter @workspace/api-server run dev
```

The API is served under `/api`. The current API contract includes:

- `GET /api/healthz` - health check
- Contact form routes in `artifacts/api-server/src/routes/contact.ts`

For production-style execution:

```bash
pnpm --filter @workspace/api-server build
$env:PORT = "5000"
pnpm --filter @workspace/api-server start
```

## Workspace Layout

```text
artifacts/
  gio-portfolio/       Vite + React client application
  api-server/          Express API server
  mockup-sandbox/      Isolated UI mockup/sandbox app
lib/
  api-spec/            OpenAPI source contract and Orval config
  api-client-react/    Generated React Query API client package
  api-zod/             Generated Zod schemas and API types
  db/                  Drizzle ORM database connection and schema
scripts/               Small repository utility scripts
attached_assets/       Shared design and media assets
```

## Important Source Locations

- `artifacts/gio-portfolio/src/App.tsx` - portfolio routes, layout, navigation, and page composition
- `artifacts/gio-portfolio/src/lib/i18n.ts` - translations, locale detection, and language persistence
- `artifacts/gio-portfolio/src/data/projects.ts` - portfolio project data
- `artifacts/gio-portfolio/src/index.css` - portfolio styling and visual system
- `artifacts/api-server/src/app.ts` - Express middleware and `/api` router mounting
- `artifacts/api-server/src/routes/` - API route implementations
- `lib/api-spec/openapi.yaml` - source of truth for the API contract
- `lib/db/src/schema/` - database schema definitions
- `attached_assets/` - assets shared across workspace applications

## Common Commands

Run the complete typecheck:

```bash
pnpm run typecheck
```

Typecheck and build all packages:

```bash
pnpm run build
```

Regenerate API client and Zod code after changing the OpenAPI contract:

```bash
pnpm --filter @workspace/api-spec run codegen
```

Push Drizzle schema changes to a development database:

```bash
$env:DATABASE_URL = "postgresql://user:password@localhost:5432/gio_portfolio"
pnpm --filter @workspace/db run push
```

Run the example utility script:

```bash
pnpm --filter @workspace/scripts run hello
```

## Architecture Notes

- The repository uses pnpm workspaces so the client, API, database, generated schemas, and generated API client can be developed together.
- The portfolio is a client-side React application built with Vite, React 19, Wouter, Framer Motion, Tailwind CSS, and local UI components.
- The API uses Express 5 and exposes routes below `/api`.
- Drizzle ORM uses PostgreSQL through the `pg` driver. Importing the database package requires `DATABASE_URL` to be defined.
- OpenAPI is the source contract; Orval generates the React Query client and Zod package from it.
- The portfolio stores the chosen language in browser local storage under `gio-portfolio-language`.

## Deployment Notes

Build artifacts are generated inside each package. The portfolio's production files are emitted to `artifacts/gio-portfolio/dist/public`. The API bundles to `artifacts/api-server/dist` and listens on the `PORT` environment variable.

For a deployment that only serves the portfolio, only the Vite client is required. The API and PostgreSQL database are needed for server-backed features such as contact form delivery.

## Development Guidelines

- Make changes in the relevant workspace package rather than editing generated output.
- Update `lib/api-spec/openapi.yaml` first when changing an API contract, then run code generation.
- Run `pnpm run typecheck` and the relevant package build before pushing changes.
- Do not commit secrets such as `DATABASE_URL`, API keys, or email provider credentials.
