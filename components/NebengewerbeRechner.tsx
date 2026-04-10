"use client";

import { useState, useCallback, useMemo } from "react";
import { STEUER_2026 } from "@/lib/steuer-konstanten";

const fmt = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const fmt0 = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

// § 19 UStG (Reform 2025): 25.000 € Vorjahr, 100.000 € lfd. Jahr
const KLEINUNTERNEHMER_GRENZE_LFD = 100000;
const KLEINUNTERNEHMER_GRENZE_VORJAHR = 25000;

// § 11 GewStG: Freibetrag für Einzelunternehmer & Personengesellschaften
const GEWERBESTEUER_FREIBETRAG = 24500;
const GEWERBESTEUER_MESSZAHL = 0.035;
// § 35 EStG: 3,8-fache des Messbetrags wird auf die Einkommensteuer angerechnet
const GEWERBESTEUER_ANRECHNUNG_FAKTOR = 3.8;
// Faustregel für Hauptberuflich-Warnung: Nebengewerbe-Gewinn > 50 % des Hauptjob-Brutto
const HAUPTBERUFLICH_WARNSCHWELLE = 0.5;

function jahresEinkommensteuer(zvE: number): number {
  const { grundfreibetrag, spitzenGrenze, reichenGrenze } = STEUER_2026;
  if (zvE <= grundfreibetrag) return 0;
  const basis = zvE - grundfreibetrag;
  const grenze1 = spitzenGrenze - grundfreibetrag;
  const grenze2 = reichenGrenze - grundfreibetrag;
  if (basis <= grenze1) return basis * 0.28;
  if (basis <= grenze2) return grenze1 * 0.28 + (basis - grenze1) * 0.42;
  return (
    grenze1 * 0.28 +
    (grenze2 - grenze1) * 0.42 +
    (basis - grenze2) * 0.45
  );
}

function berechneNebengewerbe(params: {
  umsatzMonat: number;
  ausgabenMonat: number;
  bruttoHauptJahr: number;
  hebesatz: number;
}) {
  const { umsatzMonat, ausgabenMonat, bruttoHauptJahr, hebesatz } = params;

  const jahresUmsatz = umsatzMonat * 12;
  const jahresAusgaben = ausgabenMonat * 12;
  const jahresGewinn = jahresUmsatz - jahresAusgaben;
  const monatsGewinn = umsatzMonat - ausgabenMonat;

  // Kleinunternehmer-Status (§ 19 UStG) — Annahme: Vorjahr ebenfalls unter Grenze
  const kleinunternehmerMoeglich =
    jahresUmsatz <= KLEINUNTERNEHMER_GRENZE_LFD &&
    jahresUmsatz <= KLEINUNTERNEHMER_GRENZE_VORJAHR;

  // Gewerbesteuer
  const gewerbeBasis = Math.max(0, jahresGewinn - GEWERBESTEUER_FREIBETRAG);
  const gewerbeMessbetrag = gewerbeBasis * GEWERBESTEUER_MESSZAHL;
  const gewerbeSteuer = gewerbeMessbetrag * (hebesatz / 100);
  const gewerbeAnrechnungMax =
    gewerbeMessbetrag * GEWERBESTEUER_ANRECHNUNG_FAKTOR;

  // Einkommensteuer-Zusatzlast über Grenzsteuersatz-Effekt
  // Approximation zvE Hauptjob: Brutto abz. pauschal 21 % Sozialabgaben (bis BBG)
  // sowie Werbungskosten- & Sonderausgaben-Pauschale.
  const sozAbgabenPauschal =
    Math.min(bruttoHauptJahr, STEUER_2026.kv.bbg) * 0.21;
  const zvE_haupt = Math.max(
    0,
    bruttoHauptJahr -
      sozAbgabenPauschal -
      STEUER_2026.werbungskostenPauschale -
      STEUER_2026.sonderausgabenPauschale
  );

  const estOhne = jahresEinkommensteuer(zvE_haupt);
  const estMit = jahresEinkommensteuer(
    zvE_haupt + Math.max(0, jahresGewinn)
  );
  const zusatzEstRoh = Math.max(0, estMit - estOhne);

  // Anrechnung Gewerbesteuer auf ESt: min(tatsächliche GewSt, 3,8·Messbetrag, zusatzESt)
  const gewerbeAnrechnung = Math.min(
    gewerbeSteuer,
    gewerbeAnrechnungMax,
    zusatzEstRoh
  );
  const zusatzEstNachAnrechnung = zusatzEstRoh - gewerbeAnrechnung;

  // Soli nur wenn Gesamt-ESt die Freigrenze überschreitet
  const zusatzSoli =
    estMit > STEUER_2026.solidaritaetFreigrenze
      ? zusatzEstNachAnrechnung * STEUER_2026.solidaritaetSatz
      : 0;

  const abgabenJahr = gewerbeSteuer + zusatzEstNachAnrechnung + zusatzSoli;
  const nettoJahr = jahresGewinn - abgabenJahr;
  const nettoMonat = nettoJahr / 12;

  const hauptberuflichRisiko =
    bruttoHauptJahr > 0 &&
    jahresGewinn > bruttoHauptJahr * HAUPTBERUFLICH_WARNSCHWELLE;

  return {
    jahresUmsatz,
    jahresAusgaben,
    jahresGewinn,
    monatsGewinn,
    kleinunternehmerMoeglich,
    gewerbeBasis,
    gewerbeSteuer,
    gewerbeAnrechnung,
    zusatzEstRoh,
    zusatzEstNachAnrechnung,
    zusatzSoli,
    abgabenJahr,
    nettoJahr,
    nettoMonat,
    hauptberuflichRisiko,
  };
}

