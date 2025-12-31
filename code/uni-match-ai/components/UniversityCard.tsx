'use client'

import { MapPin, ChevronRight, Star, Check } from "lucide-react"
import { MatchBadge } from "./MatchBadge"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"

interface UniversityCardProps {
  name: string
  program: string
  location: string
  matchPercentage: number
  ranking?: string
  reasons?: string[]
  logoUrl?: string
  onClick?: () => void
}

export function UniversityCard({
  name,
  program,
  location,
  matchPercentage,
  ranking,
  reasons = [],
  logoUrl,
  onClick,
}: UniversityCardProps) {
  return (
    <div
      className={cn(
        "group bg-card rounded-2xl border border-border p-6",
        "hover:border-accent/40 hover:shadow-lg transition-all duration-300",
        "cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
          {logoUrl ? (
            <img src={logoUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xl font-bold text-accent">
              {name.charAt(0)}
            </span>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground truncate group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm truncate">{program}</p>
          <div className="flex items-center gap-4 mt-2 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {location}
            </span>
            {ranking && (
              <span className="flex items-center gap-1 text-accent">
                <Star className="w-4 h-4 fill-current" />
                {ranking}
              </span>
            )}
          </div>
        </div>

        {/* Match Badge */}
        <div className="shrink-0">
          <MatchBadge percentage={matchPercentage} size="md" />
        </div>
      </div>

      {/* Match Reasons */}
      {reasons.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex flex-wrap gap-2">
            {reasons.slice(0, 3).map((reason, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 text-xs bg-success-light text-success px-2 py-1 rounded-full"
              >
                <Check className="w-3 h-3" />
                {reason}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-4 flex justify-end">
        <Button variant="ghost" size="sm" className="text-accent hover:text-accent hover:bg-accent/10">
          Details ansehen
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
