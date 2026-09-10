import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { getSiteContent } from "@/lib/content/store";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: "Privacy",
    description: `How ${content.site.name} treats privacy on this website.`,
    alternates: { canonical: "/privacy" },
  };
}

export default async function PrivacyPage() {
  const content = await getSiteContent();
  const controllerName = content.privacy.controllerName;
  const controllerEmail = content.privacy.controllerEmail;

  return (
    <main id="main" className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold text-navy">Privacy</h1>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
          <p>
            This website is for secondary-age English tutoring and revision. It
            does not ask pupils to send personal information, and it does not
            publish student names or photographs.
          </p>
          <p>
            The public site does not use Google Analytics, advertising pixels,
            or pupil accounts. A private site editor is signed in separately and
            is not part of the public tutoring pages.
          </p>
          <p>
            Revision cards use thumbnails stored on this site, or a YouTube
            thumbnail when a newer video is added. Following a video link takes
            you to YouTube, which has its own privacy policy. This site does not
            embed a YouTube player on page load.
          </p>
          {controllerName || controllerEmail ? (
            <p>
              Privacy questions can be sent to {controllerName || content.site.name}
              {controllerEmail ? (
                <>
                  {" "}
                  at{" "}
                  <a
                    href={`mailto:${controllerEmail}`}
                    className="font-semibold text-navy underline decoration-brass underline-offset-4"
                  >
                    {controllerEmail}
                  </a>
                </>
              ) : null}
              .
            </p>
          ) : (
            <p>
              The legal privacy controller details are not published yet. When
              a contact address and trading name are confirmed, they will be
              added here. Until then, treat this page as a description of what
              the site actually does, not as a full controller notice.
            </p>
          )}
          <p>
            Do not send sensitive information about a child through YouTube
            comments.
          </p>
        </div>
      </Container>
    </main>
  );
}
