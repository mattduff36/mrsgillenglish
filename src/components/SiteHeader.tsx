"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Container } from "./Container";

type SiteHeaderProps = {
  name: string;
  navigation: { href: string; label: string }[];
  enquiryHref: string | null;
};

export function SiteHeader({ name, navigation, enquiryHref }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page/95 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/brand/youtube-profile.jpg"
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
            priority
          />
          <span className="font-display text-lg font-semibold tracking-tight text-navy sm:text-xl">
            {name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-medium text-ink-soft hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
          {enquiryHref ? (
            <Link
              href={enquiryHref}
              className="inline-flex min-h-11 items-center rounded-lg bg-navy px-4 text-sm font-semibold text-navy-foreground hover:bg-navy-deep"
            >
              Enquire about tutoring
            </Link>
          ) : null}
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-lg border border-line text-navy lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </Container>

      {open ? (
        <div
          id={menuId}
          className="border-t border-line bg-parchment lg:hidden"
        >
          <Container as="nav" className="flex flex-col gap-1 py-4" aria-label="Mobile">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-lg font-medium text-navy"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {enquiryHref ? (
              <Link
                href={enquiryHref}
                className="mt-2 inline-flex min-h-11 items-center justify-center rounded-lg bg-navy px-4 font-semibold text-navy-foreground"
                onClick={() => setOpen(false)}
              >
                Enquire about tutoring
              </Link>
            ) : null}
          </Container>
        </div>
      ) : null}
    </header>
  );
}
