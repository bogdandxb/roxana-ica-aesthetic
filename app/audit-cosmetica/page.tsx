'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  SECTIONS, SCALE_LABELS, computeScore,
  type AuditQuestion, type ScoreResult,
} from '@/lib/audit-cosmetica';

const GOLD = '#C6A769';
const TAUPE = '#4A403A';
const IVORY = '#F8F6F2';
const BEIGE = '#E8E1D8';

// pași = secțiunile 1..8 (secțiunea 0 „Date participantă" e primul pas)
const STEPS = SECTIONS; // 0..8 → 9 pași
const TOTAL_STEPS = STEPS.length;

type Answers = Record<string, string>;

// ─── Componente ──────────────────────────────────────────────────────────────

function SectionHeader({ nr, title, subtitle }: { nr: number; title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: subtitle ? 10 : 0 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 6, background: TAUPE, color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: 13, flexShrink: 0,
        }}>{nr === 0 ? '·' : String(nr).padStart(2, '0')}</div>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 600, color: TAUPE, margin: 0, lineHeight: 1.2 }}>{title}</h2>
      </div>
      {subtitle && (
        <p style={{ fontSize: 13, color: '#7A6F66', fontFamily: 'var(--font-montserrat)', fontWeight: 300, lineHeight: 1.6, marginLeft: 48 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function FieldLabel({ children, nr }: { children: React.ReactNode; nr?: number }) {
  return (
    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: TAUPE, marginBottom: 10, fontFamily: 'var(--font-montserrat)', lineHeight: 1.5 }}>
      {nr ? <span style={{ color: GOLD, marginRight: 6 }}>{nr}.</span> : null}
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', border: `1px solid ${BEIGE}`, borderRadius: 8,
  fontSize: 14, color: TAUPE, outline: 'none', fontFamily: 'var(--font-montserrat)',
  background: 'white', boxSizing: 'border-box',
};

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />;
}

function TextArea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
  );
}

