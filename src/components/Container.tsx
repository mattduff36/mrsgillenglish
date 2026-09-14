import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "nav";
  // JSX does not type-check hyphenated attributes, so this has to be an
  // explicit prop or landmark labels are silently dropped.
  "aria-label"?: string;
};

export function Container({
  children,
  className = "",
  as: Tag = "div",
  "aria-label": ariaLabel,
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
}
