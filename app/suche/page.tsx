import type { Metadata } from "next";
import SuchWidget from "@/components/SuchWidget";
import { getArtikel } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Suche",
  description: "Durchsuche alle Spartipps, News und Vergleiche auf schwabenspart.com.",
};

export default function SuchePage() {
  const articles = getArtikel();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Suche</h1>
        <p className="text-muted mt-2">Finde Spartipps, News und Vergleiche</p>
      </div>
      <SuchWidget articles={articles} />
    </div>
  );
}
