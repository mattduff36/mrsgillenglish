<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Mrs Gill English

Public brand: **Mrs Gill English**. YouTube channel title: **Mrs Gill the English Teacher**. Do not rename the website to the longer channel name.

## Operating contract

- Evidence beats assumptions. Never invent client, business, or biographical facts.
- Public copy must be traceable to Issy's brief, approved client input, or this exact public channel: `https://www.youtube.com/@MrsGillEnglish`.
- Do not use search results for other people called Gill.
- Preserve the design system in `docs/DESIGN.md` and `.cursor/skills/mrs-gill-design/SKILL.md`.
- Accessibility (WCAG AA) and responsive behaviour are release requirements.
- Production builds must pass before release. Run `npm run health` and `npm run build`.
- Secrets must never enter Git. Admin credentials live in environment variables only.
- Keep the architecture simple. The site now has a small Auth.js admin and a single Blob/JSON content document. Do not add payments, booking, analytics, or a larger CMS unless a current feature requires it.
- Future booking, pricing, resources, and contact destinations must be content-flagged, not half-built fakes.
- Live code is implementation evidence. Canonical product and design docs define intended behaviour when they are explicitly updated.
- UK English. No guaranteed grades, fake testimonials, or fabricated contact details.

## Canonical docs

Read `docs/PRODUCT.md`, `docs/CONTENT.md`, `docs/CONTENT_GAPS.md`, `docs/DESIGN.md`, and `docs/ARCHITECTURE.md` before changing public behaviour.
