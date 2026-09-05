# CRITICAL plan: Issy follow-up document + `/admin` CMS

- Workstream: `ws_a7c4e91f2b8d3056`
- Lane: CRITICAL (auth + durable persistence)
- Parent: current conversation
- Do not launch a third premium review for the same CRITICAL continuation. Routing or split does not reset this budget.

## Classification

Adding a protected `/admin` that mutates public site content. Persistence and authentication are in scope. No payments, no pupil accounts, no public forms that collect child data.

## Architecture (proposed)

### Canonical content

One Zod-validated `SiteContent` JSON document. Seed from the current TypeScript files so V1 copy is not lost. Public pages and `/admin` both call `getSiteContent()`. Immediate save/publish (no draft workflow). No raw HTML fields.

### Persistence

**Chosen:** Vercel Blob, one private object `site-content.json`, overwrite with `allowOverwrite` and read with `useCache: false` after writes. Local development writes `.data/site-content.json` (gitignored). Production without a blob token stays on the seed and admin save fails closed with a clear error.

**Rejected:** Vercel filesystem (ephemeral). Browser `localStorage` (not a CMS). Neon/Postgres or Prisma (schema and vendor cost for one document). GitHub-commit publish (forces a deploy). Full CMS (Sanity/Payload) (too much for one tutor).

### Auth

**Chosen:** Auth.js v5 Credentials, JWT session, httpOnly cookie. Single admin via `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH` (bcrypt). `AUTH_SECRET` required. No user table. Login rate-limited in-process. Mutations only through Server Actions that call `auth()` again. `/admin` is noindex and omitted from the sitemap and public nav.

**Rejected:** Public unauthenticated editor. Plaintext env password compare. Client-only hiding of `/admin`. Clerk/Auth0 (vendor for one user).

### Cache

After a successful save: `revalidateTag('site-content')` and `revalidatePath('/', 'layout')`. Public reads use tagged cache; production blob reads after save bypass Blob CDN cache.

### Media

No upload product. Images stay developer-managed under `public/brand` and `public/videos`.

### Boundaries

- Do not change the public visual identity except to read managed content.
- Do not invent Issy facts in seed data.
- Do not add analytics, booking, or payments.
- Do not force-push or change DNS.

## Required test IDs

- `T-public-seed-renders`
- `T-optional-hidden`
- `T-admin-unauth-blocked`
- `T-admin-auth-allows`
- `T-admin-validate-reject`
- `T-admin-save-persists`
- `T-admin-toggle-hides`
- `T-xss-escaped`
- `T-logout`
- `T-lint-typecheck-build`

## Rollback

Revert the admin commit. Public site falls back to seed TypeScript content. Blob object can be deleted.

## Unresolved risks

- Auth.js v5 still ships as `next-auth@5.0.0-beta.32`. Pin the version.
- In-process login rate limits reset per Vercel isolate.
- Matt must create a Blob store and set env vars on Vercel. Architecture review may replace Blob with another single-document store if it is simpler and still durable.
