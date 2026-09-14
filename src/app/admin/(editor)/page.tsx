import Link from "next/link";
import { PAGE_PUBLIC_PATH, PAGE_TITLES } from "@/lib/content/pages";
import { PAGE_KEYS } from "@/lib/content/schema";
import { getSiteContent } from "@/lib/content/store";

export default async function AdminHomePage() {
  const content = await getSiteContent();
  const aboutProse = content.pages.about.sections.filter((section) => section.type === "prose");
  const gaps = [
    !content.site.enquiryEmail && "Public enquiry email",
    !content.site.lessonFormat && "Online, in person, or both",
    !content.site.availability && "Availability wording",
    aboutProse.length === 0 && "A longer biography in Mrs Gill's words",
    content.credentials.length === 0 && "Qualifications she wants published",
    content.services.every((item) => !item.price) && "Prices, if they should be public",
    content.testimonials.length === 0 && "Approved testimonials",
    !content.privacy.controllerEmail && "Privacy contact details",
  ].filter(Boolean);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-parchment">Overview</h1>
        <p className="mt-3 max-w-2xl text-parchment/75">
          Edit each public page as a stack of sections. Shared lists such as videos
          and quotes stay in the catalogues. Saved changes appear on the website
          shortly. Leave unknown facts blank.
        </p>
      </div>

      <section className="grid gap-3 sm:grid-cols-2">
        {PAGE_KEYS.map((page) => {
          const sections = content.pages[page].sections;
          const hidden = sections.filter((section) => !section.enabled).length;
          return (
            <article
              key={page}
              className="rounded-xl border border-white/10 bg-navy px-4 py-4"
            >
              <h2 className="font-display text-xl text-parchment">{PAGE_TITLES[page]}</h2>
              <p className="mt-2 text-sm text-parchment/70">
                {sections.length} section{sections.length === 1 ? "" : "s"}
                {hidden ? ` · ${hidden} hidden` : ""}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <Link href={`/admin/${page}`} className="text-parchment underline decoration-brass underline-offset-4">
                  Edit layout
                </Link>
                <a
                  href={PAGE_PUBLIC_PATH[page]}
                  target="_blank"
                  rel="noreferrer"
                  className="text-parchment/80 underline decoration-brass/70 underline-offset-4"
                >
                  View public page
                </a>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-xl border border-white/10 bg-navy p-6">
        <h2 className="font-display text-2xl text-parchment">Still waiting</h2>
        {gaps.length ? (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-parchment/80">
            {gaps.map((item) => (
              <li key={String(item)}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-parchment/80">The usual launch gaps look filled.</p>
        )}
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {[
          ["/admin/settings", "Contact, lesson format and navigation flags"],
          ["/admin/about", "Biography layout and qualifications"],
          ["/admin/services", "Tutoring offers and prices"],
          ["/admin/testimonials", "Approved quotes only"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-white/10 bg-navy px-4 py-4 font-semibold text-parchment hover:bg-white/5"
          >
            {label}
          </Link>
        ))}
      </section>
    </div>
  );
}
