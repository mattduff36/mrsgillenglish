"use server";

import { AuthError } from "next-auth";
import { ZodError } from "zod";
import { signIn, signOut } from "@/auth";
import { requireAdmin } from "@/lib/auth/guard";
import { parseYoutubeId, siteContentSchema, type SiteContent } from "@/lib/content/schema";
import {
  canPersistContent,
  isAuthConfigured,
  readSiteContentFresh,
  saveSiteContent,
} from "@/lib/content/store";

export type ActionState = { ok: boolean; message: string };

async function persist(patch: (current: SiteContent) => unknown): Promise<ActionState> {
  await requireAdmin();
  if (!canPersistContent()) {
    return {
      ok: false,
      message: "Saving is unavailable until production Blob storage is configured.",
    };
  }
  try {
    const current = await readSiteContentFresh();
    const next = siteContentSchema.parse(patch(current));
    await saveSiteContent(next);
    return { ok: true, message: "Saved. The public site will refresh shortly." };
  } catch (error) {
    return { ok: false, message: formatActionError(error) };
  }
}

function formatActionError(error: unknown) {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message).slice(0, 3).join(" ");
  }
  if (error instanceof Error) return error.message;
  return "That update could not be saved.";
}

export async function loginAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!isAuthConfigured()) {
    return { ok: false, message: "Admin login is not configured on this environment." };
  }
  try {
    await signIn("credentials", {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      redirectTo: "/admin",
    });
    return { ok: true, message: "Signed in." };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, message: "Those details were not accepted. Wait and try again." };
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function saveSettingsAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return persist((current) => ({
    ...current,
    site: {
      ...current.site,
      name: String(formData.get("name") ?? ""),
      shortDescription: String(formData.get("shortDescription") ?? ""),
      tagline: String(formData.get("tagline") ?? ""),
      enquiryEmail: String(formData.get("enquiryEmail") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      bookingUrl: String(formData.get("bookingUrl") ?? ""),
      youtubeUrl: String(formData.get("youtubeUrl") ?? ""),
      youtubeHandle: String(formData.get("youtubeHandle") ?? ""),
      youtubeVideosUrl: `${String(formData.get("youtubeUrl") ?? "").replace(/\/$/, "")}/videos`,
      youtubeShortsUrl: `${String(formData.get("youtubeUrl") ?? "").replace(/\/$/, "")}/shorts`,
      youtubePlaylistsUrl: `${String(formData.get("youtubeUrl") ?? "").replace(/\/$/, "")}/playlists`,
      lessonFormat:
        (String(formData.get("lessonFormat") ?? "") as SiteContent["site"]["lessonFormat"]) ||
        null,
      serviceArea: String(formData.get("serviceArea") ?? ""),
      availability: String(formData.get("availability") ?? ""),
      contactPreference: String(formData.get("contactPreference") ?? ""),
    },
    features: {
      showPricing: formData.get("showPricing") === "on",
      showTestimonials: formData.get("showTestimonials") === "on",
      showAbout: formData.get("showAbout") === "on",
      showVideos: formData.get("showVideos") === "on",
      enableEnquiry: formData.get("enableEnquiry") === "on",
      showResourcesTeaser: formData.get("showResourcesTeaser") === "on",
    },
    privacy: {
      controllerName: String(formData.get("controllerName") ?? ""),
      controllerEmail: String(formData.get("controllerEmail") ?? ""),
    },
  }));
}

export async function saveHomepageAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return persist((current) => ({
    ...current,
    homepage: {
      ...current.homepage,
      heroHeading: String(formData.get("heroHeading") ?? ""),
      heroSupporting: String(formData.get("heroSupporting") ?? ""),
      primaryCtaLabel: String(formData.get("primaryCtaLabel") ?? ""),
      primaryCtaHref: String(formData.get("primaryCtaHref") ?? ""),
      secondaryCtaLabel: String(formData.get("secondaryCtaLabel") ?? ""),
      secondaryCtaHref: String(formData.get("secondaryCtaHref") ?? ""),
      tutoringHeading: String(formData.get("tutoringHeading") ?? ""),
      tutoringIntro: String(formData.get("tutoringIntro") ?? ""),
      textsHeading: String(formData.get("textsHeading") ?? ""),
      textsIntro: String(formData.get("textsIntro") ?? ""),
      videosHeading: String(formData.get("videosHeading") ?? ""),
      videosIntro: String(formData.get("videosIntro") ?? ""),
      aboutHeading: String(formData.get("aboutHeading") ?? ""),
      aboutShort: String(formData.get("aboutShort") ?? ""),
      aboutLong: String(formData.get("aboutLong") ?? ""),
      enquiryFallback: String(formData.get("enquiryFallback") ?? ""),
      resourcesTeaser: String(formData.get("resourcesTeaser") ?? ""),
      revisionHeading: String(formData.get("revisionHeading") ?? ""),
      revisionIntro: String(formData.get("revisionIntro") ?? ""),
    },
  }));
}

export async function saveAboutAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return persist((current) => ({
    ...current,
    homepage: {
      ...current.homepage,
      aboutHeading: String(formData.get("aboutHeading") ?? ""),
      aboutShort: String(formData.get("aboutShort") ?? ""),
      aboutLong: String(formData.get("aboutLong") ?? ""),
    },
    credentials: current.credentials,
  }));
}

