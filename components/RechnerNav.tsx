"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const RECHNER = [
  { href: "/rechner/budget", label: "Budget" },
  { href: "/rechner/etf-sparplan", label: "ETF-Sparplan" },
  { href: "/rechner/fahrradleasing", label: "Fahrradleasing" },
  { href: "/rechner/brutto-netto", label: "Brutto-Netto" },
  { href: "/rechner/inflation", label: "Inflation" },
];

export default function RechnerNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 -mb-2">
      {RECHNER.map((r) => {
        const isActive = pathname === r.href;
        return (
          <Link
            key={r.href}
            href={r.href}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "bg-foreground/5 text-foreground hover:bg-foreground/10"
            }`}
          >
            {r.label}
          </Link>
        );
      })}
    </nav>
  );
}
