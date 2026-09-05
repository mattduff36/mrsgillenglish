import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { getEnquiryHref, getPublicNavigation } from "@/lib/content/accessors";
import { getSiteContent } from "@/lib/content/store";

export async function PublicChrome({ children }: { children: React.ReactNode }) {
  const content = await getSiteContent();

  return (
    <>
      <JsonLd content={content} />
      <SkipLink />
      <SiteHeader
        name={content.site.name}
        navigation={getPublicNavigation(content)}
        enquiryHref={getEnquiryHref(content)}
      />
      {children}
      <SiteFooter
        name={content.site.name}
        tagline={content.site.shortDescription}
        youtubeName={content.site.youtubeName}
        youtubeUrl={content.site.youtubeUrl}
        youtubeHandle={content.site.youtubeHandle}
        footerNavigation={content.site.footerNavigation}
        enquiryEmail={content.site.enquiryEmail}
        phone={content.site.phone}
      />
    </>
  );
}
