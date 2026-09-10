import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { portrait } from "@/content/site";
import {
  getEnquiryHref,
  getVisibleAboutSections,
  getVisibleCredentials,
} from "@/lib/content/accessors";
import { getSiteContent } from "@/lib/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: "About",
    description: content.homepage.aboutShort,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const content = await getSiteContent();
  const enquiry = getEnquiryHref(content);
  const sections = getVisibleAboutSections(content);
  const credentials = getVisibleCredentials(content);

  return (
    <main id="main" className="py-14 md:py-20">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <figure className="overflow-hidden rounded-xl bg-parchment shadow-[0_18px_40px_-24px_rgb(28_36_51_/_0.45)]">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                className="h-auto w-full"
                sizes="(min-width: 768px) 420px, 90vw"
                priority
              />
            </figure>
          </div>
          <div className="md:col-span-7">
            <h1 className="font-display text-4xl font-semibold text-navy md:text-5xl">
              {content.homepage.aboutHeading}
            </h1>
            <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
              {content.homepage.aboutShort}
            </p>
            {credentials.length ? (
              <ul className="mt-6 space-y-2 text-ink-soft">
                {credentials.map((item) => (
                  <li key={item.id}>
                    <span className="font-semibold text-navy">{item.label}: </span>
                    {item.detail}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        {sections.length ? (
          <div className="mt-16 space-y-12 border-t border-line pt-12">
            {sections.map((section) => (
              <section key={section.id} className="max-w-[65ch]">
                <h2 className="font-display text-3xl font-semibold text-navy">
                  {section.heading}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{section.body}</p>
              </section>
            ))}
          </div>
        ) : null}

        <div className="mt-14 flex flex-wrap gap-3">
          {enquiry ? <ButtonLink href={enquiry}>Enquire about tutoring</ButtonLink> : null}
          <ButtonLink href="/#tutoring" variant="secondary">
            How tutoring works
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
