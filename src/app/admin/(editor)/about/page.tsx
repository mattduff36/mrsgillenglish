import { saveAboutAction, saveAboutSectionsAction, saveCredentialsAction } from "@/app/admin/actions";
import {
  AdminForm,
  ConfirmSubmit,
  Field,
  MoveButtons,
  TextArea,
  Toggle,
} from "@/components/admin/AdminForm";
import { getSiteContent } from "@/lib/content/store";

export default async function AboutEditorPage() {
  const content = await getSiteContent();

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-3xl font-semibold">About</h1>
        <p className="mt-3 text-parchment/75">
          Use Mrs Gill&apos;s own wording. Do not publish qualifications or DBS
          details unless she has asked for them to be public.
        </p>
      </div>

      <AdminForm action={saveAboutAction}>
        <Field
          label="About heading"
          name="aboutHeading"
          defaultValue={content.homepage.aboutHeading}
        />
        <TextArea
          label="Short introduction"
          name="aboutShort"
          defaultValue={content.homepage.aboutShort}
          rows={5}
        />
        <TextArea
          label="Homepage supporting line"
          name="aboutLong"
          defaultValue={content.homepage.aboutLong}
          rows={4}
        />
      </AdminForm>

      <section>
        <h2 className="font-display text-2xl">About page sections</h2>
        <p className="mt-2 mb-6 text-parchment/70">
          Longer paragraphs appear on /about. Switch a section off to hide it.
        </p>
        <AdminForm action={saveAboutSectionsAction} saveLabel="Save sections">
          <input type="hidden" name="count" value={content.aboutSections.length} />
          {content.aboutSections.map((item, index) => (
            <fieldset
              key={item.id}
              className="space-y-4 rounded-xl border border-white/10 bg-navy p-4"
            >
              <legend className="px-1 text-sm font-semibold">Section {index + 1}</legend>
              <input type="hidden" name={`id-${index}`} value={item.id} />
              <Field label="Heading" name={`heading-${index}`} defaultValue={item.heading} />
              <TextArea label="Body" name={`body-${index}`} defaultValue={item.body} rows={7} />
              <Toggle
                label="Show on the public site"
                name={`enabled-${index}`}
                defaultChecked={item.enabled}
              />
              <div className="flex flex-wrap gap-2">
                <MoveButtons index={index} />
                <ConfirmSubmit
                  name={`remove-${index}`}
                  value="1"
                  message="Remove this About section?"
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
            Add a section
          </button>
        </AdminForm>
      </section>

      <section>
        <h2 className="font-display text-2xl">Public facts and qualifications</h2>
        <p className="mt-2 mb-6 text-parchment/70">
          Each item stays hidden until it is switched on and both fields are filled.
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
