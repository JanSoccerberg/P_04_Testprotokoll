import { Suspense } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'
import { Header } from '@/components/Header'

export const metadata = {
  title: 'Anmelden | Unimatching',
  description: 'Melde dich bei Unimatching an, um deine personalisierten Uni-Empfehlungen zu sehen.',
}

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-muted/30">
        <Suspense fallback={<div className="animate-pulse">Laden...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </>
  )
}
