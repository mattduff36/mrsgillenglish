# Product

Mrs Gill English is Issy's public website for English tutoring and a home for her existing YouTube revision work.

## Audiences

- Parents and guardians deciding whether tuition is a good fit
- Pupils looking for clear GCSE English help and revision videos

## V1 jobs

1. Name the brand as Mrs Gill English.
2. State that Issy offers English tutoring for Key Stage 3 and GCSE.
3. State that tuition is intended as one-to-one and small groups.
4. Send pupils to real revision videos from the YouTube channel.
5. Feel trustworthy without selling hard or inventing credentials.
6. Leave an obvious place for an enquiry route once a contact method exists.

## Information architecture

Research found enough verified revision material for a dedicated page, but not enough verified biography, pricing, or contact detail for extra thin pages.

| Route | Why it exists |
| --- | --- |
| `/` | Offer, tutoring formats, literature focus, featured videos, short introduction |
| `/revision` | Curated Edexcel literature and exam-technique videos, grouped by real playlists |
| `/privacy` | Education-aware privacy notice. No tracking in V1 |

Not created in V1: `/about`, `/tutoring`, `/contact`, `/pricing`, `/booking`. Those would be thin or would require invented facts. Their content lives on the home page or in the content layer until there is enough to justify a route.

## Primary actions

- **Browse revision videos** is the current primary action. The destination is verified.
- **Enquire about tutoring** appears only when a public email is set in `/admin`.
- Booking is a future action, not a public control.

## Site editor

`/admin` is a private editor for Matt (and later Issy). It is not part of the public information architecture.

## Out of scope for V1

Payments, pupil accounts, a booking calendar, downloadable resource hosting, analytics, and the unknown custom domain.
