'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Tipuri ────────────────────────────────────────────────────────────────
interface Answers {
  nume: string;
  telefon: string;
  gdpr_consent: boolean;
  q1_varsta: string;
  q2_copii: string;
  q3_sport: string;
  q4_motiv_sport: string[];   // multi-select
  q5_grija_de_mine: string[]; // multi-select
  q6_alimentatie: string;
  q7_nutritie: string;
  q8_masa_musculara: string;
  q9_sport_suficient: string;
  q10_fermitate: string;
  q11_organ_activ: string;
  q12_fibroblast: string;
  q13_fibroblast_colagen: string;
  q14_fata_greutati: string;
  q15_tratamente_fibroblast: string;
  q16_cunosti_pielea: string;
  q17_viitor_piele: string;
  q18_sport_piele: string;
  q19_fermitate_fata: string;
  q20_observi: string[];      // multi-select
  q21_normala: string;
  q22_problema: string[];     // multi-select
  q23_slabit: string;
  q24_tratamente: string;
  q25_tratament_facial: string;
  q26_explicatii: string;
  q27_plan_termen: string;
  q28_bariere: string;
  q29_mai_multa_grija: string;
  q30_lipseste: string;
  doreste_analiza: boolean | null;
  analiza_consent: boolean;
}

const EMPTY: Answers = {
  nume: '', telefon: '', gdpr_consent: false,
  q1_varsta: '', q2_copii: '', q3_sport: '',
  q4_motiv_sport: [], q5_grija_de_mine: [],
  q6_alimentatie: '', q7_nutritie: '', q8_masa_musculara: '',
  q9_sport_suficient: '', q10_fermitate: '', q11_organ_activ: '', q12_fibroblast: '',
  q13_fibroblast_colagen: '', q14_fata_greutati: '', q15_tratamente_fibroblast: '',
  q16_cunosti_pielea: '', q17_viitor_piele: '', q18_sport_piele: '', q19_fermitate_fata: '',
  q20_observi: [], q21_normala: '', q22_problema: [], q23_slabit: '',
  q24_tratamente: '', q25_tratament_facial: '', q26_explicatii: '', q27_plan_termen: '',
  q28_bariere: '', q29_mai_multa_grija: '', q30_lipseste: '',
  doreste_analiza: null, analiza_consent: false,
};

// ─── Secțiuni ──────────────────────────────────────────────────────────────
const SECTIONS = [
  { title: 'Date de contact', subtitle: 'Câteva date pentru a putea reveni cu rezultatele.' },
  { title: 'Despre tine', subtitle: 'Câteva întrebări despre stilul tău de viață.' },
  { title: 'Cât investești în corp?', subtitle: 'Alimentație, sport și corpul tău.' },
  { title: 'Dar cât știi despre piele?', subtitle: 'Cunoașterea pielii tale ca organ.' },
  { title: 'Uită-te la pielea ta', subtitle: 'Ce observi și cum reacționezi.' },
  { title: 'Cât investești în piele?', subtitle: 'Tratamente și îngrijire profesională.' },
  { title: 'Schimbăm perspectiva', subtitle: 'Ultimele două întrebări.' },
];

// ─── Buton opțiune single-select ───────────────────────────────────────────
function OptionBtn({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left transition-all duration-150 active:scale-[0.99]"
      style={{
        fontFamily: 'var(--font-montserrat)',
        fontWeight: selected ? 500 : 400,
        borderColor: selected ? '#C6A769' : '#E8E1D8',
        background: selected ? '#FBF7F0' : 'white',
        color: selected ? '#4A403A' : '#7A6F66',
        borderRadius: 0,
        boxShadow: selected ? '0 0 0 1.5px #C6A769' : '0 0 0 1px #E8E1D8',
        padding: '14px 18px',
        border: 'none',
        minHeight: 52,
      }}
    >
      <span className="flex items-center gap-3">
        <span
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            width: 20, height: 20,
            borderRadius: '50%',
            border: `2px solid ${selected ? '#C6A769' : '#CBD5E1'}`,
            background: selected ? '#C6A769' : 'white',
          }}
        >
          {selected && (
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', display: 'block' }} />
          )}
        </span>
        <span className="text-sm leading-snug">{label}</span>
      </span>
    </button>
  );
}

