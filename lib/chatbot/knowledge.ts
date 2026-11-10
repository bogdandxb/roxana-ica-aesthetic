import fs from 'fs/promises';
import path from 'path';

// Baza de cunoștințe a asistentului virtual.
//
// Sursa 1 — SITE-UL: textul vizibil al fiecărei pagini publice din sitemap.xml, citit exact cum îl vede
// un vizitator. Orice modificare pe site (preț, serviciu, articol nou) ajunge automat la chatbot,
// fără nicio muncă în plus.
//
// Sursa 2 — DOSARUL knowledge/ (doar fișierele din rădăcina lui): documente OFICIALE suplimentare
// (protocoale, produse, instrucțiuni confirmate de Roxana). Deocamdată e gol — vezi knowledge/README.md.
//
// Informațiile GENERALE din knowledge/general/ nu fac parte din această bază: ele se aleg
// pe teme, la fiecare întrebare (vezi general.ts).

const CACHE_MS = 60 * 60 * 1000; // reconstruim baza cel mult o dată pe oră
const KNOWLEDGE_DIR = path.join(process.cwd(), 'knowledge');

// Secțiuni care nu sunt informații oficiale despre cabinet (părerile clientelor)
const EXCLUDED_SECTION_IDS = ['recenzii'];

// Pagini interne care nu trebuie să ajungă niciodată în baza de cunoștințe
const EXCLUDED_PATHS = ['/admin'];

// Dacă o pagină a lipsit la construire, reîncercăm mult mai repede decât o oră
const INCOMPLETE_CACHE_MS = 5 * 60 * 1000;

let cached: { text: string; builtAt: number; origin: string; complete: boolean } | null = null;
let building: Promise<string> | null = null;

export async function getKnowledgeBase(origin: string): Promise<string> {
  const maxAge = cached?.complete ? CACHE_MS : INCOMPLETE_CACHE_MS;
  if (cached && cached.origin === origin && Date.now() - cached.builtAt < maxAge) return cached.text;
  if (!building) {
    building = buildKnowledgeBase(origin)
      .then(({ text, complete }) => {
        cached = { text, builtAt: Date.now(), origin, complete };
        return text;
      })
      .finally(() => {
        building = null;
      });
  }
  try {
    return await building;
  } catch (err) {
    // Dacă reconstruirea eșuează, folosim ultima variantă bună (chiar dacă e mai veche de o oră)
    if (cached) return cached.text;
    throw err;
  }
}

async function buildKnowledgeBase(origin: string): Promise<{ text: string; complete: boolean }> {
  const paths = await getSitePaths(origin);
  const pages: { path: string; text: string | null }[] = [];
  // Câte 4 pagini odată, ca să nu suprasolicităm site-ul
  for (let i = 0; i < paths.length; i += 4) {
    pages.push(...(await Promise.all(paths.slice(i, i + 4).map(async p => ({ path: p, text: await fetchPageText(origin + p) })))));
  }
  const ok = pages.filter((pg): pg is { path: string; text: string } => pg.text !== null);
  if (ok.length === 0) throw new Error('Nicio pagină a site-ului nu a putut fi citită');

  const sitePart = ok.map(pg => `<pagina url="${pg.path}">\n${pg.text}\n</pagina>`).join('\n\n');
  const docs = await readKnowledgeDocs();
  const docsPart = docs.map(d => `<document nume="${d.name}">\n${d.text}\n</document>`).join('\n\n');

  return { text: docsPart ? `${sitePart}\n\n${docsPart}` : sitePart, complete: ok.length === pages.length };
}

// O pagină care nu răspunde (nici după reîncercări) e sărită, ca să nu blocheze tot chatbotul
async function fetchPageText(url: string): Promise<string | null> {
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * attempt));
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) return htmlToText(await res.text());
    } catch {
      /* reîncercăm */
    }
  }
  console.error(`[chat] pagina nu a putut fi citită pentru baza de cunoștințe: ${url}`);
  return null;
}

async function getSitePaths(origin: string): Promise<string[]> {
  const res = await fetch(`${origin}/sitemap.xml`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`sitemap.xml a răspuns cu ${res.status}`);
  const xml = await res.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname || '/');
  // Ordinea din sitemap e stabilă → textul bazei e identic între cereri (important pentru prompt caching)
  return [...new Set(paths)].filter(p => !EXCLUDED_PATHS.some(ex => p.startsWith(ex)));
}

async function readKnowledgeDocs(): Promise<{ name: string; text: string }[]> {
  let files: string[];
  try {
    files = await fs.readdir(KNOWLEDGE_DIR);
  } catch {
    return [];
  }
  const docs = files
    .filter(f => /\.(md|txt)$/i.test(f) && f.toLowerCase() !== 'readme.md')
    .sort();
  return Promise.all(
    docs.map(async f => ({ name: f, text: (await fs.readFile(path.join(KNOWLEDGE_DIR, f), 'utf8')).trim() })),
  );
}

// Elimină un element <section id="..."> cu tot conținutul lui, ținând cont de secțiunile imbricate
function removeSectionById(html: string, id: string): string {
  const start = html.search(new RegExp(`<section[^>]*\\sid="${id}"`, 'i'));
  if (start === -1) return html;
  const tag = /<(\/?)section\b[^>]*>/gi;
  tag.lastIndex = start;
  let depth = 0;
  let m: RegExpExecArray | null;
  while ((m = tag.exec(html))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return html.slice(0, start) + html.slice(tag.lastIndex);
  }
  return html;
}

export function htmlToText(html: string): string {
  const bodyStart = html.search(/<body[\s>]/i);
  let s = bodyStart === -1 ? html : html.slice(bodyStart);
  for (const id of EXCLUDED_SECTION_IDS) s = removeSectionById(s, id);
  s = s
    .replace(/<(script|style|noscript|svg|nav|footer|iframe)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<img\b[^>]*\balt="([^"]*)"[^>]*>/gi, ' ')
    .replace(/<(h[1-6])\b[^>]*>/gi, '\n\n## ')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<li\b[^>]*>/gi, '\n- ')
    .replace(/<(br|\/p|\/div|\/li|\/section|\/tr|\/article)\b[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
  return s
    .split('\n')
    .map(l => l.replace(/[ \t]+/g, ' ').trim())
    .filter(l => l && l !== '-')
    .join('\n');
}
