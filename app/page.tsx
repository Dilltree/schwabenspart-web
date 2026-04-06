import SpartippCard from "@/components/SpartippCard";
import SchwabenKommentar from "@/components/SchwabenKommentar";
import Newsletter from "@/components/Newsletter";
import Testimonials from "@/components/Testimonials";
import { HeroSection, NewsHeader, NewsShowAll, TipsHeader, AppCTA } from "@/components/HomeContent";
import { getNachrichten, getSpartipps } from "@/lib/articles";

export default function Home() {
  const nachrichten = getNachrichten();
  const spartipps = getSpartipps();

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Finanznachrichten */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <NewsHeader count={nachrichten.length} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nachrichten.slice(0, 9).map((a) => (
            <SpartippCard key={a.slug} artikel={a} />
          ))}
        </div>
        {nachrichten.length > 9 && (
          <NewsShowAll count={nachrichten.length} />
        )}
      </section>

      {/* Schwaben-Kommentar */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <SchwabenKommentar text="Mir Schwaben wissa: Wer sei Geld im Griff hot, der hot au sei Leben im Griff. Schau di um, les di schlau — ond fang heut no a zum Spare!" />
      </section>

      {/* Spartipps Teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <TipsHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {spartipps.slice(0, 3).map((a) => (
            <SpartippCard key={a.slug} artikel={a} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />

      {/* App CTA */}
      <AppCTA />
    </>
  );
}
