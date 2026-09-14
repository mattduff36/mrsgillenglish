import { PageLayoutEditor } from "@/components/admin/PageLayoutEditor";
import { getSiteContent } from "@/lib/content/store";

export default async function RevisionLayoutPage() {
  const content = await getSiteContent();
  return (
    <PageLayoutEditor
      page="revision"
      content={content}
      intro="The revision page usually starts with an introduction, playlist links and the filterable catalogue. Videos come from the Videos catalogue."
    />
  );
}
