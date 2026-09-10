import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { topicLabels, videoThumbnailPath, youtubeWatchUrl } from "@/lib/content/accessors";
import type { SiteContent } from "@/lib/content/schema";

export type PublicVideo = Pick<
  SiteContent["videos"][number],
  "id" | "title" | "topic" | "focus" | "duration"
>;

type VideoCardProps = {
  video: PublicVideo;
};

export function VideoCard({ video }: VideoCardProps) {
  const href = youtubeWatchUrl(video.id);
  const remote = videoThumbnailPath(video.id).startsWith("https://");

  return (
    <article>
      <a
        href={href}
        className="group block rounded-xl focus-visible:outline-offset-4"
        rel="noreferrer noopener"
        target="_blank"
      >
        <div className="relative overflow-hidden rounded-xl bg-taupe">
          <Image
            src={videoThumbnailPath(video.id)}
            alt=""
            width={480}
            height={270}
            unoptimized={remote}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          {video.duration ? (
            <span className="absolute bottom-2 right-2 rounded bg-ink/85 px-2 py-0.5 text-xs font-semibold text-parchment">
              {video.duration}
            </span>
          ) : null}
        </div>
        <div className="mt-3">
          <p className="text-sm font-medium text-brass-deep">
            {topicLabels[video.topic]}
            {video.focus === "exam-method" ? " · exam method" : ""}
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-navy group-hover:underline">
            {video.title}
            <ArrowUpRight className="ml-1 inline align-text-top" size={16} aria-hidden />
          </h3>
          <p className="mt-2 text-sm text-ink-soft">
            Opens on YouTube
            <span className="sr-only">: {video.title}</span>
          </p>
        </div>
      </a>
    </article>
  );
}
