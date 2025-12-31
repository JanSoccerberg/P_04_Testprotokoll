import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface OnboardingProgressProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
}

export function OnboardingProgress({ currentStep, totalSteps, labels }: OnboardingProgressProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          Schritt {currentStep} von {totalSteps}
        </span>
        <span className="text-sm font-medium text-accent">
          {Math.round((currentStep / totalSteps) * 100)}% abgeschlossen
        </span>
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <div key={index} className="flex-1 flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                  isCompleted && "bg-success text-success-foreground",
                  isCurrent && "bg-accent text-accent-foreground shadow-glow",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
              </div>

              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    "flex-1 h-1 mx-2 rounded-full transition-all duration-300",
                    stepNumber < currentStep ? "bg-success" : "bg-muted"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>

      {labels && (
        <div className="flex justify-between mt-2">
          {labels.map((label, index) => (
            <span
              key={index}
              className={cn(
                "text-xs",
                index + 1 <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
