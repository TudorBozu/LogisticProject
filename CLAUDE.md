# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `LogisticProject/` subdirectory (where `package.json` lives):

```bash
cd LogisticProject
npm run dev        # Start Vite dev server with HMR
npm run build      # Type-check (tsc -b) then production build
npm run lint       # ESLint (flat config, v9)
npm run preview    # Preview production build locally
```

No test framework is configured.

## Architecture

React 19 + TypeScript + Vite (SWC) + Tailwind CSS v3 landing page.

### Data-driven content pattern

All page content lives in `src/data/landing.ts` as typed exports (`nav`, `hero`, `why`, `values`, `features`, `faq`, `cta`, `footer`). Section components receive this data as props from `App.tsx`. To change page content, edit `landing.ts` — not the section components.

### Component organization

- **`src/sections/`** — Full-page sections (Hero, Why, Values, Features, FAQ, CTA), each rendered by `App.tsx` with data from `landing.ts`
- **`src/components/`** — Shared layout: Navbar, Footer, SectionHeading
- **`src/components/ui/`** — Primitives: Button (3 variants: primary/secondary/ghost, anchor-based), Card, Container

### Styling

Utility-first Tailwind only — no CSS modules or CSS-in-JS. `src/index.css` contains Tailwind directives. `src/App.css` is unused boilerplate.

### Entry flow

`index.html` → `src/main.tsx` (StrictMode) → `App.tsx` (orchestrates Navbar + sections + Footer)