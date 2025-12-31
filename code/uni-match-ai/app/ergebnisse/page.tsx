'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { UniversityCard } from '@/components/UniversityCard'
import { MatchRadarChart } from '@/components/MatchRadarChart'
import { MatchBadge } from '@/components/MatchBadge'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Filter,
  SlidersHorizontal,
  Heart,
  GitCompare,
  Download,
  Share2,
  GraduationCap,
  MapPin,
  Euro,
  TrendingUp,
  Star,
  Check,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import type { FullOnboardingData, MatchBreakdown } from '@/types'

// Mock data for full results (more detailed than quick search)
const MOCK_FULL_RESULTS = [
  {
    id: '1',
    name: 'Technische Universität München',
    program: 'Informatik (B.Sc.)',
    location: 'München, Bayern',
    matchPercentage: 94,
    ranking: 'Spitzengruppe',
    reasons: [
      'Perfekt für deine MINT-Interessen',
      'Top 5 in Deutschland für Informatik',
      'Starke Industrie-Kooperationen',
      'Passt zu deinem Karriereziel Industrie',
      'Exzellente Forschungsmöglichkeiten',
    ],
    breakdown: {
      content_score: 95,
      location_score: 88,
      admission_score: 85,
      career_score: 98,
      campus_score: 90,
    },
    details: {
      nc: '1.7',
      students: 45000,
      semesterFee: 144,
      avgRent: 750,
      employmentRate: 96,
    },
  },
  {
    id: '2',
    name: 'RWTH Aachen',
    program: 'Informatik (B.Sc.)',
    location: 'Aachen, NRW',
    matchPercentage: 91,
    ranking: 'Spitzengruppe',
    reasons: [
      'Exzellente technische Ausbildung',
      'Starker Praxisbezug',
      'Internationale Vernetzung',
      'Gute Karrierechancen',
    ],
    breakdown: {
      content_score: 92,
      location_score: 85,
      admission_score: 88,
      career_score: 94,
      campus_score: 86,
    },
    details: {
      nc: '1.9',
      students: 47000,
      semesterFee: 312,
      avgRent: 480,
      employmentRate: 94,
    },
  },
  {
    id: '3',
    name: 'KIT Karlsruhe',
    program: 'Informatik (B.Sc.)',
    location: 'Karlsruhe, Baden-Württemberg',
    matchPercentage: 89,
    ranking: 'Spitzengruppe',
    reasons: [
      'Führend in KI-Forschung',
      'Innovative Lehrkonzepte',
      'Starke Start-up-Szene',
    ],
    breakdown: {
      content_score: 90,
      location_score: 82,
      admission_score: 86,
      career_score: 92,
      campus_score: 88,
    },
    details: {
      nc: '1.8',
      students: 25000,
      semesterFee: 171,
      avgRent: 520,
      employmentRate: 93,
    },
  },
  {
    id: '4',
    name: 'LMU München',
    program: 'Informatik (B.Sc.)',
    location: 'München, Bayern',
    matchPercentage: 87,
    ranking: 'Spitzengruppe',
    reasons: [
      'Breites Fächerangebot',
      'Exzellenzuniversität',
      'Zentrale Lage in München',
    ],
    breakdown: {
      content_score: 88,
      location_score: 90,
      admission_score: 82,
      career_score: 88,
      campus_score: 85,
    },
    details: {
      nc: '2.0',
      students: 52000,
      semesterFee: 144,
      avgRent: 750,
      employmentRate: 91,
    },
  },
  {
    id: '5',
    name: 'Universität Heidelberg',
    program: 'Informatik (B.Sc.)',
    location: 'Heidelberg, Baden-Württemberg',
    matchPercentage: 85,
    ranking: 'Spitzengruppe',
    reasons: [
      'Renommierte Traditionsuniversität',
      'Interdisziplinäre Angebote',
    ],
    breakdown: {
      content_score: 86,
      location_score: 84,
      admission_score: 84,
      career_score: 86,
      campus_score: 88,
    },
    details: {
      nc: '2.1',
      students: 31000,
      semesterFee: 171,
      avgRent: 550,
      employmentRate: 90,
    },
  },
  {
    id: '6',
    name: 'Universität Stuttgart',
    program: 'Informatik (B.Sc.)',
    location: 'Stuttgart, Baden-Württemberg',
    matchPercentage: 84,
    ranking: 'Mittelgruppe',
    reasons: [
      'Starke Automotive-Verbindungen',
      'Praxisnahe Ausbildung',
    ],
    breakdown: {
      content_score: 85,
      location_score: 80,
      admission_score: 88,
      career_score: 86,
      campus_score: 82,
    },
    details: {
      nc: '2.3',
      students: 28000,
      semesterFee: 171,
      avgRent: 580,
      employmentRate: 92,
    },
  },
  {
    id: '7',
    name: 'TU Berlin',
    program: 'Informatik (B.Sc.)',
    location: 'Berlin',
    matchPercentage: 83,
    ranking: 'Spitzengruppe',
    reasons: [
      'Hauptstadt-Standort',
      'Innovative Start-up-Szene',
      'Günstige Lebenshaltung',
    ],
    breakdown: {
      content_score: 84,
      location_score: 88,
      admission_score: 80,
      career_score: 84,
      campus_score: 80,
    },
    details: {
      nc: '2.2',
      students: 35000,
      semesterFee: 311,
      avgRent: 600,
      employmentRate: 89,
    },
  },
  {
    id: '8',
    name: 'Universität Freiburg',
    program: 'Informatik (B.Sc.)',
    location: 'Freiburg, Baden-Württemberg',
    matchPercentage: 81,
    ranking: 'Mittelgruppe',
    reasons: [
      'Hohe Lebensqualität',
      'Gute Work-Life-Balance',
    ],
    breakdown: {
      content_score: 82,
      location_score: 86,
      admission_score: 82,
      career_score: 78,
      campus_score: 84,
    },
    details: {
      nc: '2.4',
      students: 24000,
      semesterFee: 171,
      avgRent: 520,
      employmentRate: 88,
    },
  },
]

