import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export interface SurveyResponse {
  id?: string;
  nume: string;
  telefon: string;
  gdpr_consent: boolean;
  gdpr_consent_at?: string;
  gdpr_consent_version?: string;
  q1_varsta?: string;
  q2_copii?: string;
  q3_sport?: string;
  q4_motiv_sport?: string;
  q5_grija_de_mine?: string;
  q6_alimentatie?: string;
  q7_nutritie?: string;
  q8_masa_musculara?: string;
  q9_sport_suficient?: string;
  q10_fermitate?: string;
  q11_organ_activ?: string;
  q12_fibroblast?: string;
  q13_fibroblast_colagen?: string;
  q14_fata_greutati?: string;
  q15_tratamente_fibroblast?: string;
  q16_cunosti_pielea?: string;
  q17_viitor_piele?: string;
  q18_sport_piele?: string;
  q19_fermitate_fata?: string;
  q20_observi?: string;
  q21_normala?: string;
  q22_problema?: string;
  q23_slabit?: string;
  q24_tratamente?: string;
  q25_tratament_facial?: string;
  q26_explicatii?: string;
  q27_plan_termen?: string;
  q28_bariere?: string;
  q29_mai_multa_grija?: string;
  q30_lipseste?: string;
  doreste_analiza?: boolean;
  analiza_consent?: boolean;
  analiza_consent_at?: string;
  completed_at?: string;
  created_at?: string;
}
