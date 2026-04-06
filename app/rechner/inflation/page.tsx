import type { Metadata } from "next";
import InflationsRechner from "@/components/InflationsRechner";
import SchwabenKommentar from "@/components/SchwabenKommentar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inflationsrechner 2026 — Was ist dein Geld noch wert?",
  description:
    "Berechne, wie Inflation dein Geld entwertet. Kaufkraftverlust über Zeit sichtbar machen — mit historischen Daten seit 1991. Kostenlos.",
  alternates: {
    canonical: "/rechner/inflation",
  },
  keywords: [
    "Inflationsrechner",
    "Kaufkraftverlust berechnen",
    "Inflation Rechner",
    "Was ist mein Geld wert",
    "Geldentwertung",
  ],
  openGraph: {
    title: "Inflationsrechner 2026 — Was ist dein Geld noch wert?",
    description:
      "Berechne, wie Inflation dein Geld entwertet. Kaufkraftverlust über Zeit sichtbar machen — mit historischen Daten seit 1991. Kostenlos.",
  },
};

export default function InflationsRechnerPage() {
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
        name: "Inflationsrechner",
        item: "https://schwabenspart.com/rechner/inflation",
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
            Inflations<span className="text-accent">rechner</span>
          </h1>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            Was ist dein Geld wirklich noch wert? Der Schwabe rechnet nach.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 text-sm text-muted">
        <Link href="/rechner" className="hover:text-primary transition-colors">
          Rechner
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-foreground">Inflationsrechner</span>
      </nav>

      {/* Calculator */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <InflationsRechner />
      </section>

      {/* Info section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
        <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-foreground">
            Was bedeutet Inflation eigentlich?
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            Inflation bedeutet, dass alles teurer wird. Was du letztes Jahr
            f&uuml;r 100&nbsp;&euro; kaufen konntest, kostet dieses Jahr
            vielleicht 102&nbsp;&euro;. Dein Geld verliert also an Kaufkraft
            &mdash; du kannst dir f&uuml;r den gleichen Betrag weniger leisten.
          </p>
          <p className="text-muted text-sm leading-relaxed">
            Das klingt erstmal nach wenig, aber &uuml;ber Jahre summiert sich
            das gewaltig. Bei 2&nbsp;% Inflation pro Jahr ist dein Geld nach
            35&nbsp;Jahren nur noch die H&auml;lfte wert. Geld, das einfach auf
            dem Konto liegt, wird also schleichend entwertet.
          </p>
          <p className="text-muted text-sm leading-relaxed">
            Die Inflationsrate wird in Deutschland vom Statistischen Bundesamt
            anhand eines Warenkorbs berechnet. Die Daten in diesem Rechner
            basieren auf den offiziellen Verbraucherpreisindex-Werten seit 1991.
          </p>
        </div>
      </section>

      {/* Schwaben comment */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-8">
        <SchwabenKommentar text="Inflation isch wie a Loch im Geldbeutel — du merksch es net sofort, aber am End vom Monat fehlt immer a bissle mehr. Drum spart der Schwabe net nur, er legt au a!" />
      </section>

      {/* Disclaimer */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-foreground/5 rounded-xl p-4 text-xs text-muted">
          Die dargestellten Inflationsraten basieren auf dem
          Verbraucherpreisindex des Statistischen Bundesamtes. Zuk&uuml;nftige
          Werte sind Sch&auml;tzungen und k&ouml;nnen abweichen. Dies ist keine
          Finanz- oder Anlageberatung.
        </div>
      </section>
    </>
  );
}
