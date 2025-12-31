'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface OptionCardProps {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
  isSelected: boolean
  onSelect: (value: string) => void
  type?: 'single' | 'multi'
  disabled?: boolean
}

export function OptionCard({
  value,
  label,
  description,
  icon,
  isSelected,
  onSelect,
  type = 'single',
  disabled = false,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => !disabled && onSelect(value)}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        'relative w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
        isSelected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border hover:border-primary/50 hover:bg-muted/50',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Selection Indicator */}
        <div
          className={cn(
            'flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center transition-all',
            type === 'multi' && 'rounded-md',
            isSelected
              ? 'border-primary bg-primary'
              : 'border-muted-foreground/30'
          )}
        >
          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="text-muted-foreground">{icon}</span>
            )}
            <span
              className={cn(
                'font-medium text-sm sm:text-base',
                isSelected ? 'text-primary' : 'text-foreground'
              )}
            >
              {label}
            </span>
          </div>
          {description && (
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.button>
  )
}

// Multi-Select Grid Component
interface OptionGridProps {
  options: Array<{
    value: string
    label: string
    description?: string
    icon?: React.ReactNode
  }>
  selectedValues: string[]
  onSelect: (value: string) => void
  type?: 'single' | 'multi'
  columns?: 1 | 2 | 3
  disabled?: boolean
}

export function OptionGrid({
  options,
  selectedValues,
  onSelect,
  type = 'multi',
  columns = 2,
  disabled = false,
}: OptionGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <div className={cn('grid gap-3', gridCols[columns])}>
      {options.map((option) => (
        <OptionCard
          key={option.value}
          {...option}
          isSelected={selectedValues.includes(option.value)}
          onSelect={onSelect}
          type={type}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
