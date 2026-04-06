"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";

const fmt = (value: number) =>
  new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(value);

const PRESETS = [
  { label: "Tagesgeld 2,5%", value: 2.5 },
  { label: "Anleihen 3,5%", value: 3.5 },
  { label: "Aktien-ETF 7%", value: 7 },
  { label: "Historisch 8%", value: 8 },
];

function berechne(einmalanlage: number, sparrate: number, rendite: number, jahre: number) {
  const monate = jahre * 12;

  if (rendite === 0) {
    const endvermoegen = einmalanlage + sparrate * monate;
    const eingezahlt = endvermoegen;
    return { endvermoegen, eingezahlt, zinsen: 0 };
  }

  const monatlicheRendite = rendite / 100 / 12;
  const endwertEinmal = einmalanlage * Math.pow(1 + monatlicheRendite, monate);
  const endwertSparrate =
    sparrate * ((Math.pow(1 + monatlicheRendite, monate) - 1) / monatlicheRendite);
  const endvermoegen = endwertEinmal + endwertSparrate;
  const eingezahlt = einmalanlage + sparrate * monate;
  const zinsen = endvermoegen - eingezahlt;

  return { endvermoegen, eingezahlt, zinsen };
}

function berechneJahr(einmalanlage: number, sparrate: number, rendite: number, jahr: number) {
  return berechne(einmalanlage, sparrate, rendite, jahr);
}

