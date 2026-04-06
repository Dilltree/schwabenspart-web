"use client";

import { useState, useCallback, useMemo } from "react";
import { STEUER_2026 } from "@/lib/steuer-konstanten";

const fmt = (value: number) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value);

const fmt2 = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const STEUERKLASSEN = [1, 2, 3, 4, 5, 6] as const;
const LAUFZEITEN = [24, 36] as const;

function berechneNettoAbzug(
  brutto: number,
  steuerklasse: number,
  kirchensteuer: boolean
): number {
  // Social insurance (employee share, capped at BBG)
  const kvBeitrag =
    Math.min(brutto, STEUER_2026.kv.bbg / 12) *
    (STEUER_2026.kv.satz + STEUER_2026.kv.zusatzbeitrag);
  const rvBeitrag =
    Math.min(brutto, STEUER_2026.rv.bbg / 12) * STEUER_2026.rv.satz;
  const avBeitrag =
    Math.min(brutto, STEUER_2026.av.bbg / 12) * STEUER_2026.av.satz;
  const pvBeitrag =
    Math.min(brutto, STEUER_2026.pv.bbg / 12) *
    (STEUER_2026.pv.satz + STEUER_2026.pv.zuschlagKinderlos);
  const svGesamt = kvBeitrag + rvBeitrag + avBeitrag + pvBeitrag;

  // Simplified income tax (approximate effective rates by Steuerklasse)
  const steuersaetze: Record<number, number> = {
    1: 0.18,
    2: 0.16,
    3: 0.1,
    4: 0.18,
    5: 0.28,
    6: 0.3,
  };
  const effektiverSteuersatz = steuersaetze[steuerklasse] || 0.18;
  const lohnsteuer = brutto * effektiverSteuersatz;
  const soli =
    lohnsteuer > STEUER_2026.solidaritaetFreigrenze / 12
      ? lohnsteuer * STEUER_2026.solidaritaetSatz
      : 0;
  const kirche = kirchensteuer ? lohnsteuer * 0.09 : 0;

  return svGesamt + lohnsteuer + soli + kirche;
}

