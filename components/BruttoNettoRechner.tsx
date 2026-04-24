"use client";

import { useState, useCallback, useMemo } from "react";
import { berechneNetto, BUNDESLAENDER, STEUERKLASSEN } from "@/lib/lohnsteuer";

const fmt = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

function DeductionRow({
  label,
  amount,
  brutto,
  colorClass,
}: {
  label: string;
  amount: number;
  brutto: number;
  colorClass: string;
}) {
  const pct = brutto > 0 ? (amount / brutto) * 100 : 0;
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="text-sm text-foreground w-44 sm:w-52 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-3 bg-foreground/5 rounded-full overflow-hidden">
        <div
          className={`${colorClass} h-full rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <span className="text-sm font-medium text-foreground w-24 text-right shrink-0 tabular-nums">
        &minus;{fmt(amount)} &euro;
      </span>
    </div>
  );
}

export default function BruttoNettoRechner() {
  const [bruttoInput, setBruttoInput] = useState("");
  const [steuerklasse, setSteuerklasse] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [bundesland, setBundesland] = useState("Baden-Württemberg");
  const [kirchensteuerAktiv, setKirchensteuerAktiv] = useState(false);
  const [kinder, setKinder] = useState(0);
  const [kvArt, setKvArt] = useState<"gesetzlich" | "privat">("gesetzlich");
  const [kvZusatz, setKvZusatz] = useState("1.25");
  const [copied, setCopied] = useState(false);

  const bruttoVal = parseFloat(bruttoInput) || 0;
  const kvZusatzVal = parseFloat(kvZusatz) || 0;

  const result = useMemo(
    () =>
      berechneNetto({
        brutto: bruttoVal,
        steuerklasse,
        bundesland,
        kirchensteuer: kirchensteuerAktiv,
        kinder,
        kvArt,
        kvZusatz: kvZusatzVal,
      }),
    [bruttoVal, steuerklasse, bundesland, kirchensteuerAktiv, kinder, kvArt, kvZusatzVal]
  );

  const handleShare = useCallback(async () => {
    const prozent =
      bruttoVal > 0
        ? ((result.netto / bruttoVal) * 100).toFixed(1).replace(".", ",")
        : "0";
    const shareText = `Mein Nettolohn: ${fmt(result.netto)}\u20AC von ${fmt(bruttoVal)}\u20AC brutto (${prozent}%). Berechne deins: schwabenspart.com/rechner/brutto-netto`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
        return;
      } catch {
        // User cancelled or share failed
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard not available
    }
  }, [bruttoVal, result.netto]);

  const hasInput = bruttoVal > 0;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Stage 1 — Quick calculation */}
      <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8 space-y-6">
        {/* Brutto-Monatsgehalt */}
        <div>
          <label
            htmlFor="brutto-gehalt"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Brutto-Monatsgehalt (&euro;)
          </label>
          <input
            id="brutto-gehalt"
            type="number"
            min="0"
            step="100"
            inputMode="decimal"
            value={bruttoInput}
            onChange={(e) => setBruttoInput(e.target.value)}
            placeholder="z.B. 3500"
            className="w-full px-4 py-4 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-xl font-medium"
          />
        </div>

        {/* Steuerklasse */}
        <fieldset>
          <legend className="block text-sm font-semibold text-foreground mb-2">
            Steuerklasse
          </legend>
          <div
            role="radiogroup"
            aria-label="Steuerklasse wählen"
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

        {/* Toggle for details */}
        <button
          type="button"
          onClick={() => setShowDetails((s) => !s)}
          className="w-full text-center text-sm font-medium text-primary hover:text-primary-light transition-colors py-2"
          aria-expanded={showDetails}
        >
          {showDetails ? "Weniger Optionen \u25B2" : "Genauer berechnen \u25BC"}
        </button>

        {/* Stage 2 — Detail section */}
        {showDetails && (
          <div className="space-y-5 border-t border-foreground/5 pt-5">
            {/* Bundesland */}
            <div>
              <label
                htmlFor="bundesland"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Bundesland
              </label>
              <select
                id="bundesland"
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

            {/* Kirchensteuerpflichtig */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="kirchensteuer-toggle"
                className="text-sm font-semibold text-foreground"
              >
                Kirchensteuerpflichtig
              </label>
              <button
                id="kirchensteuer-toggle"
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

            {/* Kinderfreibeträge */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Kinderfreibeträge
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setKinder((k) => Math.max(0, k - 0.5))}
                  disabled={kinder <= 0}
                  aria-label="Kinderfreibeträge verringern"
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
                  aria-label="Kinderfreibeträge erhöhen"
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

            {/* KV-Zusatzbeitrag */}
            {kvArt === "gesetzlich" && (
              <div>
                <label
                  htmlFor="kv-zusatz"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  KV-Zusatzbeitrag (%)
                </label>
                <input
                  id="kv-zusatz"
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

      {/* Results */}
      {hasInput && (
        <>
          {/* Big Netto card */}
          <div className="bg-card rounded-2xl shadow-sm border-2 border-accent/30 p-8 text-center ring-2 ring-accent/10">
            <p className="text-muted text-sm font-medium">Dein Nettolohn</p>
            <p className="text-4xl sm:text-5xl font-bold text-accent mt-2 tabular-nums">
              {fmt(result.netto)} &euro;
            </p>
            <p className="text-muted text-sm mt-2">
              von {fmt(result.brutto)} &euro; brutto
            </p>
          </div>

          {/* Waterfall / Abzüge */}
          <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8 space-y-6">
            {/* Steuern */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Steuern
              </h3>
              <div className="space-y-1">
                <DeductionRow
                  label="Lohnsteuer"
                  amount={result.lohnsteuer}
                  brutto={result.brutto}
                  colorClass="bg-primary"
                />
                <DeductionRow
                  label="Solidaritätszuschlag"
                  amount={result.soli}
                  brutto={result.brutto}
                  colorClass="bg-primary"
                />
                <DeductionRow
                  label="Kirchensteuer"
                  amount={result.kirchensteuer}
                  brutto={result.brutto}
                  colorClass="bg-primary"
                />
              </div>
              <div className="flex items-center justify-between border-t border-foreground/10 mt-3 pt-3">
                <span className="text-sm font-semibold text-foreground">
                  Steuern gesamt
                </span>
                <span className="text-sm font-bold text-foreground tabular-nums">
                  &minus;{fmt(result.steuernGesamt)} &euro;
                </span>
              </div>
            </div>

            {/* Sozialabgaben */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Sozialabgaben
              </h3>
              <div className="space-y-1">
                <DeductionRow
                  label="Krankenversicherung"
                  amount={result.kv}
                  brutto={result.brutto}
                  colorClass="bg-primary-light"
                />
                <DeductionRow
                  label="Rentenversicherung"
                  amount={result.rv}
                  brutto={result.brutto}
                  colorClass="bg-primary-light"
                />
                <DeductionRow
                  label="Arbeitslosenversicherung"
                  amount={result.av}
                  brutto={result.brutto}
                  colorClass="bg-primary-light"
                />
                <DeductionRow
                  label="Pflegeversicherung"
                  amount={result.pv}
                  brutto={result.brutto}
                  colorClass="bg-primary-light"
                />
              </div>
              <div className="flex items-center justify-between border-t border-foreground/10 mt-3 pt-3">
                <span className="text-sm font-semibold text-foreground">
                  Sozialabgaben gesamt
                </span>
                <span className="text-sm font-bold text-foreground tabular-nums">
                  &minus;{fmt(result.svGesamt)} &euro;
                </span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-foreground">Abzüge gesamt</span>
              <span className="text-base font-bold text-foreground tabular-nums">
                &minus;{fmt(result.abzuegeGesamt)} &euro;{" "}
                <span className="text-muted font-normal text-sm">
                  ({((result.abzuegeGesamt / result.brutto) * 100).toFixed(1).replace(".", ",")}%)
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-foreground/10">
              <span className="text-sm font-bold text-foreground">
                Nettolohn
              </span>
              <span className="text-lg font-bold text-accent tabular-nums">
                {fmt(result.netto)} &euro;{" "}
                <span className="text-muted font-normal text-sm">
                  ({((result.netto / result.brutto) * 100).toFixed(1).replace(".", ",")}%)
                </span>
              </span>
            </div>
          </div>

          {/* Share button */}
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
