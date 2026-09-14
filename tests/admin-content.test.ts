import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { getAdminAccounts } from "../src/lib/auth/accounts";
import { assertAdminSession } from "../src/lib/auth/session";
import {
  getEnquiryHref,
  getPricedServices,
  getPublicNavigation,
  getSafeHref,
  getVisibleTestimonials,
  getVisibleVideos,
} from "../src/lib/content/accessors";
import {
  canPersistContent,
  isAuthConfigured,
  isProduction,
  persistenceMode,
} from "../src/lib/content/config";
import { readStoredContent, writeStoredContent } from "../src/lib/content/io";
import { parseSiteContent, parseYoutubeId, siteContentSchema } from "../src/lib/content/schema";
import { createSeedContent, createV1SeedInput } from "../src/lib/content/seed";
import { getHeroSection } from "../src/lib/content/accessors";
import { serializeJsonLd } from "../src/lib/json-ld";

describe("T-public-seed-renders", () => {
  it("keeps the first-version copy and brand", () => {
    const content = createSeedContent();
    assert.equal(content.site.name, "Mrs Gill English");
    const hero = getHeroSection(content);
    assert.match(hero?.heading ?? "", /Building confidence in English/);
    assert.equal(content.site.enquiryEmail, "mrsgillenglishteacher@gmail.com");
    assert.equal(content.services.length, 0);
    assert.equal(content.offerFocuses.length, 0);
    assert.equal(content.tutoredTexts.length, 0);
    assert.equal(content.videos.length, 16);
    assert.equal(content.pages.about.sections.filter((section) => section.type === "prose").length, 4);
    assert.equal(content.testimonials.length, 0);
    assert.equal(content.features.showPricing, true);
    assert.equal(content.features.showTestimonials, false);
    assert.match(hero?.supporting ?? "", /KS3 and GCSE\.$/);
    assert.equal(hero?.supporting.includes("plus free Edexcel"), false);
    assert.deepEqual(
      getPublicNavigation(content).map((item) => [item.label, item.href]),
      [
        ["About", "/#about"],
        ["Tutoring", "/#tutoring"],
        ["Revision", "/#revision"],
      ],
    );
  });
});

describe("T-public-nav-order", () => {
  it("puts About, Tutoring, then Revision on homepage hashes even if stored nav is older", () => {
    const content = createSeedContent();
    const reordered = getPublicNavigation({
      ...content,
      site: {
        ...content.site,
        navigation: [
          { href: "/#tutoring", label: "Tutoring" },
          { href: "/revision", label: "Revision" },
          { href: "/about", label: "About" },
        ],
      },
    });
    assert.deepEqual(
      reordered.map((item) => [item.label, item.href]),
      [
        ["About", "/#about"],
        ["Tutoring", "/#tutoring"],
        ["Revision", "/#revision"],
      ],
    );
  });
});

describe("T-optional-hidden", () => {
  it("hides enquiry, prices, testimonials and empty video grids when switched off", () => {
    const content = createSeedContent();
    const priced = {
      ...content,
      services: [
        {
          id: "example-offer",
          title: "Example offer",
          summary: "Short summary",
          detail: "Confirmed wording for a priced offer.",
          price: "£50 per hour",
          priceSuffix: null,
          duration: null,
          groupSize: null,
          enabled: true,
          order: 0,
        },
      ],
    };
    assert.ok(getEnquiryHref(content)?.startsWith("mailto:"));
    assert.equal(getPricedServices(content).length, 0);
    assert.ok(getPricedServices(priced).length >= 1);
    assert.equal(getVisibleTestimonials(content).length, 0);
    assert.ok(getVisibleVideos(content).length > 0);

    const hiddenOffer = {
      ...priced,
      features: { ...priced.features, enableEnquiry: false, showPricing: false },
    };
    assert.equal(getEnquiryHref(hiddenOffer), null);
    assert.equal(getPricedServices(hiddenOffer).length, 0);

    const hiddenVideos = {
      ...content,
      features: { ...content.features, showVideos: false },
      videos: content.videos.map((video) => ({ ...video, enabled: false })),
    };
    assert.equal(getVisibleVideos(hiddenVideos).length, 0);
  });
});

