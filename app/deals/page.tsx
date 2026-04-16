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
    vorteil: "Kostenlos ab 1.000€ Geldeingang, Visa Debit",
    kosten: "0€",
    link: "https://www.ing.de/girokonto/",
    siegel: "gold",
  },
  {
    name: "DKB",
    kategorie: "Girokonto",
    vorteil: "Kostenlos ab 700€ Geldeingang, weltweit gebührenfrei abheben",
    kosten: "0€",
    link: "https://www.dkb.de/privatkunden/girokonto/",
    siegel: "gold",
  },
  {
    name: "Consorsbank",
    kategorie: "Girokonto",
    vorteil: "Kostenlos ab 700€ Geldeingang, gute Trading-Anbindung",
    kosten: "0€",
    link: "https://www.consorsbank.de/web/Girokonto",
    siegel: "silber",
  },
  {
    name: "N26",
    kategorie: "Girokonto",
    vorteil: "Bedingungslos kostenlos, schnelle Eröffnung per App",
    kosten: "0€ (Standard)",
    link: "https://n26.com/de-de/kostenloses-girokonto",
    siegel: "silber",
  },
];

const DEPOTS: Deal[] = [
  {
    name: "Trade Republic",
    kategorie: "Depot",
    vorteil: "1€ pro Trade, Sparpläne kostenlos — Achtung: PFOF-Verbot EU ab Juli 2026",
    kosten: "0€ Depotführung",
    link: "https://traderepublic.com/de-de",
    siegel: "gold",
  },
  {
    name: "Scalable Capital",
    kategorie: "Depot",
    vorteil: "0,99€ pro Trade, große ETF-Auswahl, 2% Zinsen auf Cash",
    kosten: "0€ (Free Broker)",
    link: "https://de.scalable.capital/broker",
    siegel: "gold",
  },
  {
    name: "Finanzen.net Zero",
    kategorie: "Depot",
    vorteil: "Komplett kostenlose Trades ab 500€ Ordervolumen",
    kosten: "0€",
    link: "https://www.finanzen.net/zero/",
    siegel: "silber",
  },
  {
    name: "ING Depot",
    kategorie: "Depot",
    vorteil: "Solide Hausbank-Lösung, ETF-Sparpläne ab 1€",
    kosten: "0€",
    link: "https://www.ing.de/wertpapiere/depot/",
    siegel: "bronze",
  },
];

const TAGESGELD: Deal[] = [
  {
    name: "Consorsbank",
    kategorie: "Tagesgeld",
    vorteil: "Beste Rate, deutsche Einlagensicherung, täglich verfügbar",
    kosten: "Aktuell 3,40% p.a.",
    link: "https://www.consorsbank.de/web/Sparen-Anlegen/Sparen/Tagesgeld",
    siegel: "gold",
  },
  {
    name: "ING",
    kategorie: "Tagesgeld",
    vorteil: "Attraktiver Neukundenzins für 4 Monate",
    kosten: "Aktuell 3,00% p.a. (Neukunden)",
    link: "https://www.ing.de/sparen-anlegen/sparen/tagesgeld/",
    siegel: "silber",
  },
  {
    name: "Trade Republic",
    kategorie: "Tagesgeld",
    vorteil: "Zinsen auf gesamtes Guthaben, keine Mindestlaufzeit",
    kosten: "Aktuell 2,00% p.a.",
    link: "https://traderepublic.com/de-de",
    siegel: "bronze",
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
