'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { X, Sparkles, Check, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UpgradePromptBannerProps {
  variant?: 'banner' | 'inline' | 'sticky'
  onDismiss?: () => void
  className?: string
}

export function UpgradePromptBanner({
  variant = 'banner',
  onDismiss,
  className,
}: UpgradePromptBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  const benefits = [
    'Detaillierte Match-Erklärungen',
    'Karriereprognosen & Rankings',
    '15+ weitere Empfehlungen',
    'Vergleichstool & Favoritenliste',
  ]

  if (variant === 'sticky') {
    return (
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/95 backdrop-blur-sm border-t shadow-lg',
          'md:hidden', // Only on mobile
          className
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="font-medium text-sm">Bessere Ergebnisse gefällig?</p>
            <p className="text-xs text-muted-foreground">Kostenlos registrieren</p>
          </div>
          <Link href="/auth/registrieren?from=quick">
            <Button size="sm" className="bg-accent hover:bg-accent/90">
              <Sparkles className="w-4 h-4 mr-1" />
              Upgrade
            </Button>
          </Link>
          <button
            onClick={handleDismiss}
            className="p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <Card
        className={cn(
          'border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5',
          className
        )}
      >
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex w-12 h-12 rounded-full bg-primary/10 items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent sm:hidden" />
                Mehr Empfehlungen freischalten
              </h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Mit einem kostenlosen Konto erhältst du personalisierte Matches
                basierend auf noch mehr Kriterien.
              </p>
              <Link href="/auth/registrieren?from=quick">
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  Kostenlos registrieren
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default: banner variant
  return (
    <Card
      className={cn(
        'relative overflow-hidden border-primary/30',
        'bg-gradient-to-br from-primary/10 via-background to-accent/10',
        className
      )}
    >
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted transition-colors"
        aria-label="Schließen"
      >
        <X className="w-4 h-4 text-muted-foreground" />
      </button>

      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Icon */}
          <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent items-center justify-center flex-shrink-0">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent sm:hidden" />
                Deine Ergebnisse sind nur der Anfang!
              </h3>
              <p className="text-muted-foreground mt-1">
                Mit einem kostenlosen Konto erhältst du:
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/auth/registrieren?from=quick">
                <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 gap-2">
                  <Sparkles className="w-4 h-4" />
                  Kostenlos registrieren
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleDismiss}
                className="w-full sm:w-auto text-muted-foreground"
              >
                Später
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
