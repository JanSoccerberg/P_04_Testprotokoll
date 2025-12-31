import Link from "next/link"
import { GraduationCap } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-xl">Unimatching</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm">
              Die KI-gestützte Plattform für deine perfekte Universitätswahl.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Plattform</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/#how-it-works" className="hover:text-primary-foreground transition-colors">So funktioniert&apos;s</Link></li>
              <li><Link href="/universities" className="hover:text-primary-foreground transition-colors">Universitäten</Link></li>
              <li><Link href="/programs" className="hover:text-primary-foreground transition-colors">Studiengänge</Link></li>
              <li><Link href="/rankings" className="hover:text-primary-foreground transition-colors">CHE-Rankings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/about" className="hover:text-primary-foreground transition-colors">Über uns</Link></li>
              <li><Link href="/careers" className="hover:text-primary-foreground transition-colors">Karriere</Link></li>
              <li><Link href="/press" className="hover:text-primary-foreground transition-colors">Presse</Link></li>
              <li><Link href="/contact" className="hover:text-primary-foreground transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/imprint" className="hover:text-primary-foreground transition-colors">Impressum</Link></li>
              <li><Link href="/privacy" className="hover:text-primary-foreground transition-colors">Datenschutz</Link></li>
              <li><Link href="/terms" className="hover:text-primary-foreground transition-colors">AGB</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/70">
            © 2024 Unimatching. Alle Rechte vorbehalten.
          </p>
          <p className="text-sm text-primary-foreground/70">
            Made with ❤️ in Deutschland
          </p>
        </div>
      </div>
    </footer>
  )
}
