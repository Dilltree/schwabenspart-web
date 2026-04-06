"use client";

import SchwabenKommentar from "./SchwabenKommentar";

type RechnerTyp = "budget" | "etf" | "leasing" | "brutto-netto";

interface Props {
  typ: RechnerTyp;
  wert: number; // The key metric to judge
}

export default function DynamischerSchwabenKommentar({ typ, wert }: Props) {
  const kommentar = getKommentar(typ, wert);
  return <SchwabenKommentar text={kommentar} />;
}

function getKommentar(typ: RechnerTyp, wert: number): string {
  switch (typ) {
    case "etf":
      // wert = Zinserträge / Eingezahlt (Zinseszins-Ratio)
      if (wert > 1.5) return "Heiligs Blechle! Deis Geld schafft ja mehr als du! Der Zinseszins isch dr beste Freund vom Schwabe.";
      if (wert > 0.8) return "Des sieht scho ganz ordentlich aus! Weiter so — a Schwabe denkt langfristig.";
      if (wert > 0.3) return "Guad angfanga! Gib dem Zinseszins no a bissle Zeit, dann wirds richtig schee.";
      return "Jeder Euro zählt! A Schwabe fängt klei a und denkt groß.";

    case "leasing":
      // wert = Ersparnis in Euro (positiv = Leasing lohnt sich)
      if (wert > 500) return "Des hätt dr Sparfuchs net besser macha kenna! Leasing lohnt sich hier eindeutig.";
      if (wert > 100) return "A bissle isch au a bissle. Jeder Euro zählt, sagt dr Schwabe.";
      if (wert > 0) return "Hmm, knapp. Überleg dir gut, ob sich die Bindung lohnt.";
      return "Do isch Barkaufa gscheiter. Cash isch King, sagt dr Schwabe.";

    case "brutto-netto":
      // wert = Netto/Brutto Verhältnis (0-1)
      if (wert > 0.7) return "Ha! Des isch ja fascht wie Schwarzarbeit — aber legal!";
      if (wert > 0.6) return "Ganz ordentlich. Vom Rest kasch no a Maultasch kaufa.";
      if (wert > 0.5) return "Ui ui ui, do holt sich dr Staat aber a schönes Stück. Aber hey — dafür hasch an Radweg.";
      return "Herrschaftszeiten! Do bleibt ja kaum gnug für d'Brezel übrig!";

    case "budget":
      // wert = Sparquote in Prozent
      if (wert >= 30) return "30% spare?! Du bisch a waschechter Schwabe! Des isch vorbildlich.";
      if (wert >= 20) return "20% isch die goldene Regel. Du machsch des richtig!";
      if (wert >= 10) return "10% isch a Anfang. A echter Schwabe schafft aber mehr!";
      return "Ui, do musch no a bissle übe. Aber jeder fängt mal klei a!";

    default:
      return "Wer rechnet, der spart. Ond wer spart, der hot.";
  }
}
