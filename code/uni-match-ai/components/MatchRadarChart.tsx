'use client'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts"

interface MatchRadarChartProps {
  userProfile: number[]
  universityProfile: number[]
  labels?: string[]
  size?: number
}

const defaultLabels = [
  "Studieninhalte",
  "Karriere",
  "Standort",
  "Kosten",
  "Reputation",
  "Campusleben",
]

export function MatchRadarChart({
  userProfile,
  universityProfile,
  labels = defaultLabels,
  size = 300,
}: MatchRadarChartProps) {
  const data = labels.map((label, index) => ({
    subject: label,
    user: userProfile[index] || 0,
    university: universityProfile[index] || 0,
  }))

  return (
    <div style={{ width: size, height: size }} className="mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
          />
          <Radar
            name="Dein Profil"
            dataKey="user"
            stroke="hsl(var(--accent))"
            fill="hsl(var(--accent))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Radar
            name="Universität"
            dataKey="university"
            stroke="hsl(var(--cyan))"
            fill="hsl(var(--cyan))"
            fillOpacity={0.2}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Legend
            wrapperStyle={{ fontSize: 12 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
