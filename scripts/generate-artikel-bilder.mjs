/**
 * Artikel-Bilder Generator via DALL-E 3
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'public', 'artikel');

// .env aus FinanzApp laden
try {
  const env = readFileSync(join(__dirname, '..', '..', 'FinanzApp', '.env'), 'utf-8');
  env.split('\n').forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) process.env[key.trim()] = vals.join('=').trim();
  });
} catch {}

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) { console.error('OPENAI_API_KEY fehlt'); process.exit(1); }

const NO_TEXT = 'IMPORTANT: Do NOT include any text, letters, words, numbers, or characters anywhere in the image. Pure visual illustration only.';

const BILDER = [
  // Nachrichten
  { name: 'spritpreise', prompt: `A gas station fuel pump showing high prices, a car dashboard with fuel gauge near empty. Dramatic lighting, warm orange tones. Editorial news photo style. ${NO_TEXT}` },
  { name: 'ezb-leitzins', prompt: `The European Central Bank building in Frankfurt at dusk, with Euro symbol sculpture in front. Blue and gold tones, professional financial photography. ${NO_TEXT}` },
  { name: 'dax-boerse', prompt: `A stock market trading screen showing line charts and candlestick patterns with red and green indicators. Dark background with glowing data. Modern financial dashboard aesthetic. ${NO_TEXT}` },
  { name: 'wohnungsbau', prompt: `Modern apartment buildings under construction with cranes, a German city skyline in background. Golden hour lighting, architectural photography style. ${NO_TEXT}` },
  { name: 'bitcoin', prompt: `A physical gold Bitcoin coin standing upright on a reflective dark surface with subtle blue digital matrix elements in background. Premium product photography. ${NO_TEXT}` },
  { name: 'gold', prompt: `Stacked gold bars and gold coins on dark velvet surface with dramatic side lighting. Premium, luxurious feel. Commodity trading photography style. ${NO_TEXT}` },
  // Spartipps
  { name: 'budgetregel', prompt: `A clean desk with a notebook, calculator, coins sorted into three glass jars and a piggy bank. Bright, organized, motivational. Flat lay photography style. ${NO_TEXT}` },
  { name: 'strom-gas', prompt: `An electricity meter and a German house with solar panels, a hand adjusting a thermostat. Warm home setting, energy saving concept. Editorial style. ${NO_TEXT}` },
  { name: 'etf-sparplan', prompt: `A growth chart going upward with small plant sprouts at different stages growing from coin stacks. Clean white background, investment growth concept. Minimal editorial style. ${NO_TEXT}` },
  { name: 'cashback', prompt: `A smartphone showing a shopping app with a shopping cart, surrounded by coins falling from above. Bright, modern, e-commerce aesthetic. ${NO_TEXT}` },
  { name: 'girokonto', prompt: `A modern bank card (debit card) lying on a marble surface next to a smartphone and coffee cup. Clean, minimal lifestyle photography. Premium banking feel. ${NO_TEXT}` },
  { name: 'tagesgeld', prompt: `A glass jar filled with Euro coins and banknotes with a small plant growing from the top. Warm natural light, savings concept. Cozy editorial photography. ${NO_TEXT}` },
];

async function generateImage(prompt, filename) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
    body: JSON.stringify({
      model: 'dall-e-3', prompt, n: 1, size: '1792x1024', quality: 'standard', response_format: 'b64_json',
    }),
  });
  if (!response.ok) throw new Error(`API: ${await response.text()}`);
  const data = await response.json();
  const buffer = Buffer.from(data.data[0].b64_json, 'base64');
  const filepath = join(OUTPUT_DIR, `${filename}.jpg`);
  writeFileSync(filepath, buffer);
  return filepath;
}

console.log(`🖼️  Generiere ${BILDER.length} Artikel-Bilder...`);
console.log('═'.repeat(50));

let erfolg = 0;
for (let i = 0; i < BILDER.length; i++) {
  const { name, prompt } = BILDER[i];
  console.log(`[${i+1}/${BILDER.length}] ${name}...`);
  try {
    const path = await generateImage(prompt, name);
    console.log(`  ✅ ${path}`);
    erfolg++;
  } catch (err) {
    console.log(`  ❌ ${err.message}`);
  }
  if (i < BILDER.length - 1) await new Promise(r => setTimeout(r, 2000));
}

console.log(`\n${'═'.repeat(50)}`);
console.log(`Fertig! ${erfolg}/${BILDER.length} Bilder erstellt.`);
