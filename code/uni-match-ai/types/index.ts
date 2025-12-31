// University Types
export interface University {
  id: string
  name: string
  city: string
  state: string
  type: 'university' | 'technical_university' | 'university_of_applied_sciences'
  founded: number
  students_count: number
  website: string
  logo_url?: string
  description?: string
  ranking_national?: number
  ranking_international?: number
  created_at: string
  updated_at: string
}

// Program/Study Course Types
export interface Program {
  id: string
  university_id: string
  name: string
  degree: 'bachelor' | 'master' | 'diploma' | 'state_exam'
  field_of_study: string
  duration_semesters: number
  language: 'german' | 'english' | 'bilingual'
  nc_required: boolean
  nc_value?: number
  tuition_per_semester?: number
  start_semester: 'winter' | 'summer' | 'both'
  description?: string
  created_at: string
  updated_at: string
}

// User Profile Types
export interface UserProfile {
  id: string
  user_id: string
  preferred_fields: string[]
  preferred_locations: string[]
  preferred_university_types: string[]
  abitur_grade?: number
  language_preference: 'german' | 'english' | 'both'
  max_tuition?: number
  created_at: string
  updated_at: string
}

// Questionnaire Response Types
export interface QuestionnaireResponse {
  id: string
  session_id: string
  user_id?: string
  step: number
  question_key: string
  answer: unknown
  created_at: string
}

// Match Result Types
export interface MatchResult {
  id: string
  session_id: string
  user_id?: string
  university_id: string
  program_id: string
  match_score: number
  match_breakdown: MatchBreakdown
  created_at: string
}

export interface MatchBreakdown {
  content_score: number
  location_score: number
  admission_score: number
  career_score: number
  campus_score: number
}

// Onboarding Types
export interface OnboardingStep {
  step: number
  title: string
  description: string
  question_type: 'single_choice' | 'multiple_choice' | 'slider' | 'text'
  options?: OnboardingOption[]
}

export interface OnboardingOption {
  value: string
  label: string
  description?: string
  icon?: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

// ============================================
// QUICK SEARCH TYPES (Anonyme 5-Schritte Suche)
// ============================================

export interface QuickSearchData {
  sessionId: string
  interests: string[]
  locations: string[]
  universityType: 'uni' | 'fh' | 'both'
  abiturGrade?: number
  degreeType: 'bachelor' | 'master' | 'both'
}

export interface QuickSearchSession {
  id: string
  session_id: string
  interests: string[]
  locations: string[]
  university_type: 'uni' | 'fh' | 'both' | null
  abitur_grade: number | null
  degree_type: 'bachelor' | 'master' | 'both' | null
  completed_at: string | null
  converted_user_id: string | null
  created_at: string
  updated_at: string
}

// Quick Search Optionen
export const QUICK_SEARCH_INTERESTS = [
  { value: 'mint', label: 'MINT', description: 'Mathe, Informatik, Naturwissenschaften, Technik' },
  { value: 'wirtschaft', label: 'Wirtschaft', description: 'BWL, VWL, Management' },
  { value: 'recht', label: 'Recht', description: 'Jura, Rechtswissenschaften' },
  { value: 'medizin', label: 'Medizin & Gesundheit', description: 'Medizin, Pharmazie, Pflege' },
  { value: 'sozial', label: 'Sozialwissenschaften', description: 'Psychologie, Soziologie, Politik' },
  { value: 'geistes', label: 'Geisteswissenschaften', description: 'Geschichte, Philosophie, Sprachen' },
  { value: 'kunst', label: 'Kunst & Design', description: 'Kunst, Design, Musik, Medien' },
] as const

export const QUICK_SEARCH_LOCATIONS = [
  { value: 'nord', label: 'Norden', description: 'Hamburg, Bremen, Niedersachsen, Schleswig-Holstein' },
  { value: 'ost', label: 'Osten', description: 'Berlin, Brandenburg, Sachsen, Thüringen, Sachsen-Anhalt, MV' },
  { value: 'sued', label: 'Süden', description: 'Bayern, Baden-Württemberg' },
  { value: 'west', label: 'Westen', description: 'NRW, Hessen, Rheinland-Pfalz, Saarland' },
  { value: 'flexibel', label: 'Egal', description: 'Ich bin flexibel beim Standort' },
] as const

export const QUICK_SEARCH_UNI_TYPES = [
  { value: 'uni', label: 'Universität', description: 'Forschungsorientiert, breiteres Fächerspektrum' },
  { value: 'fh', label: 'Fachhochschule', description: 'Praxisorientiert, enger Wirtschaftskontakt' },
  { value: 'both', label: 'Beides', description: 'Ich bin offen für beide Hochschultypen' },
] as const

export const QUICK_SEARCH_DEGREE_TYPES = [
  { value: 'bachelor', label: 'Bachelor', description: 'Erststudium (3-4 Jahre)' },
  { value: 'master', label: 'Master', description: 'Aufbaustudium (1-2 Jahre)' },
  { value: 'both', label: 'Beides', description: 'Ich interessiere mich für beide' },
] as const

// ============================================
// FULL ONBOARDING TYPES (7-Schritte nach Anmeldung)
// ============================================

export interface FullOnboardingData {
  // Schritt 1: Akademisches Profil
  abiturGrade?: number
  leistungskurse: string[]
  expectedGraduation?: string
  currentStatus: 'schueler' | 'abiturient' | 'student' | 'berufstaetig'

