import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  external?: boolean;
  className?: string;
};

const variants = {
  primary:
    "px-5 bg-navy text-navy-foreground hover:bg-navy-deep",
  secondary:
    "px-5 border border-navy bg-transparent text-navy hover:bg-navy hover:text-navy-foreground",
  // A text link, so it keeps the 44px touch target but sits flush with the
  // text column rather than looking indented.
  ghost:
    "text-navy underline decoration-brass decoration-2 underline-offset-4 hover:text-navy-deep",
  inverse:
    "px-5 bg-parchment text-navy hover:bg-page",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonLinkProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-lg py-2.5 text-base font-semibold transition-colors ${variants[variant]} ${className}`;

  const offSite = external || /^(mailto:|tel:|https?:)/i.test(href);

  if (offSite) {
    return (
      <a
        href={href}
        className={classes}
        rel={external ? "noreferrer noopener" : undefined}
        target={external ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
