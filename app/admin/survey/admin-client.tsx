'use client';

import { useState, useEffect, useCallback } from 'react';
import { SURVEY_QUESTIONS, type SurveyQuestion } from '@/lib/survey-questions';

const GOLD = '#C6A769';
const TAUPE = '#4A403A';
const IVORY = '#F8F6F2';

const LEAD_STATUSES = ['Nou', 'Contactată', 'Programată', 'Finalizată', 'Nu răspunde', 'Nu dorește'];

const SA_LEAD_STATUSES = [
  'ASSESSMENT COMPLETAT',
  'INTERESATĂ',
  'PROGRAMATĂ',
  'CONSULTAȚIE EFECTUATĂ',
  'TRATAMENT ÎNCEPUT',
  'CLIENTĂ EXISTENTĂ',
  'ÎNCHIS / FĂRĂ ACȚIUNE',
];

const SKIN_ANALYZER_STATUSES = [
  'Nu a fost efectuat',
  'Analiză individuală – 200 lei',
  'Inclus în tratament – 0 lei',
];

const SA_QUESTIONS = [
  { id: 'sa1', nr: 1, text: 'Când te uiți la pielea ta, care este primul lucru pe care ți-ai dori să îl îmbunătățești?', multi: true },
  { id: 'sa2', nr: 2, text: 'Dacă ai putea alege rezultatul, nu problema, cum ți-ai dori să arate pielea ta?', multi: true },
  { id: 'sa3', nr: 3, text: 'Există ceva ce ai început să observi în ultimii ani și înainte nu aveai?', multi: true },
  { id: 'sa4', nr: 4, text: 'Cât de bine crezi că îți cunoști, de fapt, pielea?', multi: false },
  { id: 'sa5', nr: 5, text: 'Ai cumpărat vreodată produse pentru o problemă a pielii fără să știi exact care este cauza ei?', multi: false },
  { id: 'sa6', nr: 6, text: 'Ai făcut până acum tratamente faciale profesionale?', multi: false },
  { id: 'sa7', nr: 7, text: 'Atunci când alegi un tratament facial, ce te-ar interesa cel mai mult?', multi: true },
  { id: 'sa8', nr: 8, text: 'Dacă analiza ar arăta modificări pe care încă nu le observi foarte bine în oglindă, ai vrea să le cunoști?', multi: false },
  { id: 'sa9', nr: 9, text: 'Ce ți-ar fi mai util după analiza pielii?', multi: true },
  { id: 'sa10', nr: 10, text: 'Care ar fi următorul pas potrivit pentru tine?', multi: false },
];

type Response = Record<string, string>;
type SARecord = Record<string, string | boolean | null>;

function pct(a: number, b: number) {
  return b === 0 ? 0 : Math.round((a / b) * 100);
}

function fmt(dt: string | null | undefined) {
  if (!dt) return '—';
  return new Date(dt).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ─── StatCard ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white border border-[#E8E1D8] p-5 flex flex-col gap-1" style={{ boxShadow: '0 1px 8px rgba(74,64,58,0.05)' }}>
      <p className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>{label}</p>
      <p className="text-3xl font-light" style={{ fontFamily: 'var(--font-cormorant)', color: TAUPE }}>{value}</p>
      {sub && <p className="text-xs" style={{ fontFamily: 'var(--font-montserrat)', color: '#9CA3AF' }}>{sub}</p>}
    </div>
  );
}

