import { savePlaylistsAction, saveVideosAction } from "@/app/admin/actions";
import {
  AdminForm,
  ConfirmSubmit,
  Field,
  MoveButtons,
  TextArea,
  Toggle,
} from "@/components/admin/AdminForm";
import { focusLabels, topicLabels } from "@/lib/content/accessors";
import { getSiteContent } from "@/lib/content/store";

export default async function VideosEditorPage() {
  const content = await getSiteContent();

  return (
    <div className="space-y-12">
      <div>
      <h1 className="font-display text-3xl font-semibold">Revision videos</h1>
      <p className="mt-3 mb-8 text-parchment/75">
        Shared catalogue for any Videos or Revision catalogue section. Paste a
        YouTube link or the 11-character video id. A YouTube thumbnail is used
        until a local image exists in the project.
      </p>
      <AdminForm action={saveVideosAction}>
        <input type="hidden" name="count" value={content.videos.length} />
        <div className="space-y-4 rounded-xl border border-brass/40 bg-navy p-4">
          <h2 className="font-display text-xl">Add a video</h2>
          <Field
            label="YouTube link or video id"
            name="newYoutube"
            hint="https://www.youtube.com/watch?v=… or the 11-character id"
          />
          <Field label="Title" name="newTitle" />
          <label className="block">
            <span className="text-sm font-semibold text-parchment">Text or topic</span>
            <select
              name="newTopic"
              className="mt-1 w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-parchment"
            >
              {Object.entries(topicLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-parchment">Focus</span>
            <select
              name="newFocus"
              className="mt-1 w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-parchment"
            >
              {Object.entries(focusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <Field label="Duration" name="newDuration" hint="Optional, for example 5:22" />
          <TextArea label="Short description" name="newDescription" />
          <button
            type="submit"
            name="add"
            value="1"
            className="min-h-11 rounded-lg border border-brass px-4 font-semibold text-parchment"
          >
            Add video
          </button>
        </div>

        {content.videos.map((video, index) => (
          <fieldset
            key={video.id}
            className="space-y-4 rounded-xl border border-white/10 bg-navy p-4"
          >
            <legend className="px-1 max-w-full font-display text-lg">{video.title}</legend>
            <Field
              label="YouTube link or video id"
              name={`id-${index}`}
              defaultValue={video.id}
            />
            <Field label="Title" name={`title-${index}`} defaultValue={video.title} />
            <label className="block">
              <span className="text-sm font-semibold text-parchment">Text or topic</span>
              <select
                name={`topic-${index}`}
                defaultValue={video.topic}
                className="mt-1 w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-parchment"
              >
                {Object.entries(topicLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-parchment">Focus</span>
              <select
                name={`focus-${index}`}
                defaultValue={video.focus}
                className="mt-1 w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-parchment"
              >
                {Object.entries(focusLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <Field label="Duration" name={`duration-${index}`} defaultValue={video.duration} />
            <TextArea
              label="Short description"
              name={`description-${index}`}
              defaultValue={video.description}
            />
            <Toggle
              label="Mark as featured"
              name={`featured-${index}`}
              defaultChecked={video.featured}
              hint="Used by any Videos section set to featured videos only."
            />
            <Toggle label="Show on the public site" name={`enabled-${index}`} defaultChecked={video.enabled} />
            <div className="flex flex-wrap gap-2">
              <MoveButtons index={index} />
              <ConfirmSubmit
                name={`remove-${index}`}
                value="1"
                message="Remove this video from the website list?"
              >
                Remove
              </ConfirmSubmit>
            </div>
          </fieldset>
        ))}
      </AdminForm>
      </div>

      <section>
        <h2 className="font-display text-2xl">YouTube playlists</h2>
        <p className="mt-2 mb-6 text-parchment/70">
          Used by any Playlists section, usually on Revision. Use the real playlist
          URL from the channel.
        </p>
        <AdminForm action={savePlaylistsAction} saveLabel="Save playlists">
          <input type="hidden" name="count" value={content.site.playlists.length} />
          {content.site.playlists.map((item, index) => (
            <fieldset
              key={item.url}
              className="space-y-4 rounded-xl border border-white/10 bg-navy p-4"
            >
              <legend className="px-1 font-display text-lg">{item.title}</legend>
              <Field label="Title" name={`title-${index}`} defaultValue={item.title} />
              <Field label="Playlist URL" name={`url-${index}`} defaultValue={item.url} />
              <ConfirmSubmit
                name={`remove-${index}`}
                value="1"
                message="Remove this playlist link?"
              >
                Remove
              </ConfirmSubmit>
            </fieldset>
          ))}
          <button
            type="submit"
            name="add"
            value="1"
            className="min-h-11 rounded-lg border border-brass px-4 font-semibold text-parchment"
          >
            Add a playlist
          </button>
        </AdminForm>
      </section>
    </div>
  );
}
