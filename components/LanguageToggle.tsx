"use client";

import { useTranslations } from "@/lib/i18n";

export default function LanguageToggle() {
  const { language, setLanguage } = useTranslations();

  return (
    <div className="flex items-center gap-0.5 text-xs font-semibold">
      <button
        onClick={() => setLanguage("de")}
        className={`px-2 py-1 rounded-l-full transition-colors ${
          language === "de"
            ? "bg-accent text-primary"
            : "bg-white/10 text-white/60 hover:text-white"
        }`}
        aria-label="Deutsch"
      >
        DE
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 rounded-r-full transition-colors ${
          language === "en"
            ? "bg-accent text-primary"
            : "bg-white/10 text-white/60 hover:text-white"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
