# Deployment

The app is a standard Next.js project for Vercel. No Docker, no custom server, no `output: 'standalone'`.

## Preview

If the Vercel CLI is authenticated, a preview deploy is allowed. Do not attach the unknown GoDaddy domain and do not change DNS.

```bash
npx vercel link
npx vercel deploy
```

Set `NEXT_PUBLIC_SITE_URL` to the preview or production origin when it is known.

## Production domain

Wait for Issy to confirm the custom domain. Then add it in Vercel and point DNS according to her registrar. That is a separate, explicit task.

## Analytics

Do not enable Google Analytics, Meta Pixel, or Vercel Analytics unless a later privacy decision says so.
