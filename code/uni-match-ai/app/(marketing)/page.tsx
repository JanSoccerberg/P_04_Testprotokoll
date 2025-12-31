'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FeatureCard } from "@/components/FeatureCard"
import { UniversityCard } from "@/components/UniversityCard"
import { MatchBadge } from "@/components/MatchBadge"
import { Sparkles, BarChart3, Euro, Users, ChevronRight, Star, ArrowRight } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const sampleUniversities = [
  {
    name: "Technische Universität München",
    program: "Informatik B.Sc.",
    location: "München",
    matchPercentage: 94,
    ranking: "Spitzengruppe",
    reasons: ["Perfekte Spezialisierung", "Top 10 weltweit", "Starke Industrie-Nähe"],
  },
  {
    name: "Ruprecht-Karls-Universität Heidelberg",
    program: "Medizin Staatsexamen",
    location: "Heidelberg",
    matchPercentage: 91,
    ranking: "Spitzengruppe",
    reasons: ["Exzellente Forschung", "Tradition seit 1386"],
  },
  {
    name: "Ludwig-Maximilians-Universität München",
    program: "Betriebswirtschaftslehre B.Sc.",
    location: "München",
    matchPercentage: 87,
    ranking: "Spitzengruppe",
    reasons: ["Breites Netzwerk", "Internationale Ausrichtung"],
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30" />

        <div className="container relative py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-center lg:text-left"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-6 py-2.5 rounded-full text-sm text-primary-foreground/90 mb-6">
                <Sparkles className="w-4 h-4" />
                KI-gestützte Empfehlungen
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
                Finde die Uni, die zu dir passt
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Entdecke aus über 21.000 Studiengängen in Deutschland deinen perfekten Match – basierend auf deinen Interessen, Stärken und Zielen.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start">
                <Link href="/schnellsuche">
                  <Button size="lg" className="h-14 px-10 text-lg font-bold bg-white text-primary backdrop-blur-sm hover:bg-white/90 rounded-full transition-all duration-300 hover:scale-105 shadow-xl shadow-white/20">
                    <Sparkles className="w-6 h-6 mr-2" />
                    Matching starten
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/30" />
                    ))}
                  </div>
                  <span className="text-sm text-primary-foreground/80">5.000+ Schüler</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-orange" />
                  ))}
                  <span className="text-sm text-primary-foreground/80 ml-1">4.9/5</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-full h-80 rounded-2xl bg-white/10 backdrop-blur-sm shadow-2xl flex items-center justify-center">
                <span className="text-primary-foreground/50">Platform Preview</span>
              </div>

              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border border-border"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <MatchBadge percentage={94} size="sm" showLabel={false} />
                  <div>
                    <p className="font-medium text-sm text-foreground">TU München</p>
                    <p className="text-xs text-muted-foreground">Informatik B.Sc.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Warum Unimatching?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wir nehmen dir die Komplexität ab und zeigen dir genau die Unis, die zu deinem Profil passen.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp}>
              <FeatureCard
                icon={Sparkles}
                title="KI-Empfehlungen"
                description="Unser Algorithmus analysiert dein Profil und findet die perfekten Matches aus tausenden Optionen."
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureCard
                icon={BarChart3}
                title="CHE-Rankings"
                description="Alle Bewertungen des renommierten CHE-Rankings direkt integriert und vergleichbar."
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureCard
                icon={Euro}
                title="Kostenübersicht"
                description="Vollständige Transparenz über Lebenshaltungskosten, Semesterbeiträge und mehr."
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <FeatureCard
                icon={Users}
                title="Community"
                description="Erfahrungsberichte von echten Studierenden helfen dir bei der Entscheidung."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sample Results Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Entdecke deine Top-Matches
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hier siehst du beispielhafte Ergebnisse – starte dein eigenes Matching für personalisierte Empfehlungen.
            </p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-3 gap-6 mb-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {sampleUniversities.map((uni, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <UniversityCard {...uni} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/schnellsuche">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Finde deine Top-Unis
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { value: "21.000+", label: "Studiengänge" },
              { value: "400+", label: "Hochschulen" },
              { value: "16", label: "Bundesländer" },
              { value: "94%", label: "Zufriedenheit" },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Bereit für deine Zukunft?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              In nur 5 Minuten zu deinen personalisierten Uni-Empfehlungen. Kostenlos und unverbindlich.
            </p>
            <Link href="/schnellsuche">
              <Button size="lg" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 shadow-lg">
                Jetzt kostenlos starten
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
