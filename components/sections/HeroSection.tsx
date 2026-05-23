'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Calculator, ChevronRight, Download } from 'lucide-react'

function getCatalogUrl(locale: string) {
  return locale === 'fr' ? '/catalogues/Catalogue-FR.pdf' : '/catalogues/Catalogue-EN.pdf'
}

export default function HeroSection() {
  const t = useTranslations('home')
  const tc = useTranslations('common')
  const locale = useLocale()
  const base = `/${locale}`

  // Headline emphasis: last sentence rendered in coral.
  // i18n key returns e.g. "Heat the part. | Not the room."
  const raw = t('hero_headline')
  const [headLead, headEmph] = raw.includes('|') ? raw.split('|').map((s) => s.trim()) : [raw, '']

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden bg-black text-white">
      {/* Branded cabin — right-side visual on desktop, faded backdrop on mobile */}
      <div className="pointer-events-none absolute inset-0 lg:left-auto lg:right-0 lg:w-[60%]">
        <Image
          src="/brand/MatIndus-2.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain object-right opacity-30 lg:opacity-100"
        />
        {/* Left-edge fade on desktop to blend cabin into text area */}
        <div className="absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-black to-transparent lg:block" />
      </div>

      {/* Coral radial accent — molten-metal glow from bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-1/3 -left-1/4 h-[80vh] w-[80vh] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255,89,49,0.35) 0%, rgba(255,89,49,0.10) 35%, transparent 65%)',
        }}
      />

      {/* Mobile-only bottom fade so text remains legible over the cabin */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black lg:hidden" />

      {/* Vertical coral accent bar */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[var(--coral)] via-[var(--coral)]/30 to-transparent" />

      <div className="container-site relative z-10 flex min-h-[92vh] flex-col justify-center pt-24 pb-20">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Numbered eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow-numbered mb-8 text-white/70"
            data-num="01"
          >
            {t('hero_eyebrow')}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display text-[clamp(2.75rem,7vw,6rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white"
          >
            {headLead}
            {headEmph && (
              <>
                {' '}
                <span className="text-[var(--coral)]">{headEmph}</span>
              </>
            )}
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            {t('hero_subline')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#simulator"
              className="inline-flex items-center gap-2 rounded-sm bg-[var(--coral)] px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-coral transition-all hover:bg-[var(--coral-dark)] hover:shadow-coral-hover"
            >
              <Calculator className="h-4 w-4" />
              {t('hero_cta')}
            </a>
            <a
              href={getCatalogUrl(locale)}
              download
              className="inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
            >
              <Download className="h-4 w-4" />
              {tc('download_catalog')}
            </a>
            <Link
              href={`${base}/realisations`}
              className="group ml-1 hidden items-center gap-1.5 px-2 py-3.5 text-sm font-medium uppercase tracking-wider text-white/70 transition-colors hover:text-white sm:inline-flex"
            >
              {t('hero_cta_secondary')}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Sector quick links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-12 flex flex-wrap gap-2"
          >
            <Link
              href={`${base}/secteurs/automobile-carrosserie`}
              className="group flex items-center gap-1.5 border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-white/70 backdrop-blur-sm transition-all hover:border-[var(--coral)]/60 hover:bg-white/10 hover:text-white"
            >
              {t('hero_sector_auto')}
              <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={`${base}/secteurs/industrie`}
              className="group flex items-center gap-1.5 border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-white/70 backdrop-blur-sm transition-all hover:border-[var(--coral)]/60 hover:bg-white/10 hover:text-white"
            >
              {t('hero_sector_industry')}
              <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom-right brand essence — small, all caps, like the BrandKit */}
        <div className="absolute bottom-8 right-6 hidden text-right md:block">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            {tc('brand_essence')}
          </p>
        </div>
      </div>
    </section>
  )
}
