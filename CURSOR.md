# CURSOR.md

## Project Overview

This is a personal portfolio site for Karan Narula, built with React, TypeScript, Vite, and Tailwind CSS. It showcases projects, a profile, and uses a modern component-based architecture. The project is configured for deployment via GitHub Pages.

---

## Directory Structure

```
.
├── src/                  # Main source code
│   ├── App.tsx           # Main app component (profile, projects grid)
│   ├── main.tsx          # React entry point
│   ├── index.css         # Tailwind and global styles
│   ├── vite-env.d.ts     # Vite/TypeScript env types
│   ├── components/       # UI and typography components
│   │   ├── ui/           # Reusable UI components (Card, Avatar, Button, Tooltip)
│   │   └── typography/   # Typography components (H1, H2, P, etc.)
│   └── lib/              # Utility functions (e.g., cn for classnames)
├── public/               # Static assets (served as root)
│   ├── assets/           # Images and SVGs for profile and projects
│   │   ├── profile.jpg
│   │   └── project-img/  # Project images (gif, png, jpg)
│   └── react.svg         # Example SVG
├── dist/                 # Build output (after `vite build`)
│   ├── assets/           # Bundled assets and images
│   │   └── project-img/  # Project images (copied from public/assets)
│   └── index.html        # Built HTML
├── img/                  # Additional SVG icons (not directly referenced in code)
│   └── svg-icons/        # Many social/media SVGs
├── package.json          # Project metadata, scripts, dependencies
├── tailwind.config.js    # Tailwind CSS configuration (custom colors, radii)
├── postcss.config.js     # PostCSS config (for Tailwind)
├── vite.config.ts        # Vite config (React plugin, alias @ to ./src)
├── tsconfig.json         # TypeScript config (base, with path aliases)
├── tsconfig.app.json     # App-specific TypeScript config
├── tsconfig.node.json    # Node-specific TypeScript config
├── components.json       # shadcn/ui component config and aliases
├── index.html            # HTML entry point for Vite
├── .gitignore            # Git ignore rules
├── LICENSE               # License file
├── CNAME                 # Custom domain for GitHub Pages
├── README.md             # Project intro (minimal)
└── CURSOR.md             # (This file) Project structure/context for Cursor editor
```

---

## Key Conventions & Configurations

- **Path Aliases**: `@/` maps to `./src/` (see `vite.config.ts`, `tsconfig.json`).
- **Component Structure**: UI components are in `src/components/ui/`, typography in `src/components/typography/`.
- **Assets**: Images for profile and projects are in `public/assets/` and referenced by relative path in code.
- **Tailwind CSS**: Custom colors, radii, and chart colors are defined in `tailwind.config.js` and used via CSS variables in `src/index.css`.
- **Deployment**: Uses `gh-pages` for deployment to GitHub Pages, with a custom domain set in `CNAME`.
- **shadcn/ui**: Components are managed/configured via `components.json`.
- **Dark Mode Support**: The site supports dark mode, following the user's system preference by default. A toggle button in the top right allows manual switching, and the choice is remembered.

---

## Notable Files

- `src/App.tsx`: Main React component, renders profile and project cards.
- `src/components/ui/card.tsx`: Card component (with header, footer, etc.).
- `src/components/ui/avatar.tsx`: Avatar component (profile image).
- `src/components/typography/typography.tsx`: Typography components (H1, H2, P, etc.).
- `src/lib/utils.ts`: Utility for merging class names (`cn`).
- `tailwind.config.js` & `src/index.css`: Tailwind theme and global styles.
- `vite.config.ts`: Vite config, including alias setup.
- `components.json`: shadcn/ui config and aliases.
- Dark mode toggle: A button in the top right corner lets users switch between dark and light mode. The theme is persisted and respects system settings by default.

---

## How to Use

- Run `npm install` to install dependencies.
- Use `npm run dev` to start the development server.
- Use `npm run build` to build for production (output in `dist/`).
- Use `npm run deploy` to deploy to GitHub Pages.

---

## For Cursor Editor

This file provides a high-level map of the project for navigation, search, and context-aware editing. Update this file if you add major new directories, components, or change conventions.
