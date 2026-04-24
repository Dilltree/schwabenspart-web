/**
 * Lohnsteuer-Berechnung fuer Brutto-Netto sowie alle abgeleiteten Rechner
 * (z.B. Teilzeit). Zentralisiert die Steuer-/SV-Logik damit Aenderungen
 * an einer Stelle wirken.
 *
 * Genutzt von:
 *   - components/BruttoNettoRechner.tsx  (/rechner/brutto-netto)
 *   - components/TeilzeitRechner.tsx     (/rechner/teilzeit)
 *
 * Datengrundlage 2026: STEUER_2026 in lib/steuer-konstanten.ts.
 *
 * Hinweis: Vereinfachter progressiver Tarif gemaess STEUER_2026 — keine
 * amtliche Lohnsteuer-Tabelle. Liefert Naeherungswerte, keine
 * Steuerberatung (StBerG).
 */

import { STEUER_2026 } from "./steuer-konstanten";

export const BUNDESLAENDER = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
] as const;

export type Bundesland = typeof BUNDESLAENDER[number];

/** Bundeslaender mit 8% Kirchensteuer-Satz statt der ueblichen 9%. */
export const KIRCHE_8_PROZENT: ReadonlyArray<string> = [
  "Baden-Württemberg",
  "Bayern",
];

export const STEUERKLASSEN = [1, 2, 3, 4, 5, 6] as const;
export type Steuerklasse = typeof STEUERKLASSEN[number];

export interface BerechneNettoParams {
  /** Brutto-Monatsgehalt in Euro */
  brutto: number;
  steuerklasse: number;
  bundesland: string;
  kirchensteuer: boolean;
  /** Anzahl Kinderfreibetraege (0, 0.5, 1, 1.5, ...) */
  kinder: number;
  kvArt: "gesetzlich" | "privat";
  /** KV-Zusatzbeitrag in % (z.B. 1.25) */
  kvZusatz: number;
}

export interface NettoErgebnis {
  brutto: number;
  netto: number;
  lohnsteuer: number;
  soli: number;
  kirchensteuer: number;
  kv: number;
  rv: number;
  av: number;
  pv: number;
  svGesamt: number;
  steuernGesamt: number;
  abzuegeGesamt: number;
}

export function berechneNetto(params: BerechneNettoParams): NettoErgebnis {
  const {
    brutto,
    steuerklasse,
    bundesland,
    kirchensteuer,
    kinder,
    kvArt,
    kvZusatz,
  } = params;
  const jahresBrutto = brutto * 12;

  // 1. Sozialversicherung (monatlich, AN-Anteil)
  const kvSatz =
    kvArt === "gesetzlich" ? STEUER_2026.kv.satz + kvZusatz / 100 : 0;
  const kvBeitrag = Math.min(brutto, STEUER_2026.kv.bbg / 12) * kvSatz;
  const rvBeitrag =
    Math.min(brutto, STEUER_2026.rv.bbg / 12) * STEUER_2026.rv.satz;
  const avBeitrag =
    Math.min(brutto, STEUER_2026.av.bbg / 12) * STEUER_2026.av.satz;
  const pvSatz =
    STEUER_2026.pv.satz +
    (kinder === 0 ? STEUER_2026.pv.zuschlagKinderlos : 0);
  const pvBeitrag = Math.min(brutto, STEUER_2026.pv.bbg / 12) * pvSatz;

  // 2. Lohnsteuer (vereinfacht progressiv)
  const werbungskosten = STEUER_2026.werbungskostenPauschale;
  const sonderausgaben = STEUER_2026.sonderausgabenPauschale;
  let zuVersteuern = jahresBrutto - werbungskosten - sonderausgaben;

  const grundfreibetrag: Record<number, number> = {
    1: STEUER_2026.grundfreibetrag,
    2: STEUER_2026.grundfreibetrag + 4260,
    3: STEUER_2026.grundfreibetrag * 2,
    4: STEUER_2026.grundfreibetrag,
    5: 0,
    6: 0,
  };

  zuVersteuern = Math.max(
    0,
    zuVersteuern -
      (grundfreibetrag[steuerklasse] ?? STEUER_2026.grundfreibetrag),
  );

  // Progressiver Steuertarif (2026 Zonen, vereinfacht)
  let jahresSteuer = 0;
  const grenze1 = STEUER_2026.spitzenGrenze - STEUER_2026.grundfreibetrag;
  const grenze2 = STEUER_2026.reichenGrenze - STEUER_2026.grundfreibetrag;

  if (zuVersteuern <= 0) {
    jahresSteuer = 0;
  } else if (zuVersteuern <= grenze1) {
    jahresSteuer = zuVersteuern * 0.28;
  } else if (zuVersteuern <= grenze2) {
    jahresSteuer = grenze1 * 0.28 + (zuVersteuern - grenze1) * 0.42;
  } else {
    jahresSteuer =
      grenze1 * 0.28 +
      (grenze2 - grenze1) * 0.42 +
      (zuVersteuern - grenze2) * 0.45;
  }

  const monatsSteuer = jahresSteuer / 12;

  // 3. Solidaritaetszuschlag
  const soli =
    jahresSteuer > STEUER_2026.solidaritaetFreigrenze
      ? monatsSteuer * STEUER_2026.solidaritaetSatz
      : 0;

  // 4. Kirchensteuer
  const kircheSatz = KIRCHE_8_PROZENT.includes(bundesland) ? 0.08 : 0.09;
  const kirche = kirchensteuer ? monatsSteuer * kircheSatz : 0;

  const netto =
    brutto -
    kvBeitrag -
    rvBeitrag -
    avBeitrag -
    pvBeitrag -
    monatsSteuer -
    soli -
    kirche;

  return {
    brutto,
    netto: Math.max(0, netto),
    lohnsteuer: monatsSteuer,
    soli,
    kirchensteuer: kirche,
    kv: kvBeitrag,
    rv: rvBeitrag,
    av: avBeitrag,
    pv: pvBeitrag,
    svGesamt: kvBeitrag + rvBeitrag + avBeitrag + pvBeitrag,
    steuernGesamt: monatsSteuer + soli + kirche,
    abzuegeGesamt:
      kvBeitrag +
      rvBeitrag +
      avBeitrag +
      pvBeitrag +
      monatsSteuer +
      soli +
      kirche,
  };
}
