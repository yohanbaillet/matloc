import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const locales = ['fr', 'en', 'de', 'es', 'nl', 'zh']
const defaultLocale = 'fr'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Admin routes — enforce Supabase authentication
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    const response = NextResponse.next()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return response
  }

  // Public routes — locale prefix handling
  const localeInPath = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!localeInPath) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
  }

  const response = NextResponse.next()
  response.headers.set('x-next-intl-locale', localeInPath)
  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)',],
}
