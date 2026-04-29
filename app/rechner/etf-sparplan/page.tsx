import type { Metadata } from "next";
import SparplanRechner from "@/components/SparplanRechner";
import SchwabenKommentar from "@/components/SchwabenKommentar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ETF Sparplan Rechner — Zinseszins-Simulation",
  description:
    "Simuliere, wie dein Geld mit Zinseszins wachsen kann. ETF-Sparplan-Rechner mit Einmalzahlung, monatlicher Rate und historischer Rendite. Beispielrechnung, keine Anlageberatung.",
  alternates: {
    canonical: "/rechner/etf-sparplan",
  },
  keywords: [
    "ETF Sparplan Rechner",
    "Zinseszinsrechner",
    "Sparplanrechner",
    "Vermögensaufbau",
    "Renditerechner",
  ],
  openGraph: {
    title: "ETF Sparplan Rechner — Zinseszins-Simulation",
    description:
      "Simuliere, wie dein Geld mit Zinseszins wachsen kann. ETF-Sparplan-Rechner mit Einmalzahlung, monatlicher Rate und historischer Rendite. Beispielrechnung, keine Anlageberatung.",
  },
};

export default function EtfSparplanPage() {
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
        name: "ETF-Sparplan Rechner",
        item: "https://schwabenspart.com/rechner/etf-sparplan",
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
            ETF-Sparplan <span className="text-accent">Rechner</span>
          </h1>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            Berechne, wie dein Geld mit dem Zinseszins-Effekt wächst — und wann du
            dein Sparziel erreichst.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 text-sm text-muted">
        <Link href="/rechner" className="hover:text-primary transition-colors">
          Rechner
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-foreground">ETF-Sparplan Rechner</span>
      </nav>

      {/* Calculator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <SparplanRechner />
      </section>

      {/* Schwaben comment + Disclaimer (zusammenhängend) */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 space-y-3">
        <SchwabenKommentar text="A Schwabe weiss: Geld soll schaffe, net rumliega — fang mit 50 Euro a." />
        <div className="bg-foreground/5 rounded-xl p-4 text-xs text-muted">
          <strong>Beispielrechnung — keine Garantie.</strong> Die dargestellte Berechnung
          basiert auf einer gleichmäßigen, hypothetischen Wertentwicklung. Tatsächliche
          Renditen schwanken, können negativ sein und hängen von Marktentwicklung sowie
          individueller Situation ab. Dies ist keine Anlageberatung im Sinne des WpHG/KWG
          und keine Empfehlung zum Kauf bestimmter Finanzinstrumente.
        </div>
      </section>
    </>
  );
}
