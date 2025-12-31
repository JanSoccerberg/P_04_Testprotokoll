import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Geschützte Routen - erfordern Authentifizierung
const PROTECTED_ROUTES = ['/onboarding', '/ergebnisse', '/profil']

// Auth-Routen - leiten angemeldete User weiter
const AUTH_ROUTES = ['/auth/anmelden', '/auth/registrieren']

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Prüfe geschützte Routen
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  // Prüfe Auth-Routen
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  // Wenn nicht angemeldet und geschützte Route -> zur Anmeldung
  if (!user && isProtectedRoute) {
    const redirectUrl = new URL('/auth/anmelden', request.url)
    redirectUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Wenn angemeldet und auf Auth-Route -> zum Onboarding
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }

  return supabaseResponse
}
