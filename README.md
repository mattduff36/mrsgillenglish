# Mrs Gill English

Website for **Mrs Gill English**: Key Stage 3 and GCSE English tutoring, with a home for Issy's YouTube revision videos.

The public YouTube channel is [Mrs Gill the English Teacher](https://www.youtube.com/@MrsGillEnglish). The website brand is **Mrs Gill English**.

## Stack

Next.js 16.3.4 (App Router), React, TypeScript, Tailwind CSS v4, npm, Vercel.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

To use `/admin` locally, set `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD_HASH` in `.env.local`. Create the hash with:

```bash
npm run hash-admin-password -- "your-password"
```

Local admin saves write to `.data/site-content.json` (gitignored). The public site falls back to the TypeScript seed until that file exists.

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run health`
- `npm run build`
- `npm run hash-admin-password`

## Project structure

```
src/app/(marketing)  public pages
src/app/admin        protected site editor
src/lib/content      schema, seed, store
src/content          seed facts for the first version
public/brand         YouTube banner and profile
public/videos        local video thumbnails
docs/client          Issy follow-up document
docs/adr             architecture decisions
```

## Editing content

Normal updates go through `/admin`, not through React components.

1. Issy answers `docs/client/ISSY-WEBSITE-FOLLOW-UP.html`
2. Matt signs in at `/admin`
3. Matt enters only confirmed facts
4. The public site refreshes after save

Leave pricing, enquiry, and testimonials empty until Issy supplies real values. The pages hide those sections automatically.

## Brand assets

`public/brand/youtube-banner.jpg` and `public/brand/youtube-profile.jpg` are the supplied channel images. Image replacement stays a developer task. There is no upload product yet.

## Environment variables

See `.env.example`. Production on Vercel also needs `BLOB_READ_WRITE_TOKEN` so admin saves persist.

## Deployment

See `docs/DEPLOYMENT.md`. Preview deploys are fine. Do not point the unknown custom domain without a separate instruction.

## Canonical documentation

Start with `AGENTS.md`, then `docs/PRODUCT.md`, `docs/CONTENT.md`, `docs/CONTENT_GAPS.md`, `docs/DESIGN.md`, `docs/ARCHITECTURE.md`, and `docs/adr/004-admin-content-management.md`.