  // Schritt 2: Interessengebiete (detaillierter als Quick Search)
  interests: string[]
  interestIntensity: Record<string, number> // 1-5 Skala pro Interesse

  // Schritt 3: Lieblingsfächer
  favoriteSubjects: string[]
  subjectStrengths: string[]

  // Schritt 4: Karriereziele
  careerGoals: CareerGoal[]
  industryPreferences: string[]
  workStyle: 'theoretical' | 'practical' | 'mixed'

  // Schritt 5: Studienumfeld
  citySize: 'gross' | 'mittel' | 'klein' | 'flexibel'
  campusImportance: number // 1-5
  internationalInterest: boolean
  studyForm: 'vollzeit' | 'teilzeit' | 'dual' | 'flexibel'

  // Schritt 6: Geografische Präferenzen
  bundeslaender: string[]
  maxDistanceFromHome?: number
  homePostalCode?: string
  mobilityWillingness: 'lokal' | 'regional' | 'bundesweit' | 'international'

  // Schritt 7: Budget & Finanzierung
  maxRent?: number
  maxTuition?: number
  needsJobOpportunities: boolean
  financingTypes: FinancingType[]
  bafoegEligible?: boolean
}

export type CareerGoal =
  | 'forschung'
  | 'industrie'
  | 'startup'
  | 'oeffentlicher_dienst'
  | 'freiberuflich'
  | 'unsicher'

export type FinancingType =
  | 'bafoeg'
  | 'eltern'
  | 'nebenjob'
  | 'stipendium'
  | 'kredit'
  | 'erspartes'

// Full Onboarding Schritt-Definitionen
export const FULL_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    step: 1,
    title: 'Akademisches Profil',
    description: 'Erzähl uns von deinem schulischen Hintergrund',
    question_type: 'slider',
  },
  {
    step: 2,
    title: 'Interessengebiete',
    description: 'Was fasziniert dich wirklich?',
    question_type: 'multiple_choice',
  },
  {
    step: 3,
    title: 'Lieblingsfächer',
    description: 'In welchen Fächern bist du stark?',
    question_type: 'multiple_choice',
  },
  {
    step: 4,
    title: 'Karriereziele',
    description: 'Wohin soll die Reise gehen?',
    question_type: 'multiple_choice',
  },
  {
    step: 5,
    title: 'Studienumfeld',
    description: 'Wie stellst du dir dein Studium vor?',
    question_type: 'single_choice',
  },
  {
    step: 6,
    title: 'Standort',
    description: 'Wo möchtest du studieren?',
    question_type: 'multiple_choice',
  },
  {
    step: 7,
    title: 'Budget',
    description: 'Wie finanzierst du dein Studium?',
    question_type: 'slider',
  },
]

// Bundesländer für Full Onboarding
export const BUNDESLAENDER = [
  { value: 'bw', label: 'Baden-Württemberg' },
  { value: 'by', label: 'Bayern' },
  { value: 'be', label: 'Berlin' },
  { value: 'bb', label: 'Brandenburg' },
  { value: 'hb', label: 'Bremen' },
  { value: 'hh', label: 'Hamburg' },
  { value: 'he', label: 'Hessen' },
  { value: 'mv', label: 'Mecklenburg-Vorpommern' },
  { value: 'ni', label: 'Niedersachsen' },
  { value: 'nw', label: 'Nordrhein-Westfalen' },
  { value: 'rp', label: 'Rheinland-Pfalz' },
  { value: 'sl', label: 'Saarland' },
  { value: 'sn', label: 'Sachsen' },
  { value: 'st', label: 'Sachsen-Anhalt' },
  { value: 'sh', label: 'Schleswig-Holstein' },
  { value: 'th', label: 'Thüringen' },
] as const

// Leistungskurse
export const LEISTUNGSKURSE = [
  { value: 'mathe', label: 'Mathematik' },
  { value: 'deutsch', label: 'Deutsch' },
  { value: 'englisch', label: 'Englisch' },
  { value: 'physik', label: 'Physik' },
  { value: 'chemie', label: 'Chemie' },
  { value: 'biologie', label: 'Biologie' },
  { value: 'informatik', label: 'Informatik' },
  { value: 'geschichte', label: 'Geschichte' },
  { value: 'powi', label: 'Politik & Wirtschaft' },
  { value: 'kunst', label: 'Kunst' },
  { value: 'musik', label: 'Musik' },
  { value: 'sport', label: 'Sport' },
  { value: 'latein', label: 'Latein' },
  { value: 'franzoesisch', label: 'Französisch' },
  { value: 'spanisch', label: 'Spanisch' },
] as const
