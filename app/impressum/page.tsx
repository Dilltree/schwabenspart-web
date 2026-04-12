import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von schwabenspart — Angaben gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Impressum</h1>
      <p className="text-muted text-sm">Angaben gemäß § 5 TMG</p>

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
        <h2 className="text-lg font-bold text-foreground mb-3">Haftungsausschluss</h2>
        <p className="text-muted leading-relaxed">
          Die auf dieser Website und in der App bereitgestellten Informationen und KI-generierten Hinweise
          dienen ausschließlich allgemeinen Informationszwecken und stellen keine Finanz-, Steuer- oder
          Rechtsberatung dar. Der Anbieter übernimmt keine Haftung für Entscheidungen, die auf Basis
          der Inhalte getroffen werden.
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
