import { portrait } from "@/content/site";
import {
  DEFAULT_BANNER_ALT,
  DEFAULT_PORTRAIT_ALT,
  DEFAULT_PROFILE_ALT,
  PRIVACY_COMMENTS_PARAGRAPH,
  PRIVACY_INTRO_PARAGRAPHS,
} from "./privacy-copy";
import type {
  PageKey,
  PageSection,
  Pages,
  SectionType,
  SiteContent,
  V1SiteContent,
} from "./schema";

function withOrder<T extends PageSection>(sections: T[]): T[] {
  return sections.map((section, order) => ({ ...section, order }));
}

export function homepageVideoPickIds(videos: V1SiteContent["videos"]): string[] {
  const visible = [...videos]
    .filter((video) => video.enabled)
    .sort((a, b) => a.order - b.order);
  const featured = visible.filter((video) => video.featured);
  const recent = visible.filter((video) => !video.featured).slice(0, 2);
  return [...featured, ...recent].map((video) => video.id);
}

function emptyCtas() {
  return {
    primaryCtaLabel: null,
    primaryCtaHref: null,
    secondaryCtaLabel: null,
    secondaryCtaHref: null,
  };
}

function enquiryHref(content: Pick<V1SiteContent, "site" | "features">): string | null {
  if (!content.features.enableEnquiry || !content.site.enquiryEmail) return null;
  return `mailto:${content.site.enquiryEmail}`;
}

