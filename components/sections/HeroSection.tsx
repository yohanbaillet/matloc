'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, ChevronRight } from 'lucide-react'
import SimulatorModal from '@/components/sections/SimulatorModal'

export default function HeroSection() {
  const t = useTranslations('home')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-midnight">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=80')",
        }}
      />
      {/* Gradient overlay — bottom fade for content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 via-midnight/60 to-midnight" />
      {/* Left accent line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-amber-500 via-amber-500/30 to-transparent" />

      <div className="container-site relative z-10 flex min-h-[92vh] flex-col justify-center pt-20 pb-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex items-center gap-2"
          >
            <span className="h-px w-8 bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              MatLoc Indus
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t('hero_headline')}
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
          >
            {t('hero_subline')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <SimulatorModal />
            <Link
              href={`${base}/realisations`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-8 py-3 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              {t('hero_cta_secondary')}
            </Link>
          </motion.div>

          {/* Sector quick links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              href={`${base}/secteurs/automobile-carrosserie`}
              className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-white/10 hover:text-white"
            >
              {t('hero_sector_auto')}
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={`${base}/secteurs/industrie`}
              className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-white/10 hover:text-white"
            >
              {t('hero_sector_industry')}
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        >
          <div className="h-8 w-px animate-pulse bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
