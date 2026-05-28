'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import TechLabel from '@/components/shared/TechLabel'

export default function HeroV2() {
  const t = useTranslations('v2')
  const locale = useLocale()

  return (
    <section className="relative isolate overflow-hidden bg-[var(--bg)] min-h-[88vh] flex items-end">
      {/* Full-bleed cinematic backdrop */}
      <Image
        src="/brand/hero-background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center -z-10"
      />

      {/* Bottom-up gradient so copy stays readable over the cabin */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/85 via-40% to-transparent"
      />
      {/* Subtle coral atmosphere */}
      <div
        aria-hidden
        className="thermal-glow pointer-events-none absolute -bottom-32 -right-32 h-[40rem] w-[40rem] opacity-40 -z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--border-v2)]"
      />

      <div className="container-v2 relative pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="max-w-3xl flex flex-col gap-10">
          <TechLabel>{t('hero_label')}</TechLabel>

          <h1 className="display-xl text-[var(--text-primary)]">
            {t('hero_headline_1')}
            <span className="block text-[var(--accent-v2)]">{t('hero_headline_2')}</span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            {t('hero_supporting')}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#products" className="btn-primary-v2">
              {t('hero_cta_primary')}
            </a>
            <Link href={`/${locale}/devis`} className="btn-secondary-v2">
              {t('hero_cta_secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
