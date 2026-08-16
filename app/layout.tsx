import type { Metadata } from "next";
import "./globals.css";

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Alena Studio — Handcrafted Bags in San Diego",
    template: "%s — Alena Studio",
  },
  description:
    "Handcrafted leather and woven bags, designed in San Diego in considered, limited runs.",
  applicationName: "Alena Studio",
  keywords: ["handcrafted bags", "leather bags", "woven bags", "San Diego"],
  openGraph: {
    title: "Alena Studio — Handcrafted Bags in San Diego",
    description:
      "Handcrafted leather and woven bags, designed in San Diego in considered, limited runs.",
    type: "website",
    locale: "en_US",
    siteName: "Alena Studio",
    images: [
      {
        url: "/images/alena-hero.png",
        width: 1680,
        height: 945,
        alt: "Alena Studio woven and cognac leather handbag",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alena Studio — Handcrafted Bags in San Diego",
    description: "Handcrafted leather and woven bags, designed in San Diego.",
    images: ["/images/alena-hero.png"],
  },
  robots: { index: false, follow: false },
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
