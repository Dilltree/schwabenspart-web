"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/lib/i18n";
import type { Artikel } from "./SpartippCard";

export default function SuchWidget({ articles }: { articles: Artikel[] }) {
  const [query, setQuery] = useState("");
  const { t } = useTranslations();

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.kategorie.toLowerCase().includes(q)
    );
  }, [query, articles]);

  return (
    <>
      <div className="relative max-w-xl mx-auto mb-10">
        <div className="flex items-center bg-card border border-black/10 rounded-2xl px-5 py-3.5 shadow-sm focus-within:border-accent focus-within:shadow-md transition-all">
          <svg className="w-5 h-5 text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-foreground placeholder-muted text-base ml-3 outline-none w-full"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-muted hover:text-foreground transition-colors ml-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {query.length >= 2 && (
        <div className="space-y-3 max-w-2xl mx-auto">
          <p className="text-sm text-muted mb-4">
            {results.length} {results.length === 1 ? t("search.result") : t("search.results")} {t("search.for")} &ldquo;{query}&rdquo;
          </p>
          {results.map((a) => (
            <Link
              key={a.slug}
              href={`/spartipps/${a.slug}`}
              className="flex gap-4 bg-card rounded-xl p-4 border border-black/[0.06] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {a.bild && (
                <Image
                  src={a.bild}
                  alt={a.title}
                  width={80}
                  height={45}
                  className="rounded-lg object-cover shrink-0"
                />
              )}
              <div className="min-w-0">
                <span className="text-xs text-accent font-semibold">{a.kategorie}</span>
                <p className="font-bold text-foreground text-sm mt-0.5 line-clamp-1">{a.title}</p>
                <p className="text-xs text-muted mt-1 line-clamp-1">{a.description}</p>
              </div>
            </Link>
          ))}
          {results.length === 0 && (
            <p className="text-center text-muted py-8">{t("search.no-results")}</p>
          )}
        </div>
      )}
    </>
  );
}
