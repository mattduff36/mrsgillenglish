import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { PublicChrome } from "@/components/PublicChrome";

export default function NotFound() {
  return (
    <PublicChrome>
      <main id="main" className="py-24">
        <Container className="max-w-xl">
          <h1 className="font-display text-4xl font-semibold text-navy">
            That page is not here.
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            The link may be old, or the page has not been written yet. The home
            page and the revision library are both complete.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/">Back home</ButtonLink>
            <ButtonLink href="/revision" variant="secondary">
              Revision videos
            </ButtonLink>
          </div>
        </Container>
      </main>
    </PublicChrome>
  );
}
