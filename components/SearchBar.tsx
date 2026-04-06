"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "@/lib/i18n";
import type { Artikel } from "./SpartippCard";

export default function SearchBar({ articles }: { articles: Artikel[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { t } = useTranslations();

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return articles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.kategorie.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [query, articles]);

  return (
    <div className="relative">
      <div className="flex items-center bg-white/10 rounded-full px-4 py-2 border border-white/20 focus-within:border-accent transition-colors">
        <svg className="w-4 h-4 text-white/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={t("search.placeholder-short")}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          className="bg-transparent text-white placeholder-white/40 text-sm ml-2 outline-none w-24 focus:w-40 transition-all"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-card rounded-xl shadow-xl border border-black/10 overflow-hidden z-50">
          {results.map((a) => (
            <Link
              key={a.slug}
              href={`/spartipps/${a.slug}`}
              className="block px-4 py-3 hover:bg-primary/5 transition-colors border-b border-black/5 last:border-0"
              onClick={() => { setQuery(""); setOpen(false); }}
            >
              <span className="text-xs text-accent font-semibold">{a.kategorie}</span>
              <p className="text-sm font-medium text-foreground mt-0.5 line-clamp-1">
                {a.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
