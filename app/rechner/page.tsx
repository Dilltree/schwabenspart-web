import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kostenlose Finanzrechner 2026",
  description:
    "Brutto-Netto, ETF-Sparplan, Budgetrechner & mehr — kostenlose Tools für deine Finanzen. Ohne Anmeldung, sofort nutzbar.",
  alternates: { canonical: "/rechner" },
  keywords: [
    "Finanzrechner",
    "Budgetrechner",
    "ETF Rechner",
    "Brutto Netto Rechner",
    "Sparplanrechner",
  ],
  openGraph: {
    type: "website",
    title: "Kostenlose Finanzrechner 2026",
    description:
      "Brutto-Netto, ETF-Sparplan, Budgetrechner & mehr — kostenlose Tools für deine Finanzen. Ohne Anmeldung, sofort nutzbar.",
  },
};

const RECHNER = [
  {
    href: "/rechner/budget",
    title: "50-30-20 Budgetrechner",
    description:
      "Wie viel solltest du sparen? Teile dein Einkommen optimal auf.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
    available: true,
  },
  {
    href: "/rechner/etf-sparplan",
    title: "ETF-Sparplan Rechner",
    description: "Berechne, wie dein Geld mit Zinseszins wächst.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    available: true,
  },
  {
    href: "/rechner/fahrradleasing",
    title: "Fahrradleasing Rechner",
    description: "Lohnt sich JobRad wirklich? Der ehrliche Vergleich.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="5.5" cy="17.5" r="3.5" />
        <circle cx="18.5" cy="17.5" r="3.5" />
        <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
      </svg>
    ),
    available: true,
  },
  {
    href: "/rechner/brutto-netto",
    title: "Brutto-Netto Rechner",
    description: "Was bleibt vom Gehalt? Schnell und einfach berechnen.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="16" y1="14" x2="16" y2="18" />
        <line x1="8" y1="10" x2="10" y2="10" />
        <line x1="14" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="10" y2="14" />
        <line x1="8" y1="18" x2="10" y2="18" />
        <line x1="14" y1="18" x2="16" y2="18" />
      </svg>
    ),
    available: true,
  },
];

export default function RechnerHubPage() {
  return (
    <>
      <section className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Finanz<span className="text-accent">rechner</span>
          </h1>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            Kostenlos, ohne Anmeldung, schwäbisch ehrlich.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {RECHNER.map((r) =>
            r.available ? (
              <Link
                key={r.href}
                href={r.href}
                className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 hover:shadow-md hover:border-accent/30 transition-all duration-200"
              >
                <div className="text-accent mb-4">{r.icon}</div>
                <h2 className="text-lg font-bold text-foreground">{r.title}</h2>
                <p className="text-muted text-sm mt-1">{r.description}</p>
              </Link>
            ) : (
              <div
                key={r.href}
                className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 opacity-60 pointer-events-none relative"
              >
                <span className="absolute top-4 right-4 bg-foreground/10 text-muted text-xs font-semibold px-2 py-1 rounded-full">
                  Bald verfügbar
                </span>
                <div className="text-accent mb-4">{r.icon}</div>
                <h2 className="text-lg font-bold text-foreground">{r.title}</h2>
                <p className="text-muted text-sm mt-1">{r.description}</p>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}
