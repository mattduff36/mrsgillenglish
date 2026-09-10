export const site = {
  name: "Mrs Gill English",
  youtubeName: "Mrs Gill the English Teacher",
  locale: "en-GB",
  tagline: "English tutoring and GCSE revision, clearly explained.",
  shortDescription:
    "One-to-one and small-group English tuition for Key Stage 3 and GCSE, online or in person around Stoke-by-Clare.",
  metaDescription:
    "Mrs Gill English offers Key Stage 3 and GCSE English tutoring online and in person around Stoke-by-Clare, with free Edexcel literature revision videos.",
  enquiryEmail: "mrsgillenglishteacher@gmail.com" as string | null,
  phone: null as string | null,
  bookingUrl: null as string | null,
  youtube: {
    handle: "@MrsGillEnglish",
    url: "https://www.youtube.com/@MrsGillEnglish",
    videosUrl: "https://www.youtube.com/@MrsGillEnglish/videos",
    shortsUrl: "https://www.youtube.com/@MrsGillEnglish/shorts",
    playlistsUrl: "https://www.youtube.com/@MrsGillEnglish/playlists",
    playlists: [
      {
        title: "A Christmas Carol",
        url: "https://www.youtube.com/playlist?list=PLHWQ-StyRp0iysdviPDvQ0JpLCX1IoTiO",
      },
      {
        title: "Macbeth",
        url: "https://www.youtube.com/playlist?list=PLHWQ-StyRp0ih9h6SE1LqLLHkBSA908a7",
      },
      {
        title: "Coram Boy",
        url: "https://www.youtube.com/playlist?list=PLHWQ-StyRp0h-pdu7xLoyDgg_XNDfXrF3",
      },
      {
        title: "Poetry",
        url: "https://www.youtube.com/playlist?list=PLHWQ-StyRp0gPjFFhS7Gkc4z7A45HQGEx",
      },
    ],
  },
  navigation: [
    { href: "/#tutoring", label: "Tutoring" },
    { href: "/revision", label: "Revision" },
    { href: "/about", label: "About" },
  ],
  footerNavigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/revision", label: "Revision" },
    { href: "/privacy", label: "Privacy" },
  ],
} as const;

export const portrait = {
  src: "/images/mrs-gill-portrait.jpg",
  width: 1400,
  height: 2099,
  alt: "Mrs Gill standing in a garden beside white blossom, wearing a blue denim dress.",
} as const;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return fromEnv || "http://localhost:3000";
}

export function getEnquiryMailto(): string | null {
  if (!site.enquiryEmail) return null;
  return `mailto:${site.enquiryEmail}`;
}

export const routes = ["/", "/about", "/revision", "/privacy"] as const;