describe("T-admin-env-fail-closed", () => {
  it("treats missing admin secrets as unconfigured", () => {
    assert.equal(isAuthConfigured({}), false);
    assert.equal(
      isAuthConfigured({ AUTH_SECRET: "secret", ADMIN_EMAIL_1: "a@example.com" }),
      false,
    );
  });

  it("accepts up to four complete admin pairs", () => {
    const env = {
      AUTH_SECRET: "secret",
      ADMIN_EMAIL_1: "one@example.com",
      ADMIN_PASSWORD_HASH_1: "hash-one",
      ADMIN_EMAIL_2: "two@example.com",
      ADMIN_PASSWORD_HASH_2: "hash-two",
      ADMIN_EMAIL_3: "",
      ADMIN_PASSWORD_HASH_3: "",
      ADMIN_EMAIL: "legacy@example.com",
      ADMIN_PASSWORD_HASH: "hash-legacy",
    };
    assert.equal(isAuthConfigured(env), true);
    assert.deepEqual(
      getAdminAccounts(env).map((account) => account.email),
      ["one@example.com", "two@example.com"],
    );
    assert.equal(getAdminAccounts({ ADMIN_EMAIL: "legacy@example.com", ADMIN_PASSWORD_HASH: "hash-legacy" }).length, 1);
  });

  it("does not treat a local machine as hosted production", () => {
    assert.equal(isProduction(), false);
    assert.equal(canPersistContent(), true);
    assert.notEqual(persistenceMode(), "seed-only");
  });
});

describe("T-admin-unauth-blocked", () => {
  it("rejects a missing session", () => {
    assert.throws(() => assertAdminSession(null), /sign in/i);
  });
});

describe("T-admin-auth-allows", () => {
  it("accepts a signed-in admin session", () => {
    const session = assertAdminSession({ user: { email: "admin@localhost" } });
    assert.equal(session.user?.email, "admin@localhost");
  });
});

describe("T-retired-offer-cards-removed", () => {
  it("drops the retired tutoring offer, focus and extra-text ids from stored documents", () => {
    const content = createSeedContent();
    const parsed = parseSiteContent({
      ...content,
      services: [
        {
          id: "ks3",
          title: "Key Stage 3 English",
          summary: "Reading, writing and confidence before the GCSE years.",
          detail: "Support for Years 7 to 9.",
          price: null,
          priceSuffix: null,
          duration: null,
          groupSize: null,
          enabled: true,
          order: 0,
        },
        {
          id: "example-offer",
          title: "Example offer",
          summary: "A later offer added in admin.",
          detail: "This one should remain.",
          price: null,
          priceSuffix: null,
          duration: null,
          groupSize: null,
          enabled: true,
          order: 1,
        },
      ],
      offerFocuses: [
        {
          id: "exam-technique",
          label: "Exam technique",
          enabled: true,
          order: 0,
        },
        {
          id: "later-focus",
          label: "A later focus",
          enabled: true,
          order: 1,
        },
      ],
      tutoredTexts: [
        {
          id: "inspector-calls",
          title: "An Inspector Calls",
          note: null,
          enabled: true,
          order: 0,
        },
        {
          id: "later-text",
          title: "A later text",
          note: null,
          enabled: true,
          order: 1,
        },
      ],
    });
    assert.deepEqual(
      parsed.services.map((service) => service.id),
      ["example-offer"],
    );
    assert.equal(parsed.services[0]?.order, 0);
    assert.deepEqual(
      parsed.offerFocuses.map((item) => item.id),
      ["later-focus"],
    );
    assert.deepEqual(
      parsed.tutoredTexts.map((item) => item.id),
      ["later-text"],
    );
  });
});

describe("T-schema-additive-defaults", () => {
  it("fills missing list fields on older stored documents", () => {
    const v1 = createV1SeedInput();
    const parsed = parseSiteContent({
      ...v1,
      offerFocuses: undefined,
      tutoredTexts: undefined,
      aboutSections: undefined,
    });
    assert.deepEqual(parsed.offerFocuses, []);
    assert.deepEqual(parsed.tutoredTexts, []);
    assert.equal(parsed.pages.about.sections.filter((section) => section.type === "prose").length, 0);
  });
});

describe("T-admin-validate-reject", () => {
  it("rejects unsafe text, bad emails and invented youtube ids", () => {
    const content = createV1SeedInput();
    assert.equal(
      siteContentSchema.safeParse({
        ...parseSiteContent(content),
        pages: {
          ...parseSiteContent(content).pages,
          home: {
            sections: parseSiteContent(content).pages.home.sections.map((section) =>
              section.type === "hero"
                ? { ...section, heading: "<script>alert(1)</script>" }
                : section,
            ),
          },
        },
      }).success,
      false,
    );
    assert.equal(
      siteContentSchema.safeParse({
        ...content,
        site: { ...content.site, enquiryEmail: "not-an-email" },
      }).success,
      false,
    );
    assert.equal(parseYoutubeId("not-a-valid-youtube-id"), null);
  });
});

