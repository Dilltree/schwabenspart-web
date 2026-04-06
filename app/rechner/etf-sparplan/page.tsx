import type { Metadata } from "next";
import SparplanRechner from "@/components/SparplanRechner";
import SchwabenKommentar from "@/components/SchwabenKommentar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ETF Sparplan Rechner — Wann bist du Millionär?",
  description:
    "Berechne, wie dein Geld mit Zinseszins wächst. ETF-Sparplan simulieren mit Einmalzahlung, monatlicher Rate & historischer Rendite. Kostenlos.",
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
    title: "ETF Sparplan Rechner — Wann bist du Millionär?",
    description:
      "Berechne, wie dein Geld mit Zinseszins wächst. ETF-Sparplan simulieren mit Einmalzahlung, monatlicher Rate & historischer Rendite. Kostenlos.",
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

      {/* Schwaben comment */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
        <SchwabenKommentar text="A Schwabe weiss: Geld soll schaffe, net rumliega! Fang mit 50 Euro a — in 30 Johr lachsch drueber." />
      </section>

      {/* Disclaimer */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-foreground/5 rounded-xl p-4 text-xs text-muted">
          Die dargestellte Berechnung basiert auf einer gleichmäßigen, hypothetischen
          Wertentwicklung. Tatsächliche Renditen schwanken und können negativ sein.
          Dies ist keine Anlageberatung im Sinne des WpHG.
        </div>
      </section>
    </>
  );
}
