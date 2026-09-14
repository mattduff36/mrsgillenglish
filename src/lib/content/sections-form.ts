import { createDefaultSection } from "./pages";
import {
  PAGE_KEYS,
  pageSectionSchema,
  SECTION_TYPES,
  type PageKey,
  type PageSection,
  type SectionType,
} from "./schema";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
}

function checked(formData: FormData, name: string) {
  return formData.get(name) === "on";
}

function itemIds(formData: FormData, name: string) {
  return formData.getAll(name).map(String).filter(Boolean);
}

function optional(formData: FormData, name: string) {
  return field(formData, name);
}

function isSectionType(value: string): value is SectionType {
  return (SECTION_TYPES as readonly string[]).includes(value);
}

function isPageKey(value: string): value is PageKey {
  return (PAGE_KEYS as readonly string[]).includes(value);
}

function applyMove<T>(items: T[], move: string): T[] {
  const match = /^(up|down)-(\d+)$/.exec(move);
  if (!match) return items;
  const index = Number(match[2]);
  const swap = match[1] === "up" ? index - 1 : index + 1;
  if (swap < 0 || swap >= items.length) return items;
  const next = [...items];
  const current = next[index];
  const other = next[swap];
  if (!current || !other) return items;
  next[index] = other;
  next[swap] = current;
  return next;
}

