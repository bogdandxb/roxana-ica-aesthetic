-- ============================================
-- ROXANA ICA AESTHETIC — Survey Schema
-- ============================================

-- Tabel principal: răspunsuri survey
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Date personale
  nume TEXT NOT NULL,
  telefon TEXT NOT NULL,
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  gdpr_consent_at TIMESTAMPTZ,
  gdpr_consent_version TEXT DEFAULT 'v1.0',
  -- Secțiunea 1: Despre tine
  q1_varsta TEXT,   -- sub 30 / 30-39 / 40-49 / 50+
  q2_copii TEXT,    -- Nu / 1 / 2 / 3+
  q3_sport TEXT,    -- 1-2 ori/sapt / 3-4 ori/sapt / 5+ ori/sapt
  q4_motiv_sport TEXT,  -- Sanatate / Tonifiere/aspect / Greutate/compozitie corporala / Stare de bine
  q5_grija_de_mine TEXT, -- Sport / Alimentatie / Corp tonifiat / Piele ingrijita / Toate impreuna
  -- Secțiunea 2: Cât investești în corp
  q6_alimentatie TEXT,  -- Foarte / Destul / Putin / Deloc
  q7_nutritie TEXT,     -- Foarte mult / Destul / Putin / Aproape nimic
  q8_masa_musculara TEXT, -- Da / Partial / Nu
  -- Secțiunea 3: Cât știi despre piele
  q9_sport_suficient TEXT,   -- Da / In mare parte / Nu / Nu stiu
  q10_fermitate TEXT,        -- Da / Partial / Foarte putin / Nu
  q11_organ_activ TEXT,      -- Da / Stiam dar nu m-am gandit / Nu
  q12_fibroblast TEXT,       -- Da / Am auzit / Nu
  q13_fibroblast_colagen TEXT, -- Da / Partial / Nu
  q14_fata_greutati TEXT,    -- Da / Nu / Nu m-am gandit
  q15_tratamente_fibroblast TEXT, -- Da / Am auzit / Nu
  q16_cunosti_pielea TEXT,   -- La fel de bine / Mai putin / Mult mai putin / Nu m-am gandit
  q17_viitor_piele TEXT,     -- Da / Uneori / Foarte putin / Niciodata
  q18_sport_piele TEXT,      -- Da / Am auzit / Nu
  q19_fermitate_fata TEXT,   -- Da / Putin / Nu / Nu am fost atenta
  -- Secțiunea 4: Uită-te la pielea ta
  q20_observi TEXT,          -- Pierderea fermitatii / Riduri/linii / Pete / Roseata / Textura/pori / Sensibilitate/deshidratare
  q21_normala TEXT,          -- Da / Nu / Nu m-am gandit
  q22_problema TEXT,         -- Schimb produsele / Caut online / Merg la dermatolog / Merg la cosmetician / Astept sa treaca
  q23_slabit TEXT,           -- Pierdere de volum / Piele mai laxa / Riduri mai vizibile / Nu
  -- Secțiunea 5: Cât investești în piele
  q24_tratamente TEXT,       -- Lunar/regulat / Ocazional / Am incercat / Niciodata
  q25_tratament_facial TEXT, -- Curatare / Relaxare/hidratare / Tratarea unei probleme / Mentinerea pielii in timp
  q26_explicatii TEXT,       -- Da clar / Partial / Nu
  q27_plan_termen TEXT,      -- Da / Nu / Am facut doar sedinte individuale
  q28_bariere TEXT,          -- Costul / Timpul / Nu simt ca am nevoie / Nu stiu ce sa aleg / Nu am gasit omul potrivit
  -- Secțiunea 6: Schimbăm perspectiva
  q29_mai_multa_grija TEXT,  -- Da / Probabil / Nu
  q30_lipseste TEXT,         -- Nimic / Mai multa consecventa / Sa inteleg ce are nevoie / Un plan pentru fata si gat
  -- CTA
  doreste_analiza BOOLEAN DEFAULT false,
  analiza_consent BOOLEAN DEFAULT false,
  analiza_consent_at TIMESTAMPTZ,
  -- Metadata
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel tracking evenimente
CREATE TABLE IF NOT EXISTS survey_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- survey_started / survey_completed / facial_analysis_requested
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS — dezactivat pentru simplitate (acces doar prin service_role din API)
ALTER TABLE survey_responses DISABLE ROW LEVEL SECURITY;
ALTER TABLE survey_tracking DISABLE ROW LEVEL SECURITY;

-- Index pentru performanță
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_survey_responses_doreste_analiza ON survey_responses(doreste_analiza);
CREATE INDEX IF NOT EXISTS idx_survey_tracking_event ON survey_tracking(event_type);
