# ADR 004: Admin content management

Status: Accepted  
Date: 5 September 2026

## Decision

The public site and `/admin` share one Zod-validated `SiteContent` JSON document.

- **Persistence:** Vercel Blob, one private object `mrs-gill/site-content.json`. Local development writes `.data/site-content.json` (gitignored). Production without a blob token serves the TypeScript seed and refuses saves.
- **Auth:** Auth.js v5 Credentials, JWT cookie, 12-hour session. Up to four admins, from `ADMIN_EMAIL_1`…`_4` and matching password hashes. Middleware uses a config file that does not import password hashing.
- **Publishing:** Immediate save. No draft workflow.
- **Pages:** Version 2 documents store `pages.home|about|revision|privacy` as a discriminated section palette. Version 1 documents hydrate into that layout on read. A `rollback` mirror can down-convert to version 1.
- **Media:** No uploads and no Cloudinary. Brand images and seed thumbnails stay in `public/`. Admin may paste a local `/images` or `/brand` path or an https URL. New videos may use a YouTube thumbnail.
- **Cache:** Public reads use the `site-content` tag. A successful save revalidates that tag and the public routes.

## Why this, not the alternatives

| Option | Why not |
| --- | --- |
| Edit JSON on the Vercel filesystem | Ephemeral. Changes disappear. |
| `localStorage` only | Not a CMS. Lost on another device. |
| Neon / Prisma / a full database | Too much schema and cost for one document. |
| Sanity / Payload / a hosted CMS | Extra vendor and editorial model for one tutor. |
| Git-backed publish | Every text change would need a deploy. |
| Clerk / Auth0 | Vendor overhead for one user. |
| Plaintext password in env | Weaker than a maintained hash compare. |

Immediate publish is enough for one administrator. Draft/publish would add state without a second reviewer.

## Consequences

Matt sets `AUTH_SECRET`, at least one admin email/hash pair, and production `BLOB_READ_WRITE_TOKEN` on Vercel. Local saves do not need Blob. Content is backed up by downloading the JSON from Blob or copying `.data/site-content.json`. Up to four administrators are supported through numbered env pairs.
