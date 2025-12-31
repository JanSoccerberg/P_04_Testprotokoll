'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import {
  StepContainer,
  ProgressHeader,
  NavigationButtons,
  OptionGrid,
  AbiturGradeSlider,
} from '@/components/onboarding/shared'
import {
  QUICK_SEARCH_INTERESTS,
  BUNDESLAENDER,
  LEISTUNGSKURSE,
  FULL_ONBOARDING_STEPS,
  type FullOnboardingData,
  type CareerGoal,
  type FinancingType,
} from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const TOTAL_STEPS = 7

// Karriereziele Optionen
const CAREER_GOAL_OPTIONS = [
  { value: 'forschung', label: 'Forschung & Wissenschaft', description: 'Akademische Karriere, Promotion' },
  { value: 'industrie', label: 'Industrie & Konzern', description: 'Große Unternehmen, Konzernkarriere' },
  { value: 'startup', label: 'Startup & Gründung', description: 'Selbstständigkeit, Entrepreneurship' },
  { value: 'oeffentlicher_dienst', label: 'Öffentlicher Dienst', description: 'Staat, Behörden, NGOs' },
  { value: 'freiberuflich', label: 'Freiberuflich', description: 'Selbstständige Tätigkeit' },
  { value: 'unsicher', label: 'Noch unsicher', description: 'Ich weiß es noch nicht genau' },
]

// Studienumfeld Optionen
const CITY_SIZE_OPTIONS = [
  { value: 'gross', label: 'Großstadt', description: 'Über 500.000 Einwohner (Berlin, München, Hamburg...)' },
  { value: 'mittel', label: 'Mittelgroße Stadt', description: '100.000 - 500.000 Einwohner' },
  { value: 'klein', label: 'Kleinstadt', description: 'Unter 100.000 Einwohner' },
  { value: 'flexibel', label: 'Egal', description: 'Stadtgröße spielt keine Rolle' },
]

const STUDY_FORM_OPTIONS = [
  { value: 'vollzeit', label: 'Vollzeit', description: 'Klassisches Präsenzstudium' },
  { value: 'dual', label: 'Duales Studium', description: 'Theorie + Praxis im Wechsel' },
  { value: 'teilzeit', label: 'Teilzeit', description: 'Neben Beruf oder Familie' },
  { value: 'flexibel', label: 'Flexibel', description: 'Ich bin offen für alle Formen' },
]

// Finanzierung Optionen
const FINANCING_OPTIONS = [
  { value: 'eltern', label: 'Eltern', description: 'Finanzielle Unterstützung der Familie' },
  { value: 'bafoeg', label: 'BAföG', description: 'Staatliche Ausbildungsförderung' },
  { value: 'nebenjob', label: 'Nebenjob', description: 'Arbeiten neben dem Studium' },
  { value: 'stipendium', label: 'Stipendium', description: 'Förderung durch Stiftungen' },
  { value: 'kredit', label: 'Studienkredit', description: 'Kredit von Bank oder KfW' },
  { value: 'erspartes', label: 'Erspartes', description: 'Eigene Rücklagen' },
]

// Lieblingsfächer Optionen
const FAVORITE_SUBJECTS = [
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
]

// Status Optionen
const STATUS_OPTIONS = [
  { value: 'schueler', label: 'Schüler/in', description: 'Noch in der Schule' },
  { value: 'abiturient', label: 'Abiturient/in', description: 'Abi gemacht, noch nicht studiert' },
  { value: 'student', label: 'Student/in', description: 'Bereits eingeschrieben, möchte wechseln' },
  { value: 'berufstaetig', label: 'Berufstätig', description: 'Nach Berufserfahrung studieren' },
]

