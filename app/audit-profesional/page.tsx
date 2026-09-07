'use client';

import { useState } from 'react';

const GOLD = '#C6A769';
const TAUPE = '#4A403A';
const IVORY = '#F8F6F2';
const BEIGE = '#E8E1D8';

const SERVICII_LIST = [
  'Curatare faciala', 'Hidratare', 'Acnee', 'Anti-aging',
  'Microneedling', 'Peelinguri', 'Rozacee', 'Melasma', 'Altul',
];

const NIVEL_DOMENII = [
  { key: 'nivel_biologie_pielii', label: 'Biologia pielii' },
  { key: 'nivel_bariera_cutanata', label: 'Bariera cutanată' },
  { key: 'nivel_microbiom', label: 'Microbiom' },
  { key: 'nivel_inflamatie_cutanata', label: 'Inflamație cutanată' },
  { key: 'nivel_acnee', label: 'Acnee' },
  { key: 'nivel_rozacee', label: 'Rozacee' },
  { key: 'nivel_melasma', label: 'Melasma' },
  { key: 'nivel_peelinguri', label: 'Peelinguri' },
  { key: 'nivel_microneedling', label: 'Microneedling' },
  { key: 'nivel_consultatie_analiza', label: 'Consultație și analiză' },
  { key: 'nivel_construire_protocoale', label: 'Construire protocoale' },
  { key: 'nivel_recomandare_homecare', label: 'Recomandare homecare' },
];

const DIFICULTATI_SM = [
  'Filmarea', 'Vorbitul pe cameră', 'Ideile de conținut', 'Editarea',
  'Constanța', 'Vânzarea serviciilor', 'Pozitionarea ca expert',
];

type Serviciu = { pret: string; nr_cliente: string };
type Form = {
  nume: string; telefon: string; email: string;
  ani_experienta: string; oras: string; nr_cliente_luna: string;
  tip_lucru: string; venit_lunar: string;
  servicii: Record<string, Serviciu>;
  serviciu_mai_multi_bani: string; serviciu_cel_mai_usor: string;
  serviciu_cel_mai_greu: string; serviciu_cel_mai_mult_timp: string;
  serviciu_marja_mare: string;
  procedura_ceruta_neoferta: string; procedura_de_introdus: string;
  tip_clienta_neajutata: string; cazuri_refuzate: string; cazuri_fara_incredere: string;
  nivel_biologie_pielii: string; nivel_bariera_cutanata: string;
  nivel_microbiom: string; nivel_inflamatie_cutanata: string;
  nivel_acnee: string; nivel_rozacee: string; nivel_melasma: string;
  nivel_peelinguri: string; nivel_microneedling: string;
  nivel_consultatie_analiza: string; nivel_construire_protocoale: string;
  nivel_recomandare_homecare: string;
  subiect_evitat: string; procedura_fara_curaj: string;
  de_ce_te_aleg: string; ce_te_diferentiaza: string;
  expertiza_dorita: string; ce_sa_spuna_clientele: string;
  instagram_urmatori: string; facebook_urmatori: string; tiktok_urmatori: string;
  are_website: string; are_google_business: string; frecventa_postare: string;
  dificultati_social_media: string[]; impact_postare_constanta: string;
  viziune_12_luni: string; procedura_de_stapanit: string;
  venit_succes: string; tip_clientele_dorite: string; urmatorul_nivel: string;
  ce_functioneaza_bine: string; ce_limiteaza_cresterea: string;
  limita_3_ani: string; abilitate_impact: string;
  gdpr_consent: boolean;
};

