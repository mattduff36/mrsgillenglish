# Deployment

The app is a standard Next.js project for Vercel. No Docker, no custom server, no `output: 'standalone'`.

## Preview

If the Vercel CLI is authenticated, a preview deploy is allowed. Do not attach the unknown GoDaddy domain and do not change DNS.

```bash
npx vercel link
npx vercel deploy
```

## Required Vercel environment variables

Set these on the project before expecting `/admin` to work in production:

| Name | Purpose |
| --- | --- |
| `AUTH_SECRET` | Session signing |
| `ADMIN_EMAIL` | The only admin login |
| `ADMIN_PASSWORD_HASH` | bcrypt hash, not the raw password |
| `BLOB_READ_WRITE_TOKEN` | Durable admin saves |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, once known |

Create a Vercel Blob store on the same project and paste the token. Without it, the public site still renders the seed, but saving in `/admin` is refused.

## Production domain

Wait for Issy to confirm the custom domain. Then add it in Vercel and point DNS according to her registrar. That is a separate, explicit task.

## Analytics

Do not enable Google Analytics, Meta Pixel, or Vercel Analytics unless a later privacy decision says so.

## Content after deploy

Admin saves update the Blob object and revalidate the public pages. A redeploy is not required for ordinary wording changes.
