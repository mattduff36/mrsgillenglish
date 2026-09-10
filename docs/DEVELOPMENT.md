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

For `/admin`, add to `.env.local`:

```
AUTH_SECRET=
ADMIN_EMAIL_1=
ADMIN_PASSWORD_HASH_1=
ADMIN_EMAIL_2=
ADMIN_PASSWORD_HASH_2=
# Slots 3 and 4 are optional and can stay empty.
```

```bash
npm run hash-admin-password -- "your-password"
```

Local content saves go to `.data/site-content.json`.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Content and admin checks |
| `npm run health` | lint, typecheck, test |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run hash-admin-password` | Create an `ADMIN_PASSWORD_HASH_n` value |

## Edit content

Prefer `/admin`. Change `src/content/` only when updating the seed that new environments start from. A stored `.data/site-content.json` or production Blob document overrides the seed until it is replaced or deleted. Add a YouTube thumbnail under `public/videos/{id}.jpg` when you want a local image for a new video.

## Brand assets

Supplied channel artwork lives in `public/brand/`. Do not delete it.

## Client follow-up

`docs/client/ISSY-WEBSITE-FOLLOW-UP.html` is standalone. Open it in a browser. It does not need the Next.js app.
