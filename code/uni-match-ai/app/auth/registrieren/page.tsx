import { Suspense } from 'react'
import { SignUpForm } from '@/components/auth/SignUpForm'
import { Header } from '@/components/Header'

export const metadata = {
  title: 'Registrieren | Unimatching',
  description: 'Erstelle dein kostenloses Unimatching-Konto für personalisierte Uni-Empfehlungen.',
}

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-muted/30">
        <Suspense fallback={<div className="animate-pulse">Laden...</div>}>
          <SignUpForm />
        </Suspense>
      </main>
    </>
  )
}
