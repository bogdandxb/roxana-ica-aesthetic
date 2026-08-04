import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-survey';

const VALID_STATUSES = ['Nou', 'Contactată', 'Programată', 'Finalizată', 'Nu răspunde', 'Nu dorește'];

function checkAuth(request: NextRequest) {
  return request.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from('survey_responses')
    .select('id, nume, telefon, doreste_analiza, analiza_consent_at, created_at, lead_status, q1_varsta, q30_lipseste')
    .eq('doreste_analiza', true)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Eroare' }, { status: 500 });
  return NextResponse.json({ leads: data });
}

export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, status } = await request.json();
  if (!id || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Date invalide' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('survey_responses')
    .update({ lead_status: status })
    .eq('id', id);

  if (error) return NextResponse.json({ error: 'Eroare' }, { status: 500 });
  return NextResponse.json({ success: true });
}