function ChoiceButtons({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map(opt => {
        const active = value === opt;
        return (
          <button key={opt} type="button" onClick={() => onChange(opt)}
            style={{
              padding: '10px 22px', borderRadius: 8,
              border: `1.5px solid ${active ? GOLD : BEIGE}`,
              background: active ? '#FBF7F0' : 'white',
              color: active ? TAUPE : '#7A6F66',
              fontSize: 14, fontWeight: active ? 600 : 400, cursor: 'pointer',
              fontFamily: 'var(--font-montserrat)', transition: 'all 0.15s',
            }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// Scala 0–5, butoane mari (mobile-first)
function ScaleInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const selected = value === '' ? null : Number(value);
  return (
    <div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {[0, 1, 2, 3, 4, 5].map(n => {
          const active = selected === n;
          return (
            <button key={n} type="button" onClick={() => onChange(String(n))}
              style={{
                flex: 1, minWidth: 0, aspectRatio: '1 / 1', maxHeight: 56,
                borderRadius: 10,
                border: `2px solid ${active ? GOLD : BEIGE}`,
                background: active ? GOLD : 'white',
                color: active ? 'white' : '#9A8F84',
                fontSize: 18, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'var(--font-cormorant)', transition: 'all 0.15s',
              }}>
              {n}
            </button>
          );
        })}
      </div>
      <p style={{
        fontSize: 12, color: selected === null ? '#B0A79C' : GOLD, fontStyle: 'italic',
        fontFamily: 'var(--font-montserrat)', minHeight: 18, transition: 'color 0.15s',
      }}>
        {selected === null ? 'Alege un nivel de la 0 la 5' : SCALE_LABELS[selected]}
      </p>
    </div>
  );
}

function QuestionBlock({ q, answers, set }: { q: AuditQuestion; answers: Answers; set: (k: string, v: string) => void }) {
  if (q.type === 'choice') {
    return (
      <div style={{ marginBottom: 26 }}>
        <FieldLabel nr={q.nr || undefined}>{q.text}</FieldLabel>
        <ChoiceButtons options={q.options!} value={answers[q.key] || ''} onChange={v => set(q.key, v)} />
      </div>
    );
  }

  if (q.type === 'text') {
    return (
      <div style={{ marginBottom: 26 }}>
        <FieldLabel nr={q.nr || undefined}>{q.text}</FieldLabel>
        <TextArea value={answers[q.key] || ''} onChange={v => set(q.key, v)} />
      </div>
    );
  }

  // scale
  return (
    <div style={{ marginBottom: 26, background: 'white', border: `1px solid ${BEIGE}`, borderRadius: 12, padding: '18px 18px 14px' }}>
      <FieldLabel nr={q.nr || undefined}>{q.text}</FieldLabel>
      <ScaleInput value={answers[q.key] || ''} onChange={v => set(q.key, v)} />
      {q.hasText && q.textKey && (
        <div style={{ marginTop: 12 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#9A8F84', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontFamily: 'var(--font-montserrat)' }}>
            {q.textLabel || 'Explică pe scurt'}
          </label>
          <TextArea value={answers[q.textKey] || ''} onChange={v => set(q.textKey!, v)} rows={2} placeholder="Opțional, dar ajută mult analiza" />
        </div>
      )}
    </div>
  );
}

// ─── Rezultat ────────────────────────────────────────────────────────────────

function ResultView({ score }: { score: ScoreResult }) {
  return (
    <div style={{ minHeight: '100vh', background: IVORY }}>
      <div style={{ background: TAUPE, padding: '40px 20px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase', marginBottom: 10 }}>Rezultatul auditului tău</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', fontWeight: 600, color: 'white', marginBottom: 4 }}>{score.overallNivel.label}</h1>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'rgba(255,255,255,0.65)', maxWidth: 460, margin: '8px auto 0', lineHeight: 1.6 }}>
          {score.overallNivel.descriere}
        </p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 100px' }}>

        {/* Bare pe competențe */}
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.4rem', color: TAUPE, marginBottom: 20 }}>Nivelul tău pe competențe</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 44 }}>
          {score.perSection.map(s => (
            <div key={s.nr}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6, gap: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: TAUPE, fontFamily: 'var(--font-montserrat)' }}>{s.title}</span>
                <span style={{ fontSize: 12, color: s.nivel.color, fontWeight: 600, fontFamily: 'var(--font-montserrat)', flexShrink: 0 }}>{s.nivel.label}</span>
              </div>
              <div style={{ height: 8, background: BEIGE, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(s.medie / 5) * 100}%`, background: s.nivel.color, borderRadius: 4, transition: 'width 0.5s' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Ce stăpânești / Ce merită aprofundat / Priorități */}
        <div style={{ display: 'grid', gap: 16, marginBottom: 44 }}>
          <ResultBlock title="Ce stăpânești deja" items={score.stapanesti} empty="Continuă să exersezi — fiecare secțiune are loc de creștere." accent="#8C6A42" />
          <ResultBlock title="Ce merită aprofundat" items={score.aprofundat} empty="—" accent="#A67C4E" />
          <ResultBlock title="Prioritățile tale de dezvoltare" items={score.prioritati} empty="Nicio zonă critică — ai o bază echilibrată." accent="#C89B6B" />
        </div>

        {/* Mesaj final */}
        <div style={{ background: 'white', border: `1px solid ${BEIGE}`, borderRadius: 12, padding: '28px 24px', textAlign: 'center', marginBottom: 28 }}>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.15rem', color: TAUPE, lineHeight: 1.7, fontStyle: 'italic' }}>
            Următorul pas nu este să înveți cât mai multe proceduri. Este să înțelegi suficient de bine pielea încât să știi ce procedură alegi, pentru cine, când și de ce.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <a href="https://wa.me/40771569093?text=Bun%C4%83%2C%20am%20completat%20auditul%20de%20nivel%20%C8%99i%20a%C8%99%20dori%20o%20evaluare%20personalizat%C4%83."
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-block', padding: '15px 40px', background: GOLD, color: 'white',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
              fontFamily: 'var(--font-montserrat)', textDecoration: 'none', borderRadius: 10,
            }}>
            Vreau o evaluare personalizată
          </a>
          <div style={{ marginTop: 20 }}>
            <Link href="/servicii/mentorat-cursuri" style={{ fontSize: 12, color: '#7A6F66', fontFamily: 'var(--font-montserrat)', textDecoration: 'underline' }}>
              ← Înapoi la Mentorat &amp; Cursuri
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultBlock({ title, items, empty, accent }: { title: string; items: string[]; empty: string; accent: string }) {
  return (
    <div style={{ background: 'white', border: `1px solid ${BEIGE}`, borderRadius: 12, padding: '20px 22px', borderLeft: `3px solid ${accent}` }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-montserrat)', marginBottom: 12 }}>{title}</p>
      {items.length === 0 ? (
        <p style={{ fontSize: 13, color: '#9A8F84', fontFamily: 'var(--font-montserrat)', fontStyle: 'italic' }}>{empty}</p>
      ) : (
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map(it => (
            <li key={it} style={{ fontSize: 13, color: TAUPE, fontFamily: 'var(--font-montserrat)', display: 'flex', gap: 8 }}>
              <span style={{ color: accent, flexShrink: 0 }}>◇</span>{it}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Pagină ──────────────────────────────────────────────────────────────────

export default function AuditCosmeticaPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(-1); // -1 = intro, 0..8 = secțiuni
  const [gdpr, setGdpr] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ScoreResult | null>(null);

  function set(key: string, value: string) {
    setAnswers(a => ({ ...a, [key]: value }));
  }

  function goNext() {
    // validare pas 0 — nume obligatoriu
    if (step === 0 && !(answers.nume || '').trim()) {
      setError('Te rog completează numele și prenumele.');
      return;
    }
    setError('');
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    setError('');
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit() {
    if (!(answers.nume || '').trim()) { setError('Numele este obligatoriu.'); setStep(0); return; }
    if (!gdpr) { setError('Este necesar acordul pentru prelucrarea datelor.'); return; }
    setError('');
    setSubmitting(true);
    try {
      const score = computeScore(answers);
      const res = await fetch('/api/audit-cosmetica/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...answers,
          gdpr_consent: true,
          scor_general: score.overall,
          scor_pe_sectiuni: Object.fromEntries(score.perSection.map(s => [s.nr, s.medie])),
        }),
      });
      if (!res.ok) throw new Error('server');
      setResult(score);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('A apărut o eroare la trimitere. Te rog încearcă din nou.');
    } finally {
      setSubmitting(false);
    }
  }

  // ── Rezultat ──
  if (result) return <ResultView score={result} />;

  // ── Intro ──
  if (step === -1) {
    return (
      <div style={{ minHeight: '100vh', background: IVORY, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{ maxWidth: 560, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', marginBottom: 16 }}>
            Roxana Ica Aesthetic
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 500, color: TAUPE, lineHeight: 1.2, marginBottom: 24 }}>
            Descoperă unde te afli profesional
          </h1>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 15, color: '#7A6F66', fontWeight: 300, lineHeight: 1.8, marginBottom: 36 }}>
            Acest audit nu este un examen. Este un instrument prin care poți identifica ce stăpânești deja,
            unde există informații care trebuie aprofundate și ce ai nevoie să dezvolți pentru a lucra
            cu mai multă siguranță și încredere.
          </p>
          <div style={{ fontSize: 13, color: '#9A8F84', fontFamily: 'var(--font-montserrat)', marginBottom: 36 }}>
            8 secțiuni · ~15 minute · răspunsurile se salvează pe măsură ce avansezi
          </div>
          <button type="button" onClick={() => setStep(0)}
            style={{
              padding: '15px 44px', background: GOLD, color: 'white', border: 'none', borderRadius: 10,
              fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'var(--font-montserrat)',
            }}>
            Începe auditul
          </button>
          <div style={{ marginTop: 24 }}>
            <Link href="/servicii/mentorat-cursuri" style={{ fontSize: 12, color: '#9A8F84', fontFamily: 'var(--font-montserrat)', textDecoration: 'underline' }}>
              ← Înapoi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const section = STEPS[step];
  const isLast = step === TOTAL_STEPS - 1;

  return (
    <div style={{ minHeight: '100vh', background: IVORY }}>
      {/* Header */}
      <div style={{ background: TAUPE, padding: '28px 20px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase', marginBottom: 6 }}>Roxana Ica Aesthetic</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.5rem, 4.5vw, 2.2rem)', fontWeight: 600, color: 'white' }}>Audit: Nivelul de pregătire în cosmetică</h1>
      </div>

      {/* Progress */}
      <div style={{ background: 'white', borderBottom: `1px solid ${BEIGE}`, padding: '12px 20px', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#7A6F66', fontFamily: 'var(--font-montserrat)' }}>Pasul {step + 1} din {TOTAL_STEPS}</span>
            <span style={{ fontSize: 12, color: GOLD, fontWeight: 600, fontFamily: 'var(--font-montserrat)' }}>{section.title}</span>
          </div>
          <div style={{ height: 4, background: BEIGE, borderRadius: 4 }}>
            <div style={{ height: '100%', background: GOLD, borderRadius: 4, width: `${((step + 1) / TOTAL_STEPS) * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 120px' }}>
        <SectionHeader nr={section.nr} title={section.title} subtitle={section.subtitle} />

        {/* Date participantă — grid pentru câmpurile scurte */}
        {step === 0 ? (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 8 }}>
              <div>
                <FieldLabel>Nume și prenume *</FieldLabel>
                <TextInput value={answers.nume || ''} onChange={v => set('nume', v)} placeholder="Numele tău" />
              </div>
              <div>
                <FieldLabel>Telefon</FieldLabel>
                <TextInput value={answers.telefon || ''} onChange={v => set('telefon', v)} placeholder="07xx xxx xxx" />
              </div>
              <div>
                <FieldLabel>E-mail</FieldLabel>
                <TextInput value={answers.email || ''} onChange={v => set('email', v)} placeholder="email@exemplu.ro" />
              </div>
              <div>
                <FieldLabel>Când ai terminat cursul de cosmetică?</FieldLabel>
                <TextInput value={answers.terminat_curs || ''} onChange={v => set('terminat_curs', v)} placeholder="ex: 2023" />
              </div>
            </div>
            <div style={{ marginTop: 18 }}>
              <FieldLabel>Lucrezi deja cu cliente?</FieldLabel>
              <ChoiceButtons options={['Da', 'Nu']} value={answers.lucreaza_cu_cliente || ''} onChange={v => set('lucreaza_cu_cliente', v)} />
            </div>
            <div style={{ marginTop: 22 }}>
              <FieldLabel>Ce proceduri efectuezi în prezent?</FieldLabel>
              <TextArea value={answers.proceduri_actuale || ''} onChange={v => set('proceduri_actuale', v)} />
            </div>
            <div style={{ marginTop: 22 }}>
              <FieldLabel>Ce proceduri ai vrea să înveți?</FieldLabel>
              <TextArea value={answers.proceduri_dorite || ''} onChange={v => set('proceduri_dorite', v)} />
            </div>
          </div>
        ) : (
          <div>
            {section.questions.map(q => (
              <QuestionBlock key={q.key} q={q} answers={answers} set={set} />
            ))}
          </div>
        )}

        {/* GDPR — pe ultimul pas */}
        {isLast && (
          <div style={{ background: 'white', border: `1px solid ${BEIGE}`, borderRadius: 12, padding: 20, marginTop: 24 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
              <input type="checkbox" checked={gdpr} onChange={e => setGdpr(e.target.checked)}
                style={{ width: 18, height: 18, marginTop: 2, accentColor: GOLD, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: '#7A6F66', fontFamily: 'var(--font-montserrat)', lineHeight: 1.7 }}>
                Sunt de acord ca datele completate în acest audit să fie utilizate de Roxana Ica Aesthetic
                exclusiv pentru analiza nivelului meu de pregătire și formularea unei recomandări de dezvoltare
                personalizate. Datele nu vor fi transmise către terți. *
              </span>
            </label>
          </div>
        )}

        {error && (
          <p style={{ color: '#C0392B', fontSize: 13, marginTop: 16, fontFamily: 'var(--font-montserrat)' }}>{error}</p>
        )}

        {/* Navigare */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, gap: 12 }}>
          <button onClick={goBack} type="button"
            style={{
              padding: '12px 28px', border: `1.5px solid ${BEIGE}`, borderRadius: 10, background: 'white',
              fontSize: 13, color: TAUPE, cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontWeight: 500,
            }}>
            ← Înapoi
          </button>

          {isLast ? (
            <button onClick={handleSubmit} disabled={submitting} type="button"
              style={{
                padding: '12px 34px', border: 'none', borderRadius: 10,
                background: submitting ? BEIGE : GOLD, color: 'white', fontSize: 13, fontWeight: 600,
                cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-montserrat)',
              }}>
              {submitting ? 'Se trimite…' : 'Vezi rezultatul →'}
            </button>
          ) : (
            <button onClick={goNext} type="button"
              style={{
                padding: '12px 34px', border: 'none', borderRadius: 10, background: GOLD, color: 'white',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-montserrat)',
              }}>
              Continuă →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
