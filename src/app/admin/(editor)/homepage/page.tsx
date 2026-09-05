import { saveHomepageAction } from "@/app/admin/actions";
import { AdminForm, Field, TextArea } from "@/components/admin/AdminForm";
import { getSiteContent } from "@/lib/content/store";

export default async function HomepageEditorPage() {
  const { homepage } = await getSiteContent();

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Homepage</h1>
      <p className="mt-3 mb-8 text-parchment/75">
        These are the main public sentences. Keep them in Issy&apos;s classroom
        voice.
      </p>
      <AdminForm action={saveHomepageAction}>
        <Field label="Hero heading" name="heroHeading" defaultValue={homepage.heroHeading} required />
        <TextArea
          label="Hero supporting copy"
          name="heroSupporting"
          defaultValue={homepage.heroSupporting}
        />
        <Field label="Main button label" name="primaryCtaLabel" defaultValue={homepage.primaryCtaLabel} />
        <Field
          label="Main button destination"
          name="primaryCtaHref"
          defaultValue={homepage.primaryCtaHref}
          hint="Usually /revision"
        />
        <Field
          label="Second button label"
          name="secondaryCtaLabel"
          defaultValue={homepage.secondaryCtaLabel}
        />
        <Field
          label="Second button destination"
          name="secondaryCtaHref"
          defaultValue={homepage.secondaryCtaHref}
        />
        <Field
          label="Tutoring heading"
          name="tutoringHeading"
          defaultValue={homepage.tutoringHeading}
        />
        <TextArea
          label="Tutoring introduction"
          name="tutoringIntro"
          defaultValue={homepage.tutoringIntro}
          rows={5}
        />
        <Field label="Texts heading" name="textsHeading" defaultValue={homepage.textsHeading} />
        <TextArea label="Texts introduction" name="textsIntro" defaultValue={homepage.textsIntro} />
        <Field label="Videos heading" name="videosHeading" defaultValue={homepage.videosHeading} />
        <TextArea label="Videos introduction" name="videosIntro" defaultValue={homepage.videosIntro} />
        <Field label="About heading" name="aboutHeading" defaultValue={homepage.aboutHeading} />
        <TextArea label="Short about text" name="aboutShort" defaultValue={homepage.aboutShort} rows={5} />
        <TextArea label="Longer about text" name="aboutLong" defaultValue={homepage.aboutLong} rows={6} />
        <TextArea
          label="Message when enquiry email is missing"
          name="enquiryFallback"
          defaultValue={homepage.enquiryFallback}
        />
        <TextArea
          label="Resources note"
          name="resourcesTeaser"
          defaultValue={homepage.resourcesTeaser}
          hint="Only shown if the resources note is switched on in settings."
        />
        <Field
          label="Revision page heading"
          name="revisionHeading"
          defaultValue={homepage.revisionHeading}
        />
        <TextArea
          label="Revision page introduction"
          name="revisionIntro"
          defaultValue={homepage.revisionIntro}
          rows={5}
        />
      </AdminForm>
    </div>
  );
}
