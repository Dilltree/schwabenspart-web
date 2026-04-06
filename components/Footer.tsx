"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/i18n";

export default function Footer() {
  const { t } = useTranslations();

  return (
    <footer className="bg-primary text-white/70 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="text-white font-bold text-lg mb-2">
              schwaben<span className="text-accent">spart</span>
            </p>
            <p className="text-sm leading-relaxed">
              {t("footer.brand-text")}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://instagram.com/schwabenspart"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/60 hover:text-accent transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.088 4.088 0 011.47.96c.453.453.773.898.96 1.47.163.46.349 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.088 4.088 0 01-.96 1.47 4.088 4.088 0 01-1.47.96c-.46.163-1.26.349-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.088 4.088 0 01-1.47-.96 4.088 4.088 0 01-.96-1.47c-.163-.46-.349-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.088 4.088 0 01.96-1.47 4.088 4.088 0 011.47-.96c.46-.163 1.26-.349 2.43-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.131 4.902.333 4.14.63a6.21 6.21 0 00-2.245 1.462A6.21 6.21 0 00.433 4.337C.136 5.1-.066 5.973-.008 7.251-.066 8.53-.08 8.938-.08 12.197c0 3.259.014 3.668.072 4.948.059 1.277.261 2.15.558 2.913a6.21 6.21 0 001.462 2.245 6.21 6.21 0 002.245 1.462c.762.297 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.059 2.15-.261 2.913-.558a6.21 6.21 0 002.245-1.462 6.21 6.21 0 001.462-2.245c.297-.762.499-1.636.558-2.913.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.059-1.277-.261-2.15-.558-2.913a6.21 6.21 0 00-1.462-2.245A6.21 6.21 0 0019.86.63C19.1.333 18.226.131 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-10.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com/@schwabenspart"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-white/60 hover:text-accent transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.05a8.26 8.26 0 004.76 1.5V7.1a4.84 4.84 0 01-1-.41z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com/@schwabenspart"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white/60 hover:text-accent transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">{t("footer.navigation")}</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/spartipps" className="hover:text-accent transition-colors">{t("footer.spartipps")}</Link></li>
              <li><Link href="/deals" className="hover:text-accent transition-colors">{t("footer.deals")}</Link></li>
              <li><Link href="/ueber-uns" className="hover:text-accent transition-colors">{t("footer.ueber-uns")}</Link></li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">{t("footer.rechtliches")}</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/datenschutz" className="hover:text-accent transition-colors">{t("footer.datenschutz")}</Link></li>
              <li><Link href="/impressum" className="hover:text-accent transition-colors">{t("footer.impressum")}</Link></li>
            </ul>
            <p className="mt-4 text-sm">
              <a href="mailto:schwabenspart@googlemail.com" className="hover:text-accent transition-colors">
                schwabenspart@googlemail.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
          <p className="mt-1">
            {t("footer.affiliate")}
          </p>
        </div>
      </div>
    </footer>
  );
}