describe("T-xss-escaped", () => {
  it("rejects javascript URLs in safe hrefs and markup in copy", () => {
    assert.equal(getSafeHref("javascript:alert(1)"), null);
    assert.equal(getSafeHref("/revision"), "/revision");
    const content = createSeedContent();
    const result = siteContentSchema.safeParse({
      ...content,
      seo: { ...content.seo, defaultDescription: "Hello javascript:alert(1)" },
    });
    assert.equal(result.success, false);
    assert.equal(
      siteContentSchema.safeParse({
        ...content,
        seo: { ...content.seo, defaultDescription: "</script><img onerror=alert(1)>" },
      }).success,
      false,
    );
    const encoded = serializeJsonLd({ name: "</script><img onerror=alert(1)>" });
    assert.match(encoded, /\\u003c/);
    assert.equal(encoded.includes("<"), false);
  });
});

describe("T-admin-toggle-hides", () => {
  it("hides testimonials unless the section is on and a quote exists", () => {
    const content = createSeedContent();
    const withQuote = parseSiteContent({
      ...content,
      testimonials: [
        {
          id: "quote-1",
          quote: "Clear explanations.",
          attribution: "Parent of a GCSE student",
          context: null,
          enabled: true,
          order: 0,
        },
      ],
      pages: {
        ...content.pages,
        home: {
          sections: content.pages.home.sections.map((section) =>
            section.type === "testimonials" ? { ...section, enabled: true } : section,
          ),
        },
      },
    });
    assert.equal(getVisibleTestimonials(withQuote).length, 1);
    const hiddenSection = withQuote.pages.home.sections.find(
      (section) => section.type === "testimonials",
    );
    assert.ok(hiddenSection && hiddenSection.type === "testimonials");
    assert.equal(
      getVisibleTestimonials({
        ...withQuote,
        pages: {
          ...withQuote.pages,
          home: {
            sections: withQuote.pages.home.sections.map((section) =>
              section.type === "testimonials" ? { ...section, enabled: false } : section,
            ),
          },
        },
      }).length,
      1,
    );
    assert.equal(hiddenSection.enabled, true);
  });
});

describe("T-store-read-failure-does-not-seed", () => {
  it("does not treat a corrupt content file as empty seed", async () => {
    const folder = await mkdtemp(path.join(tmpdir(), "mrs-gill-corrupt-"));
    const file = path.join(folder, "site-content.json");
    const previous = process.env.CONTENT_DATA_PATH;
    process.env.CONTENT_DATA_PATH = file;
    try {
      await writeFile(file, "{not-valid-json", "utf8");
      await assert.rejects(() => readStoredContent(), /JSON|Unexpected|invalid/i);
    } finally {
      process.env.CONTENT_DATA_PATH = previous;
      await rm(folder, { recursive: true, force: true });
    }
  });
});

describe("T-admin-save-persists", () => {
  it("writes and reads the same content document", async () => {
    const folder = await mkdtemp(path.join(tmpdir(), "mrs-gill-content-"));
    const file = path.join(folder, "site-content.json");
    const previous = process.env.CONTENT_DATA_PATH;
    process.env.CONTENT_DATA_PATH = file;
    try {
      const seed = createSeedContent();
      const next = parseSiteContent({
        ...seed,
        pages: {
          ...seed.pages,
          home: {
            sections: seed.pages.home.sections.map((section) =>
              section.type === "hero"
                ? { ...section, heading: "English, clearly explained." }
                : section,
            ),
          },
        },
      });
      await writeStoredContent(next);
      const stored = JSON.parse(await readFile(file, "utf8"));
      const storedHero = stored.pages.home.sections.find((section: { type: string }) => section.type === "hero");
      assert.equal(storedHero.heading, "English, clearly explained.");
      const fresh = await readStoredContent();
      assert.equal(getHeroSection(fresh)?.heading, "English, clearly explained.");
    } finally {
      process.env.CONTENT_DATA_PATH = previous;
      await rm(folder, { recursive: true, force: true });
    }
  });
});

describe("T-cache-refresh-after-save", () => {
  it("revalidates the public content tag after a save", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(new URL("../src/lib/content/store.ts", import.meta.url), "utf8"),
    );
    assert.match(source, /revalidateTag\(CONTENT_TAG, "max"\)/);
    assert.match(source, /revalidatePath\("\/", "layout"\)/);
    assert.match(source, /revalidatePath\("\/about"\)/);
  });
});

describe("T-admin-action-reauth", () => {
  it("requires a fresh admin check before every content save", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(new URL("../src/app/admin/actions.ts", import.meta.url), "utf8"),
    );
    assert.match(source, /async function persist[\s\S]*await requireAdmin\(\)/);
  });
});

describe("T-logout", () => {
  it("documents sign-out as a dedicated admin action", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile(new URL("../src/app/admin/actions.ts", import.meta.url), "utf8"),
    );
    assert.match(source, /export async function logoutAction/);
    assert.match(source, /signOut\(\{ redirectTo: "\/admin\/login" \}\)/);
  });
});
