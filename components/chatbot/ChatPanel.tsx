'use client';

import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { CHAT_CONTACT, CHAT_LIMITS, CHAT_TEXTS, bookingMessage } from '@/lib/chatbot/config';

// bookingService: null/absent = fără programare; '' = programare fără serviciu precizat; text = serviciul dorit
type Msg = {
  role: 'user' | 'assistant';
  content: string;
  showContact?: boolean;
  showInstagram?: boolean;
  bookingService?: string | null;
  local?: boolean;
};

// Conversația se păstrează doar în tabul curent (se șterge la închiderea browserului) — nimic nu se salvează pe server
const STORAGE_KEY = 'ria-chat-v1';

function loadHistory(): Msg[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveHistory(msgs: Msg[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch {
    /* stocare indisponibilă — conversația rămâne doar în pagină */
  }
}

// Afișare sigură pentru Markdown simplu: **bold**, [text](link), liste „- " și rânduri noi (fără HTML injectat)
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      out.push(<strong key={`${keyPrefix}-${i++}`} className="font-medium text-[#4A403A]">{m[1]}</strong>);
    } else {
      const href = m[3];
      const cls = 'text-[#A8894F] underline underline-offset-2 hover:text-[#4A403A]';
      if (href.startsWith('/')) {
        out.push(<Link key={`${keyPrefix}-${i++}`} href={href} className={cls}>{m[2]}</Link>);
      } else if (/^https:\/\/(www\.)?(roxanaicaaesthetic\.com|wa\.me|instagram\.com)\//.test(href)) {
        out.push(<a key={`${keyPrefix}-${i++}`} href={href} target="_blank" rel="noopener noreferrer" className={cls}>{m[2]}</a>);
      } else {
        out.push(m[2]);
      }
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function MessageText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, idx) => {
        const bullet = /^\s*[-•]\s+/.test(line);
        const content = renderInline(line.replace(/^\s*[-•]\s+/, ''), `l${idx}`);
        if (bullet) {
          return (
            <span key={idx} className="flex gap-2">
              <span className="text-[#C6A769]">◇</span>
              <span>{content}</span>
            </span>
          );
        }
        return (
          <Fragment key={idx}>
            {line.trim() === '' ? <span className="block h-2" /> : <span className="block">{content}</span>}
          </Fragment>
        );
      })}
    </>
  );
}

