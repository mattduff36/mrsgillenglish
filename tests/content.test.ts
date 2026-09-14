import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { publishedPrices, services } from "../src/content/services";
import { getEnquiryMailto, portrait, routes, site, tutoringIllustration } from "../src/content/site";
import {
  videoFocuses,
  videoThumbnailPath,
  videoTopics,
  videos,
  youtubeWatchUrl,
} from "../src/content/videos";

describe("site content", () => {
  it("uses the requested public brand name", () => {
    assert.equal(site.name, "Mrs Gill English");
    assert.notEqual(site.name, site.youtubeName);
  });

  it("publishes the confirmed enquiry email", () => {
    assert.equal(site.enquiryEmail, "mrsgillenglishteacher@gmail.com");
    assert.equal(getEnquiryMailto(), "mailto:mrsgillenglishteacher@gmail.com");
  });

  it("does not seed the retired tutoring offer cards", () => {
    assert.equal(services.length, 0);
    assert.equal(publishedPrices.length, 0);
  });

  it("lists the product routes", () => {
    assert.deepEqual([...routes], ["/", "/about", "/revision", "/privacy"]);
  });

  it("keeps a web-sized professional portrait on disk", () => {
    const file = path.join(process.cwd(), "public", portrait.src.replace(/^\//, ""));
    assert.ok(existsSync(file), `missing portrait ${file}`);
  });

  it("keeps the tutoring desk illustration on disk", () => {
    const file = path.join(process.cwd(), "public", tutoringIllustration.src.replace(/^\//, ""));
    assert.ok(existsSync(file), `missing tutoring illustration ${file}`);
  });
});

describe("video catalogue", () => {
  it("has unique valid YouTube ids", () => {
    const ids = videos.map((video) => video.id);
    assert.equal(new Set(ids).size, ids.length);
    for (const id of ids) {
      assert.match(id, /^[\w-]{11}$/);
      assert.match(youtubeWatchUrl(id), /^https:\/\/www\.youtube\.com\/watch\?v=/);
    }
  });

  it("uses only evidenced topics and focuses", () => {
    for (const video of videos) {
      assert.ok(videoTopics.includes(video.topic));
      assert.ok(videoFocuses.includes(video.focus));
      assert.ok(video.title.length > 8);
    }
  });

  it("features the requested Macbeth Paper 1 films", () => {
    const featured = videos.filter((video) => video.featured).map((video) => video.id);
    assert.deepEqual(featured, ["Jbd5sRUKOVs", "XH8lv1R4x_w"]);
  });

  it("has a local thumbnail for every video", () => {
    const root = path.join(process.cwd(), "public");
    for (const video of videos) {
      const file = path.join(root, videoThumbnailPath(video.id).replace(/^\//, ""));
      assert.ok(existsSync(file), `missing thumbnail ${file}`);
    }
  });
});
