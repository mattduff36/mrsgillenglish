import { savePageLayoutAction } from "@/app/admin/actions";
import {
  AdminForm,
  ConfirmSubmit,
  Field,
  MoveButtons,
  Select,
  TextArea,
  Toggle,
} from "@/components/admin/AdminForm";
import { sectionHasContent } from "@/lib/content/accessors";
import { PAGE_PUBLIC_PATH, PAGE_TITLES, SECTION_LABELS } from "@/lib/content/pages";
import {
  SECTION_TYPES,
  type PageKey,
  type PageSection,
  type SiteContent,
} from "@/lib/content/schema";

const IMAGE_HINT =
  "Paste a path such as /images/mrs-gill-portrait.jpg or /brand/youtube-banner.jpg, or an https image URL.";

function PickedList({
  name,
  items,
  selected,
  hint,
}: {
  name: string;
  items: { id: string; label: string }[];
  selected: string[];
  hint: string;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-parchment/65">{hint}</p>;
  }
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold text-parchment">Items to show when using a picked list</legend>
      <p className="text-sm text-parchment/65">{hint}</p>
      {items.map((item) => (
        <label key={item.id} className="flex items-start gap-3 text-sm text-parchment/90">
          <input
            type="checkbox"
            name={name}
            value={item.id}
            defaultChecked={selected.includes(item.id)}
            className="mt-1 size-4 accent-brass"
          />
          <span>{item.label}</span>
        </label>
      ))}
    </fieldset>
  );
}

