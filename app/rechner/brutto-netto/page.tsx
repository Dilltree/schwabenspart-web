import type { Metadata } from "next";
import BruttoNettoRechner from "@/components/BruttoNettoRechner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brutto Netto Rechner 2026 — Was bleibt vom Gehalt?",
  description:
    "Berechne in Sekunden dein Nettoeinkommen für 2026. Mit Steuerklasse, Kirchensteuer & Kinderfreibetrag. Einfach, schnell, kostenlos.",
  alternates: {
    canonical: "/rechner/brutto-netto",
  },
  keywords: [
    "Brutto Netto Rechner",
    "Gehaltsrechner 2026",
    "Nettolohn berechnen",
    "Was bleibt vom Gehalt",
  ],
  openGraph: {
    title: "Brutto Netto Rechner 2026 — Was bleibt vom Gehalt?",
    description:
      "Berechne in Sekunden dein Nettoeinkommen für 2026. Mit Steuerklasse, Kirchensteuer & Kinderfreibetrag. Einfach, schnell, kostenlos.",
  },
};

export default function BruttoNettoPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://schwabenspart.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rechner",
        item: "https://schwabenspart.com/rechner",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Brutto-Netto Rechner",
        item: "https://schwabenspart.com/rechner/brutto-netto",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Brutto-Netto <span className="text-accent">Rechner</span>
          </h1>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            Was bleibt vom Gehalt? Schnell und ehrlich berechnet — für 2026.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 text-sm text-muted">
        <Link href="/rechner" className="hover:text-primary transition-colors">
          Rechner
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-foreground">Brutto-Netto Rechner</span>
      </nav>

      {/* Calculator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <BruttoNettoRechner />
      </section>

      {/* Disclaimer */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-foreground/5 rounded-xl p-4 text-xs text-muted">
          Dieser Rechner liefert eine unverbindliche Schätzung und ersetzt keine
          Lohnabrechnung oder steuerliche Beratung. Abweichungen sind möglich bei
          Freibeträgen, geldwerten Vorteilen oder betrieblicher Altersvorsorge.
          Gemäß §2 Abs. 1 StBerG dürfen wir keine Steuerberatung anbieten.
        </div>
      </section>
    </>
  );
}
