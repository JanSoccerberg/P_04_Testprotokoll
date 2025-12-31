'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavigationButtonsProps {
  onBack?: () => void
  onNext: () => void
  isFirstStep?: boolean
  isLastStep?: boolean
  canProceed?: boolean
  isLoading?: boolean
  nextLabel?: string
  backLabel?: string
  className?: string
}

export function NavigationButtons({
  onBack,
  onNext,
  isFirstStep = false,
  isLastStep = false,
  canProceed = true,
  isLoading = false,
  nextLabel,
  backLabel = 'Zurück',
  className,
}: NavigationButtonsProps) {
  const defaultNextLabel = isLastStep ? 'Ergebnisse anzeigen' : 'Weiter'

  return (
    <div className={cn('flex justify-between gap-4 pt-6', className)}>
      {!isFirstStep && onBack ? (
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{backLabel}</span>
        </Button>
      ) : (
        <div />
      )}

      <Button
        onClick={onNext}
        disabled={!canProceed || isLoading}
        className={cn(
          'gap-2 min-w-[140px]',
          isLastStep && 'bg-accent hover:bg-accent/90'
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Lädt...</span>
          </>
        ) : (
          <>
            <span>{nextLabel || defaultNextLabel}</span>
            {!isLastStep && <ArrowRight className="w-4 h-4" />}
          </>
        )}
      </Button>
    </div>
  )
}
