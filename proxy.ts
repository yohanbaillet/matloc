import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['fr', 'en', 'de', 'es', 'nl', 'zh']
const defaultLocale = 'fr'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const localeInPath = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!localeInPath) {
    // No locale prefix — redirect to default locale
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url))
  }

  // Inject locale header so next-intl server components can read it
  const response = NextResponse.next()
  response.headers.set('x-next-intl-locale', localeInPath)
  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)',],
}
