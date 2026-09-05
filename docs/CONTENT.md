# Content

Public words come from Issy's brief, the researched YouTube channel, or later answers entered in `/admin`. The first-version seed lives in `src/content/` and is mapped by `src/lib/content/seed.ts`.

Do not invent facts in either the seed or the admin fields.

## Allowed now

- Brand: Mrs Gill English
- English tutoring for Key Stage 3 and GCSE
- One-to-one and small-group tuition
- YouTube revision for Edexcel GCSE English Literature
- Texts evidenced on the channel: *A Christmas Carol*, *Macbeth*, *Coram Boy*, Belonging anthology poetry
- Exam methods named on the channel: PETAL, PEER, PETER
- Channel About themes: revision, exam strategy, grammar and writing, model answers, quizzes (quizzes live on YouTube, not on this site yet)

## Voice

Clear, encouraging, useful in an exam hall. Speak to pupils without talking down. Reassure parents without corporate adjectives. UK English.

Good: "How to answer part A", "Keep the quotation short and explain it."
Bad: "Unlock your child's limitless potential."

## How to update

1. Ask Issy using `docs/client/ISSY-WEBSITE-FOLLOW-UP.html`
2. Sign in to `/admin`
3. Enter only confirmed wording
4. Save. The public pages read the same document.

The TypeScript files remain the seed and the recovery source if the stored document is deleted.

## Optional fields

These stay hidden until they have real values and, where relevant, a feature toggle:

- public email, phone, booking URL
- lesson format, service area, availability
- service price, price note, duration, group size
- longer biography and published credentials
- approved testimonials
- resources teaser
- privacy controller name and email

## YouTube versus tutoring

Describe Edexcel specialisation as a fact about the **revision channel**. Do not say paid tutoring is Edexcel-only unless Issy confirms it.

## Backup and recovery

- Local: copy `.data/site-content.json`
- Production: download the private Blob object `mrs-gill/site-content.json`
- Recovery: restore that JSON, or delete it and the site returns to the seed
