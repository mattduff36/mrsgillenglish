import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";
import { site } from "../src/content/site";
import { routes } from "../src/lib/site-url";

describe("optional public features", () => {
  it("hides booking until a url is supplied", () => {
    assert.equal(site.bookingUrl, null);
  });

  it("does not invent a phone number", () => {
    assert.equal(site.phone, null);
  });

  it("points YouTube at the researched handle", () => {
    assert.equal(site.youtube.handle, "@MrsGillEnglish");
    assert.equal(site.youtube.url, "https://www.youtube.com/@MrsGillEnglish");
  });

  it("lists only public routes in the sitemap helper", () => {
    assert.deepEqual([...routes], ["/", "/revision", "/privacy"]);
    assert.ok(!routes.includes("/admin" as (typeof routes)[number]));
  });

  it("tells crawlers to stay out of /admin", async () => {
    const source = await readFile(new URL("../src/app/robots.ts", import.meta.url), "utf8");
    assert.match(source, /disallow: \["\/admin"/);
  });
});
