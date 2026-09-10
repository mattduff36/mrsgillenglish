import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { VideoCard } from "@/components/VideoCard";
import { portrait } from "@/content/site";
import {
  getEnquiryHref,
  getFeaturedVideos,
  getSafeHref,
  getVisibleCredentials,
  getVisibleOfferFocuses,
  getVisibleServices,
  getVisibleTestimonials,
  getVisibleTutoredTexts,
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
    .slice(0, 2);
  const testimonials = getVisibleTestimonials(content);
  const credentials = getVisibleCredentials(content);
  const focuses = getVisibleOfferFocuses(content);
  const extraTexts = getVisibleTutoredTexts(content);
  const format = content.site.lessonFormat
    ? lessonFormatLabels[content.site.lessonFormat]
    : null;

  return (
    <main id="main">
      <section className="border-b border-line bg-taupe">
        <div className="mx-auto w-full max-w-[1060px]">
          <Image
            src="/brand/youtube-banner.jpg"
            alt="Illustrated YouTube banner for Mrs Gill the English Teacher, with books, quills and the channel portrait."
            width={1060}
            height={175}
            className="h-auto w-full"
            priority
          />
        </div>
        <Container className="grid items-center gap-10 py-14 md:grid-cols-12 md:py-20">
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
          {format ||
          content.site.serviceArea ||
          content.site.availability ||
          content.site.contactPreference ? (
            <ul className="mt-5 max-w-[62ch] space-y-1 text-ink-soft">
              {format ? <li>Lessons: {format}</li> : null}
              {content.site.serviceArea ? <li>Area: {content.site.serviceArea}</li> : null}
              {content.site.availability ? (
                <li>Availability: {content.site.availability}</li>
              ) : null}
              {content.site.contactPreference ? (
                <li>{content.site.contactPreference}</li>
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
                      {service.groupSize ? ` · ${service.groupSize}` : ""}
                    </p>
                  ) : service.groupSize ? (
                    <p className="mt-4 font-semibold text-navy">{service.groupSize}</p>
                  ) : null}
                </article>
              ))}
            </div>
          ) : null}

          {focuses.length ? (
            <div className="mt-12">
              <h3 className="font-display text-2xl font-semibold text-navy">Also offered</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {focuses.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-lg border border-line bg-parchment px-3 py-1.5 text-sm text-ink-soft"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {extraTexts.length ? (
            <div className="mt-10">
              <h3 className="font-display text-2xl font-semibold text-navy">
                Texts for paid lessons
              </h3>
              <p className="mt-3 max-w-[60ch] text-ink-soft">
                Alongside the channel texts, Mrs Gill also tutors these titles. They
                do not have their own videos on this site.
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {extraTexts.map((item) => (
                  <li key={item.id} className="font-display text-xl italic text-navy">
                    {item.title}
                    {item.note ? (
                      <span className="mt-1 block font-sans text-base not-italic text-ink-soft">
                        {item.note}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
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

            <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-2">
              {featured.map((video) => (
                <VideoCard key={video.id} video={video} />
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
          <Container className="grid items-start gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <figure className="overflow-hidden rounded-xl bg-page shadow-[0_18px_40px_-24px_rgb(28_36_51_/_0.45)]">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  width={portrait.width}
                  height={portrait.height}
                  className="h-auto w-full"
                  sizes="(min-width: 768px) 320px, 90vw"
                />
              </figure>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
                {content.homepage.aboutHeading}
              </h2>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
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
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/about" variant="secondary">
                  More about Mrs Gill
                </ButtonLink>
                <ButtonLink href={content.site.youtubeUrl} variant="ghost" external>
                  Visit the YouTube channel
                </ButtonLink>
              </div>
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
