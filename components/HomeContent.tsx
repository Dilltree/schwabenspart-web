"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/lib/i18n";

export function HeroSection() {
  const { t } = useTranslations();

  return (
    <section className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
          <div className="flex-1 text-center sm:text-left">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent animate-pulse">
              {t("hero.badge")}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              {t("hero.title")}{" "}
              <span className="text-accent">{t("hero.schwabe")}</span>
            </h1>
            <p className="text-white/70 text-lg mt-4 max-w-lg">
              {t("hero.subtitle")}
            </p>
            <p className="text-white/50 text-sm mt-2">
              {t("hero.trust")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center sm:justify-start">
              <Link
                href="/spartipps"
                className="bg-accent hover:bg-accent-light text-primary font-extrabold px-8 py-4 rounded-full text-center text-lg shadow-lg shadow-accent/25 transition-all hover:scale-105"
              >
                {t("hero.cta-spartipps")}
              </Link>
              <Link
                href="/deals"
                className="border border-white/20 hover:bg-white/10 text-white font-medium px-6 py-3.5 rounded-full text-center transition-colors"
              >
                {t("hero.cta-deals")}
              </Link>
            </div>
          </div>
          <div className="shrink-0">
            <Image
              src="/logos/logo.png"
              alt="Der Schwabe"
              width={180}
              height={180}
              className="rounded-3xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsHeader({ count }: { count: number }) {
  const { t } = useTranslations();

  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{t("news.title")}</h2>
        <p className="text-muted text-sm mt-1">{t("news.subtitle")}</p>
      </div>
    </div>
  );
}

export function NewsShowAll({ count }: { count: number }) {
  const { t } = useTranslations();

  return (
    <div className="text-center mt-8">
      <Link
        href="/spartipps"
        className="text-sm font-medium text-primary hover:text-accent transition-colors"
      >
        {`${t("common.all")} ${count} ${t("news.show-all")}`} &rarr;
      </Link>
    </div>
  );
}

export function TipsHeader() {
  const { t } = useTranslations();

  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">{t("tips.title")}</h2>
        <p className="text-muted text-sm mt-1">{t("tips.subtitle")}</p>
      </div>
      <Link
        href="/spartipps"
        className="text-sm font-medium text-primary hover:text-accent transition-colors hidden sm:block"
      >
        {t("tips.show-all")} &rarr;
      </Link>
    </div>
  );
}

export function AppCTA() {
  const { t } = useTranslations();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="bg-primary rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
        <Image
          src="/logos/logo.png"
          alt="Der Schwabe App"
          width={100}
          height={100}
          className="rounded-2xl shadow-lg shrink-0"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white">{t("app.title")}</h2>
          <p className="text-white/70 mt-2">
            {t("app.subtitle")}
          </p>
        </div>
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent hover:bg-accent-light text-primary font-bold px-8 py-3 rounded-full transition-colors shrink-0 whitespace-nowrap"
        >
          {t("app.cta")}
        </a>
      </div>
    </section>
  );
}
