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
  QUICK_SEARCH_LOCATIONS,
  QUICK_SEARCH_UNI_TYPES,
  QUICK_SEARCH_DEGREE_TYPES,
  type QuickSearchData,
} from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const TOTAL_STEPS = 5

const STEP_CONFIG = [
  {
    title: 'Was interessiert dich?',
    description: 'Wähle die Fachbereiche, die dich am meisten ansprechen.',
    hint: 'Mehrfachauswahl möglich',
  },
  {
    title: 'Wo möchtest du studieren?',
    description: 'Wähle deine bevorzugten Regionen in Deutschland.',
    hint: 'Mehrfachauswahl möglich',
  },
  {
    title: 'Universität oder Fachhochschule?',
    description: 'Wähle deinen bevorzugten Hochschultyp.',
    hint: null,
  },
  {
    title: 'Wie ist dein Abiturschnitt?',
    description: 'Damit können wir NC-Anforderungen berücksichtigen.',
    hint: 'Noch kein Abi? Gib deinen erwarteten Schnitt an.',
  },
  {
    title: 'Welchen Abschluss strebst du an?',
    description: 'Bachelor, Master oder beides?',
    hint: null,
  },
]

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return ''

  let sessionId = localStorage.getItem('unimatching_quick_session_id')
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem('unimatching_quick_session_id', sessionId)
  }
  return sessionId
}

export default function QuickSearchPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<Partial<QuickSearchData>>({
    interests: [],
    locations: [],
    universityType: undefined,
    abiturGrade: 2.5,
    degreeType: undefined,
  })

  // Load saved progress on mount
  useEffect(() => {
    const saved = localStorage.getItem('quick_search_progress')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFormData(parsed.data || {})
        setCurrentStep(parsed.step || 1)
      } catch {
        // Ignore parse errors
      }
    }
  }, [])

  // Save progress on each change
  useEffect(() => {
    localStorage.setItem(
      'quick_search_progress',
      JSON.stringify({ step: currentStep, data: formData })
    )
  }, [currentStep, formData])

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
        const sessionId = getOrCreateSessionId()
        const searchData: QuickSearchData = {
          sessionId,
          interests: formData.interests || [],
          locations: formData.locations || [],
          universityType: formData.universityType || 'both',
          abiturGrade: formData.abiturGrade,
          degreeType: formData.degreeType || 'both',
        }

        // Save to localStorage for results page
        localStorage.setItem('quick_search_data', JSON.stringify(searchData))

        // Clear progress
        localStorage.removeItem('quick_search_progress')

        // Navigate to results
        router.push(`/schnellsuche/ergebnisse?session=${sessionId}`)
      } catch (error) {
        console.error('Error submitting quick search:', error)
        setIsLoading(false)
      }
    }
  }

  const toggleArrayValue = (
    field: 'interests' | 'locations',
    value: string
  ) => {
    setFormData((prev) => {
      const current = prev[field] || []
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...prev, [field]: updated }
    })
  }

  const setSingleValue = (
    field: 'universityType' | 'degreeType',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value as QuickSearchData['universityType'] | QuickSearchData['degreeType'],
    }))
  }

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return (formData.interests?.length || 0) > 0
      case 2:
        return (formData.locations?.length || 0) > 0
      case 3:
        return !!formData.universityType
      case 4:
        return true // Grade always has a default
      case 5:
        return !!formData.degreeType
      default:
        return false
    }
  }

  const renderStep = () => {
    const config = STEP_CONFIG[currentStep - 1]

    return (
      <Card className="w-full max-w-2xl mx-auto border-0 shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">{config.title}</CardTitle>
          <CardDescription className="text-base">
            {config.description}
          </CardDescription>
          {config.hint && (
            <p className="text-xs text-muted-foreground mt-1">{config.hint}</p>
          )}
        </CardHeader>
        <CardContent className="pt-4">
          {currentStep === 1 && (
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
          )}

          {currentStep === 2 && (
            <OptionGrid
              options={QUICK_SEARCH_LOCATIONS.map((opt) => ({
                value: opt.value,
                label: opt.label,
                description: opt.description,
              }))}
              selectedValues={formData.locations || []}
              onSelect={(value) => toggleArrayValue('locations', value)}
              type="multi"
              columns={2}
            />
          )}

          {currentStep === 3 && (
            <OptionGrid
              options={QUICK_SEARCH_UNI_TYPES.map((opt) => ({
                value: opt.value,
                label: opt.label,
                description: opt.description,
              }))}
              selectedValues={formData.universityType ? [formData.universityType] : []}
              onSelect={(value) => setSingleValue('universityType', value)}
              type="single"
              columns={1}
            />
          )}

          {currentStep === 4 && (
            <div className="py-4">
              <AbiturGradeSlider
                value={formData.abiturGrade || 2.5}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, abiturGrade: value }))
                }
              />
            </div>
          )}

          {currentStep === 5 && (
            <OptionGrid
              options={QUICK_SEARCH_DEGREE_TYPES.map((opt) => ({
                value: opt.value,
                label: opt.label,
                description: opt.description,
              }))}
              selectedValues={formData.degreeType ? [formData.degreeType] : []}
              onSelect={(value) => setSingleValue('degreeType', value)}
              type="single"
              columns={1}
            />
          )}

          <NavigationButtons
            onBack={handleBack}
            onNext={handleNext}
            isFirstStep={currentStep === 1}
            isLastStep={currentStep === TOTAL_STEPS}
            canProceed={canProceed()}
            isLoading={isLoading}
            nextLabel={currentStep === TOTAL_STEPS ? 'Unis finden' : undefined}
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
          />

          {/* Step Content */}
          <StepContainer step={currentStep} direction={direction}>
            {renderStep()}
          </StepContainer>

          {/* Info Footer */}
          <p className="text-center text-sm text-muted-foreground max-w-md mx-auto">
            Keine Anmeldung nötig. Deine Daten werden nur für diese Suche verwendet.
          </p>
        </div>
      </main>
    </>
  )
}