// ─── Buton opțiune multi-select ────────────────────────────────────────────
function CheckBtn({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left transition-all duration-150 active:scale-[0.99]"
      style={{
        fontFamily: 'var(--font-montserrat)',
        fontWeight: selected ? 500 : 400,
        background: selected ? '#FBF7F0' : 'white',
        color: selected ? '#4A403A' : '#7A6F66',
        borderRadius: 0,
        boxShadow: selected ? '0 0 0 1.5px #C6A769' : '0 0 0 1px #E8E1D8',
        padding: '14px 18px',
        border: 'none',
        minHeight: 52,
      }}
    >
      <span className="flex items-center gap-3">
        <span
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            width: 20, height: 20,
            borderRadius: 3,
            border: `2px solid ${selected ? '#C6A769' : '#CBD5E1'}`,
            background: selected ? '#C6A769' : 'white',
          }}
        >
          {selected && (
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
              <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
        <span className="text-sm leading-snug">{label}</span>
      </span>
    </button>
  );
}

// ─── Întrebare single ───────────────────────────────────────────────────────
function Question({ nr, text, options, value, onChange }: {
  nr: number; text: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="mb-8">
      <p className="mb-4" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, color: '#4A403A', lineHeight: 1.5, fontSize: '1.1rem' }}>
        <span style={{ color: '#C6A769', fontFamily: 'var(--font-montserrat)', fontSize: '0.7rem', fontWeight: 600, marginRight: '0.5rem', letterSpacing: '0.05em' }}>
          {nr}.
        </span>
        {text}
      </p>
      <div className="flex flex-col gap-2">
        {options.map(opt => (
          <OptionBtn key={opt} label={opt} selected={value === opt} onClick={() => onChange(opt)} />
        ))}
      </div>
    </div>
  );
}

// ─── Întrebare multi ────────────────────────────────────────────────────────
function MultiQuestion({ nr, text, options, value, onChange }: {
  nr: number; text: string; options: string[]; value: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter(x => x !== opt) : [...value, opt]);
  };
  return (
    <div className="mb-8">
      <p className="mb-1" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400, color: '#4A403A', lineHeight: 1.5, fontSize: '1.1rem' }}>
        <span style={{ color: '#C6A769', fontFamily: 'var(--font-montserrat)', fontSize: '0.7rem', fontWeight: 600, marginRight: '0.5rem', letterSpacing: '0.05em' }}>
          {nr}.
        </span>
        {text}
      </p>
      <p className="mb-4 text-xs" style={{ fontFamily: 'var(--font-montserrat)', color: '#B8952A', letterSpacing: '0.04em' }}>
        Poți selecta mai multe răspunsuri
      </p>
      <div className="flex flex-col gap-2">
        {options.map(opt => (
          <CheckBtn key={opt} label={opt} selected={value.includes(opt)} onClick={() => toggle(opt)} />
        ))}
      </div>
    </div>
  );
}

// ─── Progress Bar ───────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-montserrat)', color: '#B8952A', fontWeight: 500 }}>
          Pasul {step} din {total}
        </span>
        <span className="text-xs" style={{ fontFamily: 'var(--font-montserrat)', color: '#9CA3AF' }}>
          {pct}% completat
        </span>
      </div>
      <div style={{ height: 2, width: '100%', background: '#E8E1D8', borderRadius: 4 }}>
        <div
          style={{ height: 2, width: `${pct}%`, background: 'linear-gradient(90deg, #C9A84C, #C6A769)', borderRadius: 4, transition: 'width 0.5s ease' }}
        />
      </div>
    </div>
  );
}

