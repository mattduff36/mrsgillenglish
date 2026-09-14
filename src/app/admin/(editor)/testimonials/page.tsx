import { saveTestimonialsAction } from "@/app/admin/actions";
import {
  AdminForm,
  ConfirmSubmit,
  Field,
  MoveButtons,
  TextArea,
  Toggle,
} from "@/components/admin/AdminForm";
import { getSiteContent } from "@/lib/content/store";

export default async function TestimonialsEditorPage() {
  const content = await getSiteContent();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Testimonials</h1>
      <p className="mt-3 mb-8 text-parchment/75">
        Shared catalogue for any Testimonials section. Only add wording Issy has
        permission to publish. Never invent a quote. Switch the section on in the
        Home layout once at least one approved quote is ready.
      </p>
      <AdminForm action={saveTestimonialsAction}>
        <input type="hidden" name="count" value={content.testimonials.length} />
        {content.testimonials.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-navy p-4 text-parchment/75">
            No quotes yet. That is correct until Issy supplies them.
          </p>
        ) : null}
        {content.testimonials.map((item, index) => (
          <fieldset
            key={item.id}
            className="space-y-4 rounded-xl border border-white/10 bg-navy p-4"
          >
            <legend className="px-1 text-sm font-semibold">Quote {index + 1}</legend>
            <input type="hidden" name={`id-${index}`} value={item.id} />
            <TextArea label="Exact wording" name={`quote-${index}`} defaultValue={item.quote} rows={4} />
            <Field
              label="How they are named"
              name={`attribution-${index}`}
              defaultValue={item.attribution}
              hint='First name, initials, or “Parent of a GCSE student”.'
            />
            <Field label="Context" name={`context-${index}`} defaultValue={item.context} />
            <Toggle
              label="Show this quote"
              name={`enabled-${index}`}
              defaultChecked={item.enabled}
            />
            <div className="flex flex-wrap gap-2">
              <MoveButtons index={index} />
              <ConfirmSubmit
                name={`remove-${index}`}
                value="1"
                message="Remove this quote?"
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
          Add a quote
        </button>
      </AdminForm>
    </div>
  );
}