function Row({
  label,
  amount,
  sign = "minus",
  muted = false,
}: {
  label: string;
  amount: number;
  sign?: "minus" | "plus" | "none";
  muted?: boolean;
}) {
  const prefix =
    sign === "minus" ? "\u2212" : sign === "plus" ? "+" : "";
  return (
    <div
      className={`flex items-center justify-between py-2 ${
        muted ? "text-muted" : "text-foreground"
      }`}
    >
      <span className="text-sm">{label}</span>
      <span className="text-sm font-medium tabular-nums">
        {prefix}
        {fmt(amount)} &euro;
      </span>
    </div>
  );
}

export default function NebengewerbeRechner() {
  const [umsatzInput, setUmsatzInput] = useState("");
  const [ausgabenInput, setAusgabenInput] = useState("");
  const [hauptBruttoInput, setHauptBruttoInput] = useState("");
  const [hebesatzInput, setHebesatzInput] = useState("400");
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  const umsatzVal = parseFloat(umsatzInput) || 0;
  const ausgabenVal = parseFloat(ausgabenInput) || 0;
  const hauptBruttoVal = parseFloat(hauptBruttoInput) || 0;
  const hebesatzVal = parseFloat(hebesatzInput) || 400;

  const result = useMemo(
    () =>
      berechneNebengewerbe({
        umsatzMonat: umsatzVal,
        ausgabenMonat: ausgabenVal,
        bruttoHauptJahr: hauptBruttoVal,
        hebesatz: hebesatzVal,
      }),
    [umsatzVal, ausgabenVal, hauptBruttoVal, hebesatzVal]
  );

  const handleShare = useCallback(async () => {
    const shareText = `Mein Nebengewerbe: ${fmt(
      result.nettoMonat
    )}\u20AC netto pro Monat bei ${fmt(
      result.monatsGewinn
    )}\u20AC Gewinn. Berechne deins: schwabenspart.com/rechner/nebengewerbe`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
        return;
      } catch {
        // abgebrochen
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard nicht verfügbar
    }
  }, [result.nettoMonat, result.monatsGewinn]);

  const hasInput = umsatzVal > 0;
  const gewerbesteuerFaellig = result.gewerbeSteuer > 0;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Eingabe */}
      <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8 space-y-6">
        <div>
          <label
            htmlFor="ng-umsatz"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Monatlicher Umsatz (&euro;)
          </label>
          <input
            id="ng-umsatz"
            type="number"
            min="0"
            step="50"
            inputMode="decimal"
            value={umsatzInput}
            onChange={(e) => setUmsatzInput(e.target.value)}
            placeholder="z.B. 1200"
            className="w-full px-4 py-4 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-xl font-medium"
          />
          <p className="text-xs text-muted mt-1">
            Netto-Einnahmen vor Abzügen (ohne Umsatzsteuer).
          </p>
        </div>

        <div>
          <label
            htmlFor="ng-ausgaben"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Monatliche Betriebsausgaben (&euro;)
          </label>
          <input
            id="ng-ausgaben"
            type="number"
            min="0"
            step="10"
            inputMode="decimal"
            value={ausgabenInput}
            onChange={(e) => setAusgabenInput(e.target.value)}
            placeholder="z.B. 150"
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
          <p className="text-xs text-muted mt-1">
            Material, Software, Fahrtkosten, Arbeitszimmer &hellip;
          </p>
        </div>

        <div>
          <label
            htmlFor="ng-hauptjob"
            className="block text-sm font-semibold text-foreground mb-2"
          >
            Brutto-Jahresgehalt Hauptjob (&euro;)
          </label>
          <input
            id="ng-hauptjob"
            type="number"
            min="0"
            step="1000"
            inputMode="decimal"
            value={hauptBruttoInput}
            onChange={(e) => setHauptBruttoInput(e.target.value)}
            placeholder="z.B. 50000"
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
          <p className="text-xs text-muted mt-1">
            Für den Grenzsteuersatz &mdash; optional, aber genauer.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowDetails((s) => !s)}
          className="w-full text-center text-sm font-medium text-primary hover:text-primary-light transition-colors py-2"
          aria-expanded={showDetails}
        >
          {showDetails ? "Weniger Optionen \u25B2" : "Genauer berechnen \u25BC"}
        </button>

        {showDetails && (
          <div className="space-y-5 border-t border-foreground/5 pt-5">
            <div>
              <label
                htmlFor="ng-hebesatz"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Gewerbesteuer-Hebesatz (%)
              </label>
              <input
                id="ng-hebesatz"
                type="number"
                min="200"
                max="900"
                step="10"
                inputMode="decimal"
                value={hebesatzInput}
                onChange={(e) => setHebesatzInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <p className="text-xs text-muted mt-1">
                Je nach Gemeinde 200&thinsp;&ndash;&thinsp;500 %. Typisch:
                Stuttgart 420, München 490, kleinere Gemeinden 350.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Ergebnis */}
      {hasInput && (
        <>
          {/* Big Netto card */}
          <div className="bg-card rounded-2xl shadow-sm border-2 border-accent/30 p-8 text-center ring-2 ring-accent/10">
            <p className="text-muted text-sm font-medium">
              Was dir vom Nebengewerbe bleibt
            </p>
            <p className="text-4xl sm:text-5xl font-bold text-accent mt-2 tabular-nums">
              {fmt(Math.max(0, result.nettoMonat))} &euro;
            </p>
            <p className="text-muted text-sm mt-2">
              pro Monat &middot;{" "}
              {fmt(Math.max(0, result.nettoJahr))} &euro; im Jahr
            </p>
          </div>

          {/* Kleinunternehmer-Status */}
          {result.kleinunternehmerMoeglich ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-green-600 dark:text-green-400 font-bold text-lg leading-none mt-0.5">
                  &#10003;
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Kleinunternehmer-Regelung m&ouml;glich (&sect; 19 UStG)
                  </p>
                  <p className="text-xs text-muted mt-1">
                    Dein Jahresumsatz von{" "}
                    <span className="tabular-nums">
                      {fmt0(result.jahresUmsatz)} &euro;
                    </span>{" "}
                    liegt unter der Vorjahres-Grenze von{" "}
                    {fmt0(KLEINUNTERNEHMER_GRENZE_VORJAHR)} &euro;. Du musst
                    keine Umsatzsteuer ausweisen oder abf&uuml;hren, kannst
                    aber auch keine Vorsteuer abziehen.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-yellow-600 dark:text-yellow-400 font-bold text-lg leading-none mt-0.5">
                  !
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Regelbesteuerung: Umsatzsteuerpflichtig
                  </p>
                  <p className="text-xs text-muted mt-1">
                    Dein Jahresumsatz &uuml;berschreitet die
                    Kleinunternehmer-Grenze von{" "}
                    {fmt0(KLEINUNTERNEHMER_GRENZE_VORJAHR)} &euro;. Du musst
                    19&nbsp;% Umsatzsteuer ausweisen und ans Finanzamt
                    abf&uuml;hren &mdash; kannst aber Vorsteuer aus Ausgaben
                    abziehen. Die Umsatzsteuer ist ein durchlaufender Posten
                    und beeinflusst deinen Gewinn nicht.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Hauptberuflich-Warnung */}
          {result.hauptberuflichRisiko && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-red-600 dark:text-red-400 font-bold text-lg leading-none mt-0.5">
                  !
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Achtung: Hauptberuflich selbstst&auml;ndig droht
                  </p>
                  <p className="text-xs text-muted mt-1">
                    Dein Nebengewerbe-Gewinn ist gr&ouml;&szlig;er als die
                    H&auml;lfte deines Hauptjob-Einkommens. Die
                    Krankenkasse kann dich dann als hauptberuflich
                    selbstst&auml;ndig einstufen &mdash; du musst KV &amp; PV
                    selbst tragen (ca. 20&nbsp;% vom Gewinn). Pr&uuml;fe das
                    mit deiner KV, bevor du weiter wachst.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Aufschlüsselung */}
          <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              So setzt sich das zusammen (pro Jahr)
            </h3>
            <div className="divide-y divide-foreground/5">
              <Row
                label="Umsatz"
                amount={result.jahresUmsatz}
                sign="none"
              />
              <Row
                label="Betriebsausgaben"
                amount={result.jahresAusgaben}
                sign="minus"
              />
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-semibold text-foreground">
                  Gewinn
                </span>
                <span className="text-sm font-bold text-foreground tabular-nums">
                  {fmt(result.jahresGewinn)} &euro;
                </span>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-foreground mt-6 mb-3">
              Steuern auf den Gewinn
            </h3>
            <div className="divide-y divide-foreground/5">
              {gewerbesteuerFaellig ? (
                <>
                  <Row
                    label={`Gewerbesteuer (Hebesatz ${fmt0(hebesatzVal)} %)`}
                    amount={result.gewerbeSteuer}
                    sign="minus"
                  />
                  <Row
                    label="Anrechnung auf Einkommensteuer (§ 35 EStG)"
                    amount={result.gewerbeAnrechnung}
                    sign="plus"
                    muted
                  />
                </>
              ) : (
                <div className="flex items-center justify-between py-2 text-muted">
                  <span className="text-sm">
                    Gewerbesteuer (Freibetrag{" "}
                    {fmt0(GEWERBESTEUER_FREIBETRAG)} &euro;)
                  </span>
                  <span className="text-sm tabular-nums">0,00 &euro;</span>
                </div>
              )}
              <Row
                label="Einkommensteuer-Zusatzlast"
                amount={result.zusatzEstRoh}
                sign="minus"
              />
              {result.zusatzSoli > 0 && (
                <Row
                  label="Solidaritätszuschlag"
                  amount={result.zusatzSoli}
                  sign="minus"
                />
              )}
            </div>

            <div className="flex items-center justify-between border-t border-foreground/10 mt-4 pt-4">
              <span className="text-sm font-semibold text-foreground">
                Abgaben gesamt
              </span>
              <span className="text-sm font-bold text-foreground tabular-nums">
                &minus;{fmt(result.abgabenJahr)} &euro;
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-bold text-foreground">
                Netto pro Jahr
              </span>
              <span className="text-lg font-bold text-accent tabular-nums">
                {fmt(Math.max(0, result.nettoJahr))} &euro;
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
