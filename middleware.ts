import createMiddleware from 'next-intl/middleware'
import { defineRouting } from 'next-intl/routing'

const routing = defineRouting({
  locales: ['fr', 'en', 'de', 'es', 'nl', 'zh'],
  defaultLocale: 'fr',
  localePrefix: 'always',
})

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Enable locale routing for all paths except:
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
