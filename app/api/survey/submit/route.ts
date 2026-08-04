import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-survey';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { nume, telefon, gdpr_consent, ...answers } = body;

    if (!nume?.trim()) {
      return NextResponse.json({ error: 'Numele este obligatoriu' }, { status: 400 });
    }
    if (!telefon?.trim()) {
      return NextResponse.json({ error: 'Telefonul este obligatoriu' }, { status: 400 });
    }
    if (!gdpr_consent) {
      return NextResponse.json({ error: 'Acordul GDPR este obligatoriu' }, { status: 400 });
    }

    const now = new Date().toISOString();

    const payload = {
      nume: nume.trim(),
      telefon: telefon.trim(),
      gdpr_consent: true,
      gdpr_consent_at: now,
      gdpr_consent_version: 'v1.0',
      ...answers,
      analiza_consent_at: answers.doreste_analiza && answers.analiza_consent ? now : null,
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
