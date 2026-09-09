import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-survey';
import { SECTIONS } from '@/lib/audit-cosmetica';

// Toate cheile permise, derivate din structura auditului
const SCALE_KEYS = new Set<string>();
const TEXT_KEYS = new Set<string>();

for (const section of SECTIONS) {
  for (const q of section.questions) {
    if (q.type === 'scale') {
      SCALE_KEYS.add(q.key);
      if (q.textKey) TEXT_KEYS.add(q.textKey);
    } else {
      TEXT_KEYS.add(q.key);
    }
  }
}
// nume/telefon/email/etc. sunt deja în TEXT_KEYS via secțiunea 0

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.nume?.trim()) {
      return NextResponse.json({ error: 'Numele este obligatoriu' }, { status: 400 });
    }
    if (!body.gdpr_consent) {
      return NextResponse.json({ error: 'Acordul GDPR este obligatoriu' }, { status: 400 });
    }

    const payload: Record<string, unknown> = {
      gdpr_consent: true,
      scor_general: typeof body.scor_general === 'number' ? body.scor_general : null,
      scor_pe_sectiuni: body.scor_pe_sectiuni ?? null,
    };

    // câmpuri text
    for (const k of TEXT_KEYS) {
      const v = body[k];
      payload[k] = typeof v === 'string' && v.trim() ? v.trim() : null;
    }

    // câmpuri scale → smallint 0–5
    for (const k of SCALE_KEYS) {
      const v = body[k];
      const n = v === '' || v === undefined || v === null ? null : Number(v);
      payload[k] = Number.isFinite(n) && (n as number) >= 0 && (n as number) <= 5 ? n : null;
    }

    const { error } = await supabaseAdmin.from('audit_cosmetica').insert(payload);
    if (error) {
      console.error('Supabase error (audit_cosmetica):', error);
      return NextResponse.json({ error: 'Eroare la salvare' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Submit error (audit_cosmetica):', err);
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
