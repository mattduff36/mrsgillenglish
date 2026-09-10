export type Service = {
  id: "ks3" | "gcse" | "one-to-one" | "small-group";
  title: string;
  summary: string;
  detail: string;
  price: string | null;
  duration: string | null;
  groupSize: string | null;
};

export const services: Service[] = [
  {
    id: "ks3",
    title: "Key Stage 3 English",
    summary: "Reading, writing and confidence before the GCSE years.",
    detail:
      "Support for Years 7 to 9 that builds the habits pupils need later: careful reading, clearer sentences, and a calmer approach to school work. These are the same foundations that underpin GCSE English, so the move into Key Stage 4 feels less daunting. Exact lesson plans are agreed with the family.",
    price: null,
    duration: null,
    groupSize: null,
  },
  {
    id: "gcse",
    title: "GCSE English",
    summary: "Language and literature, with exam methods made visible.",
    detail:
      "Tuition covers GCSE English Language and Literature. Paid lessons support Edexcel and AQA. The free revision channel currently concentrates on Edexcel English Literature. Exam board and texts are confirmed with each pupil.",
    price: null,
    duration: null,
    groupSize: null,
  },
  {
    id: "one-to-one",
    title: "One-to-one tuition",
    summary: "Lessons shaped around one pupil's gaps and next steps.",
    detail:
      "One-to-one sessions are shaped around the pupil in front of Mrs Gill. Length and frequency are agreed with the family after an enquiry.",
    price: "£50 per hour",
    duration: "Usual lesson: one hour",
    groupSize: null,
  },
  {
    id: "small-group",
    title: "Small-group tuition",
    summary: "Shared lessons for a few pupils working at a similar point.",
    detail:
      "Small groups are available when they suit the pupils involved. The aims are the same as one-to-one. Group size is agreed with the family rather than fixed in advance.",
    price: "To be discussed after enquiry",
    duration: null,
    groupSize: "Agreed with the family",
  },
];

export const publishedPrices = services.filter((service) => service.price);
