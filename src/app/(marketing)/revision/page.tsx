import type { Metadata } from "next";
import { PageSections } from "@/components/sections/PageSections";
import { getSiteContent } from "@/lib/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.seo.revisionTitle,
    description: content.seo.revisionDescription,
    alternates: { canonical: "/revision" },
  };
}

export default async function RevisionPage() {
  const content = await getSiteContent();

  return (
    <main id="main">
      <PageSections content={content} page="revision" />
    </main>
  );
}
