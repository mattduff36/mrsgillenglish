import type { Metadata } from "next";
import { PageSections } from "@/components/sections/PageSections";
import { getAboutDescription } from "@/lib/content/accessors";
import { getSiteContent } from "@/lib/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: "About",
    description: getAboutDescription(content),
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <main id="main">
      <PageSections content={content} page="about" />
    </main>
  );
}
