"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "@/lib/i18n";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslations();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t("newsletter.error-generic"));
      } else {
        setSubmitted(true);
      }
    } catch {
      setError(t("newsletter.error-connection"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-primary text-white">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
          {t("newsletter.title")}{" "}
          <span className="text-accent">{t("newsletter.title-accent")}</span>
        </h2>
        <p className="text-white/70 mt-4">
          {t("newsletter.subtitle")}
        </p>

        {submitted ? (
          <div className="mt-8 bg-accent/20 border border-accent/40 rounded-xl p-6">
            <p className="text-accent font-bold text-lg">{t("newsletter.success")}</p>
            <p className="text-white/70 mt-1 text-sm">
              {t("newsletter.success-text")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-accent hover:bg-accent-light text-primary font-bold px-6 py-3 rounded-full transition-colors shrink-0 disabled:opacity-60"
            >
              {loading ? t("newsletter.loading") : t("newsletter.button")}
            </button>
          </form>
        )}
        {error && (
          <p className="text-red-400 text-sm mt-3">{error}</p>
        )}

        <p className="text-white/40 text-xs mt-4">
          {t("newsletter.privacy")}{" "}
          <Link href="/datenschutz" className="underline hover:text-accent transition-colors">
            {t("newsletter.privacy-link")}
          </Link>
        </p>
      </div>
    </section>
  );
}