// ─── Survey QuestionCard ──────────────────────────────────────────────────────
function QuestionCard({ question, counts, total, responses, multi }: {
  question: SurveyQuestion; counts: Record<string, number>; total: number; responses: Response[]; multi?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [filterOption, setFilterOption] = useState<string | null>(null);
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const maxCount = entries[0]?.[1] || 1;
  const respondents = responses.filter(r => (r[question.key] ?? '').trim() !== '');
  const filteredByOption = filterOption
    ? respondents.filter(r => {
        const val = r[question.key] ?? '';
        return multi ? val.split(',').map((s: string) => s.trim()).includes(filterOption) : val === filterOption;
      })
    : respondents;

  return (
    <div className="bg-white border border-[#E8E1D8]" style={{ boxShadow: '0 1px 8px rgba(74,64,58,0.05)' }}>
      <div className="px-5 pt-5 pb-3 border-b border-[#F1F5F9]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            <span className="text-xs font-semibold shrink-0 mt-0.5" style={{ color: GOLD, fontFamily: 'var(--font-montserrat)' }}>{question.nr}.</span>
            <p className="text-sm leading-snug" style={{ fontFamily: 'var(--font-montserrat)', color: TAUPE, fontWeight: 500 }}>{question.text}</p>
          </div>
          <span className="text-xs shrink-0" style={{ color: '#9CA3AF', fontFamily: 'var(--font-montserrat)' }}>{respondents.length} răsp.</span>
        </div>
        {multi && <p className="mt-2 text-xs" style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}>Răspuns multiplu — procentele pot depăși 100% cumulat</p>}
      </div>
      <div className="px-5 py-4 flex flex-col gap-2">
        {entries.length === 0 && <p className="text-xs py-2" style={{ color: '#9CA3AF', fontFamily: 'var(--font-montserrat)' }}>Nu există răspunsuri încă.</p>}
        {entries.map(([option, count]) => {
          const barPct = pct(count, total);
          const barWidth = pct(count, maxCount);
          const isActive = filterOption === option;
          return (
            <button key={option} type="button" onClick={() => { setFilterOption(isActive ? null : option); setExpanded(true); }} className="w-full text-left" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs leading-snug flex-1" style={{ fontFamily: 'var(--font-montserrat)', color: isActive ? TAUPE : '#4B5563', fontWeight: isActive ? 600 : 400 }}>{option}</span>
                <span className="text-xs shrink-0" style={{ fontFamily: 'var(--font-montserrat)', color: isActive ? TAUPE : '#9CA3AF', minWidth: 48, textAlign: 'right' }}>{count} ({barPct}%)</span>
              </div>
              <div style={{ height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${barWidth}%`, background: isActive ? TAUPE : GOLD, borderRadius: 4, transition: 'width 0.4s ease' }} />
              </div>
            </button>
          );
        })}
      </div>
      <div className="px-5 pb-4">
        <button type="button" onClick={() => { setExpanded(e => !e); if (expanded) setFilterOption(null); }} className="text-xs uppercase tracking-wide" style={{ fontFamily: 'var(--font-montserrat)', color: expanded ? '#9CA3AF' : GOLD, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          {expanded ? '↑ Ascunde răspunsurile' : '↓ Vezi răspunsurile individuale'}
        </button>
      </div>
      {expanded && (
        <div className="border-t border-[#F1F5F9]">
          {filterOption && (
            <div className="px-5 py-2 flex items-center gap-2" style={{ background: '#FBF7F0' }}>
              <span className="text-xs" style={{ fontFamily: 'var(--font-montserrat)', color: TAUPE }}>Filtrat: <strong>{filterOption}</strong></span>
              <button type="button" onClick={() => setFilterOption(null)} className="text-xs ml-auto" style={{ fontFamily: 'var(--font-montserrat)', color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>× Șterge filtru</button>
            </div>
          )}
          <table className="w-full">
            <thead><tr style={{ background: '#F8FAFC' }}>
              <th className="px-5 py-2 text-left text-xs uppercase tracking-wide" style={{ color: '#94A3B8', fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>Nume</th>
              <th className="px-5 py-2 text-left text-xs uppercase tracking-wide" style={{ color: '#94A3B8', fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>Răspuns</th>
            </tr></thead>
            <tbody>
              {filteredByOption.length === 0 && <tr><td colSpan={2} className="px-5 py-4 text-xs text-center" style={{ color: '#9CA3AF', fontFamily: 'var(--font-montserrat)' }}>Nicio persoană cu acest răspuns.</td></tr>}
              {filteredByOption.map((resp, i) => (
                <tr key={resp.id || i} style={{ borderTop: '1px solid #F8FAFC' }} className="hover:bg-[#FDFCFB]">
                  <td className="px-5 py-2 text-sm" style={{ color: TAUPE, fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>{resp.nume || '—'}</td>
                  <td className="px-5 py-2 text-sm" style={{ color: '#4B5563', fontFamily: 'var(--font-montserrat)' }}>{resp[question.key] || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── SA Fisa ─────────────────────────────────────────────────────────────────
function SAFisa({ record, password, onBack, onUpdate }: {
  record: SARecord; password: string; onBack: () => void; onUpdate: (updated: SARecord) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [local, setLocal] = useState<SARecord>({ ...record });

  const set = (key: string, val: string | boolean | null) => setLocal(p => ({ ...p, [key]: val }));

  const save = async () => {
    setSaving(true);
    await fetch('/api/skin-assessment/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ id: local.id, ...local }),
    });
    setSaving(false);
    setSaved(true);
    onUpdate(local);
    setTimeout(() => setSaved(false), 2000);
  };

  // Auto-summary from answers
  const summary = {
    'Obiectiv principal': local.sa2 || '—',
    'Ce o deranjează': local.sa1 || '—',
    'Schimbări observate': local.sa3 || '—',
    'Experiență cu tratamente': local.sa6 || '—',
    'Ce își dorește': local.sa7 || '—',
    'Următorul pas dorit': local.sa10 || '—',
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', border: '1px solid #E8E1D8',
    fontFamily: 'var(--font-montserrat)', fontSize: 13, color: TAUPE,
    borderRadius: 0, outline: 'none', background: 'white',
  };
  const textareaStyle = { ...inputStyle, minHeight: 80, resize: 'vertical' as const };
  const labelStyle = { fontFamily: 'var(--font-montserrat)', fontSize: 11, color: '#9CA3AF', textTransform: 'uppercase' as const, letterSpacing: '0.05em', display: 'block', marginBottom: 4 };

  return (
    <div>
      <button onClick={onBack} className="text-xs mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        ← Înapoi la listă
      </button>

      {/* Header fișă */}
      <div className="bg-white border border-[#E8E1D8] p-6 mb-5">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>Fișă Skin Assessment</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {[
            ['Nume', local.nume], ['Telefon', local.telefon], ['Email', local.email || '—'],
            ['Data completării', fmt(local.completed_at as string)],
            ['Statut client', local.is_existing_client ? '⚑ Clientă existentă' : 'Clientă nouă'],
            ['Intenție (Q10)', local.sa10 || '—'],
          ].map(([label, val]) => (
            <div key={label as string}>
              <p className="text-xs mb-1" style={{ color: '#9CA3AF', fontFamily: 'var(--font-montserrat)' }}>{label}</p>
              <p style={{ color: TAUPE, fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>{val as string}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-[#F1F5F9] grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label style={labelStyle}>Status Lead</label>
            <select value={local.lead_status as string || 'ASSESSMENT COMPLETAT'} onChange={e => set('lead_status', e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}>
              {SA_LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Skin Analyzer</label>
            <select value={local.skin_analyzer_status as string || 'Nu a fost efectuat'} onChange={e => set('skin_analyzer_status', e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}>
              {SKIN_ANALYZER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Data programării</label>
            <input type="datetime-local" value={local.programare_data ? (local.programare_data as string).slice(0, 16) : ''} onChange={e => set('programare_data', e.target.value || null)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Data consultației</label>
            <input type="datetime-local" value={local.consultatie_data ? (local.consultatie_data as string).slice(0, 16) : ''} onChange={e => set('consultatie_data', e.target.value || null)} style={inputStyle} />
          </div>
        </div>
      </div>

      {/* Rezumat automat */}
      <div className="bg-white border border-[#E8E1D8] p-6 mb-5">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>Rezumat pentru consultație</p>
        <div className="flex flex-col gap-3">
          {Object.entries(summary).map(([label, val]) => (
            <div key={label} className="flex gap-3">
              <span className="text-xs shrink-0 mt-0.5 w-44" style={{ color: '#9CA3AF', fontFamily: 'var(--font-montserrat)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
              <span className="text-sm" style={{ color: TAUPE, fontFamily: 'var(--font-montserrat)' }}>{val as string}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Răspunsuri individuale */}
      <div className="bg-white border border-[#E8E1D8] p-6 mb-5">
        <p className="text-xs uppercase tracking-widest mb-5" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>Răspunsurile Skin Assessment</p>
        <div className="flex flex-col gap-5">
          {SA_QUESTIONS.map(q => (
            <div key={q.id}>
              <p className="text-xs mb-1" style={{ color: '#9CA3AF', fontFamily: 'var(--font-montserrat)' }}>Întrebarea {q.nr}</p>
              <p className="text-sm mb-2" style={{ fontFamily: 'var(--font-montserrat)', color: TAUPE, fontWeight: 500 }}>{q.text}</p>
              <p className="text-sm px-4 py-2 border-l-2" style={{ borderColor: GOLD, color: '#4B5563', fontFamily: 'var(--font-montserrat)', background: '#FBF7F0' }}>
                {(local[q.id] as string) || '—'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Consultatie Roxana */}
      <div className="bg-white border border-[#E8E1D8] p-6 mb-5">
        <p className="text-xs uppercase tracking-widest mb-5" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>Consultație Roxana Ica</p>
        <div className="flex flex-col gap-4">
          <div>
            <label style={labelStyle}>Observații Skin Analyzer</label>
            <textarea value={local.obs_skin_analyzer as string || ''} onChange={e => set('obs_skin_analyzer', e.target.value)} style={textareaStyle} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['prioritatea_1', 'prioritatea_2', 'prioritatea_3'].map((k, i) => (
              <div key={k}>
                <label style={labelStyle}>Prioritatea {i + 1}</label>
                <input type="text" value={local[k] as string || ''} onChange={e => set(k, e.target.value)} style={inputStyle} />
              </div>
            ))}
          </div>
          <div>
            <label style={labelStyle}>Plan / Protocol recomandat</label>
            <textarea value={local.plan_protocol as string || ''} onChange={e => set('plan_protocol', e.target.value)} style={textareaStyle} />
          </div>
          <div>
            <label style={labelStyle}>Produse Homecare recomandate</label>
            <textarea value={local.produse_homecare as string || ''} onChange={e => set('produse_homecare', e.target.value)} style={textareaStyle} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Tratament ales</label>
              <input type="text" value={local.tratament_ales as string || ''} onChange={e => set('tratament_ales', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Data următoarei programări</label>
              <input type="date" value={local.urmatoarea_programare as string || ''} onChange={e => set('urmatoarea_programare', e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Observații</label>
            <textarea value={local.observatii as string || ''} onChange={e => set('observatii', e.target.value)} style={textareaStyle} />
          </div>
          <div className="flex items-center gap-3">
            <label style={{ ...labelStyle, marginBottom: 0 }}>Tratament început</label>
            <input type="checkbox" checked={!!local.tratament_inceput} onChange={e => set('tratament_inceput', e.target.checked)} style={{ accentColor: GOLD, width: 16, height: 16 }} />
          </div>
        </div>
        <button onClick={save} disabled={saving} className="btn-gold mt-6" style={{ fontFamily: 'var(--font-montserrat)', minHeight: 48, paddingLeft: 32, paddingRight: 32 }}>
          {saving ? 'Se salvează...' : saved ? '✓ Salvat' : 'Salvează fișa'}
        </button>
      </div>

      {/* Print */}
      <div className="flex gap-3 mb-8">
        <button onClick={() => window.print()} className="text-xs px-4 py-2 border border-[#E8E1D8] hover:border-[#C6A769] transition-all" style={{ color: TAUPE, fontFamily: 'var(--font-montserrat)' }}>
          🖨 Print fișă
        </button>
      </div>
    </div>
  );
}

// ─── ShareButton ─────────────────────────────────────────────────────────────
const SURVEY_URL = 'https://www.roxanaicaaesthetic.com/chestionar';
const SURVEY_SHARE_TEXT = 'Completează chestionarul Roxana Ica Aesthetic — află cât de bine îți cunoști pielea! 🌿';
const SA_URL = 'https://www.roxanaicaaesthetic.com/servicii/skin-analyzer#skin-assessment';
const SA_SHARE_TEXT = 'Completează Skin Assessment-ul Roxana Ica Aesthetic și descoperă nevoile reale ale pielii tale. 🌿';

function ShareButton({ url, text }: { url: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'Roxana Ica Aesthetic', text, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };
  return (
    <button onClick={handleShare} style={{ background: copied ? '#22C55E' : GOLD, color: 'white', border: 'none', padding: '8px 16px', fontSize: 11, fontFamily: 'var(--font-montserrat)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'background 0.2s', borderRadius: 0, whiteSpace: 'nowrap' }}>
      {copied ? <>✓ Link copiat</> : (
        <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>Trimite link</>
      )}
    </button>
  );
}

// ─── SKIN ASSESSMENT SECTION ──────────────────────────────────────────────────
function SkinAssessmentAdmin({ password }: { password: string }) {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('all');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterExisting, setFilterExisting] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<SARecord | null>(null);
  const [activeTab, setActiveTab] = useState<'lista' | 'statistici'>('lista');

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ period });
    if (filterStatus) params.set('status', filterStatus);
    if (filterExisting) params.set('existing', filterExisting);
    const res = await fetch(`/api/skin-assessment/admin?${params}`, { headers: { 'x-admin-password': password } });
    if (res.ok) setData(await res.json());
    setLoading(false);
  }, [password, period, filterStatus, filterExisting]);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (selectedRecord) {
    return (
      <SAFisa
        record={selectedRecord}
        password={password}
        onBack={() => setSelectedRecord(null)}
        onUpdate={(updated) => {
          setData(prev => {
            if (!prev) return prev;
            const records = (prev.records as SARecord[]).map(r => r.id === updated.id ? updated : r);
            return { ...prev, records };
          });
        }}
      />
    );
  }

  const stats = (data?.stats as Record<string, number>) || {};
  const records = (data?.records as SARecord[]) || [];
  const questionStats = (data?.questionStats as Record<string, Record<string, number>>) || {};

  // Client-side search filter
  const filtered = search
    ? records.filter(r => r.nume?.toString().toLowerCase().includes(search.toLowerCase()) || r.telefon?.toString().includes(search))
    : records;

  const statusColors: Record<string, string> = {
    'ASSESSMENT COMPLETAT': '#9CA3AF',
    'INTERESATĂ': '#C6A769',
    'PROGRAMATĂ': '#3B82F6',
    'CONSULTAȚIE EFECTUATĂ': '#8B5CF6',
    'TRATAMENT ÎNCEPUT': '#16A34A',
    'CLIENTĂ EXISTENTĂ': '#F59E0B',
    'ÎNCHIS / FĂRĂ ACȚIUNE': '#EF4444',
  };

  return (
    <div>
      {/* Share button */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-widest" style={{ color: GOLD, fontWeight: 500, fontFamily: 'var(--font-montserrat)' }}>
          Skin Assessment
        </p>
        <ShareButton url={SA_URL} text={SA_SHARE_TEXT} />
      </div>

      {/* Period filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[['all', 'Total'], ['7d', 'Ultimele 7 zile'], ['30d', 'Ultimele 30 zile']].map(([val, label]) => (
          <button key={val} onClick={() => setPeriod(val)} className="px-4 py-2 text-xs border transition-all"
            style={{ borderColor: period === val ? GOLD : '#E8E1D8', background: period === val ? '#FBF7F0' : 'white', color: period === val ? TAUPE : '#7A6F66', fontWeight: period === val ? 600 : 400, borderRadius: 0 }}>
            {label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total completări" value={stats.total || 0} />
        <StatCard label="Persoane unice" value={stats.uniquePhones || 0} />
        <StatCard label="Cliente noi" value={stats.noi || 0} />
        <StatCard label="Cliente existente" value={stats.existente || 0} />
        <StatCard label="Interesate Skin Analyzer" value={stats.interesSkinAnalyzer || 0} />
        <StatCard label="Programate" value={stats.programate || 0} sub={`${stats.rateAssessmentProgramare || 0}% din completări`} />
        <StatCard label="Consultații efectuate" value={stats.consultatii || 0} sub={`${stats.rateProgramareConsultatie || 0}% din programate`} />
        <StatCard label="Tratamente începute" value={stats.tratamente || 0} sub={`${stats.rateConsulatatieTratament || 0}% din consultații`} />
      </div>

      {/* Sub-tabs */}
      <div className="flex border-b border-[#E8E1D8] mb-6 gap-1">
        {[['lista', 'Listă persoane'], ['statistici', 'Statistici răspunsuri']].map(([k, l]) => (
          <button key={k} onClick={() => setActiveTab(k as 'lista' | 'statistici')} className="px-5 py-3 text-xs uppercase tracking-wide transition-all border-b-2"
            style={{ borderColor: activeTab === k ? GOLD : 'transparent', color: activeTab === k ? TAUPE : '#9CA3AF', fontWeight: activeTab === k ? 600 : 400 }}>
            {l}
          </button>
        ))}
      </div>

      {loading && <p className="text-center py-10 text-sm" style={{ color: '#9CA3AF' }}>Se încarcă...</p>}

      {/* ── LISTA ── */}
      {!loading && activeTab === 'lista' && (
        <div>
          {/* Filtre */}
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              type="text"
              placeholder="Caută după nume sau telefon..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-4 py-2 border text-xs outline-none flex-1 min-w-48"
              style={{ fontFamily: 'var(--font-montserrat)', borderColor: '#E8E1D8', borderRadius: 0, color: TAUPE }}
            />
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border text-xs outline-none" style={{ fontFamily: 'var(--font-montserrat)', borderColor: '#E8E1D8', borderRadius: 0, color: TAUPE }}>
              <option value="">Toate statusurile</option>
              {SA_LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={filterExisting} onChange={e => setFilterExisting(e.target.value)} className="px-3 py-2 border text-xs outline-none" style={{ fontFamily: 'var(--font-montserrat)', borderColor: '#E8E1D8', borderRadius: 0, color: TAUPE }}>
              <option value="">Toate</option>
              <option value="nu">Cliente noi</option>
              <option value="da">Cliente existente</option>
            </select>
          </div>

          {/* Tabel */}
          <div className="bg-white border border-[#E8E1D8] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>
                    {['Nume', 'Telefon', 'Data', 'Tip clientă', 'Intenție', 'Status', 'Acțiuni'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wide" style={{ color: '#94A3B8', fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-10 text-center text-sm" style={{ color: '#9CA3AF' }}>Nu există înregistrări.</td></tr>
                  )}
                  {filtered.map((r, i) => (
                    <tr key={r.id as string || i} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F8FAFC' : 'none' }} className="hover:bg-[#FDFCFB]">
                      <td className="px-4 py-3">
                        <button onClick={() => setSelectedRecord(r)} className="text-sm font-medium hover:underline text-left" style={{ color: GOLD, fontFamily: 'var(--font-montserrat)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                          {r.nume as string}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: '#64748B', fontFamily: 'var(--font-montserrat)' }}>
                        <a href={`tel:${r.telefon}`} style={{ color: GOLD }}>{r.telefon as string}</a>
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: '#64748B', fontFamily: 'var(--font-montserrat)' }}>{fmt(r.completed_at as string)}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5" style={{ fontFamily: 'var(--font-montserrat)', background: r.is_existing_client ? '#FEF3C7' : '#F0FDF4', color: r.is_existing_client ? '#92400E' : '#166534', fontWeight: 500 }}>
                          {r.is_existing_client ? 'Existentă' : 'Nouă'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#64748B', fontFamily: 'var(--font-montserrat)', maxWidth: 180 }}>
                        <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {r.sa10 as string || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-0.5 font-medium" style={{ fontFamily: 'var(--font-montserrat)', color: statusColors[r.lead_status as string] || '#9CA3AF' }}>
                          {r.lead_status as string || 'ASSESSMENT COMPLETAT'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelectedRecord(r)} className="text-xs hover:underline" style={{ color: GOLD, fontFamily: 'var(--font-montserrat)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                          Deschide →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── STATISTICI ── */}
      {!loading && activeTab === 'statistici' && (
        <div className="flex flex-col gap-5">
          {SA_QUESTIONS.map(q => {
            const counts = questionStats[q.id] || {};
            const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
            const total = Object.values(counts).reduce((a, b) => a + b, 0);
            const maxCount = entries[0]?.[1] || 1;
            return (
              <div key={q.id} className="bg-white border border-[#E8E1D8] p-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <p className="text-sm" style={{ fontFamily: 'var(--font-montserrat)', color: TAUPE, fontWeight: 500 }}>
                    <span style={{ color: GOLD, marginRight: 6 }}>{q.nr}.</span>{q.text}
                  </p>
                  <span className="text-xs shrink-0" style={{ color: '#9CA3AF', fontFamily: 'var(--font-montserrat)' }}>{total} răsp.</span>
                </div>
                {q.multi && <p className="text-xs mb-3" style={{ color: '#6B7280', fontFamily: 'var(--font-montserrat)' }}>Răspuns multiplu</p>}
                <div className="flex flex-col gap-2">
                  {entries.map(([opt, count]) => (
                    <div key={opt}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs flex-1" style={{ fontFamily: 'var(--font-montserrat)', color: '#4B5563' }}>{opt}</span>
                        <span className="text-xs shrink-0" style={{ fontFamily: 'var(--font-montserrat)', color: '#9CA3AF' }}>{count} ({pct(count, q.multi ? stats.total || 1 : total)}%)</span>
                      </div>
                      <div style={{ height: 6, background: '#F1F5F9', borderRadius: 3 }}>
                        <div style={{ height: '100%', width: `${pct(count, maxCount)}%`, background: GOLD, borderRadius: 3 }} />
                      </div>
                    </div>
                  ))}
                  {entries.length === 0 && <p className="text-xs" style={{ color: '#9CA3AF', fontFamily: 'var(--font-montserrat)' }}>Nu există răspunsuri.</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── SURVEY SECTION ───────────────────────────────────────────────────────────
function SurveyAdmin({ password, data, leads, loading, onUpdateLead, onExport }: {
  password: string;
  data: Record<string, unknown> | null;
  leads: Record<string, string>[];
  loading: boolean;
  onUpdateLead: (id: string, status: string) => void;
  onExport: (leadsOnly: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'insights' | 'export'>('dashboard');
  const [updatingLead, setUpdatingLead] = useState<string | null>(null);

  const updateLeadStatus = async (id: string, status: string) => {
    setUpdatingLead(id);
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ id, status }),
    });
    onUpdateLead(id, status);
    setUpdatingLead(null);
  };

  const charts = (data?.charts as Record<string, Record<string, number>>) || {};
  const tracking = (data?.tracking as Record<string, number>) || {};
  const leadsInfo = (data?.leads as Record<string, number>) || {};
  const insights = (data?.insights as string[]) || [];
  const responses = (data?.responses as Response[]) || [];
  const total = (data?.total as number) || 0;

  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'leads', label: `Leads (${leadsInfo.count || 0})` },
    { key: 'insights', label: 'Content Insights' },
    { key: 'export', label: 'Export' },
  ] as const;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs uppercase tracking-widest" style={{ color: GOLD, fontWeight: 500, fontFamily: 'var(--font-montserrat)' }}>
          Survey — Cât de bine ai grijă de tine?
        </p>
        <ShareButton url={SURVEY_URL} text={SURVEY_SHARE_TEXT} />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8E1D8] mb-8 gap-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)} className="px-5 py-3 text-xs uppercase tracking-wide transition-all border-b-2"
            style={{ borderColor: activeTab === t.key ? GOLD : 'transparent', color: activeTab === t.key ? TAUPE : '#9CA3AF', fontWeight: activeTab === t.key ? 600 : 400 }}>
            {t.label}
          </button>
        ))}
      </div>

      {loading && <p className="text-center py-10 text-sm" style={{ color: '#9CA3AF' }}>Se încarcă...</p>}

      {!loading && activeTab === 'dashboard' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total completări" value={total} />
            <StatCard label="Lead-uri analiză" value={leadsInfo.count || 0} sub={`${leadsInfo.pct || 0}% conversie`} />
            <StatCard label="Survey-uri începute" value={tracking.started || 0} sub={`${tracking.completionRate || 0}% completion rate`} />
            <StatCard label="Analiză solicitată" value={tracking.analysisRequested || 0} sub={`${tracking.conversionRate || 0}% din completări`} />
          </div>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: GOLD, fontWeight: 500 }}>Survey Results — {total} răspunsuri</p>
          <div className="flex flex-col gap-5">
            {SURVEY_QUESTIONS.map(q => (
              <QuestionCard key={q.key} question={q} counts={charts[q.key] || {}} total={total} responses={responses} multi={q.multi} />
            ))}
          </div>
        </>
      )}

      {!loading && activeTab === 'leads' && (
        <div className="bg-white border border-[#E8E1D8] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
            <p className="text-sm font-medium" style={{ color: TAUPE }}>{leads.length} persoane au completat · {leadsInfo.count || 0} au solicitat analiza gratuită</p>
            <button onClick={() => onExport(true)} className="text-xs px-4 py-2 border border-[#E8E1D8] hover:border-[#C6A769] transition-all" style={{ color: TAUPE }}>Export leads CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr style={{ borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
                {['Nume', 'Telefon', 'Analiză', 'Data', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wide" style={{ color: '#94A3B8' }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr key={lead.id} style={{ borderBottom: i < leads.length - 1 ? '1px solid #F8FAFC' : 'none' }} className="hover:bg-[#FDFCFB]">
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: TAUPE }}>{lead.nume}</td>
                    <td className="px-4 py-3 text-sm"><a href={`tel:${lead.telefon}`} style={{ color: GOLD }}>{lead.telefon}</a></td>
                    <td className="px-4 py-3 text-sm">
                      {lead.doreste_analiza ? <span style={{ color: '#16A34A', fontWeight: 600, fontSize: 11 }}>✓ DA</span> : <span style={{ color: '#9CA3AF', fontSize: 11 }}>Nu</span>}
                    </td>
                    <td className="px-4 py-3 text-sm" style={{ color: '#64748B' }}>{new Date(lead.created_at).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="px-4 py-3">
                      <select value={lead.lead_status || 'Nou'} onChange={e => updateLeadStatus(lead.id, e.target.value)} disabled={updatingLead === lead.id}
                        className="text-xs px-2 py-1 border outline-none" style={{ borderColor: '#E8E1D8', color: TAUPE, fontFamily: 'var(--font-montserrat)', borderRadius: 0 }}>
                        {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && <tr><td colSpan={5} className="px-4 py-12 text-center text-sm" style={{ color: '#9CA3AF' }}>Nu există răspunsuri încă.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && activeTab === 'insights' && (
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: GOLD, fontWeight: 500 }}>Statistici generate automat</p>
          {insights.length === 0 && <p className="text-sm" style={{ color: '#9CA3AF' }}>Nu există date suficiente.</p>}
          {insights.map((insight, i) => (
            <div key={i} className="bg-white border border-[#E8E1D8] p-5">
              <p className="text-base leading-relaxed" style={{ fontFamily: 'var(--font-cormorant)', color: TAUPE, fontSize: '1.1rem' }}>„{insight}"</p>
              <button onClick={() => navigator.clipboard.writeText(insight)} className="mt-3 text-xs uppercase tracking-wide" style={{ color: GOLD, fontFamily: 'var(--font-montserrat)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Copiază →</button>
            </div>
          ))}
        </div>
      )}

      {!loading && activeTab === 'export' && (
        <div className="flex flex-col gap-4 max-w-md">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: GOLD, fontWeight: 500 }}>Export date</p>
          <div className="bg-white border border-[#E8E1D8] p-6">
            <p className="text-sm font-medium mb-1" style={{ color: TAUPE }}>Toate răspunsurile</p>
            <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>Un rând per participantă, toate cele 27 de întrebări.</p>
            <button onClick={() => onExport(false)} className="btn-gold text-xs" style={{ fontFamily: 'var(--font-montserrat)' }}>Export CSV complet</button>
          </div>
          <div className="bg-white border border-[#E8E1D8] p-6">
            <p className="text-sm font-medium mb-1" style={{ color: TAUPE }}>Doar leads</p>
            <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>Persoanele care au solicitat analiza gratuită.</p>
            <button onClick={() => onExport(true)} className="btn-gold text-xs" style={{ fontFamily: 'var(--font-montserrat)' }}>Export leads CSV</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AUDIT FISA ──────────────────────────────────────────────────────────────
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

function AuditSection({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '28px 0 16px', borderBottom: `2px solid ${GOLD}`, paddingBottom: 8 }}>
      <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.2rem', color: TAUPE, margin: 0 }}>{title}</h3>
    </div>
  );
}

function AuditRow({ label, value }: { label: string; value: unknown }) {
  if (!value || value === '—') return null;
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-montserrat)', marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 13, color: TAUPE, fontFamily: 'var(--font-montserrat)', lineHeight: 1.6 }}>{String(value)}</p>
    </div>
  );
}

function AuditFisa({ record: r, onBack }: { record: Record<string, unknown>; onBack: () => void }) {
  const servicii = r.servicii as Record<string, { pret: string; nr_cliente: string }> | null;
  const dificultati = r.dificultati_social_media as string[] | null;

  return (
    <div>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: GOLD, fontSize: 12, cursor: 'pointer', fontFamily: 'var(--font-montserrat)', padding: 0, marginBottom: 20 }}>← Înapoi la listă</button>

      {/* Header */}
      <div className="bg-white border border-[#E8E1D8] p-6 mb-4">
        <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: GOLD, fontWeight: 700, fontFamily: 'var(--font-montserrat)', marginBottom: 6 }}>Audit Profesional 360°</p>
        <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem', color: TAUPE, fontWeight: 400, margin: '0 0 16px' }}>{r.nume as string}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
          {[['Telefon', r.telefon], ['Email', r.email], ['Oraș', r.oras], ['Experiență', r.ani_experienta], ['Tip activitate', r.tip_lucru], ['Venit lunar', r.venit_lunar], ['Data completării', fmt(r.created_at as string)]].map(([l, v]) => v ? (
            <div key={l as string}>
              <p style={{ fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-montserrat)' }}>{l as string}</p>
              <p style={{ fontSize: 13, color: TAUPE, fontFamily: 'var(--font-montserrat)', fontWeight: 500 }}>{v as string}</p>
            </div>
          ) : null)}
        </div>
      </div>

      <div className="bg-white border border-[#E8E1D8] p-6">

        {/* 02 Servicii */}
        <AuditSection title="02 Servicii și profitabilitate" />
        {servicii && (
          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: TAUPE }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: GOLD, fontFamily: 'var(--font-montserrat)', fontWeight: 600 }}>Serviciu</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: GOLD, fontFamily: 'var(--font-montserrat)', fontWeight: 600 }}>Preț (lei)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: GOLD, fontFamily: 'var(--font-montserrat)', fontWeight: 600 }}>Cliente/lună</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(servicii).filter(([, v]) => v.pret || v.nr_cliente).map(([s, v], i) => (
                  <tr key={s} style={{ background: i % 2 === 0 ? 'white' : '#FAF8F5', borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '8px 12px', color: TAUPE, fontFamily: 'var(--font-montserrat)' }}>{s}</td>
                    <td style={{ padding: '8px 12px', color: TAUPE, fontFamily: 'var(--font-montserrat)' }}>{v.pret || '—'}</td>
                    <td style={{ padding: '8px 12px', color: TAUPE, fontFamily: 'var(--font-montserrat)' }}>{v.nr_cliente || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <AuditRow label="Serviciul care aduce cei mai mulți bani" value={r.serviciu_mai_multi_bani} />
        <AuditRow label="Cel mai ușor de vândut" value={r.serviciu_cel_mai_usor} />
        <AuditRow label="Cel mai greu de vândut" value={r.serviciu_cel_mai_greu} />
        <AuditRow label="Consumă cel mai mult timp" value={r.serviciu_cel_mai_mult_timp} />
        <AuditRow label="Cea mai mare marjă de profit" value={r.serviciu_marja_mare} />

        {/* 03 Oportunitati */}
        <AuditSection title="03 Oportunități pierdute" />
        <AuditRow label="Procedură cerută și neofertă" value={r.procedura_ceruta_neoferta} />
        <AuditRow label="Procedură de introdus" value={r.procedura_de_introdus} />
        <AuditRow label="Tip clientă neajutată" value={r.tip_clienta_neajutata} />
        <AuditRow label="Cazuri refuzate" value={r.cazuri_refuzate} />
        <AuditRow label="Cazuri acceptate fără încredere deplină" value={r.cazuri_fara_incredere} />

        {/* 04 Nivel profesional */}
        <AuditSection title="04 Nivel profesional" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8, marginBottom: 16 }}>
          {NIVEL_DOMENII.map(d => {
            const val = r[d.key] as number | null;
            if (!val) return null;
            return (
              <div key={d.key} style={{ background: '#FAF8F5', border: '1px solid #E8E1D8', borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: TAUPE, fontFamily: 'var(--font-montserrat)' }}>{d.label}</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: GOLD, fontFamily: 'var(--font-cormorant)' }}>{val}<span style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 400 }}>/10</span></span>
              </div>
            );
          })}
        </div>
        <AuditRow label="Subiect evitat" value={r.subiect_evitat} />
        <AuditRow label="Procedură fără curaj să o promoveze" value={r.procedura_fara_curaj} />

        {/* 05 Diferentiere */}
        <AuditSection title="05 Diferențiere" />
        <AuditRow label="De ce te aleg clientele" value={r.de_ce_te_aleg} />
        <AuditRow label="Ce te diferențiază" value={r.ce_te_diferentiaza} />
        <AuditRow label="Expertiza dorită" value={r.expertiza_dorita} />
        <AuditRow label="Ce să spună clientele" value={r.ce_sa_spuna_clientele} />

        {/* 06 Social Media */}
        <AuditSection title="06 Social Media & Exposure" />
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 12 }}>
          {[['Instagram', r.instagram_urmatori], ['Facebook', r.facebook_urmatori], ['TikTok', r.tiktok_urmatori]].map(([p, v]) => v ? (
            <div key={p as string} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-montserrat)' }}>{p as string}</p>
              <p style={{ fontSize: 20, fontWeight: 300, color: TAUPE, fontFamily: 'var(--font-cormorant)' }}>{v as string}</p>
            </div>
          ) : null)}
        </div>
        <AuditRow label="Website" value={r.are_website === true ? 'Da' : r.are_website === false ? 'Nu' : null} />
        <AuditRow label="Google Business" value={r.are_google_business === true ? 'Da' : r.are_google_business === false ? 'Nu' : null} />
        <AuditRow label="Frecvența postare" value={r.frecventa_postare} />
        {dificultati && dificultati.length > 0 && <AuditRow label="Dificultăți social media" value={dificultati.join(', ')} />}
        <AuditRow label="Impact postare constantă" value={r.impact_postare_constanta} />

        {/* 07 Viziune */}
        <AuditSection title="07 Viziune" />
        <AuditRow label="Unde vrei să fii peste 12 luni" value={r.viziune_12_luni} />
        <AuditRow label="Procedură de stăpânit" value={r.procedura_de_stapanit} />
        <AuditRow label="Venit considerat succes" value={r.venit_succes} />
        <AuditRow label="Tip clientele dorite" value={r.tip_clientele_dorite} />
        <AuditRow label="Următorul nivel profesional" value={r.urmatorul_nivel} />

        {/* 08 Gap Analysis */}
        <AuditSection title="08 Gap Analysis" />
        <AuditRow label="Ce funcționează bine" value={r.ce_functioneaza_bine} />
        <AuditRow label="Ce limitează creșterea" value={r.ce_limiteaza_cresterea} />
        <AuditRow label="Limita în 3 ani" value={r.limita_3_ani} />
        <AuditRow label="Abilitate cu cel mai mare impact" value={r.abilitate_impact} />
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function AdminSurveyClient() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [leads, setLeads] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('all');
  const [mainTab, setMainTab] = useState<'skin-assessment' | 'survey' | 'audit'>('skin-assessment');
  const [auditRecords, setAuditRecords] = useState<Record<string, unknown>[]>([]);
  const [auditSearch, setAuditSearch] = useState('');
  const [auditSelected, setAuditSelected] = useState<Record<string, unknown> | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);

  const fetchData = useCallback(async (pwd: string, p: string) => {
    setLoading(true);
    try {
      const [dashRes, leadsRes] = await Promise.all([
        fetch(`/api/admin/survey?period=${p}`, { headers: { 'x-admin-password': pwd } }),
        fetch('/api/admin/leads', { headers: { 'x-admin-password': pwd } }),
      ]);
      if (!dashRes.ok) throw new Error('Unauthorized');
      setData(await dashRes.json());
      setLeads((await leadsRes.json()).leads || []);
    } catch {
      setAuthError('Eroare la încărcare date');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/survey?period=all', { headers: { 'x-admin-password': password } });
      if (res.status === 401) { setAuthError('Parolă incorectă'); setLoading(false); return; }
      setAuthed(true);
      setAuthError('');
      fetchData(password, period);
    } catch {
      setAuthError('Eroare conexiune');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) fetchData(password, period);
  }, [period, authed, password, fetchData]);

  const fetchAudit = useCallback(async (search = '') => {
    setAuditLoading(true);
    try {
      const res = await fetch(`/api/audit-profesional/admin?search=${encodeURIComponent(search)}`, { headers: { 'x-admin-password': password } });
      const json = await res.json();
      setAuditRecords(json.records || []);
    } catch { /* ignore */ } finally {
      setAuditLoading(false); }
  }, [password]);

  useEffect(() => {
    if (authed && mainTab === 'audit') fetchAudit(auditSearch);
  }, [authed, mainTab, auditSearch, fetchAudit]);

  const handleExport = (leadsOnly: boolean) => {
    const url = `/api/admin/export${leadsOnly ? '?leads=true' : ''}`;
    fetch(url, { headers: { 'x-admin-password': password } })
      .then(r => r.blob())
      .then(blob => {
        const u = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = u;
        a.download = leadsOnly ? 'leads-analiza.csv' : 'survey-raspunsuri.csv';
        a.click();
        URL.revokeObjectURL(u);
      });
  };

  // ─── Login ──────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: IVORY }}>
        <div className="bg-white border border-[#E8E1D8] p-10 w-full max-w-sm" style={{ boxShadow: '0 4px 24px rgba(74,64,58,0.1)' }}>
          <p className="text-xs uppercase tracking-widest mb-1 text-center" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>Admin</p>
          <h1 className="text-2xl text-center mb-8" style={{ fontFamily: 'var(--font-cormorant)', color: TAUPE, fontWeight: 300 }}>Dashboard</h1>
          <input type="password" placeholder="Parolă admin" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 border text-sm outline-none mb-3" style={{ fontFamily: 'var(--font-montserrat)', borderColor: '#E8E1D8', color: TAUPE, borderRadius: 0 }} />
          {authError && <p className="text-xs mb-3 text-red-500">{authError}</p>}
          <button onClick={handleLogin} disabled={loading} className="w-full btn-gold" style={{ fontFamily: 'var(--font-montserrat)' }}>
            {loading ? 'Se verifică...' : 'Intră'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#F4F6F9', fontFamily: 'var(--font-montserrat)' }}>
      {/* Header */}
      <div className="border-b px-4 py-4 flex items-center justify-between gap-3" style={{ background: TAUPE }}>
        <div>
          <p className="text-xs uppercase tracking-widest" style={{ color: GOLD, fontWeight: 500 }}>Roxana Ica Aesthetic</p>
          <h1 className="text-lg text-white" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>Admin Dashboard</h1>
        </div>
        <a href="/" className="text-xs text-white/60 hover:text-white transition-colors">← Site</a>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Filtre perioadă (survey only) */}
        {mainTab === 'survey' && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {[['all', 'Total'], ['7d', 'Ultimele 7 zile'], ['30d', 'Ultimele 30 zile']].map(([val, label]) => (
              <button key={val} onClick={() => setPeriod(val)} className="px-4 py-2 text-xs border transition-all"
                style={{ borderColor: period === val ? GOLD : '#E8E1D8', background: period === val ? '#FBF7F0' : 'white', color: period === val ? TAUPE : '#7A6F66', fontWeight: period === val ? 600 : 400, borderRadius: 0 }}>
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Main tabs */}
        <div className="flex border-b-2 border-[#E8E1D8] mb-8 flex-wrap">
          {[['skin-assessment', '✦ Skin Assessment'], ['survey', 'Survey'], ['audit', '◈ Audit Profesional 360°']].map(([k, l]) => (
            <button key={k} onClick={() => setMainTab(k as 'skin-assessment' | 'survey' | 'audit')}
              className="px-6 py-4 text-xs uppercase tracking-wide transition-all border-b-2 -mb-0.5"
              style={{ borderColor: mainTab === k ? GOLD : 'transparent', color: mainTab === k ? TAUPE : '#9CA3AF', fontWeight: mainTab === k ? 600 : 400, background: mainTab === k ? 'white' : 'transparent' }}>
              {l}
            </button>
          ))}
        </div>

        {mainTab === 'skin-assessment' && <SkinAssessmentAdmin password={password} />}

        {mainTab === 'survey' && (
          <SurveyAdmin
            password={password}
            data={data}
            leads={leads}
            loading={loading}
            onUpdateLead={(id, status) => setLeads(prev => prev.map(l => l.id === id ? { ...l, lead_status: status } : l))}
            onExport={handleExport}
          />
        )}

        {mainTab === 'audit' && (
          <div>
            {auditSelected ? (
              <AuditFisa record={auditSelected} onBack={() => setAuditSelected(null)} />
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs uppercase tracking-widest" style={{ color: GOLD, fontWeight: 500 }}>Audit Profesional 360° — {auditRecords.length} completări</p>
                  <ShareButton url="https://www.roxanaicaaesthetic.com/audit-profesional" text="Completează Auditul Profesional 360° Roxana Ica Aesthetic — analiza completă a practicii tale de cosmetică. ✦" />
                </div>
                <input type="text" placeholder="Caută după nume, telefon, oraș..." value={auditSearch}
                  onChange={e => setAuditSearch(e.target.value)}
                  className="w-full px-4 py-2 border text-xs outline-none mb-4"
                  style={{ fontFamily: 'var(--font-montserrat)', borderColor: '#E8E1D8', borderRadius: 0, color: TAUPE }} />
                {auditLoading && <p className="text-center py-10 text-sm" style={{ color: '#9CA3AF' }}>Se încarcă...</p>}
                {!auditLoading && auditRecords.length === 0 && (
                  <div className="bg-white border border-[#E8E1D8] p-10 text-center">
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>Niciun audit completat încă.</p>
                  </div>
                )}
                {!auditLoading && auditRecords.length > 0 && (
                  <div className="bg-white border border-[#E8E1D8] overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #F1F5F9' }}>
                          {['Nume', 'Oraș', 'Experiență', 'Venit lunar', 'Data', ''].map(h => (
                            <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wide" style={{ color: '#94A3B8', fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {auditRecords.map((r, i) => (
                          <tr key={r.id as string} style={{ borderBottom: '1px solid #F1F5F9', background: i % 2 === 0 ? 'white' : '#FAFAFA' }}>
                            <td className="px-4 py-3">
                              <p className="text-sm font-medium" style={{ color: TAUPE }}>{r.nume as string}</p>
                              <p className="text-xs" style={{ color: '#9CA3AF' }}>{r.telefon as string || '—'}</p>
                            </td>
                            <td className="px-4 py-3 text-xs" style={{ color: TAUPE }}>{r.oras as string || '—'}</td>
                            <td className="px-4 py-3 text-xs" style={{ color: TAUPE }}>{r.ani_experienta as string || '—'}</td>
                            <td className="px-4 py-3 text-xs" style={{ color: TAUPE }}>{r.venit_lunar as string || '—'}</td>
                            <td className="px-4 py-3 text-xs" style={{ color: '#9CA3AF' }}>{fmt(r.created_at as string)}</td>
                            <td className="px-4 py-3">
                              <button onClick={() => setAuditSelected(r)} className="text-xs px-3 py-1 border" style={{ borderColor: GOLD, color: GOLD, background: 'none', cursor: 'pointer', fontFamily: 'var(--font-montserrat)' }}>
                                Vezi →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-center py-6">
        <a href="/admin/survey" className="text-xs" style={{ color: '#7A6F66', opacity: 0.4, fontFamily: 'var(--font-montserrat)', textDecoration: 'none' }}>admin</a>
      </div>
    </div>
  );
}