export async function saveSeoAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return persist((current) => ({
    ...current,
    seo: {
      defaultTitle: String(formData.get("defaultTitle") ?? ""),
      defaultDescription: String(formData.get("defaultDescription") ?? ""),
      socialDescription: String(formData.get("socialDescription") ?? ""),
      revisionTitle: String(formData.get("revisionTitle") ?? ""),
      revisionDescription: String(formData.get("revisionDescription") ?? ""),
    },
  }));
}

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "");
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

export async function saveServicesAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return persist((current) => {
    const count = Number(field(formData, "count"));
    const services = [];
    for (let index = 0; index < count; index += 1) {
      if (field(formData, `remove-${index}`) === "1") continue;
      services.push({
        id: field(formData, `id-${index}`) || `service-${index + 1}`,
        title: field(formData, `title-${index}`),
        summary: field(formData, `summary-${index}`),
        detail: field(formData, `detail-${index}`),
        price: field(formData, `price-${index}`),
        priceSuffix: field(formData, `priceSuffix-${index}`),
        duration: field(formData, `duration-${index}`),
        groupSize: field(formData, `groupSize-${index}`),
        enabled: formData.get(`enabled-${index}`) === "on",
        order: services.length,
      });
    }
    if (field(formData, "add") === "1") {
      services.push({
        id: `service-${Date.now()}`,
        title: "New tutoring offer",
        summary: "Short summary",
        detail: "Add the public description once Issy has confirmed it.",
        price: "",
        priceSuffix: "",
        duration: "",
        groupSize: "",
        enabled: false,
        order: services.length,
      });
    }
    const ordered = applyMove(services, field(formData, "move")).map((item, order) => ({
      ...item,
      order,
    }));
    return { ...current, services: ordered };
  });
}

export async function saveVideosAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return persist((current) => {
    const count = Number(field(formData, "count"));
    const videos = [];
    for (let index = 0; index < count; index += 1) {
      if (field(formData, `remove-${index}`) === "1") continue;
      const raw = field(formData, `id-${index}`);
      videos.push({
        id: parseYoutubeId(raw) ?? raw,
        title: field(formData, `title-${index}`),
        topic: field(formData, `topic-${index}`),
        focus: field(formData, `focus-${index}`),
        duration: field(formData, `duration-${index}`),
        description: field(formData, `description-${index}`),
        featured: formData.get(`featured-${index}`) === "on",
        enabled: formData.get(`enabled-${index}`) === "on",
        order: videos.length,
      });
    }
    if (field(formData, "add") === "1") {
      const added = parseYoutubeId(field(formData, "newYoutube"));
      if (!added) {
        throw new Error("Paste a YouTube watch link or 11-character video id to add a video.");
      }
      videos.push({
        id: added,
        title: field(formData, "newTitle") || "New revision video",
        topic: field(formData, "newTopic") || "christmas-carol",
        focus: field(formData, "newFocus") || "exam-method",
        duration: field(formData, "newDuration"),
        description: field(formData, "newDescription"),
        featured: false,
        enabled: false,
        order: videos.length,
      });
    }
    const ordered = applyMove(videos, field(formData, "move")).map((item, order) => ({
      ...item,
      order,
    }));
    return { ...current, videos: ordered };
  });
}

export async function saveTestimonialsAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return persist((current) => {
    const count = Number(field(formData, "count"));
    const testimonials = [];
    for (let index = 0; index < count; index += 1) {
      if (field(formData, `remove-${index}`) === "1") continue;
      testimonials.push({
        id: field(formData, `id-${index}`) || `quote-${index + 1}`,
        quote: field(formData, `quote-${index}`),
        attribution: field(formData, `attribution-${index}`),
        context: field(formData, `context-${index}`),
        enabled: formData.get(`enabled-${index}`) === "on",
        order: testimonials.length,
      });
    }
    if (field(formData, "add") === "1") {
      testimonials.push({
        id: `quote-${Date.now()}`,
        quote: "Approved wording will go here.",
        attribution: "First name only",
        context: "",
        enabled: false,
        order: testimonials.length,
      });
    }
    const ordered = applyMove(testimonials, field(formData, "move")).map((item, order) => ({
      ...item,
      order,
    }));
    return { ...current, testimonials: ordered };
  });
}

export async function saveCredentialsAction(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  return persist((current) => {
    const count = Number(field(formData, "count"));
    const credentials = [];
    for (let index = 0; index < count; index += 1) {
      if (field(formData, `remove-${index}`) === "1") continue;
      credentials.push({
        id: field(formData, `id-${index}`) || `cred-${index + 1}`,
        label: field(formData, `label-${index}`),
        detail: field(formData, `detail-${index}`),
        enabled: formData.get(`enabled-${index}`) === "on",
        order: credentials.length,
      });
    }
    if (field(formData, "add") === "1") {
      credentials.push({
        id: `cred-${Date.now()}`,
        label: "New detail",
        detail: "Add the public wording once Issy has confirmed it.",
        enabled: false,
        order: credentials.length,
      });
    }
    const ordered = applyMove(credentials, field(formData, "move")).map((item, order) => ({
      ...item,
      order,
    }));
    return { ...current, credentials: ordered };
  });
}
