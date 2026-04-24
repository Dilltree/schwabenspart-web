"use client";

import { useState, useCallback, useMemo } from "react";
import { berechneNetto, BUNDESLAENDER, STEUERKLASSEN } from "@/lib/lohnsteuer";

const fmt = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const fmtKompakt = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export default function TeilzeitRechner() {
  // Eingaben
  const [vollzeitBruttoInput, setVollzeitBruttoInput] = useState("");
  const [vollzeitStundenInput, setVollzeitStundenInput] = useState("40");
  const [teilzeitStunden, setTeilzeitStunden] = useState(30);

  // Detail-Optionen (analog Brutto-Netto-Rechner)
  const [showDetails, setShowDetails] = useState(false);
  const [steuerklasse, setSteuerklasse] = useState(1);
  const [bundesland, setBundesland] = useState("Baden-Württemberg");
  const [kirchensteuerAktiv, setKirchensteuerAktiv] = useState(false);
  const [kinder, setKinder] = useState(0);
  const [kvArt, setKvArt] = useState<"gesetzlich" | "privat">("gesetzlich");
  const [kvZusatz, setKvZusatz] = useState("1.25");
  const [copied, setCopied] = useState(false);

  const vollzeitBrutto = parseFloat(vollzeitBruttoInput) || 0;
  const vollzeitStunden = Math.max(1, parseFloat(vollzeitStundenInput) || 40);
  const kvZusatzVal = parseFloat(kvZusatz) || 0;

  // Wenn Slider mehr Stunden hat als Vollzeit-Wochenstunden, kappe den Slider-Effektivwert
  const effektiveTeilzeitStunden = Math.min(teilzeitStunden, vollzeitStunden);
  const stundenAnteil =
    vollzeitStunden > 0 ? effektiveTeilzeitStunden / vollzeitStunden : 0;
  const teilzeitBrutto = Math.round(vollzeitBrutto * stundenAnteil * 100) / 100;

  const vollzeitErgebnis = useMemo(
    () =>
      berechneNetto({
        brutto: vollzeitBrutto,
        steuerklasse,
        bundesland,
        kirchensteuer: kirchensteuerAktiv,
        kinder,
        kvArt,
        kvZusatz: kvZusatzVal,
      }),
    [
      vollzeitBrutto,
      steuerklasse,
      bundesland,
      kirchensteuerAktiv,
      kinder,
      kvArt,
      kvZusatzVal,
    ],
  );

  const teilzeitErgebnis = useMemo(
    () =>
      berechneNetto({
        brutto: teilzeitBrutto,
        steuerklasse,
        bundesland,
        kirchensteuer: kirchensteuerAktiv,
        kinder,
        kvArt,
        kvZusatz: kvZusatzVal,
      }),
    [
      teilzeitBrutto,
      steuerklasse,
      bundesland,
      kirchensteuerAktiv,
      kinder,
      kvArt,
      kvZusatzVal,
    ],
  );

  const handleShare = useCallback(async () => {
    const stundenWoche = effektiveTeilzeitStunden
      .toFixed(1)
      .replace(".", ",")
      .replace(",0", "");
    const shareText = `Bei ${stundenWoche} Std/Woche statt ${vollzeitStunden} bleiben mir ${fmt(teilzeitErgebnis.netto)}€ netto (von ${fmt(teilzeitBrutto)}€ brutto). Berechne deins: schwabenspart.com/rechner/teilzeit`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  }, [
    effektiveTeilzeitStunden,
    vollzeitStunden,
    teilzeitErgebnis.netto,
    teilzeitBrutto,
  ]);

  const hasInput = vollzeitBrutto > 0;
  const nettoDelta = vollzeitErgebnis.netto - teilzeitErgebnis.netto;
  const bruttoDelta = vollzeitBrutto - teilzeitBrutto;
  const stundenAnteilProzent = stundenAnteil * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Stage 1 — Eingaben */}
      <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8 space-y-6">
        {/* Vollzeit-Brutto */}
        <div>
          <label
            htmlFor="vollzeit-brutto"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Vollzeit-Brutto pro Monat (&euro;)
          </label>
          <input
            id="vollzeit-brutto"
            type="number"
            min="0"
            step="100"
            inputMode="decimal"
            value={vollzeitBruttoInput}
            onChange={(e) => setVollzeitBruttoInput(e.target.value)}
            placeholder="z.B. 4000"
            className="w-full px-4 py-4 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-xl font-medium"
          />
        </div>

        {/* Vollzeit-Wochenstunden */}
        <div>
          <label
            htmlFor="vollzeit-stunden"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Vollzeit-Wochenstunden
          </label>
          <input
            id="vollzeit-stunden"
            type="number"
            min="1"
            max="60"
            step="0.5"
            inputMode="decimal"
            value={vollzeitStundenInput}
            onChange={(e) => setVollzeitStundenInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
          <p className="text-xs text-muted mt-1">
            Standard: 40 Std. Tarif kann 35 oder 38,5 sein.
          </p>
        </div>

        {/* Teilzeit-Stunden Slider */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <label
              htmlFor="teilzeit-stunden"
              className="block text-sm font-semibold text-foreground"
            >
              Geplante Teilzeit-Stunden
            </label>
            <span className="text-2xl font-bold text-accent tabular-nums">
              {effektiveTeilzeitStunden.toFixed(1).replace(".", ",")}{" "}
              <span className="text-sm font-medium text-muted">Std/Woche</span>
            </span>
          </div>
          <input
            id="teilzeit-stunden"
            type="range"
            min="4"
            max={Math.max(8, vollzeitStunden)}
            step="0.5"
            value={teilzeitStunden}
            onChange={(e) => setTeilzeitStunden(parseFloat(e.target.value))}
            className="w-full h-2 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="flex justify-between text-xs text-muted mt-1 tabular-nums">
            <span>4 Std</span>
            <span>{vollzeitStunden.toFixed(0)} Std (Vollzeit)</span>
          </div>
          {hasInput && (
            <p className="text-xs text-muted mt-3">
              Das entspricht {stundenAnteilProzent.toFixed(1).replace(".", ",")}{" "}
              % deiner Vollzeit-Stunden.
            </p>
          )}
        </div>

        {/* Toggle Detail-Section */}
        <button
          type="button"
          onClick={() => setShowDetails((s) => !s)}
          className="w-full text-center text-sm font-medium text-primary hover:text-primary-light transition-colors py-2"
          aria-expanded={showDetails}
        >
          {showDetails ? "Weniger Optionen ▲" : "Genauer berechnen ▼"}
        </button>

        {showDetails && (
          <div className="space-y-5 border-t border-foreground/5 pt-5">
            {/* Steuerklasse */}
            <fieldset>
              <legend className="block text-sm font-semibold text-foreground mb-2">
                Steuerklasse
              </legend>
              <div
                role="radiogroup"
                aria-label="Steuerklasse waehlen"
                className="grid grid-cols-6 gap-1 sm:gap-2"
              >
                {STEUERKLASSEN.map((sk) => (
                  <button
                    key={sk}
                    type="button"
                    role="radio"
                    aria-checked={steuerklasse === sk}
                    onClick={() => setSteuerklasse(sk)}
                    className={`py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-xl border transition-colors ${
                      steuerklasse === sk
                        ? "bg-primary text-white border-primary"
                        : "bg-foreground/5 text-foreground border-foreground/10 hover:border-primary/40"
                    }`}
                  >
                    {sk === 1
                      ? "I"
                      : sk === 2
                        ? "II"
                        : sk === 3
                          ? "III"
                          : sk === 4
                            ? "IV"
                            : sk === 5
                              ? "V"
                              : "VI"}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Bundesland */}
            <div>
              <label
                htmlFor="tz-bundesland"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Bundesland
              </label>
              <select
                id="tz-bundesland"
                value={bundesland}
                onChange={(e) => setBundesland(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              >
                {BUNDESLAENDER.map((bl) => (
                  <option key={bl} value={bl}>
                    {bl}
                  </option>
                ))}
              </select>
            </div>

            {/* Kirchensteuer */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="tz-kirche"
                className="text-sm font-semibold text-foreground"
              >
                Kirchensteuerpflichtig
              </label>
              <button
                id="tz-kirche"
                type="button"
                role="switch"
                aria-checked={kirchensteuerAktiv}
                onClick={() => setKirchensteuerAktiv((v) => !v)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  kirchensteuerAktiv ? "bg-primary" : "bg-foreground/15"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                    kirchensteuerAktiv ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Kinder */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Kinderfreibetraege
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setKinder((k) => Math.max(0, k - 0.5))}
                  disabled={kinder <= 0}
                  aria-label="Kinderfreibetraege verringern"
                  className="w-10 h-10 rounded-xl border border-foreground/10 bg-foreground/5 text-foreground font-bold text-lg flex items-center justify-center hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  &minus;
                </button>
                <span className="text-lg font-semibold text-foreground w-10 text-center tabular-nums">
                  {kinder.toFixed(1).replace(".", ",")}
                </span>
                <button
                  type="button"
                  onClick={() => setKinder((k) => Math.min(6, k + 0.5))}
                  disabled={kinder >= 6}
                  aria-label="Kinderfreibetraege erhoehen"
                  className="w-10 h-10 rounded-xl border border-foreground/10 bg-foreground/5 text-foreground font-bold text-lg flex items-center justify-center hover:border-primary/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

            {/* Krankenversicherung */}
            <fieldset>
              <legend className="block text-sm font-semibold text-foreground mb-2">
                Krankenversicherung
              </legend>
              <div
                role="radiogroup"
                aria-label="Art der Krankenversicherung"
                className="grid grid-cols-2 gap-2"
              >
                {(["gesetzlich", "privat"] as const).map((art) => (
                  <button
                    key={art}
                    type="button"
                    role="radio"
                    aria-checked={kvArt === art}
                    onClick={() => setKvArt(art)}
                    className={`py-2.5 text-sm font-semibold rounded-xl border transition-colors ${
                      kvArt === art
                        ? "bg-primary text-white border-primary"
                        : "bg-foreground/5 text-foreground border-foreground/10 hover:border-primary/40"
                    }`}
                  >
                    {art === "gesetzlich" ? "Gesetzlich" : "Privat"}
                  </button>
                ))}
              </div>
            </fieldset>

            {kvArt === "gesetzlich" && (
              <div>
                <label
                  htmlFor="tz-kv-zusatz"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  KV-Zusatzbeitrag (%)
                </label>
                <input
                  id="tz-kv-zusatz"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  inputMode="decimal"
                  value={kvZusatz}
                  onChange={(e) => setKvZusatz(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ergebnisse — Side-by-Side Vollzeit vs. Teilzeit */}
      {hasInput && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 text-center">
              <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                Vollzeit
              </p>
              <p className="text-sm text-muted mt-1">
                {vollzeitStunden.toFixed(0)} Std/Woche
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground mt-3 tabular-nums">
                {fmt(vollzeitErgebnis.netto)} &euro;
              </p>
              <p className="text-xs text-muted mt-1">
                netto · brutto {fmtKompakt(vollzeitBrutto)} &euro;
              </p>
            </div>
            <div className="bg-card rounded-2xl shadow-sm border-2 border-accent/30 p-6 text-center ring-2 ring-accent/10">
              <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                Teilzeit
              </p>
              <p className="text-sm text-muted mt-1">
                {effektiveTeilzeitStunden.toFixed(1).replace(".", ",")}{" "}
                Std/Woche
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-accent mt-3 tabular-nums">
                {fmt(teilzeitErgebnis.netto)} &euro;
              </p>
              <p className="text-xs text-muted mt-1">
                netto · brutto {fmtKompakt(teilzeitBrutto)} &euro;
              </p>
            </div>
          </div>

          {/* Differenz-Box */}
          <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Differenz pro Monat
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">
                  Brutto-Verzicht
                </span>
                <span className="text-base font-semibold text-foreground tabular-nums">
                  &minus;{fmt(bruttoDelta)} &euro;
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">
                  Netto-Verzicht
                </span>
                <span className="text-base font-bold text-primary tabular-nums">
                  &minus;{fmt(nettoDelta)} &euro;
                </span>
              </div>
              {nettoDelta > 0 && bruttoDelta > 0 && (
                <div className="flex items-center justify-between border-t border-foreground/10 pt-3">
                  <span className="text-sm text-muted">
                    Effektiver Stundenlohn-Verlust
                  </span>
                  <span className="text-sm font-medium text-muted tabular-nums">
                    {((nettoDelta / bruttoDelta) * 100)
                      .toFixed(1)
                      .replace(".", ",")}{" "}
                    % des Brutto-Verzichts
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted mt-4 leading-relaxed">
              Die Steuer-Progression macht den Netto-Verzicht meist kleiner als
              den Brutto-Verzicht. Pflegekosten, Wegezeiten und Lebensqualitaet
              kommen oben drauf — nicht in der Tabelle.
            </p>
          </div>

          {/* Aufschluesselung Teilzeit-Abzuege */}
          <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8 space-y-2">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Teilzeit-Abzuege im Detail
            </h3>
            <ZeileMini
              label="Lohnsteuer + Soli + Kirche"
              wert={teilzeitErgebnis.steuernGesamt}
            />
            <ZeileMini
              label="Sozialabgaben (KV/RV/AV/PV)"
              wert={teilzeitErgebnis.svGesamt}
            />
            <div className="flex items-center justify-between border-t border-foreground/10 mt-2 pt-2">
              <span className="text-sm font-semibold text-foreground">
                Abzuege gesamt
              </span>
              <span className="text-sm font-bold text-foreground tabular-nums">
                &minus;{fmt(teilzeitErgebnis.abzuegeGesamt)} &euro;{" "}
                <span className="text-muted font-normal">
                  (
                  {teilzeitBrutto > 0
                    ? (
                        (teilzeitErgebnis.abzuegeGesamt / teilzeitBrutto) *
                        100
                      )
                        .toFixed(1)
                        .replace(".", ",")
                    : "0"}
                  %)
                </span>
              </span>
            </div>
          </div>

          {/* Share */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
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
              {copied ? "Link kopiert!" : "Ergebnis teilen"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function ZeileMini({ label, wert }: { label: string; wert: number }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground tabular-nums">
        &minus;{fmt(wert)} &euro;
      </span>
    </div>
  );
}
