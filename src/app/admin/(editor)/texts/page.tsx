import { saveLiteratureTextsAction } from "@/app/admin/actions";
import {
  AdminForm,
  ConfirmSubmit,
  Field,
  MoveButtons,
  Select,
  TextArea,
} from "@/components/admin/AdminForm";
import { topicLabels } from "@/lib/content/accessors";
import { getSiteContent } from "@/lib/content/store";

export default async function TextsEditorPage() {
  const content = await getSiteContent();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Channel texts</h1>
      <p className="mt-3 mb-8 text-parchment/75">
        These are the Edexcel literature titles with videos on the channel. Any
        Channel texts section can show all of them or a picked list. Do not add a
        title that is not already taught on the public channel.
      </p>
      <AdminForm action={saveLiteratureTextsAction}>
        <input type="hidden" name="count" value={content.literatureTexts.length} />
        {content.literatureTexts.map((item, index) => (
          <fieldset
            key={item.id}
            className="space-y-4 rounded-xl border border-white/10 bg-navy p-4"
          >
            <legend className="px-1 font-display text-lg">{item.title}</legend>
            <input type="hidden" name={`id-${index}`} value={item.id} />
            <Select label="Topic" name={`topic-${index}`} defaultValue={item.topic}>
              {Object.entries(topicLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
            <Field label="Title" name={`title-${index}`} defaultValue={item.title} />
            <TextArea label="Note" name={`note-${index}`} defaultValue={item.note} />
            <div className="flex flex-wrap gap-2">
              <MoveButtons index={index} />
              <ConfirmSubmit
                name={`remove-${index}`}
                value="1"
                message="Remove this channel text?"
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
    </div>
  );
}
