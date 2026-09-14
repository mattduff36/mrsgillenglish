import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getRenderableSections,
  sectionHasContent,
  selectTestimonials,
  selectVideos,
} from "../src/lib/content/accessors";
import { isAllowedImageRef } from "../src/lib/content/images";
import { homepageVideoPickIds, toV1SiteContent } from "../src/lib/content/pages";
import { PRIVACY_COMMENTS_PARAGRAPH, PRIVACY_INTRO_PARAGRAPHS } from "../src/lib/content/privacy-copy";
import {
  parseSiteContent,
  storedContentSchema,
  v1StoredSchema,
  type PageSection,
} from "../src/lib/content/schema";
import { parseSectionsFormData } from "../src/lib/content/sections-form";
import { createSeedContent, createV1SeedInput } from "../src/lib/content/seed";

function typesOf(sections: PageSection[]) {
  return sections.map((section) => section.type);
}

describe("T-schema-v1-v2-discriminated-normalise", () => {
  it("parses v1 and v2 and normalises to v2; mixed shapes fail", () => {
    const v1 = createV1SeedInput();
    const fromV1 = parseSiteContent(v1);
    assert.equal(fromV1.version, 2);
    assert.ok(fromV1.pages.home.sections.length > 0);

    const fromV2 = parseSiteContent(fromV1);
    assert.equal(fromV2.version, 2);
    assert.deepEqual(typesOf(fromV2.pages.home.sections), typesOf(fromV1.pages.home.sections));

    assert.equal(storedContentSchema.safeParse({ ...v1, pages: fromV1.pages }).success, false);
    assert.equal(storedContentSchema.safeParse({ ...fromV1, homepage: v1.homepage }).success, false);
  });
});

describe("T-pages-v1-hydrates-current-layout", () => {
  it("hydrates stored v1 copy into the current public section order and visibility", () => {
    const v1 = createV1SeedInput();
    const content = parseSiteContent(v1);
    const home = content.pages.home.sections;

    assert.deepEqual(typesOf(home), [
      "hero",
      "textImage",
      "tutoring",
      "videos",
      "testimonials",
      "prose",
    ]);
    assert.equal(home[0]?.enabled, true);
    assert.equal(home[1]?.enabled, v1.features.showAbout);
    assert.equal(home[2]?.enabled, true);
    assert.equal(home[3]?.enabled, v1.features.showVideos);
    assert.equal(home[4]?.enabled, v1.features.showTestimonials);
    assert.equal(home[5]?.enabled, false);
    assert.equal(home[0] && home[0].type === "hero" && home[0].heading, v1.homepage.heroHeading);
    assert.equal(home[3] && home[3].type === "videos" && home[3].selection, "picked");
    assert.deepEqual(
      home[3] && home[3].type === "videos" ? home[3].itemIds : [],
      homepageVideoPickIds(v1.videos),
    );

    const about = content.pages.about.sections;
    assert.equal(about[0]?.type, "textImage");
    assert.equal(about.filter((section) => section.type === "prose").length, 4);
    assert.equal(about.at(-1)?.type, "cta");

    const revision = content.pages.revision.sections;
    assert.deepEqual(typesOf(revision), ["cta", "playlists", "revisionCatalogue"]);

    const privacy = content.pages.privacy.sections;
    assert.equal(privacy[0] && privacy[0].type === "prose" && privacy[0].body, PRIVACY_INTRO_PARAGRAPHS.join("\n\n"));
    assert.equal(privacy[1]?.type, "privacyContact");
    assert.equal(privacy[2] && privacy[2].type === "prose" && privacy[2].body, PRIVACY_COMMENTS_PARAGRAPH);

    assert.deepEqual(
      getRenderableSections(content, "home").map((section) => section.type),
      ["hero", "textImage", "tutoring", "videos"],
    );
  });
});