export default function FullOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  const [formData, setFormData] = useState<Partial<FullOnboardingData>>({
    // Step 1: Akademisches Profil
    abiturGrade: 2.5,
    leistungskurse: [],
    currentStatus: undefined,
    // Step 2: Interessengebiete
    interests: [],
    interestIntensity: {},
    // Step 3: Lieblingsfächer
    favoriteSubjects: [],
    subjectStrengths: [],
    // Step 4: Karriereziele
    careerGoals: [],
    workStyle: undefined,
    // Step 5: Studienumfeld
    citySize: undefined,
    campusImportance: 3,
    studyForm: undefined,
    internationalInterest: false,
    // Step 6: Geografie
    bundeslaender: [],
    mobilityWillingness: undefined,
    // Step 7: Budget
    maxRent: 500,
    financingTypes: [],
    needsJobOpportunities: false,
  })

  // Check auth status
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id)
      }
    })
  }, [])

  // Load saved progress
  useEffect(() => {
    if (userId) {
      const saved = localStorage.getItem(`onboarding_progress_${userId}`)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setFormData(parsed.data || {})
          setCurrentStep(parsed.step || 1)
        } catch {
          // Ignore
        }
      }
    }
  }, [userId])

  // Save progress
  useEffect(() => {
    if (userId) {
      localStorage.setItem(
        `onboarding_progress_${userId}`,
        JSON.stringify({ step: currentStep, data: formData })
      )
    }
  }, [currentStep, formData, userId])

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection('backward')
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setDirection('forward')
      setCurrentStep((prev) => prev + 1)
    } else {
      // Final step - submit and navigate to results
      setIsLoading(true)
      try {
        // Save final data to localStorage for results page
        localStorage.setItem('full_onboarding_data', JSON.stringify(formData))

        // Clear progress
        if (userId) {
          localStorage.removeItem(`onboarding_progress_${userId}`)
        }

        toast.success('Profil gespeichert!')
        router.push('/ergebnisse')
      } catch (error) {
        console.error('Error submitting onboarding:', error)
        toast.error('Fehler beim Speichern')
        setIsLoading(false)
      }
    }
  }

  const toggleArrayValue = <T extends string>(
    field: keyof FullOnboardingData,
    value: T
  ) => {
    setFormData((prev) => {
      const current = (prev[field] as T[]) || []
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...prev, [field]: updated }
    })
  }

  const setSingleValue = <T extends string | number | boolean>(
    field: keyof FullOnboardingData,
    value: T
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1: // Akademisches Profil
        return (formData.leistungskurse?.length || 0) >= 1 && !!formData.currentStatus
      case 2: // Interessengebiete
        return (formData.interests?.length || 0) > 0
      case 3: // Lieblingsfächer
        return (formData.favoriteSubjects?.length || 0) > 0
      case 4: // Karriereziele
        return (formData.careerGoals?.length || 0) > 0
      case 5: // Studienumfeld
        return !!formData.citySize && !!formData.studyForm
      case 6: // Geografie
        return (formData.bundeslaender?.length || 0) > 0 || formData.mobilityWillingness === 'bundesweit'
      case 7: // Budget
        return (formData.financingTypes?.length || 0) > 0
      default:
        return false
    }
  }

  const stepLabels = FULL_ONBOARDING_STEPS.map((s) => s.title)

  const renderStep = () => {
    const stepInfo = FULL_ONBOARDING_STEPS[currentStep - 1]

    return (
      <Card className="w-full max-w-2xl mx-auto border-0 shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">{stepInfo.title}</CardTitle>
          <CardDescription className="text-base">
            {stepInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          {/* Step 1: Akademisches Profil */}
          {currentStep === 1 && (
            <>
              <div>
                <h3 className="font-medium mb-3">Dein aktueller Status</h3>
                <OptionGrid
                  options={STATUS_OPTIONS}
                  selectedValues={formData.currentStatus ? [formData.currentStatus] : []}
                  onSelect={(value) => setSingleValue('currentStatus', value as FullOnboardingData['currentStatus'])}
                  type="single"
                  columns={2}
                />
              </div>

              <div>
                <h3 className="font-medium mb-3">Dein Abiturschnitt</h3>
                <AbiturGradeSlider
                  value={formData.abiturGrade || 2.5}
                  onChange={(value) => setSingleValue('abiturGrade', value)}
                />
              </div>

              <div>
                <h3 className="font-medium mb-3">Deine Leistungskurse (wähle 2-3)</h3>
                <OptionGrid
                  options={LEISTUNGSKURSE.map((lk) => ({ value: lk.value, label: lk.label }))}
                  selectedValues={formData.leistungskurse || []}
                  onSelect={(value) => toggleArrayValue('leistungskurse', value)}
                  type="multi"
                  columns={3}
                />
              </div>
            </>
          )}

          {/* Step 2: Interessengebiete */}
          {currentStep === 2 && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Wähle alle Bereiche, die dich interessieren (Mehrfachauswahl)
              </p>
              <OptionGrid
                options={QUICK_SEARCH_INTERESTS.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
                  description: opt.description,
                }))}
                selectedValues={formData.interests || []}
                onSelect={(value) => toggleArrayValue('interests', value)}
                type="multi"
                columns={2}
              />
            </div>
          )}

          {/* Step 3: Lieblingsfächer */}
          {currentStep === 3 && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                In welchen Fächern bist du besonders stark? (Mehrfachauswahl)
              </p>
              <OptionGrid
                options={FAVORITE_SUBJECTS}
                selectedValues={formData.favoriteSubjects || []}
                onSelect={(value) => toggleArrayValue('favoriteSubjects', value)}
                type="multi"
                columns={3}
              />
            </div>
          )}

          {/* Step 4: Karriereziele */}
          {currentStep === 4 && (
            <>
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Wo siehst du dich nach dem Studium? (Mehrfachauswahl)
                </p>
                <OptionGrid
                  options={CAREER_GOAL_OPTIONS}
                  selectedValues={formData.careerGoals || []}
                  onSelect={(value) => toggleArrayValue('careerGoals', value as CareerGoal)}
                  type="multi"
                  columns={2}
                />
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-3">Wie arbeitest du am liebsten?</h3>
                <OptionGrid
                  options={[
                    { value: 'theoretical', label: 'Theoretisch', description: 'Konzepte, Forschung, Analyse' },
                    { value: 'practical', label: 'Praktisch', description: 'Anwendung, Projekte, Hands-on' },
                    { value: 'mixed', label: 'Beides', description: 'Gute Mischung aus Theorie und Praxis' },
                  ]}
                  selectedValues={formData.workStyle ? [formData.workStyle] : []}
                  onSelect={(value) => setSingleValue('workStyle', value as FullOnboardingData['workStyle'])}
                  type="single"
                  columns={3}
                />
              </div>
            </>
          )}

          {/* Step 5: Studienumfeld */}
          {currentStep === 5 && (
            <>
              <div>
                <h3 className="font-medium mb-3">Bevorzugte Stadtgröße</h3>
                <OptionGrid
                  options={CITY_SIZE_OPTIONS}
                  selectedValues={formData.citySize ? [formData.citySize] : []}
                  onSelect={(value) => setSingleValue('citySize', value as FullOnboardingData['citySize'])}
                  type="single"
                  columns={2}
                />
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-3">Gewünschte Studienform</h3>
                <OptionGrid
                  options={STUDY_FORM_OPTIONS}
                  selectedValues={formData.studyForm ? [formData.studyForm] : []}
                  onSelect={(value) => setSingleValue('studyForm', value as FullOnboardingData['studyForm'])}
                  type="single"
                  columns={2}
                />
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-3">Wie wichtig ist dir das Campusleben?</h3>
                <div className="px-4 py-6">
                  <Slider
                    value={[formData.campusImportance || 3]}
                    onValueChange={([val]) => setSingleValue('campusImportance', val)}
                    min={1}
                    max={5}
                    step={1}
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Nicht wichtig</span>
                    <span>Sehr wichtig</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 6: Geografie */}
          {currentStep === 6 && (
            <>
              <div>
                <h3 className="font-medium mb-3">Wie mobil bist du?</h3>
                <OptionGrid
                  options={[
                    { value: 'lokal', label: 'Lokal', description: 'Möchte in meiner Region bleiben' },
                    { value: 'regional', label: 'Regional', description: 'Umkreis von ~200km' },
                    { value: 'bundesweit', label: 'Bundesweit', description: 'Überall in Deutschland' },
                    { value: 'international', label: 'International', description: 'Auch im Ausland' },
                  ]}
                  selectedValues={formData.mobilityWillingness ? [formData.mobilityWillingness] : []}
                  onSelect={(value) => setSingleValue('mobilityWillingness', value as FullOnboardingData['mobilityWillingness'])}
                  type="single"
                  columns={2}
                />
              </div>

              {formData.mobilityWillingness !== 'bundesweit' && formData.mobilityWillingness !== 'international' && (
                <div className="pt-4">
                  <h3 className="font-medium mb-3">Bevorzugte Bundesländer</h3>
                  <OptionGrid
                    options={BUNDESLAENDER.map((bl) => ({ value: bl.value, label: bl.label }))}
                    selectedValues={formData.bundeslaender || []}
                    onSelect={(value) => toggleArrayValue('bundeslaender', value)}
                    type="multi"
                    columns={3}
                  />
                </div>
              )}
            </>
          )}

          {/* Step 7: Budget */}
          {currentStep === 7 && (
            <>
              <div>
                <h3 className="font-medium mb-3">Maximale Warmmiete pro Monat</h3>
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-primary">{formData.maxRent || 500}€</span>
                </div>
                <div className="px-4">
                  <Slider
                    value={[formData.maxRent || 500]}
                    onValueChange={([val]) => setSingleValue('maxRent', val)}
                    min={200}
                    max={1200}
                    step={50}
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>200€</span>
                    <span>700€</span>
                    <span>1.200€</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="font-medium mb-3">Wie finanzierst du dein Studium?</h3>
                <OptionGrid
                  options={FINANCING_OPTIONS}
                  selectedValues={formData.financingTypes || []}
                  onSelect={(value) => toggleArrayValue('financingTypes', value as FinancingType)}
                  type="multi"
                  columns={2}
                />
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-3">Nebenjob-Möglichkeiten wichtig?</h3>
                <OptionGrid
                  options={[
                    { value: 'true', label: 'Ja', description: 'Ich möchte neben dem Studium arbeiten' },
                    { value: 'false', label: 'Nein', description: 'Nebenjob ist nicht wichtig' },
                  ]}
                  selectedValues={formData.needsJobOpportunities ? ['true'] : ['false']}
                  onSelect={(value) => setSingleValue('needsJobOpportunities', value === 'true')}
                  type="single"
                  columns={2}
                />
              </div>
            </>
          )}

          <NavigationButtons
            onBack={handleBack}
            onNext={handleNext}
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === TOTAL_STEPS}
            canProceed={canProceed()}
            isLoading={isLoading}
            nextLabel={currentStep === TOTAL_STEPS ? 'Matches berechnen' : undefined}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress Header */}
          <ProgressHeader
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            labels={stepLabels}
            showLabels={true}
          />

          {/* Step Content */}
          <StepContainer step={currentStep} direction={direction}>
            {renderStep()}
          </StepContainer>

          {/* Info Footer */}
          <p className="text-center text-sm text-muted-foreground max-w-md mx-auto">
            Deine Daten werden sicher gespeichert und nur für personalisierte Empfehlungen verwendet.
          </p>
        </div>
      </main>
    </>
  )
}
