import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['fr', 'en', 'de', 'es', 'nl', 'zh'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  localeDetection: false,
})

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
