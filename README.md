# Poketdex

Poketdex is a Pokémon browser built as a pnpm monorepo. It provides a searchable Pokémon grid, with routes for individual Pokémon, Pokémon forms, and moves.

## Tech stack

- **Frontend:** React 19 and TypeScript
- **App framework and routing:** TanStack Start and TanStack Router
- **Build and development:** Vite
- **UI:** shadcn/ui components in the shared `@workspace/ui` package, styled with Tailwind CSS 4. The component primitives use Base UI.
- **Data and interactions:** TanStack Query, TanStack Table, and TanStack Virtual
- **Workspace tooling:** pnpm workspaces and Turborepo

## Requirements

- Node.js 20 or newer
- pnpm 10.33.4 (the version specified in the root `package.json`)

If pnpm is not installed, enable Corepack and activate the repository's pinned package manager:

```bash
corepack enable
corepack prepare pnpm@10.33.4 --activate
```

## Getting started

Run these commands from the repository root:

```bash
pnpm install
pnpm dev
```

The web app is served at [http://localhost:3000](http://localhost:3000). To start only the web app instead of running the workspace's development tasks through Turborepo, use:

```bash
pnpm --filter web dev
```

## Common commands

Run from the repository root:

| Command | Description |
| --- | --- |
| `pnpm dev` | Start development tasks across the workspace |
| `pnpm build` | Build workspace packages and applications |
| `pnpm lint` | Lint workspace packages and applications |
| `pnpm typecheck` | Type-check workspace packages and applications |
| `pnpm format` | Format TypeScript files in workspace packages and applications |

## Project structure

```text
apps/
  web/       TanStack Start web application
packages/
  ui/        Shared shadcn/ui components, hooks, and styles
```

## Adding and using UI components

To add a shadcn/ui component, run the CLI from the repository root and use the web app's configuration:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

Components are shared from `packages/ui`. Import them in the web app through the workspace alias:

```tsx
import { Button } from "@workspace/ui/components/button";
```