export default function SparplanRechner() {
  const [einmalanlage, setEinmalanlage] = useState("");
  const [sparrate, setSparrate] = useState("");
  const [rendite, setRendite] = useState(7);
  const [jahre, setJahre] = useState(20);
  const [copied, setCopied] = useState(false);

  const einmalanlageVal = parseFloat(einmalanlage) || 0;
  const sparrateVal = parseFloat(sparrate) || 0;
  const hasInput = sparrateVal > 0 || einmalanlageVal > 0;

  const result = useMemo(
    () => berechne(einmalanlageVal, sparrateVal, rendite, jahre),
    [einmalanlageVal, sparrateVal, rendite, jahre]
  );

  // Data points for chart (per year)
  const chartData = useMemo(() => {
    const points = [];
    for (let y = 0; y <= jahre; y++) {
      const r = berechneJahr(einmalanlageVal, sparrateVal, rendite, y);
      const deposit = berechneJahr(einmalanlageVal, sparrateVal, 0, y);
      points.push({
        year: y,
        value: r.endvermoegen,
        deposited: deposit.endvermoegen,
      });
    }
    return points;
  }, [einmalanlageVal, sparrateVal, rendite, jahre]);

  // Comparison table values
  const vergleich = useMemo(() => {
    const kopfkissen = berechne(einmalanlageVal, sparrateVal, 0, jahre);
    const tagesgeld = berechne(einmalanlageVal, sparrateVal, 2.5, jahre);
    const dein = result;
    return { kopfkissen, tagesgeld, dein };
  }, [einmalanlageVal, sparrateVal, rendite, jahre, result]);

  const handleShare = useCallback(async () => {
    const shareText = `Mein ETF-Sparplan: ${fmt(sparrateVal)}\u20AC/Monat \u00D7 ${jahre} Jahre = ${fmt(result.endvermoegen)}\u20AC (davon ${fmt(result.zinsen)}\u20AC Zinsen). Berechne deins: schwabenspart.com/rechner/etf-sparplan`;

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
  }, [sparrateVal, jahre, result]);

  // SVG chart building
  const svgW = 800;
  const svgH = 300;
  const padL = 70;
  const padR = 20;
  const padT = 20;
  const padB = 40;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const maxVal = Math.max(result.endvermoegen, 1);

  const toX = (year: number) => padL + (year / Math.max(jahre, 1)) * plotW;
  const toY = (val: number) => padT + plotH - (val / maxVal) * plotH;

  const depositPath = chartData
    .map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.year).toFixed(1)},${toY(p.deposited).toFixed(1)}`)
    .join(" ");
  const depositAreaPath = `${depositPath} L${toX(jahre).toFixed(1)},${toY(0).toFixed(1)} L${toX(0).toFixed(1)},${toY(0).toFixed(1)} Z`;

  const valuePath = chartData
    .map((p, i) => `${i === 0 ? "M" : "L"}${toX(p.year).toFixed(1)},${toY(p.value).toFixed(1)}`)
    .join(" ");
  const valueAreaPath = `${valuePath} L${toX(jahre).toFixed(1)},${toY(0).toFixed(1)} L${toX(0).toFixed(1)},${toY(0).toFixed(1)} Z`;

  // Y-axis labels (5 ticks)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => ({
    val: maxVal * f,
    y: toY(maxVal * f),
  }));

  // X-axis labels
  const xStep = jahre <= 10 ? 1 : jahre <= 25 ? 5 : 10;
  const xTicks: number[] = [];
  for (let y = 0; y <= jahre; y += xStep) xTicks.push(y);
  if (xTicks[xTicks.length - 1] !== jahre) xTicks.push(jahre);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Inputs */}
      <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 sm:p-8 space-y-6">
        {/* Einmalanlage */}
        <div>
          <label htmlFor="einmalanlage" className="block text-sm font-semibold text-foreground mb-2">
            Einmalanlage (&euro;)
          </label>
          <input
            id="einmalanlage"
            type="number"
            min="0"
            step="100"
            inputMode="decimal"
            value={einmalanlage}
            onChange={(e) => setEinmalanlage(e.target.value)}
            placeholder="z.B. 5000"
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-lg"
          />
        </div>

        {/* Monatliche Sparrate */}
        <div>
          <label htmlFor="sparrate" className="block text-sm font-semibold text-foreground mb-2">
            Monatliche Sparrate (&euro;)
          </label>
          <input
            id="sparrate"
            type="number"
            min="0"
            step="25"
            inputMode="decimal"
            value={sparrate}
            onChange={(e) => setSparrate(e.target.value)}
            placeholder="z.B. 200"
            className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground placeholder:text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent text-lg"
          />
        </div>

        {/* Rendite */}
        <div>
          <label htmlFor="rendite" className="block text-sm font-semibold text-foreground mb-2">
            Erwartete Rendite p.a. ({rendite.toFixed(1).replace(".", ",")}%)
          </label>
          <div className="flex items-center gap-4">
            <input
              id="rendite"
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={rendite}
              onChange={(e) => setRendite(parseFloat(e.target.value))}
              className="flex-1 h-2 rounded-full appearance-none bg-foreground/10 accent-[#c8a84e] cursor-pointer"
            />
            <input
              type="number"
              min="0"
              max="15"
              step="0.5"
              inputMode="decimal"
              value={rendite}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                if (!isNaN(v) && v >= 0 && v <= 15) setRendite(v);
              }}
              aria-label="Rendite in Prozent"
              className="w-20 px-3 py-2 rounded-xl border border-foreground/10 bg-background text-foreground text-center focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setRendite(p.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                  rendite === p.value
                    ? "bg-accent text-white border-accent"
                    : "bg-foreground/5 text-foreground border-foreground/10 hover:border-accent"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Anlagedauer */}
        <div>
          <label htmlFor="jahre" className="block text-sm font-semibold text-foreground mb-2">
            Anlagedauer ({jahre} {jahre === 1 ? "Jahr" : "Jahre"})
          </label>
          <div className="flex items-center gap-4">
            <input
              id="jahre"
              type="range"
              min="1"
              max="50"
              step="1"
              value={jahre}
              onChange={(e) => setJahre(parseInt(e.target.value))}
              className="flex-1 h-2 rounded-full appearance-none bg-foreground/10 accent-[#c8a84e] cursor-pointer"
            />
            <input
              type="number"
              min="1"
              max="50"
              step="1"
              inputMode="decimal"
              value={jahre}
              onChange={(e) => {
                const v = parseInt(e.target.value);
                if (!isNaN(v) && v >= 1 && v <= 50) setJahre(v);
              }}
              aria-label="Anlagedauer in Jahren"
              className="w-20 px-3 py-2 rounded-xl border border-foreground/10 bg-background text-foreground text-center focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {hasInput && (
        <>
          {/* Result cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 text-center">
              <p className="text-muted text-sm">Eingezahlt</p>
              <p className="text-2xl font-bold text-primary mt-1">{fmt(result.eingezahlt)} &euro;</p>
            </div>
            <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-6 text-center">
              <p className="text-muted text-sm">Zinserträge</p>
              <p className="text-2xl font-bold text-accent mt-1">{fmt(result.zinsen)} &euro;</p>
            </div>
            <div className="bg-card rounded-2xl shadow-sm border border-accent/30 p-6 text-center ring-2 ring-accent/20">
              <p className="text-muted text-sm">Endvermögen</p>
              <p className="text-3xl font-bold text-primary mt-1">{fmt(result.endvermoegen)} &euro;</p>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 p-4 sm:p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Vermögensentwicklung</h3>
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="w-full h-auto"
              aria-label="Diagramm der Vermögensentwicklung"
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

              {/* Value area (total with interest) */}
              <path d={valueAreaPath} fill="#c8a84e" fillOpacity="0.35" />
              {/* Deposit area */}
              <path d={depositAreaPath} fill="#1e3a5f" fillOpacity="0.25" />

              {/* Value line */}
              <path d={valuePath} fill="none" stroke="#c8a84e" strokeWidth="2.5" />
              {/* Deposit line */}
              <path d={depositPath} fill="none" stroke="#1e3a5f" strokeWidth="2" />

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
              {xTicks.map((y) => (
                <text
                  key={y}
                  x={toX(y)}
                  y={svgH - 8}
                  textAnchor="middle"
                  fontSize="11"
                  fill="currentColor"
                  fillOpacity="0.5"
                >
                  {y} J.
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
                Eingezahlt
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-accent/50" />
                Zinseszins-Effekt
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <div className="bg-card rounded-2xl shadow-sm border border-foreground/5 overflow-hidden">
            <div className="bg-primary text-white px-6 py-3">
              <h3 className="text-sm font-semibold">Vergleich: Wo landet dein Geld?</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-foreground/5">
                    <th className="text-left px-6 py-3 text-muted font-medium" />
                    <th className="text-right px-6 py-3 text-muted font-medium">Kopfkissen (0%)</th>
                    <th className="text-right px-6 py-3 text-muted font-medium">Tagesgeld (2,5%)</th>
                    <th className="text-right px-6 py-3 text-muted font-medium">
                      Dein Szenario ({rendite.toFixed(1).replace(".", ",")}%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-foreground/5">
                    <td className="px-6 py-3 font-medium text-foreground">Eingezahlt</td>
                    <td className="px-6 py-3 text-right text-foreground">
                      {fmt(vergleich.kopfkissen.eingezahlt)} &euro;
                    </td>
                    <td className="px-6 py-3 text-right text-foreground">
                      {fmt(vergleich.tagesgeld.eingezahlt)} &euro;
                    </td>
                    <td className="px-6 py-3 text-right text-foreground">
                      {fmt(vergleich.dein.eingezahlt)} &euro;
                    </td>
                  </tr>
                  <tr className="border-b border-foreground/5">
                    <td className="px-6 py-3 font-medium text-foreground">Zinsen</td>
                    <td className="px-6 py-3 text-right text-muted">0 &euro;</td>
                    <td className="px-6 py-3 text-right text-accent font-medium">
                      {fmt(vergleich.tagesgeld.zinsen)} &euro;
                    </td>
                    <td className="px-6 py-3 text-right text-accent font-medium">
                      {fmt(vergleich.dein.zinsen)} &euro;
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-bold text-foreground">Endvermögen</td>
                    <td className="px-6 py-3 text-right text-foreground font-bold">
                      {fmt(vergleich.kopfkissen.endvermoegen)} &euro;
                    </td>
                    <td className="px-6 py-3 text-right text-foreground font-bold">
                      {fmt(vergleich.tagesgeld.endvermoegen)} &euro;
                    </td>
                    <td className="px-6 py-3 text-right text-primary font-bold">
                      {fmt(vergleich.dein.endvermoegen)} &euro;
                    </td>
                  </tr>
                </tbody>
              </table>
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

          {/* Affiliate CTA */}
          <div className="bg-primary/5 rounded-2xl p-6 text-center">
            <p className="text-foreground font-medium mb-2">
              Um diesen Sparplan umzusetzen, brauchst du ein Depot.
            </p>
            <Link
              href="/deals"
              className="inline-flex items-center gap-1 text-accent font-semibold hover:text-accent/80 transition-colors"
            >
              Depot-Vergleich ansehen
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