// Contactul este WhatsApp-ul Roxanei; Instagram apare doar pentru poze/video before–after
function ContactButtons({
  bookingService,
  showWhatsapp = true,
  showInstagram = false,
}: {
  bookingService?: string | null;
  showWhatsapp?: boolean;
  showInstagram?: boolean;
}) {
  const isBooking = typeof bookingService === 'string';
  const href = isBooking
    ? `${CHAT_CONTACT.whatsappUrl}?text=${encodeURIComponent(bookingMessage(bookingService || undefined))}`
    : CHAT_CONTACT.whatsappUrl;
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {showWhatsapp && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-wider uppercase text-white"
          style={{ background: 'linear-gradient(135deg, #C9A84C, #8B6914)', fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}
        >
          {isBooking ? 'Programează-te pe WhatsApp' : 'Scrie-i Roxanei pe WhatsApp'}
        </a>
      )}
      {showInstagram && (
        <a
          href={CHAT_CONTACT.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 text-[11px] tracking-wider uppercase text-white"
          style={{ background: 'linear-gradient(135deg, #C9A84C, #8B6914)', fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}
        >
          Vezi rezultatele pe Instagram
        </a>
      )}
    </div>
  );
}

export default function ChatPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Panoul se randează doar în browser (ssr: false), deci istoricul se poate citi direct la inițializare
  const [messages, setMessages] = useState<Msg[]>(loadHistory);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const userCount = messages.filter(m => m.role === 'user').length;
  const limitReached = userCount >= CHAT_LIMITS.maxUserMessagesPerConversation;

  async function send(raw: string) {
    const text = raw.trim().slice(0, CHAT_LIMITS.maxMessageChars);
    if (!text || busy || limitReached) return;

    const next: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    saveHistory(next);
    setInput('');
    setBusy(true);

    let reply: Msg;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Mesajele locale (erori) nu se trimit înapoi la AI
        body: JSON.stringify({ messages: next.filter(m => !m.local).map(({ role, content }) => ({ role, content })) }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && typeof data.reply === 'string') {
        const bookingService = typeof data.bookingService === 'string' ? data.bookingService : null;
        // Butonul general de WhatsApp nu se repetă la mesaje consecutive (cel de programare apare mereu)
        const lastReply = [...messages].reverse().find(m => m.role === 'assistant');
        const repeatContact = bookingService === null && !!lastReply?.showContact;
        reply = {
          role: 'assistant',
          content: data.reply,
          showContact: !!data.showContact && !repeatContact,
          showInstagram: !!data.showInstagram,
          bookingService,
        };
      } else if (res.status === 429) {
        reply = { role: 'assistant', content: 'Ai trimis multe mesaje într-un timp scurt. Te rog încearcă din nou peste un minut sau scrie-i direct Roxanei pe WhatsApp.', showContact: true, local: true };
      } else {
        reply = { role: 'assistant', content: CHAT_TEXTS.unavailable, showContact: true, local: true };
      }
    } catch {
      reply = { role: 'assistant', content: 'Nu am putut trimite mesajul — verifică, te rog, conexiunea la internet și încearcă din nou. Îi poți scrie și direct Roxanei pe WhatsApp.', showContact: true, local: true };
    }

    // Un mesaj de eroare local nu trebuie să lase conversația cu doi „user" la rând pentru AI:
    // întrebarea rămâne afișată, dar e scoasă din istoricul trimis data viitoare
    const final: Msg[] = reply.local
      ? [...next.slice(0, -1), { ...next[next.length - 1], local: true }, reply]
      : [...next, reply];
    setMessages(final);
    saveHistory(final);
    setBusy(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Asistent virtual Roxana Ica Aesthetic"
      aria-hidden={!open}
      className={`fixed z-[60] flex flex-col bg-[#F8F6F2] border border-[#C6A769]/40 shadow-[0_24px_60px_rgba(74,64,58,0.30)] transition-all duration-300 origin-bottom-right
        inset-x-3 bottom-3 top-20 sm:inset-x-auto sm:top-auto sm:right-5 sm:bottom-24 sm:w-[380px] sm:h-[min(600px,calc(100vh-8rem))]
        ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none invisible'}`}
    >
      {/* Antet */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#4A403A]">
        {/* div-uri, nu <p>: stilul global „p { color }” din globals.css ar suprascrie culorile */}
        <div>
          <div className="text-[#F8F6F2] text-lg leading-tight" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
            {CHAT_TEXTS.title}
          </div>
          <div className="text-[#C6A769] text-[10px] tracking-[0.2em] uppercase mt-0.5" style={{ fontFamily: 'var(--font-montserrat)' }}>
            {CHAT_TEXTS.subtitle}
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Închide" className="text-[#D8B7A6] hover:text-white p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Mesaje */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3" style={{ fontFamily: 'var(--font-montserrat)' }} aria-live="polite">
        <div className="max-w-[88%] bg-white border border-[#E8E1D8] px-4 py-3 text-[13px] leading-relaxed text-[#5C524B]">
          {CHAT_TEXTS.greeting}
        </div>

        {messages.length === 0 && (
          <div className="flex flex-col items-start gap-2 mt-1">
            {CHAT_TEXTS.quickReplies.map(q => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="text-left text-[12px] px-3 py-2 border border-[#C6A769]/60 text-[#8B6914] bg-[#F8F6F2] hover:bg-[#C6A769] hover:text-white transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) =>
          m.role === 'user' ? (
            <div key={i} className="self-end max-w-[85%] bg-[#4A403A] text-[#F8F6F2] px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap break-words">
              {m.content}
            </div>
          ) : (
            <div key={i} className="max-w-[88%] bg-white border border-[#E8E1D8] px-4 py-3 text-[13px] leading-relaxed text-[#5C524B] break-words">
              <MessageText text={m.content} />
              {(m.showContact || m.showInstagram) && (
                <ContactButtons bookingService={m.bookingService} showWhatsapp={!!m.showContact} showInstagram={!!m.showInstagram} />
              )}
            </div>
          ),
        )}

        {busy && (
          <div className="flex items-center gap-1.5 bg-white border border-[#E8E1D8] px-4 py-3 w-fit" aria-label="Asistentul scrie">
            {[0, 1, 2].map(d => (
              <span key={d} className="h-1.5 w-1.5 rounded-full bg-[#C6A769] animate-bounce" style={{ animationDelay: `${d * 150}ms` }} />
            ))}
          </div>
        )}

        {limitReached && (
          <div className="text-[12px] text-[#7A6F66] bg-[#E8E1D8]/60 px-4 py-3">
            Am ajuns la numărul maxim de mesaje pentru această conversație. Pentru alte întrebări, scrie-i direct Roxanei pe WhatsApp.
            <ContactButtons />
          </div>
        )}
      </div>

      {/* Câmp mesaj */}
      <form
        onSubmit={e => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-[#E8E1D8] bg-white p-3"
      >
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value.slice(0, CHAT_LIMITS.maxMessageChars))}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder="Scrie întrebarea ta..."
            disabled={limitReached}
            aria-label="Mesaj"
            className="flex-1 resize-none max-h-28 px-3 py-2.5 text-[16px] sm:text-[13px] text-[#4A403A] bg-[#F8F6F2] border border-[#E8E1D8] focus:border-[#C6A769] outline-none placeholder:text-[#A39A92]"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          />
          <button
            type="submit"
            disabled={busy || !input.trim() || limitReached}
            aria-label="Trimite"
            className="h-[42px] w-[42px] flex items-center justify-center text-white disabled:opacity-40 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #C9A84C, #8B6914)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
        <div className="text-[10px] text-[#A39A92] mt-2 text-center" style={{ fontFamily: 'var(--font-montserrat)' }}>
          Asistent AI · pentru programări și confirmări scrie-ne pe{' '}
          <a href={CHAT_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#8B6914]">WhatsApp</a>
        </div>
      </form>
    </div>
  );
}
