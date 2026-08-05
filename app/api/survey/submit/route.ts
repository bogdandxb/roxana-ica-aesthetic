import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-survey';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nume, telefon, gdpr_consent } = body;

    if (!nume?.trim()) return NextResponse.json({ error: 'Numele este obligatoriu' }, { status: 400 });
    if (!telefon?.trim()) return NextResponse.json({ error: 'Telefonul este obligatoriu' }, { status: 400 });
    if (!gdpr_consent) return NextResponse.json({ error: 'Acordul GDPR este obligatoriu' }, { status: 400 });

    const now = new Date().toISOString();

    // Mapare întrebări noi → coloane existente Supabase (q1–q30)
    const payload = {
      nume: nume.trim(),
      telefon: telefon.trim(),
      gdpr_consent: true,
      gdpr_consent_at: now,
      gdpr_consent_version: 'v1.0',
      // Pasul 1 — Despre tine
      q1_varsta: body.q1_varsta,
      q2_copii: body.q2_copii,
      q3_sport: body.q3_sport,
      q4_motiv_sport: body.q4_motiv_sport,
      q5_grija_de_mine: body.q5_grija_de_mine,
      // Pasul 2 — Corp
      q6_alimentatie: body.q6_alimentatie,
      q7_nutritie: body.q7_nutritie,
      q8_masa_musculara: body.q8_masa_musculara,
      // Pasul 3 — Piele
      q9_sport_suficient: body.q9_sport_suficient,
      q10_fermitate: body.q10_fermitate,
      q11_organ_activ: body.q11_organ_activ,
      q12_fibroblast: body.q12_fibroblast,
      q13_fibroblast_colagen: body.q13_viitor_piele,
      q14_fata_greutati: body.q14_fermitate_fata,
      // Pasul 4 — Uită-te la pielea ta
      q15_tratamente_fibroblast: body.q15_observi,
      q16_cunosti_pielea: body.q16_schimbare,
      q17_viitor_piele: body.q17_slabit,
      // Pasul 5 — Investești în piele
      q18_sport_piele: body.q18_tratamente,
      q19_fermitate_fata: body.q19_tratament_facial,
      q20_observi: body.q20_sport_piele,
      q21_normala: body.q21_explicatii,
      q22_problema: body.q22_plan_termen,
      q23_slabit: body.q23_bariere,
      // Pasul 6 — Perspectivă
      q24_tratamente: body.q24_cunosti_pielea,
      q25_tratament_facial: body.q25_moment_ingrijire,
      q26_explicatii: body.q26_consecventa,
      q27_plan_termen: body.q27_specialist,
      // CTA
      doreste_analiza: body.doreste_analiza,
      analiza_consent: body.analiza_consent,
      analiza_consent_at: body.doreste_analiza && body.analiza_consent ? now : null,
      completed_at: now,
    };

    const { data, error } = await supabaseAdmin
      .from('survey_responses')
      .insert(payload)
      .select('id')
      .single();

    if (error) {
      console.error('[SURVEY SUBMIT] Error:', error);
      return NextResponse.json({ error: 'Eroare la salvare' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('[SURVEY SUBMIT] Unexpected error:', error);
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
