import type { Metadata } from "next";
import { PageSections } from "@/components/sections/PageSections";
import { getSiteContent } from "@/lib/content/store";

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: { canonical: "/" } };
}

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <main id="main">
      <PageSections content={content} page="home" />
    </main>
  );
}
