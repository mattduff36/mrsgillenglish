import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { VideoCard } from "@/components/VideoCard";
import {
  getEnquiryHref,
  getFeaturedVideos,
  getSafeHref,
  getVisibleCredentials,
  getVisibleServices,
  getVisibleTestimonials,
  getVisibleVideos,
  lessonFormatLabels,
} from "@/lib/content/accessors";
import { getSiteContent } from "@/lib/content/store";

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: { canonical: "/" } };
}

export default async function HomePage() {
  const content = await getSiteContent();
  const enquiry = getEnquiryHref(content);
  const primaryHref = getSafeHref(content.homepage.primaryCtaHref);
  const secondaryHref = getSafeHref(content.homepage.secondaryCtaHref);
  const services = getVisibleServices(content);
  const featured = getFeaturedVideos(content);
  const recent = getVisibleVideos(content)
    .filter((video) => !video.featured)
    .slice(0, 4);
  const testimonials = getVisibleTestimonials(content);
  const credentials = getVisibleCredentials(content);
  const format = content.site.lessonFormat
    ? lessonFormatLabels[content.site.lessonFormat]
    : null;

  return (
    <main id="main">
      <section className="relative overflow-hidden border-b border-line bg-taupe">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[url('/brand/youtube-banner.jpg')] bg-cover bg-[center_20%] opacity-40"
        />
        <Container className="relative grid items-center gap-10 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <h1 className="max-w-xl font-display text-4xl font-semibold leading-[1.15] tracking-tight text-navy md:text-5xl lg:text-6xl">
              {content.homepage.heroHeading}
            </h1>
            <p className="mt-5 max-w-[36ch] text-lg leading-relaxed text-ink-soft">
              {content.homepage.heroSupporting}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryHref ? (
                <ButtonLink href={primaryHref}>{content.homepage.primaryCtaLabel}</ButtonLink>
              ) : null}
              {secondaryHref ? (
                <ButtonLink href={secondaryHref} variant="secondary">
                  {content.homepage.secondaryCtaLabel}
                </ButtonLink>
              ) : null}
            </div>
          </div>

          <div className="md:col-span-5">
            <figure className="mx-auto max-w-sm rounded-xl bg-parchment p-5 shadow-[0_18px_40px_-24px_rgb(28_36_51_/_0.45)]">
              <Image
                src="/brand/youtube-profile.jpg"
                alt="Illustrated portrait used on the Mrs Gill English YouTube channel: a woman in a navy jacket and white ruffled blouse."
                width={160}
                height={160}
                className="mx-auto size-40 rounded-full object-cover"
                priority
              />
              <figcaption className="mt-5 text-center">
                <p className="font-display text-2xl font-semibold text-navy">
                  {content.site.name}
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  Also on YouTube as {content.site.youtubeName}
                </p>
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section id="tutoring" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <h2 className="max-w-xl font-display text-3xl font-semibold text-navy md:text-4xl">
            {content.homepage.tutoringHeading}
          </h2>
          <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
            {content.homepage.tutoringIntro}
          </p>
          {format || content.site.serviceArea || content.site.availability ? (
            <ul className="mt-5 max-w-[62ch] space-y-1 text-ink-soft">
              {format ? <li>Lessons: {format}</li> : null}
              {content.site.serviceArea ? <li>Area: {content.site.serviceArea}</li> : null}
              {content.site.availability ? (
                <li>Availability: {content.site.availability}</li>
              ) : null}
            </ul>
          ) : null}

          {services.length ? (
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
              {services.map((service) => (
                <article key={service.id} className="bg-page p-6 md:p-8">
                  <h3 className="font-display text-2xl font-semibold text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-2 font-medium text-brass-deep">{service.summary}</p>
                  <p className="mt-4 max-w-[55ch] leading-relaxed text-ink-soft">
                    {service.detail}
                  </p>
                  {content.features.showPricing && service.price ? (
                    <p className="mt-4 font-semibold text-navy">
                      {service.price}
                      {service.priceSuffix ? ` ${service.priceSuffix}` : ""}
                      {service.duration ? ` · ${service.duration}` : ""}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          ) : null}

          {enquiry ? (
            <div className="mt-10">
              <ButtonLink href={enquiry}>Enquire about tutoring</ButtonLink>
            </div>
          ) : content.features.enableEnquiry ? (
            <p className="mt-10 max-w-[60ch] text-ink-soft">
              {content.homepage.enquiryFallback}
            </p>
          ) : null}
        </Container>
      </section>

      {content.literatureTexts.length ? (
        <section className="bg-navy py-16 text-navy-foreground md:py-20">
          <Container>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              {content.homepage.textsHeading}
            </h2>
            <p className="mt-4 max-w-[60ch] text-lg text-parchment/90">
              {content.homepage.textsIntro}
            </p>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {content.literatureTexts.map((text) => (
                <li key={text.topic} className="border-t border-brass/50 pt-4">
                  <p className="font-display text-2xl italic text-parchment">{text.title}</p>
                  <p className="mt-2 text-parchment/85">{text.note}</p>
                  {content.features.showVideos ? (
                    <Link
                      href="/revision"
                      className="mt-3 inline-flex items-center gap-1 font-semibold text-parchment underline decoration-brass underline-offset-4"
                    >
                      Watch the {text.title} videos
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {content.features.showVideos && (featured.length || recent.length) ? (
        <section className="py-16 md:py-24">
          <Container>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-xl font-display text-3xl font-semibold text-navy md:text-4xl">
                {content.homepage.videosHeading}
              </h2>
              <ButtonLink href="/revision" variant="ghost">
                All curated videos
              </ButtonLink>
            </div>
            <p className="mt-4 max-w-[62ch] text-lg text-ink-soft">
              {content.homepage.videosIntro}
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {featured.map((video) => (
                <VideoCard key={video.id} video={video} featured />
              ))}
              {recent.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {content.features.showAbout ? (
        <section id="about" className="scroll-mt-24 border-t border-line bg-parchment py-16 md:py-24">
          <Container className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Image
                src="/brand/youtube-profile.jpg"
                alt="The illustrated Mrs Gill English portrait from the YouTube channel."
                width={160}
                height={160}
                className="size-36 rounded-full object-cover md:size-44"
              />
            </div>
            <div className="md:col-span-8">
              <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
                {content.homepage.aboutHeading}
              </h2>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
                {content.homepage.aboutShort}
              </p>
              {content.homepage.aboutLong ? (
                <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
                  {content.homepage.aboutLong}
                </p>
              ) : null}
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
              <p className="mt-6">
                <a
                  href={content.site.youtubeUrl}
                  className="font-semibold text-navy underline decoration-brass decoration-2 underline-offset-4"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  Visit the YouTube channel
                </a>
              </p>
            </div>
          </Container>
        </section>
      ) : null}

      {testimonials.length ? (
        <section className="border-t border-line py-16 md:py-24">
          <Container>
            <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
              What families say
            </h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-2">
              {testimonials.map((item) => (
                <li key={item.id} className="rounded-xl border border-line bg-parchment p-6">
                  <p className="font-display text-xl leading-relaxed text-navy">
                    “{item.quote}”
                  </p>
                  <p className="mt-4 text-sm font-semibold text-brass-deep">
                    {item.attribution}
                    {item.context ? ` · ${item.context}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {content.features.showResourcesTeaser && content.homepage.resourcesTeaser ? (
        <section className="border-t border-line bg-parchment py-16">
          <Container className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-navy">Resources</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {content.homepage.resourcesTeaser}
            </p>
          </Container>
        </section>
      ) : null}

    </main>
  );
}
