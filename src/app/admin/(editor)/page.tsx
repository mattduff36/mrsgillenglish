import Link from "next/link";
import { getSiteContent } from "@/lib/content/store";

export default async function AdminHomePage() {
  const content = await getSiteContent();
  const gaps = [
    !content.site.enquiryEmail && "Public enquiry email",
    !content.site.lessonFormat && "Online, in person, or both",
    !content.site.availability && "Availability wording",
    content.aboutSections.length === 0 && "A longer biography in Mrs Gill's words",
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
          Update the public site after new answers arrive. Saved changes appear
          on the website shortly. Leave unknown facts blank. A stored content
          document overrides the seed until it is replaced.
        </p>
      </div>

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
          ["/admin/settings", "Add contact and lesson format"],
          ["/admin/about", "Paste the biography"],
          ["/admin/services", "Confirm tutoring offers and prices"],
          ["/admin/testimonials", "Add approved quotes only"],
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
