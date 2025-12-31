'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface ProgressHeaderProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
  showLabels?: boolean
}

export function ProgressHeader({
  currentStep,
  totalSteps,
  labels,
  showLabels = false,
}: ProgressHeaderProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full space-y-4">
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Schritt {currentStep} von {totalSteps}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators (optional, for desktop) */}
      {showLabels && labels && (
        <div className="hidden md:flex justify-between gap-2">
          {labels.map((label, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep

            return (
              <div
                key={index}
                className={cn(
                  'flex-1 flex flex-col items-center gap-2',
                  isCompleted || isCurrent ? 'opacity-100' : 'opacity-50'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                    isCompleted
                      ? 'bg-primary text-primary-foreground'
                      : isCurrent
                        ? 'bg-primary/20 text-primary border-2 border-primary'
                        : 'bg-muted text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span
                  className={cn(
                    'text-xs text-center',
                    isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}
                >
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
