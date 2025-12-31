import { cn } from "@/lib/utils"

interface MatchBadgeProps {
  percentage: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function MatchBadge({ percentage, size = "md", showLabel = true }: MatchBadgeProps) {
  const getColor = () => {
    if (percentage >= 90) return "text-success"
    if (percentage >= 70) return "text-accent"
    return "text-orange"
  }

  const getStrokeColor = () => {
    if (percentage >= 90) return "stroke-success"
    if (percentage >= 70) return "stroke-accent"
    return "stroke-orange"
  }

  const getBgColor = () => {
    if (percentage >= 90) return "bg-success-light"
    if (percentage >= 70) return "bg-purple-light"
    return "bg-orange-light"
  }

  const sizes = {
    sm: { container: "w-12 h-12", text: "text-sm", stroke: 3 },
    md: { container: "w-16 h-16", text: "text-lg", stroke: 4 },
    lg: { container: "w-24 h-24", text: "text-2xl", stroke: 5 },
  }

  const radius = size === "lg" ? 40 : size === "md" ? 26 : 20
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cn("relative", sizes[size].container)}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={sizes[size].stroke}
            className="text-muted"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth={sizes[size].stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn("transition-all duration-1000", getStrokeColor())}
          />
        </svg>
        <div className={cn("absolute inset-0 flex items-center justify-center font-mono font-semibold", sizes[size].text, getColor())}>
          {percentage}%
        </div>
      </div>
      {showLabel && (
        <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", getBgColor(), getColor())}>
          Match
        </span>
      )}
    </div>
  )
}
