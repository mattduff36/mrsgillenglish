import { saveCredentialsAction } from "@/app/admin/actions";
import {
  AdminForm,
  ConfirmSubmit,
  Field,
  MoveButtons,
  TextArea,
  Toggle,
} from "@/components/admin/AdminForm";
import { PageLayoutEditor } from "@/components/admin/PageLayoutEditor";
import { getSiteContent } from "@/lib/content/store";

export default async function AboutEditorPage() {
  const content = await getSiteContent();

  return (
    <div className="space-y-12">
      <PageLayoutEditor
        page="about"
        content={content}
        intro="Use Mrs Gill's own wording. Biography paragraphs are text sections on this page. Do not publish qualifications or DBS details unless she has asked for them to be public."
      />

      <section>
        <h2 className="font-display text-2xl">Public facts and qualifications</h2>
        <p className="mt-2 mb-6 text-parchment/70">
          Shared list used by any Text and image or Qualifications section. Each
          item stays hidden until it is switched on and both fields are filled.
        </p>
        <AdminForm action={saveCredentialsAction} saveLabel="Save facts">
          <input type="hidden" name="count" value={content.credentials.length} />
          {content.credentials.map((item, index) => (
            <fieldset
              key={item.id}
              className="space-y-4 rounded-xl border border-white/10 bg-navy p-4"
            >
              <legend className="px-1 text-sm font-semibold">Fact {index + 1}</legend>
              <input type="hidden" name={`id-${index}`} value={item.id} />
              <Field label="Label" name={`label-${index}`} defaultValue={item.label} />
              <TextArea label="Detail" name={`detail-${index}`} defaultValue={item.detail} />
              <Toggle label="Show on the public site" name={`enabled-${index}`} defaultChecked={item.enabled} />
              <div className="flex flex-wrap gap-2">
                <MoveButtons index={index} />
                <ConfirmSubmit
                  name={`remove-${index}`}
                  value="1"
                  message="Remove this fact from the site editor?"
                >
                  Remove
                </ConfirmSubmit>
              </div>
            </fieldset>
          ))}
          <button
            type="submit"
            name="add"
            value="1"
            className="min-h-11 rounded-lg border border-brass px-4 font-semibold text-parchment"
          >
            Add a fact
          </button>
        </AdminForm>
      </section>
    </div>
  );
}
