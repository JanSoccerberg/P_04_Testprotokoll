'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { UniversityCard } from '@/components/UniversityCard'
import { UpgradePromptBanner } from '@/components/results/UpgradePromptBanner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Filter, Sparkles, Lock, Info } from 'lucide-react'
import { type QuickSearchData } from '@/types'

// Mock data for quick search results
const MOCK_QUICK_RESULTS = [
  {
    id: '1',
    name: 'Technische Universität München',
    program: 'Informatik (B.Sc.)',
    location: 'München, Bayern',
    matchPercentage: 87,
    ranking: 'Platz 1',
    reasons: ['Passt zu MINT-Interesse', 'Top-Ranking'],
  },
  {
    id: '2',
    name: 'RWTH Aachen',
    program: 'Maschinenbau (B.Sc.)',
    location: 'Aachen, NRW',
    matchPercentage: 84,
    ranking: 'Platz 2',
    reasons: ['Starker MINT-Fokus', 'Praxisnah'],
  },
  {
    id: '3',
    name: 'Universität Heidelberg',
    program: 'Physik (B.Sc.)',
    location: 'Heidelberg, Baden-Württemberg',
    matchPercentage: 81,
    ranking: 'Platz 5',
    reasons: ['Exzellenzuniversität'],
  },
  {
    id: '4',
    name: 'LMU München',
    program: 'Biologie (B.Sc.)',
    location: 'München, Bayern',
    matchPercentage: 78,
    ranking: 'Platz 3',
    reasons: ['Breites Angebot'],
  },
  {
    id: '5',
    name: 'KIT Karlsruhe',
    program: 'Elektrotechnik (B.Sc.)',
    location: 'Karlsruhe, Baden-Württemberg',
    matchPercentage: 76,
    ranking: 'Platz 4',
    reasons: ['Forschungsstark'],
  },
]

function QuickResultsContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session')

  const [isLoading, setIsLoading] = useState(true)
  const [searchData, setSearchData] = useState<QuickSearchData | null>(null)
  const [results, setResults] = useState(MOCK_QUICK_RESULTS)
  const [showStickyBanner, setShowStickyBanner] = useState(false)

  useEffect(() => {
    // Load search data from localStorage
    const saved = localStorage.getItem('quick_search_data')
    if (saved) {
      try {
        setSearchData(JSON.parse(saved))
      } catch {
        // Ignore
      }
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [sessionId])

  useEffect(() => {
    // Show sticky banner after scrolling past 3rd result
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowStickyBanner(scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getInterestLabels = (interests: string[]) => {
    const labelMap: Record<string, string> = {
      mint: 'MINT',
      wirtschaft: 'Wirtschaft',
      recht: 'Recht',
      medizin: 'Medizin',
      sozial: 'Sozial',
      geistes: 'Geistes',
      kunst: 'Kunst',
    }
    return interests.map((i) => labelMap[i] || i)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/schnellsuche"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Suche anpassen
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Deine Quick-Matches
          </h1>
          <p className="text-muted-foreground mt-1">
            {results.length} Studiengänge gefunden
          </p>
        </div>

        {/* Search Summary */}
        {searchData && (
          <div className="flex flex-wrap gap-2">
            {getInterestLabels(searchData.interests).map((label) => (
              <Badge key={label} variant="secondary">
                {label}
              </Badge>
            ))}
            {searchData.abiturGrade && (
              <Badge variant="outline">Abi: {searchData.abiturGrade.toFixed(1)}</Badge>
            )}
          </div>
        )}
      </div>

      {/* Info Banner */}
      <Card className="bg-muted/50 border-muted">
        <CardContent className="p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p>
              Dies sind vereinfachte Matches basierend auf 5 Parametern.
              Für genauere Empfehlungen mit Karriereprognosen und detaillierten
              Erklärungen,{' '}
              <Link
                href="/auth/registrieren?from=quick"
                className="text-primary font-medium hover:underline"
              >
                erstelle ein kostenloses Konto
              </Link>
              .
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Banner (Top) */}
      <UpgradePromptBanner variant="banner" />

      {/* Results Grid */}
      <div className="space-y-4">
        {results.map((result, index) => (
          <div key={result.id}>
            <UniversityCard
              name={result.name}
              program={result.program}
              location={result.location}
              matchPercentage={result.matchPercentage}
              ranking={result.ranking}
              reasons={result.reasons}
            />

            {/* Inline upgrade prompt after 3rd result */}
            {index === 2 && (
              <div className="mt-4">
                <UpgradePromptBanner variant="inline" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Locked Results Preview */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10" />
        <CardContent className="p-6 opacity-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 bg-muted rounded" />
              <div className="h-3 w-32 bg-muted rounded" />
            </div>
          </div>
        </CardContent>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="font-medium">+15 weitere Matches</p>
            <Link href="/auth/registrieren?from=quick">
              <Button size="sm" className="mt-2 bg-accent hover:bg-accent/90">
                <Sparkles className="w-4 h-4 mr-1" />
                Freischalten
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Bottom CTA */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-2">
            Bereit für bessere Empfehlungen?
          </h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Mit dem vollständigen Onboarding analysieren wir deine Karriereziele,
            Lieblingsfächer und mehr für präzisere Matches.
          </p>
          <Link href="/auth/registrieren?from=quick">
            <Button size="lg" className="bg-accent hover:bg-accent/90 gap-2">
              <Sparkles className="w-5 h-5" />
              Jetzt kostenlos registrieren
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Sticky Mobile Banner */}
      {showStickyBanner && <UpgradePromptBanner variant="sticky" />}
    </div>
  )
}

export default function QuickResultsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Suspense
            fallback={
              <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-32 w-full" />
              </div>
            }
          >
            <QuickResultsContent />
          </Suspense>
        </div>
      </main>
    </>
  )
}
