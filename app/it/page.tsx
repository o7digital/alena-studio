import { SachettoPage } from "@/app/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sachetto — Borse artigianali a San Diego",
  description: "Borse in pelle e tessuto fatte a mano, progettate a San Diego.",
  openGraph: { locale: "it_IT", title: "Sachetto — Borse artigianali a San Diego" },
};

export default function ItalianPage() {
  return <SachettoPage language="it" />;
}
