"use client";

import { useState, useMemo } from "react";
import SpartippCard, { type Artikel } from "./SpartippCard";
import { useTranslations } from "@/lib/i18n";

export default function SpartippsFilter({ articles }: { articles: Artikel[] }) {
  const [active, setActive] = useState("__all__");
  const { t } = useTranslations();

  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((a) => a.kategorie)));
    return unique;
  }, [articles]);

  const filtered = active === "__all__" ? articles : articles.filter((a) => a.kategorie === active);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive("__all__")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            active === "__all__"
              ? "bg-accent text-primary"
              : "bg-primary/5 text-foreground hover:bg-primary/10"
          }`}
        >
          {t("tips.filter-all")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              active === cat
                ? "bg-accent text-primary"
                : "bg-primary/5 text-foreground hover:bg-primary/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((a) => (
          <SpartippCard key={a.slug} artikel={a} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted text-center py-12">{t("tips.no-results")}</p>
      )}
    </>
  );
}
