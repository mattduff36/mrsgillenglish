import { PageLayoutEditor } from "@/components/admin/PageLayoutEditor";
import { getSiteContent } from "@/lib/content/store";

export default async function PrivacyLayoutPage() {
  const content = await getSiteContent();
  return (
    <PageLayoutEditor
      page="privacy"
      content={content}
      intro="Describe what this site actually does. Do not invent legal claims, a trading name, or a controller address. The privacy contact block uses the name and email from General settings."
    />
  );
}
