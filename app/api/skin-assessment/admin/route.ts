import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-survey';

const LEAD_STATUSES = [
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

function checkAuth(request: NextRequest) {
  return request.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const period = url.searchParams.get('period') || 'all';
  const search = url.searchParams.get('search') || '';
  const filterStatus = url.searchParams.get('status') || '';
  const filterExisting = url.searchParams.get('existing') || '';
  const filterId = url.searchParams.get('id') || '';

  // Single record fetch
  if (filterId) {
    const { data, error } = await supabaseAdmin
      .from('skin_assessment')
      .select('*')
      .eq('id', filterId)
      .single();
    if (error) return NextResponse.json({ error: 'Nu există' }, { status: 404 });
    return NextResponse.json({ record: data });
  }

  let query = supabaseAdmin
    .from('skin_assessment')
    .select('*')
    .order('created_at', { ascending: false });

  if (period === '7d') {
    const d = new Date(); d.setDate(d.getDate() - 7);
    query = query.gte('created_at', d.toISOString());
  } else if (period === '30d') {
    const d = new Date(); d.setDate(d.getDate() - 30);
    query = query.gte('created_at', d.toISOString());
  }

  if (filterStatus) query = query.eq('lead_status', filterStatus);
  if (filterExisting === 'da') query = query.eq('is_existing_client', true);
  if (filterExisting === 'nu') query = query.eq('is_existing_client', false);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Eroare' }, { status: 500 });

  let records = data || [];

  // Search filter (client-side for simplicity)
  if (search) {
    const s = search.toLowerCase();
    records = records.filter(r =>
      r.nume?.toLowerCase().includes(s) || r.telefon?.includes(s)
    );
  }

  const total = records.length;
  const uniquePhones = new Set(records.map((r: Record<string, string>) => r.telefon)).size;
  const noi = records.filter((r: Record<string, unknown>) => !r.is_existing_client).length;
  const existente = records.filter((r: Record<string, unknown>) => r.is_existing_client).length;
  const programate = records.filter((r: Record<string, unknown>) => r.programare_data).length;
  const consultatii = records.filter((r: Record<string, unknown>) => r.consultatie_data).length;
  const tratamente = records.filter((r: Record<string, unknown>) => r.tratament_inceput).length;
  const ctaAccessed = records.filter((r: Record<string, unknown>) => r.cta_accessed).length;

  // Interes din sa10
  const interesSkinAnalyzer = records.filter((r: Record<string, string>) =>
    r.sa10?.includes('Skin Analyzer')
  ).length;

  // Conversion rates
  const pct = (a: number, b: number) => b === 0 ? 0 : Math.round((a / b) * 100);

  // Stats per question
  function countAnswers(field: string, multi = false) {
    const result: Record<string, number> = {};
    for (const r of records) {
      const val = (r as Record<string, string>)[field] ?? '';
      if (!val) continue;
      const parts = multi ? val.split(',').map((s: string) => s.trim()).filter(Boolean) : [val];
      for (const p of parts) result[p] = (result[p] || 0) + 1;
    }
    return result;
  }

  const questionStats = {
    sa1: countAnswers('sa1', true),
    sa2: countAnswers('sa2', true),
    sa3: countAnswers('sa3', true),
    sa4: countAnswers('sa4'),
    sa5: countAnswers('sa5'),
    sa6: countAnswers('sa6'),
    sa7: countAnswers('sa7', true),
    sa8: countAnswers('sa8'),
    sa9: countAnswers('sa9', true),
    sa10: countAnswers('sa10'),
  };

  return NextResponse.json({
    stats: {
      total,
      uniquePhones,
      noi,
      existente,
      interesSkinAnalyzer,
      programate,
      consultatii,
      tratamente,
      ctaAccessed,
      rateAssessmentProgramare: pct(programate, total),
      rateProgramareConsultatie: pct(consultatii, programate),
      rateConsulatatieTratament: pct(tratamente, consultatii),
    },
    records,
    questionStats,
    leadStatuses: LEAD_STATUSES,
    skinAnalyzerStatuses: SKIN_ANALYZER_STATUSES,
  });
}

export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: 'ID lipsă' }, { status: 400 });

  // Only allow safe fields to be updated
  const allowed = [
    'lead_status', 'programare_data', 'programare_serviciu',
    'consultatie_data', 'tratament_inceput', 'tratament_data',
    'skin_analyzer_status', 'obs_skin_analyzer',
    'prioritatea_1', 'prioritatea_2', 'prioritatea_3',
    'plan_protocol', 'produse_homecare', 'tratament_ales',
    'urmatoarea_programare', 'observatii', 'cta_accessed', 'cta_accessed_at',
  ];

  const patch: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in updates) patch[key] = updates[key];
  }

  const { error } = await supabaseAdmin
    .from('skin_assessment')
    .update(patch)
    .eq('id', id);

  if (error) return NextResponse.json({ error: 'Eroare update' }, { status: 500 });
  return NextResponse.json({ success: true });
}
