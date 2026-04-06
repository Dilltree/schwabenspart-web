import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von schwabenspart und der Schwabe-App.",
};

export default function DatenschutzPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Datenschutzerklärung</h1>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">1. Verantwortlicher</h2>
        <p className="text-muted leading-relaxed">
          Verantwortlich für die Datenverarbeitung auf dieser Website und in der App ist der Entwickler.
          Kontaktdaten entnehmen Sie bitte dem <a href="/impressum" className="text-primary hover:underline">Impressum</a>.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">2. Welche Daten werden gespeichert?</h2>
        <p className="text-muted leading-relaxed">
          Die App speichert ausschließlich Daten, die Sie selbst eingeben: Transaktionen (Betrag, Kategorie,
          Datum, Notiz), Budgets, Kategorien sowie ein optionales Sparziel.
        </p>
        <p className="text-muted leading-relaxed mt-3">
          Alle Daten werden <strong className="text-foreground">ausschließlich lokal auf Ihrem Gerät</strong> gespeichert.
          Es findet keine Übertragung an externe Server statt, mit Ausnahme der KI-Funktion (siehe Punkt 4).
        </p>
        <p className="text-muted leading-relaxed mt-3">
          Auf der Website werden keine personenbezogenen Daten erhoben. Es werden keine Cookies gesetzt.
          Affiliate-Links führen zu Drittanbieter-Seiten mit eigenen Datenschutzrichtlinien.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">3. Verschlüsselung (App)</h2>
        <p className="text-muted leading-relaxed">
          Ihre Finanzdaten werden verschlüsselt im lokalen Gerätespeicher abgelegt. Der Verschlüsselungsschlüssel
          wird im sicheren Systemspeicher des Geräts (Secure Store) verwaltet und verlässt das Gerät nicht.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">4. KI-Funktion (Spartipps & Beratung)</h2>
        <p className="text-muted leading-relaxed">
          Wenn Sie die KI-Funktion in der App nutzen, werden Ihre Transaktions- und Budgetdaten des gewählten Monats
          an die Anthropic API übermittelt, um eine personalisierte Analyse zu erstellen. Diese Übertragung
          erfolgt ausschließlich auf Ihre aktive Anfrage hin.
        </p>
        <p className="text-muted leading-relaxed mt-3">
          Anthropic verarbeitet die Anfragen gemäß ihrer eigenen{" "}
          <a href="https://www.anthropic.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener">
            Datenschutzrichtlinie
          </a>.
          Es werden keine personenbezogenen Daten wie Name oder E-Mail übermittelt.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">5. Ihre Rechte (DSGVO)</h2>
        <p className="text-muted leading-relaxed mb-3">
          Da alle App-Daten lokal auf Ihrem Gerät gespeichert sind, haben Sie jederzeit vollständige Kontrolle:
        </p>
        <ul className="space-y-2 text-muted">
          <li className="flex gap-2">
            <span className="text-accent font-bold mt-0.5">&#8226;</span>
            <span><strong className="text-foreground">Recht auf Auskunft:</strong> Alle Daten sind direkt in der App einsehbar.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold mt-0.5">&#8226;</span>
            <span><strong className="text-foreground">Recht auf Löschung (Art. 17 DSGVO):</strong> Über Einstellungen &rarr; Datenschutz &rarr; &bdquo;Alle Daten löschen&ldquo; können Sie sämtliche gespeicherten Daten unwiderruflich entfernen.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold mt-0.5">&#8226;</span>
            <span><strong className="text-foreground">Recht auf Datenübertragbarkeit:</strong> Ihre Daten verbleiben auf Ihrem Gerät und können darüber verwaltet werden.</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">6. Kontakt</h2>
        <p className="text-muted leading-relaxed">
          Bei Fragen zum Datenschutz wenden Sie sich bitte an:{" "}
          <a href="mailto:schwabenspart@googlemail.com" className="text-primary hover:underline">
            schwabenspart@googlemail.com
          </a>
        </p>
      </section>

      <p className="text-muted/50 text-sm text-center pt-4 border-t border-black/5">
        Stand: April 2026
      </p>
    </div>
  );
}
