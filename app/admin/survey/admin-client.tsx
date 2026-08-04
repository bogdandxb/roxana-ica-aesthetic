'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const GOLD = '#C6A769';
const TAUPE = '#4A403A';
const IVORY = '#F8F6F2';
const COLORS = ['#C6A769', '#B8952A', '#D4B896', '#7A6F66', '#4A403A', '#E8E1D8'];

const LEAD_STATUSES = ['Nou', 'Contactată', 'Programată', 'Finalizată', 'Nu răspunde', 'Nu dorește'];

function toChartData(obj: Record<string, number>) {
  return Object.entries(obj || {}).map(([name, value]) => ({ name, value }));
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white border border-[#E8E1D8] p-5 flex flex-col gap-1" style={{ boxShadow: '0 1px 8px rgba(74,64,58,0.05)' }}>
      <p className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-montserrat)', color: GOLD, fontWeight: 500 }}>{label}</p>
      <p className="text-3xl font-light" style={{ fontFamily: 'var(--font-cormorant)', color: TAUPE }}>{value}</p>
      {sub && <p className="text-xs" style={{ fontFamily: 'var(--font-montserrat)', color: '#9CA3AF' }}>{sub}</p>}
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#E8E1D8] p-5" style={{ boxShadow: '0 1px 8px rgba(74,64,58,0.05)' }}>
      <p className="text-sm mb-4 uppercase tracking-widest" style={{ fontFamily: 'var(--font-montserrat)', color: TAUPE, fontWeight: 500 }}>{title}</p>
      {children}
    </div>
  );
}

function SimpleBar({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24 }}>
        <XAxis type="number" tick={{ fontSize: 11, fontFamily: 'var(--font-montserrat)' }} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fontFamily: 'var(--font-montserrat)' }} width={130} />
        <Tooltip contentStyle={{ fontFamily: 'var(--font-montserrat)', fontSize: 12 }} />
        <Bar dataKey="value" fill={GOLD} radius={[0, 3, 3, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function SimplePie({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name ?? ''} ${(((percent as number) ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={{ fontFamily: 'var(--font-montserrat)', fontSize: 12 }} />
        <Legend wrapperStyle={{ fontFamily: 'var(--font-montserrat)', fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

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
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('x-admin-password', password);
    // Folosim fetch pentru a trimite header-ul
    fetch(url, { headers: { 'x-admin-password': password } })
      .then(r => r.blob())
      .then(blob => {
        const u = URL.createObjectURL(blob);
        const a2 = document.createElement('a');
        a2.href = u;
        a2.download = leadsOnly ? 'leads-analiza.csv' : 'survey-raspunsuri.csv';
        a2.click();
        URL.revokeObjectURL(u);
      });
  };

  // ─── Login ──────────────────────────────────────────────────────────────
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

      <div className="max-w-7xl mx-auto px-4 py-8">
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

        {!loading && activeTab === 'dashboard' && (
          <>
            {/* Stats principale */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total completări" value={total} />
              <StatCard label="Lead-uri analiză" value={leadsInfo.count || 0} sub={`${leadsInfo.pct || 0}% conversie`} />
              <StatCard label="Survey-uri începute" value={tracking.started || 0} sub={`${tracking.completionRate || 0}% completion rate`} />
              <StatCard label="Analiză solicitată" value={tracking.analysisRequested || 0} sub={`${tracking.conversionRate || 0}% din completări`} />
            </div>

            {/* Grafice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ChartCard title="Distribuție vârstă">
                <SimplePie data={toChartData(charts.varsta)} />
              </ChartCard>
              <ChartCard title="Frecvență sport">
                <SimpleBar data={toChartData(charts.sport)} />
              </ChartCard>
              <ChartCard title="Motiv principal sport">
                <SimpleBar data={toChartData(charts.motivSport)} />
              </ChartCard>
              <ChartCard title="Atenție la alimentație">
                <SimplePie data={toChartData(charts.alimentatie)} />
              </ChartCard>
              <ChartCard title="Cunoaștere fibroblast (Q12)">
                <SimplePie data={toChartData(charts.fibroblast)} />
              </ChartCard>
              <ChartCard title="Față/gât - pierdere fermitate (Q19)">
                <SimplePie data={toChartData(charts.fermitataFata)} />
              </ChartCard>
              <ChartCard title="Ce observi la piele (Q20)">
                <SimpleBar data={toChartData(charts.observi)} />
              </ChartCard>
              <ChartCard title="Tratamente faciale profesionale (Q24)">
                <SimplePie data={toChartData(charts.tratamente)} />
              </ChartCard>
              <ChartCard title="Bariere tratamente (Q28)">
                <SimpleBar data={toChartData(charts.bariere)} />
              </ChartCard>
              <ChartCard title="Ce lipsește din plan (Q30)">
                <SimpleBar data={toChartData(charts.lipseste)} />
              </ChartCard>
            </div>
          </>
        )}

        {!loading && activeTab === 'leads' && (
          <div className="bg-white border border-[#E8E1D8] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F1F5F9] flex items-center justify-between">
              <p className="text-sm font-medium" style={{ color: TAUPE }}>{leadsInfo.count || 0} persoane au solicitat analiza facială gratuită</p>
              <button onClick={() => handleExport(true)} className="text-xs px-4 py-2 border border-[#E8E1D8] hover:border-[#C6A769] transition-all" style={{ color: TAUPE }}>
                Export leads CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
                    {['Nume', 'Telefon', 'Data', 'Status'].map(h => (
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
                    <tr><td colSpan={4} className="px-4 py-12 text-center text-sm" style={{ color: '#9CA3AF' }}>Nu există lead-uri încă.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
                  style={{ color: GOLD, fontFamily: 'var(--font-montserrat)' }}
                >
                  Copiază →
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && activeTab === 'export' && (
          <div className="flex flex-col gap-4 max-w-md">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: GOLD, fontWeight: 500 }}>Export date</p>
            <div className="bg-white border border-[#E8E1D8] p-6">
              <p className="text-sm font-medium mb-1" style={{ color: TAUPE }}>Toate răspunsurile</p>
              <p className="text-xs mb-4" style={{ color: '#9CA3AF' }}>Un rând per participantă, toate cele 30 de întrebări.</p>
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
    </div>
  );
}
