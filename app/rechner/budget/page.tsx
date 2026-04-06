import type { Metadata } from "next";
import Link from "next/link";
import BudgetRechner from "@/components/BudgetRechner";
import SchwabenKommentar from "@/components/SchwabenKommentar";
import RechnerNav from "@/components/RechnerNav";

export const metadata: Metadata = {
  title: "50-30-20 Budgetrechner",
  description:
    "Berechne dein Budget nach der 50-30-20-Regel: 50% Bedürfnisse, 30% Wünsche, 20% Sparen. Kostenlos und ohne Anmeldung.",
  alternates: {
    canonical: "/rechner/budget",
  },
};

export default function BudgetRechnerPage() {
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
        name: "Budgetrechner",
        item: "https://schwabenspart.com/rechner/budget",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/rechner" className="hover:text-white/80 transition-colors">
              Rechner
            </Link>
            <span className="mx-2">›</span>
            <span className="text-white/90">50-30-20 Budgetrechner</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Der <span className="text-accent">50-30-20</span> Budgetrechner
          </h1>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            Gib dein monatliches Nettoeinkommen ein und sieh sofort, wie du dein
            Geld aufteilen solltest — nach der bewährten 50-30-20-Regel.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <RechnerNav />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <BudgetRechner />
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-12">
        <SchwabenKommentar text="50-30-20 isch scho ganz guad — aber a echter Schwabe spart mindestens 30%! Fang mit 20% a, ond dann steiger di. Jeder Euro, den du heut sparsch, isch a Euro, den du morga net verdiene muscht!" />
      </section>
    </>
  );
}
