"use client";

import { useTranslations, type TranslationKey } from "@/lib/i18n";

const SECTIONS: { id: string; labelKey: TranslationKey }[] = [
  { id: "girokonten", labelKey: "deals.nav-girokonten" },
  { id: "depots", labelKey: "deals.nav-depots" },
  { id: "tagesgeld", labelKey: "deals.nav-tagesgeld" },
];

export default function DealsNav() {
  const { t } = useTranslations();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className="px-4 py-2 rounded-full text-sm font-semibold bg-primary/5 text-foreground hover:bg-accent hover:text-primary transition-colors"
        >
          {t(s.labelKey)}
        </button>
      ))}
    </div>
  );
}
