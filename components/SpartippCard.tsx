"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/lib/i18n";

export type Artikel = {
  slug: string;
  title: string;
  description: string;
  kategorie: string;
  datum: string;
  bild?: string;
  content?: string;
  schwabenKommentar?: string;
  // English translations
  title_en?: string;
  description_en?: string;
  kategorie_en?: string;
  content_en?: string;
  schwabenKommentar_en?: string;
};

export function localize(artikel: Artikel, lang: string) {
  if (lang === "en") {
    return {
      title: artikel.title_en || artikel.title,
      description: artikel.description_en || artikel.description,
      kategorie: artikel.kategorie_en || artikel.kategorie,
      content: artikel.content_en || artikel.content,
      schwabenKommentar: artikel.schwabenKommentar_en || artikel.schwabenKommentar,
    };
  }
  return {
    title: artikel.title,
    description: artikel.description,
    kategorie: artikel.kategorie,
    content: artikel.content,
    schwabenKommentar: artikel.schwabenKommentar,
  };
}

export default function SpartippCard({ artikel }: { artikel: Artikel }) {
  const { language } = useTranslations();
  const loc = localize(artikel, language);

  return (
    <Link
      href={`/spartipps/${artikel.slug}`}
      className="group bg-card rounded-2xl shadow-sm border border-black/[0.06] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      <div className="aspect-[16/9] bg-primary/5 relative overflow-hidden">
        {artikel.bild ? (
          <Image
            src={artikel.bild}
            alt={loc.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src="/logos/logo.png"
              alt="schwabenspart"
              width={64}
              height={64}
              className="opacity-20"
            />
          </div>
        )}
        <span className="absolute top-3 left-3 bg-accent text-primary text-sm font-bold px-3.5 py-1.5 rounded-full">
          {loc.kategorie}
        </span>
      </div>
      <div className="p-5">
        <p className="text-xs text-muted mb-2">{artikel.datum}</p>
        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
          {loc.title}
        </h3>
        <p className="text-sm text-muted mt-2 line-clamp-2">{loc.description}</p>
      </div>
    </Link>
  );
}
