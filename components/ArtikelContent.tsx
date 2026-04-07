"use client";

import Link from "next/link";
import { useTranslations } from "@/lib/i18n";
import SchwabenKommentar from "@/components/SchwabenKommentar";
import { localize, type Artikel } from "@/components/SpartippCard";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") { i++; continue; }

    // Legacy: ## und ### Marker (alte Artikel)
    if (line.startsWith("### ")) {
      elements.push(<p key={i} className="text-lg text-foreground mt-6 mb-2">{line.slice(4)}</p>);
      i++; continue;
    }

    if (line.startsWith("## ")) {
      elements.push(<p key={i} className="text-lg text-foreground mt-8 mb-3">{line.slice(3)}</p>);
      i++; continue;
    }

    // Überschriften-Erkennung: Kurze Zeilen (< 80 Zeichen) ohne Satzzeichen am Ende
    const trimmed = line.trim();
    if (trimmed.length > 0 && trimmed.length < 80 && !trimmed.endsWith(".") && !trimmed.endsWith("!") && !trimmed.endsWith("?") && !trimmed.endsWith(":") && !trimmed.startsWith("-") && !trimmed.startsWith("1") && !trimmed.includes("|") && !trimmed.startsWith("**")) {
      const nextLine = lines[i + 1]?.trim();
      if (nextLine && nextLine.length > 80) {
        elements.push(<p key={i} className="text-lg text-foreground mt-8 mb-3">{trimmed}</p>);
        i++; continue;
      }
    }

    if (line.includes("|") && lines[i + 1]?.includes("---")) {
      const headerCells = line.split("|").filter(Boolean).map((c) => c.trim());
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|")) {
        rows.push(lines[i].split("|").filter(Boolean).map((c) => c.trim()));
        i++;
      }
      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-primary/10">
                {headerCells.map((cell, ci) => (
                  <th key={ci} className="text-left px-4 py-2 font-semibold text-foreground">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-black/5">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2 text-muted">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("1. ")) {
      const listItems: string[] = [];
      const isOrdered = line.startsWith("1.");
      while (i < lines.length && (lines[i].startsWith("- ") || /^\d+\.\s/.test(lines[i]))) {
        listItems.push(lines[i].replace(/^[-\d.]+\s/, ""));
        i++;
      }
      const ListTag = isOrdered ? "ol" : "ul";
      elements.push(
        <ListTag key={`list-${i}`} className={`my-4 space-y-2 text-muted leading-relaxed ${isOrdered ? "list-decimal" : "list-disc"} pl-6`}>
          {listItems.map((item, li) => (
            <li key={li} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
          ))}
        </ListTag>
      );
      continue;
    }

    elements.push(
      <p key={i} className="text-muted leading-relaxed my-3"
        dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
    );
    i++;
  }
  return elements;
}

export default function ArtikelContent({ artikel }: { artikel: Artikel }) {
  const { language, t } = useTranslations();
  const loc = localize(artikel, language);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/spartipps" className="text-sm text-muted hover:text-primary transition-colors">
        &larr; {t("common.back")}
      </Link>

      <header className="mt-6 mb-10">
        <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full mb-4">
          {loc.kategorie}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
          {loc.title}
        </h1>
        <p className="text-muted mt-3">{(() => { const ts = Date.parse(artikel.datum); return isNaN(ts) ? artikel.datum : new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(ts)); })()}</p>
      </header>

      <div className="text-lg text-muted leading-relaxed font-medium mb-6">
        {loc.description}
      </div>

      {loc.content ? (
        <div>{renderContent(loc.content)}</div>
      ) : (
        <p className="text-muted leading-relaxed">
          {language === "en"
            ? "This article will be available with full content soon. Check back — the Schwabe is working on it!"
            : "Dieser Artikel wird bald mit vollem Inhalt verfügbar sein. Schau regelmäßig vorbei — der Schwabe arbeitet dran!"}
        </p>
      )}

      <SchwabenKommentar
        text={loc.schwabenKommentar || (language === "en"
          ? "The Schwabe is still working on his comment. Check back soon!"
          : "Des isch erscht der Anfang! A gscheider Schwab informiert sich gründlich.")}
      />
    </article>
  );
}
