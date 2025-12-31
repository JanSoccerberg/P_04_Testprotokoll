-- Universities Table
CREATE TABLE universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('university', 'technical_university', 'university_of_applied_sciences')),
  founded INTEGER,
  students_count INTEGER,
  website TEXT,
  logo_url TEXT,
  description TEXT,
  ranking_national INTEGER,
  ranking_international INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programs/Study Courses Table
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  university_id UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  degree TEXT NOT NULL CHECK (degree IN ('bachelor', 'master', 'diploma', 'state_exam')),
  field_of_study TEXT NOT NULL,
  duration_semesters INTEGER NOT NULL DEFAULT 6,
  language TEXT NOT NULL DEFAULT 'german' CHECK (language IN ('german', 'english', 'bilingual')),
  nc_required BOOLEAN DEFAULT false,
  nc_value NUMERIC(2,1),
  tuition_per_semester NUMERIC(10,2),
  start_semester TEXT NOT NULL DEFAULT 'winter' CHECK (start_semester IN ('winter', 'summer', 'both')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Profiles Table (linked to Supabase Auth)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_fields TEXT[] DEFAULT '{}',
  preferred_locations TEXT[] DEFAULT '{}',
  preferred_university_types TEXT[] DEFAULT '{}',
  abitur_grade NUMERIC(2,1),
  language_preference TEXT DEFAULT 'german' CHECK (language_preference IN ('german', 'english', 'both')),
  max_tuition NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Questionnaire Responses Table
CREATE TABLE questionnaire_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  step INTEGER NOT NULL,
  question_key TEXT NOT NULL,
  answer JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Match Results Table
CREATE TABLE match_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  university_id UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  match_score NUMERIC(5,2) NOT NULL,
  match_breakdown JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_programs_university ON programs(university_id);
CREATE INDEX idx_programs_field ON programs(field_of_study);
CREATE INDEX idx_programs_degree ON programs(degree);
CREATE INDEX idx_user_profiles_user ON user_profiles(user_id);
CREATE INDEX idx_questionnaire_session ON questionnaire_responses(session_id);
CREATE INDEX idx_match_results_session ON match_results(session_id);
CREATE INDEX idx_match_results_user ON match_results(user_id);
CREATE INDEX idx_match_results_score ON match_results(match_score DESC);

-- Enable Row Level Security
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for universities (public read)
CREATE POLICY "Universities are viewable by everyone"
  ON universities FOR SELECT
  USING (true);

-- RLS Policies for programs (public read)
CREATE POLICY "Programs are viewable by everyone"
  ON programs FOR SELECT
  USING (true);

-- RLS Policies for user_profiles (users can only access their own)
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for questionnaire_responses
CREATE POLICY "Users can view own responses"
  ON questionnaire_responses FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert responses"
  ON questionnaire_responses FOR INSERT
  WITH CHECK (true);

-- RLS Policies for match_results
CREATE POLICY "Users can view own results"
  ON match_results FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert results"
  ON match_results FOR INSERT
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_universities_updated_at
  BEFORE UPDATE ON universities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
