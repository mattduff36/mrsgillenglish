import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { publishedPrices, services } from "../src/content/services";
import { getEnquiryMailto, routes, site } from "../src/content/site";
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

  it("keeps enquiry unpublished until an email exists", () => {
    assert.equal(site.enquiryEmail, null);
    assert.equal(getEnquiryMailto(), null);
  });

  it("does not publish prices", () => {
    assert.equal(publishedPrices.length, 0);
    for (const service of services) {
      assert.equal(service.price, null);
    }
  });

  it("lists the product routes", () => {
    assert.deepEqual([...routes], ["/", "/revision", "/privacy"]);
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

  it("has a local thumbnail for every video", () => {
    const root = path.join(process.cwd(), "public");
    for (const video of videos) {
      const file = path.join(root, videoThumbnailPath(video.id).replace(/^\//, ""));
      assert.ok(existsSync(file), `missing thumbnail ${file}`);
    }
  });
});
