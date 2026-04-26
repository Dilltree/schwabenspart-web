import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Dilltree Apps — Angaben gemäß § 5 DDG.",
};

export default function ImpressumPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Impressum</h1>
      <p className="text-muted text-sm">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</p>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Anbieter</h2>
        <p className="text-muted leading-relaxed">
          Daniel Dillbaum<br />
          Dilltree Apps<br />
          An den Weihern 45<br />
          51467 Bergisch Gladbach<br />
          Deutschland
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Kontakt</h2>
        <p className="text-muted leading-relaxed">
          E-Mail:{" "}
          <a href="mailto:schwabenspart@googlemail.com" className="text-primary hover:underline">
            schwabenspart@googlemail.com
          </a>
          <br />
          <span className="text-sm">(Allgemeine Anfragen: Dillbaum@googlemail.com)</span>
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Verantwortlich für den Inhalt</h2>
        <p className="text-muted leading-relaxed">
          Daniel Dillbaum<br />
          An den Weihern 45<br />
          51467 Bergisch Gladbach
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">
          Verantwortlicher Redakteur gemäß § 18 Abs. 2 MStV
        </h2>
        <p className="text-muted leading-relaxed">
          Verantwortlich für journalistisch-redaktionell gestaltete Inhalte (Finanznachrichten,
          Spartipps, Ratgeber-Artikel) im Sinne des § 18 Abs. 2 Medienstaatsvertrag (MStV):
        </p>
        <p className="text-muted leading-relaxed mt-2">
          Daniel Dillbaum<br />
          An den Weihern 45<br />
          51467 Bergisch Gladbach
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Haftungsausschluss</h2>
        <p className="text-muted leading-relaxed">
          Die auf dieser Website und in der App bereitgestellten Informationen und KI-generierten
          Hinweise dienen ausschließlich allgemeinen Informationszwecken und stellen keine Finanz-,
          Steuer- oder Rechtsberatung dar. Der Anbieter übernimmt keine Haftung für Entscheidungen,
          die auf Basis der Inhalte getroffen werden.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Keine Anlageberatung / Finanzanlagenvermittlung</h2>
        <p className="text-muted leading-relaxed">
          Der Anbieter verfügt weder über eine Erlaubnis als Finanzanlagenvermittler nach
          § 34f Abs. 1 Gewerbeordnung (GewO) noch über eine Erlaubnis zum Betreiben von Bank- oder
          Finanzdienstleistungsgeschäften nach § 32 Kreditwesengesetz (KWG). Die App und diese
          Website erbringen keine Anlageberatung im Sinne des § 1 Abs. 1a Satz 2 Nr. 1a KWG und
          keine Anlagevermittlung im Sinne des § 1 Abs. 1a Satz 2 Nr. 1 KWG.
        </p>
        <p className="text-muted leading-relaxed mt-3">
          Sämtliche Darstellungen zu Wertpapieren, Portfolio-Zusammensetzungen, KI-Analysen oder
          Marktinformationen sind allgemeine Informationen ohne Bezug zu einer individuellen
          Vermögenssituation oder konkreten Anlagezielen. Für Anlageentscheidungen ist ausschließlich
          der Nutzer selbst verantwortlich. Eine persönliche Beratung durch einen zugelassenen
          Finanzberater, Vermögensverwalter oder Ihre Hausbank wird ausdrücklich empfohlen.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Affiliate-Hinweis</h2>
        <p className="text-muted leading-relaxed">
          Diese Website enthält Affiliate-Links, die mit * gekennzeichnet sind.
          Bei einem Kauf oder Abschluss über diese Links erhalten wir eine Provision
          vom jeweiligen Anbieter. Für den Nutzer entstehen dadurch keine Mehrkosten.
          Affiliate-Partnerschaften beeinflussen nicht unsere Bewertungen.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-foreground mb-3">Streitschlichtung</h2>
        <p className="text-muted leading-relaxed">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a href="https://ec.europa.eu/consumers/odr" className="text-primary hover:underline" target="_blank" rel="noopener">
            ec.europa.eu/consumers/odr
          </a>
        </p>
        <p className="text-muted leading-relaxed mt-3">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <p className="text-muted/50 text-sm text-center pt-4 border-t border-black/5">
        Stand: April 2026
      </p>
    </div>
  );
}
