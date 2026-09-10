import {
  saveOfferFocusesAction,
  saveServicesAction,
  saveTutoredTextsAction,
} from "@/app/admin/actions";
import {
  AdminForm,
  ConfirmSubmit,
  Field,
  MoveButtons,
  TextArea,
  Toggle,
} from "@/components/admin/AdminForm";
import { getSiteContent } from "@/lib/content/store";

export default async function ServicesEditorPage() {
  const content = await getSiteContent();

  return (
    <div className="space-y-12">
      <h1 className="font-display text-3xl font-semibold">Tutoring offers</h1>
      <p className="mt-3 mb-8 text-parchment/75">
        Switch an offer off to hide it. Leave price blank to keep a card without
        a public price, and turn on pricing in settings.
      </p>
      <AdminForm action={saveServicesAction}>
        <input type="hidden" name="count" value={content.services.length} />
        {content.services.map((service, index) => (
          <fieldset
            key={service.id}
            className="space-y-4 rounded-xl border border-white/10 bg-navy p-4"
          >
            <legend className="px-1 font-display text-lg">{service.title}</legend>
            <input type="hidden" name={`id-${index}`} value={service.id} />
            <Field label="Title" name={`title-${index}`} defaultValue={service.title} />
            <Field label="Short summary" name={`summary-${index}`} defaultValue={service.summary} />
            <TextArea label="Description" name={`detail-${index}`} defaultValue={service.detail} rows={5} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Price"
                name={`price-${index}`}
                defaultValue={service.price}
                hint="Leave blank to keep prices off the public cards."
              />
              <Field
                label="Price note"
                name={`priceSuffix-${index}`}
                defaultValue={service.priceSuffix}
                hint='For example: "per hour"'
              />
              <Field label="Lesson length" name={`duration-${index}`} defaultValue={service.duration} />
              <Field label="Group size" name={`groupSize-${index}`} defaultValue={service.groupSize} />
            </div>
            <Toggle
              label="Show this offer"
              name={`enabled-${index}`}
              defaultChecked={service.enabled}
            />
            <div className="flex flex-wrap gap-2">
              <MoveButtons index={index} />
              <ConfirmSubmit
                name={`remove-${index}`}
                value="1"
                message="Remove this tutoring offer?"
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
          Add an offer
        </button>
      </AdminForm>

      <section>
        <h2 className="font-display text-2xl">Also offered</h2>
        <p className="mt-2 mb-6 text-parchment/70">
          Short labels shown under the tutoring cards. Switch one off to hide it.
        </p>
        <AdminForm action={saveOfferFocusesAction} saveLabel="Save focuses">
          <input type="hidden" name="count" value={content.offerFocuses.length} />
          {content.offerFocuses.map((item, index) => (
            <fieldset
              key={item.id}
              className="space-y-4 rounded-xl border border-white/10 bg-navy p-4"
            >
              <legend className="px-1 text-sm font-semibold">Focus {index + 1}</legend>
              <input type="hidden" name={`id-${index}`} value={item.id} />
              <Field label="Label" name={`label-${index}`} defaultValue={item.label} />
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
                  message="Remove this focus?"
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
            Add a focus
          </button>
        </AdminForm>
      </section>

      <section>
        <h2 className="font-display text-2xl">Texts for paid lessons</h2>
        <p className="mt-2 mb-6 text-parchment/70">
          Extra literature titles beyond the YouTube channel list. Do not add a
          video link unless one exists.
        </p>
        <AdminForm action={saveTutoredTextsAction} saveLabel="Save texts">
          <input type="hidden" name="count" value={content.tutoredTexts.length} />
          {content.tutoredTexts.map((item, index) => (
            <fieldset
              key={item.id}
              className="space-y-4 rounded-xl border border-white/10 bg-navy p-4"
            >
              <legend className="px-1 text-sm font-semibold">Text {index + 1}</legend>
              <input type="hidden" name={`id-${index}`} value={item.id} />
              <Field label="Title" name={`title-${index}`} defaultValue={item.title} />
              <Field
                label="Optional note"
                name={`note-${index}`}
                defaultValue={item.note}
              />
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
                  message="Remove this text?"
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
            Add a text
          </button>
        </AdminForm>
      </section>
    </div>
  );
}
