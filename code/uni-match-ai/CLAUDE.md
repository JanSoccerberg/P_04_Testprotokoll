# Unimatching.com - Projekt-Kontext

Dieses Projekt ist **Unimatching.com**, eine KI-gestützte Plattform, die Schülern und Studieninteressierten in Deutschland hilft, die passenden Universitäten und Studiengänge zu finden.

## Development Progress Tracking

**WICHTIG:** Nach jeder Code-Änderung MUSS ein Eintrag in `PROGRESS.md` hinzugefügt werden!

Format für Einträge:
```
- `<typ>` <kurze Beschreibung der Änderung>
```

Typen:
- `add` - Neue Funktion/Feature hinzugefügt
- `fix` - Bug behoben
- `update` - Bestehendes Feature aktualisiert
- `refactor` - Code-Refactoring ohne Funktionsänderung
- `style` - UI/Styling-Änderungen
- `docs` - Dokumentation aktualisiert
- `init` - Initiale Erstellung
- `remove` - Feature/Code entfernt

## Quick Facts

- **Problem:** 21.000+ Studiengänge an 300+ Hochschulen ohne personalisierte Orientierungshilfe
- **Lösung:** Datengetriebene Plattform mit KI-Algorithmus für individuelle Match-Scores
- **Zielgruppe:** Schüler (16-19 Jahre), Abiturienten, Eltern
- **Markt:** ~400.000 Abiturienten/Jahr in Deutschland

## Tech Stack

- **Frontend:** Next.js 15 (App Router, TypeScript), Tailwind CSS, Shadcn/ui, Recharts
- **Backend:** Supabase (PostgreSQL, Auth, Storage), FastAPI (Python) für ML
- **ML:** XGBoost, scikit-learn, Sentence-Transformers, pgvector
- **Hosting:** Vercel (Frontend), Railway/Cloud Run (FastAPI), Supabase Cloud

## MVP Features (Phase 1)

1. **Onboarding-Fragebogen** (7 Schritte): Akademisches Profil, Interessen, Karriereziele, Präferenzen
2. **Matching-Algorithmus:** Content-Based (35%) + Collaborative Filtering (25%) + Hard Constraints + Ranking
3. **Universitäts-Detailseite:** Hero, Tabs (Übersicht, Studiengänge, Rankings, Zulassung, Campus)
4. **Vergleichs-Tool:** Side-by-Side für 2-3 Unis
5. **User Auth:** Supabase Auth mit Email/Google Login

## Design System

