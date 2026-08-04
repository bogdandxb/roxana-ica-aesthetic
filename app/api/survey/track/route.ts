import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-survey';

export async function POST(request: NextRequest) {
  try {
    const { event_type, session_id } = await request.json();

    if (!['survey_started', 'survey_completed', 'facial_analysis_requested'].includes(event_type)) {
      return NextResponse.json({ error: 'Invalid event' }, { status: 400 });
    }

    await supabaseAdmin.from('survey_tracking').insert({ event_type, session_id });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
