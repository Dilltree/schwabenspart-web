import Image from "next/image";

export default function SchwabenKommentar({
  text,
}: {
  text: string;
}) {
  return (
    <aside className="bg-primary/5 border-l-4 border-accent rounded-r-xl p-5 my-8">
      <div className="flex items-start gap-4">
        <Image
          src="/logos/logo.png"
          alt="Der Schwabe"
          width={48}
          height={48}
          className="rounded-full shrink-0 mt-0.5"
        />
        <div>
          <p className="text-sm font-bold text-primary mb-1">Was der Schwabe dazu sagt:</p>
          <p className="text-muted text-sm leading-relaxed italic">&ldquo;{text}&rdquo;</p>
        </div>
      </div>
    </aside>
  );
}