export default function FahrradleasingRechner() {
  const [fahrradpreis, setFahrradpreis] = useState("");
  const [brutto, setBrutto] = useState("");
  const [steuerklasse, setSteuerklasse] = useState<number>(1);
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [laufzeit, setLaufzeit] = useState<number>(36);
  const [rabatt, setRabatt] = useState(15);
  const [versicherung, setVersicherung] = useState("10");
  const [copied, setCopied] = useState(false);

  const fahrradpreisVal = parseFloat(fahrradpreis) || 0;
  const bruttoVal = parseFloat(brutto) || 0;
  const versicherungVal = parseFloat(versicherung) || 0;
  const hasInput = fahrradpreisVal > 0 && bruttoVal > 0;

  const result = useMemo(() => {
    if (!hasInput) return null;

    const leasingRate = fahrradpreisVal * 0.03;
    const geldwerterVorteil =
      fahrradpreisVal * STEUER_2026.geldwerterVorteilFahrrad;
    const uebernahme = fahrradpreisVal * STEUER_2026.standardUebernahme;

    const abzugMitLeasing = berechneNettoAbzug(
      bruttoVal - leasingRate + geldwerterVorteil,
      steuerklasse,
      kirchensteuer
    );
    const abzugOhneLeasing = berechneNettoAbzug(
      bruttoVal,
      steuerklasse,
      kirchensteuer
    );
    const nettoErsparnis = abzugOhneLeasing - abzugMitLeasing;

    const effektivMonatlich = leasingRate - nettoErsparnis;
    const versicherungGesamt = versicherungVal * laufzeit;
    const gesamtLeasing = effektivMonatlich * laufzeit + uebernahme + versicherungGesamt;

    const rabattBetrag = fahrradpreisVal * (rabatt / 100);
    const barkaufPreis = fahrradpreisVal - rabattBetrag;
    const gesamtBarkauf = barkaufPreis;

    const ersparnis = gesamtBarkauf - gesamtLeasing;

    // Auswirkung auf Rente: weniger Brutto = weniger RV-Beiträge
    const rvMinderbeitrag = Math.min(leasingRate, STEUER_2026.rv.bbg / 12) * STEUER_2026.rv.satz * 2; // AG+AN Anteil
    const rentenVerlustMonatlich = rvMinderbeitrag * laufzeit / 12 * 0.0000340279; // Entgeltpunkte → Rente (ca. Faktor)
    const rentenVerlustGesamt = rvMinderbeitrag * laufzeit;

    return {
      leasingRate,
      geldwerterVorteil,
      uebernahme,
      nettoErsparnis,
      effektivMonatlich,
      versicherungGesamt,
      gesamtLeasing,
      rabattBetrag,
      gesamtBarkauf,
      ersparnis,
      rentenVerlustGesamt,
      steuerSvErsparnis: nettoErsparnis * laufzeit,
    };
  }, [fahrradpreisVal, bruttoVal, steuerklasse, kirchensteuer, laufzeit, rabatt, versicherungVal, hasInput]);

  const handleShare = useCallback(async () => {
    if (!result) return;
    const shareText = `Fahrradleasing vs. Barkauf: Leasing kostet effektiv ${fmt(result.gesamtLeasing)}\u20AC, Barkauf ${fmt(result.gesamtBarkauf)}\u20AC. Ersparnis: ${fmt(result.ersparnis)}\u20AC. Rechne selbst: schwabenspart.com/rechner/fahrradleasing`;

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
  }, [result]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Inputs */}
      <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8 space-y-6">
        {/* Fahrradpreis */}
        <div>
          <label
            htmlFor="fahrradpreis"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Fahrrad-Listenpreis / UVP (&euro;)
          </label>
          <input
            id="fahrradpreis"
            type="number"
            min="0"
            step="100"
            inputMode="decimal"
            value={fahrradpreis}
            onChange={(e) => setFahrradpreis(e.target.value)}
            placeholder="z.B. 3000"
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-lg"
          />
        </div>

        {/* Bruttogehalt */}
        <div>
          <label
            htmlFor="brutto"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Monatliches Bruttogehalt (&euro;)
          </label>
          <input
            id="brutto"
            type="number"
            min="0"
            step="100"
            inputMode="decimal"
            value={brutto}
            onChange={(e) => setBrutto(e.target.value)}
            placeholder="z.B. 3500"
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-lg"
          />
        </div>

        {/* Steuerklasse */}
        <fieldset>
          <legend className="block text-sm font-semibold text-foreground mb-2">
            Steuerklasse
          </legend>
          <div className="flex flex-wrap gap-2">
            {STEUERKLASSEN.map((sk) => (
              <button
                key={sk}
                type="button"
                onClick={() => setSteuerklasse(sk)}
                className={`px-4 py-2 text-sm font-medium rounded-xl border transition-colors ${
                  steuerklasse === sk
                    ? "bg-primary text-white border-primary"
                    : "bg-foreground/5 text-foreground border-foreground/10 hover:border-primary"
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

        {/* Kirchensteuer */}
        <div className="flex items-center gap-3">
          <input
            id="kirchensteuer"
            type="checkbox"
            checked={kirchensteuer}
            onChange={(e) => setKirchensteuer(e.target.checked)}
            className="w-5 h-5 rounded border-foreground/20 text-primary accent-primary cursor-pointer"
          />
          <label
            htmlFor="kirchensteuer"
            className="text-sm font-semibold text-foreground cursor-pointer"
          >
            Kirchensteuerpflichtig
          </label>
        </div>

        {/* Leasingdauer */}
        <fieldset>
          <legend className="block text-sm font-semibold text-foreground mb-2">
            Leasingdauer
          </legend>
          <div className="flex gap-2">
            {LAUFZEITEN.map((lz) => (
              <button
                key={lz}
                type="button"
                onClick={() => setLaufzeit(lz)}
                className={`px-5 py-2 text-sm font-medium rounded-xl border transition-colors ${
                  laufzeit === lz
                    ? "bg-primary text-white border-primary"
                    : "bg-foreground/5 text-foreground border-foreground/10 hover:border-primary"
                }`}
              >
                {lz} Monate
              </button>
            ))}
          </div>
        </fieldset>

        {/* Barkauf-Rabatt */}
        <div>
          <label
            htmlFor="rabatt"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Rabatt beim Barkauf ({rabatt}%)
          </label>
          <input
            id="rabatt"
            type="range"
            min="0"
            max="30"
            step="1"
            value={rabatt}
            onChange={(e) => setRabatt(parseInt(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-foreground/10 accent-[#c8a84e] cursor-pointer"
          />
          <p className="text-xs text-muted mt-2">
            Im Handel bekommst du oft 10-25% Rabatt auf den Listenpreis
          </p>
        </div>

        {/* Versicherung */}
        <div>
          <label
            htmlFor="versicherung"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Versicherung pro Monat (€)
          </label>
          <input
            id="versicherung"
            type="number"
            min="0"
            step="1"
            inputMode="decimal"
            value={versicherung}
            onChange={(e) => setVersicherung(e.target.value)}
            placeholder="z.B. 10"
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-lg"
          />
          <p className="text-xs text-muted mt-2">
            Beim Leasing meist Pflicht (Diebstahl, Verschleiß). Typisch: 5-15 €/Monat. Bei Barkauf optional.
          </p>
        </div>
      </div>

      {/* Results */}
      {hasInput && result && (
        <>
          {/* Verdict banner */}
          {result.ersparnis > 100 ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600 shrink-0"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <p className="text-green-800 font-semibold">
                Leasing lohnt sich! Du sparst {fmt(result.ersparnis)} &euro;
              </p>
            </div>
          ) : result.ersparnis > 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-yellow-600 shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-yellow-800 font-semibold">
                Knapp — Leasing ist nur {fmt(result.ersparnis)} &euro; günstiger
              </p>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-600 shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <p className="text-red-800 font-semibold">
                Barkauf ist {fmt(Math.abs(result.ersparnis))} &euro; günstiger!
              </p>
            </div>
          )}

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Barkauf */}
            <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 space-y-3">
              <h3 className="text-lg font-bold text-foreground">Barkauf</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Kaufpreis (UVP)</span>
                  <span className="text-foreground">
                    {fmt(fahrradpreisVal)} &euro;
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Rabatt ({rabatt}%)</span>
                  <span className="text-green-600">
                    -{fmt(result.rabattBetrag)} &euro;
                  </span>
                </div>
                <hr className="border-foreground/10" />
                <div className="flex justify-between">
                  <span className="font-bold text-foreground text-base">
                    Gesamtkosten
                  </span>
                  <span className="font-bold text-primary text-xl">
                    {fmt(result.gesamtBarkauf)} &euro;
                  </span>
                </div>
              </div>
            </div>

            {/* Leasing */}
            <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 space-y-3">
              <h3 className="text-lg font-bold text-foreground">Leasing</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Leasingrate/Monat (brutto)</span>
                  <span className="text-foreground">
                    {fmt2(result.leasingRate)} &euro;
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Geldwerter Vorteil/Monat</span>
                  <span className="text-foreground">
                    +{fmt2(result.geldwerterVorteil)} &euro;
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">
                    Steuer- &amp; SV-Ersparnis/Monat
                  </span>
                  <span className="text-green-600">
                    -{fmt2(result.nettoErsparnis)} &euro;
                  </span>
                </div>
                <hr className="border-foreground/10 border-dashed" />
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">Effektive Rate/Monat</span>
                  <span className="text-foreground">
                    {fmt2(result.effektivMonatlich)} &euro;
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">
                    &times; {laufzeit} Monate
                  </span>
                  <span className="text-foreground">
                    {fmt(result.effektivMonatlich * laufzeit)} &euro;
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">
                    Übernahme nach Leasing (18%)
                  </span>
                  <span className="text-foreground">
                    +{fmt(result.uebernahme)} &euro;
                  </span>
                </div>
                {versicherungVal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted">
                      Versicherung ({laufzeit} × {fmt(versicherungVal)} €)
                    </span>
                    <span className="text-foreground">
                      +{fmt(result.versicherungGesamt)} &euro;
                    </span>
                  </div>
                )}
                <hr className="border-foreground/10" />
                <div className="flex justify-between">
                  <span className="font-bold text-foreground text-base">
                    Gesamtkosten
                  </span>
                  <span className="font-bold text-primary text-xl">
                    {fmt(result.gesamtLeasing)} &euro;
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-muted">davon Steuer-/SV-Ersparnis</span>
                  <span className="text-xs text-green-600">
                    -{fmt(result.steuerSvErsparnis)} &euro;
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual bar comparison */}
          <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Kostenvergleich
            </h3>
            {(() => {
              const maxCost = Math.max(
                result.gesamtBarkauf,
                result.gesamtLeasing,
                1
              );
              return (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted">Barkauf</span>
                      <span className="font-medium text-foreground">
                        {fmt(result.gesamtBarkauf)} &euro;
                      </span>
                    </div>
                    <div className="w-full bg-foreground/5 rounded-full h-5 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(result.gesamtBarkauf / maxCost) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted">Leasing</span>
                      <span className="font-medium text-foreground">
                        {fmt(result.gesamtLeasing)} &euro;
                      </span>
                    </div>
                    <div className="w-full bg-foreground/5 rounded-full h-5 overflow-hidden">
                      <div
                        className="bg-accent h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(result.gesamtLeasing / maxCost) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Warning box */}
          <div className="bg-foreground/5 rounded-xl p-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">
              Beachte:
            </p>
            <ul className="text-sm text-muted space-y-1 list-disc list-inside">
              <li>
                Leasing läuft über {laufzeit} Monate — vorzeitige Kündigung ist
                nicht möglich
              </li>
              <li>
                Niedrigeres Brutto = weniger Rente, Elterngeld &amp; Krankengeld
              </li>
              <li>
                Im Laden bekommst du oft 10-25% Rabatt — beim Leasing zahlst du
                den vollen Listenpreis
              </li>
              <li>
                Versicherung ist beim Leasing meist Pflicht (hier nicht
                eingerechnet)
              </li>
            </ul>
          </div>

          {/* Detaillierte Aufschlüsselung */}
          <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Detaillierte Kostenaufstellung</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-foreground/10">
                    <th className="text-left py-2 text-muted font-medium">Position</th>
                    <th className="text-right py-2 text-muted font-medium">Barkauf</th>
                    <th className="text-right py-2 text-muted font-medium">Leasing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/5">
                  <tr>
                    <td className="py-2 text-foreground">Anschaffungspreis</td>
                    <td className="py-2 text-right text-foreground">{fmt(result.gesamtBarkauf)} €</td>
                    <td className="py-2 text-right text-muted">—</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Leasingraten ({laufzeit} × {fmt2(result.leasingRate)} €)</td>
                    <td className="py-2 text-right text-muted">—</td>
                    <td className="py-2 text-right text-foreground">{fmt(result.leasingRate * laufzeit)} €</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Steuer- &amp; SV-Ersparnis</td>
                    <td className="py-2 text-right text-muted">0 €</td>
                    <td className="py-2 text-right text-green-600">-{fmt(result.steuerSvErsparnis)} €</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Übernahme (18% Restwert)</td>
                    <td className="py-2 text-right text-muted">—</td>
                    <td className="py-2 text-right text-foreground">{fmt(result.uebernahme)} €</td>
                  </tr>
                  {versicherungVal > 0 && (
                    <tr>
                      <td className="py-2 text-foreground">Versicherung ({laufzeit} Monate)</td>
                      <td className="py-2 text-right text-muted">optional</td>
                      <td className="py-2 text-right text-foreground">{fmt(result.versicherungGesamt)} €</td>
                    </tr>
                  )}
                  <tr className="border-t-2 border-foreground/20 font-bold">
                    <td className="py-3 text-foreground">Gesamtkosten</td>
                    <td className="py-3 text-right text-primary">{fmt(result.gesamtBarkauf)} €</td>
                    <td className="py-3 text-right text-primary">{fmt(result.gesamtLeasing)} €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Auswirkungen auf Sozialleistungen */}
          <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Was du sonst noch wissen solltest</h3>
            <div className="space-y-3 text-sm text-muted">
              <div className="flex items-start gap-3">
                <span className="bg-primary/10 text-primary rounded-lg p-1.5 mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </span>
                <div>
                  <p className="font-medium text-foreground">Weniger Rente</p>
                  <p>Durch das niedrigere Brutto zahlst du über {laufzeit} Monate ca. <strong className="text-foreground">{fmt(result.rentenVerlustGesamt)} € weniger</strong> in die Rentenversicherung (AG+AN). Das reduziert deine spätere Monatsrente minimal.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-primary/10 text-primary rounded-lg p-1.5 mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </span>
                <div>
                  <p className="font-medium text-foreground">Weniger Elterngeld &amp; Krankengeld</p>
                  <p>Beide werden vom Brutto berechnet. Wenn du in den nächsten {laufzeit} Monaten Elterngeld oder Krankengeld beantragen könntest, ist das relevant.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-primary/10 text-primary rounded-lg p-1.5 mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </span>
                <div>
                  <p className="font-medium text-foreground">Jobwechsel</p>
                  <p>Bei einem Arbeitgeberwechsel muss der neue AG das Leasing übernehmen — oder du löst den Vertrag ab (oft zum vollen Restwert).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-accent/20 text-accent rounded-lg p-1.5 mt-0.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </span>
                <div>
                  <p className="font-medium text-foreground">Wann lohnt sich Leasing am meisten?</p>
                  <p>Steuerklasse I, III oder IV, Brutto über 3.000 €, teures Fahrrad (ab 2.000 € UVP), und kein großer Rabatt im Handel verfügbar.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schwaben-Fazit */}
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <p className="text-sm font-semibold text-primary mb-2">Der Schwabe sagt:</p>
            <p className="text-sm text-foreground italic">
              {result.ersparnis > 300
                ? `"${fmt(result.ersparnis)} Euro gspart — des isch a gscheids Vesper wert! Aber vergiss net: Beim Leasing bisch du ${laufzeit} Monat gebunde. Wer's Geld auf dr Seit hot, kauft lieber bar — ond handelt no an Rabatt raus."`
                : result.ersparnis > 0
                  ? `"${fmt(result.ersparnis)} Euro Ersparnis — net schlecht, aber au net berauschend. Überleg dir gut, ob dir die Bindung über ${laufzeit} Monat des wert isch. A Schwabe kauft nur, wenn's sich au wirklich rechnet."`
                  : `"Barkauf isch hier ${fmt(Math.abs(result.ersparnis))} Euro günstiger. Do braucht mr net lang überlege — ab in Laden, Rabatt verhandle, ond fertig. Cash isch King, sagt dr Schwabe!"`
              }
            </p>
          </div>

          {/* Share button */}
          <div className="text-center">
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
              {copied ? "Link kopiert!" : "Ergebnis teilen"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
