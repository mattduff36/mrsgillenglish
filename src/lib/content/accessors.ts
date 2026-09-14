import type {
  PageKey,
  PageSection,
  SiteContent,
} from "./schema";

export const topicLabels = {
  "christmas-carol": "A Christmas Carol",
  macbeth: "Macbeth",
  "coram-boy": "Coram Boy",
  poetry: "Poetry",
} as const;

export const focusLabels = {
  "exam-method": "Exam method",
  quotations: "Quotations",
  character: "Character",
  context: "Context",
  themes: "Themes",
  structure: "Structure",
  vocabulary: "Vocabulary",
} as const;

export const lessonFormatLabels = {
  online: "Online",
  "in-person": "In person",
  both: "Online and in person",
} as const;

const localThumbnailIds = new Set([
  "6XbRHkvC-30",
  "elxR1iNle1w",
  "NxJqvLK7muA",
  "1G2KMa4UiHM",
  "GfRsuGt-WQI",
  "BEHvoAbBP6M",
  "GpKoFXNZaPY",
  "lxEhskeEeJg",
  "7HpkCofPHC4",
  "F2QJ8iO9crE",
  "W0Q4RXdnc3E",
  "lsziHRyBWao",
  "XH8lv1R4x_w",
  "hrplR6RdUW0",
  "Jbd5sRUKOVs",
  "E_wrk0jbVWg",
]);

export function getEnquiryHref(content: SiteContent): string | null {
  if (!content.features.enableEnquiry || !content.site.enquiryEmail) {
    return null;
  }
  return `mailto:${content.site.enquiryEmail}`;
}

function isAboutNav(href: string) {
  const value = href.toLowerCase();
  return value === "/about" || value.includes("#about");
}

function isRevisionNav(href: string) {
  const value = href.toLowerCase();
  return value === "/revision" || value.includes("#revision");
}

function isTutoringNav(href: string) {
  return href.toLowerCase().includes("tutoring");
}

function homepageSectionHref(
  item: SiteContent["site"]["navigation"][number],
): SiteContent["site"]["navigation"][number] {
  if (isAboutNav(item.href)) return { ...item, href: "/#about" };
  if (isRevisionNav(item.href)) return { ...item, href: "/#revision" };
  if (isTutoringNav(item.href)) return { ...item, href: "/#tutoring" };
  return item;
}

export function getPublicNavigation(content: SiteContent) {
  const visible = content.site.navigation.filter((item) => {
    const href = item.href.toLowerCase();
    if (isAboutNav(href) && !content.features.showAbout) {
      return false;
    }
    if (isRevisionNav(href) && !content.features.showVideos) return false;
    return Boolean(item.href.trim() && item.label.trim());
  });
  const about = visible.filter((item) => isAboutNav(item.href));
  const tutoring = visible.filter((item) => isTutoringNav(item.href));
  const revision = visible.filter((item) => isRevisionNav(item.href));
  const rest = visible.filter(
    (item) =>
      !isAboutNav(item.href) && !isRevisionNav(item.href) && !isTutoringNav(item.href),
  );
  return [...about, ...tutoring, ...revision, ...rest].map(homepageSectionHref);
}

export function getSafeHref(href: string | null | undefined): string | null {
  if (!href?.trim()) return null;
  if (/^(javascript:|data:)/i.test(href.trim())) return null;
  return href.trim();
}

export function getVisibleServices(content: SiteContent) {
  return [...content.services]
    .filter((service) => service.enabled)
    .sort((a, b) => a.order - b.order);
}

export function getPricedServices(content: SiteContent) {
  if (!content.features.showPricing) return [];
  return getVisibleServices(content).filter((service) => service.price);
}

