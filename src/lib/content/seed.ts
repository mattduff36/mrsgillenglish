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
      locale: "en-GB",
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
      lessonFormat: null,
      serviceArea: null,
      availability: null,
      contactPreference: null,
    },
    homepage: {
      heroHeading: "English that holds up in class and in the exam.",
      heroSupporting:
        "One-to-one and small-group tuition for KS3 and GCSE, plus free Edexcel literature revision.",
      primaryCtaLabel: "Browse revision videos",
      primaryCtaHref: "/revision",
      secondaryCtaLabel: "How tutoring works",
      secondaryCtaHref: "#tutoring",
      tutoringHeading: "Tutoring for the years that matter.",
      tutoringIntro:
        "Issy offers English tutoring with a first focus on Key Stage 3 and GCSE. Lessons are intended as one-to-one or small groups. Prices and session length will appear here when they are confirmed.",
      textsHeading: "Texts already taught on the revision channel.",
      textsIntro:
        "These are the Edexcel GCSE English Literature texts with dedicated videos and playlists. They describe the channel, not a closed list for every paid lesson.",
      videosHeading: "Start with a revision video.",
      videosIntro:
        "Short, practical lessons on quotations, context, character and exam paragraphs. PETAL, PEER and PETER are taught as methods, not magic formulas.",
      aboutHeading: "Mrs Gill's English classroom, on the page.",
      aboutShort:
        "The YouTube channel introduces itself as a space for English revision and exam preparation, with a specialism in Edexcel GCSE content. Videos cover key texts and themes, exam strategy, grammar and writing advice, model answers, and quizzes.",
      aboutLong:
        "This website keeps that classroom voice and adds the tutoring offer Issy asked to advertise: Key Stage 3, GCSE, one-to-one and small groups. A longer biography will be added when she supplies it. Qualifications and school history are not guessed.",
      enquiryFallback:
        "A public enquiry address is not on the site yet. Until then, the surest next step is the revision library, or the YouTube channel itself.",
      resourcesTeaser: null,
      revisionHeading: "Revision that shows you how to answer.",
      revisionIntro:
        "These videos are from Mrs Gill the English Teacher. They focus on Edexcel GCSE English Literature: set texts, quotations, context, and paragraph methods such as PETAL, PEER and PETER. Thumbnails stay on this site. Each title opens on YouTube.",
    },
    credentials: [],
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
      showPricing: false,
      showTestimonials: false,
      showAbout: true,
      showVideos: true,
      enableEnquiry: true,
      showResourcesTeaser: false,
    },
    privacy: {
      controllerName: null,
      controllerEmail: null,
    },
  };

  return siteContentSchema.parse(content);
}
