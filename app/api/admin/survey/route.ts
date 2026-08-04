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

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || 'all';
    const filterVarsta = url.searchParams.get('varsta') || '';
    const filterSport = url.searchParams.get('sport') || '';
    const filterTratamente = url.searchParams.get('tratamente') || '';
    const filterAnaliza = url.searchParams.get('analiza') || '';
    const filterQ30 = url.searchParams.get('q30') || '';

    let query = supabaseAdmin.from('survey_responses').select('*').order('created_at', { ascending: false });

    if (period === '7d') {
      const d = new Date(); d.setDate(d.getDate() - 7);
      query = query.gte('created_at', d.toISOString());
    } else if (period === '30d') {
      const d = new Date(); d.setDate(d.getDate() - 30);
      query = query.gte('created_at', d.toISOString());
    }

    if (filterVarsta) query = query.eq('q1_varsta', filterVarsta);
    if (filterSport) query = query.eq('q3_sport', filterSport);
    if (filterTratamente) query = query.eq('q24_tratamente', filterTratamente);
    if (filterAnaliza === 'da') query = query.eq('doreste_analiza', true);
    if (filterAnaliza === 'nu') query = query.eq('doreste_analiza', false);
    if (filterQ30) query = query.eq('q30_lipseste', filterQ30);

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
    const tratamenteRegulatCount = r.filter(row => row.q24_tratamente === 'Lunar/regulat').length;
    const pierdeFermitate = r.filter(row => row.q19_fermitate_fata === 'Da').length;
    const pierdeFermitateNoTratament = r.filter(row => row.q19_fermitate_fata === 'Da' && row.q24_tratamente !== 'Lunar/regulat').length;
    const maiPutinPiele = r.filter(row => row.q16_cunosti_pielea === 'Mult mai puțin' || row.q16_cunosti_pielea === 'Mai puțin').length;
    const faraPlan = r.filter(row => row.q27_plan_termen === 'Nu').length;

    const insights = [];
    if (total > 0) {
      if (sport3Plus > 0 && tratamenteRegulatCount >= 0) {
        insights.push(`Din ${total} participante, ${pct(sport3Plus, total)}% fac sport de minimum 3 ori pe săptămână, dar doar ${pct(tratamenteRegulatCount, total)}% fac tratamente faciale regulat.`);
      }
      if (pierdeFermitate > 0) {
        insights.push(`${pct(pierdeFermitateNoTratament, pierdeFermitate)}% dintre femeile care au observat pierderea fermității nu urmează un program regulat de tratamente.`);
      }
      if (maiPutinPiele > 0) {
        insights.push(`${pct(maiPutinPiele, total)}% dintre participante declară că știu mai puțin despre piele decât despre sport și nutriție.`);
      }
      if (faraPlan > 0) {
        insights.push(`${pct(faraPlan, total)}% nu au primit niciodată un plan profesional de tratament pe termen lung.`);
      }
    }

    return NextResponse.json({
      total,
      tracking: { started, completed, analysisRequested, completionRate: pct(completed, started), conversionRate: pct(leadsCount, total) },
      leads: { count: leadsCount, pct: pct(leadsCount, total) },
      charts: {
        varsta: countBy(r, 'q1_varsta'),
        copii: countBy(r, 'q2_copii'),
        sport: countBy(r, 'q3_sport'),
        motivSport: countBy(r, 'q4_motiv_sport'),
        alimentatie: countBy(r, 'q6_alimentatie'),
        nutritie: countBy(r, 'q7_nutritie'),
        fibroblast: countBy(r, 'q12_fibroblast'),
        fataGreutati: countBy(r, 'q14_fata_greutati'),
        fermitataFata: countBy(r, 'q19_fermitate_fata'),
        observi: countBy(r, 'q20_observi'),
        problema: countBy(r, 'q22_problema'),
        tratamente: countBy(r, 'q24_tratamente'),
        tratamentFacial: countBy(r, 'q25_tratament_facial'),
        explicatii: countBy(r, 'q26_explicatii'),
        planTermen: countBy(r, 'q27_plan_termen'),
        bariere: countBy(r, 'q28_bariere'),
        maiMultaGrija: countBy(r, 'q29_mai_multa_grija'),
        lipseste: countBy(r, 'q30_lipseste'),
        cunostiPielea: countBy(r, 'q16_cunosti_pielea'),
      },
      insights,
    });
  } catch (error) {
    console.error('[ADMIN SURVEY] Error:', error);
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
