import type { Metadata } from "next";
import { PageSections } from "@/components/sections/PageSections";
import { getSiteContent } from "@/lib/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: "Privacy",
    description: `How ${content.site.name} treats privacy on this website.`,
    alternates: { canonical: "/privacy" },
  };
}

export default async function PrivacyPage() {
  const content = await getSiteContent();

  return (
    <main id="main">
      <PageSections content={content} page="privacy" />
    </main>
  );
}