export function buildPagesFromV1(v1: V1SiteContent): Pages {
  const homepage = v1.homepage;
  const enquiry = enquiryHref(v1);

  const home: PageSection[] = [
    {
      type: "hero",
      id: "home-hero",
      enabled: true,
      order: 0,
      anchor: null,
      surface: "taupe",
      heading: homepage.heroHeading,
      supporting: homepage.heroSupporting,
      bannerSrc: "/images/youtube-banner-wide.jpg",
      bannerAlt: DEFAULT_BANNER_ALT,
      profileSrc: "/brand/youtube-profile.jpg",
      profileAlt: DEFAULT_PROFILE_ALT,
      primaryCtaLabel: homepage.primaryCtaLabel,
      primaryCtaHref: homepage.primaryCtaHref,
      secondaryCtaLabel: homepage.secondaryCtaLabel,
      secondaryCtaHref: homepage.secondaryCtaHref,
    },
    {
      type: "textImage",
      id: "home-about",
      enabled: v1.features.showAbout,
      order: 1,
      anchor: "about",
      surface: null,
      heading: homepage.aboutHeading,
      body: homepage.aboutShort,
      imageSrc: portrait.src,
      imageAlt: DEFAULT_PORTRAIT_ALT,
      imageSide: "left",
      showCredentials: true,
      primaryCtaLabel: "More about Mrs Gill",
      primaryCtaHref: "/about",
      secondaryCtaLabel: "Visit the YouTube channel",
      secondaryCtaHref: v1.site.youtubeUrl,
    },
    {
      type: "tutoring",
      id: "home-tutoring",
      enabled: true,
      order: 2,
      anchor: "tutoring",
      surface: "navy",
      heading: homepage.tutoringHeading,
      intro: homepage.tutoringIntro,
      enquiryFallback: homepage.enquiryFallback,
      showLessonMeta: true,
      showFocuses: true,
      showTutoredTexts: true,
      showEnquiry: true,
      serviceSelection: "all",
      serviceIds: [],
      focusSelection: "all",
      focusIds: [],
      textSelection: "all",
      tutoredTextIds: [],
    },
    {
      type: "videos",
      id: "home-videos",
      enabled: v1.features.showVideos,
      order: 3,
      anchor: "revision",
      surface: null,
      heading: homepage.videosHeading,
      intro: homepage.videosIntro,
      selection: "picked",
      itemIds: homepageVideoPickIds(v1.videos),
      showRevisionCta: true,
    },
    {
      type: "testimonials",
      id: "home-testimonials",
      enabled: v1.features.showTestimonials,
      order: 4,
      anchor: null,
      surface: null,
      heading: "What families say",
      selection: "all",
      itemIds: [],
    },
    {
      type: "prose",
      id: "home-resources",
      enabled: Boolean(v1.features.showResourcesTeaser && homepage.resourcesTeaser),
      order: 5,
      anchor: null,
      surface: "parchment",
      heading: "Resources",
      body: homepage.resourcesTeaser ?? "",
    },
  ];

  const about: PageSection[] = [
    {
      type: "textImage",
      id: "about-intro",
      enabled: true,
      order: 0,
      anchor: null,
      surface: null,
      heading: homepage.aboutHeading,
      body: homepage.aboutShort,
      imageSrc: portrait.src,
      imageAlt: DEFAULT_PORTRAIT_ALT,
      imageSide: "left",
      showCredentials: true,
      ...emptyCtas(),
    },
    ...v1.aboutSections.map((section, index) => ({
      type: "prose" as const,
      id: section.id,
      enabled: section.enabled,
      order: index + 1,
      anchor: null,
      surface: null,
      heading: section.heading,
      body: section.body,
    })),
    {
      type: "cta",
      id: "about-cta",
      enabled: true,
      order: v1.aboutSections.length + 1,
      anchor: null,
      surface: null,
      heading: null,
      body: null,
      primaryCtaLabel: enquiry ? "Enquire about tutoring" : null,
      primaryCtaHref: enquiry,
      secondaryCtaLabel: "How tutoring works",
      secondaryCtaHref: "/#tutoring",
    },
  ];

  const revision: PageSection[] = [
    {
      type: "cta",
      id: "revision-intro",
      enabled: true,
      order: 0,
      anchor: null,
      surface: null,
      heading: homepage.revisionHeading,
      body: homepage.revisionIntro,
      primaryCtaLabel: "All videos on YouTube",
      primaryCtaHref: v1.site.youtubeVideosUrl,
      secondaryCtaLabel: "Shorts",
      secondaryCtaHref: v1.site.youtubeShortsUrl,
    },
    {
      type: "playlists",
      id: "revision-playlists",
      enabled: v1.site.playlists.length > 0,
      order: 1,
      anchor: null,
      surface: null,
      heading: null,
      selection: "all",
      itemIds: [],
    },
    {
      type: "revisionCatalogue",
      id: "revision-catalogue",
      enabled: true,
      order: 2,
      anchor: null,
      surface: null,
      selection: "all",
      itemIds: [],
    },
  ];

  const privacy: PageSection[] = [
    {
      type: "prose",
      id: "privacy-intro",
      enabled: true,
      order: 0,
      anchor: null,
      surface: null,
      heading: "Privacy",
      body: PRIVACY_INTRO_PARAGRAPHS.join("\n\n"),
    },
    {
      type: "privacyContact",
      id: "privacy-contact",
      enabled: true,
      order: 1,
      anchor: null,
      surface: null,
    },
    {
      type: "prose",
      id: "privacy-comments",
      enabled: true,
      order: 2,
      anchor: null,
      surface: null,
      heading: null,
      body: PRIVACY_COMMENTS_PARAGRAPH,
    },
  ];

  return {
    home: { sections: withOrder(home) },
    about: { sections: withOrder(about) },
    revision: { sections: withOrder(revision) },
    privacy: { sections: withOrder(privacy) },
  };
}

function findSection<T extends PageSection["type"]>(
  sections: PageSection[],
  type: T,
  match?: (section: Extract<PageSection, { type: T }>) => boolean,
): Extract<PageSection, { type: T }> | undefined {
  return sections.find((section): section is Extract<PageSection, { type: T }> => {
    if (section.type !== type) return false;
    return match ? match(section as Extract<PageSection, { type: T }>) : true;
  });
}

