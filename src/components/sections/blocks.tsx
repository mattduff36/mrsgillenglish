import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { ContentImage } from "@/components/ContentImage";
import { RevisionCatalogue } from "@/components/RevisionCatalogue";
import { VideoCard } from "@/components/VideoCard";
import { tutoringIllustration } from "@/content/site";
import {
  getEnquiryHref,
  getSafeHref,
  lessonFormatLabels,
  selectCredentials,
  selectLiteratureTexts,
  selectOfferFocuses,
  selectPlaylists,
  selectServices,
  selectTestimonials,
  selectTutoredTexts,
  selectVideos,
  topicLabels,
} from "@/lib/content/accessors";
import { PRIVACY_CONTROLLER_FALLBACK } from "@/lib/content/privacy-copy";
import type { PageSection, SiteContent } from "@/lib/content/schema";
import { Heading, Paragraphs, SectionCtas, sectionAnchor, surfaceClass } from "./shared";

type BlockProps<T extends PageSection["type"]> = {
  content: SiteContent;
  section: Extract<PageSection, { type: T }>;
  headingLevel: 1 | 2;
};

const DEFAULT_HERO_BANNER = "/images/youtube-banner-wide.jpg";

function heroBannerSrc(src: string | null | undefined) {
  if (!src || src === "/brand/youtube-banner.jpg") {
    return DEFAULT_HERO_BANNER;
  }
  return src;
}

