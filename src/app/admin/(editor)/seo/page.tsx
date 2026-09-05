import { saveSeoAction } from "@/app/admin/actions";
import { AdminForm, Field, TextArea } from "@/components/admin/AdminForm";
import { getSiteContent } from "@/lib/content/store";

export default async function SeoEditorPage() {
  const { seo } = await getSiteContent();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Search listings</h1>
      <p className="mt-3 mb-8 text-parchment/75">
        These titles and descriptions appear in search results and when someone
        shares the site. Keep them factual.
      </p>
      <AdminForm action={saveSeoAction}>
        <Field label="Default page title" name="defaultTitle" defaultValue={seo.defaultTitle} />
        <TextArea
          label="Default description"
          name="defaultDescription"
          defaultValue={seo.defaultDescription}
        />
        <TextArea
          label="Social share description"
          name="socialDescription"
          defaultValue={seo.socialDescription}
        />
        <Field label="Revision page title" name="revisionTitle" defaultValue={seo.revisionTitle} />
        <TextArea
          label="Revision page description"
          name="revisionDescription"
          defaultValue={seo.revisionDescription}
        />
      </AdminForm>
    </div>
  );
}
