import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-survey';

function checkAuth(request: NextRequest) {
  return request.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const url = new URL(request.url);
  const id = url.searchParams.get('id') || '';
  const search = url.searchParams.get('search') || '';

  if (id) {
    const { data, error } = await supabaseAdmin
      .from('audit_cosmetica')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return NextResponse.json({ error: 'Nu există' }, { status: 404 });
    return NextResponse.json({ record: data });
  }

  const { data, error } = await supabaseAdmin
    .from('audit_cosmetica')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'Eroare' }, { status: 500 });

  let records = data || [];

  if (search) {
    const s = search.toLowerCase();
    records = records.filter((r: Record<string, string>) =>
      r.nume?.toLowerCase().includes(s) ||
      r.telefon?.includes(s) ||
      r.email?.toLowerCase().includes(s)
    );
  }

  return NextResponse.json({ records, total: records.length });
}
