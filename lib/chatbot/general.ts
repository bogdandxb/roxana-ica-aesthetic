import fs from 'fs/promises';
import path from 'path';

// Stratul B al bazei de cunoștințe: informații GENERALE, documentate din surse medicale/științifice
// (knowledge/general/*.md). Spre deosebire de informațiile oficiale (trimise întregi la fiecare întrebare),
// de aici se trimit doar secțiunile relevante pentru întrebare — căutare locală, fără servicii externe.

const GENERAL_DIR = path.join(process.cwd(), 'knowledge', 'general');
const MAX_SECTIONS = 5;
const MAX_CHARS = 9000;
const MIN_SCORE = 2;

type Section = {
  doc: string;
  heading: string;
  body: string;
  sources: string;
  verified: string;
  headingStems: Set<string>;
  keywordStems: Set<string>;
  bodyStems: Map<string, number>;
};

const STOPWORDS = new Set(
  'si sau este sunt care pentru dupa inainte cu ce cum cat cate cand unde din de la in pe nu da sa se ma te mi ai am au fi fac face poate pot vreau imi iti un una unei unui ale al lui lor mai foarte acest aceasta acesta despre doar tot toate the and'.split(' '),
);

// Forme care nu au aceeași rădăcină cu termenul din documente
const SYNONYMS: Record<string, string> = {
  rad: 'ras', rade: 'ras', radem: 'ras', radeti: 'ras', radeau: 'ras', lama: 'ras', aparatul: 'ras',
  injectabil: 'injectabila', ace: 'ace', acul: 'ace',
};

function normalize(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function stems(text: string): string[] {
  return normalize(text)
    .split(/[^a-z0-9+]+/)
    .filter(w => w.length >= 3 && !STOPWORDS.has(w))
    .map(w => SYNONYMS[w] ?? w);
}

// Două cuvinte se potrivesc dacă au aceeași rădăcină: „bronz/bronzată”, „peeling/peelinguri”, „epilare/epilarea”
function sameRoot(a: string, b: string): boolean {
  const m = Math.min(a.length, b.length);
  if (m < 4) return a === b;
  const n = Math.min(m, 6);
  return a.slice(0, n) === b.slice(0, n);
}

function hasRoot(words: Iterable<string>, q: string): boolean {
  for (const w of words) if (sameRoot(w, q)) return true;
  return false;
}

function countRoot(counts: Map<string, number>, q: string): number {
  let n = 0;
  for (const [w, c] of counts) if (sameRoot(w, q)) n += c;
  return n;
}

let cache: { sections: Section[]; loadedAt: number } | null = null;

async function loadSections(): Promise<Section[]> {
  if (cache && Date.now() - cache.loadedAt < 60 * 60 * 1000) return cache.sections;
  let files: string[] = [];
  try {
    files = (await fs.readdir(GENERAL_DIR)).filter(f => f.endsWith('.md')).sort();
  } catch {
    files = [];
  }
  const sections: Section[] = [];
  for (const f of files) {
    const raw = await fs.readFile(path.join(GENERAL_DIR, f), 'utf8');
    const [header, ...parts] = raw.split(/^## /m);
    const title = header.match(/^# (.+)$/m)?.[1]?.trim() ?? f;
    const keywords = header.match(/^cuvinte cheie:\s*(.+)$/m)?.[1] ?? '';
    const verified = header.match(/^verificat:\s*(.+)$/m)?.[1]?.trim() ?? '';
    const sources = [...header.matchAll(/^- (.+?) — https?:\/\/\S+$/gm)].map(m => m[1].trim()).join('; ');
    const keywordStems = new Set(stems(`${title} ${keywords}`));
    for (const part of parts) {
      const [headingLine, ...rest] = part.split('\n');
      const body = rest.join('\n').trim();
      const bodyStems = new Map<string, number>();
      for (const s of stems(body)) bodyStems.set(s, (bodyStems.get(s) ?? 0) + 1);
      sections.push({
        doc: title,
        heading: headingLine.trim(),
        body,
        sources,
        verified,
        headingStems: new Set(stems(headingLine)),
        keywordStems,
        bodyStems,
      });
    }
  }
  cache = { sections, loadedAt: Date.now() };
  return sections;
}

function score(section: Section, query: Map<string, number>): number {
  let total = 0;
  for (const [stem, weight] of query) {
    let s = 0;
    if (hasRoot(section.headingStems, stem)) s += 3;
    if (hasRoot(section.keywordStems, stem)) s += 1.5;
    s += Math.min(countRoot(section.bodyStems, stem), 3) * 0.5;
    total += s * weight;
  }
  return total;
}

// Ultima întrebare contează cel mai mult; cea dinainte ajută la întrebări de continuare („și după?”)
export async function getRelevantGeneralInfo(userMessages: string[]): Promise<string> {
  const sections = await loadSections();
  if (sections.length === 0 || userMessages.length === 0) return '';

  const query = new Map<string, number>();
  const recent = userMessages.slice(-2).reverse();
  recent.forEach((msg, i) => {
    const w = i === 0 ? 1 : 0.5;
    for (const s of stems(msg)) query.set(s, Math.max(query.get(s) ?? 0, w));
  });
  if (query.size === 0) return '';

  const ranked = sections
    .map(s => ({ s, score: score(s, query) }))
    .filter(r => r.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score);

  const picked: Section[] = [];
  let chars = 0;
  for (const { s } of ranked) {
    if (picked.length >= MAX_SECTIONS) break;
    const size = s.body.length + s.heading.length;
    if (chars + size > MAX_CHARS) continue;
    picked.push(s);
    chars += size;
  }
  if (picked.length === 0) return '';

  return picked
    .map(
      s =>
        `<sectiune document="${s.doc}" verificat="${s.verified}" surse="${s.sources}">\n## ${s.heading}\n${s.body}\n</sectiune>`,
    )
    .join('\n\n');
}
