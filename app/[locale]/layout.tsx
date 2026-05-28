import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Geist, Geist_Mono, Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google'
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

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
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
      default: 'MAT INDUS | Cabines de peinture endothermiques sur-mesure',
      template: '%s | MAT INDUS',
    },
    description: t('hero_subline'),
    metadataBase: new URL('https://matindus.fr'),
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
      siteName: 'MAT INDUS',
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
      className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} ${inter.variable} ${jetbrainsMono.variable} ${isCJK ? 'font-cjk' : ''}`}
    >
      <body className="theme-v2 min-h-screen bg-background text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