export function reconstructHomepage(content: SiteContent): V1SiteContent["homepage"] {
  const home = content.pages.home.sections;
  const revision = content.pages.revision.sections;
  const previous = content.rollback.homepage;
  const hero = findSection(home, "hero");
  const about = findSection(home, "textImage", (section) => section.anchor === "about")
    ?? findSection(home, "textImage");
  const tutoring = findSection(home, "tutoring");
  const videos = findSection(home, "videos");
  const resources = findSection(home, "prose", (section) => section.id === "home-resources")
    ?? findSection(home, "prose");
  const revisionIntro = findSection(revision, "cta");

  return {
    heroHeading: hero?.heading ?? previous.heroHeading,
    heroSupporting: hero?.supporting ?? previous.heroSupporting,
    primaryCtaLabel: hero?.primaryCtaLabel ?? previous.primaryCtaLabel,
    primaryCtaHref: hero?.primaryCtaHref ?? previous.primaryCtaHref,
    secondaryCtaLabel: hero?.secondaryCtaLabel ?? previous.secondaryCtaLabel,
    secondaryCtaHref: hero?.secondaryCtaHref ?? previous.secondaryCtaHref,
    tutoringHeading: tutoring?.heading ?? previous.tutoringHeading,
    tutoringIntro: tutoring?.intro ?? previous.tutoringIntro,
    textsHeading: previous.textsHeading,
    textsIntro: previous.textsIntro,
    videosHeading: videos?.heading ?? previous.videosHeading,
    videosIntro: videos?.intro ?? previous.videosIntro,
    aboutHeading: about?.heading ?? previous.aboutHeading,
    aboutShort: about?.body ?? previous.aboutShort,
    aboutLong: previous.aboutLong,
    enquiryFallback: tutoring?.enquiryFallback ?? previous.enquiryFallback,
    resourcesTeaser: resources?.body?.trim() ? resources.body : previous.resourcesTeaser,
    revisionHeading: revisionIntro?.heading ?? previous.revisionHeading,
    revisionIntro: revisionIntro?.body ?? previous.revisionIntro,
  };
}

export function reconstructAboutSections(content: SiteContent): V1SiteContent["aboutSections"] {
  return content.pages.about.sections
    .filter((section): section is Extract<PageSection, { type: "prose" }> => section.type === "prose")
    .map((section, order) => ({
      id: section.id,
      heading: section.heading ?? "About",
      body: section.body,
      enabled: section.enabled,
      order,
    }));
}

export function syncRollback(content: SiteContent): SiteContent["rollback"] {
  return {
    homepage: reconstructHomepage(content),
    aboutSections: reconstructAboutSections(content),
  };
}

export function hydrateV1ToV2(v1: V1SiteContent): SiteContent {
  const pages = buildPagesFromV1(v1);
  return {
    version: 2,
    site: v1.site,
    credentials: v1.credentials,
    offerFocuses: v1.offerFocuses,
    tutoredTexts: v1.tutoredTexts,
    services: v1.services,
    videos: v1.videos,
    literatureTexts: v1.literatureTexts,
    testimonials: v1.testimonials,
    seo: v1.seo,
    features: v1.features,
    privacy: v1.privacy,
    pages,
    rollback: {
      homepage: v1.homepage,
      aboutSections: v1.aboutSections,
    },
  };
}

export function toV1SiteContent(content: SiteContent): V1SiteContent {
  const rollback = syncRollback(content);
  return {
    version: 1,
    site: content.site,
    homepage: rollback.homepage,
    credentials: content.credentials,
    offerFocuses: content.offerFocuses,
    tutoredTexts: content.tutoredTexts,
    aboutSections: rollback.aboutSections,
    services: content.services,
    videos: content.videos,
    literatureTexts: content.literatureTexts,
    testimonials: content.testimonials,
    seo: content.seo,
    features: content.features,
    privacy: content.privacy,
  };
}

