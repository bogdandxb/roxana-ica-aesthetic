'use client';

import { useState } from 'react';

const GOLD = '#C6A769';
const TAUPE = '#4A403A';

const QUESTIONS = [
  {
    id: 'sa1',
    nr: 1,
    text: 'Când te uiți la pielea ta, care este primul lucru pe care ți-ai dori să îl îmbunătățești?',
    multi: true,
    options: [
      'Luminozitatea', 'Fermitatea', 'Textura / porii', 'Petele', 'Roșeața',
      'Coșurile / imperfecțiunile', 'Liniile fine / ridurile', 'Hidratarea',
      'Nu știu exact, dar simt că pielea mea ar putea arăta mai bine',
    ],
  },
  {
    id: 'sa2',
    nr: 2,
    text: 'Dacă ai putea alege rezultatul, nu problema, cum ți-ai dori să arate pielea ta?',
    multi: true,
    options: [
      'Mai luminoasă', 'Mai uniformă', 'Mai fermă', 'Mai netedă',
      'Mai hidratată', 'Mai curată', 'Mai calmă', 'Pur și simplu mai sănătoasă și îngrijită',
    ],
  },
  {
    id: 'sa3',
    nr: 3,
    text: 'Există ceva ce ai început să observi în ultimii ani și înainte nu aveai?',
    multi: true,
    options: [
      'Pete', 'Roșeață / vase vizibile', 'Porii mai evidenți', 'Textură diferită',
      'Linii fine', 'Pierderea fermității', 'Piele mai ternă', 'Sensibilitate', 'Nu am observat schimbări',
    ],
  },
  {
    id: 'sa4',
    nr: 4,
    text: 'Cât de bine crezi că îți cunoști, de fapt, pielea?',
    multi: false,
    options: [
      'Foarte bine',
      'Destul de bine',
      'Mă bazez mai mult pe ceea ce văd în oglindă',
      'Nu știu exact ce tip de piele am sau de ce apar anumite modificări',
    ],
  },
  {
    id: 'sa5',
    nr: 5,
    text: 'Ai cumpărat vreodată produse pentru o problemă a pielii fără să știi exact care este cauza ei?',
    multi: false,
    options: ['Da, de multe ori', 'Uneori', 'Foarte rar', 'Nu'],
  },
  {
    id: 'sa6',
    nr: 6,
    text: 'Ai făcut până acum tratamente faciale profesionale?',
    multi: false,
    options: [
      'Da, regulat', 'Da, dar ocazional', 'Doar curățări faciale',
      'Am încercat câteva tratamente fără un plan', 'Niciodată',
    ],
  },
  {
    id: 'sa7',
    nr: 7,
    text: 'Atunci când alegi un tratament facial, ce te-ar interesa cel mai mult?',
    multi: true,
    options: [
      'O curățare profundă',
      'Să rezolv ceva ce mă deranjează acum',
      'Să îmbunătățesc calitatea generală a pielii',
      'Să lucrez preventiv pentru următorii ani',
      'Să am un plan personalizat, nu să aleg eu tratamentul',
      'Nu știu ce ar avea nevoie pielea mea',
    ],
  },
  {
    id: 'sa8',
    nr: 8,
    text: 'Dacă analiza ar arăta modificări pe care încă nu le observi foarte bine în oglindă, ai vrea să le cunoști?',
    multi: false,
    options: [
      'Da, cu siguranță',
      'Da, mai ales dacă pot interveni din timp',
      'Poate',
      'Prefer să tratez doar ceea ce mă deranjează vizibil',
    ],
  },
  {
    id: 'sa9',
    nr: 9,
    text: 'Ce ți-ar fi mai util după analiza pielii?',
    multi: true,
    options: [
      'Să aflu ce se întâmplă în pielea mea',
      'Să înțeleg de ce au apărut anumite modificări',
      'Să aflu ce tratamente mi se potrivesc',
      'Să știu ce produse să folosesc acasă',
      'Să primesc un plan complet, profesional, pentru următoarele luni',
    ],
  },
  {
    id: 'sa10',
    nr: 10,
    text: 'Care ar fi următorul pas potrivit pentru tine?',
    multi: false,
    options: [
      'Vreau doar să aflu ce se întâmplă cu pielea mea',
      'Vreau să aflu ce tratamente mi s-ar potrivi',
      'Vreau o analiză cu Skin Analyzer și un plan personalizat pentru pielea mea',
    ],
  },
];

type Answers = Record<string, string | string[]>;

