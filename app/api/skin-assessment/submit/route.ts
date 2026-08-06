import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-survey';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nume, telefon, email, gdpr_consent, ...answers } = body;

    if (!nume?.trim() || !telefon?.trim()) {
      return NextResponse.json({ error: 'Nume și telefon sunt obligatorii' }, { status: 400 });
    }
    if (!gdpr_consent) {
      return NextResponse.json({ error: 'Acordul GDPR este obligatoriu' }, { status: 400 });
    }

    const now = new Date().toISOString();

    // Check if phone already exists
    const { data: existing } = await supabaseAdmin
      .from('skin_assessment')
      .select('id, nume, telefon')
      .eq('telefon', telefon.replace(/\s/g, ''))
      .limit(1);

    const isExisting = (existing?.length ?? 0) > 0;

    const payload = {
      nume: nume.trim(),
      telefon: telefon.replace(/\s/g, ''),
      email: email?.trim() || null,
      is_existing_client: isExisting,
      sa1: Array.isArray(answers.sa1) ? answers.sa1.join(', ') : answers.sa1 || null,
      sa2: Array.isArray(answers.sa2) ? answers.sa2.join(', ') : answers.sa2 || null,
      sa3: Array.isArray(answers.sa3) ? answers.sa3.join(', ') : answers.sa3 || null,
      sa4: answers.sa4 || null,
      sa5: answers.sa5 || null,
      sa6: answers.sa6 || null,
      sa7: Array.isArray(answers.sa7) ? answers.sa7.join(', ') : answers.sa7 || null,
      sa8: answers.sa8 || null,
      sa9: Array.isArray(answers.sa9) ? answers.sa9.join(', ') : answers.sa9 || null,
      sa10: answers.sa10 || null,
      lead_status: isExisting ? 'CLIENTĂ EXISTENTĂ' : 'ASSESSMENT COMPLETAT',
      gdpr_consent: true,
      gdpr_consent_at: now,
      completed_at: now,
    };

    const { data, error } = await supabaseAdmin
      .from('skin_assessment')
      .insert(payload)
      .select('id, is_existing_client')
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, id: data.id, isExisting: data.is_existing_client });
  } catch (error) {
    console.error('[SKIN ASSESSMENT] Submit error:', error);
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
