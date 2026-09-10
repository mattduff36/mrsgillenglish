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
import { parseYoutubeId, siteContentSchema } from "../src/lib/content/schema";
import { createSeedContent } from "../src/lib/content/seed";
import { serializeJsonLd } from "../src/lib/json-ld";

describe("T-public-seed-renders", () => {
  it("keeps the first-version copy and brand", () => {
    const content = createSeedContent();
    assert.equal(content.site.name, "Mrs Gill English");
    assert.match(content.homepage.heroHeading, /Building confidence in English/);
    assert.equal(content.site.enquiryEmail, "mrsgillenglishteacher@gmail.com");
    assert.equal(content.services.length, 4);
    assert.equal(content.videos.length, 16);
    assert.equal(content.aboutSections.length, 4);
    assert.equal(content.testimonials.length, 0);
    assert.equal(content.features.showPricing, true);
    assert.equal(content.features.showTestimonials, false);
    assert.match(content.homepage.heroSupporting, /KS3 and GCSE\.$/);
    assert.equal(content.homepage.heroSupporting.includes("plus free Edexcel"), false);
  });
});

describe("T-optional-hidden", () => {
  it("hides enquiry, prices, testimonials and empty video grids when switched off", () => {
    const content = createSeedContent();
    assert.ok(getEnquiryHref(content)?.startsWith("mailto:"));
    assert.ok(getPricedServices(content).length >= 1);
    assert.equal(getVisibleTestimonials(content).length, 0);
    assert.ok(getVisibleVideos(content).length > 0);

    const hiddenOffer = {
      ...content,
      features: { ...content.features, enableEnquiry: false, showPricing: false },
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

describe("T-schema-additive-defaults", () => {
  it("fills missing list fields on older stored documents", () => {
    const content = createSeedContent();
    const parsed = siteContentSchema.parse({
      ...content,
      offerFocuses: undefined,
      tutoredTexts: undefined,
      aboutSections: undefined,
    });
    assert.deepEqual(parsed.offerFocuses, []);
    assert.deepEqual(parsed.tutoredTexts, []);
    assert.deepEqual(parsed.aboutSections, []);
  });
});

describe("T-admin-validate-reject", () => {
  it("rejects unsafe text, bad emails and invented youtube ids", () => {
    const content = createSeedContent();
    assert.equal(
      siteContentSchema.safeParse({
        ...content,
        homepage: { ...content.homepage, heroHeading: "<script>alert(1)</script>" },
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
      homepage: { ...content.homepage, aboutShort: "Hello javascript:alert(1)" },
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
    const withQuote = {
      ...content,
      features: { ...content.features, showTestimonials: true },
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
    };
    assert.equal(getVisibleTestimonials(withQuote).length, 1);
    assert.equal(
      getVisibleTestimonials({
        ...withQuote,
        features: { ...withQuote.features, showTestimonials: false },
      }).length,
      0,
    );
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
      const next = siteContentSchema.parse({
        ...seed,
        homepage: { ...seed.homepage, heroHeading: "English, clearly explained." },
      });
      await writeStoredContent(next);
      const stored = JSON.parse(await readFile(file, "utf8"));
      assert.equal(stored.homepage.heroHeading, "English, clearly explained.");
      const fresh = await readStoredContent();
      assert.equal(fresh.homepage.heroHeading, "English, clearly explained.");
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