type FilterType = 'all' | 'ranking' | 'location' | 'cost' | 'career'

export default function FullResultsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [onboardingData, setOnboardingData] = useState<Partial<FullOnboardingData> | null>(null)
  const [results, setResults] = useState(MOCK_FULL_RESULTS)
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [favorites, setFavorites] = useState<string[]>([])
  const [compareList, setCompareList] = useState<string[]>([])
  const [selectedResult, setSelectedResult] = useState<typeof MOCK_FULL_RESULTS[0] | null>(null)

  useEffect(() => {
    // Check auth
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/auth/anmelden?next=/ergebnisse')
        return
      }
    })

    // Load onboarding data
    const saved = localStorage.getItem('full_onboarding_data')
    if (saved) {
      try {
        setOnboardingData(JSON.parse(saved))
      } catch {
        // Ignore
      }
    }

    // Load favorites
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
      setSelectedResult(MOCK_FULL_RESULTS[0])
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id]
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter((c) => c !== id))
    } else if (compareList.length < 3) {
      setCompareList([...compareList, id])
    }
  }

  const filteredResults = results.filter((r) => {
    switch (activeFilter) {
      case 'ranking':
        return r.ranking === 'Spitzengruppe'
      case 'location':
        return r.location.includes('Bayern') || r.location.includes('Baden-Württemberg')
      case 'cost':
        return r.details.avgRent < 600
      case 'career':
        return r.details.employmentRate >= 92
      default:
        return true
    }
  })

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Deine Top-Matches</h1>
              <p className="text-muted-foreground mt-1">
                {results.length} personalisierte Empfehlungen basierend auf deinem Profil
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportieren</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Teilen</span>
              </Button>
              <Link href="/onboarding">
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Profil anpassen</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Profile Summary */}
          {onboardingData && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-muted-foreground">Basierend auf:</span>
                  {onboardingData.interests?.slice(0, 3).map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                  {onboardingData.abiturGrade && (
                    <Badge variant="outline">Abi: {onboardingData.abiturGrade.toFixed(1)}</Badge>
                  )}
                  {onboardingData.citySize && (
                    <Badge variant="outline">{onboardingData.citySize}</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('all')}
            >
              Alle
            </Button>
            <Button
              variant={activeFilter === 'ranking' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('ranking')}
              className="gap-1"
            >
              <Star className="w-4 h-4" />
              Top-Ranking
            </Button>
            <Button
              variant={activeFilter === 'location' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('location')}
              className="gap-1"
            >
              <MapPin className="w-4 h-4" />
              Süddeutschland
            </Button>
            <Button
              variant={activeFilter === 'cost' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('cost')}
              className="gap-1"
            >
              <Euro className="w-4 h-4" />
              Günstig
            </Button>
            <Button
              variant={activeFilter === 'career' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('career')}
              className="gap-1"
            >
              <TrendingUp className="w-4 h-4" />
              Beste Karrierechancen
            </Button>
          </div>

          {/* Compare Bar */}
          {compareList.length > 0 && (
            <Card className="bg-accent/10 border-accent/30">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitCompare className="w-5 h-5 text-accent" />
                  <span className="font-medium">{compareList.length} zum Vergleich ausgewählt</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setCompareList([])}>
                    Leeren
                  </Button>
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    Vergleichen
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Results List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredResults.map((result, index) => (
                <Card
                  key={result.id}
                  className={cn(
                    'cursor-pointer transition-all hover:shadow-md',
                    selectedResult?.id === result.id && 'ring-2 ring-primary'
                  )}
                  onClick={() => setSelectedResult(result)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Rank Badge */}
                      <div className="hidden sm:flex w-10 h-10 rounded-full bg-primary/10 items-center justify-center shrink-0">
                        <span className="text-lg font-bold text-primary">#{index + 1}</span>
                      </div>

                      {/* University Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-lg">{result.name}</h3>
                            <p className="text-muted-foreground text-sm">{result.program}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{result.location}</span>
                              <Badge variant="secondary" className="ml-2">
                                {result.ranking}
                              </Badge>
                            </div>
                          </div>
                          <MatchBadge percentage={result.matchPercentage} size="md" />
                        </div>

                        {/* Match Reasons */}
                        <div className="mt-3 flex flex-wrap gap-1">
                          {result.reasons.slice(0, 3).map((reason, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full"
                            >
                              <Check className="w-3 h-3" />
                              {reason}
                            </span>
                          ))}
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-3 flex flex-wrap gap-4 text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <GraduationCap className="w-4 h-4" />
                            NC: {result.details.nc}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Euro className="w-4 h-4" />
                            ~{result.details.avgRent}€/Monat
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <TrendingUp className="w-4 h-4" />
                            {result.details.employmentRate}% Jobquote
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(result.id)
                          }}
                        >
                          <Heart
                            className={cn(
                              'w-5 h-5',
                              favorites.includes(result.id) && 'fill-red-500 text-red-500'
                            )}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleCompare(result.id)
                          }}
                        >
                          <GitCompare
                            className={cn(
                              'w-5 h-5',
                              compareList.includes(result.id) && 'text-accent'
                            )}
                          />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detail Sidebar */}
            <div className="lg:sticky lg:top-24 space-y-4">
              {selectedResult && (
                <>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Match-Analyse</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center mb-4">
                        <MatchBadge percentage={selectedResult.matchPercentage} size="lg" showLabel />
                      </div>
                      <MatchRadarChart
                        userProfile={[85, 80, 75, 70, 80, 85]}
                        universityProfile={[
                          selectedResult.breakdown.content_score,
                          selectedResult.breakdown.career_score,
                          selectedResult.breakdown.location_score,
                          selectedResult.breakdown.admission_score,
                          selectedResult.breakdown.campus_score,
                          (selectedResult.breakdown.content_score + selectedResult.breakdown.career_score) / 2,
                        ]}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">NC-Schnitt</span>
                        <span className="font-medium">{selectedResult.details.nc}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Studierende</span>
                        <span className="font-medium">{selectedResult.details.students.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Semesterbeitrag</span>
                        <span className="font-medium">{selectedResult.details.semesterFee}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ø Miete</span>
                        <span className="font-medium">{selectedResult.details.avgRent}€/Monat</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Beschäftigungsquote</span>
                        <span className="font-medium text-green-600">{selectedResult.details.employmentRate}%</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Button className="w-full" size="lg">
                    Zur Uni-Website
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