function readSection(formData: FormData, index: number): PageSection {
  const type = field(formData, `type-${index}`);
  if (!isSectionType(type)) {
    throw new Error(`Unknown section type: ${type || "(empty)"}`);
  }

  const id = field(formData, `id-${index}`) || `sec-${index + 1}`;
  const meta = {
    id,
    enabled: checked(formData, `enabled-${index}`),
    order: index,
    anchor: field(formData, `anchor-${index}`) || null,
    surface: field(formData, `surface-${index}`) || null,
  };

  switch (type) {
    case "hero":
      return pageSectionSchema.parse({
        type,
        ...meta,
        heading: field(formData, `heading-${index}`),
        supporting: field(formData, `supporting-${index}`),
        bannerSrc: optional(formData, `bannerSrc-${index}`),
        bannerAlt: field(formData, `bannerAlt-${index}`),
        profileSrc: optional(formData, `profileSrc-${index}`),
        profileAlt: field(formData, `profileAlt-${index}`),
        primaryCtaLabel: optional(formData, `primaryCtaLabel-${index}`),
        primaryCtaHref: optional(formData, `primaryCtaHref-${index}`),
        secondaryCtaLabel: optional(formData, `secondaryCtaLabel-${index}`),
        secondaryCtaHref: optional(formData, `secondaryCtaHref-${index}`),
      });
    case "prose":
      return pageSectionSchema.parse({
        type,
        ...meta,
        heading: optional(formData, `heading-${index}`),
        body: field(formData, `body-${index}`),
      });
    case "cta":
      return pageSectionSchema.parse({
        type,
        ...meta,
        heading: optional(formData, `heading-${index}`),
        body: optional(formData, `body-${index}`),
        primaryCtaLabel: optional(formData, `primaryCtaLabel-${index}`),
        primaryCtaHref: optional(formData, `primaryCtaHref-${index}`),
        secondaryCtaLabel: optional(formData, `secondaryCtaLabel-${index}`),
        secondaryCtaHref: optional(formData, `secondaryCtaHref-${index}`),
      });
    case "textImage":
      return pageSectionSchema.parse({
        type,
        ...meta,
        heading: field(formData, `heading-${index}`),
        body: field(formData, `body-${index}`),
        imageSrc: optional(formData, `imageSrc-${index}`),
        imageAlt: field(formData, `imageAlt-${index}`),
        imageSide: field(formData, `imageSide-${index}`) || "left",
        showCredentials: checked(formData, `showCredentials-${index}`),
        primaryCtaLabel: optional(formData, `primaryCtaLabel-${index}`),
        primaryCtaHref: optional(formData, `primaryCtaHref-${index}`),
        secondaryCtaLabel: optional(formData, `secondaryCtaLabel-${index}`),
        secondaryCtaHref: optional(formData, `secondaryCtaHref-${index}`),
      });
    case "imageBand":
      return pageSectionSchema.parse({
        type,
        ...meta,
        imageSrc: optional(formData, `imageSrc-${index}`),
        imageAlt: field(formData, `imageAlt-${index}`),
      });
    case "videos":
      return pageSectionSchema.parse({
        type,
        ...meta,
        heading: field(formData, `heading-${index}`),
        intro: field(formData, `intro-${index}`),
        selection: field(formData, `selection-${index}`) || "all",
        itemIds: itemIds(formData, `itemIds-${index}`),
        showRevisionCta: checked(formData, `showRevisionCta-${index}`),
      });
    case "testimonials":
      return pageSectionSchema.parse({
        type,
        ...meta,
        heading: field(formData, `heading-${index}`),
        selection: field(formData, `selection-${index}`) || "all",
        itemIds: itemIds(formData, `itemIds-${index}`),
      });
    case "literatureTexts":
      return pageSectionSchema.parse({
        type,
        ...meta,
        heading: field(formData, `heading-${index}`),
        intro: field(formData, `intro-${index}`),
        selection: field(formData, `selection-${index}`) || "all",
        itemIds: itemIds(formData, `itemIds-${index}`),
      });
    case "credentials":
      return pageSectionSchema.parse({
        type,
        ...meta,
        heading: optional(formData, `heading-${index}`),
        selection: field(formData, `selection-${index}`) || "all",
        itemIds: itemIds(formData, `itemIds-${index}`),
      });
    case "tutoring":
      return pageSectionSchema.parse({
        type,
        ...meta,
        heading: field(formData, `heading-${index}`),
        intro: field(formData, `intro-${index}`),
        enquiryFallback: field(formData, `enquiryFallback-${index}`),
        showLessonMeta: checked(formData, `showLessonMeta-${index}`),
        showFocuses: checked(formData, `showFocuses-${index}`),
        showTutoredTexts: checked(formData, `showTutoredTexts-${index}`),
        showEnquiry: checked(formData, `showEnquiry-${index}`),
        serviceSelection: field(formData, `serviceSelection-${index}`) || "all",
        serviceIds: itemIds(formData, `serviceIds-${index}`),
        focusSelection: field(formData, `focusSelection-${index}`) || "all",
        focusIds: itemIds(formData, `focusIds-${index}`),
        textSelection: field(formData, `textSelection-${index}`) || "all",
        tutoredTextIds: itemIds(formData, `tutoredTextIds-${index}`),
      });
    case "playlists":
      return pageSectionSchema.parse({
        type,
        ...meta,
        heading: optional(formData, `heading-${index}`),
        selection: field(formData, `selection-${index}`) || "all",
        itemIds: itemIds(formData, `itemIds-${index}`),
      });
    case "revisionCatalogue":
      return pageSectionSchema.parse({
        type,
        ...meta,
        selection: field(formData, `selection-${index}`) || "all",
        itemIds: itemIds(formData, `itemIds-${index}`),
      });
    case "privacyContact":
      return pageSectionSchema.parse({
        type,
        ...meta,
      });
    default: {
      const _never: never = type;
      throw new Error(`Unknown section type: ${String(_never)}`);
    }
  }
}

export function parsePageKey(value: string): PageKey {
  if (!isPageKey(value)) {
    throw new Error("Unknown page.");
  }
  return value;
}

export function parseSectionsFormData(formData: FormData): PageSection[] {
  const count = Number(field(formData, "count"));
  if (!Number.isInteger(count) || count < 0 || count > 20) {
    throw new Error("That page has too many sections.");
  }

  const sections: PageSection[] = [];
  for (let index = 0; index < count; index += 1) {
    if (field(formData, `remove-${index}`) === "1") continue;
    sections.push(readSection(formData, index));
  }

  if (field(formData, "add") === "1") {
    const addType = field(formData, "addType");
    if (!isSectionType(addType)) {
      throw new Error("Choose a section type to add.");
    }
    sections.push(
      createDefaultSection(addType, `sec-${Date.now().toString(36)}`),
    );
  }

  return applyMove(sections, field(formData, "move")).map((section, order) => ({
    ...section,
    order,
  }));
}
