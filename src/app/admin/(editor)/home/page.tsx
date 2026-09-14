import { PageLayoutEditor } from "@/components/admin/PageLayoutEditor";
import { getSiteContent } from "@/lib/content/store";

export default async function HomeLayoutPage() {
  const content = await getSiteContent();
  return (
    <PageLayoutEditor
      page="home"
      content={content}
      intro="Add, hide or reorder the blocks on the public homepage. Video and testimonial cards only appear when the matching catalogue has enabled items."
    />
  );
}
