import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Mrs Gill",
    description: site.shortDescription,
    start_url: "/",
    display: "browser",
    background_color: "#F4EFE8",
    theme_color: "#2C3849",
  };
}