function SectionFields({
  section,
  index,
  content,
}: {
  section: PageSection;
  index: number;
  content: SiteContent;
}) {
  const i = index;
  const common = (
    <>
      <Select
        label="Page anchor"
        name={`anchor-${i}`}
        defaultValue={section.anchor ?? ""}
        hint="Keep about, tutoring or revision if the header should still jump to this block."
      >
        <option value="">None</option>
        <option value="about">about</option>
        <option value="tutoring">tutoring</option>
        <option value="revision">revision</option>
      </Select>
      <Select label="Background" name={`surface-${i}`} defaultValue={section.surface ?? ""}>
        <option value="">Default</option>
        <option value="parchment">Parchment</option>
        <option value="navy">Navy</option>
        <option value="taupe">Taupe</option>
      </Select>
    </>
  );

  switch (section.type) {
    case "hero":
      return (
        <>
          <p className="text-sm text-parchment/70">
            Top of the page: banner, heading, profile image and two buttons.
          </p>
          {common}
          <Field label="Heading" name={`heading-${i}`} defaultValue={section.heading} />
          <TextArea label="Supporting copy" name={`supporting-${i}`} defaultValue={section.supporting} />
          <Field label="Banner image" name={`bannerSrc-${i}`} defaultValue={section.bannerSrc} hint={IMAGE_HINT} />
          <Field label="Banner alt text" name={`bannerAlt-${i}`} defaultValue={section.bannerAlt} />
          <Field label="Profile image" name={`profileSrc-${i}`} defaultValue={section.profileSrc} hint={IMAGE_HINT} />
          <Field label="Profile alt text" name={`profileAlt-${i}`} defaultValue={section.profileAlt} />
          <Field label="Main button label" name={`primaryCtaLabel-${i}`} defaultValue={section.primaryCtaLabel} />
          <Field label="Main button destination" name={`primaryCtaHref-${i}`} defaultValue={section.primaryCtaHref} />
          <Field label="Second button label" name={`secondaryCtaLabel-${i}`} defaultValue={section.secondaryCtaLabel} />
          <Field
            label="Second button destination"
            name={`secondaryCtaHref-${i}`}
            defaultValue={section.secondaryCtaHref}
          />
        </>
      );
    case "prose":
      return (
        <>
          <p className="text-sm text-parchment/70">
            Plain text only. Leave a blank line between paragraphs. This block stays
            hidden if the body is empty.
          </p>
          {common}
          <Field label="Heading" name={`heading-${i}`} defaultValue={section.heading} />
          <TextArea label="Body" name={`body-${i}`} defaultValue={section.body} rows={7} />
        </>
      );
    case "cta":
      return (
        <>
          <p className="text-sm text-parchment/70">
            Optional heading and up to two buttons. The block stays hidden if every
            field is empty.
          </p>
          {common}
          <Field label="Heading" name={`heading-${i}`} defaultValue={section.heading} />
          <TextArea label="Supporting copy" name={`body-${i}`} defaultValue={section.body} />
          <Field label="Main button label" name={`primaryCtaLabel-${i}`} defaultValue={section.primaryCtaLabel} />
          <Field label="Main button destination" name={`primaryCtaHref-${i}`} defaultValue={section.primaryCtaHref} />
          <Field label="Second button label" name={`secondaryCtaLabel-${i}`} defaultValue={section.secondaryCtaLabel} />
          <Field
            label="Second button destination"
            name={`secondaryCtaHref-${i}`}
            defaultValue={section.secondaryCtaHref}
          />
        </>
      );
    case "textImage":
      return (
        <>
          <p className="text-sm text-parchment/70">
            Portrait or other image beside a heading and body. Qualifications can be
            pulled from the shared facts list.
          </p>
          {common}
          <Field label="Heading" name={`heading-${i}`} defaultValue={section.heading} />
          <TextArea label="Body" name={`body-${i}`} defaultValue={section.body} rows={6} />
          <Field label="Image" name={`imageSrc-${i}`} defaultValue={section.imageSrc} hint={IMAGE_HINT} />
          <Field label="Image alt text" name={`imageAlt-${i}`} defaultValue={section.imageAlt} />
          <Select label="Image side" name={`imageSide-${i}`} defaultValue={section.imageSide}>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </Select>
          <Toggle
            label="Show qualifications from the shared list"
            name={`showCredentials-${i}`}
            defaultChecked={section.showCredentials}
          />
          <Field label="Main button label" name={`primaryCtaLabel-${i}`} defaultValue={section.primaryCtaLabel} />
          <Field label="Main button destination" name={`primaryCtaHref-${i}`} defaultValue={section.primaryCtaHref} />
          <Field label="Second button label" name={`secondaryCtaLabel-${i}`} defaultValue={section.secondaryCtaLabel} />
          <Field
            label="Second button destination"
            name={`secondaryCtaHref-${i}`}
            defaultValue={section.secondaryCtaHref}
          />
        </>
      );
    case "imageBand":
      return (
        <>
          <p className="text-sm text-parchment/70">A full-width image. Hidden if the path or URL is empty or invalid.</p>
          {common}
          <Field label="Image" name={`imageSrc-${i}`} defaultValue={section.imageSrc} hint={IMAGE_HINT} />
          <Field label="Alt text" name={`imageAlt-${i}`} defaultValue={section.imageAlt} />
        </>
      );
    case "videos":
      return (
        <>
          <p className="text-sm text-parchment/70">
            Uses the Videos catalogue. Featured or picked lists stay hidden until
            matching videos are switched on.
          </p>
          {common}
          <Field label="Heading" name={`heading-${i}`} defaultValue={section.heading} />
          <TextArea label="Introduction" name={`intro-${i}`} defaultValue={section.intro} />
          <Select label="Which videos" name={`selection-${i}`} defaultValue={section.selection}>
            <option value="all">All enabled videos</option>
            <option value="featured">Featured videos only</option>
            <option value="picked">A picked list</option>
          </Select>
          <PickedList
            name={`itemIds-${i}`}
            selected={section.itemIds}
            hint="Tick videos for a picked list. Add or enable videos on the Videos page."
            items={content.videos.map((video) => ({
              id: video.id,
              label: `${video.title}${video.enabled ? "" : " (hidden)"}`,
            }))}
          />
          <Toggle
            label="Show the link to the revision page"
            name={`showRevisionCta-${i}`}
            defaultChecked={section.showRevisionCta}
          />
        </>
      );
    case "testimonials":
      return (
        <>
          <p className="text-sm text-parchment/70">
            Uses approved quotes from the Testimonials catalogue. Never invent a quote.
          </p>
          {common}
          <Field label="Heading" name={`heading-${i}`} defaultValue={section.heading} />
          <Select label="Which quotes" name={`selection-${i}`} defaultValue={section.selection}>
            <option value="all">All enabled quotes</option>
            <option value="picked">A picked list</option>
          </Select>
          <PickedList
            name={`itemIds-${i}`}
            selected={section.itemIds}
            hint="Add approved quotes on the Testimonials page first."
            items={content.testimonials.map((item) => ({
              id: item.id,
              label: item.attribution,
            }))}
          />
        </>
      );
    case "literatureTexts":
      return (
        <>
          <p className="text-sm text-parchment/70">
            Cards from the Channel texts catalogue. Hidden if that list is empty.
          </p>
          {common}
          <Field label="Heading" name={`heading-${i}`} defaultValue={section.heading} />
          <TextArea label="Introduction" name={`intro-${i}`} defaultValue={section.intro} />
          <Select label="Which texts" name={`selection-${i}`} defaultValue={section.selection}>
            <option value="all">All channel texts</option>
            <option value="picked">A picked list</option>
          </Select>
          <PickedList
            name={`itemIds-${i}`}
            selected={section.itemIds}
            hint="Edit the list on Channel texts."
            items={content.literatureTexts.map((item) => ({
              id: item.id,
              label: item.title,
            }))}
          />
        </>
      );
    case "credentials":
      return (
        <>
          <p className="text-sm text-parchment/70">Public qualifications from the shared facts list on About.</p>
          {common}
          <Field label="Heading" name={`heading-${i}`} defaultValue={section.heading} />
          <Select label="Which facts" name={`selection-${i}`} defaultValue={section.selection}>
            <option value="all">All enabled facts</option>
            <option value="picked">A picked list</option>
          </Select>
          <PickedList
            name={`itemIds-${i}`}
            selected={section.itemIds}
            hint="Edit facts on the About page."
            items={content.credentials.map((item) => ({
              id: item.id,
              label: item.label,
            }))}
          />
        </>
      );
    case "tutoring":
      return (
        <>
          <p className="text-sm text-parchment/70">
            Lesson format and area come from General settings. Offers, focuses and extra
            texts come from the Tutoring catalogue.
          </p>
          {common}
          <Field label="Heading" name={`heading-${i}`} defaultValue={section.heading} />
          <TextArea label="Introduction" name={`intro-${i}`} defaultValue={section.intro} rows={5} />
          <TextArea
            label="Message when enquiry email is missing"
            name={`enquiryFallback-${i}`}
            defaultValue={section.enquiryFallback}
          />
          <Toggle label="Show lesson format, area and availability" name={`showLessonMeta-${i}`} defaultChecked={section.showLessonMeta} />
          <Toggle label="Show extra focuses" name={`showFocuses-${i}`} defaultChecked={section.showFocuses} />
          <Toggle label="Show extra lesson texts" name={`showTutoredTexts-${i}`} defaultChecked={section.showTutoredTexts} />
          <Toggle label="Show the enquiry button" name={`showEnquiry-${i}`} defaultChecked={section.showEnquiry} />
          <Select label="Which offers" name={`serviceSelection-${i}`} defaultValue={section.serviceSelection}>
            <option value="all">All enabled offers</option>
            <option value="picked">A picked list</option>
          </Select>
          <PickedList
            name={`serviceIds-${i}`}
            selected={section.serviceIds}
            hint="Add offers on the Tutoring page."
            items={content.services.map((item) => ({ id: item.id, label: item.title }))}
          />
          <Select label="Which focuses" name={`focusSelection-${i}`} defaultValue={section.focusSelection}>
            <option value="all">All enabled focuses</option>
            <option value="picked">A picked list</option>
          </Select>
          <PickedList
            name={`focusIds-${i}`}
            selected={section.focusIds}
            hint="Add focuses on the Tutoring page."
            items={content.offerFocuses.map((item) => ({ id: item.id, label: item.label }))}
          />
          <Select label="Which extra texts" name={`textSelection-${i}`} defaultValue={section.textSelection}>
            <option value="all">All enabled extra texts</option>
            <option value="picked">A picked list</option>
          </Select>
          <PickedList
            name={`tutoredTextIds-${i}`}
            selected={section.tutoredTextIds}
            hint="Add extra texts on the Tutoring page."
            items={content.tutoredTexts.map((item) => ({ id: item.id, label: item.title }))}
          />
        </>
      );
    case "playlists":
      return (
        <>
          <p className="text-sm text-parchment/70">YouTube playlist links from the Videos page.</p>
          {common}
          <Field label="Heading" name={`heading-${i}`} defaultValue={section.heading} />
          <Select label="Which playlists" name={`selection-${i}`} defaultValue={section.selection}>
            <option value="all">All playlists</option>
            <option value="picked">A picked list</option>
          </Select>
          <PickedList
            name={`itemIds-${i}`}
            selected={section.itemIds}
            hint="Edit playlists on the Videos page."
            items={content.site.playlists.map((item) => ({
              id: item.url,
              label: item.title,
            }))}
          />
        </>
      );
    case "revisionCatalogue":
      return (
        <>
          <p className="text-sm text-parchment/70">
            Filterable video grid. Hidden if the selected videos are all switched off.
          </p>
          {common}
          <Select label="Which videos" name={`selection-${i}`} defaultValue={section.selection}>
            <option value="all">All enabled videos</option>
            <option value="picked">A picked list</option>
          </Select>
          <PickedList
            name={`itemIds-${i}`}
            selected={section.itemIds}
            hint="Add or enable videos on the Videos page."
            items={content.videos.map((video) => ({
              id: video.id,
              label: video.title,
            }))}
          />
        </>
      );
    case "privacyContact":
      return (
        <>
          <p className="text-sm text-parchment/70">
            Uses the privacy name and email from General settings. Do not invent a
            legal controller. If those fields are empty, the current fallback wording
            is shown.
          </p>
          {common}
        </>
      );
    default: {
      const _never: never = section;
      return _never;
    }
  }
}

