import { SachettoPage } from "@/app/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sachetto — Bolsos artesanales en San Diego",
  description: "Bolsos de piel y tejidos hechos a mano, diseñados en San Diego.",
  openGraph: { locale: "es_MX", title: "Sachetto — Bolsos artesanales en San Diego" },
};

export default function SpanishPage() {
  return <SachettoPage language="es" />;
}
