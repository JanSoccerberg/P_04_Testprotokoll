'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { UniversityCard } from "@/components/UniversityCard"
import { MatchBadge } from "@/components/MatchBadge"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, MapPin, BarChart3, Euro, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

const universities = [
  {
    name: "Technische Universität München",
    program: "Informatik B.Sc.",
    location: "München",
    matchPercentage: 96,
    ranking: "Spitzengruppe",
    reasons: ["Perfekte Spezialisierung", "Top 10 weltweit", "Starke Industrie-Nähe"],
  },
  {
    name: "RWTH Aachen",
    program: "Informatik B.Sc.",
    location: "Aachen",
    matchPercentage: 93,
    ranking: "Spitzengruppe",
    reasons: ["Exzellente Forschung", "Praxisorientiert"],
  },
  {
    name: "Karlsruher Institut für Technologie",
    program: "Informatik B.Sc.",
    location: "Karlsruhe",
    matchPercentage: 91,
    ranking: "Spitzengruppe",
    reasons: ["Innovation Hub", "Gute Betreuung"],
  },
  {
    name: "Ludwig-Maximilians-Universität München",
    program: "Informatik B.Sc.",
    location: "München",
    matchPercentage: 88,
    ranking: "Spitzengruppe",
    reasons: ["Breites Netzwerk", "Internationale Ausrichtung"],
  },
  {
    name: "Universität Stuttgart",
    program: "Informatik B.Sc.",
    location: "Stuttgart",
    matchPercentage: 85,
    ranking: "Mittelgruppe",
    reasons: ["Industrie-Nähe", "Günstige Lebenshaltungskosten"],
  },
  {
    name: "Technische Universität Berlin",
    program: "Informatik B.Sc.",
    location: "Berlin",
    matchPercentage: 82,
    ranking: "Spitzengruppe",
    reasons: ["Startup-Szene", "Vielfältiges Campusleben"],
  },
]

const filters = [
  { id: "all", label: "Alle", icon: GraduationCap },
  { id: "location", label: "Nach Standort", icon: MapPin },
  { id: "ranking", label: "Nach Ranking", icon: BarChart3 },
  { id: "cost", label: "Nach Kosten", icon: Euro },
]

export default function ResultsPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Results Header */}
        <section className="bg-gradient-to-br from-accent/10 to-cyan/5 border-b border-border">
          <div className="container py-8 md:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Deine Top-Empfehlungen
                </h1>
                <p className="text-muted-foreground">
                  Basierend auf deinem Profil haben wir {universities.length} passende Studiengänge gefunden
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
                  <div className="flex items-center gap-4">
                    <MatchBadge percentage={94} size="lg" showLabel={false} />
                    <div>
                      <p className="text-sm text-muted-foreground">Match-Qualität</p>
                      <p className="font-semibold text-foreground">Sehr hoch</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-border bg-card sticky top-16 z-40">
          <div className="container py-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(filter.id)}
                    className={cn(
                      "shrink-0",
                      activeFilter === filter.id && "bg-accent text-accent-foreground hover:bg-accent/90"
                    )}
                  >
                    <filter.icon className="w-4 h-4 mr-2" />
                    {filter.label}
                  </Button>
                ))}
              </div>

              <Button variant="outline" size="sm" className="shrink-0">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Erweiterte Filter
              </Button>
            </div>
          </div>
        </section>

        {/* Results Grid */}
        <section className="py-8">
          <div className="container">
            <motion.div
              className="grid gap-4"
              initial="initial"
              animate="animate"
              variants={{
                animate: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {universities.map((uni, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                >
                  <UniversityCard {...uni} />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Weitere Ergebnisse laden
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 bg-secondary/30">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-2">Vergleichen</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Wähle bis zu 3 Unis für einen detaillierten Vergleich
                </p>
                <Button variant="outline" size="sm">
                  Unis vergleichen
                </Button>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-2">Speichern</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Speichere deine Favoriten für später
                </p>
                <Button variant="outline" size="sm">
                  Favoriten ansehen
                </Button>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-2">Beratung</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Lass dich von unserer KI beraten
                </p>
                <Button variant="outline" size="sm" className="bg-accent/10 border-accent/20 text-accent hover:bg-accent/20">
                  Chat starten
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
