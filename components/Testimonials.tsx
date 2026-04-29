"use client";

import { useTranslations } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, isVisible: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
}

function SavingsAmount({
  amount,
  label,
  isVisible,
}: {
  amount: number;
  label: string;
  isVisible: boolean;
}) {
  const animatedValue = useCountUp(amount, isVisible);
  return (
    <div className="bg-accent/10 rounded-lg px-3 py-2 inline-block">
      <p className="text-accent text-xs font-bold">
        {label.replace(
          String(amount),
          animatedValue.toLocaleString("de-DE")
        )}
      </p>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const SZENARIEN = [
    {
      icon: "\u{1F3E6}",
      titel: t("savings.girokonto-title"),
      text: t("savings.girokonto-text"),
      ersparnis: t("savings.girokonto-amount"),
      numericValue: 100,
    },
    {
      icon: "\u26A1",
      titel: t("savings.strom-title"),
      text: t("savings.strom-text"),
      ersparnis: t("savings.strom-amount"),
      numericValue: 800,
    },
    {
      icon: "\u{1F4C8}",
      titel: t("savings.etf-title"),
      text: t("savings.etf-text"),
      ersparnis: t("savings.etf-amount"),
      numericValue: 26000,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-16"
    >
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-foreground">
          {t("savings.title")}
        </h2>
        <p className="text-muted text-sm mt-2">{t("savings.subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {SZENARIEN.map((s) => (
          <div
            key={s.titel}
            className="bg-card rounded-2xl p-6 border border-black/[0.06] shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{s.icon}</span>
              <p className="font-bold text-foreground">{s.titel}</p>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-4">
              {s.text}
            </p>
            <SavingsAmount
              amount={s.numericValue}
              label={s.ersparnis}
              isVisible={isVisible}
            />
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/5 rounded-full px-6 py-3">
          <span className="text-lg font-bold text-primary">
            {t("savings.total")}
          </span>
          <span className="text-lg font-extrabold text-accent">
            {t("savings.total-amount")}
          </span>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted max-w-2xl mx-auto leading-relaxed">
        Beispielrechnungen auf Basis öffentlich verfügbarer Marktdaten und typischer
        Haushaltsstrukturen. Tatsächliche Ergebnisse hängen von Marktentwicklung,
        individueller Situation und Vertragsbedingungen ab. ETF-Beispiel basiert auf
        gleichmäßiger hypothetischer Wertentwicklung — Renditen schwanken und können
        negativ sein. Keine Anlageberatung im Sinne des WpHG/KWG.
      </p>
    </section>
  );
}
