import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/settings", label: "General settings" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/services", label: "Tutoring" },
  { href: "/admin/videos", label: "Videos" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/seo", label: "Search listings" },
];

export function AdminShell({
  email,
  persistNote,
  children,
}: {
  email: string;
  persistNote: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full bg-navy-deep text-parchment">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-parchment focus:px-3 focus:py-2 focus:text-navy"
      >
        Skip to editor
      </a>
      <div className="lg:grid lg:grid-cols-[16rem_1fr]">
        <aside className="border-b border-white/10 bg-navy lg:min-h-screen lg:border-b-0 lg:border-r">
          <div className="px-5 py-6">
            <p className="font-display text-xl font-semibold">Mrs Gill English</p>
            <p className="mt-1 text-sm text-parchment/70">Site editor</p>
          </div>
          <nav aria-label="Editor" className="flex flex-col gap-1 px-3 pb-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-parchment/90 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="space-y-3 border-t border-white/10 px-5 py-5 text-sm">
            <p className="text-parchment/70">{email}</p>
            <p className="text-parchment/60">{persistNote}</p>
            <a
              href="/"
              className="inline-flex min-h-10 items-center font-semibold text-parchment underline decoration-brass underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              Open public site
            </a>
            <form action={logoutAction}>
              <button
                type="submit"
                className="mt-2 inline-flex min-h-10 items-center font-semibold text-parchment hover:underline"
              >
                Sign out
              </button>
            </form>
          </div>
        </aside>
        <main id="admin-main" className="px-4 py-8 sm:px-8">
          <div className="mx-auto max-w-3xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
