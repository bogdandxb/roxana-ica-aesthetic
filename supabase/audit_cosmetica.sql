-- ─── AUDIT: NIVELUL DE PREGĂTIRE ÎN COSMETICĂ ────────────────────────────────
-- Rulează în Supabase SQL Editor (proiect roxana-survey / btuhmjjxliyoaozaxqdi)

create table if not exists public.audit_cosmetica (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Date participantă
  nume text not null,
  telefon text,
  email text,
  terminat_curs text,
  lucreaza_cu_cliente text,
  proceduri_actuale text,
  proceduri_dorite text,

  -- 1. Biologia pielii (scale 0–5 + text)
  bio_straturi_piele smallint,        bio_straturi_piele_txt text,
  bio_bariera_cutanata smallint,      bio_bariera_cutanata_txt text,
  bio_celule smallint,                bio_celule_txt text,
  bio_leziune_microneedling smallint, bio_leziune_microneedling_txt text,
  bio_de_ce_biologie smallint,        bio_de_ce_biologie_txt text,

  -- 2. Consultație și analiza pielii
  cons_tip_vs_conditie smallint,      cons_tip_vs_conditie_txt text,
  cons_anamneza text,
  cons_bariera_compromisa smallint,   cons_bariera_compromisa_txt text,
  cons_plan_multi_sedinte smallint,   cons_plan_multi_sedinte_txt text,

  -- 3. Afecțiuni și condiții ale pielii
  afect_acnee smallint,
  afect_rozacee smallint,
  afect_hiperpigmentare smallint,
  afect_piele_sensibila smallint,
  afect_piele_deshidratata smallint,
  afect_refuz_microneedling text,

  -- 4. Ingrediente și produse cosmetice
  ingr_active smallint,               ingr_active_txt text,
  ingr_combinatii smallint,           ingr_combinatii_txt text,
  ingr_rutina_homecare smallint,      ingr_rutina_homecare_txt text,

  -- 5. Peelinguri și proceduri avansate
  peel_tipuri smallint,               peel_tipuri_txt text,
  peel_ph_concentratie smallint,      peel_ph_concentratie_txt text,
  peel_alegere_procedura smallint,    peel_alegere_procedura_txt text,

  -- 6. Microneedling — test de siguranță
  mn_indicatii smallint,              mn_indicatii_txt text,
  mn_contraindicatii smallint,        mn_contraindicatii_txt text,
  mn_adancime smallint,               mn_adancime_txt text,
  mn_endpoint smallint,               mn_endpoint_txt text,
  mn_biologic_dupa smallint,          mn_biologic_dupa_txt text,
  mn_inflamatie smallint,             mn_inflamatie_txt text,
  mn_produse smallint,                mn_produse_txt text,
  mn_recomandari_dupa smallint,       mn_recomandari_dupa_txt text,
  mn_reactie_intensa smallint,        mn_reactie_intensa_txt text,
  mn_decizie_procedura smallint,      mn_decizie_procedura_txt text,

  -- 7. Caz practic (text liber, needitat)
  caz_ce_intrebi text,
  caz_ce_analizezi text,
  caz_ce_excluzi text,
  caz_prioritate text,
  caz_microneedling_prima_sedinta text,
  caz_plan text,
  caz_homecare text,

  -- 8. Autoevaluare finală
  final_stapanesti text,
  final_aprofundare text,
  final_nesigura_aplicare text,
  final_proceduri_cu_incredere text,
  final_proceduri_de_invatat text,
  final_ce_lipseste text,
  final_proces_complet text,
  final_etapa_ajutor text,

  -- Scoruri calculate la submit
  scor_general numeric,               -- medie generală 0–5
  scor_pe_sectiuni jsonb,             -- { "1": 3.2, "2": 2.8, ... }

  -- GDPR
  gdpr_consent boolean not null default false
);

-- RLS
alter table public.audit_cosmetica enable row level security;

-- INSERT public (formularul de pe site, cu anon key)
create policy "audit_cosmetica_insert_public"
  on public.audit_cosmetica for insert
  to anon, authenticated
  with check (true);

-- SELECT / UPDATE / DELETE — doar service_role (admin)
create policy "audit_cosmetica_select_service"
  on public.audit_cosmetica for select
  to service_role using (true);

create policy "audit_cosmetica_update_service"
  on public.audit_cosmetica for update
  to service_role using (true);

create policy "audit_cosmetica_delete_service"
  on public.audit_cosmetica for delete
  to service_role using (true);

create index if not exists idx_audit_cosmetica_created_at
  on public.audit_cosmetica (created_at desc);
