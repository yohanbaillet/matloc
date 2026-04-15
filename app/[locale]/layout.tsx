import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'
import { routing } from '@/lib/i18n/routing'
import { cjkLocales } from '@/lib/i18n/config'
import type { Locale } from '@/lib/i18n/config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })

  return {
    title: {
      default: 'MatLoc Indus | Cabines de peinture sur-mesure',
      template: '%s | MatLoc Indus',
    },
    description: t('hero_subline'),
    metadataBase: new URL('https://matlocindus.fr'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: '/fr',
        en: '/en',
        de: '/de',
        es: '/es',
        nl: '/nl',
        zh: '/zh',
      },
    },
    openGraph: {
      siteName: 'MatLoc Indus',
      locale,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()
  const isCJK = cjkLocales.includes(locale as Locale)

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${isCJK ? 'font-cjk' : ''}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