describe("T-pages-section-palette-roundtrip", () => {
  it("adds, moves, disables, removes and resets sections through form data", () => {
    const seed = createSeedContent();
    const start = seed.pages.home.sections;
    const form = new FormData();
    form.set("count", String(start.length));
    start.forEach((section, index) => {
      form.set(`type-${index}`, section.type);
      form.set(`id-${index}`, section.id);
      if (section.enabled) form.set(`enabled-${index}`, "on");
      if (section.type === "hero") {
        form.set(`heading-${index}`, section.heading);
        form.set(`supporting-${index}`, section.supporting);
        form.set(`bannerSrc-${index}`, section.bannerSrc ?? "");
        form.set(`bannerAlt-${index}`, section.bannerAlt);
        form.set(`profileSrc-${index}`, section.profileSrc ?? "");
        form.set(`profileAlt-${index}`, section.profileAlt);
        form.set(`primaryCtaLabel-${index}`, section.primaryCtaLabel ?? "");
        form.set(`primaryCtaHref-${index}`, section.primaryCtaHref ?? "");
        form.set(`secondaryCtaLabel-${index}`, section.secondaryCtaLabel ?? "");
        form.set(`secondaryCtaHref-${index}`, section.secondaryCtaHref ?? "");
      }
      if (section.type === "textImage") {
        form.set(`heading-${index}`, section.heading);
        form.set(`body-${index}`, section.body);
        form.set(`imageSrc-${index}`, section.imageSrc ?? "");
        form.set(`imageAlt-${index}`, section.imageAlt);
        form.set(`imageSide-${index}`, section.imageSide);
        if (section.showCredentials) form.set(`showCredentials-${index}`, "on");
      }
      if (section.type === "tutoring") {
        form.set(`heading-${index}`, section.heading);
        form.set(`intro-${index}`, section.intro);
        form.set(`enquiryFallback-${index}`, section.enquiryFallback);
        form.set(`showLessonMeta-${index}`, "on");
        form.set(`showFocuses-${index}`, "on");
        form.set(`showTutoredTexts-${index}`, "on");
        form.set(`showEnquiry-${index}`, "on");
      }
      if (section.type === "videos") {
        form.set(`heading-${index}`, section.heading);
        form.set(`intro-${index}`, section.intro);
        form.set(`selection-${index}`, section.selection);
        for (const id of section.itemIds) form.append(`itemIds-${index}`, id);
        form.set(`showRevisionCta-${index}`, "on");
      }
      if (section.type === "testimonials") {
        form.set(`heading-${index}`, section.heading);
        form.set(`selection-${index}`, section.selection);
      }
      if (section.type === "prose") {
        form.set(`heading-${index}`, section.heading ?? "");
        form.set(`body-${index}`, section.body);
      }
    });
    form.set("add", "1");
    form.set("addType", "prose");
    const added = parseSectionsFormData(form);
    assert.equal(added.at(-1)?.type, "prose");
    assert.equal(added.length, start.length + 1);

    const moved = parseSiteContent({
      ...seed,
      pages: {
        ...seed.pages,
        home: { sections: added.map((section, order) => ({ ...section, order })) },
      },
    });
    assert.equal(moved.pages.home.sections.at(-1)?.type, "prose");

    const disabled = parseSiteContent({
      ...moved,
      pages: {
        ...moved.pages,
        home: {
          sections: moved.pages.home.sections.map((section, order) =>
            section.type === "hero" ? { ...section, enabled: false, order } : { ...section, order },
          ),
        },
      },
    });
    assert.equal(disabled.pages.home.sections[0]?.enabled, false);

    const withoutHero = parseSiteContent({
      ...disabled,
      pages: {
        ...disabled.pages,
        home: {
          sections: disabled.pages.home.sections
            .filter((section) => section.type !== "hero")
            .map((section, order) => ({ ...section, order })),
        },
      },
    });
    assert.equal(withoutHero.pages.home.sections.some((section) => section.type === "hero"), false);

    const reset = parseSiteContent({
      ...withoutHero,
      pages: { ...withoutHero.pages, home: seed.pages.home },
    });
    assert.deepEqual(typesOf(reset.pages.home.sections), typesOf(seed.pages.home.sections));
  });
});

describe("T-pages-catalogue-selection", () => {
  it("filters all, featured and picked videos, and hides an empty pick", () => {
    const content = createSeedContent();
    const all = selectVideos(content, "all", []);
    const featured = selectVideos(content, "featured", []);
    const picked = selectVideos(content, "picked", [content.videos[0]!.id]);
    assert.ok(all.length > featured.length);
    assert.equal(featured.length, 2);
    assert.equal(picked.length, 1);

    const emptySection = content.pages.home.sections.find((section) => section.type === "videos");
    assert.ok(emptySection && emptySection.type === "videos");
    const hidden = { ...emptySection, selection: "picked" as const, itemIds: [] };
    assert.equal(sectionHasContent(content, hidden), false);
    assert.equal(selectTestimonials(content, "all", []).length, 0);
  });
});

describe("T-pages-image-ref-rejected", () => {
  it("accepts local brand paths and safe https, and rejects unsafe refs", () => {
    assert.equal(isAllowedImageRef("/images/mrs-gill-portrait.jpg"), true);
    assert.equal(isAllowedImageRef("/brand/youtube-banner.jpg"), true);
    assert.equal(isAllowedImageRef("https://example.com/photo.jpg"), true);
    assert.equal(isAllowedImageRef("javascript:alert(1)"), false);
    assert.equal(isAllowedImageRef("data:image/png;base64,aaaa"), false);
    assert.equal(isAllowedImageRef("/images/../secret.jpg"), false);
    assert.equal(isAllowedImageRef("/videos/not-allowed.jpg"), false);
    assert.equal(isAllowedImageRef("http://example.com/photo.jpg"), false);
    assert.equal(isAllowedImageRef("https://localhost/photo.jpg"), false);
    assert.equal(isAllowedImageRef("https://127.0.0.1/photo.jpg"), false);
    assert.equal(isAllowedImageRef("<script>"), false);
  });
});

describe("T-section-formdata-exhaustive", () => {
  it("maps known types and rejects unknown ones", () => {
    const form = new FormData();
    form.set("count", "1");
    form.set("type-0", "not-a-type");
    form.set("id-0", "sec-1");
    assert.throws(() => parseSectionsFormData(form), /Unknown section type/);

    const privacy = new FormData();
    privacy.set("count", "1");
    privacy.set("type-0", "privacyContact");
    privacy.set("id-0", "privacy-contact");
    privacy.set("enabled-0", "on");
    const parsed = parseSectionsFormData(privacy);
    assert.equal(parsed[0]?.type, "privacyContact");
    assert.equal("heading" in (parsed[0] ?? {}), false);
  });
});

describe("T-rollback-v2-to-v1", () => {
  it("down-converts a v2 document so current v1 schema can read it", () => {
    const v2 = createSeedContent();
    const v1 = toV1SiteContent(v2);
    const parsed = v1StoredSchema.parse(v1);
    assert.equal(parsed.version, 1);
    assert.equal(parsed.homepage.heroHeading, v2.rollback.homepage.heroHeading);
    assert.equal(parsed.aboutSections.length, 4);
    assert.equal("pages" in parsed, false);
  });
});