export function getVisibleVideos(content: SiteContent) {
  return [...content.videos]
    .filter((video) => video.enabled)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedVideos(content: SiteContent) {
  return getVisibleVideos(content).filter((video) => video.featured);
}

export function getVisibleTestimonials(content: SiteContent) {
  return [...content.testimonials]
    .filter((item) => item.enabled && item.quote.trim() && item.attribution.trim())
    .sort((a, b) => a.order - b.order);
}

export function getVisibleCredentials(content: SiteContent) {
  return [...content.credentials]
    .filter((item) => item.enabled && item.label.trim() && item.detail.trim())
    .sort((a, b) => a.order - b.order);
}

export function getVisibleOfferFocuses(content: SiteContent) {
  return [...content.offerFocuses]
    .filter((item) => item.enabled && item.label.trim())
    .sort((a, b) => a.order - b.order);
}

export function getVisibleTutoredTexts(content: SiteContent) {
  return [...content.tutoredTexts]
    .filter((item) => item.enabled && item.title.trim())
    .sort((a, b) => a.order - b.order);
}

export function getVisibleAboutSections(content: SiteContent) {
  return content.pages.about.sections
    .filter((section): section is Extract<PageSection, { type: "prose" }> => {
      return (
        section.type === "prose" &&
        section.enabled &&
        Boolean(section.heading?.trim() && section.body.trim())
      );
    })
    .sort((a, b) => a.order - b.order);
}

export function getVisiblePageSections(content: SiteContent, page: PageKey) {
  return [...content.pages[page].sections]
    .filter((section) => section.enabled)
    .sort((a, b) => a.order - b.order);
}

function pickById<T>(
  items: T[],
  getId: (item: T) => string,
  selection: "all" | "featured" | "picked",
  itemIds: string[],
  featured?: (item: T) => boolean,
): T[] {
  if (selection === "featured") {
    return featured ? items.filter(featured) : items;
  }
  if (selection === "picked") {
    const map = new Map(items.map((item) => [getId(item), item]));
    return itemIds.map((id) => map.get(id)).filter((item): item is T => Boolean(item));
  }
  return items;
}

export function selectVideos(
  content: SiteContent,
  selection: "all" | "featured" | "picked",
  itemIds: string[],
) {
  return pickById(getVisibleVideos(content), (video) => video.id, selection, itemIds, (video) => video.featured);
}

export function selectTestimonials(
  content: SiteContent,
  selection: "all" | "picked",
  itemIds: string[],
) {
  return pickById(getVisibleTestimonials(content), (item) => item.id, selection, itemIds);
}

export function selectCredentials(
  content: SiteContent,
  selection: "all" | "picked" = "all",
  itemIds: string[] = [],
) {
  return pickById(getVisibleCredentials(content), (item) => item.id, selection, itemIds);
}

export function selectServices(
  content: SiteContent,
  selection: "all" | "picked",
  itemIds: string[],
) {
  return pickById(getVisibleServices(content), (item) => item.id, selection, itemIds);
}

export function selectOfferFocuses(
  content: SiteContent,
  selection: "all" | "picked",
  itemIds: string[],
) {
  return pickById(getVisibleOfferFocuses(content), (item) => item.id, selection, itemIds);
}

export function selectTutoredTexts(
  content: SiteContent,
  selection: "all" | "picked",
  itemIds: string[],
) {
  return pickById(getVisibleTutoredTexts(content), (item) => item.id, selection, itemIds);
}

export function selectLiteratureTexts(
  content: SiteContent,
  selection: "all" | "picked",
  itemIds: string[],
) {
  const items = content.literatureTexts.filter((item) => item.title.trim());
  return pickById(items, (item) => item.id, selection, itemIds);
}

export function selectPlaylists(
  content: SiteContent,
  selection: "all" | "picked",
  itemIds: string[],
) {
  return pickById(content.site.playlists, (item) => item.url, selection, itemIds);
}

export function splitParagraphs(body: string) {
  return body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function sectionHasContent(content: SiteContent, section: PageSection): boolean {
  switch (section.type) {
    case "hero":
      return Boolean(section.heading.trim());
    case "prose":
      return Boolean(section.body.trim());
    case "cta":
      return Boolean(
        section.heading?.trim() ||
          section.body?.trim() ||
          getSafeHref(section.primaryCtaHref) ||
          getSafeHref(section.secondaryCtaHref),
      );
    case "textImage":
      return Boolean(section.heading.trim() || section.body.trim());
    case "imageBand":
      return Boolean(section.imageSrc);
    case "videos":
      return selectVideos(content, section.selection, section.itemIds).length > 0;
    case "testimonials":
      return selectTestimonials(content, section.selection, section.itemIds).length > 0;
    case "literatureTexts":
      return selectLiteratureTexts(content, section.selection, section.itemIds).length > 0;
    case "credentials":
      return selectCredentials(content, section.selection, section.itemIds).length > 0;
    case "tutoring":
      return Boolean(section.heading.trim() || section.intro.trim());
    case "playlists":
      return selectPlaylists(content, section.selection, section.itemIds).length > 0;
    case "revisionCatalogue":
      return selectVideos(content, section.selection, section.itemIds).length > 0;
    case "privacyContact":
      return true;
    default: {
      const _never: never = section;
      return Boolean(_never);
    }
  }
}

export function getRenderableSections(content: SiteContent, page: PageKey) {
  return getVisiblePageSections(content, page).filter((section) =>
    sectionHasContent(content, section),
  );
}

export function getAboutDescription(content: SiteContent) {
  const intro = content.pages.about.sections.find(
    (section): section is Extract<PageSection, { type: "textImage" }> =>
      section.type === "textImage" && section.enabled,
  );
  return intro?.body || content.seo.defaultDescription;
}

export function getHeroSection(content: SiteContent) {
  return content.pages.home.sections.find(
    (section): section is Extract<PageSection, { type: "hero" }> => section.type === "hero",
  );
}

export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function videoThumbnailPath(id: string): string {
  if (localThumbnailIds.has(id)) return `/videos/${id}.jpg`;
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
