import { topicLabels, type VideoTopic } from "./videos";

export type LiteratureText = {
  topic: VideoTopic;
  title: string;
  note: string;
};

export const literatureTexts: LiteratureText[] = [
  {
    topic: "christmas-carol",
    title: topicLabels["christmas-carol"],
    note: "Character, quotations and how to answer parts A and B.",
  },
  {
    topic: "macbeth",
    title: topicLabels.macbeth,
    note: "Themes, quotations, PETAL and PEER for Paper 1.",
  },
  {
    topic: "coram-boy",
    title: topicLabels["coram-boy"],
    note: "Context, characters and narrative structure.",
  },
  {
    topic: "poetry",
    title: "Belonging poetry",
    note: "Anthology context, theme vocabulary and PETER paragraphs.",
  },
];