export function PageLayoutEditor({
  page,
  content,
  intro,
}: {
  page: PageKey;
  content: SiteContent;
  intro: string;
}) {
  const sections = content.pages[page].sections;
  const publicPath = PAGE_PUBLIC_PATH[page];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">{PAGE_TITLES[page]} layout</h1>
      <p className="mt-3 mb-4 max-w-2xl text-parchment/75">{intro}</p>
      <p className="mb-8 text-sm text-parchment/65">
        <a
          href={publicPath}
          target="_blank"
          rel="noreferrer"
          className="font-semibold underline decoration-brass underline-offset-4"
        >
          View public page
        </a>
        . Saved changes appear shortly. A switched-off or empty block does not show.
      </p>
      <AdminForm action={savePageLayoutAction}>
        <input type="hidden" name="page" value={page} />
        <input type="hidden" name="count" value={sections.length} />
        {sections.map((section, index) => {
          const hiddenWhy = !section.enabled
            ? "Switched off."
            : sectionHasContent(content, section)
              ? null
              : "This block will stay hidden until it has enough content or catalogue items.";
          return (
            <fieldset
              key={section.id}
              className="space-y-4 rounded-xl border border-white/10 bg-navy p-4"
            >
              <legend className="px-1 font-display text-lg">
                {SECTION_LABELS[section.type]}
              </legend>
              <input type="hidden" name={`type-${index}`} value={section.type} />
              <input type="hidden" name={`id-${index}`} value={section.id} />
              {hiddenWhy ? <p className="text-sm text-brass">{hiddenWhy}</p> : null}
              <Toggle
                label="Show on the public page"
                name={`enabled-${index}`}
                defaultChecked={section.enabled}
              />
              <SectionFields section={section} index={index} content={content} />
              <div className="flex flex-wrap gap-2">
                <MoveButtons index={index} />
                <ConfirmSubmit
                  name={`remove-${index}`}
                  value="1"
                  message="Remove this section from the page?"
                >
                  Remove
                </ConfirmSubmit>
              </div>
            </fieldset>
          );
        })}
        <div className="flex flex-wrap items-end gap-3 rounded-xl border border-brass/40 bg-navy p-4">
          <Select label="Add a section" name="addType" defaultValue="prose">
            {SECTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {SECTION_LABELS[type]}
              </option>
            ))}
          </Select>
          <button
            type="submit"
            name="add"
            value="1"
            className="min-h-11 rounded-lg border border-brass px-4 font-semibold text-parchment"
          >
            Add section
          </button>
        </div>
        <ConfirmSubmit
          name="reset"
          value="1"
          message={`Reset the ${PAGE_TITLES[page]} page to the default layout? Your edits on this page will be replaced.`}
        >
          Reset this page to the default layout
        </ConfirmSubmit>
      </AdminForm>
    </div>
  );
}
