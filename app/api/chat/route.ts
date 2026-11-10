import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { CHAT_LIMITS, CHAT_MODEL, CONTACT_MARKER, INSTAGRAM_MARKER } from '@/lib/chatbot/config';
import { CHAT_INSTRUCTIONS } from '@/lib/chatbot/prompt';
import { getKnowledgeBase } from '@/lib/chatbot/knowledge';
import { getRelevantGeneralInfo } from '@/lib/chatbot/general';

export const runtime = 'nodejs';
export const maxDuration = 60;

// Cheia API e citită doar pe server (ANTHROPIC_API_KEY) și nu ajunge niciodată în browser
const client = new Anthropic();

type ChatTurn = { role: 'user' | 'assistant'; content: string };

// Limitare simplă per vizitator (în memoria funcției — protecție de bază; plafonul final e creditul din contul Anthropic)
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 60 * 60 * 1000);
  const lastMinute = recent.filter(t => now - t < 60 * 1000).length;
  if (lastMinute >= CHAT_LIMITS.perMinute || recent.length >= CHAT_LIMITS.perHour) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

function parseTurns(body: unknown): ChatTurn[] | null {
  const messages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const turns: ChatTurn[] = [];
  for (const m of messages) {
    const role = (m as ChatTurn)?.role;
    const content = (m as ChatTurn)?.content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null;
    const text = content.trim();
    if (!text) return null;
    if (role === 'user' && text.length > CHAT_LIMITS.maxMessageChars) return null;
    turns.push({ role, content: text.slice(0, 4000) });
  }
  if (turns[0].role !== 'user' || turns[turns.length - 1].role !== 'user') return null;
  if (turns.filter(t => t.role === 'user').length > CHAT_LIMITS.maxUserMessagesPerConversation) return null;
  return turns;
}

function nowInBrasov(): string {
  return new Intl.DateTimeFormat('ro-RO', {
    timeZone: 'Europe/Bucharest',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
}

export async function POST(req: NextRequest) {
  // Acceptăm doar cereri venite de pe site-ul propriu
  const origin = req.headers.get('origin');
  if (origin && origin !== req.nextUrl.origin) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let turns: ChatTurn[] | null = null;
  try {
    turns = parseTurns(await req.json());
  } catch {
    turns = null;
  }
  if (!turns) {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[chat] ANTHROPIC_API_KEY lipsește');
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }

  try {
    const [knowledge, general] = await Promise.all([
      getKnowledgeBase(req.nextUrl.origin),
      getRelevantGeneralInfo(turns.filter(t => t.role === 'user').map(t => t.content)),
    ]);
    const useFallback = CHAT_MODEL === 'claude-sonnet-5-5';

    const response = await client.beta.messages.create({
      model: CHAT_MODEL,
      max_tokens: 4000,
      output_config: { effort: 'low' },
      // Dacă modelul refuză din motive de siguranță, API-ul reîncearcă automat pe un model de rezervă
      ...(useFallback ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' as const } : {}),
      system: [
        { type: 'text', text: CHAT_INSTRUCTIONS },
        {
          type: 'text',
          text: `<baza_de_cunostinte>\n${knowledge}\n</baza_de_cunostinte>`,
          // Instrucțiunile + baza de cunoștințe se refolosesc din cache între întrebări → cost mult mai mic
          cache_control: { type: 'ephemeral' },
        },
        // Informațiile generale se aleg per întrebare, deci stau după blocul din cache
        {
          type: 'text',
          text: general
            ? `<informatii_generale>\n${general}\n</informatii_generale>`
            : '<informatii_generale>Nu există informații generale documentate pentru această întrebare.</informatii_generale>',
        },
        {
          type: 'text',
          text: `Data și ora curentă în Brașov: ${nowInBrasov()}.`,
        },
      ],
      messages: turns,
    });

    if (response.stop_reason === 'refusal') {
      return NextResponse.json({ error: 'unavailable' }, { status: 200 });
    }

    const text = response.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === 'text')
      .map(b => b.text)
      .join('')
      .trim();
    if (!text) {
      return NextResponse.json({ error: 'unavailable' }, { status: 200 });
    }

    // [[PROGRAMARE: Serviciu]] → buton WhatsApp cu mesajul de programare; [[CONTACT]] → butoane de contact
    const booking = text.match(/\[\[PROGRAMARE(?::\s*([^\]]{1,80}))?\]\]/);
    const bookingService = booking ? (booking[1]?.trim() ?? '') : null;
    const showContact = text.includes(CONTACT_MARKER) || booking !== null;
    // [[INSTAGRAM]] → buton Instagram (doar pentru poze/video before–after). Asistentul recomandă Instagram
    // numai în acest caz, așa că afișăm butonul și când menționează Instagram dar uită marcajul.
    const showInstagram = text.includes(INSTAGRAM_MARKER) || /instagram|@roxana_ica_brasov/i.test(text);
    const reply = text
      .replace(/\[\[PROGRAMARE[^\]]*\]\]/g, '')
      .split(CONTACT_MARKER)
      .join('')
      .split(INSTAGRAM_MARKER)
      .join('')
      .trim();

    if (process.env.NODE_ENV !== 'production') {
      const u = response.usage;
      console.log(
        `[chat] in=${u.input_tokens} cache_write=${u.cache_creation_input_tokens ?? 0} cache_read=${u.cache_read_input_tokens ?? 0} out=${u.output_tokens}`,
      );
    }

    return NextResponse.json({ reply, showContact, bookingService, showInstagram });
  } catch (error) {
    // Credit epuizat, cheie invalidă, suprasolicitare, eroare de rețea — vizitatoarea primește
    // un mesaj prietenos cu butoanele de contact; detaliile rămân doar în jurnalul serverului
    if (error instanceof Anthropic.RateLimitError) {
      console.error('[chat] limită de cereri la Anthropic:', error.message);
    } else if (error instanceof Anthropic.APIError) {
      console.error(`[chat] eroare API ${error.status}:`, error.message);
    } else {
      console.error('[chat] eroare:', error);
    }
    return NextResponse.json({ error: 'unavailable' }, { status: 200 });
  }
}
