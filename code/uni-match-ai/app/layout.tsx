import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Unimatching - Finde die Uni, die zu dir passt",
    template: "%s | Unimatching",
  },
  description:
    "KI-gestützte Plattform für deine perfekte Universitätswahl. Entdecke aus über 21.000 Studiengängen in Deutschland deinen perfekten Match.",
  keywords: [
    "Universität finden",
    "Studiengang Test",
    "Uni Matching",
    "Studium Deutschland",
    "Hochschulwahl",
    "Studienwahl",
  ],
  authors: [{ name: "Unimatching" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Unimatching",
    title: "Unimatching - Finde die Uni, die zu dir passt",
    description:
      "KI-gestützte Plattform für deine perfekte Universitätswahl. Entdecke aus über 21.000 Studiengängen in Deutschland deinen perfekten Match.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
