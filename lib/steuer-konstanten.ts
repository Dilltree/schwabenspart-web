// UPDATE JÄHRLICH: Werte für 2027 prüfen (Sozialversicherungs-Rechengrößenverordnung)

export const STEUER_2026 = {
  // Sozialversicherung (Arbeitnehmer-Anteil)
  kv: { satz: 0.073, zusatzbeitrag: 0.0125, bbg: 66150 }, // 7.3% + 1.25% Zusatz, BBG 66.150€/Jahr
  rv: { satz: 0.093, bbg: 96600 }, // 9.3%, BBG 96.600€/Jahr
  av: { satz: 0.013, bbg: 96600 }, // 1.3%, BBG 96.600€/Jahr
  pv: { satz: 0.018, zuschlagKinderlos: 0.006, bbg: 66150 }, // 1.8% + 0.6% kinderlos

  // Einkommensteuer
  grundfreibetrag: 12096,
  spizenSteuersatz: 0.42,
  spitzenGrenze: 68480,
  reichenSteuersatz: 0.45,
  reichenGrenze: 277826,

  // Sonstiges
  solidaritaetFreigrenze: 18130, // Jahres-Lohnsteuer unter der kein Soli fällt
  solidaritaetSatz: 0.055,
  kirchensteuerSatz: { bawue_bayern: 0.08, rest: 0.09 },
  werbungskostenPauschale: 1230,
  sonderausgabenPauschale: 36,

  // Fahrradleasing
  geldwerterVorteilFahrrad: 0.0025, // 0.25% des Listenpreises pro Monat
  standardUebernahme: 0.18, // 18% Restwert
} as const;
