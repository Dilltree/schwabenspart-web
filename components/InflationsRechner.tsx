"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";

const fmt = (value: number) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value);

const fmtDez = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);

const INFLATION_RATEN: Record<number, number> = {
  1991: 3.7, 1992: 5.1, 1993: 4.4, 1994: 2.7, 1995: 1.7,
  1996: 1.4, 1997: 1.9, 1998: 0.9, 1999: 0.6, 2000: 1.4,
  2001: 2.0, 2002: 1.4, 2003: 1.0, 2004: 1.7, 2005: 1.6,
  2006: 1.6, 2007: 2.3, 2008: 2.6, 2009: 0.3, 2010: 1.1,
  2011: 2.1, 2012: 2.0, 2013: 1.5, 2014: 0.9, 2015: 0.3,
  2016: 0.5, 2017: 1.5, 2018: 1.8, 2019: 1.4, 2020: 0.5,
  2021: 3.1, 2022: 6.9, 2023: 5.9, 2024: 2.2, 2025: 2.0,
};

const START_JAHRE = Object.keys(INFLATION_RATEN)
  .map(Number)
  .sort((a, b) => a - b);

type Modus = "rueckblick" | "vorausschau";

function berechneKaufkraftVerlust(
  betrag: number,
  startJahr: number
): {
  kaufkraftHeute: number;
  benoetigtHeute: number;
  verlust: number;
  kumulierteInflation: number;
} {
  let faktor = 1;
  for (let jahr = startJahr; jahr <= 2025; jahr++) {
    faktor *= 1 + (INFLATION_RATEN[jahr] || 0.02) / 100;
  }
  const benoetigtHeute = betrag * faktor;
  const kaufkraftHeute = betrag / faktor;
  const verlust = betrag - kaufkraftHeute;
  const kumulierteInflation = (faktor - 1) * 100;
  return { kaufkraftHeute, benoetigtHeute, verlust, kumulierteInflation };
}

function berechneVorausschau(
  betrag: number,
  jahre: number,
  inflation: number
): { realerWert: number; verlust: number; verlustProzent: number } {
  const faktor = Math.pow(1 + inflation / 100, jahre);
  const realerWert = betrag / faktor;
  const verlust = betrag - realerWert;
  const verlustProzent = (verlust / betrag) * 100;
  return { realerWert, verlust, verlustProzent };
}

function getSchwabenKommentar(verlustProzent: number): string {
  if (verlustProzent > 50) {
    return "Heiligs Blechle! Mehr als die H\u00e4lfte vom Geld isch weg \u2014 nur durch Inflation! Do hilft nur: investiere statt bunkere!";
  }
  if (verlustProzent > 30) {
    return "A Drittel vom Geld \u2014 eifach weg! Ohne dass du was kauft h\u00e4ttest. Des isch dr Grund, warum der Schwabe sei Geld schaffa l\u00e4sst.";
  }
  if (verlustProzent > 10) {
    return "Jeder zehnte Euro \u2014 futsch! Ond des nur, weil\u2019s Geld rumgelega isch. Ab damit in an ETF!";
  }
  return "No net so schlimm \u2014 aber wart ab! Je l\u00e4nger du wartesch, desto mehr frisst d\u2019Inflation.";
}

