import { aboutSections as seedAboutSections, credentials as seedCredentials, offerFocuses as seedFocuses, tutoredTexts as seedTutoredTexts } from "@/content/profile";
import { services as seedServices } from "@/content/services";
import { site as seedSite } from "@/content/site";
import { literatureTexts as seedTexts } from "@/content/texts";
import { videos as seedVideos } from "@/content/videos";
import { siteContentSchema, type SiteContent } from "./schema";

export function createSeedContent(): SiteContent {
  const content: SiteContent = {
    version: 1,
    site: {
      name: seedSite.name,
      youtubeName: seedSite.youtubeName,
      tagline: seedSite.tagline,
      shortDescription: seedSite.shortDescription,
      locale: seedSite.locale,
      enquiryEmail: seedSite.enquiryEmail,
      phone: seedSite.phone,
      bookingUrl: seedSite.bookingUrl,
      youtubeUrl: seedSite.youtube.url,
      youtubeVideosUrl: seedSite.youtube.videosUrl,
      youtubeShortsUrl: seedSite.youtube.shortsUrl,
      youtubePlaylistsUrl: seedSite.youtube.playlistsUrl,
      youtubeHandle: seedSite.youtube.handle,
      playlists: [...seedSite.youtube.playlists],
      navigation: [...seedSite.navigation],
      footerNavigation: [...seedSite.footerNavigation],
      lessonFormat: "both",
      serviceArea: "Stoke-by-Clare and the surrounding area",
      availability: "Weekday evenings, by arrangement",
      contactPreference:
        "For younger pupils, a parent or guardian should usually make the first contact.",
    },
    homepage: {
      heroHeading: "Building confidence in English, for the classroom and beyond.",
      heroSupporting: "One-to-one and small-group tuition for KS3 and GCSE.",
      primaryCtaLabel: "Enquire about tutoring",
      primaryCtaHref: `mailto:${seedSite.enquiryEmail}`,
      secondaryCtaLabel: "Browse revision videos",
      secondaryCtaHref: "/revision",
      tutoringHeading: "Tutoring for the years that matter.",
      tutoringIntro:
        "Mrs Gill offers English tutoring for Key Stage 3 and GCSE Language and Literature. Lessons are one-to-one or in small groups, online or in person around Stoke-by-Clare. After you enquire, she replies by email and confirms the details by hand. Closer to exams, intensive or revision-focused sessions can be arranged.",
      textsHeading: "Texts already taught on the revision channel.",
      textsIntro:
        "These are the Edexcel GCSE English Literature texts with dedicated videos and playlists. They describe the channel, not a closed list for every paid lesson.",
      videosHeading: "Start with a revision video.",
      videosIntro:
        "Short, practical lessons on quotations, context, character and exam paragraphs. PETAL, PEER and PETER are taught as methods, not magic formulas.",
      aboutHeading: "About Mrs Gill",
      aboutShort:
        "With 15 years experience teaching English, I am passionate in helping young people become more confident, capable and independent learners. I offer expert, personalised tuition for students who are keen to strengthen skills and achieve their goals.",
      aboutLong:
        "I hold a degree and PGCE in English and Drama, and have taught GCSE English across a range of exam boards, including AQA and Edexcel.",
      enquiryFallback:
        "The public enquiry address is not published at the moment. The revision library and the YouTube channel remain available.",
      resourcesTeaser: null,
      revisionHeading: "Revision that shows you how to answer.",
      revisionIntro:
        "These videos are from Mrs Gill the English Teacher. They focus on Edexcel GCSE English Literature: set texts, quotations, context, and paragraph methods such as PETAL, PEER and PETER. Thumbnails stay on this site. Each title opens on YouTube.",
    },
    credentials: seedCredentials.map((item, order) => ({
      ...item,
      enabled: true,
      order,
    })),
    offerFocuses: seedFocuses.map((item, order) => ({
      ...item,
      enabled: true,
      order,
    })),
    tutoredTexts: seedTutoredTexts.map((item, order) => ({
      ...item,
      enabled: true,
      order,
    })),
    aboutSections: seedAboutSections.map((item, order) => ({
      ...item,
      enabled: true,
      order,
    })),
    services: seedServices.map((service, order) => ({
      ...service,
      priceSuffix: null,
      enabled: true,
      order,
    })),
    videos: seedVideos.map((video, order) => ({
      id: video.id,
      title: video.title,
      topic: video.topic,
      focus: video.focus,
      duration: video.duration,
      description: null,
      featured: Boolean(video.featured),
      enabled: true,
      order,
    })),
    literatureTexts: [...seedTexts],
    testimonials: [],
    seo: {
      defaultTitle: `${seedSite.name} | KS3 and GCSE English tutoring`,
      defaultDescription: seedSite.metaDescription,
      socialDescription: seedSite.metaDescription,
      revisionTitle: "GCSE English revision videos",
      revisionDescription:
        "Curated Edexcel GCSE English Literature revision from Mrs Gill English: A Christmas Carol, Macbeth, Coram Boy, Belonging poetry, and exam methods.",
    },
    features: {
      showPricing: true,
      showTestimonials: false,
      showAbout: true,
      showVideos: true,
      enableEnquiry: true,
      showResourcesTeaser: false,
    },
    privacy: {
      controllerName: seedSite.name,
      controllerEmail: seedSite.enquiryEmail,
    },
  };

  return siteContentSchema.parse(content);
}
