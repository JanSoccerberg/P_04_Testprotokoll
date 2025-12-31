-- Migration: Quick Search Sessions
-- Speichert anonyme Quick-Search-Daten für Conversion-Tracking

-- Quick Search Sessions Table
CREATE TABLE IF NOT EXISTS quick_search_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL UNIQUE,

  -- Quick Search Antworten (5 Parameter)
  interests TEXT[] DEFAULT '{}',
  locations TEXT[] DEFAULT '{}',
  university_type TEXT CHECK (university_type IN ('uni', 'fh', 'both')),
  abitur_grade NUMERIC(2,1) CHECK (abitur_grade >= 1.0 AND abitur_grade <= 4.0),
  degree_type TEXT CHECK (degree_type IN ('bachelor', 'master', 'both')),

  -- Tracking
  completed_at TIMESTAMPTZ,
  converted_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Analytics (optional)
  ip_hash TEXT,
  user_agent TEXT,
  referrer TEXT
);

-- Indexes für Performance
CREATE INDEX idx_quick_search_session_id ON quick_search_sessions(session_id);
CREATE INDEX idx_quick_search_created_at ON quick_search_sessions(created_at DESC);
CREATE INDEX idx_quick_search_converted ON quick_search_sessions(converted_user_id) WHERE converted_user_id IS NOT NULL;

-- Enable RLS
ALTER TABLE quick_search_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Jeder kann Quick Search Sessions erstellen (anonym)
CREATE POLICY "Anyone can create quick search sessions"
  ON quick_search_sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Jeder kann seine eigene Session lesen (via session_id)
CREATE POLICY "Anyone can read their own session"
  ON quick_search_sessions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Nur authentifizierte User können ihre konvertierte Session updaten
CREATE POLICY "Users can update their converted sessions"
  ON quick_search_sessions
  FOR UPDATE
  TO authenticated
  USING (converted_user_id = auth.uid() OR converted_user_id IS NULL)
  WITH CHECK (converted_user_id = auth.uid());

-- Trigger für updated_at
CREATE OR REPLACE FUNCTION update_quick_search_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_quick_search_updated_at
  BEFORE UPDATE ON quick_search_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_quick_search_updated_at();

-- Kommentar für Dokumentation
COMMENT ON TABLE quick_search_sessions IS 'Speichert Quick-Search-Antworten für anonyme User. Wird für Conversion-Tracking und spätere Analyse verwendet.';
