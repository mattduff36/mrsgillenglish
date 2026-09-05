import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { RevisionCatalogue } from "@/components/RevisionCatalogue";
import { getVisibleVideos } from "@/lib/content/accessors";
import { getSiteContent } from "@/lib/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.seo.revisionTitle,
    description: content.seo.revisionDescription,
    alternates: { canonical: "/revision" },
  };
}

export default async function RevisionPage() {
  const content = await getSiteContent();
  const videos = getVisibleVideos(content);

  return (
    <main id="main" className="py-14 md:py-20">
      <Container>
        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-navy md:text-5xl">
          {content.homepage.revisionHeading}
        </h1>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
          {content.homepage.revisionIntro}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={content.site.youtubeVideosUrl} external>
            All videos on YouTube
          </ButtonLink>
          <ButtonLink href={content.site.youtubeShortsUrl} variant="secondary" external>
            Shorts
          </ButtonLink>
        </div>

        {content.site.playlists.length ? (
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {content.site.playlists.map((playlist) => (
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
        ) : null}

        <div className="mt-12">
          <RevisionCatalogue videos={videos} />
        </div>
      </Container>
    </main>
  );
}
