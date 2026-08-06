'use client';

import { useState, useEffect, useCallback } from 'react';

const GOLD = '#C6A769';
const TAUPE = '#4A403A';
const IVORY = '#F8F6F2';

const LEAD_STATUSES = ['Nou', 'Contactată', 'Programată', 'Finalizată', 'Nu răspunde', 'Nu dorește'];

// ─── Question definitions ────────────────────────────────────────────────────
type QuestionDef = {
  key: string;
  nr: number;
  text: string;
  multi?: boolean; // multi-select (CSV stored)
};

const QUESTIONS: QuestionDef[] = [
  { key: 'q1_varsta', nr: 1, text: 'Ce grupă de vârstă te reprezintă?' },
  { key: 'q2_copii', nr: 2, text: 'Ai copii?' },
  { key: 'q3_sport', nr: 3, text: 'Cât de des faci sport sau mișcare?' },
  { key: 'q4_motiv_sport', nr: 4, text: 'Care este motivul principal pentru care faci sport?' },
  { key: 'q5_grija_de_mine', nr: 5, text: 'Pe o scară de la 1 la 5, cât de mult consideri că îți acorzi atenție și grijă ție însuți?' },
  { key: 'q6_alimentatie', nr: 6, text: 'Ești atentă la alimentație?' },
  { key: 'q7_nutritie', nr: 7, text: 'Urmezi sau ai urmat vreodată un plan de nutriție?' },
  { key: 'q8_masa_musculara', nr: 8, text: 'Ești mulțumită de masa musculară și de felul în care arată corpul tău?' },
  { key: 'q9_sport_suficient', nr: 9, text: 'Consideri că sportul pe care îl faci este suficient pentru a-ți menține corpul în formă?' },
  { key: 'q10_fermitate', nr: 10, text: 'Ai observat o pierdere de fermitate a pielii în ultimii ani?' },
  { key: 'q11_organ_activ', nr: 11, text: 'Știai că pielea este cel mai mare organ activ al corpului și că are nevoie de îngrijire specializată, la fel ca orice alt organ?' },
  { key: 'q12_fibroblast', nr: 12, text: 'Ai auzit vreodată de fibroblast și rolul lui în producerea colagenului și elastinei?' },
  { key: 'q13_fibroblast_colagen', nr: 13, text: 'Știai că stimularea fibroblastului este una dintre cele mai eficiente metode de a regenera pielea și de a reda fermitatea?' },
  { key: 'q14_fata_greutati', nr: 14, text: 'Dacă ai face exerciții cu greutăți pentru față și gât, crezi că pielea ar deveni mai fermă?' },
  { key: 'q15_tratamente_fibroblast', nr: 15, text: 'Ce tratamente estetice ai mai făcut sau ai în vedere?', multi: true },
  { key: 'q16_cunosti_pielea', nr: 16, text: 'Cât de des simți că vrei să schimbi ceva la aspectul tău fizic?' },
  { key: 'q17_viitor_piele', nr: 17, text: 'Ce ai vrea să îmbunătățești la corpul sau pielea ta?', multi: true },
  { key: 'q18_sport_piele', nr: 18, text: 'Cât de des faci tratamente faciale profesionale?' },
  { key: 'q19_fermitate_fata', nr: 19, text: 'Ce tipuri de tratamente faciale ai mai încercat?', multi: true },
  { key: 'q20_observi', nr: 20, text: 'Câtă atenție acorzi sănătății pielii față de sportul pe care îl practici?' },
  { key: 'q21_normala', nr: 21, text: 'Ai primit vreodată explicații clare despre ce tip de ten ai și ce are nevoie pielea ta?' },
  { key: 'q22_problema', nr: 22, text: 'Ai primit vreodată un plan profesional de îngrijire a pielii, pe termen lung?' },
  { key: 'q23_slabit', nr: 23, text: 'Ce te oprește să investești mai mult în îngrijirea pielii?', multi: true },
  { key: 'q24_tratamente', nr: 24, text: 'Cât de bine cunoști pielea ta ca organ?' },
  { key: 'q25_tratament_facial', nr: 25, text: 'În ce momente simți că ai vrea să începi să ai mai multă grijă de tine?', multi: true },
  { key: 'q26_explicatii', nr: 26, text: 'Cât de consecventă ești cu rutina de îngrijire a pielii acasă?' },
  { key: 'q27_plan_termen', nr: 27, text: 'Ai fi deschisă să lucrezi cu un specialist care să îți ofere un plan personalizat de îngrijire a pielii?' },
];

