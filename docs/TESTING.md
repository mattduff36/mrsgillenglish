# Testing

## Commands

```bash
npm run lint
npm run typecheck
npm run test
npm run health
npm run build
```

`npm test` uses Node's test runner against `tests/*.test.ts`.

## What is covered

- Seed brand, routes, published enquiry email and one-to-one price
- Every curated seed video has an id, title, topic, and local thumbnail
- Featured homepage videos are the two Macbeth Paper 1 films
- Older stored documents still parse when the new About lists are missing
- Optional sections hide when empty or disabled
- Admin env fail-closed, session guard, validation, persistence, XSS rejection
- `/admin` is not in the public sitemap

## Browser QA

Check `/`, `/about`, `/revision`, `/privacy`, the 404 page, `/admin/login`, and `/admin` at about 375 and 1440px. Keyboard the public header and the admin forms. Confirm the Enquire button opens the public email. Confirm YouTube links open the right videos. Confirm unsigned `/admin` redirects to login. Confirm sign-out returns to login.
