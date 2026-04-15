import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { ArrowRight, Clock, Phone } from 'lucide-react'

export default async function ContactCta() {
  const t = await getTranslations('home')
  const locale = await getLocale()
  const base = `/${locale}`

  return (
    <section className="relative overflow-hidden bg-midnight py-20 md:py-28">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Amber glow blob */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />

      <div className="container-site relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Contact
            </span>
            <span className="h-px w-8 bg-amber-500" />
          </div>

          <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            {t('cta_section_headline')}
          </h2>
          <p className="mt-5 text-lg text-white/65">
            {t('cta_section_subline')}
          </p>

          {/* Trust signals */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <span>Réponse sous 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-400" />
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-amber-400" />
              <span>Étude offerte</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`${base}/devis`}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-8 py-4 text-base font-semibold text-white shadow-amber transition-all hover:bg-amber-400 hover:shadow-amber-hover hover:-translate-y-0.5"
            >
              {t('cta_section_btn')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Autre question →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
