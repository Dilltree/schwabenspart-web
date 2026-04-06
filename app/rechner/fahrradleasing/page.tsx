import type { Metadata } from "next";
import FahrradleasingRechner from "@/components/FahrradleasingRechner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fahrradleasing Rechner 2026 — Lohnt sich JobRad wirklich?",
  description:
    "Berechne deine echte Ersparnis beim Fahrradleasing vs. Direktkauf. Neutral, ehrlich, mit allen Kosten. Ein Schwabe rechnet nach.",
  alternates: {
    canonical: "/rechner/fahrradleasing",
  },
  keywords: [
    "Fahrradleasing Rechner",
    "JobRad Rechner",
    "Dienstrad Rechner",
    "Fahrradleasing vs Kauf",
    "E-Bike Leasing",
  ],
  openGraph: {
    title: "Fahrradleasing Rechner 2026 — Lohnt sich JobRad wirklich?",
    description:
      "Berechne deine echte Ersparnis beim Fahrradleasing vs. Direktkauf. Neutral, ehrlich, mit allen Kosten. Ein Schwabe rechnet nach.",
  },
};

export default function FahrradleasingPage() {
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
        name: "Fahrradleasing Rechner",
        item: "https://schwabenspart.com/rechner/fahrradleasing",
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
            Fahrradleasing <span className="text-accent">Rechner</span>
          </h1>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            Lohnt sich Fahrradleasing wirklich? Der schwäbisch-ehrliche Vergleich.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 text-sm text-muted">
        <Link href="/rechner" className="hover:text-primary transition-colors">
          Rechner
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-foreground">Fahrradleasing Rechner</span>
      </nav>

      {/* Erklärung */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-foreground">So funktioniert Fahrradleasing</h2>
          <div className="space-y-3 text-sm text-muted leading-relaxed">
            <p>
              Beim <strong className="text-foreground">Fahrradleasing über den Arbeitgeber</strong> (z.B. JobRad, Lease-a-Bike, BusinessBike)
              wird die monatliche Leasingrate direkt von deinem <strong className="text-foreground">Bruttogehalt</strong> abgezogen —
              das nennt sich Gehaltsumwandlung.
            </p>
            <p>
              Dadurch sinkt dein zu versteuerndes Einkommen, und du zahlst weniger Lohnsteuer und Sozialabgaben.
              Das ist der eigentliche Vorteil.
            </p>
            <div className="bg-foreground/5 rounded-xl p-4 space-y-2">
              <p className="font-semibold text-foreground text-sm">Der Ablauf in 4 Schritten:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Du suchst dir ein Fahrrad aus — dein Arbeitgeber least es</li>
                <li>Die Leasingrate wird monatlich von deinem <strong className="text-foreground">Bruttolohn</strong> abgezogen</li>
                <li>Du versteuerst 0,25% des Listenpreises als geldwerten Vorteil</li>
                <li>Nach {`{Laufzeit}`} Monaten: Übernahme zum Restwert (ca. 18%) oder Rückgabe</li>
              </ol>
            </div>
            <p>
              <strong className="text-foreground">Klingt gut — aber:</strong> Beim Leasing zahlst du immer den vollen Listenpreis (UVP).
              Im Laden bekommst du oft 10-25% Rabatt. Das kann den Steuervorteil komplett auffressen.
              Genau das rechnet unser Rechner für dich durch.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-12">
        <FahrradleasingRechner />
      </section>

      {/* Disclaimer */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-foreground/5 rounded-xl p-4 text-xs text-muted">
          Diese Berechnung ist eine vereinfachte Schätzung. Die tatsächliche
          Ersparnis hängt von individuellen Faktoren ab. Dies ist keine
          Steuerberatung. Hinweis: Eine Gehaltsumwandlung reduziert dein
          sozialversicherungspflichtiges Brutto — das kann sich auf Rente,
          Krankengeld, Elterngeld und Arbeitslosengeld auswirken.
        </div>
      </section>
    </>
  );
}
