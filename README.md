# Sally Hill Artist Site

Modern Vite + React site deployed to GitHub Pages.

## Prerequisites
- Node.js 24.x (current LTS)
- npm

## Quick Start

Install dependencies:

```zsh
npm ci
```

Run the dev server:

```zsh
npm run dev
```

Open the app (Vite default):

```zsh
open http://localhost:5173
```

Build for production:

```zsh
npm run build
```

Preview the production build locally:

```zsh
npm run preview
```

## Deployment (GitHub Pages)
- CI workflow: `.github/workflows/deploy.yml` builds with Node 24.x and deploys `dist/` to Pages on push to `master`.
- Enable Pages: In repo Settings → Pages → Source: GitHub Actions.

## Configuration
- Tumblr API settings are in `src/lib/config.js`:
  - `TUMBLR_API_KEY`, `TUMBLR_BLOG_HOSTNAME`, `TUMBLR_WRITING_HOSTNAME`, `TUMBLR_LIMIT`.
  - Update values as needed.

## Notes
- Source entry is `index.html` with the React app mounted to `#app` via `src/main.jsx`.
- Build output is `dist/` (configured in `vite.config.js`).
