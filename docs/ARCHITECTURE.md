# Architecture

## Baseline

| Piece | Choice | Why |
| --- | --- | --- |
| Next.js | **16.3.4** | Current npm latest on 5 September 2026. Active LTS line. Includes the August 2026 security patches published as 16.3.3 plus the 16.3.4 follow-up. |
| React | 19.2.x as selected by create-next-app 16.3.4 | Official template |
| Node | 20.9+ required by Next.js; local dev used Node 22 LTS | Compatible |
| Router | App Router | Current default |
| Styling | Tailwind CSS v4 | Official create-next-app default |
| Package manager | npm | Brief default. Lockfile committed |
| Hosting | Vercel | Static/SSR marketing site, no custom server |

Sources: https://nextjs.org/blog/august-2026-security-release and `npm view next version`.

## Shape

A small statically generated marketing site.

```
src/content/     typed public facts
src/components/  header, footer, video card, filters
src/app/         routes, metadata, sitemap, robots
public/brand/    supplied artwork
public/videos/   local YouTube thumbnails
```

No database, auth, CMS, queue, or payment stack.

## Content flags

Optional public features read from content objects:

- `site.enquiryEmail`
- `service.price`
- `site.bookingUrl`

UI hides the feature when the value is empty. That is how pricing and enquiry stay honest.

## YouTube and privacy

V1 does not use the YouTube Data API. Videos are a curated TypeScript list. Thumbnails are copied into `public/videos/` so the page does not request `i.ytimg.com` on load. Cards open YouTube on click. No iframe until a later explicit decision.

## SEO

`metadataBase` uses `NEXT_PUBLIC_SITE_URL` when set, otherwise localhost for local builds. Structured data is only `WebSite` plus `sameAs` YouTube. No fake address, rating, or review count.

## Future seams

A booking URL, a `/resources` route, and a contact provider can be added without changing the content model much. Do not install them now.
