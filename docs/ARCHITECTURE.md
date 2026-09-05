# Architecture

## Baseline

| Piece | Choice | Why |
| --- | --- | --- |
| Next.js | **16.3.4** | Current npm latest on 5 September 2026 |
| React | 19.2.x | Official template |
| Node | 20.9+ | Required by Next.js |
| Router | App Router | Current default |
| Styling | Tailwind CSS v4 | Official create-next-app default |
| Package manager | npm | Brief default. Lockfile committed |
| Hosting | Vercel | Marketing site plus a small admin |
| Auth | Auth.js v5 Credentials | One admin, JWT cookie |
| Content store | Vercel Blob, one private JSON object | Durable, cheap, no database |
| Validation | Zod | Shared by public reads and admin writes |

## Shape

```
src/content/           seed facts for the first version
src/lib/content/       schema, seed mapping, accessors, store
src/app/(marketing)/   public routes
src/app/admin/         login + editor
public/brand/          supplied artwork
public/videos/         local YouTube thumbnails
```

The public site and `/admin` both read `getSiteContent()`. That function returns the stored JSON when present, otherwise the seed.

## Persistence

Documented in `docs/adr/004-admin-content-management.md`.

- Local: `.data/site-content.json`
- Production: Vercel Blob `mrs-gill/site-content.json`
- Production without a blob token: seed only, admin save fails closed

After a save: `revalidateTag('site-content')` and `revalidatePath` for `/`, `/revision`, and `/privacy`. A full Vercel redeploy is not required for ordinary text changes.

## Auth

`/admin` is not linked from the public navigation. Middleware redirects unsigned visitors to `/admin/login` and sends `X-Robots-Tag: noindex, nofollow`. `robots.ts` also disallows `/admin` and `/api/auth`.

Server Actions call `requireAdmin()` again before writing. Login attempts are rate-limited in process (8 failures / 15 minutes per isolate).

## Content flags

Optional public features hide themselves when empty or switched off:

- enquiry email
- phone
- lesson format, area, availability
- service prices
- testimonials
- About
- videos
- resources teaser

## YouTube and privacy

The site does not use the YouTube Data API. Admin can paste a watch URL or video id. Seed thumbnails live in `public/videos/`. Newly added videos may use `i.ytimg.com` until a local file is added.

## SEO

`metadataBase` uses `NEXT_PUBLIC_SITE_URL` when set. Structured data is only `WebSite` plus `sameAs` YouTube. `/admin` is noindex.

## Media

No upload product. Replacing the portrait or banner remains a developer change.
