import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-survey';

function checkAuth(request: NextRequest) {
  return request.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const onlyLeads = url.searchParams.get('leads') === 'true';

  let query = supabaseAdmin.from('survey_responses').select('*').order('created_at', { ascending: false });
  if (onlyLeads) query = query.eq('doreste_analiza', true);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Eroare' }, { status: 500 });

  const rows = data || [];
  if (rows.length === 0) {
    return new NextResponse('Fara date', { status: 200, headers: { 'Content-Type': 'text/csv' } });
  }

  const headers = [
    'Data completare', 'Nume', 'Telefon', 'GDPR',
    'Q1 Vârstă', 'Q2 Copii', 'Q3 Sport', 'Q4 Motiv sport', 'Q5 Grijă de mine',
    'Q6 Alimentație', 'Q7 Nutriție', 'Q8 Masă musculară',
    'Q9 Sport suficient', 'Q10 Fermitate', 'Q11 Organ activ', 'Q12 Fibroblast',
    'Q13 Fibroblast colagen', 'Q14 Față greutăți', 'Q15 Tratamente fibroblast',
    'Q16 Cunoști pielea', 'Q17 Viitor piele', 'Q18 Sport piele', 'Q19 Fermitate față',
    'Q20 Observi', 'Q21 Normală', 'Q22 Problemă', 'Q23 Slăbit',
    'Q24 Tratamente', 'Q25 Tratament facial', 'Q26 Explicații', 'Q27 Plan termen',
    'Q28 Bariere', 'Q29 Mai multă grijă', 'Q30 Lipsește',
    'Dorește analiză', 'Status lead',
  ];

  const csvRows = rows.map(r => [
    r.created_at, r.nume, r.telefon, r.gdpr_consent ? 'Da' : 'Nu',
    r.q1_varsta, r.q2_copii, r.q3_sport, r.q4_motiv_sport, r.q5_grija_de_mine,
    r.q6_alimentatie, r.q7_nutritie, r.q8_masa_musculara,
    r.q9_sport_suficient, r.q10_fermitate, r.q11_organ_activ, r.q12_fibroblast,
    r.q13_fibroblast_colagen, r.q14_fata_greutati, r.q15_tratamente_fibroblast,
    r.q16_cunosti_pielea, r.q17_viitor_piele, r.q18_sport_piele, r.q19_fermitate_fata,
    r.q20_observi, r.q21_normala, r.q22_problema, r.q23_slabit,
    r.q24_tratamente, r.q25_tratament_facial, r.q26_explicatii, r.q27_plan_termen,
    r.q28_bariere, r.q29_mai_multa_grija, r.q30_lipseste,
    r.doreste_analiza ? 'Da' : 'Nu', r.lead_status || 'Nou',
  ].map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','));

  const csv = '﻿' + [headers.join(','), ...csvRows].join('\r\n');
  const filename = onlyLeads ? 'leads-analiza-faciala.csv' : 'survey-raspunsuri.csv';

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
