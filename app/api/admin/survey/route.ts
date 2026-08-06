import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-survey';

function checkAuth(request: NextRequest) {
  const auth = request.headers.get('x-admin-password');
  return auth === process.env.ADMIN_PASSWORD;
}

function pct(count: number, total: number) {
  if (total === 0) return 0;
  return Math.round((count / total) * 100);
}

function countBy(rows: Record<string, string>[], field: string) {
  const result: Record<string, number> = {};
  for (const row of rows) {
    const val = row[field] ?? 'Nespecificat';
    result[val] = (result[val] || 0) + 1;
  }
  return result;
}

// For multi-select fields (CSV stored), count each option separately
function countMulti(rows: Record<string, string>[], field: string) {
  const result: Record<string, number> = {};
  for (const row of rows) {
    const val = row[field] ?? '';
    if (!val) continue;
    const parts = val.split(',').map((s: string) => s.trim()).filter(Boolean);
    for (const part of parts) {
      result[part] = (result[part] || 0) + 1;
    }
  }
  return result;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || 'all';

    let query = supabaseAdmin
      .from('survey_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (period === '7d') {
      const d = new Date(); d.setDate(d.getDate() - 7);
      query = query.gte('created_at', d.toISOString());
    } else if (period === '30d') {
      const d = new Date(); d.setDate(d.getDate() - 30);
      query = query.gte('created_at', d.toISOString());
    }

    const { data: rows, error } = await query;
    if (error) throw error;

    const total = rows?.length || 0;
    const r = (rows || []) as Record<string, string>[];

    // Tracking
    const { data: tracking } = await supabaseAdmin.from('survey_tracking').select('event_type');
    const started = tracking?.filter(t => t.event_type === 'survey_started').length || 0;
    const completed = tracking?.filter(t => t.event_type === 'survey_completed').length || 0;
    const analysisRequested = tracking?.filter(t => t.event_type === 'facial_analysis_requested').length || 0;

    // Leads
    const leads = r.filter(row => Boolean(row.doreste_analiza));
    const leadsCount = leads.length;

    // Content insights
    const sport3Plus = r.filter(row => row.q3_sport === '3–4 ori/săpt.' || row.q3_sport === '5+ ori/săpt.').length;
    const tratamenteRegulatCount = r.filter(row => row.q18_sport_piele === 'Lunar/regulat').length;
    const pierdeFermitate = r.filter(row => row.q10_fermitate === 'Da').length;
    const faraPlan = r.filter(row => row.q22_problema === 'Nu').length;

    const insights: string[] = [];
    if (total > 0) {
      if (sport3Plus > 0) {
        insights.push(`Din ${total} participante, ${pct(sport3Plus, total)}% fac sport de minimum 3 ori pe săptămână, dar doar ${pct(tratamenteRegulatCount, total)}% fac tratamente faciale regulat.`);
      }
      if (pierdeFermitate > 0) {
        insights.push(`${pct(pierdeFermitate, total)}% dintre participante au observat pierderea fermității pielii.`);
      }
      if (faraPlan > 0) {
        insights.push(`${pct(faraPlan, total)}% nu au primit niciodată un plan profesional de tratament pe termen lung.`);
      }
    }

    // Individual responses for drill-down in analytics
    const responses = r.map(row => ({
      id: row.id,
      nume: row.nume,
      q1_varsta: row.q1_varsta,
      q2_copii: row.q2_copii,
      q3_sport: row.q3_sport,
      q4_motiv_sport: row.q4_motiv_sport,
      q5_grija_de_mine: row.q5_grija_de_mine,
      q6_alimentatie: row.q6_alimentatie,
      q7_nutritie: row.q7_nutritie,
      q8_masa_musculara: row.q8_masa_musculara,
      q9_sport_suficient: row.q9_sport_suficient,
      q10_fermitate: row.q10_fermitate,
      q11_organ_activ: row.q11_organ_activ,
      q12_fibroblast: row.q12_fibroblast,
      q13_fibroblast_colagen: row.q13_fibroblast_colagen,
      q14_fata_greutati: row.q14_fata_greutati,
      q15_tratamente_fibroblast: row.q15_tratamente_fibroblast,
      q16_cunosti_pielea: row.q16_cunosti_pielea,
      q17_viitor_piele: row.q17_viitor_piele,
      q18_sport_piele: row.q18_sport_piele,
      q19_fermitate_fata: row.q19_fermitate_fata,
      q20_observi: row.q20_observi,
      q21_normala: row.q21_normala,
      q22_problema: row.q22_problema,
      q23_slabit: row.q23_slabit,
      q24_tratamente: row.q24_tratamente,
      q25_tratament_facial: row.q25_tratament_facial,
      q26_explicatii: row.q26_explicatii,
      q27_plan_termen: row.q27_plan_termen,
    }));

    return NextResponse.json({
      total,
      tracking: { started, completed, analysisRequested, completionRate: pct(completed, started), conversionRate: pct(leadsCount, total) },
      leads: { count: leadsCount, pct: pct(leadsCount, total) },
      charts: {
        q1_varsta: countBy(r, 'q1_varsta'),
        q2_copii: countBy(r, 'q2_copii'),
        q3_sport: countBy(r, 'q3_sport'),
        q4_motiv_sport: countBy(r, 'q4_motiv_sport'),
        q5_grija_de_mine: countBy(r, 'q5_grija_de_mine'),
        q6_alimentatie: countBy(r, 'q6_alimentatie'),
        q7_nutritie: countBy(r, 'q7_nutritie'),
        q8_masa_musculara: countBy(r, 'q8_masa_musculara'),
        q9_sport_suficient: countBy(r, 'q9_sport_suficient'),
        q10_fermitate: countBy(r, 'q10_fermitate'),
        q11_organ_activ: countBy(r, 'q11_organ_activ'),
        q12_fibroblast: countBy(r, 'q12_fibroblast'),
        q13_fibroblast_colagen: countBy(r, 'q13_fibroblast_colagen'),
        q14_fata_greutati: countBy(r, 'q14_fata_greutati'),
        q15_tratamente_fibroblast: countMulti(r, 'q15_tratamente_fibroblast'),
        q16_cunosti_pielea: countBy(r, 'q16_cunosti_pielea'),
        q17_viitor_piele: countMulti(r, 'q17_viitor_piele'),
        q18_sport_piele: countBy(r, 'q18_sport_piele'),
        q19_fermitate_fata: countMulti(r, 'q19_fermitate_fata'),
        q20_observi: countBy(r, 'q20_observi'),
        q21_normala: countBy(r, 'q21_normala'),
        q22_problema: countBy(r, 'q22_problema'),
        q23_slabit: countMulti(r, 'q23_slabit'),
        q24_tratamente: countBy(r, 'q24_tratamente'),
        q25_tratament_facial: countMulti(r, 'q25_tratament_facial'),
        q26_explicatii: countBy(r, 'q26_explicatii'),
        q27_plan_termen: countBy(r, 'q27_plan_termen'),
      },
      responses,
      insights,
    });
  } catch (error) {
    console.error('[ADMIN SURVEY] Error:', error);
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
