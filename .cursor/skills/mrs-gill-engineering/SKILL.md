---
name: mrs-gill-engineering
description: Engineering conventions for the Mrs Gill English Next.js marketing site. Use when adding routes, content, tests, or integrations.
---

# Mrs Gill English engineering

## Stack

Next.js App Router, React, TypeScript, Tailwind v4, npm, Vercel. Server Components by default. Client components only for navigation and revision filters.

## Content layer

All public facts live in `src/content/`. Optional features use `null` or `enabled: false` and the UI must hide them. Never render `TBC` or fake prices.

When Issy supplies a price, email, or bio paragraph, add it in content files only.

## YouTube

Curated video data is typed in `src/content/videos.ts`. No API key for V1. Thumbnails are stored locally. Cards link out to YouTube. Do not auto-embed players.

## Future hooks

- Enquiry: `site.enquiryEmail`
- Pricing: `services[].price`
- Booking: do not add Calendly or similar unless Issy asks
- Resources: a future `/resources` route is enough; do not build a platform

## Checks

`npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`.