export function createDefaultSection(type: SectionType, id: string): PageSection {
  const base = {
    id,
    enabled: false,
    order: 0,
    anchor: null,
    surface: null,
  };

  switch (type) {
    case "hero":
      return {
        type,
        ...base,
        heading: "New heading",
        supporting: "Add the public wording once it has been confirmed.",
        bannerSrc: "/images/youtube-banner-wide.jpg",
        bannerAlt: DEFAULT_BANNER_ALT,
        profileSrc: "/brand/youtube-profile.jpg",
        profileAlt: DEFAULT_PROFILE_ALT,
        primaryCtaLabel: null,
        primaryCtaHref: null,
        secondaryCtaLabel: null,
        secondaryCtaHref: null,
      };
    case "prose":
      return {
        type,
        ...base,
        heading: "New section",
        body: "Add the public wording once it has been confirmed.",
      };
    case "cta":
      return {
        type,
        ...base,
        heading: null,
        body: null,
        primaryCtaLabel: null,
        primaryCtaHref: null,
        secondaryCtaLabel: null,
        secondaryCtaHref: null,
      };
    case "textImage":
      return {
        type,
        ...base,
        heading: "New heading",
        body: "Add the public wording once it has been confirmed.",
        imageSrc: portrait.src,
        imageAlt: DEFAULT_PORTRAIT_ALT,
        imageSide: "left",
        showCredentials: false,
        primaryCtaLabel: null,
        primaryCtaHref: null,
        secondaryCtaLabel: null,
        secondaryCtaHref: null,
      };
    case "imageBand":
      return {
        type,
        ...base,
        imageSrc: "/brand/youtube-banner.jpg",
        imageAlt: DEFAULT_BANNER_ALT,
      };
    case "videos":
      return {
        type,
        ...base,
        heading: "Revision videos",
        intro: "Add the public wording once it has been confirmed.",
        selection: "all",
        itemIds: [],
        showRevisionCta: true,
      };
    case "testimonials":
      return {
        type,
        ...base,
        heading: "What families say",
        selection: "all",
        itemIds: [],
      };
    case "literatureTexts":
      return {
        type,
        ...base,
        heading: "Texts on the revision channel",
        intro: "Add the public wording once it has been confirmed.",
        selection: "all",
        itemIds: [],
      };
    case "credentials":
      return {
        type,
        ...base,
        heading: null,
        selection: "all",
        itemIds: [],
      };
    case "tutoring":
      return {
        type,
        ...base,
        surface: "navy",
        heading: "Tutoring",
        intro: "Add the public wording once it has been confirmed.",
        enquiryFallback:
          "The public enquiry address is not published at the moment. The revision library and the YouTube channel remain available.",
        showLessonMeta: true,
        showFocuses: true,
        showTutoredTexts: true,
        showEnquiry: true,
        serviceSelection: "all",
        serviceIds: [],
        focusSelection: "all",
        focusIds: [],
        textSelection: "all",
        tutoredTextIds: [],
      };
    case "playlists":
      return {
        type,
        ...base,
        heading: null,
        selection: "all",
        itemIds: [],
      };
    case "revisionCatalogue":
      return {
        type,
        ...base,
        selection: "all",
        itemIds: [],
      };
    case "privacyContact":
      return {
        type,
        ...base,
      };
    default: {
      const _never: never = type;
      throw new Error(`Unknown section type: ${String(_never)}`);
    }
  }
}

export const SECTION_LABELS: Record<SectionType, string> = {
  hero: "Hero",
  prose: "Text section",
  cta: "Buttons",
  textImage: "Text and image",
  imageBand: "Image band",
  videos: "Video cards",
  testimonials: "Testimonials",
  literatureTexts: "Channel texts",
  credentials: "Qualifications",
  tutoring: "Tutoring",
  playlists: "YouTube playlists",
  revisionCatalogue: "Revision catalogue",
  privacyContact: "Privacy contact",
};

export const PAGE_PUBLIC_PATH: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  revision: "/revision",
  privacy: "/privacy",
};

export const PAGE_TITLES: Record<PageKey, string> = {
  home: "Home",
  about: "About",
  revision: "Revision",
  privacy: "Privacy",
};
