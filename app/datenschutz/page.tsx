import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von schwabenspart und der Schwabe Finanz-App (Dilltree Apps).",
};

export default function DatenschutzPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Datenschutzerklärung</h1>

      {/* 1. Verantwortlicher */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">1. Verantwortlicher</h2>
        <p className="text-muted leading-relaxed">
          Verantwortlich für die Datenverarbeitung auf dieser Website und in der App „Der Schwabe" ist:
        </p>
        <p className="text-muted leading-relaxed mt-2">
          Daniel Dillbaum<br />
          Dilltree Apps<br />
          An den Weihern 45<br />
          51467 Bergisch Gladbach<br />
          Deutschland<br />
          E-Mail: <a href="mailto:schwabenspart@googlemail.com" className="text-primary hover:underline">schwabenspart@googlemail.com</a>
        </p>
      </section>

      {/* 2. Lokale Datenspeicherung */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">2. Lokale Datenspeicherung (App)</h2>
        <p className="text-muted leading-relaxed">
          Die App speichert alle von Ihnen eingegebenen Daten ausschließlich lokal auf Ihrem Gerät:
          Transaktionen, Budgets, Kategorien, Portfolio-Positionen sowie Einstellungen. Diese Daten
          verlassen Ihr Gerät nicht, sofern Sie keine der optionalen Funktionen nutzen, die eine
          Serververbindung erfordern (siehe Abschnitte 4–6).
        </p>
        <p className="text-muted leading-relaxed mt-3">
          <strong className="text-foreground">Verschlüsselung:</strong> Ihre Finanzdaten werden mit
          AES-256 verschlüsselt im lokalen Gerätespeicher abgelegt. Der Verschlüsselungsschlüssel
          wird im sicheren Systemspeicher (Secure Enclave / Keystore) verwaltet und verlässt das
          Gerät nicht.
        </p>
        <p className="text-muted leading-relaxed mt-2 text-sm">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung / Nutzung der App).
        </p>
      </section>

      {/* 3. Biometrische Sperre */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">3. Biometrische Sperre</h2>
        <p className="text-muted leading-relaxed">
          Die optionale biometrische Entsperrung (Fingerabdruck / Gesichtserkennung) wird
          ausschließlich über die Betriebssystem-API des Geräts (Android BiometricPrompt) abgewickelt.
          Dilltree Apps erhält, verarbeitet oder speichert keine biometrischen Daten.
        </p>
      </section>

      {/* 4. KI-Spartipps & Beratung */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">4. KI-Spartipps & Finanzberatung</h2>
        <p className="text-muted leading-relaxed">
          Wenn Sie die KI-Sparanalyse oder die persönliche Beratung in der App nutzen, werden
          aggregierte Transaktions- und Budgetdaten des ausgewählten Monats (Beträge, Kategorien,
          Datum) an einen Zwischendienst (Supabase Edge Function, EU-Server Frankfurt/Stockholm)
          und von dort an die Anthropic API (Anthropic, Inc., USA) übermittelt.
        </p>
        <p className="text-muted leading-relaxed mt-3">
          Es werden keine direkt identifizierenden Daten (Name, E-Mail, Geräte-ID) übermittelt.
          Die Übertragung erfolgt ausschließlich auf Ihre aktive Anfrage.
        </p>
        <p className="text-muted leading-relaxed mt-3">
          <strong className="text-foreground">Hinweis USA-Transfer:</strong> Anthropic, Inc. ist in
          den USA ansässig. Die Übermittlung erfolgt auf Grundlage eines abgeschlossenen
          Datenverarbeitungs-Zusatzes (DPA) mit Standardvertragsklauseln der EU-Kommission
          (Art. 46 Abs. 2 lit. c DSGVO i.V.m. Durchführungsbeschluss 2021/914, Modul 2). Anthropic
          nutzt die übermittelten Eingaben nicht für Modelltraining (API-Setting „Do not use my
          data for training" aktiviert). Datenschutzrichtlinie von Anthropic:
          <a href="https://www.anthropic.com/privacy" className="text-primary hover:underline ml-1" target="_blank" rel="noopener">anthropic.com/privacy</a>.
        </p>
        <p className="text-muted leading-relaxed mt-2 text-sm">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch aktive Nutzung der Funktion).
          Die KI-generierten Inhalte stellen keine Finanz-, Steuer- oder Rechtsberatung dar.
        </p>
      </section>

      {/* 5. Kassenbon-Scanner */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">5. Kassenbon-Scanner</h2>
        <p className="text-muted leading-relaxed">
          Wenn Sie den Kassenbon-Scanner nutzen, wird das aufgenommene Bild (als Base64-kodierter
          Datenstrom über TLS) über Supabase (EU-Server Frankfurt) an die Anthropic API (USA) zur
          automatischen Texterkennung übermittelt. Kassenbons können personenbezogene Angaben
          Dritter enthalten (z. B. Kassierer-Namen, personalisierte Kundennamen auf Lieferquittungen).
          Der KI-Dienst wird durch unseren System-Prompt ausdrücklich angewiesen, Personennamen und
          identifizierende Merkmale auf Bons nicht zu erfassen und ausschließlich Beträge,
          Produktbezeichnungen und Gesamtsumme zu extrahieren.
        </p>
        <p className="text-muted leading-relaxed mt-3">
          Das Bild wird nach der Verarbeitung weder auf unseren Servern noch bei Anthropic dauerhaft
          gespeichert. Anthropic hat sich vertraglich verpflichtet, übermittelte Inhalte nicht für
          Modelltraining zu verwenden (DPA mit Anthropic Inc., Art. 28 DSGVO i.V.m. SCCs nach
          Modul 2). Alternativ können Sie Transaktionen jederzeit manuell eingeben, ohne dass Daten
          das Gerät verlassen.
        </p>
        <p className="text-muted leading-relaxed mt-3">
          <strong className="text-foreground">Hinweis USA-Transfer:</strong> Gilt entsprechend
          Abschnitt 4 (Standardvertragsklauseln, Anthropic DPA).
        </p>
        <p className="text-muted leading-relaxed mt-2 text-sm">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (aktive Einwilligung durch Nutzung des Scanners).
        </p>
      </section>

      {/* 6. Börsenkurse & Portfolio-Tracking */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">6. Börsenkurse & Portfolio-Tracking</h2>
        <p className="text-muted leading-relaxed">
          Zum Abruf aktueller Börsenkurse werden von Ihnen eingegebene Ticker-Symbole (z. B. „AAPL",
          „SAP.DE") über Supabase an die Yahoo Finance API übermittelt. Es werden keine Mengen,
          Kaufpreise oder andere personenbezogene Depot-Informationen übertragen — nur die generischen
          Kürzel der Wertpapiere.
        </p>
        <p className="text-muted leading-relaxed mt-3">
          Die Kurszuordnung zum Depot erfolgt ausschließlich lokal auf Ihrem Gerät.
        </p>
        <p className="text-muted leading-relaxed mt-2 text-sm">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung / Bereitstellung der Funktion).
        </p>
      </section>

      {/* 7. Supabase */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">7. Technischer Dienst: Supabase</h2>
        <p className="text-muted leading-relaxed">
          Als technischen Zwischendienst für KI-Anfragen nutzen wir Supabase (Supabase Inc., USA /
          EU-Server Stockholm und Frankfurt). Supabase verarbeitet Anfragen als Auftragsverarbeiter
          gemäß Art. 28 DSGVO. Ein Auftragsverarbeitungsvertrag (AVV) wurde abgeschlossen.
          Weitere Informationen: <a href="https://supabase.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener">supabase.com/privacy</a>.
        </p>
      </section>

      {/* 8. Push-Benachrichtigungen */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">8. Push-Benachrichtigungen</h2>
        <p className="text-muted leading-relaxed">
          Push-Benachrichtigungen werden nur gesendet, wenn Sie diese ausdrücklich aktivieren.
          Sie können die Berechtigung jederzeit in den Geräteeinstellungen oder in den
          App-Einstellungen widerrufen. Es werden keine Inhalte Ihrer Finanzdaten in
          Benachrichtigungen übermittelt.
        </p>
        <p className="text-muted leading-relaxed mt-2 text-sm">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
        </p>
      </section>

      {/* 9. Website */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">9. Diese Website (schwabenspart.com)</h2>
        <p className="text-muted leading-relaxed">
          Auf dieser Website werden keine Tracking-Cookies gesetzt. Affiliate-Links führen zu
          Drittanbieter-Seiten mit eigenen Datenschutzrichtlinien. Der Hosting-Anbieter (Vercel
          Inc., USA) speichert serverseitig technische Zugriffslogs (IP-Adresse, User-Agent,
          Zeitstempel) für bis zu 30 Tage. Diese Daten werden vom Anbieter nicht ausgewertet und
          nicht weiterverarbeitet. Die Auslieferung erfolgt aus der Region Frankfurt
          (<code className="text-foreground">fra1</code>). Details:
          <a href="https://vercel.com/legal/privacy-policy" className="text-primary hover:underline ml-1" target="_blank" rel="noopener">vercel.com/legal/privacy-policy</a>.
          Ein Datenverarbeitungs-Zusatz (DPA) mit Vercel besteht über die Vercel-Plattform-Nutzung.
        </p>
        <p className="text-muted leading-relaxed mt-3">
          <strong className="text-foreground">Newsletter-Anmeldung:</strong> Wenn Sie sich für den
          Newsletter eintragen, wird Ihre E-Mail-Adresse aktuell ausschließlich für den
          Newsletter-Versand verwendet. Wir loggen serverseitig nur die Domain Ihrer E-Mail-Adresse
          (z. B. „example.de") und einen Zeitstempel der Anmeldung — niemals die vollständige Adresse
          im Klartext. Sobald ein Mailing-Provider mit Auftragsverarbeitungsvertrag (z. B. Resend,
          Mailchimp) angebunden ist, ergänzen wir diese Datenschutzerklärung entsprechend.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
        </p>
        <p className="text-muted leading-relaxed mt-3">
          <strong className="text-foreground">Reichweiten-Analyse mit Umami:</strong> Zur Messung
          der Zugriffszahlen setzen wir Umami Cloud (Umami Software, Inc., USA) ein. Umami ist
          cookielos und speichert keine IP-Adressen dauerhaft. IP-Adressen werden serverseitig
          ausschließlich zur Erstellung eines pseudonymen Tagessessions-Hashes verwendet und nicht
          gespeichert. Erfasst werden ausschließlich pseudonyme, aggregierte Metriken: besuchte
          Seiten, Verweildauer, anonymisierte Herkunfts-Domain, verwendeter Browser- und Gerätetyp.
          Das Tracking-Skript wird über unsere eigene Domain ausgeliefert
          (<code className="text-foreground">/stats/script.js</code>), sodass keine direkte
          Verbindung Ihres Browsers zu Umami-Servern entsteht. Eine interne Transfer-Risiko-Analyse
          (TIA) für die Übermittlung an US-Server liegt vor und kommt zum Ergebnis, dass aufgrund
          der Pseudonymisierung und des fehlenden Personenbezugs der pseudonymen Metriken kein
          erhöhtes Drittland-Risiko besteht.
        </p>
        <p className="text-muted leading-relaxed mt-3 text-sm">
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer
          datensparsamen Reichweitenmessung). Eine Einwilligungspflicht nach § 25 TTDSG besteht
          nicht, weil keine Informationen aus der Endeinrichtung des Nutzers ausgelesen oder
          gespeichert werden (kein Cookie, kein Local Storage). Details &amp; Datenschutz von
          Umami:{" "}
          <a href="https://umami.is/privacy" className="text-primary hover:underline" target="_blank" rel="noopener">
            umami.is/privacy
          </a>
          . Sie können das Tracking jederzeit über einen Ad-/Tracking-Blocker oder die
          &bdquo;Do Not Track&ldquo;-Einstellung Ihres Browsers unterbinden.
        </p>
      </section>

      {/* 10. Ihre Rechte */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">10. Ihre Rechte (Art. 15–22 DSGVO)</h2>
        <ul className="space-y-2 text-muted">
          <li className="flex gap-2">
            <span className="text-accent font-bold mt-0.5">&#8226;</span>
            <span><strong className="text-foreground">Auskunft (Art. 15):</strong> Alle App-Daten sind direkt in der App einsehbar.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold mt-0.5">&#8226;</span>
            <span><strong className="text-foreground">Berichtigung (Art. 16):</strong> Daten können jederzeit in der App bearbeitet werden.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold mt-0.5">&#8226;</span>
            <span><strong className="text-foreground">Löschung (Art. 17):</strong> Über Einstellungen → Datenschutz → „Alle Daten löschen" werden sämtliche lokalen Daten unwiderruflich entfernt.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold mt-0.5">&#8226;</span>
            <span><strong className="text-foreground">Einschränkung (Art. 18):</strong> Optionale Funktionen (KI, Scanner) können jederzeit deaktiviert werden.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold mt-0.5">&#8226;</span>
            <span><strong className="text-foreground">Datenübertragbarkeit (Art. 20):</strong> Ihre Daten verbleiben lokal auf Ihrem Gerät.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold mt-0.5">&#8226;</span>
            <span><strong className="text-foreground">Widerspruch (Art. 21):</strong> Nutzung optionaler Dienste kann jederzeit eingestellt werden.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold mt-0.5">&#8226;</span>
            <span><strong className="text-foreground">Einwilligungswiderruf:</strong> Erteilte Einwilligungen (KI, Scanner, Notifications) können jederzeit in den App-Einstellungen widerrufen werden.</span>
          </li>
        </ul>
      </section>

      {/* 11. Beschwerderecht */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">11. Beschwerderecht</h2>
        <p className="text-muted leading-relaxed">
          Sie haben das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren.
          Zuständig ist die Landesbeauftragte für Datenschutz und Informationsfreiheit
          Nordrhein-Westfalen (LfDI NRW):{" "}
          <a href="https://www.ldi.nrw.de" className="text-primary hover:underline" target="_blank" rel="noopener">ldi.nrw.de</a>
        </p>
      </section>

      {/* 12. Kontakt */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">12. Kontakt & Datenschutzanfragen</h2>
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
