# Product

Mrs Gill English is the public website for English tutoring and a home for the existing YouTube revision work.

## Audiences

- Parents and guardians deciding whether tuition is a good fit
- Pupils looking for clear GCSE English help and revision videos

## V1 jobs

1. Name the brand as Mrs Gill English.
2. State that Mrs Gill offers English tutoring for Key Stage 3 and GCSE.
3. State that tuition is one-to-one or small groups, online or in person around Stoke-by-Clare.
4. Send pupils to real revision videos from the YouTube channel.
5. Feel trustworthy without selling hard or inventing credentials.
6. Let parents enquire by email.

## Information architecture

| Route | Why it exists |
| --- | --- |
| `/` | Short introduction, tutoring formats and location, then featured revision videos. Optional offer cards only if added in `/admin` |
| `/about` | Biography, qualifications, teaching approach, professional portrait |
| `/revision` | Curated Edexcel literature and exam-technique videos, grouped by real playlists |
| `/privacy` | Education-aware privacy notice. No tracking in V1 |

Not created: `/tutoring`, `/contact`, `/pricing`, `/booking`. Those would split the enquiry path. Their content lives on the home page.

## Primary actions

- **Enquire about tutoring** is the primary action. It opens the public Gmail address.
- **Browse revision videos** remains the secondary action. The destination is verified.
- Booking is a future action, not a public control.

## Site editor

`/admin` is a private editor for Matt (and later Mrs Gill). It is not part of the public information architecture.

Each public page is a stack of sections from a fixed palette (hero, text, tutoring, videos, and so on). Shared catalogues hold videos, tutoring offers, testimonials, qualifications, channel texts, and playlists. Images are a `/images` or `/brand` path, or an https URL. There is no upload product and no Cloudinary.

## Out of scope for V1

Payments, pupil accounts, a booking calendar, downloadable resource hosting, analytics, and the unconfirmed custom domain.