export function HeroBlock({ content, section, headingLevel }: BlockProps<"hero">) {
  const primaryHref = getSafeHref(section.primaryCtaHref);
  const secondaryHref = getSafeHref(section.secondaryCtaHref);

  return (
    <section
      className={surfaceClass(section.surface ?? "taupe", "border-b border-line pb-12 md:pb-20")}
    >
      <div className="mx-auto w-full md:w-[88%]">
        <div className="hero-banner-frame">
          <ContentImage
            src={heroBannerSrc(section.bannerSrc)}
            fallbackSrc={DEFAULT_HERO_BANNER}
            alt={section.bannerAlt}
            fill
            className="object-cover object-[55%_center] sm:object-center"
            sizes="(min-width: 768px) 88vw, 100vw"
            priority
          />
        </div>
        {/* The two-column plate needs real width, so it waits for lg; 768px
            tablets keep the stacked treatment. */}
        <div className="relative z-10 mx-auto -mt-8 w-[92%] rounded-2xl bg-parchment p-6 shadow-[0_18px_40px_-24px_rgb(28_36_51_/_0.45)] sm:w-[88%] md:-mt-12 md:w-[80%] md:p-8 lg:-mt-[6.4%] lg:grid lg:w-[90%] lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10 lg:rounded-xl xl:w-[75%]">
          <div>
            <Heading
              level={headingLevel}
              className="max-w-xl font-display text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-navy sm:text-[2rem] md:text-4xl lg:text-[2.25rem] xl:text-5xl"
            >
              {section.heading}
            </Heading>
            <p className="mt-3 max-w-[40ch] text-base leading-relaxed text-ink-soft md:mt-5 md:text-lg">
              {section.supporting}
            </p>
            <SectionCtas
              primaryLabel={section.primaryCtaLabel}
              primaryHref={primaryHref}
              secondaryLabel={section.secondaryCtaLabel}
              secondaryHref={secondaryHref}
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap [&_a]:w-full sm:[&_a]:w-auto"
            />
          </div>
          {/* The banner carries the same name and channel title, so this only
              appears once there is room for it beside the headline. */}
          <figure className="hidden items-center gap-4 lg:flex lg:justify-end">
            <ContentImage
              src={section.profileSrc}
              fallbackSrc="/brand/youtube-profile.jpg"
              alt={section.profileAlt}
              width={80}
              height={80}
              className="size-16 rounded-full object-cover xl:size-20"
            />
            <figcaption>
              <p className="font-display text-lg font-semibold text-navy xl:text-xl">
                {content.site.name}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{content.site.youtubeName}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function TextImageBlock({ content, section, headingLevel }: BlockProps<"textImage">) {
  const credentials = section.showCredentials
    ? selectCredentials(content)
    : [];
  const imageLeft = section.imageSide !== "right";

  return (
    <section
      id={sectionAnchor(section.anchor)}
      className={surfaceClass(section.surface, "scroll-mt-24 py-16 md:py-24")}
    >
      <Container className="grid items-start gap-8 md:grid-cols-12 md:gap-10">
        <div className={imageLeft ? "md:col-span-4 md:col-start-1" : "md:col-span-4 md:col-start-9"}>
          <figure className="aspect-[4/3] overflow-hidden rounded-xl bg-page shadow-[0_18px_40px_-24px_rgb(28_36_51_/_0.45)] sm:aspect-[3/2] md:aspect-auto">
            <ContentImage
              src={section.imageSrc}
              fallbackSrc="/images/mrs-gill-portrait.jpg"
              alt={section.imageAlt}
              width={1400}
              height={2099}
              className="h-full w-full object-cover object-[center_22%] md:h-auto md:object-center"
              sizes="(min-width: 768px) 320px, 100vw"
            />
          </figure>
        </div>
        <div className={imageLeft ? "md:col-span-8" : "md:col-span-8 md:col-start-1 md:row-start-1"}>
          <Heading
            level={headingLevel}
            className="font-display text-3xl font-semibold text-navy md:text-4xl"
          >
            {section.heading}
          </Heading>
          <div className="mt-4 max-w-[62ch] space-y-4 text-lg leading-relaxed text-ink-soft">
            <Paragraphs body={section.body} className="leading-relaxed" />
          </div>
          {credentials.length ? (
            <ul className="mt-6 max-w-[62ch] divide-y divide-line overflow-hidden rounded-xl border border-line">
              {credentials.map((item) => (
                <li key={item.id} className="px-4 py-3 sm:flex sm:gap-4 sm:px-5">
                  <span className="block font-semibold text-navy sm:w-44 sm:shrink-0">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-ink-soft sm:mt-0">{item.detail}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <SectionCtas
            primaryLabel={section.primaryCtaLabel}
            primaryHref={section.primaryCtaHref}
            secondaryLabel={section.secondaryCtaLabel}
            secondaryHref={section.secondaryCtaHref}
            primaryVariant="secondary"
            secondaryVariant="ghost"
            className="mt-8 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
          />
        </div>
      </Container>
    </section>
  );
}

export function TutoringBlock({ content, section, headingLevel }: BlockProps<"tutoring">) {
  const enquiry = section.showEnquiry ? getEnquiryHref(content) : null;
  const services = selectServices(content, section.serviceSelection, section.serviceIds);
  const focuses = section.showFocuses
    ? selectOfferFocuses(content, section.focusSelection, section.focusIds)
    : [];
  const extraTexts = section.showTutoredTexts
    ? selectTutoredTexts(content, section.textSelection, section.tutoredTextIds)
    : [];
  const format = content.site.lessonFormat
    ? lessonFormatLabels[content.site.lessonFormat]
    : null;
  const lessonMeta = [
    { label: "Lessons", value: format },
    { label: "Area", value: content.site.serviceArea },
    { label: "Availability", value: content.site.availability },
  ].filter((item): item is { label: string; value: string } => Boolean(item.value));

  return (
    <section
      id={sectionAnchor(section.anchor)}
      className={surfaceClass(
        section.surface ?? "navy",
        "scroll-mt-24 py-16 md:py-20",
      )}
    >
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Heading
              level={headingLevel}
              className="max-w-xl font-display text-3xl font-semibold md:text-4xl"
            >
              {section.heading}
            </Heading>
            <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-parchment/90">
              {section.intro}
            </p>
            {section.showLessonMeta && lessonMeta.length ? (
              <dl className="mt-6 max-w-[62ch] border-t border-brass/40">
                {lessonMeta.map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-brass/40 py-3 sm:flex sm:gap-4"
                  >
                    <dt className="text-sm font-semibold uppercase tracking-wide text-parchment/70 sm:w-36 sm:shrink-0 sm:pt-0.5">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-parchment sm:mt-0">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {section.showLessonMeta && content.site.contactPreference ? (
              <p className="mt-4 max-w-[62ch] text-parchment/85">
                {content.site.contactPreference}
              </p>
            ) : null}

            {enquiry ? (
              <div className="mt-8">
                <ButtonLink href={enquiry} variant="inverse" className="w-full sm:w-auto">
                  Enquire about tutoring
                </ButtonLink>
              </div>
            ) : section.showEnquiry && content.features.enableEnquiry ? (
              <p className="mt-8 max-w-[60ch] text-parchment/90">{section.enquiryFallback}</p>
            ) : null}
          </div>

          <div className="hidden justify-center md:col-span-5 md:flex">
            <figure className="aspect-square w-full max-w-[16rem] overflow-hidden rounded-full bg-taupe lg:max-w-[24rem]">
              <ContentImage
                src={tutoringIllustration.src}
                alt={tutoringIllustration.alt}
                width={tutoringIllustration.width}
                height={tutoringIllustration.height}
                className="h-full w-full scale-125 object-cover object-[center_58%]"
                sizes="(min-width: 1024px) 384px, 256px"
              />
            </figure>
          </div>
        </div>

        {services.length ? (
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-brass/40 bg-brass/40 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.id} className="bg-page p-6 text-ink md:p-8">
                <h3 className="font-display text-2xl font-semibold text-navy">{service.title}</h3>
                <p className="mt-2 font-medium text-brass-deep">{service.summary}</p>
                <p className="mt-4 max-w-[55ch] leading-relaxed text-ink-soft">{service.detail}</p>
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
            <h3 className="font-display text-2xl font-semibold">Also offered</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {focuses.map((item) => (
                <li
                  key={item.id}
                  className="rounded-lg border border-brass/50 bg-navy-deep px-3 py-1.5 text-sm text-parchment/90"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {extraTexts.length ? (
          <div className="mt-10">
            <h3 className="font-display text-2xl font-semibold">Texts for paid lessons</h3>
            <p className="mt-3 max-w-[60ch] text-parchment/90">
              Alongside the channel texts, Mrs Gill also tutors these titles. They
              do not have their own videos on this site.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {extraTexts.map((item) => (
                <li key={item.id} className="font-display text-xl italic text-parchment">
                  {item.title}
                  {item.note ? (
                    <span className="mt-1 block font-sans text-base not-italic text-parchment/85">
                      {item.note}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

      </Container>
    </section>
  );
}

export function VideosBlock({ content, section, headingLevel }: BlockProps<"videos">) {
  const videos = selectVideos(content, section.selection, section.itemIds);

  return (
    <section
      id={sectionAnchor(section.anchor)}
      className={surfaceClass(section.surface, "scroll-mt-24 py-16 md:py-24")}
    >
      <Container>
        {/* Mobile reads heading, intro, then the link; from md the link moves
            up beside the heading. */}
        <div className="flex flex-col gap-4 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-x-8">
          <Heading
            level={headingLevel}
            className="order-1 max-w-xl font-display text-3xl font-semibold text-navy md:col-start-1 md:row-start-1 md:text-4xl"
          >
            {section.heading}
          </Heading>
          <p className="order-2 max-w-[62ch] text-lg text-ink-soft md:col-start-1 md:row-start-2">
            {section.intro}
          </p>
          {section.showRevisionCta ? (
            <ButtonLink
              href="/revision"
              variant="ghost"
              className="order-3 self-start md:col-start-2 md:row-start-1 md:self-end"
            >
              All curated videos
            </ButtonLink>
          ) : null}
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-7 sm:grid-cols-2 sm:gap-8 md:mt-10">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function TestimonialsBlock({ content, section, headingLevel }: BlockProps<"testimonials">) {
  const testimonials = selectTestimonials(content, section.selection, section.itemIds);

  return (
    <section className={surfaceClass(section.surface, "border-t border-line py-16 md:py-24")}>
      <Container>
        <Heading
          level={headingLevel}
          className="font-display text-3xl font-semibold text-navy md:text-4xl"
        >
          {section.heading}
        </Heading>
        <ul className="mt-10 grid gap-8 md:grid-cols-2">
          {testimonials.map((item) => (
            <li key={item.id} className="rounded-xl border border-line bg-parchment p-6">
              <p className="font-display text-xl leading-relaxed text-navy">“{item.quote}”</p>
              <p className="mt-4 text-sm font-semibold text-brass-deep">
                {item.attribution}
                {item.context ? ` · ${item.context}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ProseBlock({ section, headingLevel }: BlockProps<"prose">) {
  const narrow = section.id.startsWith("privacy") || section.heading === "Resources";

  return (
    <section
      id={sectionAnchor(section.anchor)}
      className={surfaceClass(
        section.surface,
        section.surface === "parchment" ? "border-t border-line py-16" : "py-12 md:py-16",
      )}
    >
      <Container className={narrow ? "max-w-3xl" : ""}>
        {section.heading ? (
          <Heading
            level={headingLevel}
            className="font-display text-3xl font-semibold text-navy md:text-4xl"
          >
            {section.heading}
          </Heading>
        ) : null}
        <div className={`max-w-[65ch] space-y-5 text-lg leading-relaxed text-ink-soft ${section.heading ? "mt-4" : ""}`}>
          <Paragraphs body={section.body} className="leading-relaxed" />
        </div>
      </Container>
    </section>
  );
}

export function CtaBlock({ section, headingLevel }: BlockProps<"cta">) {
  const isPageIntro = Boolean(section.heading && headingLevel === 1);

  return (
    <section className={surfaceClass(section.surface, isPageIntro ? "py-14 md:py-20" : "py-10 md:py-14")}>
      <Container>
        {section.heading ? (
          <Heading
            level={headingLevel}
            className={
              isPageIntro
                ? "max-w-3xl font-display text-4xl font-semibold leading-tight text-navy md:text-5xl"
                : "font-display text-3xl font-semibold text-navy"
            }
          >
            {section.heading}
          </Heading>
        ) : null}
        {section.body ? (
          <div className={`max-w-[62ch] space-y-4 text-lg leading-relaxed text-ink-soft ${section.heading ? "mt-5" : ""}`}>
            <Paragraphs body={section.body} className="leading-relaxed" />
          </div>
        ) : null}
        <SectionCtas
          primaryLabel={section.primaryCtaLabel}
          primaryHref={section.primaryCtaHref}
          secondaryLabel={section.secondaryCtaLabel}
          secondaryHref={section.secondaryCtaHref}
          className="mt-6 flex flex-wrap gap-3"
        />
      </Container>
    </section>
  );
}

export function ImageBandBlock({ section }: BlockProps<"imageBand">) {
  return (
    <section className={surfaceClass(section.surface, "border-b border-line")}>
      <div className="mx-auto w-full max-w-[1060px]">
        <ContentImage
          src={section.imageSrc}
          alt={section.imageAlt}
          width={1060}
          height={175}
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}

export function LiteratureTextsBlock({
  content,
  section,
  headingLevel,
}: BlockProps<"literatureTexts">) {
  const texts = selectLiteratureTexts(content, section.selection, section.itemIds);

  return (
    <section className={surfaceClass(section.surface ?? "navy", "py-16 md:py-20")}>
      <Container>
        <Heading
          level={headingLevel}
          className="max-w-xl font-display text-3xl font-semibold md:text-4xl"
        >
          {section.heading}
        </Heading>
        <p className="mt-4 max-w-[62ch] text-lg text-parchment/90">{section.intro}</p>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {texts.map((item) => (
            <li key={item.id} className="rounded-xl border border-brass/40 bg-navy-deep p-6">
              <p className="text-sm font-semibold text-brass">{topicLabels[item.topic]}</p>
              <p className="mt-2 font-display text-2xl italic">{item.title}</p>
              <p className="mt-3 text-parchment/85">{item.note}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function CredentialsBlock({ content, section, headingLevel }: BlockProps<"credentials">) {
  const credentials = selectCredentials(content, section.selection, section.itemIds);

  return (
    <section className={surfaceClass(section.surface, "py-12")}>
      <Container>
        {section.heading ? (
          <Heading level={headingLevel} className="font-display text-3xl font-semibold text-navy">
            {section.heading}
          </Heading>
        ) : null}
        <ul className={`space-y-2 text-ink-soft ${section.heading ? "mt-6" : ""}`}>
          {credentials.map((item) => (
            <li key={item.id}>
              <span className="font-semibold text-navy">{item.label}: </span>
              {item.detail}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function PlaylistsBlock({ content, section, headingLevel }: BlockProps<"playlists">) {
  const playlists = selectPlaylists(content, section.selection, section.itemIds);

  return (
    <section className={surfaceClass(section.surface, "pb-4")}>
      <Container>
        {section.heading ? (
          <Heading level={headingLevel} className="font-display text-2xl font-semibold text-navy">
            {section.heading}
          </Heading>
        ) : null}
        <ul className={`flex flex-wrap gap-x-6 gap-y-2 text-sm ${section.heading ? "mt-6" : "mt-2"}`}>
          {playlists.map((playlist) => (
            <li key={playlist.url}>
              <a
                href={playlist.url}
                className="font-semibold text-navy underline decoration-brass underline-offset-4"
                rel="noreferrer noopener"
                target="_blank"
              >
                {playlist.title} playlist
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function RevisionCatalogueBlock({
  content,
  section,
}: BlockProps<"revisionCatalogue">) {
  const videos = selectVideos(content, section.selection, section.itemIds);

  return (
    <section className={surfaceClass(section.surface, "py-12")}>
      <Container>
        <RevisionCatalogue videos={videos} />
      </Container>
    </section>
  );
}

export function PrivacyContactBlock({ content }: BlockProps<"privacyContact">) {
  const controllerName = content.privacy.controllerName;
  const controllerEmail = content.privacy.controllerEmail;

  return (
    <section className="py-2">
      <Container className="max-w-3xl">
        <div className="text-lg leading-relaxed text-ink-soft">
          {controllerName || controllerEmail ? (
            <p>
              Privacy questions can be sent to {controllerName || content.site.name}
              {controllerEmail ? (
                <>
                  {" "}
                  at{" "}
                  <a
                    href={`mailto:${controllerEmail}`}
                    className="font-semibold text-navy underline decoration-brass underline-offset-4"
                  >
                    {controllerEmail}
                  </a>
                </>
              ) : null}
              .
            </p>
          ) : (
            <p>{PRIVACY_CONTROLLER_FALLBACK}</p>
          )}
        </div>
      </Container>
    </section>
  );
}

export function renderSectionBlock(
  content: SiteContent,
  section: PageSection,
  headingLevel: 1 | 2,
) {
  switch (section.type) {
    case "hero":
      return <HeroBlock content={content} section={section} headingLevel={headingLevel} />;
    case "textImage":
      return <TextImageBlock content={content} section={section} headingLevel={headingLevel} />;
    case "tutoring":
      return <TutoringBlock content={content} section={section} headingLevel={headingLevel} />;
    case "videos":
      return <VideosBlock content={content} section={section} headingLevel={headingLevel} />;
    case "testimonials":
      return <TestimonialsBlock content={content} section={section} headingLevel={headingLevel} />;
    case "prose":
      return <ProseBlock content={content} section={section} headingLevel={headingLevel} />;
    case "cta":
      return <CtaBlock content={content} section={section} headingLevel={headingLevel} />;
    case "imageBand":
      return <ImageBandBlock content={content} section={section} headingLevel={headingLevel} />;
    case "literatureTexts":
      return <LiteratureTextsBlock content={content} section={section} headingLevel={headingLevel} />;
    case "credentials":
      return <CredentialsBlock content={content} section={section} headingLevel={headingLevel} />;
    case "playlists":
      return <PlaylistsBlock content={content} section={section} headingLevel={headingLevel} />;
    case "revisionCatalogue":
      return (
        <RevisionCatalogueBlock content={content} section={section} headingLevel={headingLevel} />
      );
    case "privacyContact":
      return (
        <PrivacyContactBlock content={content} section={section} headingLevel={headingLevel} />
      );
    default: {
      const _never: never = section;
      return _never;
    }
  }
}
