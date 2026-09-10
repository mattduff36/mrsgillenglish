# Design

Source of truth for the visual system. Colours were sampled from the supplied YouTube artwork on 5 September 2026 with a local Pillow quantisation and region average, then adjusted only where contrast failed WCAG AA.

## Brand images

| File | Size | Role |
| --- | --- | --- |
| `public/brand/youtube-banner.jpg` | 1060x175 | Palette, literary still-life, wordmark evidence |
| `public/brand/youtube-profile.jpg` | 160x160 | Illustrated portrait mark, header, hero |
| `public/images/mrs-gill-portrait.jpg` | 1400x2099 | Professional photograph on About and the home About teaser |

The YouTube files are small. Do not upscale them into full-bleed heroes. Use the illustrated portrait near native scale. Show the banner as a complete centred frieze at its intrinsic width (max 1060px), not a cropped 64px strip.

The professional photograph is a different register: warmer, contemporary, for tutoring trust. Use it in a rounded parchment panel. Do not crop it into a circle; the garden pose loses the blossom and shoulders.

## What the images show

Banner: illustrated woman in three-quarter view, dark curly updo, navy jacket, white ruffled blouse and bow, books with gold lettering, quills, candles, parchment, taupe outer field, serif "Mrs Gill" over "The English Teacher".

Profile: same illustrated portrait, flat taupe ground, navy jacket, white pie-crust collar and bow, tan piping, silver earring. Clean cel-shaded illustration, academic rather than childish.

Tone: classical, literary, professional, warm, secondary-school serious. Not corporate consultancy. Not primary-school cute.

## Sampled colours

Dominant banner/profile field: `#C2B4A7` (about 54-61% of pixels).

| Token | Hex | Origin | Use |
| --- | --- | --- | --- |
| Taupe | `#C2B4A7` | Banner and profile ground | Large fields, header wash |
| Parchment | `#F0E6DD` | Banner inner paper / profile collar lights | Surfaces |
| Page | `#F4EFE8` | Slightly lifted parchment for readability | Page background |
| Ink | `#161012` | Profile darkest cluster | Body text |
| Navy | `#2C3849` | Average of blue-leaning jacket pixels | Primary, header wordmark, buttons |
| Navy deep | `#1C2433` | Darkened navy for AA-safe large type on taupe if needed | Footer, emphasis |
| Brass | `#A48B71` | Banner warm metal / tan cluster | Decorative rules only |
| Brass deep | `#6B5344` | Darkened brass | Links and labels (5.79:1 on parchment) |
| Hair brown | `#4C312A` | Profile hair sample | Optional motif only |
| Border | `#D4C8BB` | Mid parchment/taupe mix | Hairlines |

## Contrast notes

| Pair | Ratio | Verdict |
| --- | --- | --- |
| Ink on parchment | 15.28:1 | Pass |
| Ink on taupe | 9.29:1 | Pass |
| Cream on navy | 9.61:1 | Pass |
| Brass `#A48B71` on parchment | 3.63:1 | Fail for body text. Decorative only |
| Brass deep on parchment | 5.79:1 | Pass |

## Typography

The banner uses a bold serif for "Mrs Gill". That is brand evidence, not a generic "books get serifs" habit.

- Display: Literata (literary, readable, not Playfair/Fraunces)
- Body and UI: Source Sans 3
- Loaded with `next/font`

## Shape and motion

- Modest radius (8-12px). Buttons may be slightly more rounded. Not pills everywhere.
- Light theme is locked. The identity is parchment and lamp-warm illustration.
- Motion is CSS hover and focus only. Honour reduced motion.

## Motifs allowed

A thin brass rule, a book-spine stripe, the illustrated portrait mark, the professional photograph, the full banner frieze. Not a stack of quills, candles, and exam papers on every section.
