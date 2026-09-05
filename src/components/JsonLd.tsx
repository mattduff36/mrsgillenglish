import type { SiteContent } from "@/lib/content/schema";
import { serializeJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site-url";

export function JsonLd({ content }: { content: SiteContent }) {
  const url = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: content.site.name,
    url,
    description: content.seo.defaultDescription,
    inLanguage: "en-GB",
    publisher: {
      "@type": "Organization",
      name: content.site.name,
      sameAs: [content.site.youtubeUrl],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
