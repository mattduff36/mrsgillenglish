import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Literata, Source_Sans_3 } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${literata.variable} ${sourceSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-page font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
