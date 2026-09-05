"use client";

import { useMemo, useState } from "react";
import { topicLabels } from "@/lib/content/accessors";
import type { SiteContent } from "@/lib/content/schema";
import { VideoCard } from "./VideoCard";

type CatalogueVideo = SiteContent["videos"][number];
type Filter = "all" | "exam-method" | CatalogueVideo["topic"];

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All videos" },
  { id: "christmas-carol", label: topicLabels["christmas-carol"] },
  { id: "macbeth", label: topicLabels.macbeth },
  { id: "coram-boy", label: topicLabels["coram-boy"] },
  { id: "poetry", label: topicLabels.poetry },
  { id: "exam-method", label: "Exam methods" },
];

export function RevisionCatalogue({ videos }: { videos: CatalogueVideo[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    if (filter === "all") return videos;
    if (filter === "exam-method") {
      return videos.filter((video) => video.focus === "exam-method");
    }
    return videos.filter((video) => video.topic === filter);
  }, [filter, videos]);

  if (videos.length === 0) {
    return <p className="text-lg text-ink-soft">No revision videos are published yet.</p>;
  }

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter revision videos"
      >
        {filters.map((item) => {
          const selected = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(item.id)}
              className={`min-h-11 rounded-lg px-4 text-sm font-semibold ${
                selected
                  ? "bg-navy text-navy-foreground"
                  : "border border-line bg-parchment text-navy hover:border-navy"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-ink-soft" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "video" : "videos"}
      </p>

      {visible.length ? (
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {visible.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-ink-soft">Nothing in this filter yet.</p>
      )}
    </div>
  );
}
