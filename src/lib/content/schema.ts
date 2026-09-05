import { z } from "zod";

const unsafe = /[<>]|javascript:|data:text\/html/i;

export const safeText = (max: number) =>
  z
    .string()
    .max(max)
    .refine((value) => !unsafe.test(value), "That text contains disallowed markup.");

export const optionalText = (max: number) =>
  z.preprocess(
    (value) => (value == null ? "" : value),
    safeText(max)
      .transform((value) => value.trim())
      .transform((value) => (value.length === 0 ? null : value)),
  );

export const optionalEmail = z.preprocess(
  (value) => (value == null ? "" : value),
  z
    .string()
    .max(200)
    .transform((value) => value.trim())
    .refine(
      (value) => value === "" || z.string().email().safeParse(value).success,
      "Enter a valid email address.",
    )
    .transform((value) => (value === "" ? null : value)),
);

export const optionalUrl = z.preprocess(
  (value) => (value == null ? "" : value),
  z
    .string()
    .max(500)
    .transform((value) => value.trim())
    .refine(
      (value) => value === "" || z.string().url().safeParse(value).success,
      "Enter a valid URL.",
    )
    .refine(
      (value) => value === "" || /^https?:\/\//i.test(value),
      "Use an http or https URL.",
    )
    .transform((value) => (value === "" ? null : value)),
);

export const youtubeIdSchema = z
  .string()
  .trim()
  .regex(/^[\w-]{11}$/, "Enter a valid YouTube video id.");

export const lessonFormatSchema = z.enum(["online", "in-person", "both"]);

export const videoTopicSchema = z.enum([
  "christmas-carol",
  "macbeth",
  "coram-boy",
  "poetry",
]);

export const videoFocusSchema = z.enum([
  "exam-method",
  "quotations",
  "character",
  "context",
  "themes",
  "structure",
  "vocabulary",
]);

export const navItemSchema = z
  .object({
    href: safeText(200),
    label: safeText(80),
  })
  .strict();

export const playlistSchema = z
  .object({
    title: safeText(120),
    url: z.string().url().max(500),
  })
  .strict();

export const serviceSchema = z
  .object({
    id: z.string().regex(/^[\w-]{2,40}$/),
    title: safeText(80),
    summary: safeText(200),
    detail: safeText(1200),
    price: optionalText(40),
    priceSuffix: optionalText(40),
    duration: optionalText(80),
    groupSize: optionalText(80),
    enabled: z.boolean(),
    order: z.number().int().min(0).max(100),
  })
  .strict();

export const videoSchema = z
  .object({
    id: youtubeIdSchema,
    title: safeText(160),
    topic: videoTopicSchema,
    focus: videoFocusSchema,
    duration: optionalText(16),
    description: optionalText(400),
    featured: z.boolean(),
    enabled: z.boolean(),
    order: z.number().int().min(0).max(200),
  })
  .strict();

export const testimonialSchema = z
  .object({
    id: z.string().regex(/^[\w-]{2,40}$/),
    quote: safeText(500),
    attribution: safeText(80),
    context: optionalText(120),
    enabled: z.boolean(),
    order: z.number().int().min(0).max(100),
  })
  .strict();

export const credentialSchema = z
  .object({
    id: z.string().regex(/^[\w-]{2,40}$/),
    label: safeText(80),
    detail: safeText(300),
    enabled: z.boolean(),
    order: z.number().int().min(0).max(100),
  })
  .strict();

export const literatureTextSchema = z
  .object({
    topic: videoTopicSchema,
    title: safeText(80),
    note: safeText(240),
  })
  .strict();

export const siteContentSchema = z
  .object({
    version: z.literal(1),
    site: z
      .object({
        name: safeText(80),
        youtubeName: safeText(80),
        tagline: safeText(200),
        shortDescription: safeText(320),
        locale: z.literal("en-GB"),
        enquiryEmail: optionalEmail,
        phone: optionalText(40),
        bookingUrl: optionalUrl,
        youtubeUrl: z.string().url().max(300),
        youtubeVideosUrl: z.string().url().max(300),
        youtubeShortsUrl: z.string().url().max(300),
        youtubePlaylistsUrl: z.string().url().max(300),
        youtubeHandle: safeText(80),
        playlists: z.array(playlistSchema).max(12),
        navigation: z.array(navItemSchema).max(8),
        footerNavigation: z.array(navItemSchema).max(8),
        lessonFormat: z.preprocess(
          (value) => (value === "" ? null : value),
          lessonFormatSchema.nullable(),
        ),
        serviceArea: optionalText(160),
        availability: optionalText(240),
        contactPreference: optionalText(200),
      })
      .strict(),
    homepage: z
      .object({
        heroHeading: safeText(120),
        heroSupporting: safeText(240),
        primaryCtaLabel: safeText(40),
        primaryCtaHref: safeText(200),
        secondaryCtaLabel: safeText(40),
        secondaryCtaHref: safeText(200),
        tutoringHeading: safeText(120),
        tutoringIntro: safeText(600),
        textsHeading: safeText(120),
        textsIntro: safeText(400),
        videosHeading: safeText(120),
        videosIntro: safeText(400),
        aboutHeading: safeText(120),
        aboutShort: safeText(700),
        aboutLong: safeText(900),
        enquiryFallback: safeText(400),
        resourcesTeaser: optionalText(400),
        revisionHeading: safeText(120),
        revisionIntro: safeText(700),
      })
      .strict(),
    credentials: z.array(credentialSchema).max(12),
    services: z.array(serviceSchema).max(12),
    videos: z.array(videoSchema).max(40),
    literatureTexts: z.array(literatureTextSchema).max(8),
    testimonials: z.array(testimonialSchema).max(12),
    seo: z
      .object({
        defaultTitle: safeText(80),
        defaultDescription: safeText(200),
        socialDescription: safeText(200),
        revisionTitle: safeText(80),
        revisionDescription: safeText(200),
      })
      .strict(),
    features: z
      .object({
        showPricing: z.boolean(),
        showTestimonials: z.boolean(),
        showAbout: z.boolean(),
        showVideos: z.boolean(),
        enableEnquiry: z.boolean(),
        showResourcesTeaser: z.boolean(),
      })
      .strict(),
    privacy: z
      .object({
        controllerName: optionalText(120),
        controllerEmail: optionalEmail,
      })
      .strict(),
  })
  .strict();

export type SiteContent = z.infer<typeof siteContentSchema>;

export function parseYoutubeId(input: string): string | null {
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      return /^[\w-]{11}$/.test(id) ? id : null;
    }
    const v = url.searchParams.get("v");
    return v && /^[\w-]{11}$/.test(v) ? v : null;
  } catch {
    return null;
  }
}