const EMPTY: Form = {
  nume: '', telefon: '', email: '',
  ani_experienta: '', oras: '', nr_cliente_luna: '',
  tip_lucru: '', venit_lunar: '',
  servicii: Object.fromEntries(SERVICII_LIST.map(s => [s, { pret: '', nr_cliente: '' }])),
  serviciu_mai_multi_bani: '', serviciu_cel_mai_usor: '',
  serviciu_cel_mai_greu: '', serviciu_cel_mai_mult_timp: '',
  serviciu_marja_mare: '',
  procedura_ceruta_neoferta: '', procedura_de_introdus: '',
  tip_clienta_neajutata: '', cazuri_refuzate: '', cazuri_fara_incredere: '',
  nivel_biologie_pielii: '', nivel_bariera_cutanata: '',
  nivel_microbiom: '', nivel_inflamatie_cutanata: '',
  nivel_acnee: '', nivel_rozacee: '', nivel_melasma: '',
  nivel_peelinguri: '', nivel_microneedling: '',
  nivel_consultatie_analiza: '', nivel_construire_protocoale: '',
  nivel_recomandare_homecare: '',
  subiect_evitat: '', procedura_fara_curaj: '',
  de_ce_te_aleg: '', ce_te_diferentiaza: '',
  expertiza_dorita: '', ce_sa_spuna_clientele: '',
  instagram_urmatori: '', facebook_urmatori: '', tiktok_urmatori: '',
  are_website: '', are_google_business: '', frecventa_postare: '',
  dificultati_social_media: [], impact_postare_constanta: '',
  viziune_12_luni: '', procedura_de_stapanit: '',
  venit_succes: '', tip_clientele_dorite: '', urmatorul_nivel: '',
  ce_functioneaza_bine: '', ce_limiteaza_cresterea: '',
  limita_3_ani: '', abilitate_impact: '',
  gdpr_consent: false,
};

const SECTIONS = [
  '01 Situația actuală',
  '02 Servicii și profitabilitate',
  '03 Oportunități pierdute',
  '04 Nivel profesional',
  '05 Diferențiere',
  '06 Social Media & Exposure',
  '07 Viziune',
  '08 Gap Analysis',
];

function SectionHeader({ nr, title }: { nr: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 6, background: TAUPE,
        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: 13, flexShrink: 0,
      }}>{nr}</div>
      <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 600, color: TAUPE, margin: 0 }}>{title}</h2>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: TAUPE, marginBottom: 8, fontFamily: 'var(--font-montserrat)' }}>{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text" value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: '100%', padding: '11px 14px', border: `1px solid ${BEIGE}`, borderRadius: 8, fontSize: 13, color: TAUPE, outline: 'none', fontFamily: 'var(--font-montserrat)', background: 'white', boxSizing: 'border-box' }}
    />
  );
}

function Textarea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <textarea
      value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} rows={3}
      style={{ width: '100%', padding: '11px 14px', border: `1px solid ${BEIGE}`, borderRadius: 8, fontSize: 13, color: TAUPE, outline: 'none', fontFamily: 'var(--font-montserrat)', background: 'white', resize: 'vertical', boxSizing: 'border-box' }}
    />
  );
}

function RadioGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => onChange(opt)}
          style={{
            padding: '9px 16px', borderRadius: 8, border: `1.5px solid ${value === opt ? GOLD : BEIGE}`,
            background: value === opt ? '#FBF7F0' : 'white', color: value === opt ? TAUPE : '#7A6F66',
            fontSize: 13, fontWeight: value === opt ? 600 : 400, cursor: 'pointer',
            fontFamily: 'var(--font-montserrat)', transition: 'all 0.15s',
          }}>
          {opt}
        </button>
      ))}
    </div>
  );
}

