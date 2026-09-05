# Deployment

The app is a standard Next.js project for Vercel. No Docker, no custom server, no `output: 'standalone'`.

The GitHub repo `mattduff36/mrsgillenglish` is linked to the Vercel project **mrsgillenglish** on the `mpdees-projects` team. Pushes to `main` deploy automatically. Do not attach Issy's GoDaddy domain until she confirms it.

Current public origin: `https://mrsgillenglish.vercel.app`

## Required Vercel environment variables

Set these on **Preview** and **Production**. After changing `NEXT_PUBLIC_*` values, redeploy so the build picks them up.

| Name | Required | Purpose |
| --- | --- | --- |
| `AUTH_SECRET` | Yes | Session signing. Generate with `openssl rand -base64 32` |
| `ADMIN_EMAIL_1` | Yes | First admin login |
| `ADMIN_PASSWORD_HASH_1` | Yes | bcrypt hash for that login, from `npm run hash-admin-password` |
| `ADMIN_EMAIL_2` … `_4` | Optional | Further admin logins. Leave empty until needed |
| `ADMIN_PASSWORD_HASH_2` … `_4` | Optional | Matching hashes only. Do not set a hash without its email |
| `BLOB_READ_WRITE_TOKEN` | Yes, to save in `/admin` | Durable content store |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin, for example `https://mrsgillenglish.vercel.app` |

A trailing slash on `NEXT_PUBLIC_SITE_URL` is fine; the app strips it.

Vercel Blob may also create `BLOB_STORE_ID` and `BLOB_WEBHOOK_PUBLIC_KEY`. Those are not read by this app and can stay.

Slot 1 still accepts the older names `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` if a host already uses them.

Never put raw passwords or these values in Git.

## Local environment

Copy `.env.example` to `.env.local`. Local `/admin` needs `AUTH_SECRET` and at least one complete admin pair. `BLOB_READ_WRITE_TOKEN` is optional on a laptop; saves then go to `.data/site-content.json`.

## Production domain

Wait for Issy to confirm the custom domain. Then add it in Vercel and point DNS according to her registrar. That is a separate, explicit task.

## Analytics

Do not enable Google Analytics, Meta Pixel, or Vercel Analytics unless a later privacy decision says so.

## Content after deploy

Admin saves update the Blob object and revalidate the public pages. A redeploy is not required for ordinary wording changes.
