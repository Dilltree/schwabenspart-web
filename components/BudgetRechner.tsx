"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "@/lib/i18n";

export default function BudgetRechner() {
  const [income, setIncome] = useState("");
  const [copied, setCopied] = useState(false);
  const { t } = useTranslations();

  const value = parseFloat(income) || 0;

  const formatAmount = (amount: number) =>
    amount.toFixed(2).replace(".", ",");

  const handleShare = useCallback(async () => {
    const needs = formatAmount((value * 50) / 100);
    const wants = formatAmount((value * 30) / 100);
    const savings = formatAmount((value * 20) / 100);
    const shareText = `Mein 50-30-20 Budget: ${needs}€ Bedürfnisse, ${wants}€ Wünsche, ${savings}€ Sparen. Berechne deins: schwabenspart.com/rechner`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  }, [value]);

  const CATEGORIES = [
    { label: t("calc.needs"), percent: 50, color: "bg-primary" },
    { label: t("calc.wants"), percent: 30, color: "bg-primary-light" },
    { label: t("calc.savings"), percent: 20, color: "bg-accent" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8">
        <label className="block text-sm font-semibold text-foreground mb-2">
          {t("calc.income-label")}
        </label>
        <input
          type="number"
          min="0"
          step="100"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder={t("calc.placeholder")}
          className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-lg"
        />
      </div>

      {value > 0 && (
        <div className="mt-8 space-y-4">
          {CATEGORIES.map((cat) => {
            const amount = (value * cat.percent) / 100;
            return (
              <div
                key={cat.label}
                className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-bold text-foreground">{cat.label}</p>
                    <p className="text-muted text-sm">{cat.percent}% {t("calc.of-income")}</p>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {amount.toFixed(2).replace(".", ",")} €
                  </p>
                </div>
                <div className="w-full bg-foreground/5 rounded-full h-4 overflow-hidden">
                  <div
                    className={`${cat.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
              </div>
            );
          })}

          <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 text-center">
            <p className="text-muted text-sm">{t("calc.total")}</p>
            <p className="text-3xl font-bold text-primary mt-1">
              {formatAmount(value)} €
            </p>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-accent text-primary font-semibold px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              {copied ? t("calc.copied") : t("calc.share")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