function NivelSlider({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const val = parseInt(value) || 0;
  return (
    <div style={{ background: 'white', border: `1px solid ${BEIGE}`, borderRadius: 10, padding: '14px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: TAUPE, fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: GOLD, fontFamily: 'var(--font-cormorant)', minWidth: 40, textAlign: 'right' }}>{val || '—'}<span style={{ fontSize: 12, color: '#B0A090', fontWeight: 400 }}>/10</span></span>
      </div>
      <input type="range" min={1} max={10} value={val || 1}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', accentColor: GOLD, cursor: 'pointer' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 10, color: '#B0A090' }}>1 — Începător</span>
        <span style={{ fontSize: 10, color: '#B0A090' }}>10 — Expert</span>
      </div>
    </div>
  );
}

export default function AuditProfesionalPage() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function set(key: keyof Form, value: unknown) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function setServiciu(serviciu: string, field: 'pret' | 'nr_cliente', value: string) {
    setForm(f => ({
      ...f,
      servicii: { ...f.servicii, [serviciu]: { ...f.servicii[serviciu], [field]: value } }
    }));
  }

  function toggleDificultate(opt: string) {
    setForm(f => ({
      ...f,
      dificultati_social_media: f.dificultati_social_media.includes(opt)
        ? f.dificultati_social_media.filter(x => x !== opt)
        : [...f.dificultati_social_media, opt],
    }));
  }

  async function handleSubmit() {
    if (!form.nume.trim()) { setError('Numele este obligatoriu.'); return; }
    if (!form.gdpr_consent) { setError('Acordul GDPR este obligatoriu.'); return; }
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/audit-profesional/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Eroare server');
      setSubmitted(true);
    } catch {
      setError('A apărut o eroare. Încearcă din nou.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: IVORY, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ maxWidth: 480, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 28 }}>✓</div>
          <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '2rem', color: TAUPE, marginBottom: 16 }}>Mulțumesc!</h1>
          <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 14, color: '#7A6F66', lineHeight: 1.7 }}>
            Auditul tău a fost trimis cu succes. Roxana îl va analiza și va reveni cu un feedback personalizat în cel mai scurt timp.
          </p>
        </div>
      </div>
    );
  }

  const inputStyle = { width: '100%', padding: '11px 14px', border: `1px solid ${BEIGE}`, borderRadius: 8, fontSize: 13, color: TAUPE, outline: 'none', fontFamily: 'var(--font-montserrat)', background: 'white', boxSizing: 'border-box' as const };

  return (
    <div style={{ minHeight: '100vh', background: IVORY }}>
      {/* Header */}
      <div style={{ background: TAUPE, padding: '32px 20px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase', marginBottom: 8 }}>Roxana Ica Aesthetic</p>
        <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 600, color: 'white', marginBottom: 6 }}>Audit Profesional 360°</h1>
        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Analiza completă a practicii tale de cosmetică</p>
      </div>

      {/* Progress */}
      <div style={{ background: 'white', borderBottom: `1px solid ${BEIGE}`, padding: '12px 20px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: '#7A6F66', fontFamily: 'var(--font-montserrat)' }}>Secțiunea {step + 1} din {SECTIONS.length}</span>
            <span style={{ fontSize: 12, color: GOLD, fontWeight: 600, fontFamily: 'var(--font-montserrat)' }}>{SECTIONS[step]}</span>
          </div>
          <div style={{ height: 4, background: BEIGE, borderRadius: 4 }}>
            <div style={{ height: '100%', background: GOLD, borderRadius: 4, width: `${((step + 1) / SECTIONS.length) * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px 120px' }}>

        {/* SECTIUNEA 0 — Situatia actuala */}
        {step === 0 && (
          <div>
            <SectionHeader nr="01" title="Situația actuală" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Nume *"><Input value={form.nume} onChange={v => set('nume', v)} placeholder="Numele tău" /></Field>
              <Field label="Telefon"><Input value={form.telefon} onChange={v => set('telefon', v)} placeholder="07xx xxx xxx" /></Field>
              <Field label="Email"><Input value={form.email} onChange={v => set('email', v)} placeholder="email@exemplu.ro" /></Field>
              <Field label="Ani de experiență"><Input value={form.ani_experienta} onChange={v => set('ani_experienta', v)} placeholder="ex: 5 ani" /></Field>
              <Field label="Oraș"><Input value={form.oras} onChange={v => set('oras', v)} placeholder="ex: Brașov" /></Field>
              <Field label="Nr. mediu cliente / lună"><Input value={form.nr_cliente_luna} onChange={v => set('nr_cliente_luna', v)} placeholder="ex: 30" /></Field>
            </div>
            <Field label="Lucrez:">
              <RadioGroup options={['Salon propriu', 'Angajată', 'Închiriere post', 'Acasă']} value={form.tip_lucru} onChange={v => set('tip_lucru', v)} />
            </Field>
            <Field label="Venit lunar:">
              <RadioGroup options={['Sub 1.000 €', '1.000–2.000 €', '2.000–3.000 €', '3.000–5.000 €', 'Peste 5.000 €']} value={form.venit_lunar} onChange={v => set('venit_lunar', v)} />
            </Field>
          </div>
        )}

        {/* SECTIUNEA 1 — Servicii si profitabilitate */}
        {step === 1 && (
          <div>
            <SectionHeader nr="02" title="Servicii și profitabilitate" />
            <div style={{ overflowX: 'auto', marginBottom: 24 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: TAUPE }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: GOLD, fontFamily: 'var(--font-montserrat)', letterSpacing: '0.06em' }}>SERVICIU</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: GOLD, fontFamily: 'var(--font-montserrat)', letterSpacing: '0.06em' }}>PREȚ (lei)</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: GOLD, fontFamily: 'var(--font-montserrat)', letterSpacing: '0.06em' }}>NR. CLIENTE / LUNĂ</th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICII_LIST.map((s, i) => (
                    <tr key={s} style={{ background: i % 2 === 0 ? 'white' : '#FAF8F5' }}>
                      <td style={{ padding: '10px 14px', fontSize: 13, color: TAUPE, fontFamily: 'var(--font-montserrat)' }}>{s}</td>
                      <td style={{ padding: '6px 8px' }}>
                        <input type="number" value={form.servicii[s].pret} onChange={e => setServiciu(s, 'pret', e.target.value)}
                          placeholder="0" style={{ ...inputStyle, width: 100 }} />
                      </td>
                      <td style={{ padding: '6px 8px' }}>
                        <input type="number" value={form.servicii[s].nr_cliente} onChange={e => setServiciu(s, 'nr_cliente', e.target.value)}
                          placeholder="0" style={{ ...inputStyle, width: 100 }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Field label="Care este serviciul care îți aduce cei mai mulți bani?"><Textarea value={form.serviciu_mai_multi_bani} onChange={v => set('serviciu_mai_multi_bani', v)} /></Field>
            <Field label="Care este serviciul pe care îl vinzi cel mai ușor?"><Textarea value={form.serviciu_cel_mai_usor} onChange={v => set('serviciu_cel_mai_usor', v)} /></Field>
            <Field label="Care este serviciul pe care îl vinzi cel mai greu?"><Textarea value={form.serviciu_cel_mai_greu} onChange={v => set('serviciu_cel_mai_greu', v)} /></Field>
            <Field label="Care este serviciul care consumă cel mai mult timp?"><Textarea value={form.serviciu_cel_mai_mult_timp} onChange={v => set('serviciu_cel_mai_mult_timp', v)} /></Field>
            <Field label="Care este serviciul cu cea mai mare marjă de profit?"><Textarea value={form.serviciu_marja_mare} onChange={v => set('serviciu_marja_mare', v)} /></Field>
          </div>
        )}

        {/* SECTIUNEA 2 — Oportunitati pierdute */}
        {step === 2 && (
          <div>
            <SectionHeader nr="03" title="Oportunități pierdute" />
            <Field label="Ce procedură îți cer clientele și nu oferi?"><Textarea value={form.procedura_ceruta_neoferta} onChange={v => set('procedura_ceruta_neoferta', v)} /></Field>
            <Field label="Ce procedură ai introduce mâine dacă ai avea siguranța că o stăpânești?"><Textarea value={form.procedura_de_introdus} onChange={v => set('procedura_de_introdus', v)} /></Field>
            <Field label="Ce tip de clientă simți că nu poți ajuta suficient?"><Textarea value={form.tip_clienta_neajutata} onChange={v => set('tip_clienta_neajutata', v)} /></Field>
            <Field label="Există cazuri pe care le refuzi?"><Textarea value={form.cazuri_refuzate} onChange={v => set('cazuri_refuzate', v)} /></Field>
            <Field label="Există cazuri pe care le accepți, dar nu cu încredere deplină?"><Textarea value={form.cazuri_fara_incredere} onChange={v => set('cazuri_fara_incredere', v)} /></Field>
          </div>
        )}

        {/* SECTIUNEA 3 — Nivel profesional */}
        {step === 3 && (
          <div>
            <SectionHeader nr="04" title="Nivel profesional" />
            <p style={{ fontSize: 13, color: '#7A6F66', fontFamily: 'var(--font-montserrat)', marginBottom: 24, fontStyle: 'italic' }}>Notează de la 1 la 10 nivelul tău actual pentru fiecare domeniu:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 24 }}>
              {NIVEL_DOMENII.map(d => (
                <NivelSlider key={d.key} label={d.label} value={(form as unknown as Record<string, string>)[d.key]} onChange={v => set(d.key as keyof Form, v)} />
              ))}
            </div>
            <Field label="Care este subiectul pe care îl eviți cel mai des pentru că nu te simți suficient de pregătită?"><Textarea value={form.subiect_evitat} onChange={v => set('subiect_evitat', v)} /></Field>
            <Field label="Care este procedura pe care nu ai curaj să o promovezi suficient?"><Textarea value={form.procedura_fara_curaj} onChange={v => set('procedura_fara_curaj', v)} /></Field>
          </div>
        )}

        {/* SECTIUNEA 4 — Diferentiere */}
        {step === 4 && (
          <div>
            <SectionHeader nr="05" title="Diferențiere" />
            <Field label="De ce te aleg clientele pe tine?"><Textarea value={form.de_ce_te_aleg} onChange={v => set('de_ce_te_aleg', v)} /></Field>
            <Field label="Ce te diferențiază de alte cosmeticiene?"><Textarea value={form.ce_te_diferentiaza} onChange={v => set('ce_te_diferentiaza', v)} /></Field>
            <Field label="Care este expertiza pentru care ai vrea să fii cunoscută?"><Textarea value={form.expertiza_dorita} onChange={v => set('expertiza_dorita', v)} /></Field>
            <Field label="Dacă o clientă te recomandă unei prietene, ce ai vrea să spună despre tine?"><Textarea value={form.ce_sa_spuna_clientele} onChange={v => set('ce_sa_spuna_clientele', v)} /></Field>
          </div>
        )}

        {/* SECTIUNEA 5 — Social Media */}
        {step === 5 && (
          <div>
            <SectionHeader nr="06" title="Social Media & Exposure" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 8 }}>
              <Field label="Instagram următori"><Input value={form.instagram_urmatori} onChange={v => set('instagram_urmatori', v)} placeholder="ex: 1200" /></Field>
              <Field label="Facebook următori"><Input value={form.facebook_urmatori} onChange={v => set('facebook_urmatori', v)} placeholder="ex: 800" /></Field>
              <Field label="TikTok următori"><Input value={form.tiktok_urmatori} onChange={v => set('tiktok_urmatori', v)} placeholder="ex: 500" /></Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Website:">
                <RadioGroup options={['Da', 'Nu']} value={form.are_website} onChange={v => set('are_website', v)} />
              </Field>
              <Field label="Google Business:">
                <RadioGroup options={['Da', 'Nu']} value={form.are_google_business} onChange={v => set('are_google_business', v)} />
              </Field>
            </div>
            <Field label="Postezi:">
              <RadioGroup options={['Zilnic', '3-4 ori/săpt.', 'Ocazional', 'Foarte rar']} value={form.frecventa_postare} onChange={v => set('frecventa_postare', v)} />
            </Field>
            <Field label="Ce îți este cel mai greu? (poți alege mai multe)">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {DIFICULTATI_SM.map(opt => {
                  const sel = form.dificultati_social_media.includes(opt);
                  return (
                    <button key={opt} type="button" onClick={() => toggleDificultate(opt)}
                      style={{ padding: '9px 16px', borderRadius: 8, border: `1.5px solid ${sel ? GOLD : BEIGE}`, background: sel ? '#FBF7F0' : 'white', color: sel ? TAUPE : '#7A6F66', fontSize: 13, fontWeight: sel ? 600 : 400, cursor: 'pointer', fontFamily: 'var(--font-montserrat)' }}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </Field>
            <Field label="Dacă ai posta constant timp de 6 luni, ce impact crezi că ar avea?"><Textarea value={form.impact_postare_constanta} onChange={v => set('impact_postare_constanta', v)} /></Field>
          </div>
        )}

        {/* SECTIUNEA 6 — Viziune */}
        {step === 6 && (
          <div>
            <SectionHeader nr="07" title="Viziune" />
            <Field label="Unde vrei să fii profesional peste 12 luni?"><Textarea value={form.viziune_12_luni} onChange={v => set('viziune_12_luni', v)} /></Field>
            <Field label="Ce procedură ai vrea să stăpânești foarte bine?"><Textarea value={form.procedura_de_stapanit} onChange={v => set('procedura_de_stapanit', v)} /></Field>
            <Field label="Ce venit lunar ai considera un succes?"><Input value={form.venit_succes} onChange={v => set('venit_succes', v)} placeholder="ex: 4.000 €" /></Field>
            <Field label="Ce tip de clientele ai vrea să atragi?"><Textarea value={form.tip_clientele_dorite} onChange={v => set('tip_clientele_dorite', v)} /></Field>
            <Field label="Care este următorul nivel profesional pe care vrei să îl atingi?"><Textarea value={form.urmatorul_nivel} onChange={v => set('urmatorul_nivel', v)} /></Field>
          </div>
        )}

        {/* SECTIUNEA 7 — Gap Analysis */}
        {step === 7 && (
          <div>
            <SectionHeader nr="08" title="Gap Analysis" />
            <Field label="Ce funcționează bine astăzi?"><Textarea value={form.ce_functioneaza_bine} onChange={v => set('ce_functioneaza_bine', v)} /></Field>
            <Field label="Ce limitează creșterea?"><Textarea value={form.ce_limiteaza_cresterea} onChange={v => set('ce_limiteaza_cresterea', v)} /></Field>
            <Field label="Dacă ai continua exact așa încă 3 ani, ce crezi că te-ar limita cel mai mult?"><Textarea value={form.limita_3_ani} onChange={v => set('limita_3_ani', v)} /></Field>
            <Field label="Ce abilitate sau cunoștință ar avea cel mai mare impact asupra businessului tău în următoarele 12 luni?"><Textarea value={form.abilitate_impact} onChange={v => set('abilitate_impact', v)} /></Field>

            {/* GDPR */}
            <div style={{ background: 'white', border: `1px solid ${BEIGE}`, borderRadius: 10, padding: 20, marginTop: 32 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.gdpr_consent} onChange={e => set('gdpr_consent', e.target.checked)}
                  style={{ width: 18, height: 18, marginTop: 2, accentColor: GOLD, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#7A6F66', fontFamily: 'var(--font-montserrat)', lineHeight: 1.7 }}>
                  Sunt de acord ca datele completate în acest formular să fie utilizate de Roxana Ica Aesthetic exclusiv în scopul realizării auditului profesional și al formulării unui plan de dezvoltare personalizat. Datele nu vor fi transmise către terți. *
                </span>
              </label>
            </div>

            {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 12, fontFamily: 'var(--font-montserrat)' }}>{error}</p>}
          </div>
        )}

        {/* Navigare */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, gap: 12 }}>
          {step > 0 ? (
            <button onClick={() => setStep(s => s - 1)} type="button"
              style={{ padding: '12px 28px', border: `1.5px solid ${BEIGE}`, borderRadius: 10, background: 'white', fontSize: 13, color: TAUPE, cursor: 'pointer', fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>
              ← Înapoi
            </button>
          ) : <div />}

          {step < SECTIONS.length - 1 ? (
            <button onClick={() => { if (!form.nume.trim() && step === 0) { setError('Numele este obligatoriu.'); return; } setError(''); setStep(s => s + 1); window.scrollTo(0, 0); }} type="button"
              style={{ padding: '12px 32px', border: 'none', borderRadius: 10, background: GOLD, color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-montserrat)' }}>
              Continuă →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting} type="button"
              style={{ padding: '12px 32px', border: 'none', borderRadius: 10, background: submitting ? BEIGE : GOLD, color: 'white', fontSize: 13, fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-montserrat)' }}>
              {submitting ? 'Se trimite...' : 'Trimite auditul ✓'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
