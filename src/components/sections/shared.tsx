import { ButtonLink } from "@/components/ButtonLink";
import { getSafeHref, splitParagraphs } from "@/lib/content/accessors";

export function surfaceClass(surface: "parchment" | "navy" | "taupe" | null, extra = "") {
  const tones = {
    parchment: "bg-parchment",
    navy: "bg-navy text-navy-foreground",
    taupe: "bg-taupe",
  } as const;
  return `${surface ? tones[surface] : ""} ${extra}`.trim();
}

export function Heading({
  level,
  className,
  children,
}: {
  level: 1 | 2;
  className: string;
  children: string;
}) {
  if (level === 1) {
    return <h1 className={className}>{children}</h1>;
  }
  return <h2 className={className}>{children}</h2>;
}

export function Paragraphs({
  body,
  className,
}: {
  body: string;
  className: string;
}) {
  return (
    <>
      {splitParagraphs(body).map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className={className}>
          {paragraph}
        </p>
      ))}
    </>
  );
}

export function SectionCtas({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  primaryVariant = "primary",
  secondaryVariant = "secondary",
  className = "mt-8 flex flex-wrap gap-3",
}: {
  primaryLabel?: string | null;
  primaryHref?: string | null;
  secondaryLabel?: string | null;
  secondaryHref?: string | null;
  primaryVariant?: "primary" | "secondary" | "ghost" | "inverse";
  secondaryVariant?: "primary" | "secondary" | "ghost" | "inverse";
  className?: string;
}) {
  const primary = getSafeHref(primaryHref);
  const secondary = getSafeHref(secondaryHref);
  if (!primary && !secondary) return null;

  return (
    <div className={className}>
      {primary && primaryLabel ? (
        <ButtonLink href={primary} variant={primaryVariant} external={/^https?:/i.test(primary)}>
          {primaryLabel}
        </ButtonLink>
      ) : null}
      {secondary && secondaryLabel ? (
        <ButtonLink
          href={secondary}
          variant={secondaryVariant}
          external={/^https?:/i.test(secondary)}
        >
          {secondaryLabel}
        </ButtonLink>
      ) : null}
    </div>
  );
}

export function sectionAnchor(anchor: "about" | "tutoring" | "revision" | null) {
  return anchor ?? undefined;
}
