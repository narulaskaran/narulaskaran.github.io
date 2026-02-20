# CLAUDE.md

## Build & Dev Commands

- `npm run dev` — start Vite dev server
- `npm run build` — TypeScript check + Vite build
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## Tech Stack

- React 18, TypeScript, Vite, Tailwind CSS 3
- shadcn/ui components (Radix UI primitives)
- Utility: `cn()` from `src/lib/utils.ts`

## Project Structure

- `src/App.tsx` — single-page app with all profile data and projects defined inline
- `src/components/ui/` — shadcn/ui components (avatar, button, card, tooltip)
- `src/index.css` — Tailwind directives + HSL CSS variables for theming
- `public/` — static assets (images, profile photo)

## Conventions

- Import alias: `@/` maps to `src/`
- Strict TypeScript (`tsconfig.app.json`)
- Dark mode: class-based, respects system preference, persisted in localStorage
- Tailwind + CSS variables for theming (HSL values in `:root` and `.dark`)

## Deployment

- GitHub Pages at narula.xyz
- Auto-deploys on push to `master` via `.github/workflows/deploy.yml`
- Build output: `dist/`
- Main branch: `master`
