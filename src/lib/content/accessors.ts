import type { SiteContent } from "./schema";

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

export function getPublicNavigation(content: SiteContent) {
  return content.site.navigation.filter((item) => {
    const href = item.href.toLowerCase();
    if (href.includes("#about") && !content.features.showAbout) return false;
    if (href.includes("/revision") && !content.features.showVideos) return false;
    return Boolean(item.href.trim() && item.label.trim());
  });
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
  if (!content.features.showTestimonials) return [];
  return [...content.testimonials]
    .filter((item) => item.enabled && item.quote.trim() && item.attribution.trim())
    .sort((a, b) => a.order - b.order);
}

export function getVisibleCredentials(content: SiteContent) {
  return [...content.credentials]
    .filter((item) => item.enabled && item.label.trim() && item.detail.trim())
    .sort((a, b) => a.order - b.order);
}

export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function videoThumbnailPath(id: string): string {
  if (localThumbnailIds.has(id)) return `/videos/${id}.jpg`;
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