// ─── Componenta principală ──────────────────────────────────────────────────
export default function SurveyClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));

  const set = (key: keyof Answers) => (val: string | boolean | string[]) =>
    setAnswers(prev => ({ ...prev, [key]: val }));

  useEffect(() => {
    fetch('/api/survey/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type: 'survey_started', session_id: sessionId }),
    }).catch(() => {});
  }, [sessionId]);

  const validateStep = useCallback(() => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!answers.nume.trim()) e.nume = 'Numele este obligatoriu';
      if (!answers.telefon.trim()) e.telefon = 'Telefonul este obligatoriu';
      if (!answers.gdpr_consent) e.gdpr = 'Acordul este obligatoriu pentru a continua';
    }
    if (step === 1) {
      if (!answers.q1_varsta) e.q1 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q2_copii) e.q2 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q3_sport) e.q3 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q4_motiv_sport.length) e.q4 = 'Te rugăm să selectezi cel puțin o opțiune';
      if (!answers.q5_grija_de_mine.length) e.q5 = 'Te rugăm să selectezi cel puțin o opțiune';
    }
    if (step === 2) {
      if (!answers.q6_alimentatie) e.q6 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q7_nutritie) e.q7 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q8_masa_musculara) e.q8 = 'Te rugăm să selectezi o opțiune';
    }
    if (step === 3) {
      if (!answers.q9_sport_suficient) e.q9 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q10_fermitate) e.q10 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q11_organ_activ) e.q11 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q12_fibroblast) e.q12 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q13_fibroblast_colagen) e.q13 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q14_fata_greutati) e.q14 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q15_tratamente_fibroblast) e.q15 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q16_cunosti_pielea) e.q16 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q17_viitor_piele) e.q17 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q18_sport_piele) e.q18 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q19_fermitate_fata) e.q19 = 'Te rugăm să selectezi o opțiune';
    }
    if (step === 4) {
      if (!answers.q20_observi.length) e.q20 = 'Te rugăm să selectezi cel puțin o opțiune';
      if (!answers.q21_normala) e.q21 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q22_problema.length) e.q22 = 'Te rugăm să selectezi cel puțin o opțiune';
      if (!answers.q23_slabit) e.q23 = 'Te rugăm să selectezi o opțiune';
    }
    if (step === 5) {
      if (!answers.q24_tratamente) e.q24 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q25_tratament_facial) e.q25 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q26_explicatii) e.q26 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q27_plan_termen) e.q27 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q28_bariere) e.q28 = 'Te rugăm să selectezi o opțiune';
    }
    if (step === 6) {
      if (!answers.q29_mai_multa_grija) e.q29 = 'Te rugăm să selectezi o opțiune';
      if (!answers.q30_lipseste) e.q30 = 'Te rugăm să selectezi o opțiune';
      if (answers.doreste_analiza === null) e.cta = 'Te rugăm să selectezi o opțiune';
      if (answers.doreste_analiza === true && !answers.analiza_consent) e.analiza_consent = 'Acordul este obligatoriu';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [step, answers]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (!validateStep()) { scrollTop(); return; }
    setStep(s => s + 1);
    scrollTop();
  };

  const handleBack = () => {
    setStep(s => s - 1);
    scrollTop();
  };

  // Serializează array-urile ca string CSV pentru Supabase (TEXT column)
  const serializeAnswers = () => ({
    ...answers,
    q4_motiv_sport: answers.q4_motiv_sport.join(', '),
    q5_grija_de_mine: answers.q5_grija_de_mine.join(', '),
    q20_observi: answers.q20_observi.join(', '),
    q22_problema: answers.q22_problema.join(', '),
  });

  const handleSubmit = async () => {
    if (!validateStep()) { scrollTop(); return; }
    setSubmitting(true);
    try {
      const res = await fetch('/api/survey/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serializeAnswers()),
      });
      if (!res.ok) throw new Error('Submit failed');

      await fetch('/api/survey/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type: 'survey_completed', session_id: sessionId }),
      });

      if (answers.doreste_analiza) {
        await fetch('/api/survey/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event_type: 'facial_analysis_requested', session_id: sessionId }),
        });
      }

      setSubmitted(true);
      scrollTop();
    } catch {
      setErrors({ submit: 'A apărut o eroare. Te rugăm să încerci din nou.' });
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Ecran mulțumesc ────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="gold-line mx-auto mb-8" />
        <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, color: '#4A403A' }}>
          Mulțumesc că ai ales să fii parte din acest demers.
        </h2>
        <p className="text-lg md:text-xl leading-relaxed mb-4" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#7A6F66' }}>
          Să ai grijă de tine nu este un lux. Este o normalitate.
        </p>
        <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', color: '#7A6F66' }}>
          Iar grija pentru tine înseamnă și corp, și piele, și stare de bine.
        </p>
        <div className="gold-line mx-auto mt-8 mb-8" />
        {answers.doreste_analiza && (
          <div className="p-6 border border-[#E8E1D8] bg-white mb-8">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-montserrat)', color: '#C6A769', fontWeight: 500 }}>
              Te așteptăm
            </p>
            <p style={{ fontFamily: 'var(--font-cormorant)', color: '#4A403A', fontSize: '1.1rem' }}>
              Vei fi contactată în curând pentru programarea analizei faciale gratuite.
            </p>
          </div>
        )}
        <a href="/" className="inline-block btn-gold" style={{ fontFamily: 'var(--font-montserrat)' }}>
          Înapoi la pagina principală
        </a>
      </div>
    );
  }

  // ─── Layout survey ──────────────────────────────────────────────────────
  const section = SECTIONS[step];

  return (
    <div className="max-w-xl mx-auto px-4">

      {/* Header — doar la pasul 0 */}
      {step === 0 && (
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.25em] mb-3 block" style={{ fontFamily: 'var(--font-montserrat)', color: '#B8952A', fontWeight: 500 }}>
            Chestionar
          </span>
          <h1 className="text-3xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, color: '#4A403A' }}>
            Cât de bine îți cunoști pielea?
          </h1>
          <div className="gold-line mx-auto mb-4" />
          <p className="text-base md:text-lg" style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#7A6F66' }}>
            Un chestionar despre corp, piele și felul în care alegem să avem grijă de noi în timp.
          </p>
        </div>
      )}

      {/* Progress */}
      <ProgressBar step={step + 1} total={SECTIONS.length} />

      {/* Card */}
      <div className="bg-white border border-[#E8E1D8] p-5 md:p-10 mb-5" style={{ boxShadow: '0 2px 20px rgba(74,64,58,0.06)' }}>

        {/* Titlu secțiune */}
        <div className="mb-7">
          <p className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-montserrat)', color: '#C6A769', fontWeight: 500 }}>
            {section.title}
          </p>
          <p className="text-sm" style={{ fontFamily: 'var(--font-montserrat)', color: '#9CA3AF' }}>
            {section.subtitle}
          </p>
        </div>

        {/* ── Pasul 0: Date contact ── */}
        {step === 0 && (
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-montserrat)', color: '#7A6F66', fontWeight: 500 }}>
                Nume și prenume *
              </label>
              <input
                type="text"
                value={answers.nume}
                onChange={e => set('nume')(e.target.value)}
                placeholder="ex: Maria Popescu"
                autoComplete="name"
                style={{
                  width: '100%', padding: '14px 16px', fontSize: 15,
                  fontFamily: 'var(--font-montserrat)',
                  borderColor: errors.nume ? '#DC2626' : '#E8E1D8',
                  border: `1px solid ${errors.nume ? '#DC2626' : '#E8E1D8'}`,
                  color: '#4A403A', background: '#FDFCFB', borderRadius: 0, outline: 'none',
                }}
              />
              {errors.nume && <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{errors.nume}</p>}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: 'var(--font-montserrat)', color: '#7A6F66', fontWeight: 500 }}>
                Număr de telefon *
              </label>
              <input
                type="tel"
                value={answers.telefon}
                onChange={e => set('telefon')(e.target.value)}
                placeholder="ex: 0770 123 456"
                autoComplete="tel"
                style={{
                  width: '100%', padding: '14px 16px', fontSize: 15,
                  fontFamily: 'var(--font-montserrat)',
                  border: `1px solid ${errors.telefon ? '#DC2626' : '#E8E1D8'}`,
                  color: '#4A403A', background: '#FDFCFB', borderRadius: 0, outline: 'none',
                }}
              />
              {errors.telefon && <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{errors.telefon}</p>}
            </div>
            <div className="pt-3 border-t border-[#F0EBE4]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={answers.gdpr_consent}
                  onChange={e => set('gdpr_consent')(e.target.checked)}
                  className="mt-1 flex-shrink-0"
                  style={{ accentColor: '#C6A769', width: 18, height: 18 }}
                />
                <span className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', color: '#7A6F66' }}>
                  Sunt de acord cu colectarea și stocarea datelor mele personale (nume și telefon) în scopul analizării răspunsurilor din acest chestionar și al contactării mele, dacă optez pentru analiza facială gratuită. Datele sunt prelucrate conform{' '}
                  <a href="/politica-de-confidentialitate" target="_blank" className="underline" style={{ color: '#C6A769' }}>
                    Politicii de Confidențialitate
                  </a>. *
                </span>
              </label>
              {errors.gdpr && <p className="text-xs mt-2" style={{ color: '#DC2626' }}>{errors.gdpr}</p>}
            </div>
          </div>
        )}

        {/* ── Pasul 1: Despre tine ── */}
        {step === 1 && (
          <>
            <Question nr={1} text="În ce categorie de vârstă te încadrezi?" options={['Sub 30', '30–39', '40–49', '50+']} value={answers.q1_varsta} onChange={v => set('q1_varsta')(v)} />
            {errors.q1 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q1}</p>}

            <Question nr={2} text="Ai copii?" options={['Nu', '1', '2', '3+']} value={answers.q2_copii} onChange={v => set('q2_copii')(v)} />
            {errors.q2 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q2}</p>}

            <Question nr={3} text="Cât de des faci sport?" options={['1–2 ori/săpt.', '3–4 ori/săpt.', '5+ ori/săpt.']} value={answers.q3_sport} onChange={v => set('q3_sport')(v)} />
            {errors.q3 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q3}</p>}

            <MultiQuestion nr={4} text="De ce faci sport?" options={['Sănătate', 'Tonifiere/aspect', 'Greutate/compoziție corporală', 'Stare de bine']} value={answers.q4_motiv_sport} onChange={v => set('q4_motiv_sport')(v)} />
            {errors.q4 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q4}</p>}

            <MultiQuestion nr={5} text={'„Am grijă de mine" înseamnă pentru tine mai ales:'} options={['Sport', 'Alimentație', 'Corp tonifiat', 'Piele îngrijită', 'Toate împreună']} value={answers.q5_grija_de_mine} onChange={v => set('q5_grija_de_mine')(v)} />
            {errors.q5 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q5}</p>}
          </>
        )}

        {/* ── Pasul 2: Investești în corp ── */}
        {step === 2 && (
          <>
            <Question nr={6} text="Cât de atentă ești la alimentație?" options={['Foarte', 'Destul', 'Puțin', 'Deloc']} value={answers.q6_alimentatie} onChange={v => set('q6_alimentatie')(v)} />
            {errors.q6 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q6}</p>}

            <Question nr={7} text="Cât știi despre proteine, carbohidrați și grăsimi?" options={['Foarte mult', 'Destul', 'Puțin', 'Aproape nimic']} value={answers.q7_nutritie} onChange={v => set('q7_nutritie')(v)} />
            {errors.q7 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q7}</p>}

            <Question nr={8} text="Știi de ce masa musculară devine importantă odată cu vârsta?" options={['Da', 'Parțial', 'Nu']} value={answers.q8_masa_musculara} onChange={v => set('q8_masa_musculara')(v)} />
            {errors.q8 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q8}</p>}
          </>
        )}

        {/* ── Pasul 3: Știi despre piele ── */}
        {step === 3 && (
          <>
            <Question nr={9} text="Sportul și alimentația sunt suficiente și pentru piele?" options={['Da', 'În mare parte', 'Nu', 'Nu știu']} value={answers.q9_sport_suficient} onChange={v => set('q9_sport_suficient')(v)} />
            {errors.q9 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q9}</p>}

            <Question nr={10} text="Știi ce menține pielea fermă și elastică?" options={['Da', 'Parțial', 'Foarte puțin', 'Nu']} value={answers.q10_fermitate} onChange={v => set('q10_fermitate')(v)} />
            {errors.q10 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q10}</p>}

            <Question nr={11} text={'Știiai că pielea este un organ activ biologic, nu doar „învelișul" corpului?'} options={['Da', 'Știam, dar nu m-am gândit așa la ea', 'Nu']} value={answers.q11_organ_activ} onChange={v => set('q11_organ_activ')(v)} />
            {errors.q11 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q11}</p>}

            <Question nr={12} text="Știi ce este fibroblastul și de ce contează pentru fermitatea pielii?" options={['Da', 'Am auzit de el', 'Nu']} value={answers.q12_fibroblast} onChange={v => set('q12_fibroblast')(v)} />
            {errors.q12 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q12}</p>}

            <Question nr={13} text="Știiai că fibroblastul produce colagen și elastină, esențiale pentru structura și fermitatea pielii?" options={['Da', 'Parțial', 'Nu']} value={answers.q13_fibroblast_colagen} onChange={v => set('q13_fibroblast_colagen')(v)} />
            {errors.q13 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q13}</p>}

            <Question nr={14} text={'Știiai că pielea feței și a gâtului nu se „antrenează" cu greutăți la sală?'} options={['Da', 'Nu', 'Nu m-am gândit la asta']} value={answers.q14_fata_greutati} onChange={v => set('q14_fata_greutati')(v)} />
            {errors.q14 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q14}</p>}

            <Question nr={15} text="Știiai că tratamentele profesionale pot stimula fibroblastele să producă colagen nou?" options={['Da', 'Am auzit', 'Nu']} value={answers.q15_tratamente_fibroblast} onChange={v => set('q15_tratamente_fibroblast')(v)} />
            {errors.q15 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q15}</p>}

            <Question nr={16} text="Comparativ cu sportul și nutriția, cât îți cunoști pielea?" options={['La fel de bine', 'Mai puțin', 'Mult mai puțin', 'Nu m-am gândit']} value={answers.q16_cunosti_pielea} onChange={v => set('q16_cunosti_pielea')(v)} />
            {errors.q16 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q16}</p>}

            <Question nr={17} text="Te gândești cum va arăta pielea ta peste 5–10 ani?" options={['Da', 'Uneori', 'Foarte puțin', 'Niciodată']} value={answers.q17_viitor_piele} onChange={v => set('q17_viitor_piele')(v)} />
            {errors.q17 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q17}</p>}

            <Question nr={18} text="Știiai că sportul poate avea efecte benefice și asupra pielii?" options={['Da', 'Am auzit', 'Nu']} value={answers.q18_sport_piele} onChange={v => set('q18_sport_piele')(v)} />
            {errors.q18 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q18}</p>}

            <Question nr={19} text="Ai observat că fața sau gâtul și-au pierdut din fermitate, deși faci sport?" options={['Da', 'Puțin', 'Nu', 'Nu am fost atentă']} value={answers.q19_fermitate_fata} onChange={v => set('q19_fermitate_fata')(v)} />
            {errors.q19 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q19}</p>}
          </>
        )}

        {/* ── Pasul 4: Uită-te la pielea ta ── */}
        {step === 4 && (
          <>
            <MultiQuestion nr={20} text="Ce observi cel mai mult la pielea ta?" options={['Pierderea fermității', 'Riduri/linii', 'Pete', 'Roșeață', 'Textură/pori', 'Sensibilitate/deshidratare']} value={answers.q20_observi} onChange={v => set('q20_observi')(v)} />
            {errors.q20 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q20}</p>}

            <Question nr={21} text={'Ai una dintre acestea și o consideri „normală pentru mine"?'} options={['Da', 'Nu', 'Nu m-am gândit']} value={answers.q21_normala} onChange={v => set('q21_normala')(v)} />
            {errors.q21 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q21}</p>}

            <MultiQuestion nr={22} text="Când apare o problemă, ce faci?" options={['Schimb produsele', 'Caut online', 'Merg la dermatolog', 'Merg la cosmetician', 'Aștept să treacă']} value={answers.q22_problema} onChange={v => set('q22_problema')(v)} />
            {errors.q22 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q22}</p>}

            <Question nr={23} text="Dacă ai slăbit mult, ai observat schimbări la nivelul feței?" options={['Pierdere de volum', 'Piele mai laxă', 'Riduri mai vizibile', 'Nu']} value={answers.q23_slabit} onChange={v => set('q23_slabit')(v)} />
            {errors.q23 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q23}</p>}
          </>
        )}

        {/* ── Pasul 5: Investești în piele ── */}
        {step === 5 && (
          <>
            <Question nr={24} text="Faci tratamente faciale profesionale?" options={['Lunar/regulat', 'Ocazional', 'Am încercat', 'Niciodată']} value={answers.q24_tratamente} onChange={v => set('q24_tratamente')(v)} />
            {errors.q24 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q24}</p>}

            <Question nr={25} text="Pentru tine, un tratament facial înseamnă mai ales:" options={['Curățare', 'Relaxare/hidratare', 'Tratarea unei probleme', 'Menținerea pielii în timp']} value={answers.q25_tratament_facial} onChange={v => set('q25_tratament_facial')(v)} />
            {errors.q25 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q25}</p>}

            <Question nr={26} text="Ți s-a explicat vreodată ce se întâmplă biologic în pielea ta?" options={['Da, clar', 'Parțial', 'Nu']} value={answers.q26_explicatii} onChange={v => set('q26_explicatii')(v)} />
            {errors.q26 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q26}</p>}

            <Question nr={27} text="Ai primit vreodată un plan de tratament pe termen lung?" options={['Da', 'Nu', 'Am făcut doar ședințe individuale']} value={answers.q27_plan_termen} onChange={v => set('q27_plan_termen')(v)} />
            {errors.q27 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q27}</p>}

            <Question nr={28} text="Ce te oprește să mergi regulat?" options={['Costul', 'Timpul', 'Nu simt că am nevoie', 'Nu știu ce să aleg', 'Nu am găsit omul potrivit']} value={answers.q28_bariere} onChange={v => set('q28_bariere')(v)} />
            {errors.q28 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q28}</p>}
          </>
        )}

        {/* ── Pasul 6: Perspectivă + CTA ── */}
        {step === 6 && (
          <>
            <Question nr={29} text="Dacă ai înțelege mai bine cum funcționează pielea, ai avea mai multă grijă de ea?" options={['Da', 'Probabil', 'Nu']} value={answers.q29_mai_multa_grija} onChange={v => set('q29_mai_multa_grija')(v)} />
            {errors.q29 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q29}</p>}

            <Question nr={30} text="După acest chestionar, ce lipsește din planul tău de îngrijire?" options={['Nimic, mă ocup și de piele constant', 'Mai multă consecvență', 'Să înțeleg ce are nevoie pielea mea', 'Un plan pentru față și gât']} value={answers.q30_lipseste} onChange={v => set('q30_lipseste')(v)} />
            {errors.q30 && <p className="text-xs -mt-4 mb-5" style={{ color: '#DC2626' }}>{errors.q30}</p>}

            {/* CTA Card */}
            <div className="mt-8 p-5 md:p-8 border border-[#C6A769]/40" style={{ background: '#FBF7F0' }}>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ fontFamily: 'var(--font-montserrat)', color: '#C6A769', fontWeight: 500 }}>
                Analiză facială gratuită
              </p>
              <p className="text-xl md:text-2xl mb-5" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300, color: '#4A403A' }}>
                Vrei să afli mai multe despre pielea ta?
              </p>
              <div className="flex flex-col gap-2">
                <OptionBtn
                  label="DA, vreau să fiu contactată pentru o analiză facială gratuită."
                  selected={answers.doreste_analiza === true}
                  onClick={() => setAnswers(prev => ({ ...prev, doreste_analiza: true }))}
                />
                <OptionBtn
                  label="Nu, mulțumesc."
                  selected={answers.doreste_analiza === false}
                  onClick={() => setAnswers(prev => ({ ...prev, doreste_analiza: false, analiza_consent: false }))}
                />
              </div>
              {errors.cta && <p className="text-xs mt-2" style={{ color: '#DC2626' }}>{errors.cta}</p>}

              {answers.doreste_analiza === true && (
                <div className="mt-5 pt-5 border-t border-[#E8E1D8]">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={answers.analiza_consent}
                      onChange={e => setAnswers(prev => ({ ...prev, analiza_consent: e.target.checked }))}
                      className="mt-1 flex-shrink-0"
                      style={{ accentColor: '#C6A769', width: 18, height: 18 }}
                    />
                    <span className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', color: '#7A6F66' }}>
                      Sunt de acord să fiu contactată de Roxana Ica Aesthetic la numărul de telefon furnizat, pentru programarea analizei faciale gratuite. *
                    </span>
                  </label>
                  {errors.analiza_consent && <p className="text-xs mt-2" style={{ color: '#DC2626' }}>{errors.analiza_consent}</p>}
                </div>
              )}
            </div>

            {errors.submit && (
              <p className="mt-4 text-sm text-center" style={{ color: '#DC2626' }}>{errors.submit}</p>
            )}
          </>
        )}
      </div>

      {/* Butoane navigație — mari pe mobil */}
      <div className={`mb-16 ${step > 0 ? 'flex justify-between items-center gap-3' : 'flex justify-end'}`}>
        {step > 0 && (
          <button
            type="button"
            onClick={handleBack}
            style={{
              fontFamily: 'var(--font-montserrat)',
              color: '#7A6F66',
              borderRadius: 0,
              border: '1px solid #E8E1D8',
              padding: '14px 20px',
              fontSize: 13,
              background: 'white',
              minHeight: 52,
              flexShrink: 0,
            }}
          >
            ← Înapoi
          </button>
        )}

        {step < SECTIONS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn-gold"
            style={{ fontFamily: 'var(--font-montserrat)', minHeight: 52, paddingLeft: 32, paddingRight: 32, flexShrink: 0 }}
          >
            Continuă →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-gold"
            style={{ fontFamily: 'var(--font-montserrat)', opacity: submitting ? 0.7 : 1, minHeight: 52, paddingLeft: 24, paddingRight: 24, flexShrink: 0 }}
          >
            {submitting ? 'Se trimite...' : 'Trimite răspunsurile'}
          </button>
        )}
      </div>
    </div>
  );
}
