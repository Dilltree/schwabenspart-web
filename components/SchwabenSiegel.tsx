import Image from "next/image";

type Stufe = "gold" | "silber" | "bronze";

const LABELS: Record<Stufe, string> = {
  gold: "Top-Empfehlung",
  silber: "Empfohlen",
  bronze: "Geprüft",
};

export default function SchwabenSiegel({
  stufe = "gold",
  size = 64,
}: {
  stufe?: Stufe;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={`/siegel/${stufe}.png`}
        alt={`Schwaben ${LABELS[stufe]}`}
        width={size}
        height={size}
        className="shrink-0"
      />
      <span className="text-xs font-semibold text-muted uppercase tracking-wide">
        {LABELS[stufe]}
      </span>
    </div>
  );
}
