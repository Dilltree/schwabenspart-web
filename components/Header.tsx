"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations, type TranslationKey } from "@/lib/i18n";
import LanguageToggle from "./LanguageToggle";

const NAV_LINKS: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "nav.startseite" },
  { href: "/spartipps", labelKey: "nav.spartipps" },
  { href: "/deals", labelKey: "nav.deals" },
  { href: "/rechner", labelKey: "nav.rechner" },
  { href: "/ueber-uns", labelKey: "nav.ueber-uns" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslations();

  return (
    <header className="sticky top-0 z-50 bg-primary text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logos/logo.png"
              alt="Der Schwabe Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold tracking-tight">
              schwaben<span className="text-accent">spart</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 hover:text-accent transition-colors"
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <Link
              href="/suche"
              className="text-white/60 hover:text-accent transition-colors"
              aria-label={t("nav.suche")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <LanguageToggle />
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-light text-primary text-sm font-bold px-4 py-2 rounded-full transition-colors"
            >
              {t("nav.app-laden")}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-white/80 hover:text-white"
              aria-label={t("common.menu-open")}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-white/10 pt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-3 text-base text-white/80 hover:text-accent rounded-lg hover:bg-white/5"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
