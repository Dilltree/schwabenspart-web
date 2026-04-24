import type { Metadata } from "next";
import TeilzeitRechner from "@/components/TeilzeitRechner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Teilzeit-Rechner 2026 — Brutto und Netto bei reduzierter Stunde",
  description:
    "Vollzeit-Brutto und Wochenstunden eingeben, Teilzeit-Stunden waehlen, Brutto + Netto fuer Teilzeit sehen. Mit Steuer-Progression. Schwabenspart.com.",
  alternates: {
    canonical: "/rechner/teilzeit",
  },
  keywords: [
    "Teilzeit Rechner",
    "Teilzeit Brutto Netto",
    "Stundenreduktion Gehalt",
    "Wie viel weniger Netto bei Teilzeit",
    "Teilzeit Gehaltsrechner 2026",
  ],
  openGraph: {
    title: "Teilzeit-Rechner 2026 — Brutto und Netto bei reduzierter Stunde",
    description:
      "Vollzeit-Brutto und Wochenstunden eingeben, Teilzeit-Stunden waehlen, Brutto + Netto fuer Teilzeit sehen. Mit Steuer-Progression.",
  },
};

export default function TeilzeitPage() {
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
        name: "Teilzeit-Rechner",
        item: "https://schwabenspart.com/rechner/teilzeit",
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
            Teilzeit-<span className="text-accent">Rechner</span>
          </h1>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            Wie viel Brutto und Netto bleiben bei reduzierter Stundenzahl?
            Vergleich Vollzeit vs. Teilzeit auf einen Blick.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 text-sm text-muted">
        <Link href="/rechner" className="hover:text-primary transition-colors">
          Rechner
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-foreground">Teilzeit-Rechner</span>
      </nav>

      {/* Calculator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <TeilzeitRechner />
      </section>

      {/* Disclaimer */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-foreground/5 rounded-xl p-4 text-xs text-muted">
          Dieser Rechner liefert eine unverbindliche Schaetzung des
          Teilzeit-Gehalts auf Basis einer linearen Stundenreduktion. Tarif-
          oder Einzelvereinbarungen koennen abweichen (z.B. Schichtzuschlaege,
          variable Vergütung, Bonus). Steuerprogression ist beruecksichtigt,
          aber Lohnsteuer-Tabellen koennen marginal abweichen. Gemaess §2 Abs. 1
          StBerG duerfen wir keine Steuerberatung anbieten.
        </div>
      </section>
    </>
  );
}
