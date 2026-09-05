export const videoTopics = [
  "christmas-carol",
  "macbeth",
  "coram-boy",
  "poetry",
] as const;

export type VideoTopic = (typeof videoTopics)[number];

export const videoFocuses = [
  "exam-method",
  "quotations",
  "character",
  "context",
  "themes",
  "structure",
  "vocabulary",
] as const;

export type VideoFocus = (typeof videoFocuses)[number];

export type Video = {
  id: string;
  title: string;
  topic: VideoTopic;
  focus: VideoFocus;
  duration: string | null;
  featured?: boolean;
};

export const topicLabels: Record<VideoTopic, string> = {
  "christmas-carol": "A Christmas Carol",
  macbeth: "Macbeth",
  "coram-boy": "Coram Boy",
  poetry: "Poetry",
};

export const videos: Video[] = [
  {
    id: "6XbRHkvC-30",
    title: "A Christmas Carol: how to answer part B",
    topic: "christmas-carol",
    focus: "exam-method",
    duration: "4:34",
    featured: true,
  },
  {
    id: "elxR1iNle1w",
    title: "Top 5 A Christmas Carol quotations",
    topic: "christmas-carol",
    focus: "quotations",
    duration: "5:22",
  },
  {
    id: "NxJqvLK7muA",
    title: "Top 5 Macbeth quotations",
    topic: "macbeth",
    focus: "quotations",
    duration: "5:07",
  },
  {
    id: "1G2KMa4UiHM",
    title: "Coram Boy: narrative structure",
    topic: "coram-boy",
    focus: "structure",
    duration: "3:15",
  },
  {
    id: "GfRsuGt-WQI",
    title: "A Christmas Carol: how to answer part A with PETAL",
    topic: "christmas-carol",
    focus: "exam-method",
    duration: "4:08",
  },
  {
    id: "BEHvoAbBP6M",
    title: "Poetry: vocabulary linked with themes",
    topic: "poetry",
    focus: "vocabulary",
    duration: "2:03",
  },
  {
    id: "GpKoFXNZaPY",
    title: "Poetry: how to answer Paper 2 Section B with PETER",
    topic: "poetry",
    focus: "exam-method",
    duration: "5:54",
  },
  {
    id: "lxEhskeEeJg",
    title: "Belonging anthology: context for the identity poems",
    topic: "poetry",
    focus: "context",
    duration: "7:37",
  },
  {
    id: "7HpkCofPHC4",
    title: "Belonging anthology: context",
    topic: "poetry",
    focus: "context",
    duration: "6:18",
  },
  {
    id: "F2QJ8iO9crE",
    title: "A Christmas Carol: character analysis",
    topic: "christmas-carol",
    focus: "character",
    duration: "6:04",
  },
  {
    id: "W0Q4RXdnc3E",
    title: "Coram Boy: context",
    topic: "coram-boy",
    focus: "context",
    duration: "6:04",
  },
  {
    id: "lsziHRyBWao",
    title: "Macbeth: four key themes",
    topic: "macbeth",
    focus: "themes",
    duration: "12:25",
  },
  {
    id: "XH8lv1R4x_w",
    title: "Macbeth: how to answer Paper 1 part B with PEER",
    topic: "macbeth",
    focus: "exam-method",
    duration: "5:22",
  },
  {
    id: "hrplR6RdUW0",
    title: "Coram Boy: character analysis and key quotations",
    topic: "coram-boy",
    focus: "character",
    duration: "6:34",
  },
  {
    id: "Jbd5sRUKOVs",
    title: "Macbeth: how to answer part A with PETAL",
    topic: "macbeth",
    focus: "exam-method",
    duration: "5:01",
  },
  {
    id: "E_wrk0jbVWg",
    title: "Sophisticated phrasing for poetry analysis",
    topic: "poetry",
    focus: "vocabulary",
    duration: null,
  },
];

export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function videoThumbnailPath(id: string): string {
  return `/videos/${id}.jpg`;
}

export function featuredVideos(): Video[] {
  return videos.filter((video) => video.featured);
}

export function videosByTopic(topic: VideoTopic): Video[] {
  return videos.filter((video) => video.topic === topic);
}
