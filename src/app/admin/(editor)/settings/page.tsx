import { saveSettingsAction } from "@/app/admin/actions";
import { AdminForm, Field, TextArea, Toggle } from "@/components/admin/AdminForm";
import { getSiteContent } from "@/lib/content/store";

export default async function SettingsPage() {
  const content = await getSiteContent();
  const site = content.site;

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">General settings</h1>
      <p className="mt-3 mb-8 text-parchment/75">
        These details appear in the header, footer and tutoring blocks when they
        are filled in. Testimonials and the resources note are switched on from
        the Home layout, not from here.
      </p>
      <AdminForm action={saveSettingsAction}>
        <Field label="Public site name" name="name" defaultValue={site.name} required />
        <TextArea
          label="Short site description"
          name="shortDescription"
          defaultValue={site.shortDescription}
          hint="Used in the footer and as a plain-language summary."
        />
        <Field label="Tagline" name="tagline" defaultValue={site.tagline} />
        <Field
          label="Public email"
          name="enquiryEmail"
          type="email"
          defaultValue={site.enquiryEmail}
          hint="Leave blank to hide the enquire button."
        />
        <Field
          label="Public phone number"
          name="phone"
          defaultValue={site.phone}
          hint="Only add this if it should be visible to parents."
        />
        <Field
          label="Booking page link"
          name="bookingUrl"
          defaultValue={site.bookingUrl}
          hint="Optional. Use only if a real booking page exists."
        />
        <Field label="YouTube channel link" name="youtubeUrl" defaultValue={site.youtubeUrl} required />
        <Field label="YouTube handle" name="youtubeHandle" defaultValue={site.youtubeHandle} required />
        <label className="block">
          <span className="text-sm font-semibold text-parchment">Lesson format</span>
          <select
            name="lessonFormat"
            defaultValue={site.lessonFormat ?? ""}
            className="mt-1 w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-parchment"
          >
            <option value="">Not confirmed yet</option>
            <option value="online">Online</option>
            <option value="in-person">In person</option>
            <option value="both">Online and in person</option>
          </select>
        </label>
        <Field
          label="Town or area shown on the site"
          name="serviceArea"
          defaultValue={site.serviceArea}
          hint="A town or area is enough. Do not publish a private home address unless asked."
        />
        <Field
          label="Availability wording"
          name="availability"
          defaultValue={site.availability}
          hint='For example: "Limited weekday evenings."'
        />
        <Field
          label="Preferred contact note"
          name="contactPreference"
          defaultValue={site.contactPreference}
        />
        <Field
          label="Privacy page name"
          name="controllerName"
          defaultValue={content.privacy.controllerName}
        />
        <Field
          label="Privacy page email"
          name="controllerEmail"
          type="email"
          defaultValue={content.privacy.controllerEmail}
        />
        <div className="grid gap-3">
          <Toggle
            label="Show pricing when a price has been entered"
            name="showPricing"
            defaultChecked={content.features.showPricing}
          />
          <Toggle
            label="Show About in the header"
            name="showAbout"
            defaultChecked={content.features.showAbout}
            hint="This only controls the navigation link. Hide the About block on the Home layout if you want it off the homepage."
          />
          <Toggle
            label="Show Revision in the header"
            name="showVideos"
            defaultChecked={content.features.showVideos}
            hint="This only controls the navigation link. Video blocks have their own show switch."
          />
          <Toggle
            label="Show the enquiry button when an email exists"
            name="enableEnquiry"
            defaultChecked={content.features.enableEnquiry}
          />
        </div>
      </AdminForm>
    </div>
  );
}
