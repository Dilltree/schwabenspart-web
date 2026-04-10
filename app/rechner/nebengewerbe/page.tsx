import type { Metadata } from "next";
import NebengewerbeRechner from "@/components/NebengewerbeRechner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nebengewerbe Rechner 2026 — Was bleibt vom Nebenverdienst?",
  description:
    "Berechne in Sekunden, was dir vom Nebengewerbe netto übrig bleibt. Mit Kleinunternehmer-Check, Gewerbesteuer und Einkommensteuer-Zusatzlast.",
  alternates: {
    canonical: "/rechner/nebengewerbe",
  },
  keywords: [
    "Nebengewerbe Rechner",
    "Nebenverdienst berechnen 2026",
    "Kleinunternehmer Grenze",
    "Gewerbesteuer Rechner",
    "Nebengewerbe Steuer",
  ],
  openGraph: {
    title: "Nebengewerbe Rechner 2026 — Was bleibt vom Nebenverdienst?",
    description:
      "Berechne in Sekunden, was dir vom Nebengewerbe netto übrig bleibt. Mit Kleinunternehmer-Check, Gewerbesteuer und Einkommensteuer-Zusatzlast.",
  },
};

export default function NebengewerbePage() {
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
        name: "Nebengewerbe Rechner",
        item: "https://schwabenspart.com/rechner/nebengewerbe",
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
            Nebengewerbe <span className="text-accent">Rechner</span>
          </h1>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            Was bleibt vom Nebenverdienst? Mit Kleinunternehmer-Check,
            Gewerbesteuer und Einkommensteuer-Effekt — für 2026.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 text-sm text-muted">
        <Link href="/rechner" className="hover:text-primary transition-colors">
          Rechner
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-foreground">Nebengewerbe Rechner</span>
      </nav>

      {/* Rechner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <NebengewerbeRechner />
      </section>

      {/* Kontext / SEO */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12 space-y-6">
        <div className="bg-card rounded-2xl border border-foreground/5 p-6">
          <h2 className="text-lg font-bold text-foreground">
            Was dieser Rechner macht
          </h2>
          <p className="text-sm text-muted mt-3">
            Viele Angestellte bauen nebenbei etwas auf — als Freelancer, mit
            einem Etsy-Shop, Affiliate-Seiten oder handwerklichen Projekten.
            Die große Frage ist immer: Wie viel bleibt am Ende wirklich übrig,
            wenn das Finanzamt fertig ist?
          </p>
          <p className="text-sm text-muted mt-3">
            Dieser Rechner schaut sich drei Sachen auf einmal an: die
            Kleinunternehmer-Regelung nach § 19 UStG (damit klar ist, ob du
            Umsatzsteuer ausweisen musst), die Gewerbesteuer mit ihrem
            Freibetrag von 24.500 € und der Anrechnung auf die Einkommensteuer
            nach § 35 EStG, und den Grenzsteuersatz-Effekt — dein
            Nebengewerbe-Gewinn wird zum Hauptjob-Einkommen addiert und oben
            drauf besteuert.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-foreground/5 p-6">
          <h2 className="text-lg font-bold text-foreground">
            Die drei Stolpersteine, die viele übersehen
          </h2>
          <ul className="text-sm text-muted mt-3 space-y-3">
            <li>
              <strong className="text-foreground">
                Grenzsteuersatz statt Durchschnitt:
              </strong>{" "}
              Dein Nebengewerbe wird nicht mit dem Durchschnittssteuersatz
              besteuert, sondern mit dem Satz, der auf den nächsten Euro
              deines Hauptgehalts greift. Bei 50.000 € Hauptjob sind das
              schnell 35–42 % auf jeden Zusatz-Euro.
            </li>
            <li>
              <strong className="text-foreground">
                Hauptberuflich selbstständig:
              </strong>{" "}
              Sobald dein Nebengewerbe mehr Zeit frisst oder mehr Einkommen
              bringt als dein Hauptjob, kann deine Krankenkasse dich
              umgruppieren. Dann zahlst du KV und PV selbst — plötzlich sind
              20 % vom Gewinn weg. Der Rechner warnt, wenn du in die Nähe
              kommst.
            </li>
            <li>
              <strong className="text-foreground">
                Gewerbesteuer-Anrechnung:
              </strong>{" "}
              Viele rechnen Gewerbesteuer doppelt. In Wahrheit wird das
              3,8-fache des Messbetrags auf die Einkommensteuer angerechnet —
              bis zu einem Hebesatz von 380 % ist die Gewerbesteuer für
              Einzelunternehmer praktisch kostenlos.
            </li>
          </ul>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-foreground/5 rounded-xl p-4 text-xs text-muted">
          Dieser Rechner liefert eine unverbindliche Schätzung und ersetzt
          keine Steuerberatung. Die Berechnung ist vereinfacht — echte
          Ergebnisse hängen u. a. von Verlustvorträgen, IHK-Mitgliedschaft,
          der exakten Progression, Kirchensteuer und individuellen
          Freibeträgen ab. Gemäß § 2 Abs. 1 StBerG dürfen wir keine
          Steuerberatung anbieten.
        </div>
      </section>
    </>
  );
}
