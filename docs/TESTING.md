# Testing

V1 is a static marketing site. Tests protect content rules, not a giant application framework.

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

- Required site fields exist
- Enquiry and pricing stay unpublished when empty
- Every curated video has an id, title, topic, and local thumbnail path
- Topics match the real channel groupings
- Routes expected by the product doc stay listed in content

## Browser QA

Before calling UI work done, check `/`, `/revision`, `/privacy`, and the 404 page at about 375, 768, 1024, and 1440px. Keyboard the header. Confirm YouTube links open the right videos. Confirm no console errors.
