import type { Metadata } from "next";
import Image from "next/image";
import SchwabenSiegel from "@/components/SchwabenSiegel";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Die Geschichte hinter schwabenspart — warum ein Schwabe die besten Spartipps gibt.",
};

export default function UeberUnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-12">
        <Image
          src="/logos/logo.png"
          alt="Der Schwabe"
          width={120}
          height={120}
          className="mx-auto rounded-3xl shadow-lg mb-6"
        />
        <h1 className="text-3xl font-bold text-foreground">Über schwabenspart</h1>
        <p className="text-muted mt-3 text-lg">
          Alte schwäbische Sparmentalität trifft moderne Finanztipps.
        </p>
      </div>

      <div className="space-y-6 text-muted leading-relaxed">
        <p>
          <strong className="text-foreground">Die Idee ist einfach:</strong> Unsere Großeltern wussten,
          wie man spart — ohne Apps, ohne ETFs, ohne Finanz-Influencer. Sie haben einfach nicht mehr
          ausgegeben, als reinkam. Und genau diese Mentalität verbinden wir mit modernen Finanztools.
        </p>

        <p>
          Bei <strong className="text-foreground">schwabenspart</strong> findest du keine
          komplizierten Trading-Strategien oder Krypto-Hypes. Stattdessen: ehrliche Spartipps,
          transparent verglichene Finanzprodukte und eine App, die dir hilft, dein Geld im Griff zu behalten.
        </p>

        <p>
          Jede Empfehlung durchläuft unsere <strong className="text-foreground">Schwaben-Prüfung</strong> —
          denn was ein Schwabe nicht empfehlen würde, kommt auch nicht auf die Seite.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 py-8">
          <div className="flex-1 bg-card rounded-2xl p-6 border border-black/5 text-center">
            <SchwabenSiegel stufe="gold" size={56} />
            <p className="text-sm mt-3 text-foreground font-semibold">Top-Empfehlung</p>
            <p className="text-xs text-muted mt-1">Überzeugt auf ganzer Linie</p>
          </div>
          <div className="flex-1 bg-card rounded-2xl p-6 border border-black/5 text-center">
            <SchwabenSiegel stufe="silber" size={56} />
            <p className="text-sm mt-3 text-foreground font-semibold">Empfohlen</p>
            <p className="text-xs text-muted mt-1">Solides Produkt mit gutem Preis-Leistungs-Verhältnis</p>
          </div>
          <div className="flex-1 bg-card rounded-2xl p-6 border border-black/5 text-center">
            <SchwabenSiegel stufe="bronze" size={56} />
            <p className="text-sm mt-3 text-foreground font-semibold">Geprüft</p>
            <p className="text-xs text-muted mt-1">Okay, aber es gibt bessere Alternativen</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-foreground pt-4">Die Schwabe-App</h2>
        <p>
          Neben der Website gibt es auch <strong className="text-foreground">die Schwabe-App</strong> —
          dein offline Haushaltsbuch für Android. Tracke Einnahmen &amp; Ausgaben, setze Sparziele
          und vergleiche dich anonym mit ähnlichen Haushalten (Destatis EVS 2023). Lokal
          verschlüsselt, ohne Bank-Anbindung, ohne Cloud, <strong className="text-foreground">ohne KI</strong>.
        </p>
        <p className="mt-3">
          <strong className="text-foreground">Pro für 1 €.</strong> Einmalig. Lebenslang. Andere
          Spar-Apps nehmen 4,99 € pro Monat — ein Schwabe zahlt für seine Sparhilfe nicht mehr.
          Werbefrei garantiert auf Lebenszeit. Kein Abo, keine Folgekosten, keine Falle.
        </p>
      </div>
    </div>
  );
}
