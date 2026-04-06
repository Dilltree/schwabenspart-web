"use client";

import SchwabenSiegel from "./SchwabenSiegel";
import { useTranslations } from "@/lib/i18n";

export type Deal = {
  name: string;
  kategorie: string;
  vorteil: string;
  kosten: string;
  link: string;
  siegel: "gold" | "silber" | "bronze";
};

export default function DealTable({ deals, title, id }: { deals: Deal[]; title: string; id?: string }) {
  const { t } = useTranslations();

  return (
    <div id={id} className="bg-card rounded-2xl shadow-sm border border-black/5 overflow-hidden scroll-mt-20">
      <div className="bg-primary px-6 py-4">
        <h2 className="text-white font-bold text-lg">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/5">
              <th className="text-left px-6 py-3 text-muted font-medium">{t("deals.provider")}</th>
              <th className="text-left px-6 py-3 text-muted font-medium hidden sm:table-cell">{t("deals.benefit")}</th>
              <th className="text-left px-6 py-3 text-muted font-medium">{t("deals.cost")}</th>
              <th className="text-left px-6 py-3 text-muted font-medium">{t("deals.rating")}</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.name} className="border-b border-black/5 last:border-0 hover:bg-primary/[0.02]">
                <td className="px-6 py-4 font-semibold text-foreground">{deal.name}</td>
                <td className="px-6 py-4 text-muted hidden sm:table-cell">{deal.vorteil}</td>
                <td className="px-6 py-4 text-muted">{deal.kosten}</td>
                <td className="px-6 py-4">
                  <SchwabenSiegel stufe={deal.siegel} size={40} />
                </td>
                <td className="px-6 py-4">
                  <a
                    href={deal.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center justify-center bg-accent hover:bg-accent-light text-primary text-xs font-bold px-5 py-2.5 min-h-[44px] rounded-full transition-colors whitespace-nowrap"
                  >
                    {t("deals.go-to-provider")}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="px-6 py-3 text-xs text-muted border-t border-black/5">
        {t("deals.affiliate-note")}
      </p>
    </div>
  );
}
