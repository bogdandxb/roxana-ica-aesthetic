-- Skin Assessment responses table
CREATE TABLE IF NOT EXISTS skin_assessment (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Contact
  nume TEXT NOT NULL,
  telefon TEXT NOT NULL,
  email TEXT,
  -- Identification
  is_existing_client BOOLEAN DEFAULT FALSE,
  -- Assessment answers (multi-select stored as CSV)
  sa1 TEXT, -- Ce ai dori sa imbunatatesti
  sa2 TEXT, -- Cum ti-ai dori sa arate pielea
  sa3 TEXT, -- Ce ai observat in ultimii ani
  sa4 TEXT, -- Cat de bine cunosti pielea
  sa5 TEXT, -- Ai cumparat produse fara sa stii cauza
  sa6 TEXT, -- Ai facut tratamente faciale
  sa7 TEXT, -- Ce te-ar interesa la un tratament
  sa8 TEXT, -- Daca analiza ar arata modificari
  sa9 TEXT, -- Ce ti-ar fi util dupa analiza
  sa10 TEXT, -- Urmatorul pas (intentie)
  -- Lead management
  lead_status TEXT DEFAULT 'ASSESSMENT COMPLETAT',
  -- Booking
  cta_accessed BOOLEAN DEFAULT FALSE,
  cta_accessed_at TIMESTAMPTZ,
  programare_data TIMESTAMPTZ,
  programare_serviciu TEXT,
  consultatie_data TIMESTAMPTZ,
  tratament_inceput BOOLEAN DEFAULT FALSE,
  tratament_data TIMESTAMPTZ,
  -- Skin Analyzer status
  skin_analyzer_status TEXT DEFAULT 'Nu a fost efectuat', -- 'Analiza individuala - 200 lei' | 'Inclus in tratament' | 'Nu a fost efectuat'
  -- Consultatie notes (admin only)
  obs_skin_analyzer TEXT,
  prioritatea_1 TEXT,
  prioritatea_2 TEXT,
  prioritatea_3 TEXT,
  plan_protocol TEXT,
  produse_homecare TEXT,
  tratament_ales TEXT,
  urmatoarea_programare DATE,
  observatii TEXT,
  -- Metadata
  gdpr_consent BOOLEAN DEFAULT FALSE,
  gdpr_consent_at TIMESTAMPTZ,
  source TEXT DEFAULT 'skin-assessment',
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pentru cautare rapida dupa telefon
CREATE INDEX IF NOT EXISTS idx_skin_assessment_telefon ON skin_assessment(telefon);
CREATE INDEX IF NOT EXISTS idx_skin_assessment_created_at ON skin_assessment(created_at DESC);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_skin_assessment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER skin_assessment_updated_at
  BEFORE UPDATE ON skin_assessment
  FOR EACH ROW EXECUTE FUNCTION update_skin_assessment_updated_at();
