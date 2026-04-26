import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validierung
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "E-Mail-Adresse fehlt." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ error: "Bitte eine gültige E-Mail-Adresse eingeben." }, { status: 400 });
    }

    // DSGVO: E-Mail-Adresse niemals im Klartext loggen — Vercel speichert
    // Logs bis zu 30 Tage in US-erreichbarer Infrastruktur. Nur Domain +
    // Zeitstempel sind unbedenklich (kein Personenbezug ohne Local-Part).
    // Sobald Mailchimp/Resend angebunden ist, faellt auch dieses Logging weg.
    const emailDomain = normalizedEmail.split('@')[1] ?? 'unknown';
    console.log(`[Newsletter] ${new Date().toISOString()} | Neue Anmeldung (Domain: ${emailDomain})`);

    return NextResponse.json(
      { message: "Erfolgreich angemeldet! Du erhältst bald die erste Schwaben-Woche." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Ein Fehler ist aufgetreten." }, { status: 500 });
  }
}
