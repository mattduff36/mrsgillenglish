# Mrs Gill English

Website for **Mrs Gill English**: Key Stage 3 and GCSE English tutoring, with a home for Issy's YouTube revision videos.

The public YouTube channel is [Mrs Gill the English Teacher](https://www.youtube.com/@MrsGillEnglish). The website brand is **Mrs Gill English**.

## Stack

Next.js 16.3.4 (App Router), React, TypeScript, Tailwind CSS v4, npm, Vercel.

## Local setup

```bash
npm install
npm run dev
```

Optional: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` when you have a real origin.

## Scripts

- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run health`
- `npm run build`

## Project structure

```
src/app/          routes, metadata, sitemap
src/components/   header, footer, video UI
src/content/      all public facts
public/brand/     YouTube banner and profile
public/videos/    local video thumbnails
docs/             product, research, design, gaps
```

## Editing content

Change files in `src/content/`. Leave pricing, enquiry, and booking empty until Issy supplies real values. The pages hide those sections automatically.

## Brand assets

`public/brand/youtube-banner.jpg` and `public/brand/youtube-profile.jpg` are the supplied channel images. Do not replace them casually.

## Environment variables

V1 has none required. See `.env.example` for the optional site URL.

## Deployment

See `docs/DEPLOYMENT.md`. Preview deploys are fine. Do not point the unknown custom domain without a separate instruction.

## Canonical documentation

Start with `AGENTS.md`, then `docs/PRODUCT.md`, `docs/CONTENT.md`, `docs/CONTENT_GAPS.md`, `docs/DESIGN.md`, and `docs/ARCHITECTURE.md`.

## Known gaps

No public email, phone, prices, or domain name yet. The short list is in `docs/CONTENT_GAPS.md`.
