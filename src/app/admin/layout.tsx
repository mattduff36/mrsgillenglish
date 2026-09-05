import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Site editor",
    template: "%s | Site editor",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