- **Primary Colors:** Deep Blue (#1E40AF) + Vibrant Purple (#7C3AED)
- **Secondary:** Bright Cyan (#06B6D4) + Warm Orange (#F97316)
- **Success:** Emerald Green (#10B981)
- **Typography:** Inter/Plus Jakarta Sans
- **Components:** Shadcn/ui Base + Custom (UniversityCard, RadarChart, MatchBadge)

## Performance Requirements

- TTI: <3 Sekunden (3G)
- LCP: <2,5 Sekunden
- Match-Berechnung: <2 Sekunden
- API Response (P95): <500ms

## Success Metrics

- 10.000 registrierte Nutzer (12 Monate)
- 85%+ bewerten Top-3-Empfehlungen als relevant
- 90%+ Onboarding Completion-Rate
- NPS Score: >40

---

# Product Requirements Document (PRD)

**Version:** 1.0
**Datum:** 28. Dezember 2025
**Status:** Draft

---

## Executive Summary

**Produkt:** Unimatching.com ist eine KI-gestützte Plattform, die Schülern und Studieninteressierten in Deutschland mit den passenden Universitäten und Studiengängen verbindet.

**Problem:** Die Wahl der richtigen Universität ist überwältigend - über 21.000 Studiengänge an 300+ Hochschulen ohne intelligente, personalisierte Orientierungshilfe.

**Lösung:** Eine datengetriebene Plattform mit KI-Algorithmus, der individuelle Match-Scores berechnet und transparent erklärt, warum bestimmte Unis passen.

**Zielgruppe:**
- Primär: Schüler (16-19 Jahre), Abiturienten
- Sekundär: Eltern, Studieninteressierte

**Markt:** ~400.000 Abiturienten pro Jahr in Deutschland

---

## Produkt-Vision & Ziele

### Vision Statement
> "Jeder Schüler in Deutschland findet die Universität, die perfekt zu seinen Talenten, Interessen und Zielen passt - ohne Überforderung, mit Vertrauen."

### Business Goals (12 Monate)
- 10.000 registrierte Nutzer
- 5.000 abgeschlossene Matching-Prozesse
- 70%+ User Satisfaction Score
- Partnerships mit 5+ Hochschulen
- Break-Even oder klarer Monetarisierungsweg

### Product Goals
1. **Genauigkeit:** 85%+ bewerten Top-3-Empfehlungen als "relevant"
2. **Usability:** 90%+ Completion-Rate beim Onboarding
3. **Trust:** Transparente Erklärungen für jeden Match
4. **Performance:** <2 Sekunden Ladezeit für Match-Ergebnisse
5. **Coverage:** Daten zu 95%+ aller staatlichen Hochschulen

### Success Metrics (KPIs)
- Time-to-First-Match: <5 Minuten
- Onboarding Completion: 60%+
- User Retention: 40%+ kehren zurück
- NPS Score: >40
- Data Quality: <5% fehlende/veraltete Daten

---

## User Personas

### Primary Persona: "Orientierungsloser Max"
**Demografie:** 17 Jahre, Abiturnote 2,0-2,5, Bayern

**Goals:**
- Herausfinden welche Studiengänge passen
- Unis vergleichen (Ruf, Standort, Kosten)
- Zulassungschancen einschätzen

**Pain Points:**
- "Ich weiß nicht wo anfangen"
- "Alle Unis klingen gleich"
- "Angst vor falscher Wahl"

**Jobs-to-be-Done:**
> "Wenn ich vor der Studienwahl stehe, möchte ich schnell und vertrauenswürdig herausfinden, welche Unis zu mir passen, damit ich eine selbstbewusste Entscheidung treffen kann."

### Secondary Persona: "Zielstrebige Sarah"
**Demografie:** 18 Jahre, Abitur 1,5, weiß bereits: Informatik

**Goals:**
- Beste Uni für Informatik finden
- Schwerpunkte vergleichen (KI, Security)
- Karriereaussichten evaluieren

**Pain Points:**
- CHE-Ranking ist komplex und nicht personalisiert
- Uni-Websites unübersichtlich
- Widersprüchliche subjektive Bewertungen

---

## MVP Features (Phase 1 - 16 Wochen)

### Feature 1: Intelligenter Onboarding-Fragebogen

**User Story:**
> Als Schüler möchte ich durch einen intuitiven Fragebogen geführt werden, damit die Plattform mich versteht.

**Requirements:**
- **Multi-Step-Form** mit 7 Schritten:
  1. Akademisches Profil (Abiturnote, Leistungskurse)
  2. Interessengebiete (MINT, Wirtschaft, Soziales, Kreativ)
  3. Lieblingsfächer
  4. Karriereziele (Forschung, Industrie, Selbstständigkeit)
  5. Studienumfeld (Stadt vs. Land, Uni-Größe)
  6. Geografische Präferenzen (Bundesländer, Entfernung)
  7. Budget & Finanzierung

- **Fortschrittsanzeige:** "Schritt 3 von 7"
- **Input-Typen:** Single/Multi-Select, Slider, optional Freitext
- **Speicherung:** Bei jedem Schritt (kein Datenverlust)
- **Mobile-optimiert:** 60%+ Nutzer auf Smartphone
- **Performance:** <500ms Ladezeit pro Schritt

**Priorität:** P0 (Must-Have)

---

### Feature 2: Matching-Algorithmus & Ergebnis-Seite

**User Story:**
> Als Nutzer möchte ich nach dem Fragebogen sofort meine Top-Empfehlungen sehen mit Erklärungen warum sie passen.

**Algorithmus-Requirements:**

**Input:**
- User-Profil (Onboarding)
- Uni-Datenbank (21.000+ Studiengänge)
- CHE-Ranking-Daten
- NC-Werte (letzte 3 Semester)

**Matching-Logik:**
1. **Content-Based Filtering (35%):**
   - TF-IDF für Studiengangs-Beschreibungen
   - Cosine Similarity User-Interessen ↔ Studiengang

2. **Collaborative Filtering (25%):**
   - "Nutzer wie du haben auch..."
   - SVD/KNN für Latent Features

3. **Hard Constraints:**
   - NC-Erreichbarkeit
   - Geografische Präferenzen
   - Studienform (Vollzeit, Dual)

4. **Ranking-Faktoren:**
   - CHE-Ranking (20%)
   - Standort-Match (10%)
   - Zulassungschance (10%)

**Output:**
- Top 10-20 Study Programs mit Match-Score (0-100%)
- Pro Match: 3-5 Gründe ("Warum passt das?")
- Sortierbar nach Score, Ranking, Standort

**Ergebnis-Seite:**
- **University Cards** mit:
  - Uni-Name + Logo
  - Studiengang + Abschluss
  - Standort
  - Match-Score (farbcodiert: 90%+ grün, 70-89% lila, <70% orange)
  - Expandable Match-Gründe
  - CTAs: "Details ansehen" | "Vergleichen" | "Merken"

- **Filter:**
  - Standort, Studiengang-Typ, NC-Wert, Uni-Typ

- **Performance:**
  - Match-Berechnung: <2 Sekunden
  - Persistent in DB
  - Shareable Link

**Priorität:** P0 (Must-Have)

---

### Feature 3: Universitäts-Detailseite

**User Story:**
> Als Nutzer möchte ich tiefe Details zu einer Uni sehen, um fundiert entscheiden zu können.

**Requirements:**

**Hero Section:**
- Uni-Name + Logo
- Standort mit interaktiver Karte
- Key Facts (Gründung, Studentenzahl, Typ)
- Match-Score prominent

**Tabs:**
1. **Übersicht:**
   - Uni/Studiengang-Beschreibung
   - Match-Breakdown (Radar-Chart mit 6 Dimensionen)
   - "Warum passt diese Uni?"-Sektion

2. **Studiengänge:**
   - Alle Studiengänge dieser Uni
   - Filterable nach Fachbereich
   - Mit Match-Scores

3. **Rankings & Bewertungen:**
   - CHE-Ranking-Scores (Bar-Charts)
   - User-Ratings (ab Phase 2)

4. **Zulassung & Kosten:**
   - NC-Werte (Ø letzte 3 Semester)
   - Zulassungsverfahren
   - Semesterbeitrag
   - Lebenshaltungskosten
   - Bewerbungsfristen

5. **Campus & Leben:**
   - Campus-Beschreibung
   - Infrastruktur (Mensa, Bib, Sport)
   - Stadt-Infos
   - Bilder/Galerie

**Interaktionen:**
- "Zu Vergleich hinzufügen"
- "Favorit" Toggle
- "Website besuchen"
- Share (WhatsApp, Email, Link)

**Performance:**
- SEO-optimiert (SSR)
- <1 Sekunde Ladezeit (ISR)

**Priorität:** P0 (Must-Have)

---

### Feature 4: Vergleichs-Tool

**User Story:**
> Als Nutzer möchte ich 2-3 Unis direkt vergleichen, um Unterschiede schnell zu erkennen.

**Requirements:**
- Side-by-Side-Tabelle (Desktop) oder Swipeable Cards (Mobile)
- Max. 3 Unis gleichzeitig
- Vergleichsdimensionen:
  - Match-Score
  - CHE-Rankings
  - NC-Werte
  - Kosten
  - Studiengang-Details
  - Standort + Distanz
- Highlighting: Beste Werte grün markiert
- Export: Screenshot oder PDF
- Shareable URL (/compare?ids=uuid1,uuid2,uuid3)

**Priorität:** P1 (Should-Have)

---

### Feature 5: User Authentication & Profil

**User Story:**
> Als Nutzer möchte ich mich registrieren, damit meine Ergebnisse gespeichert werden.

**Requirements:**
- **Sign Up:** Email + Passwort oder Google Social Login
- **Login:** Email + Passwort
- **Passwort-Reset:** Via Email
- **Profil-Seite:**
  - Onboarding-Antworten editierbar
  - Gespeicherte Favoriten
  - Match-Historie
  - Account löschen (DSGVO)

**Tech:**
- Powered by Supabase Auth
- JWT Session-Management
- Rate Limiting (10 Login-Versuche/Stunde)

**Priorität:** P1 (Should-Have, Woche 12-14)

---

## Phase 2 Features (Post-MVP, Wochen 17-28)

### Feature 6: User-Generated-Content
- Uni-Bewertungen (1-5 Sterne + Text)
- "Ich studiere hier"-Verifikation
- Q&A zu Unis (Community)

### Feature 7: Advanced Matching
- NLP Semantic Search ("Studiengänge mit KI und Medizin")
- Collaborative Filtering ausgerollt
- Karriere-Prognosen ("85% finden Job innerhalb 6 Monate")

### Feature 8: Bewerbungs-Tracking
- Bewerbungsfristen-Kalender
- Status-Tracking
- Dokumente hochladen

### Feature 9: AI-Chatbot
- GPT-4 + RAG über Uni-Datenbank
- "Erkläre mir TU vs. FH"

### Feature 10: Mobile App
- React Native (iOS + Android)
- Push-Notifications
- Offline-Modus

---

## Technische Anforderungen

### Tech Stack

**Frontend:**
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS + Shadcn/ui
- Recharts für Visualisierungen

**Backend:**
- Supabase (PostgreSQL, Auth, Storage, Realtime)
- FastAPI (Python) für ML-Microservice
- XGBoost, scikit-learn, Sentence-Transformers

**Datenbank:**
- PostgreSQL 16 (via Supabase)
- pgvector für Semantic Search
- Row Level Security

**Hosting:**
- Vercel (Frontend)
- Railway/Cloud Run (FastAPI)
- Supabase Cloud (Production DB)

### Performance Requirements
- **TTI:** <3 Sekunden (3G)
- **LCP:** <2,5 Sekunden
- **FID:** <100ms
- **CLS:** <0,1
- **API Response (P95):** <500ms
- **Match-Berechnung (P99):** <2 Sekunden

### Security Requirements
- JWT Auth, Refresh Tokens, HttpOnly Cookies
- TLS 1.3 Verschlüsselung
- OWASP Top 10 addressiert
- Rate Limiting: 100 Requests/Minute/User
- Zod Input Validation
- SQL Injection Prevention (RLS + Prepared Statements)

### Accessibility
- WCAG 2.1 Level AA
- Keyboard Navigation
- Screen Reader Support (ARIA)
- Farbkontrast: 4,5:1 (normal), 3:1 (groß)

### DSGVO & Legal
- Cookie-Consent Banner
- Privacy Policy
- Datenauskunft API-Endpoint (JSON Export)
- Account-Löschung inkl. aller Daten
- Data Minimization
- EU-Hosting (Supabase)

---

## Daten-Strategie

### Datenquellen

**Hochschulkompass (HRK):**
- 21.000 Studiengänge, 300+ Hochschulen
- Update: Wöchentlich
- Scraping oder API (Lizenz klären!)

**CHE-Ranking:**
- Detaillierte Qualitätsindikatoren
- **Lizenz nötig!** Kommerzielle Nutzung prüfen
- Alternative: Eigene Befragungen

**Statistisches Bundesamt:**
- Absolventenzahlen, Durchfallquoten
- Open Data (kostenlos)

**Uni-Websites:**
- NC-Werte (Scraping)
- Semesterbeiträge
- Studiengangs-Beschreibungen

### Data Pipeline

**Initial Load:**
1. Web Scraping (BeautifulSoup, Scrapy)
2. Data Cleaning (Deduplizierung)
3. Feature Engineering (TF-IDF, Embeddings)
4. DB-Import

**Continuous Updates:**
- Wöchentlich: Neue Studiengänge, NC-Updates
- Täglich: User-Ratings
- On-Demand: Uni-Detailänderungen

**Data Quality:**
- Validierung: Pflichtfelder
- Completeness Score: 0-100% pro Uni
- Stale Data Alerts: >90 Tage
- Community Corrections

---

## UX/UI Design

### Design System

**Brand Colors:**
- Primary: Deep Blue (#1E40AF) + Vibrant Purple (#7C3AED)
- Secondary: Bright Cyan (#06B6D4) + Warm Orange (#F97316)
- Success: Emerald Green (#10B981)
- Neutrals: Grays (#0F172A bis #F1F5F9)

**Typography:**
- Headings: Inter/Plus Jakarta Sans (700-800)
- Body: Inter (400-500)
- Monospace: JetBrains Mono (Scores)

**Components:**
- Shadcn/ui Base
- Custom: UniversityCard, RadarChart, MatchBadge

### Key Screens

1. **Landing Page:** Hero + Value Props + CTA
2. **Onboarding:** Progress Bar + Question Card + Navigation
3. **Match Results:** Filter-Pills + University Cards Grid
4. **University Detail:** Hero + Tabs + Sidebar
5. **Comparison:** 3-Column-Layout + Color-Coded Cells

### Animations
- Page Transitions: Fade + Slide (300ms)
- Card Hover: Lift + Shadow
- Match-Score: Count-Up-Animation
- Loading: Skeleton Screens
- Success: Subtle Confetti

---

## Go-to-Market

### Launch-Plan

**Woche 1-2: Private Beta**
- 50 handverlesene Tester
- Feedback-Formulare
- Bug-Fixes

**Woche 3-4: Public Beta**
- Social Media (TikTok, Instagram)
- Schüler-Portale
- Ziel: 500 Beta-Nutzer

**Woche 5: Official Launch**
- Press Release
- Product Hunt
- Paid Ads (€2.000)
- Schul-Kooperationen

### Marketing-Kanäle

**Organic:**
- SEO Content-Hub
- TikTok/Instagram
- Reddit/Gutefrage

**Paid:**
- Google Ads ("Uni-Ranking", "Studiengang finden")
- Instagram/TikTok Ads (16-19 Jahre)
- Retargeting

**Partnerships:**
- Schulen (Workshops)
- Hochschulen (Featured Listings)
- Student-Influencer

### Pricing (Post-MVP)

**Freemium:**
- **Free:** Basis-Matching, Top 10 Empfehlungen
- **Premium (€4,99/Monat):** Unlimitiert Vergleiche, Karriere-Prognosen, Bewerbungs-Tracking

**B2B (Hochschulen):**
- Featured Listing: €500-2.000/Monat
- Analytics-Dashboard: €1.000/Monat

---

## Risiken & Mitigation

### Technische Risiken

**Datenqualität:**
- Impact: Hoch
- Mitigation: Auto-Checks, Community-Korrekturen, Uni-Partnerships

**Algorithmus-Bias:**
- Impact: Mittel
- Mitigation: Fairness-Metriken, Transparenz, A/B-Testing

**Skalierung:**
- Impact: Mittel
- Mitigation: Caching (Redis), CDN, DB-Indexing, Serverless

### Business-Risiken

**Geringes Engagement:**
- Impact: Hoch
- Mitigation: Onboarding-Optimierung, Reminder-Emails, Gamification

**Rechtliche Probleme:**
- Impact: Hoch
- Mitigation: Juristische Prüfung, CHE-Lizenz klären, DSGVO Day 1

**Konkurrenz:**
- Impact: Mittel
- Mitigation: UX-Fokus, Community, schnelle Iteration

---

## Roadmap

### Phase 1: MVP (Wochen 1-16)
- **Woche 1-4:** Setup, DB-Schema, Initial Data
- **Woche 5-8:** Onboarding, Matching-Algorithmus
- **Woche 9-12:** Detail-Seite, Vergleich, CHE-Integration
- **Woche 13-16:** Polish, Testing, Launch

**Deliverable:** MVP mit 5.000+ Studiengängen, 100+ Unis

### Phase 2: Growth (Wochen 17-28)
- Community Features
- Advanced Matching (Collaborative, NLP)
- Monetarisierung

**Deliverable:** Zahlende Nutzer, B2B-Kunden

### Phase 3: Scale (Monat 7-12)
- Mobile App
- Bewerbungs-Tracking
- AI-Chatbot
- Internationale Expansion

**Deliverable:** 10.000+ User, €50k ARR

---

## Success Criteria (MVP)

### Launch-Metriken (nach 4 Wochen)
- 1.000+ registrierte Nutzer
- 70%+ Onboarding Completion
- NPS >30
- 99% Uptime, <2s Match-Zeit
- 95%+ Hochschulen erfasst

### Go/No-Go für Phase 2
1. 500+ aktive Nutzer (weekly)
2. 60%+ bewerten Top-3 als relevant
3. <5% kritische Bugs
4. Positives User-Feedback (20+ Interviews)
5. Budget für Phase 2 gesichert (€30k)

---

## Budget (MVP)

- **Development:** €0 (Claude Code)
- **Freelancer (Design + QA):** €5.000
- **Hosting & Tools:** €540/Jahr
- **CHE-Lizenz:** €5.000-10.000/Jahr (zu klären!)
- **Legal (Anwalt):** €2.000
- **Marketing (Launch):** €3.000

**Total: ~€15.000-20.000**

---

## Offene Fragen

1. **CHE-Lizenz:** Kommerzielle Nutzung erlaubt? Kosten?
2. **Hochschulkompass-API:** Offizielle API oder Scraping?
3. **Monetarisierung:** Freemium ab Tag 1 oder später?
4. **DSGVO:** Welche Daten wie lange speichern?
