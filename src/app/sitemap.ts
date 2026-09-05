import type { MetadataRoute } from "next";
import { routes, getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return routes.map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: path === "/revision" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
