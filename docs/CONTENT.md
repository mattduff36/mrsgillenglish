# Content

Public words come from Mrs Gill's brief, the researched YouTube channel, or later answers entered in `/admin`. The first-version seed lives in `src/content/` and is mapped by `src/lib/content/seed.ts`.

Do not invent facts in either the seed or the admin fields.

## Allowed now

- Brand: Mrs Gill English
- English tutoring for Key Stage 3 and GCSE Language and Literature
- One-to-one and small-group tuition, online or in person around Stoke-by-Clare
- Public enquiry email: `mrsgillenglishteacher@gmail.com`
- One-to-one price: £50 per hour. Small-group price discussed after enquiry
- Paid lessons support Edexcel and AQA
- YouTube revision for Edexcel GCSE English Literature
- Channel texts: *A Christmas Carol*, *Macbeth*, *Coram Boy*, Belonging anthology poetry
- Extra lesson texts: *An Inspector Calls*, *Lord of the Flies*, *Romeo and Juliet*, Power and Conflict poetry
- Exam methods named on the channel: PETAL, PEER and PETER
- Published qualifications: BA (Hons) English and Drama; PGCE in English and Drama with QTS; 15 years teaching English
- Biography and teaching-approach paragraphs supplied in her own words
- Professional portrait at `public/images/mrs-gill-portrait.jpg`
- Channel About themes: revision, exam strategy, grammar and writing, model answers, quizzes (quizzes live on YouTube, not on this site yet)

Address her as **Mrs Gill** on public pages. Do not use a first name in visitor-facing copy.

## Voice

Clear, encouraging, useful in an exam hall. Speak to pupils without talking down. Reassure parents without corporate adjectives. UK English.

Good: "How to answer part A", "Keep the quotation short and explain it."
Bad: "Unlock your child's limitless potential." Do not promise or guarantee grades.

## How to update

1. Ask using `docs/client/ISSY-WEBSITE-FOLLOW-UP.html` if a new fact is needed
2. Sign in to `/admin`
3. Enter only confirmed wording
4. Save. The public pages read the same document.

The TypeScript files remain the seed and the recovery source if the stored document is deleted.

A local `.data/site-content.json` or the production Blob object `mrs-gill/site-content.json` **overrides the seed**. After a seed change, replace that stored document (save the new values in `/admin`, or delete the stored file/object) or the live site will keep the old gaps.

## Optional fields

These stay hidden until they have real values and, where relevant, a feature toggle:

- phone, booking URL
- approved testimonials
- resources teaser
- DBS or safeguarding wording (not confirmed for private tuition yet)

## YouTube versus tutoring

The revision channel concentrates on Edexcel English Literature. Paid lessons support Edexcel and AQA. Do not describe tutoring as Edexcel-only.

## Backup and recovery

- Local: copy `.data/site-content.json`
- Production: download the private Blob object `mrs-gill/site-content.json`
- Recovery: restore that JSON, or delete it and the site returns to the seed
