import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB & Widerruf",
  description:
    "Allgemeine Geschäftsbedingungen und Widerrufsbelehrung für die App Der Schwabe und die Pro-Lifetime-Lizenz.",
};

export default function AgbPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Allgemeine Geschäftsbedingungen</h1>
        <p className="text-muted text-sm">Stand: April 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">§ 1 Anbieter &amp; Geltungsbereich</h2>
        <p className="text-muted leading-relaxed">
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung der App „Der Schwabe"
          und für den einmaligen Erwerb des Funktionspakets „Schwabe Pro" (Lifetime-Lizenz) über die
          App-Stores. Anbieter ist Daniel Dillbaum, Dilltree Apps, An den Weihern 45, 51467
          Bergisch Gladbach (nachfolgend „Anbieter"). Gegenüber Verbrauchern im Sinne des § 13 BGB
          gelten diese AGB in ihrer zum Zeitpunkt des Vertragsabschlusses gültigen Fassung.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">§ 2 Vertragsgegenstand</h2>
        <p className="text-muted leading-relaxed">
          Die App stellt Werkzeuge zur Verwaltung persönlicher Finanzen, Haushaltsbuch,
          Portfolio-Dokumentation sowie KI-gestützte Informationsangebote bereit. Die Basisfunktionen
          sind kostenlos. Die Pro-Funktionen werden gegen einmalige Zahlung dauerhaft freigeschaltet.
          Die Inhalte sind rein informativer Natur und stellen ausdrücklich keine Anlageberatung,
          Steuerberatung oder Rechtsberatung dar (siehe Impressum „Keine Anlageberatung /
          Finanzanlagenvermittlung").
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">§ 3 Vertragsschluss &amp; Preis (Lifetime-Lizenz)</h2>
        <p className="text-muted leading-relaxed">
          Die Pro-Funktionen werden als <strong>einmalige Zahlung</strong> angeboten. Der aktuelle
          Preis beträgt <strong>8,99 € (inklusive gesetzlicher Umsatzsteuer)</strong>. Der Vertrag
          kommt zustande, sobald der Nutzer den Kauf über den jeweiligen App-Store
          (Google Play / Apple App Store) bestätigt. Abrechnung und Zahlungsabwicklung erfolgen
          ausschließlich über den App-Store — der Anbieter erhält keine Zahlungsdaten.
        </p>
        <p className="text-muted leading-relaxed">
          Mit dem einmaligen Erwerb erhält der Nutzer eine unbefristete Lizenz zur Nutzung der zum
          Kaufzeitpunkt freigeschalteten Pro-Funktionen. Der Anbieter behält sich vor, den
          Funktionsumfang weiterzuentwickeln, solange der vertraglich geschuldete Kernnutzen
          erhalten bleibt. Im Pro-Paket enthalten ist ein Kontingent von 10 Bon-Scans pro Monat
          („dauerhaft inklusive"). Darüber hinausgehende Scans können — falls verfügbar — gegen
          gesonderte Vergütung freigeschaltet werden; die jeweils aktuellen Konditionen werden in
          der App vor dem Kauf transparent angezeigt.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">§ 4 Laufzeit &amp; Kündigung</h2>
        <p className="text-muted leading-relaxed">
          Die Lifetime-Lizenz begründet kein laufendes Vertragsverhältnis mit Kündigungsrecht. Eine
          gesonderte Kündigung ist nicht erforderlich. Das gesetzliche Widerrufsrecht für
          Verbraucher richtet sich nach der nachfolgenden Widerrufsbelehrung.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">§ 5 Rückerstattung über App-Stores</h2>
        <p className="text-muted leading-relaxed">
          Die technische Rückabwicklung des Kaufs (z. B. nach Widerruf oder Kulanzanfrage) erfolgt
          ausschließlich über den jeweiligen App-Store nach dessen Rückerstattungsrichtlinien
          (Google Play, Apple App Store). Der Anbieter hat keinen direkten Zugriff auf Ihre
          Zahlungsdaten und kann Erstattungen nicht selbst vornehmen, unterstützt Sie aber auf
          Anfrage bei der Anliegen-Stellung gegenüber dem Store.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">§ 6 Haftung</h2>
        <p className="text-muted leading-relaxed">
          Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden
          aus der Verletzung des Lebens, des Körpers oder der Gesundheit. Im Übrigen haftet der
          Anbieter nur bei Verletzung wesentlicher Vertragspflichten, beschränkt auf den
          vertragstypisch vorhersehbaren Schaden. Die Haftung nach dem Produkthaftungsgesetz bleibt
          unberührt.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-foreground">§ 7 Schlussbestimmungen</h2>
        <p className="text-muted leading-relaxed">
          Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Zwingende Vorschriften des
          Verbraucherschutzes im Land des gewöhnlichen Aufenthalts des Verbrauchers bleiben
          unberührt. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der
          übrigen Bestimmungen unberührt.
        </p>
      </section>

      {/* Widerrufsbelehrung */}
      <div className="border-t border-black/10 pt-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Widerrufsbelehrung</h2>
          <p className="text-muted text-sm">Für Verbraucher gemäß §§ 312 ff., 355 ff. BGB</p>
        </div>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">Widerrufsrecht</h3>
          <p className="text-muted leading-relaxed">
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
            widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
          </p>
          <p className="text-muted leading-relaxed">
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Daniel Dillbaum, Dilltree Apps, An den
            Weihern 45, 51467 Bergisch Gladbach, E-Mail:{" "}
            <a href="mailto:kontakt@dilltree.de" className="text-primary hover:underline">
              kontakt@dilltree.de
            </a>
            ) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine
            E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
          </p>
          <p className="text-muted leading-relaxed">
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung
            des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">Folgen des Widerrufs</h3>
          <p className="text-muted leading-relaxed">
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
            erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag
            zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns
            eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie
            bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde
            ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser
            Rückzahlung Entgelte berechnet.
          </p>
          <p className="text-muted leading-relaxed">
            Hinweis: Da der Vertrag über die Stores Google Play bzw. Apple App Store abgewickelt
            wird, erfolgt die Erstattung nach deren jeweiligen Rückerstattungsrichtlinien. Wir
            unterstützen Sie auf Anfrage.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">Vorzeitiges Erlöschen des Widerrufsrechts</h3>
          <p className="text-muted leading-relaxed">
            Bei Verträgen über die Bereitstellung digitaler Inhalte, die nicht auf einem
            körperlichen Datenträger geliefert werden, erlischt das Widerrufsrecht auch dann, wenn
            der Unternehmer mit der Vertragsausführung begonnen hat, nachdem Sie
          </p>
          <ol className="text-muted leading-relaxed list-decimal pl-5 space-y-1">
            <li>
              ausdrücklich zugestimmt haben, dass der Unternehmer mit der Vertragsausführung vor
              Ablauf der Widerrufsfrist beginnt, und
            </li>
            <li>
              Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung mit Beginn der
              Vertragsausführung Ihr Widerrufsrecht verlieren (§ 356 Abs. 5 BGB).
            </li>
          </ol>
          <p className="text-muted leading-relaxed">
            Die Bestätigung dieser beiden Punkte erfolgt aktiv per Zustimmungshaken im Kaufdialog
            vor dem Abschluss.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">Muster-Widerrufsformular</h3>
          <p className="text-muted leading-relaxed">
            Wenn Sie den Vertrag widerrufen wollen, können Sie dieses Formular ausfüllen und an uns
            zurücksenden:
          </p>
          <div className="text-muted leading-relaxed bg-black/5 rounded-lg p-4 text-sm font-mono whitespace-pre-line">
{`An: Daniel Dillbaum, Dilltree Apps
An den Weihern 45, 51467 Bergisch Gladbach
kontakt@dilltree.de

Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der Lifetime-Lizenz „Schwabe Pro":

Produkt: Schwabe Pro (Lifetime-Lizenz, einmalig 8,99 €)
Bestellt am: __________
Name des/der Verbraucher(s): __________
Anschrift des/der Verbraucher(s): __________
Unterschrift (nur bei Mitteilung auf Papier): __________
Datum: __________

(*) Unzutreffendes streichen.`}
          </div>
        </section>
      </div>

      <p className="text-muted/50 text-sm text-center pt-4 border-t border-black/5">
        Stand: April 2026
      </p>
    </div>
  );
}
