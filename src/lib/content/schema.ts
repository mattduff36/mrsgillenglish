import { z } from "zod";
import { imageRefMessage, isAllowedImageRef } from "./images";
import { hydrateV1ToV2, syncRollback } from "./pages";

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

export const optionalImageRef = z.preprocess(
  (value) => (value == null ? "" : String(value)),
  z
    .string()
    .max(500)
    .transform((value) => value.trim())
    .refine((value) => value === "" || isAllowedImageRef(value), (value) => ({
      message: imageRefMessage(value),
    }))
    .transform((value) => (value.length === 0 ? null : value)),
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

export const literatureTextSchema = z.preprocess(
  (value) => {
    if (value && typeof value === "object" && "topic" in value) {
      const item = value as { id?: string; topic: string };
      return { ...item, id: item.id || item.topic };
    }
    return value;
  },
  z
    .object({
      id: z.string().regex(/^[\w-]{2,40}$/),
      topic: videoTopicSchema,
      title: safeText(80),
      note: safeText(240),
    })
    .strict(),
);

export const offerFocusSchema = z
  .object({
    id: z.string().regex(/^[\w-]{2,40}$/),
    label: safeText(80),
    enabled: z.boolean(),
    order: z.number().int().min(0).max(100),
  })
  .strict();

export const tutoredTextSchema = z
  .object({
    id: z.string().regex(/^[\w-]{2,40}$/),
    title: safeText(80),
    note: optionalText(240),
    enabled: z.boolean(),
    order: z.number().int().min(0).max(100),
  })
  .strict();

export const aboutSectionSchema = z
  .object({
    id: z.string().regex(/^[\w-]{2,40}$/),
    heading: safeText(120),
    body: safeText(1600),
    enabled: z.boolean(),
    order: z.number().int().min(0).max(100),
  })
  .strict();

export const siteSchema = z
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
  .strict();

export const homepageSchema = z
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
  .strict();

export const seoSchema = z
  .object({
    defaultTitle: safeText(80),
    defaultDescription: safeText(200),
    socialDescription: safeText(200),
    revisionTitle: safeText(80),
    revisionDescription: safeText(200),
  })
  .strict();

export const featuresSchema = z
  .object({
    showPricing: z.boolean(),
    showTestimonials: z.boolean(),
    showAbout: z.boolean(),
    showVideos: z.boolean(),
    enableEnquiry: z.boolean(),
    showResourcesTeaser: z.boolean(),
  })
  .strict();

export const privacySchema = z
  .object({
    controllerName: optionalText(120),
    controllerEmail: optionalEmail,
  })
  .strict();

const catalogues = {
  credentials: z.array(credentialSchema).max(12),
  offerFocuses: z.array(offerFocusSchema).max(20).default([]),
  tutoredTexts: z.array(tutoredTextSchema).max(20).default([]),
  services: z.array(serviceSchema).max(12),
  videos: z.array(videoSchema).max(40),
  literatureTexts: z.array(literatureTextSchema).max(8),
  testimonials: z.array(testimonialSchema).max(12),
};

export const SECTION_TYPES = [
  "hero",
  "prose",
  "cta",
  "textImage",
  "imageBand",
  "videos",
  "testimonials",
  "literatureTexts",
  "credentials",
  "tutoring",
  "playlists",
  "revisionCatalogue",
  "privacyContact",
] as const;

export type SectionType = (typeof SECTION_TYPES)[number];

export const PAGE_KEYS = ["home", "about", "revision", "privacy"] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

const sectionId = z.string().regex(/^[\w-]{2,40}$/);
const sectionOrder = z.number().int().min(0).max(100);
const sectionAnchor = z.preprocess(
  (value) => (value === "" || value == null ? null : value),
  z.enum(["about", "tutoring", "revision"]).nullable(),
);
const sectionSurface = z.preprocess(
  (value) => (value === "" || value == null ? null : value),
  z.enum(["parchment", "navy", "taupe"]).nullable(),
);
const itemIdsSchema = z.array(z.string().max(500)).max(40).default([]);
const catalogueSelection = z.enum(["all", "picked"]);
const videoSelection = z.enum(["all", "featured", "picked"]);

const sectionMeta = {
  id: sectionId,
  enabled: z.boolean(),
  order: sectionOrder,
  anchor: sectionAnchor.default(null),
  surface: sectionSurface.default(null),
};

const ctaFields = {
  primaryCtaLabel: optionalText(40),
  primaryCtaHref: optionalText(200),
  secondaryCtaLabel: optionalText(40),
  secondaryCtaHref: optionalText(200),
};

export const heroSectionSchema = z
  .object({
    type: z.literal("hero"),
    ...sectionMeta,
    heading: safeText(120),
    supporting: safeText(240),
    bannerSrc: optionalImageRef,
    bannerAlt: safeText(240),
    profileSrc: optionalImageRef,
    profileAlt: safeText(240),
    ...ctaFields,
  })
  .strict();

export const proseSectionSchema = z
  .object({
    type: z.literal("prose"),
    ...sectionMeta,
    heading: optionalText(120),
    body: safeText(4000),
  })
  .strict();

export const ctaSectionSchema = z
  .object({
    type: z.literal("cta"),
    ...sectionMeta,
    heading: optionalText(120),
    body: optionalText(700),
    ...ctaFields,
  })
  .strict();

export const textImageSectionSchema = z
  .object({
    type: z.literal("textImage"),
    ...sectionMeta,
    heading: safeText(120),
    body: safeText(1600),
    imageSrc: optionalImageRef,
    imageAlt: safeText(240),
    imageSide: z.enum(["left", "right"]).default("left"),
    showCredentials: z.boolean().default(false),
    ...ctaFields,
  })
  .strict();

export const imageBandSectionSchema = z
  .object({
    type: z.literal("imageBand"),
    ...sectionMeta,
    imageSrc: optionalImageRef,
    imageAlt: safeText(240),
  })
  .strict();

export const videosSectionSchema = z
  .object({
    type: z.literal("videos"),
    ...sectionMeta,
    heading: safeText(120),
    intro: safeText(400),
    selection: videoSelection.default("all"),
    itemIds: itemIdsSchema,
    showRevisionCta: z.boolean().default(true),
  })
  .strict();

export const testimonialsSectionSchema = z
  .object({
    type: z.literal("testimonials"),
    ...sectionMeta,
    heading: safeText(120),
    selection: catalogueSelection.default("all"),
    itemIds: itemIdsSchema,
  })
  .strict();

export const literatureTextsSectionSchema = z
  .object({
    type: z.literal("literatureTexts"),
    ...sectionMeta,
    heading: safeText(120),
    intro: safeText(400),
    selection: catalogueSelection.default("all"),
    itemIds: itemIdsSchema,
  })
  .strict();

export const credentialsSectionSchema = z
  .object({
    type: z.literal("credentials"),
    ...sectionMeta,
    heading: optionalText(120),
    selection: catalogueSelection.default("all"),
    itemIds: itemIdsSchema,
  })
  .strict();

export const tutoringSectionSchema = z
  .object({
    type: z.literal("tutoring"),
    ...sectionMeta,
    heading: safeText(120),
    intro: safeText(600),
    enquiryFallback: safeText(400),
    showLessonMeta: z.boolean().default(true),
    showFocuses: z.boolean().default(true),
    showTutoredTexts: z.boolean().default(true),
    showEnquiry: z.boolean().default(true),
    serviceSelection: catalogueSelection.default("all"),
    serviceIds: itemIdsSchema,
    focusSelection: catalogueSelection.default("all"),
    focusIds: itemIdsSchema,
    textSelection: catalogueSelection.default("all"),
    tutoredTextIds: itemIdsSchema,
  })
  .strict();

export const playlistsSectionSchema = z
  .object({
    type: z.literal("playlists"),
    ...sectionMeta,
    heading: optionalText(120),
    selection: catalogueSelection.default("all"),
    itemIds: itemIdsSchema,
  })
  .strict();

export const revisionCatalogueSectionSchema = z
  .object({
    type: z.literal("revisionCatalogue"),
    ...sectionMeta,
    selection: catalogueSelection.default("all"),
    itemIds: itemIdsSchema,
  })
  .strict();

export const privacyContactSectionSchema = z
  .object({
    type: z.literal("privacyContact"),
    ...sectionMeta,
  })
  .strict();

export const pageSectionSchema = z.discriminatedUnion("type", [
  heroSectionSchema,
  proseSectionSchema,
  ctaSectionSchema,
  textImageSectionSchema,
  imageBandSectionSchema,
  videosSectionSchema,
  testimonialsSectionSchema,
  literatureTextsSectionSchema,
  credentialsSectionSchema,
  tutoringSectionSchema,
  playlistsSectionSchema,
  revisionCatalogueSectionSchema,
  privacyContactSectionSchema,
]);

export const pageLayoutSchema = z
  .object({
    sections: z.array(pageSectionSchema).max(20),
  })
  .strict();

export const pagesSchema = z
  .object({
    home: pageLayoutSchema,
    about: pageLayoutSchema,
    revision: pageLayoutSchema,
    privacy: pageLayoutSchema,
  })
  .strict();

export const rollbackSchema = z
  .object({
    homepage: homepageSchema,
    aboutSections: z.array(aboutSectionSchema).max(12),
  })
  .strict();

const sharedDocument = {
  site: siteSchema,
  ...catalogues,
  seo: seoSchema,
  features: featuresSchema,
  privacy: privacySchema,
};

export const v1StoredSchema = z
  .object({
    version: z.literal(1),
    ...sharedDocument,
    homepage: homepageSchema,
    aboutSections: z.array(aboutSectionSchema).max(12).default([]),
  })
  .strict();

export const v2StoredSchema = z
  .object({
    version: z.literal(2),
    ...sharedDocument,
    pages: pagesSchema,
    rollback: rollbackSchema,
  })
  .strict();

export const storedContentSchema = z.discriminatedUnion("version", [
  v1StoredSchema,
  v2StoredSchema,
]);

export const siteContentSchema = v2StoredSchema;

export type V1SiteContent = z.infer<typeof v1StoredSchema>;
export type SiteContent = z.infer<typeof v2StoredSchema>;
export type PageSection = z.infer<typeof pageSectionSchema>;
export type PageLayout = z.infer<typeof pageLayoutSchema>;
export type Pages = z.infer<typeof pagesSchema>;

export const retiredServiceIds = new Set([
  "ks3",
  "gcse",
  "one-to-one",
  "small-group",
]);

export const retiredOfferFocusIds = new Set([
  "exam-technique",
  "creative-writing",
  "transactional-writing",
  "reading-comprehension",
  "grammar",
  "revision-planning",
  "homework",
  "confidence",
]);

export const retiredTutoredTextIds = new Set([
  "inspector-calls",
  "lord-of-the-flies",
  "romeo-and-juliet",
  "power-and-conflict",
]);

function withoutRetired<T extends { id: string; order: number }>(
  items: T[],
  retired: Set<string>,
): T[] {
  return items
    .filter((item) => !retired.has(item.id))
    .map((item, order) => ({ ...item, order }));
}

function applyRetired<T extends { services: { id: string; order: number }[]; offerFocuses: { id: string; order: number }[]; tutoredTexts: { id: string; order: number }[] }>(
  content: T,
): T {
  return {
    ...content,
    services: withoutRetired(content.services, retiredServiceIds),
    offerFocuses: withoutRetired(content.offerFocuses, retiredOfferFocusIds),
    tutoredTexts: withoutRetired(content.tutoredTexts, retiredTutoredTextIds),
  };
}

export function parseSiteContent(input: unknown): SiteContent {
  const stored = storedContentSchema.parse(input);
  const cleaned = applyRetired(stored);
  if (cleaned.version === 1) {
    return applyRetired(hydrateV1ToV2(cleaned));
  }
  return {
    ...cleaned,
    rollback: syncRollback(cleaned),
  };
}

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
