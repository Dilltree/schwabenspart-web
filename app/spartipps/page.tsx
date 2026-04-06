import type { Metadata } from "next";
import Link from "next/link";
import SpartippsFilter from "@/components/SpartippsFilter";
import { getArtikel } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Spartipps & Finanznews",
  description:
    "Alle Spartipps und Finanznews vom Schwaben — Geld sparen, Vergleiche, Finanztipps, aktuelle Nachrichten und mehr.",
  keywords: [
    "Spartipps",
    "Finanztipps",
    "Geld sparen",
    "Finanznews",
    "Vergleiche",
    "Haushaltsgeld",
    "Budget",
    "schwäbisch sparen",
  ],
  alternates: {
    canonical: "/spartipps",
  },
  openGraph: {
    type: "website",
    title: "Spartipps & Finanznews — schwabenspart",
    description:
      "Alle Spartipps und Finanznews vom Schwaben — Geld sparen, Vergleiche, Finanztipps, aktuelle Nachrichten und mehr.",
    url: "/spartipps",
  },
};

export default function SpartippsPage() {
  const artikel = getArtikel();

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
        name: "Spartipps",
        item: "https://schwabenspart.com/spartipps",
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
          <h1 className="text-3xl sm:text-4xl font-bold">
            Spartipps & <span className="text-accent">Finanznews</span>
          </h1>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            Praktische Tipps, Vergleiche, Anleitungen und aktuelle Nachrichten vom Schwaben.
          </p>
          <p className="text-white/50 mt-2 text-sm">
            {artikel.length} Artikel
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <nav className="text-sm text-muted mb-8">
          <Link href="/" className="hover:text-accent transition-colors">
            Startseite
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground">Spartipps</span>
        </nav>

        <SpartippsFilter articles={artikel} />
      </div>
    </>
  );
}
