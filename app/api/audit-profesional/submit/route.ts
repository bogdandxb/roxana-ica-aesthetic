import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-survey';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nume, telefon, email, gdpr_consent, servicii, dificultati_social_media, ...rest } = body;

    if (!nume?.trim()) {
      return NextResponse.json({ error: 'Numele este obligatoriu' }, { status: 400 });
    }
    if (!gdpr_consent) {
      return NextResponse.json({ error: 'Acordul GDPR este obligatoriu' }, { status: 400 });
    }

    const payload = {
      nume: nume.trim(),
      telefon: telefon?.trim() || null,
      email: email?.trim() || null,
      gdpr_consent: true,
      servicii: servicii || null,
      dificultati_social_media: dificultati_social_media?.length ? dificultati_social_media : null,
      // toate celelalte câmpuri text
      ani_experienta: rest.ani_experienta || null,
      oras: rest.oras || null,
      nr_cliente_luna: rest.nr_cliente_luna || null,
      tip_lucru: rest.tip_lucru || null,
      venit_lunar: rest.venit_lunar || null,
      serviciu_mai_multi_bani: rest.serviciu_mai_multi_bani || null,
      serviciu_cel_mai_usor: rest.serviciu_cel_mai_usor || null,
      serviciu_cel_mai_greu: rest.serviciu_cel_mai_greu || null,
      serviciu_cel_mai_mult_timp: rest.serviciu_cel_mai_mult_timp || null,
      serviciu_marja_mare: rest.serviciu_marja_mare || null,
      procedura_ceruta_neoferta: rest.procedura_ceruta_neoferta || null,
      procedura_de_introdus: rest.procedura_de_introdus || null,
      tip_clienta_neajutata: rest.tip_clienta_neajutata || null,
      cazuri_refuzate: rest.cazuri_refuzate || null,
      cazuri_fara_incredere: rest.cazuri_fara_incredere || null,
      nivel_biologie_pielii: parseInt(rest.nivel_biologie_pielii) || null,
      nivel_bariera_cutanata: parseInt(rest.nivel_bariera_cutanata) || null,
      nivel_microbiom: parseInt(rest.nivel_microbiom) || null,
      nivel_inflamatie_cutanata: parseInt(rest.nivel_inflamatie_cutanata) || null,
      nivel_acnee: parseInt(rest.nivel_acnee) || null,
      nivel_rozacee: parseInt(rest.nivel_rozacee) || null,
      nivel_melasma: parseInt(rest.nivel_melasma) || null,
      nivel_peelinguri: parseInt(rest.nivel_peelinguri) || null,
      nivel_microneedling: parseInt(rest.nivel_microneedling) || null,
      nivel_consultatie_analiza: parseInt(rest.nivel_consultatie_analiza) || null,
      nivel_construire_protocoale: parseInt(rest.nivel_construire_protocoale) || null,
      nivel_recomandare_homecare: parseInt(rest.nivel_recomandare_homecare) || null,
      subiect_evitat: rest.subiect_evitat || null,
      procedura_fara_curaj: rest.procedura_fara_curaj || null,
      de_ce_te_aleg: rest.de_ce_te_aleg || null,
      ce_te_diferentiaza: rest.ce_te_diferentiaza || null,
      expertiza_dorita: rest.expertiza_dorita || null,
      ce_sa_spuna_clientele: rest.ce_sa_spuna_clientele || null,
      instagram_urmatori: rest.instagram_urmatori || null,
      facebook_urmatori: rest.facebook_urmatori || null,
      tiktok_urmatori: rest.tiktok_urmatori || null,
      are_website: rest.are_website === 'Da' ? true : rest.are_website === 'Nu' ? false : null,
      are_google_business: rest.are_google_business === 'Da' ? true : rest.are_google_business === 'Nu' ? false : null,
      frecventa_postare: rest.frecventa_postare || null,
      impact_postare_constanta: rest.impact_postare_constanta || null,
      viziune_12_luni: rest.viziune_12_luni || null,
      procedura_de_stapanit: rest.procedura_de_stapanit || null,
      venit_succes: rest.venit_succes || null,
      tip_clientele_dorite: rest.tip_clientele_dorite || null,
      urmatorul_nivel: rest.urmatorul_nivel || null,
      ce_functioneaza_bine: rest.ce_functioneaza_bine || null,
      ce_limiteaza_cresterea: rest.ce_limiteaza_cresterea || null,
      limita_3_ani: rest.limita_3_ani || null,
      abilitate_impact: rest.abilitate_impact || null,
    };

    const { error } = await supabaseAdmin.from('audit_profesional').insert(payload);
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Eroare la salvare' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Submit error:', err);
    return NextResponse.json({ error: 'Eroare server' }, { status: 500 });
  }
}
