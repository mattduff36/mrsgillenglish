import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PublicChrome } from "@/components/PublicChrome";
import { getSiteContent } from "@/lib/content/store";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const url = getSiteUrl();

  return {
    metadataBase: new URL(url),
    title: {
      default: content.seo.defaultTitle,
      template: `%s | ${content.site.name}`,
    },
    description: content.seo.defaultDescription,
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: content.site.name,
      title: content.seo.defaultTitle,
      description: content.seo.socialDescription,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.defaultTitle,
      description: content.seo.socialDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <PublicChrome>{children}</PublicChrome>;
}
