'use client'

import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface SliderQuestionProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  label?: string
  formatValue?: (value: number) => string
  showScale?: boolean
  scaleLabels?: { value: number; label: string }[]
  disabled?: boolean
}

export function SliderQuestion({
  value,
  onChange,
  min,
  max,
  step = 0.1,
  label,
  formatValue,
  showScale = true,
  scaleLabels,
  disabled = false,
}: SliderQuestionProps) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const displayValue = formatValue ? formatValue(localValue) : localValue.toFixed(1)

  // Generate default scale labels if not provided
  const defaultScaleLabels = scaleLabels || [
    { value: min, label: min.toString() },
    { value: (min + max) / 2, label: ((min + max) / 2).toFixed(1) },
    { value: max, label: max.toString() },
  ]

  return (
    <div className="w-full space-y-6">
      {/* Current Value Display */}
      <div className="text-center">
        {label && (
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
        )}
        <div className="inline-flex items-center justify-center px-6 py-3 bg-primary/10 rounded-2xl">
          <span className="text-4xl font-bold text-primary tabular-nums">
            {displayValue}
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="px-2">
        <Slider
          value={[localValue]}
          onValueChange={([val]) => {
            setLocalValue(val)
            onChange(val)
          }}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="w-full"
        />
      </div>

      {/* Scale Labels */}
      {showScale && (
        <div className="flex justify-between px-2">
          {defaultScaleLabels.map(({ value: scaleValue, label: scaleLabel }) => (
            <span
              key={scaleValue}
              className={cn(
                'text-xs text-muted-foreground',
                Math.abs(localValue - scaleValue) < step * 2 && 'text-primary font-medium'
              )}
            >
              {scaleLabel}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// Abitur Grade Slider (German grading system)
interface AbiturGradeSliderProps {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

export function AbiturGradeSlider({
  value,
  onChange,
  disabled = false,
}: AbiturGradeSliderProps) {
  const getGradeDescription = (grade: number): string => {
    if (grade <= 1.5) return 'Sehr gut'
    if (grade <= 2.5) return 'Gut'
    if (grade <= 3.5) return 'Befriedigend'
    return 'Ausreichend'
  }

  const getGradeColor = (grade: number): string => {
    if (grade <= 1.5) return 'text-green-600'
    if (grade <= 2.5) return 'text-blue-600'
    if (grade <= 3.5) return 'text-yellow-600'
    return 'text-orange-600'
  }

  return (
    <div className="w-full space-y-6">
      {/* Current Value Display */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Dein (erwarteter) Abiturschnitt
        </p>
        <div className="inline-flex flex-col items-center justify-center px-8 py-4 bg-primary/10 rounded-2xl">
          <span className={cn('text-5xl font-bold tabular-nums', getGradeColor(value))}>
            {value.toFixed(1)}
          </span>
          <span className={cn('text-sm font-medium mt-1', getGradeColor(value))}>
            {getGradeDescription(value)}
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="px-2">
        <Slider
          value={[value]}
          onValueChange={([val]) => onChange(val)}
          min={1.0}
          max={4.0}
          step={0.1}
          disabled={disabled}
          className="w-full"
        />
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between px-2 text-xs">
        <span className="text-green-600 font-medium">1,0 (Beste)</span>
        <span className="text-muted-foreground">2,5</span>
        <span className="text-orange-600 font-medium">4,0</span>
      </div>

      {/* Info Text */}
      <p className="text-xs text-muted-foreground text-center">
        Wir nutzen deinen Schnitt, um NC-Anforderungen zu berücksichtigen.
        <br />
        Keine Sorge - bessere Noten bedeuten mehr Optionen, nicht bessere Matches.
      </p>
    </div>
  )
}
