export type Service = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  price: string | null;
  duration: string | null;
  groupSize: string | null;
};

export const services: Service[] = [];

export const publishedPrices = services.filter((service) => service.price);