export default function InflationsRechner() {
  const [modus, setModus] = useState<Modus>("rueckblick");
  const [betragInput, setBetragInput] = useState("");
  const [startJahr, setStartJahr] = useState(2010);
  const [jahreZukunft, setJahreZukunft] = useState(20);
  const [inflationRate, setInflationRate] = useState(2.0);
  const [copied, setCopied] = useState(false);

  const betragVal = parseFloat(betragInput) || 0;
  const hasInput = betragVal > 0;

  // Rueckblick result
  const rueckblickResult = useMemo(
    () => berechneKaufkraftVerlust(betragVal, startJahr),
    [betragVal, startJahr]
  );

  // Vorausschau result
  const vorausschauResult = useMemo(
    () => berechneVorausschau(betragVal, jahreZukunft, inflationRate),
    [betragVal, jahreZukunft, inflationRate]
  );

  // Comparison table for Vorausschau
  const vergleichsRaten = useMemo(() => {
    return [1.5, 2.0, 3.0, 5.0].map((rate) => {
      const r = berechneVorausschau(betragVal, jahreZukunft, rate);
      return { rate, ...r };
    });
  }, [betragVal, jahreZukunft]);

  // Chart data for Rueckblick
  const rueckblickChartData = useMemo(() => {
    if (!hasInput || modus !== "rueckblick") return [];
    const points: { year: number; kaufkraft: number }[] = [];
    let faktor = 1;
    points.push({ year: startJahr, kaufkraft: betragVal });
    for (let jahr = startJahr; jahr <= 2025; jahr++) {
      faktor *= 1 + (INFLATION_RATEN[jahr] || 0.02) / 100;
      points.push({ year: jahr + 1, kaufkraft: betragVal / faktor });
    }
    return points;
  }, [betragVal, startJahr, hasInput, modus]);

  // Chart data for Vorausschau
  const vorausschauChartData = useMemo(() => {
    if (!hasInput || modus !== "vorausschau") return [];
    const points: { year: number; kaufkraft: number }[] = [];
    for (let y = 0; y <= jahreZukunft; y++) {
      const faktor = Math.pow(1 + inflationRate / 100, y);
      points.push({ year: y, kaufkraft: betragVal / faktor });
    }
    return points;
  }, [betragVal, jahreZukunft, inflationRate, hasInput, modus]);

  const verlustProzent =
    modus === "rueckblick"
      ? hasInput
        ? (rueckblickResult.verlust / betragVal) * 100
        : 0
      : vorausschauResult.verlustProzent;

  const handleShare = useCallback(async () => {
    let shareText: string;
    if (modus === "rueckblick") {
      shareText = `${fmt(betragVal)}\u20AC von ${startJahr} sind heute nur noch ${fmt(rueckblickResult.kaufkraftHeute)}\u20AC wert. Berechne deins: schwabenspart.com/rechner/inflation`;
    } else {
      shareText = `Meine ${fmt(betragVal)}\u20AC sind in ${jahreZukunft} Jahren nur noch ${fmt(vorausschauResult.realerWert)}\u20AC wert (${fmtDez(inflationRate)}% Inflation). schwabenspart.com/rechner/inflation`;
    }

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
  }, [modus, betragVal, startJahr, jahreZukunft, inflationRate, rueckblickResult.kaufkraftHeute, vorausschauResult.realerWert]);

  // SVG chart
  const svgW = 800;
  const svgH = 250;
  const padL = 70;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const chartData = modus === "rueckblick" ? rueckblickChartData : vorausschauChartData;
  const maxVal = betragVal || 1;
  const totalSteps = chartData.length > 1 ? chartData.length - 1 : 1;

  const toX = (i: number) => padL + (i / totalSteps) * plotW;
  const toY = (val: number) => padT + plotH - (val / maxVal) * plotH;

  // Full amount line path
  const fullAmountY = toY(maxVal);

  // Kaufkraft path
  const kaufkraftPath = chartData
    .map((p, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(p.kaufkraft).toFixed(1)}`)
    .join(" ");

  // Area below kaufkraft (green/primary)
  const kaufkraftAreaPath = chartData.length > 0
    ? `${kaufkraftPath} L${toX(totalSteps).toFixed(1)},${toY(0).toFixed(1)} L${toX(0).toFixed(1)},${toY(0).toFixed(1)} Z`
    : "";

  // Area between full amount and kaufkraft (the "lost" area)
  const verlustAreaPath = chartData.length > 0
    ? `M${toX(0).toFixed(1)},${fullAmountY.toFixed(1)} ` +
      chartData.map((_, i) => `L${toX(i).toFixed(1)},${fullAmountY.toFixed(1)}`).join(" ") +
      ` L${toX(totalSteps).toFixed(1)},${fullAmountY.toFixed(1)} ` +
      chartData.map((p, i) => `L${toX(totalSteps - i).toFixed(1)},${toY(chartData[totalSteps - i].kaufkraft).toFixed(1)}`).join(" ") +
      " Z"
    : "";

  // Y-axis ticks
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
    val: maxVal * f,
    y: toY(maxVal * f),
  }));

  // X-axis labels
  const xLabels = useMemo(() => {
    if (chartData.length === 0) return [];
    if (modus === "rueckblick") {
      const years = chartData.map((p) => p.year);
      const span = years[years.length - 1] - years[0];
      const step = span <= 10 ? 1 : span <= 20 ? 2 : 5;
      const labels: { idx: number; label: string }[] = [];
      for (let i = 0; i < chartData.length; i++) {
        const yr = chartData[i].year;
        if (i === 0 || i === chartData.length - 1 || yr % step === 0) {
          labels.push({ idx: i, label: String(yr) });
        }
      }
      return labels;
    } else {
      const step = jahreZukunft <= 10 ? 1 : jahreZukunft <= 25 ? 5 : 10;
      const labels: { idx: number; label: string }[] = [];
      for (let i = 0; i < chartData.length; i++) {
        const y = chartData[i].year;
        if (y === 0 || y === jahreZukunft || y % step === 0) {
          labels.push({ idx: i, label: `${y} J.` });
        }
      }
      return labels;
    }
  }, [chartData, modus, jahreZukunft]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Mode Toggle */}
      <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8 space-y-6">
        <fieldset>
          <legend className="block text-sm font-semibold text-foreground mb-2">
            Berechnung
          </legend>
          <div
            role="radiogroup"
            aria-label="Modus w\u00e4hlen"
            className="grid grid-cols-2 gap-1 sm:gap-2"
          >
            <button
              type="button"
              role="radio"
              aria-checked={modus === "rueckblick"}
              onClick={() => setModus("rueckblick")}
              className={`py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-xl border transition-colors ${
                modus === "rueckblick"
                  ? "bg-primary text-white border-primary"
                  : "bg-foreground/5 text-foreground border-foreground/10 hover:border-primary/40"
              }`}
            >
              R&uuml;ckblick
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={modus === "vorausschau"}
              onClick={() => setModus("vorausschau")}
              className={`py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-xl border transition-colors ${
                modus === "vorausschau"
                  ? "bg-primary text-white border-primary"
                  : "bg-foreground/5 text-foreground border-foreground/10 hover:border-primary/40"
              }`}
            >
              Vorausschau
            </button>
          </div>
        </fieldset>

        {/* Betrag Input */}
        <div>
          <label htmlFor="betrag" className="block text-sm font-semibold text-foreground mb-2">
            {modus === "rueckblick" ? "Betrag (\u20AC)" : "Heutiger Betrag (\u20AC)"}
          </label>
          <input
            id="betrag"
            type="number"
            min="0"
            step="100"
            inputMode="decimal"
            value={betragInput}
            onChange={(e) => setBetragInput(e.target.value)}
            placeholder={modus === "rueckblick" ? "z.B. 1000" : "z.B. 10000"}
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-lg"
          />
        </div>

        {/* Rueckblick: Jahr Dropdown */}
        {modus === "rueckblick" && (
          <div>
            <label htmlFor="startJahr" className="block text-sm font-semibold text-foreground mb-2">
              Aus welchem Jahr?
            </label>
            <select
              id="startJahr"
              value={startJahr}
              onChange={(e) => setStartJahr(parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-lg"
            >
              {START_JAHRE.map((j) => (
                <option key={j} value={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Vorausschau: Jahre + Inflation */}
        {modus === "vorausschau" && (
          <>
            <div>
              <label htmlFor="jahreZukunft" className="block text-sm font-semibold text-foreground mb-2">
                In wie vielen Jahren? ({jahreZukunft} {jahreZukunft === 1 ? "Jahr" : "Jahre"})
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="jahreZukunft"
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={jahreZukunft}
                  onChange={(e) => setJahreZukunft(parseInt(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none bg-foreground/10 accent-[#c8a84e] cursor-pointer"
                />
                <input
                  type="number"
                  min="1"
                  max="50"
                  step="1"
                  inputMode="decimal"
                  value={jahreZukunft}
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    if (!isNaN(v) && v >= 1 && v <= 50) setJahreZukunft(v);
                  }}
                  aria-label="Jahre in die Zukunft"
                  className="w-20 px-3 py-2 rounded-xl border border-foreground/10 bg-background text-foreground text-center focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="inflationRate" className="block text-sm font-semibold text-foreground mb-2">
                Erwartete Inflation ({fmtDez(inflationRate)}%)
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="inflationRate"
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none bg-foreground/10 accent-[#c8a84e] cursor-pointer"
                />
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  inputMode="decimal"
                  value={inflationRate}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    if (!isNaN(v) && v >= 0 && v <= 10) setInflationRate(v);
                  }}
                  aria-label="Inflation in Prozent"
                  className="w-20 px-3 py-2 rounded-xl border border-foreground/10 bg-background text-foreground text-center focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Results */}
      {hasInput && (
        <>
          {/* Rueckblick Results */}
          {modus === "rueckblick" && (
            <>
              {/* Main result card */}
              <div className="bg-card rounded-2xl shadow-sm border border-accent/30 p-6 text-center ring-2 ring-accent/20">
                <p className="text-muted text-sm">
                  Deine {fmt(betragVal)}&nbsp;&euro; von {startJahr} sind heute nur noch
                </p>
                <p className="text-3xl font-bold text-primary mt-2">
                  {fmt(rueckblickResult.kaufkraftHeute)} &euro;
                </p>
                <p className="text-muted text-sm mt-1">wert</p>
              </div>

              {/* Secondary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 text-center">
                  <p className="text-muted text-sm">Du br&auml;uchtest heute</p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    {fmt(rueckblickResult.benoetigtHeute)} &euro;
                  </p>
                  <p className="text-muted text-xs mt-1">um dasselbe kaufen zu k&ouml;nnen</p>
                </div>
                <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 text-center">
                  <p className="text-muted text-sm">Kumulierte Inflation seit {startJahr}</p>
                  <p className="text-2xl font-bold text-red-600 mt-1">
                    {fmtDez(rueckblickResult.kumulierteInflation)}%
                  </p>
                  <p className="text-muted text-xs mt-1">Kaufkraftverlust</p>
                </div>
              </div>

              {/* Visual bar */}
              <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Kaufkraft von {fmt(betragVal)}&nbsp;&euro; aus {startJahr}
                </h3>
                <div className="w-full bg-foreground/5 rounded-full h-8 overflow-hidden relative">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.max(5, (rueckblickResult.kaufkraftHeute / betragVal) * 100)}%`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-3 text-xs font-semibold">
                    <span className="text-white drop-shadow">
                      {fmt(rueckblickResult.kaufkraftHeute)} &euro; Kaufkraft
                    </span>
                    <span className="text-muted">
                      {fmt(rueckblickResult.verlust)} &euro; verloren
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Vorausschau Results */}
          {modus === "vorausschau" && (
            <>
              {/* Main result card */}
              <div className="bg-card rounded-2xl shadow-sm border border-accent/30 p-6 text-center ring-2 ring-accent/20">
                <p className="text-muted text-sm">
                  Deine {fmt(betragVal)}&nbsp;&euro; sind in {jahreZukunft} Jahren nur noch
                </p>
                <p className="text-3xl font-bold text-primary mt-2">
                  {fmt(vorausschauResult.realerWert)} &euro;
                </p>
                <p className="text-muted text-sm mt-1">wert</p>
              </div>

              {/* Verlust card */}
              <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 text-center">
                <p className="text-muted text-sm">Kaufkraftverlust</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {fmt(vorausschauResult.verlust)} &euro;
                </p>
                <p className="text-muted text-xs mt-1">
                  ({fmtDez(vorausschauResult.verlustProzent)}% deines Geldes)
                </p>
              </div>

              {/* Comparison table */}
              <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 overflow-hidden">
                <div className="bg-primary text-white px-6 py-3">
                  <h3 className="text-sm font-semibold">
                    Vergleich: Kaufkraft in {jahreZukunft} Jahren
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-foreground/5">
                        <th className="text-left px-6 py-3 text-muted font-medium">
                          Inflation
                        </th>
                        <th className="text-right px-6 py-3 text-muted font-medium">
                          Wert in {jahreZukunft} Jahren
                        </th>
                        <th className="text-right px-6 py-3 text-muted font-medium">
                          Verlust
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {vergleichsRaten.map((v) => (
                        <tr
                          key={v.rate}
                          className={`border-b border-foreground/5 ${
                            v.rate === inflationRate ? "bg-accent/5" : ""
                          }`}
                        >
                          <td className="px-6 py-3 font-medium text-foreground">
                            {fmtDez(v.rate)}%
                            {v.rate === inflationRate && (
                              <span className="ml-2 text-xs text-accent font-semibold">
                                (dein Wert)
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-3 text-right text-foreground font-medium">
                            {fmt(v.realerWert)} &euro;
                          </td>
                          <td className="px-6 py-3 text-right text-red-600 font-medium">
                            {fmt(v.verlust)} &euro;
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* SVG Chart */}
          {chartData.length > 1 && (
            <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-4 sm:p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {modus === "rueckblick"
                  ? "Kaufkraftverlust seit " + startJahr
                  : "Kaufkraftverlust \u00fcber " + jahreZukunft + " Jahre"}
              </h3>
              <svg
                viewBox={`0 0 ${svgW} ${svgH}`}
                className="w-full h-auto"
                aria-label="Diagramm des Kaufkraftverlusts"
                role="img"
              >
                {/* Grid lines */}
                {yTicks.map((tick) => (
                  <line
                    key={tick.val}
                    x1={padL}
                    y1={tick.y}
                    x2={svgW - padR}
                    y2={tick.y}
                    stroke="currentColor"
                    strokeOpacity="0.07"
                    strokeWidth="1"
                  />
                ))}

                {/* Verlust area (gap between top and kaufkraft) */}
                <path d={verlustAreaPath} fill="#ef4444" fillOpacity="0.15" />

                {/* Kaufkraft area */}
                <path d={kaufkraftAreaPath} fill="#1e3a5f" fillOpacity="0.25" />

                {/* Full amount line */}
                <line
                  x1={padL}
                  y1={fullAmountY}
                  x2={toX(totalSteps)}
                  y2={fullAmountY}
                  stroke="#c8a84e"
                  strokeWidth="1.5"
                  strokeDasharray="6 3"
                />

                {/* Kaufkraft line */}
                <path d={kaufkraftPath} fill="none" stroke="#1e3a5f" strokeWidth="2.5" />

                {/* Y-axis labels */}
                {yTicks.map((tick) => (
                  <text
                    key={tick.val}
                    x={padL - 8}
                    y={tick.y + 4}
                    textAnchor="end"
                    fontSize="11"
                    fill="currentColor"
                    fillOpacity="0.5"
                  >
                    {fmt(tick.val)} &euro;
                  </text>
                ))}

                {/* X-axis labels */}
                {xLabels.map((xl) => (
                  <text
                    key={xl.idx}
                    x={toX(xl.idx)}
                    y={svgH - 8}
                    textAnchor="middle"
                    fontSize="11"
                    fill="currentColor"
                    fillOpacity="0.5"
                  >
                    {xl.label}
                  </text>
                ))}

                {/* Axes */}
                <line
                  x1={padL}
                  y1={padT}
                  x2={padL}
                  y2={padT + plotH}
                  stroke="currentColor"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                />
                <line
                  x1={padL}
                  y1={padT + plotH}
                  x2={svgW - padR}
                  y2={padT + plotH}
                  stroke="currentColor"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                />
              </svg>
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-3 text-xs text-muted">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-primary/40" />
                  Kaufkraft
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-sm bg-red-400/30" />
                  Verlust durch Inflation
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-1 bg-accent" style={{ borderTop: "1.5px dashed #c8a84e" }} />
                  Urspr&uuml;nglicher Betrag
                </div>
              </div>
            </div>
          )}

          {/* Dynamic Schwaben Kommentar */}
          <aside className="bg-primary/5 border-l-4 border-accent rounded-r-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
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
                  className="text-primary"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-primary mb-1">Was der Schwabe dazu sagt:</p>
                <p className="text-muted text-sm leading-relaxed italic">
                  &ldquo;{getSchwabenKommentar(verlustProzent)}&rdquo;
                </p>
              </div>
            </div>
          </aside>

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

          {/* CTA */}
          <div className="bg-primary/5 rounded-2xl p-6 text-center">
            <p className="text-foreground font-medium mb-2">
              Inflation frisst dein Erspartes? Ein ETF-Sparplan kann helfen.
            </p>
            <Link
              href="/rechner/etf-sparplan"
              className="inline-flex items-center gap-1 text-accent font-semibold hover:text-accent/80 transition-colors"
            >
              ETF-Sparplan Rechner
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
