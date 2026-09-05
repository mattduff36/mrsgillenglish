import Link from "next/link";
import { YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { Container } from "./Container";

type SiteFooterProps = {
  name: string;
  tagline: string;
  youtubeName: string;
  youtubeUrl: string;
  youtubeHandle: string;
  footerNavigation: { href: string; label: string }[];
  enquiryEmail: string | null;
  phone: string | null;
};

export function SiteFooter({
  name,
  tagline,
  youtubeName,
  youtubeUrl,
  youtubeHandle,
  footerNavigation,
  enquiryEmail,
  phone,
}: SiteFooterProps) {
  return (
    <footer className="mt-auto border-t border-navy-deep bg-navy-deep text-navy-foreground">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-2xl font-semibold">{name}</p>
          <p className="mt-3 text-sm leading-relaxed text-parchment/85">
            {tagline ||
              `English tutoring for Key Stage 3 and GCSE, with free revision videos from ${youtubeName}.`}
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-16">
          <nav aria-label="Footer">
            <p className="text-sm font-semibold text-brass">On this site</p>
            <ul className="mt-3 space-y-2">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-parchment hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold text-brass">Revision channel</p>
            <a
              href={youtubeUrl}
              className="mt-3 inline-flex items-center gap-2 text-parchment hover:underline"
              rel="noreferrer noopener"
              target="_blank"
            >
              <YoutubeLogo size={20} weight="fill" aria-hidden />
              YouTube: {youtubeHandle}
            </a>
            {enquiryEmail ? (
              <p className="mt-3">
                <a href={`mailto:${enquiryEmail}`} className="text-parchment hover:underline">
                  {enquiryEmail}
                </a>
              </p>
            ) : null}
            {phone ? (
              <p className="mt-2">
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-parchment hover:underline">
                  {phone}
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
