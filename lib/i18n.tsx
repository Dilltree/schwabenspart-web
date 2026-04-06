"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type Language = "de" | "en";

const translations = {
  // Navigation
  "nav.startseite": { de: "Startseite", en: "Home" },
  "nav.spartipps": { de: "Spartipps", en: "Saving Tips" },
  "nav.deals": { de: "Deals", en: "Deals" },
  "nav.rechner": { de: "Rechner", en: "Calculator" },
  "nav.ueber-uns": { de: "Über uns", en: "About Us" },
  "nav.app-laden": { de: "App laden", en: "Get App" },
  "nav.suche": { de: "Suche", en: "Search" },

  // Hero
  "hero.title": { de: "Spare wie ein", en: "Save like a" },
  "hero.schwabe": { de: "Schwabe.", en: "Schwabe." },
  "hero.subtitle": {
    de: "Alte schwäbische Sparmentalität trifft moderne Finanztipps. Aktuelle Finanznews, ehrliche Vergleiche und die besten Deals.",
    en: "Traditional Swabian thrift meets modern financial tips. Latest finance news, honest comparisons and the best deals.",
  },
  "hero.badge": { de: "Neu: Kostenlose App verfügbar", en: "New: Free app available" },
  "hero.trust": {
    de: "Bereits 50+ Spartipps & Vergleiche — 100% kostenlos",
    en: "Already 50+ saving tips & comparisons — 100% free",
  },
  "hero.cta-spartipps": { de: "Spartipps entdecken", en: "Discover Saving Tips" },
  "hero.cta-deals": { de: "Deals & Vergleiche", en: "Deals & Comparisons" },

  // Finanznachrichten
  "news.title": { de: "Finanznachrichten", en: "Financial News" },
  "news.subtitle": { de: "Das Tagesgeschehen rund ums Geld", en: "Today's money news" },
  "news.show-all": { de: "Nachrichten anzeigen", en: "news articles" },

  // Spartipps
  "tips.title": { de: "Spartipps", en: "Saving Tips" },
  "tips.subtitle": { de: "Praktische Tipps vom Schwaben", en: "Practical tips from the Schwabe" },
  "tips.show-all": { de: "Alle anzeigen", en: "Show all" },
  "tips.page-subtitle": {
    de: "Praktische Tipps, Vergleiche und Anleitungen vom Schwaben.",
    en: "Practical tips, comparisons and guides from the Schwabe.",
  },
  "tips.no-results": {
    de: "Keine Spartipps in dieser Kategorie gefunden.",
    en: "No saving tips found in this category.",
  },
  "tips.filter-all": { de: "Alle", en: "All" },

  // Testimonials / Savings scenarios
  "savings.title": { de: "So viel kannst du sparen", en: "How much you can save" },
  "savings.subtitle": {
    de: "Realistische Rechenbeispiele — ohne leere Versprechen",
    en: "Realistic examples — no empty promises",
  },
  "savings.girokonto-title": { de: "Girokonto wechseln", en: "Switch bank account" },
  "savings.girokonto-text": {
    de: "Wer von der Sparkasse oder Volksbank zu einer kostenlosen Online-Bank wechselt, spart die Kontogebühren — jedes Jahr.",
    en: "Switching from a traditional bank to a free online bank saves you account fees — every year.",
  },
  "savings.girokonto-amount": { de: "bis zu 100€/Jahr", en: "up to €100/year" },
  "savings.strom-title": { de: "Strom & Gas vergleichen", en: "Compare electricity & gas" },
  "savings.strom-text": {
    de: "Ein durchschnittlicher Haushalt zahlt beim Grundversorger oft 20-30% mehr als nötig. Ein Wechsel dauert 10 Minuten.",
    en: "An average household often pays 20-30% more than necessary with the default provider. Switching takes 10 minutes.",
  },
  "savings.strom-amount": { de: "bis zu 800€/Jahr", en: "up to €800/year" },
  "savings.etf-title": { de: "ETF-Sparplan starten", en: "Start an ETF savings plan" },
  "savings.etf-text": {
    de: "Schon 50€ pro Monat in einen MSCI World ETF ergeben bei 7% Rendite nach 20 Jahren rund 26.000€ — davon 14.000€ Gewinn.",
    en: "Just €50/month in an MSCI World ETF at 7% return yields around €26,000 after 20 years — €14,000 of that is profit.",
  },
  "savings.etf-amount": { de: "26.000€ in 20 Jahren", en: "€26,000 in 20 years" },
  "savings.total": { de: "Gesamtersparnis:", en: "Total savings:" },
  "savings.total-amount": { de: "bis zu 26.900€", en: "up to €26,900" },

  // App CTA
  "app.title": { de: "Deine Finanzen im Griff — mit der Schwabe-App", en: "Master your finances — with the Schwabe App" },
  "app.subtitle": {
    de: "Tracke Einnahmen & Ausgaben, setze Sparziele und bekomme personalisierte KI-Spartipps. Kostenlos für Android.",
    en: "Track income & expenses, set savings goals and get personalized AI saving tips. Free for Android.",
  },
  "app.cta": { de: "Jetzt laden", en: "Download now" },

  // Newsletter
  "newsletter.title": { de: "Die Schwaben-Woche —", en: "The Schwaben Weekly —" },
  "newsletter.title-accent": {
    de: "Dein wöchentlicher Finanzüberblick",
    en: "Your weekly financial overview",
  },
  "newsletter.subtitle": {
    de: "Jeden Freitag: Die wichtigsten Finanznews, Spartipps und Deals — kostenlos.",
    en: "Every Friday: The most important finance news, saving tips and deals — free.",
  },
  "newsletter.success": { de: "Geschafft!", en: "Done!" },
  "newsletter.success-text": {
    de: "Du bekommst ab jetzt jeden Freitag die Schwaben-Woche. Gspart isch gspart!",
    en: "You'll receive the Schwaben Weekly every Friday from now on. Gspart isch gspart!",
  },
  "newsletter.placeholder": { de: "deine@email.de", en: "your@email.com" },
  "newsletter.loading": { de: "Wird angemeldet...", en: "Subscribing..." },
  "newsletter.button": { de: "Kostenlos abonnieren", en: "Subscribe for free" },
  "newsletter.error-generic": { de: "Fehler bei der Anmeldung.", en: "Subscription error." },
  "newsletter.error-connection": {
    de: "Verbindungsfehler. Bitte versuche es erneut.",
    en: "Connection error. Please try again.",
  },
  "newsletter.privacy": { de: "Kein Spam. Jederzeit abmeldbar.", en: "No spam. Unsubscribe anytime." },
  "newsletter.privacy-link": { de: "Datenschutz", en: "Privacy Policy" },

  // Footer
  "footer.brand-text": {
    de: "Alte schwäbische Sparmentalität trifft moderne Finanztipps. Gspart isch gspart.",
    en: "Traditional Swabian thrift meets modern financial tips. Gspart isch gspart.",
  },
  "footer.navigation": { de: "Navigation", en: "Navigation" },
  "footer.spartipps": { de: "Spartipps", en: "Saving Tips" },
  "footer.deals": { de: "Deals & Vergleiche", en: "Deals & Comparisons" },
  "footer.ueber-uns": { de: "Über uns", en: "About Us" },
  "footer.rechtliches": { de: "Rechtliches", en: "Legal" },
  "footer.datenschutz": { de: "Datenschutz", en: "Privacy Policy" },
  "footer.impressum": { de: "Impressum", en: "Imprint" },
  "footer.copyright": {
    de: "schwabenspart. Alle Rechte vorbehalten.",
    en: "schwabenspart. All rights reserved.",
  },
  "footer.affiliate": {
    de: "* Gekennzeichnete Links sind Affiliate-Links. Bei einem Kauf erhalten wir eine Provision — ohne Mehrkosten für dich.",
    en: "* Marked links are affiliate links. We receive a commission on purchases — at no extra cost to you.",
  },

  // Deals page
  "deals.title": { de: "Deals & Vergleiche", en: "Deals & Comparisons" },
  "deals.subtitle": {
    de: "Vom Schwaben geprüft — die besten Finanzprodukte im ehrlichen Vergleich.",
    en: "Checked by the Schwabe — the best financial products in an honest comparison.",
  },
  "deals.provider": { de: "Anbieter", en: "Provider" },
  "deals.benefit": { de: "Vorteil", en: "Benefit" },
  "deals.cost": { de: "Kosten", en: "Cost" },
  "deals.rating": { de: "Bewertung", en: "Rating" },
  "deals.go-to-provider": { de: "Zum Anbieter *", en: "Go to provider *" },
  "deals.affiliate-note": {
    de: "* Affiliate-Link. Bei Abschluss erhalten wir eine Provision — ohne Mehrkosten für dich.",
    en: "* Affiliate link. We receive a commission on sign-up — at no extra cost to you.",
  },
  "deals.nav-girokonten": { de: "Girokonten", en: "Bank Accounts" },
  "deals.nav-depots": { de: "Depots", en: "Brokers" },
  "deals.nav-tagesgeld": { de: "Tagesgeld", en: "Savings Accounts" },

  // Budget calculator
  "calc.title": {
    de: "Der <accent>50-30-20</accent> Budgetrechner",
    en: "The <accent>50-30-20</accent> Budget Calculator",
  },
  "calc.subtitle": {
    de: "Gib dein monatliches Nettoeinkommen ein und sieh sofort, wie du dein Geld aufteilen solltest — nach der bewährten 50-30-20-Regel.",
    en: "Enter your monthly net income and instantly see how to split your money — using the proven 50-30-20 rule.",
  },
  "calc.income-label": { de: "Monatliches Nettoeinkommen (€)", en: "Monthly net income (€)" },
  "calc.placeholder": { de: "z.B. 2500", en: "e.g. 2500" },
  "calc.needs": { de: "Fixkosten", en: "Fixed costs" },
  "calc.needs-examples": { de: "z.B. Miete, Strom, Versicherungen, Lebensmittel, Internet", en: "e.g. rent, electricity, insurance, groceries, internet" },
  "calc.wants": { de: "Wünsche", en: "Wants" },
  "calc.wants-examples": { de: "z.B. Essen gehen, Streaming, Kleidung, Hobbys, Urlaub", en: "e.g. dining out, streaming, clothing, hobbies, vacation" },
  "calc.savings": { de: "Sparen", en: "Savings" },
  "calc.savings-examples": { de: "z.B. Notgroschen, ETF-Sparplan, Tagesgeld, Altersvorsorge", en: "e.g. emergency fund, ETF savings plan, savings account, retirement" },
  "calc.of-income": { de: "vom Einkommen", en: "of income" },
  "calc.total": { de: "Gesamt", en: "Total" },
  "calc.share": { de: "Ergebnis teilen", en: "Share result" },
  "calc.copied": { de: "Link kopiert!", en: "Link copied!" },

  // Rechner Hub
  "rechner.title": { de: "Finanz", en: "Finance" },
  "rechner.title-accent": { de: "rechner", en: "Calculators" },
  "rechner.subtitle": { de: "Kostenlos, ohne Anmeldung, schwäbisch ehrlich.", en: "Free, no signup, honestly Swabian." },
  "rechner.breadcrumb": { de: "Rechner", en: "Calculators" },
  "rechner.bald": { de: "Bald verfügbar", en: "Coming soon" },

  // Budget rechner
  "rechner.budget-title": { de: "50-30-20 Budgetrechner", en: "50-30-20 Budget Calculator" },
  "rechner.budget-desc": { de: "Wie viel solltest du sparen? Teile dein Einkommen optimal auf.", en: "How much should you save? Split your income optimally." },

  // ETF Sparplan
  "rechner.etf-title": { de: "ETF-Sparplan Rechner", en: "ETF Savings Plan Calculator" },
  "rechner.etf-desc": { de: "Berechne, wie dein Geld mit Zinseszins wächst.", en: "Calculate how your money grows with compound interest." },
  "etf.einmalanlage": { de: "Einmalanlage (€)", en: "Initial investment (€)" },
  "etf.sparrate": { de: "Monatliche Sparrate (€)", en: "Monthly savings (€)" },
  "etf.rendite": { de: "Erwartete Rendite p.a.", en: "Expected return p.a." },
  "etf.laufzeit": { de: "Anlagedauer (Jahre)", en: "Investment period (years)" },
  "etf.eingezahlt": { de: "Eingezahlt", en: "Deposited" },
  "etf.zinsen": { de: "Zinserträge", en: "Interest earned" },
  "etf.endvermoegen": { de: "Endvermögen", en: "Final value" },
  "etf.vergleich": { de: "Vergleich", en: "Comparison" },
  "etf.kopfkissen": { de: "Kopfkissen", en: "Under the mattress" },
  "etf.tagesgeld": { de: "Tagesgeld", en: "Savings account" },
  "etf.dein-szenario": { de: "Dein Szenario", en: "Your scenario" },
  "etf.depot-cta": { de: "Um diesen Sparplan umzusetzen, brauchst du ein Depot.", en: "To start this savings plan, you need a brokerage account." },
  "etf.depot-link": { de: "Depot-Vergleich ansehen", en: "View broker comparison" },
  "etf.share": { de: "Ergebnis teilen", en: "Share result" },
  "etf.copied": { de: "Link kopiert!", en: "Link copied!" },
  "etf.disclaimer": { de: "Die dargestellte Berechnung basiert auf einer gleichmäßigen, hypothetischen Wertentwicklung. Tatsächliche Renditen schwanken und können negativ sein. Dies ist keine Anlageberatung im Sinne des WpHG.", en: "This calculation is based on a steady, hypothetical growth rate. Actual returns fluctuate and can be negative. This is not investment advice." },

  // Fahrradleasing
  "rechner.leasing-title": { de: "Fahrradleasing Rechner", en: "Bike Leasing Calculator" },
  "rechner.leasing-desc": { de: "Lohnt sich JobRad wirklich? Der ehrliche Vergleich.", en: "Is bike leasing really worth it? The honest comparison." },

  // Brutto-Netto
  "rechner.brutto-title": { de: "Brutto-Netto Rechner", en: "Gross-Net Calculator" },
  "rechner.brutto-desc": { de: "Was bleibt vom Gehalt? Schnell und einfach berechnen.", en: "What's left of your salary? Quick and easy calculation." },

  // Search
  "search.title": { de: "Suche", en: "Search" },
  "search.subtitle": { de: "Finde Spartipps, News und Vergleiche", en: "Find saving tips, news and comparisons" },
  "search.placeholder": { de: "Artikel durchsuchen...", en: "Search articles..." },
  "search.placeholder-short": { de: "Suchen...", en: "Search..." },
  "search.result": { de: "Ergebnis", en: "result" },
  "search.results": { de: "Ergebnisse", en: "results" },
  "search.for": { de: "für", en: "for" },
  "search.no-results": {
    de: "Keine Artikel gefunden. Versuch einen anderen Suchbegriff.",
    en: "No articles found. Try a different search term.",
  },

  // Common
  "common.back": { de: "Zurück", en: "Back" },
  "common.read-more": { de: "Weiterlesen", en: "Read more" },
  "common.menu-open": { de: "Menü öffnen", en: "Open menu" },
  "common.all": { de: "Alle", en: "All" },
} as const;

export type TranslationKey = keyof typeof translations;

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("de");

  useEffect(() => {
    const stored = localStorage.getItem("schwabenspart-lang");
    if (stored === "en" || stored === "de") {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("schwabenspart-lang", lang);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[language];
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslations must be used within a LanguageProvider");
  }
  return context;
}
