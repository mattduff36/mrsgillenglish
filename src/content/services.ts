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
      "Support for Years 7 to 9 that builds the habits pupils need later: careful reading, clearer sentences, and a calmer approach to school work. The offer comes from Issy's brief. Exact lesson plans are agreed with the family.",
    price: null,
    duration: null,
    groupSize: null,
  },
  {
    id: "gcse",
    title: "GCSE English",
    summary: "Language and literature, with exam methods made visible.",
    detail:
      "Tuition covers GCSE English. The free revision channel currently concentrates on Edexcel English Literature. That is a fact about the videos, not an automatic limit on every paid lesson. Exam board and texts are confirmed with each pupil.",
    price: null,
    duration: null,
    groupSize: null,
  },
  {
    id: "one-to-one",
    title: "One-to-one tuition",
    summary: "Lessons shaped around one pupil's gaps and next steps.",
    detail:
      "One-to-one sessions are part of the intended offer. Length, frequency and price will be published when Issy supplies them.",
    price: null,
    duration: null,
    groupSize: null,
  },
  {
    id: "small-group",
    title: "Small-group tuition",
    summary: "Shared lessons for a few pupils working at a similar point.",
    detail:
      "Small groups are part of the intended offer. Maximum group size is not published yet, so it is not guessed here.",
    price: null,
    duration: null,
    groupSize: null,
  },
];

export const publishedPrices = services.filter((service) => service.price);
