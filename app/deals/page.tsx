import type { Metadata } from "next";
import DealTable, { type Deal } from "@/components/DealTable";
import DealsNav from "@/components/DealsNav";
import SchwabenKommentar from "@/components/SchwabenKommentar";

export const metadata: Metadata = {
  title: "Deals & Vergleiche",
  description: "Die besten Finanzprodukte im Schwaben-Vergleich. Girokonten, Depots, Tagesgeld — ehrlich bewertet.",
  keywords: ["Deals", "Vergleiche", "Girokonto", "Depot", "Tagesgeld", "Finanzprodukte", "Broker", "kostenlos"],
  openGraph: {
    type: "website",
    title: "Deals & Vergleiche — schwabenspart",
    description: "Die besten Finanzprodukte im Schwaben-Vergleich. Girokonten, Depots, Tagesgeld — ehrlich bewertet.",
  },
};

const GIROKONTEN: Deal[] = [
  {
    name: "ING",
    kategorie: "Girokonto",
    vorteil: "Kostenlos ab 700€ Geldeingang, Visa Debit",
    kosten: "0€",
    link: "#",
    siegel: "gold",
  },
  {
    name: "DKB",
    kategorie: "Girokonto",
    vorteil: "Kostenlos, weltweit gebührenfrei abheben",
    kosten: "0€",
    link: "#",
    siegel: "gold",
  },
  {
    name: "Consorsbank",
    kategorie: "Girokonto",
    vorteil: "Kostenlos, gute Trading-Anbindung",
    kosten: "0€",
    link: "#",
    siegel: "silber",
  },
  {
    name: "N26",
    kategorie: "Girokonto",
    vorteil: "Schnelle Eröffnung, gute App",
    kosten: "0€ (Standard)",
    link: "#",
    siegel: "silber",
  },
];

const DEPOTS: Deal[] = [
  {
    name: "Trade Republic",
    kategorie: "Depot",
    vorteil: "1€ pro Trade, Sparpläne kostenlos",
    kosten: "0€ Depotführung",
    link: "#",
    siegel: "gold",
  },
  {
    name: "Scalable Capital",
    kategorie: "Depot",
    vorteil: "Flatrate-Modell, große ETF-Auswahl",
    kosten: "0€ (Free Broker)",
    link: "#",
    siegel: "gold",
  },
  {
    name: "Finanzen.net Zero",
    kategorie: "Depot",
    vorteil: "Komplett kostenlose Trades ab 500€",
    kosten: "0€",
    link: "#",
    siegel: "silber",
  },
  {
    name: "ING Depot",
    kategorie: "Depot",
    vorteil: "Solide Hausbank-Lösung, ETF-Sparpläne ab 1€",
    kosten: "0€",
    link: "#",
    siegel: "bronze",
  },
];

const TAGESGELD: Deal[] = [
  {
    name: "Trade Republic",
    kategorie: "Tagesgeld",
    vorteil: "Zinsen auf gesamtes Guthaben",
    kosten: "Aktuell 2,75% p.a.",
    link: "#",
    siegel: "gold",
  },
  {
    name: "Consorsbank",
    kategorie: "Tagesgeld",
    vorteil: "Deutsche Einlagensicherung",
    kosten: "Aktuell 2,50% p.a.",
    link: "#",
    siegel: "silber",
  },
  {
    name: "ING",
    kategorie: "Tagesgeld",
    vorteil: "6 Monate Neukunden-Zins",
    kosten: "Aktuell 2,50% p.a.",
    link: "#",
    siegel: "silber",
  },
];

export default function DealsPage() {
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
        name: "Deals & Vergleiche",
        item: "https://schwabenspart.com/deals",
      },
    ],
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
    />
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground">Deals & Vergleiche</h1>
        <p className="text-muted mt-2">
          Vom Schwaben geprüft — die besten Finanzprodukte im ehrlichen Vergleich.
        </p>
      </div>

      <DealsNav />

      <div className="space-y-10">
        <DealTable deals={GIROKONTEN} title="Beste Girokonten 2026" id="girokonten" />
        <DealTable deals={DEPOTS} title="Beste Depots & Broker 2026" id="depots" />
        <DealTable deals={TAGESGELD} title="Bestes Tagesgeld 2026" id="tagesgeld" />
      </div>

      <SchwabenKommentar text="Mir hen jedes Konto ond jedes Depot genau unter d'Lupe gnomma. Was nix taugt, kommt au net auf die Liste. Ond denk dra: Des beste Konto isch des, wo du koi Gebühra zahlsch!" />
    </div>
    </>
  );
}
