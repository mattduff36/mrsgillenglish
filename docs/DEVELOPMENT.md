# Development

## Requirements

- Node.js 20.9 or newer (22 LTS is fine)
- npm

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Content and config checks |
| `npm run health` | lint, typecheck, test |
| `npm run build` | Production build |
| `npm start` | Serve the production build |

## Edit content

Change `src/content/site.ts`, `src/content/services.ts`, and `src/content/videos.ts`. Add a YouTube thumbnail under `public/videos/{id}.jpg` when adding a video.

## Brand assets

Supplied channel artwork lives in `public/brand/`. Do not delete it.
