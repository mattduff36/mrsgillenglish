import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
};

const variants = {
  primary:
    "bg-navy text-navy-foreground hover:bg-navy-deep",
  secondary:
    "border border-navy bg-transparent text-navy hover:bg-navy hover:text-navy-foreground",
  ghost:
    "text-navy underline decoration-brass decoration-2 underline-offset-4 hover:text-navy-deep",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonLinkProps) {
  const classes = `inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-2.5 text-base font-semibold transition-colors ${variants[variant]} ${className}`;

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