// ─── Types ──────────────────────────────────────────────────────────────────
type Response = Record<string, string>;

// ─── Helper ─────────────────────────────────────────────────────────────────
function pct(count: number, total: number) {
  if (total === 0) return 0;
  return Math.round((count / total) * 100);
}

// ─── StatCard ───────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white border border-[#E8E1D8] p-5 flex flex-col gap-1" style={{ boxShadow: '0 1px 8px rgba(74,64,58,0.05)' }}>
      <p className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>{label}</p>
      <p className="text-3xl font-light" style={{ fontFamily: 'var(--font-cormorant)', color: TAUPE }}>{value}</p>
      {sub && <p className="text-xs" style={{ fontFamily: 'var(--font-montserrat)', color: '#9CA3AF' }}>{sub}</p>}
    </div>
  );
}

// ─── QuestionCard ────────────────────────────────────────────────────────────
function QuestionCard({
  question,
  counts,
  total,
  responses,
  multi,
}: {
  question: QuestionDef;
  counts: Record<string, number>;
  total: number;
  responses: Response[];
  multi?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [filterOption, setFilterOption] = useState<string | null>(null);

  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const maxCount = entries[0]?.[1] || 1;

  // For multi-select, effective total is total responses (not sum of options)
  const effectiveTotal = multi ? total : total;

  // People who responded to this question (non-empty)
  const respondents = responses.filter(r => {
    const val = r[question.key] ?? '';
    return val.trim() !== '';
  });

  // Filter by clicked bar option
  const filteredByOption = filterOption
    ? respondents.filter(r => {
        const val = r[question.key] ?? '';
        if (multi) {
          return val.split(',').map(s => s.trim()).includes(filterOption);
        }
        return val === filterOption;
      })
    : respondents;

  return (
    <div className="bg-white border border-[#E8E1D8]" style={{ boxShadow: '0 1px 8px rgba(74,64,58,0.05)' }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-[#F1F5F9]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            <span className="text-xs font-semibold shrink-0 mt-0.5" style={{ color: GOLD, fontFamily: 'var(--font-montserrat)' }}>
              {question.nr}.
            </span>
            <p className="text-sm leading-snug" style={{ fontFamily: 'var(--font-montserrat)', color: TAUPE, fontWeight: 500 }}>
              {question.text}
            </p>
          </div>
          <span className="text-xs shrink-0" style={{ color: '#9CA3AF', fontFamily: 'var(--font-montserrat)' }}>
            {respondents.length} răsp.
          </span>
        </div>
        {multi && (
          <p className="mt-2 text-xs" style={{ fontFamily: 'var(--font-montserrat)', color: '#6B7280' }}>
            Răspuns multiplu — procentele pot depăși 100% cumulat
          </p>
        )}
      </div>

      {/* Bars */}
      <div className="px-5 py-4 flex flex-col gap-2">
        {entries.length === 0 && (
          <p className="text-xs py-2" style={{ color: '#9CA3AF', fontFamily: 'var(--font-montserrat)' }}>Nu există răspunsuri încă.</p>
        )}
        {entries.map(([option, count]) => {
          const barPct = pct(count, effectiveTotal);
          const barWidth = pct(count, maxCount);
          const isActive = filterOption === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                setFilterOption(isActive ? null : option);
                setExpanded(true);
              }}
              className="w-full text-left group"
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs leading-snug flex-1"
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    color: isActive ? TAUPE : '#4B5563',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {option}
                </span>
                <span className="text-xs shrink-0" style={{ fontFamily: 'var(--font-montserrat)', color: isActive ? TAUPE : '#9CA3AF', minWidth: 48, textAlign: 'right' }}>
                  {count} ({barPct}%)
                </span>
              </div>
              <div style={{ height: 8, background: '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${barWidth}%`,
                    background: isActive ? TAUPE : GOLD,
                    borderRadius: 4,
                    transition: 'width 0.4s ease, background 0.2s',
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Toggle individual responses */}
      <div className="px-5 pb-4">
        <button
          type="button"
          onClick={() => { setExpanded(e => !e); if (expanded) setFilterOption(null); }}
          className="text-xs uppercase tracking-wide transition-colors"
          style={{ fontFamily: 'var(--font-montserrat)', color: expanded ? '#9CA3AF' : GOLD, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          {expanded ? '↑ Ascunde răspunsurile' : '↓ Vezi răspunsurile individuale'}
        </button>
      </div>

      {/* Individual responses table */}
      {expanded && (
        <div className="border-t border-[#F1F5F9]">
          {filterOption && (
            <div className="px-5 py-2 flex items-center gap-2" style={{ background: '#FBF7F0' }}>
              <span className="text-xs" style={{ fontFamily: 'var(--font-montserrat)', color: TAUPE }}>
                Filtrat: <strong>{filterOption}</strong>
              </span>
              <button
                type="button"
                onClick={() => setFilterOption(null)}
                className="text-xs ml-auto"
                style={{ fontFamily: 'var(--font-montserrat)', color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                × Șterge filtru
              </button>
            </div>
          )}
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8FAFC' }}>
                <th className="px-5 py-2 text-left text-xs uppercase tracking-wide" style={{ color: '#94A3B8', fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>Nume</th>
                <th className="px-5 py-2 text-left text-xs uppercase tracking-wide" style={{ color: '#94A3B8', fontFamily: 'var(--font-montserrat)', fontWeight: 400 }}>Răspuns</th>
              </tr>
            </thead>
            <tbody>
              {filteredByOption.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-5 py-4 text-xs text-center" style={{ color: '#9CA3AF', fontFamily: 'var(--font-montserrat)' }}>
                    Nicio persoană cu acest răspuns.
                  </td>
                </tr>
              )}
              {filteredByOption.map((resp, i) => (
                <tr key={resp.id || i} style={{ borderTop: '1px solid #F8FAFC' }} className="hover:bg-[#FDFCFB] transition-colors">
                  <td className="px-5 py-2 text-sm" style={{ color: TAUPE, fontFamily: 'var(--font-montserrat)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {resp.nume || '—'}
                  </td>
                  <td className="px-5 py-2 text-sm" style={{ color: '#4B5563', fontFamily: 'var(--font-montserrat)' }}>
                    {resp[question.key] || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── ShareButton ─────────────────────────────────────────────────────────────
const SURVEY_URL = 'https://www.roxanaicaaesthetic.com/chestionar';
const SHARE_TEXT = 'Completează chestionarul Roxana Ica Aesthetic — află cât de bine îți cunoști pielea! 🌿';

function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Chestionar Roxana Ica Aesthetic', text: SHARE_TEXT, url: SURVEY_URL });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${SHARE_TEXT}\n${SURVEY_URL}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleShare}
      style={{
        background: copied ? '#22C55E' : GOLD,
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        fontSize: 11,
        fontFamily: 'var(--font-montserrat)',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        transition: 'background 0.2s',
        borderRadius: 0,
        whiteSpace: 'nowrap',
      }}
    >
      {copied ? (
        <>✓ Link copiat</>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Trimite chestionar
        </>
      )}
    </button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminSurveyClient() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [leads, setLeads] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('all');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'insights' | 'export'>('dashboard');
  const [updatingLead, setUpdatingLead] = useState<string | null>(null);

  const fetchData = useCallback(async (pwd: string, p: string) => {
    setLoading(true);
    try {
      const [dashRes, leadsRes] = await Promise.all([
        fetch(`/api/admin/survey?period=${p}`, { headers: { 'x-admin-password': pwd } }),
        fetch('/api/admin/leads', { headers: { 'x-admin-password': pwd } }),
      ]);
      if (!dashRes.ok) throw new Error('Unauthorized');
      const dashData = await dashRes.json();
      const leadsData = await leadsRes.json();
      setData(dashData);
      setLeads(leadsData.leads || []);
    } catch {
      setAuthError('Eroare la încărcare date');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/survey?period=all`, { headers: { 'x-admin-password': password } });
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

  const updateLeadStatus = async (id: string, status: string) => {
    setUpdatingLead(id);
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ id, status }),
    });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, lead_status: status } : l));
    setUpdatingLead(null);
  };

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

  // ─── Login ─────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: IVORY }}>
        <div className="bg-white border border-[#E8E1D8] p-10 w-full max-w-sm" style={{ boxShadow: '0 4px 24px rgba(74,64,58,0.1)' }}>
          <p className="text-xs uppercase tracking-widest mb-1 text-center" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>Admin</p>
          <h1 className="text-2xl text-center mb-8" style={{ fontFamily: 'var(--font-cormorant)', color: TAUPE, fontWeight: 300 }}>
            Survey Dashboard
          </h1>
          <input
            type="password"
            placeholder="Parolă admin"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3 border text-sm outline-none mb-3"
            style={{ fontFamily: 'var(--font-montserrat)', borderColor: '#E8E1D8', color: TAUPE, borderRadius: 0 }}
          />
          {authError && <p className="text-xs mb-3 text-red-500">{authError}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full btn-gold"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            {loading ? 'Se verifică...' : 'Intră'}
          </button>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen" style={{ background: '#F4F6F9', fontFamily: 'var(--font-montserrat)' }}>
      {/* Header */}
      <div className="border-b px-4 py-4 flex items-center justify-between gap-3" style={{ background: TAUPE }}>
        <div>
          <p className="text-xs uppercase tracking-widest" style={{ color: GOLD, fontWeight: 500 }}>Roxana Ica Aesthetic</p>
          <h1 className="text-lg text-white" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>Survey Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <ShareButton />
          <a href="/" className="text-xs text-white/60 hover:text-white transition-colors">← Site</a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Filtre perioadă */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[['all', 'Total'], ['7d', 'Ultimele 7 zile'], ['30d', 'Ultimele 30 zile']].map(([val, label]) => (
            <button key={val} onClick={() => setPeriod(val)}
              className="px-4 py-2 text-xs border transition-all"
              style={{
                borderColor: period === val ? GOLD : '#E8E1D8',
                background: period === val ? '#FBF7F0' : 'white',
                color: period === val ? TAUPE : '#7A6F66',
                fontWeight: period === val ? 600 : 400,
                borderRadius: 0,
              }}
            >{label}</button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E8E1D8] mb-8 gap-1">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className="px-5 py-3 text-xs uppercase tracking-wide transition-all border-b-2"
              style={{
                borderColor: activeTab === t.key ? GOLD : 'transparent',
                color: activeTab === t.key ? TAUPE : '#9CA3AF',
                fontWeight: activeTab === t.key ? 600 : 400,
              }}
            >{t.label}</button>
          ))}
        </div>

        {loading && <p className="text-center py-16 text-sm" style={{ color: '#9CA3AF' }}>Se încarcă...</p>}

        {/* ── DASHBOARD ── */}
        {!loading && activeTab === 'dashboard' && (
          <>
            {/* Stats principale */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total completări" value={total} />
              <StatCard label="Lead-uri analiză" value={leadsInfo.count || 0} sub={`${leadsInfo.pct || 0}% conversie`} />
              <StatCard label="Survey-uri începute" value={tracking.started || 0} sub={`${tracking.completionRate || 0}% completion rate`} />
              <StatCard label="Analiză solicitată" value={tracking.analysisRequested || 0} sub={`${tracking.conversionRate || 0}% din completări`} />
            </div>

            {/* Survey Results — toate întrebările */}
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: GOLD, fontWeight: 500 }}>
              Survey Results — {total} răspunsuri
            </p>
            <div className="flex flex-col gap-5">
              {QUESTIONS.map(q => (
                <QuestionCard
                  key={q.key}
                  question={q}
                  counts={charts[q.key] || {}}
                  total={total}
                  responses={responses}
                  multi={q.multi}
                />
              ))}
            </div>
          </>
        )}

        {/* ── LEADS ── */}
        {!loading && activeTab === 'leads' && (
          <div className="bg-white border border-[#E8E1D8] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
              <p className="text-sm font-medium" style={{ color: TAUPE }}>{leads.length} persoane au completat · {leadsInfo.count || 0} au solicitat analiza gratuită</p>
              <button onClick={() => handleExport(true)} className="text-xs px-4 py-2 border border-[#E8E1D8] hover:border-[#C6A769] transition-all" style={{ color: TAUPE }}>
                Export leads CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
                    {['Nume', 'Telefon', 'Analiză', 'Data', 'Status'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wide" style={{ color: '#94A3B8' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr key={lead.id} style={{ borderBottom: i < leads.length - 1 ? '1px solid #F8FAFC' : 'none' }}
                      className="hover:bg-[#FDFCFB] transition-colors">
                      <td className="px-4 py-3 text-sm font-medium" style={{ color: TAUPE }}>{lead.nume}</td>
                      <td className="px-4 py-3 text-sm" style={{ color: '#64748B' }}>
                        <a href={`tel:${lead.telefon}`} className="hover:underline" style={{ color: GOLD }}>{lead.telefon}</a>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {lead.doreste_analiza
                          ? <span style={{ color: '#16A34A', fontWeight: 600, fontSize: 11 }}>✓ DA</span>
                          : <span style={{ color: '#9CA3AF', fontSize: 11 }}>Nu</span>}
                      </td>
                      <td className="px-4 py-3 text-sm" style={{ color: '#64748B' }}>
                        {new Date(lead.created_at).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={lead.lead_status || 'Nou'}
                          onChange={e => updateLeadStatus(lead.id, e.target.value)}
                          disabled={updatingLead === lead.id}
                          className="text-xs px-2 py-1 border outline-none"
                          style={{ borderColor: '#E8E1D8', color: TAUPE, fontFamily: 'var(--font-montserrat)', borderRadius: 0 }}
                        >
                          {LEAD_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-12 text-center text-sm" style={{ color: '#9CA3AF' }}>Nu există răspunsuri încă.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── INSIGHTS ── */}
        {!loading && activeTab === 'insights' && (
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: GOLD, fontWeight: 500 }}>
              Statistici generate automat din datele reale
            </p>
            {insights.length === 0 && (
              <p className="text-sm" style={{ color: '#9CA3AF' }}>Nu există date suficiente pentru insight-uri.</p>
            )}
            {insights.map((insight, i) => (
              <div key={i} className="bg-white border border-[#E8E1D8] p-5" style={{ boxShadow: '0 1px 8px rgba(74,64,58,0.05)' }}>
                <p className="text-base leading-relaxed" style={{ fontFamily: 'var(--font-cormorant)', color: TAUPE, fontSize: '1.1rem' }}>
                  „{insight}"
                </p>
                <button
                  onClick={() => navigator.clipboard.writeText(insight)}
                  className="mt-3 text-xs uppercase tracking-wide"
                  style={{ color: GOLD, fontFamily: 'var(--font-montserrat)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  Copiază →
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── EXPORT ── */}
        {!loading && activeTab === 'export' && (
          <div className="flex flex-col gap-4 max-w-md">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: GOLD, fontWeight: 500 }}>Export date</p>
            <div className="bg-white border border-[#E8E1D8] p-6">
              <p className="text-sm font-medium mb-1" style={{ color: TAUPE }}>Toate răspunsurile</p>
              <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>Un rând per participantă, toate cele 27 de întrebări.</p>
              <button onClick={() => handleExport(false)} className="btn-gold text-xs" style={{ fontFamily: 'var(--font-montserrat)' }}>
                Export CSV complet
              </button>
            </div>
            <div className="bg-white border border-[#E8E1D8] p-6">
              <p className="text-sm font-medium mb-1" style={{ color: TAUPE }}>Doar leads — analiză facială</p>
              <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>Doar persoanele care au solicitat analiza gratuită, cu statusul lead-ului.</p>
              <button onClick={() => handleExport(true)} className="btn-gold text-xs" style={{ fontFamily: 'var(--font-montserrat)' }}>
                Export leads CSV
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center py-6">
        <a href="/admin/survey" className="text-xs" style={{ color: '#7A6F66', opacity: 0.4, fontFamily: 'var(--font-montserrat)', textDecoration: 'none' }}>
          admin
        </a>
      </div>
    </div>
  );
}