function CheckOption({ label, selected, onClick, multi }: { label: string; selected: boolean; onClick: () => void; multi: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left transition-all duration-150"
      style={{
        fontFamily: 'var(--font-montserrat)',
        fontWeight: selected ? 500 : 400,
        background: selected ? '#FBF7F0' : 'white',
        color: selected ? TAUPE : '#7A6F66',
        borderRadius: 0,
        boxShadow: selected ? `0 0 0 1.5px ${GOLD}` : '0 0 0 1px #E8E1D8',
        padding: '12px 16px',
        border: 'none',
        minHeight: 48,
      }}
    >
      <span className="flex items-center gap-3">
        <span className="flex-shrink-0 flex items-center justify-center" style={{
          width: 18, height: 18,
          borderRadius: multi ? 3 : '50%',
          border: `2px solid ${selected ? GOLD : '#CBD5E1'}`,
          background: selected ? GOLD : 'white',
        }}>
          {selected && multi && (
            <svg width="10" height="8" viewBox="0 0 11 9" fill="none">
              <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {selected && !multi && (
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'white', display: 'block' }} />
          )}
        </span>
        <span className="text-sm leading-snug">{label}</span>
      </span>
    </button>
  );
}

export default function SkinAssessment() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({ nume: '', telefon: '', email: '' });
  const [gdpr, setGdpr] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string, opt: string, multi: boolean) => {
    if (multi) {
      const cur = (answers[id] as string[]) || [];
      setAnswers(prev => ({
        ...prev,
        [id]: cur.includes(opt) ? cur.filter(x => x !== opt) : [...cur, opt],
      }));
    } else {
      setAnswers(prev => ({ ...prev, [id]: opt }));
    }
  };

  const isSelected = (id: string, opt: string, multi: boolean) => {
    if (multi) return ((answers[id] as string[]) || []).includes(opt);
    return answers[id] === opt;
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!contact.nume.trim()) e.nume = 'Numele este obligatoriu';
    if (!contact.telefon.trim()) {
      e.telefon = 'Telefonul este obligatoriu';
    } else if (!/^(\+4|004)?07\d{8}$/.test(contact.telefon.replace(/\s/g, ''))) {
      e.telefon = 'Număr de telefon invalid (ex: 07xx xxx xxx)';
    }
    if (!gdpr) e.gdpr = 'Acordul este obligatoriu';
    for (const q of QUESTIONS) {
      const val = answers[q.id];
      const empty = q.multi ? !val || (val as string[]).length === 0 : !val;
      if (empty) e[q.id] = 'Te rugăm să selectezi cel puțin o opțiune';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/skin-assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, gdpr_consent: gdpr, ...answers }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrors(prev => ({ ...prev, submit: 'A apărut o eroare. Te rugăm să încerci din nou.' }));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-20 px-6 text-center" style={{ background: '#F8F6F2' }}>
        <div className="max-w-lg mx-auto">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>
            Skin Assessment
          </p>
          <h2 className="text-4xl mb-6" style={{ fontFamily: 'var(--font-cormorant)', color: TAUPE, fontWeight: 300 }}>
            Mulțumim!
          </h2>
          <div className="gold-line mb-6" />
          <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'var(--font-montserrat)', color: '#7A6F66', fontWeight: 300 }}>
            Răspunsurile tale au fost salvate. Te vom contacta în curând pentru a stabili analiza facială.
          </p>
          <p className="text-sm" style={{ fontFamily: 'var(--font-cormorant)', color: GOLD, fontSize: '1.15rem', fontStyle: 'italic' }}>
            Întâi înțelegem pielea. Apoi construim planul.
          </p>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <section id="skin-assessment" className="py-20 px-6" style={{ background: '#F8F6F2' }}>
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          <p className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>
            Skin Assessment
          </p>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-cormorant)', color: TAUPE, fontWeight: 300 }}>
            Înainte de orice tratament,<br />înțelegem pielea ta.
          </h2>
          <div className="gold-line" />
          <p className="text-sm leading-relaxed max-w-lg" style={{ fontFamily: 'var(--font-montserrat)', color: '#7A6F66', fontWeight: 300 }}>
            10 întrebări simple care ne ajută să înțelegem nevoile reale ale pielii tale — înainte de consultație.
          </p>
          <p className="text-xs" style={{ fontFamily: 'var(--font-montserrat)', color: '#9CA3AF' }}>
            Durează aproximativ 3 minute.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="btn-gold mt-2"
            style={{ fontFamily: 'var(--font-montserrat)', padding: '16px 40px' }}
          >
            Începe assessment-ul →
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6" style={{ background: '#F8F6F2' }}>
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest mb-2 text-center" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>
          Skin Assessment
        </p>
        <h2 className="text-3xl text-center mb-10" style={{ fontFamily: 'var(--font-cormorant)', color: TAUPE, fontWeight: 300 }}>
          Cele 10 întrebări
        </h2>

        {/* Date contact */}
        <div className="bg-white border border-[#E8E1D8] p-6 mb-8">
          <p className="text-xs uppercase tracking-widest mb-5" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>
            Date de contact
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs mb-1 block" style={{ fontFamily: 'var(--font-montserrat)', color: TAUPE }}>
                Nume și prenume *
              </label>
              <input
                type="text"
                value={contact.nume}
                onChange={e => setContact(p => ({ ...p, nume: e.target.value }))}
                placeholder="Numele tău"
                className="w-full px-4 py-3 border text-sm outline-none"
                style={{ fontFamily: 'var(--font-montserrat)', borderColor: errors.nume ? '#DC2626' : '#E8E1D8', borderRadius: 0, color: TAUPE }}
              />
              {errors.nume && <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{errors.nume}</p>}
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ fontFamily: 'var(--font-montserrat)', color: TAUPE }}>
                Număr de telefon *
              </label>
              <input
                type="tel"
                value={contact.telefon}
                onChange={e => setContact(p => ({ ...p, telefon: e.target.value }))}
                placeholder="07xx xxx xxx"
                className="w-full px-4 py-3 border text-sm outline-none"
                style={{ fontFamily: 'var(--font-montserrat)', borderColor: errors.telefon ? '#DC2626' : '#E8E1D8', borderRadius: 0, color: TAUPE }}
              />
              {errors.telefon && <p className="text-xs mt-1" style={{ color: '#DC2626' }}>{errors.telefon}</p>}
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ fontFamily: 'var(--font-montserrat)', color: TAUPE }}>
                Email <span style={{ color: '#9CA3AF' }}>(opțional)</span>
              </label>
              <input
                type="email"
                value={contact.email}
                onChange={e => setContact(p => ({ ...p, email: e.target.value }))}
                placeholder="adresa@email.ro"
                className="w-full px-4 py-3 border text-sm outline-none"
                style={{ fontFamily: 'var(--font-montserrat)', borderColor: '#E8E1D8', borderRadius: 0, color: TAUPE }}
              />
            </div>
          </div>
        </div>

        {/* Întrebări */}
        <div className="flex flex-col gap-8">
          {QUESTIONS.map(q => (
            <div key={q.id} className="bg-white border border-[#E8E1D8] p-6">
              <p className="mb-1 text-sm" style={{ fontFamily: 'var(--font-montserrat)', color: '#9CA3AF', fontWeight: 400 }}>
                Întrebarea {q.nr} din {QUESTIONS.length}
              </p>
              <p className="mb-1 leading-snug" style={{ fontFamily: 'var(--font-cormorant)', color: TAUPE, fontSize: '1.1rem', fontWeight: 400 }}>
                {q.text}
              </p>
              {q.multi && (
                <p className="mb-4 text-xs font-semibold" style={{ fontFamily: 'var(--font-montserrat)', color: '#DC2626' }}>
                  Poți selecta mai multe răspunsuri
                </p>
              )}
              {!q.multi && <div className="mb-4" />}
              <div className="flex flex-col gap-2">
                {q.options.map(opt => (
                  <CheckOption
                    key={opt}
                    label={opt}
                    selected={isSelected(q.id, opt, q.multi)}
                    onClick={() => toggle(q.id, opt, q.multi)}
                    multi={q.multi}
                  />
                ))}
              </div>
              {errors[q.id] && (
                <p className="text-xs mt-3" style={{ color: '#DC2626', fontFamily: 'var(--font-montserrat)' }}>
                  {errors[q.id]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* GDPR + Submit */}
        <div className="mt-8 p-6 border border-[#C6A769]/40" style={{ background: '#FBF7F0' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>
            Programează-ți analiza facială cu Skin Analyzer
          </p>
          <p className="text-sm leading-relaxed mb-2" style={{ fontFamily: 'var(--font-montserrat)', color: '#7A6F66', fontWeight: 300 }}>
            Consultația este gratuită dacă alegi ulterior să continui cu un tratament.
          </p>
          <p className="text-sm mb-6" style={{ fontFamily: 'var(--font-cormorant)', color: TAUPE, fontSize: '1.05rem', fontStyle: 'italic' }}>
            Nu alegem un tratament și apoi vedem dacă ți se potrivește.<br />
            Întâi înțelegem pielea. Apoi construim planul.
          </p>

          <label className="flex items-start gap-3 cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={gdpr}
              onChange={e => setGdpr(e.target.checked)}
              style={{ accentColor: GOLD, width: 18, height: 18, marginTop: 2, flexShrink: 0 }}
            />
            <span className="text-xs leading-relaxed" style={{ fontFamily: 'var(--font-montserrat)', color: '#7A6F66' }}>
              Sunt de acord cu colectarea datelor mele (nume, telefon, email) în scopul analizării răspunsurilor și al contactării mele pentru programarea consultației. *
            </span>
          </label>
          {errors.gdpr && <p className="text-xs mb-4" style={{ color: '#DC2626', fontFamily: 'var(--font-montserrat)' }}>{errors.gdpr}</p>}

          {errors.submit && (
            <p className="text-xs mb-4" style={{ color: '#DC2626', fontFamily: 'var(--font-montserrat)' }}>{errors.submit}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-gold w-full mt-4"
            style={{ fontFamily: 'var(--font-montserrat)', opacity: submitting ? 0.7 : 1, minHeight: 52 }}
          >
            {submitting ? 'Se trimite...' : 'Trimite assessment-ul →'}
          </button>
        </div>
      </div>
    </section>
  );
}
