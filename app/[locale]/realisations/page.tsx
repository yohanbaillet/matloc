import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { realisations } from '@/lib/data/realisations'
import SectionHeader from '@/components/shared/SectionHeader'
import ContactCta from '@/components/sections/ContactCta'

export const metadata: Metadata = {
  title: 'Nos réalisations',
  description:
    'Découvrez les installations MatLoc Indus réalisées pour des professionnels de la carrosserie et de l\'industrie partout en France.',
}

export default async function RealisationsPage() {
  const locale = await getLocale()
  const base = `/${locale}`

  const sectors = [
    { label: 'Tous les secteurs', value: 'all' },
    { label: 'Automobile', value: 'Automobile' },
    { label: 'Industrie', value: 'Industrie' },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-midnight pb-16 pt-32">
        <div className="container-site">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                Réalisations
              </span>
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Nos installations terrain
            </h1>
            <p className="mt-4 text-lg text-white/65">
              {realisations.length} projets réalisés pour des professionnels exigeants.
              Carrosseries, menuiseries, métalleries — des installations concrètes avec des résultats mesurables.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-surface">
        <div className="container-site">
          {/* Sector filter — static labels, JS filter optional later */}
          <div className="mb-10 flex flex-wrap gap-2">
            {sectors.map((s) => (
              <span
                key={s.value}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  s.value === 'all'
                    ? 'bg-midnight text-white'
                    : 'border border-border bg-white text-foreground hover:bg-surface'
                }`}
              >
                {s.label}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {realisations.map((item) => (
              <Link
                key={item.slug}
                href={`${base}/realisations/${item.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-white card-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-midnight/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {item.sector}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
                    {item.type}
                  </p>
                  <h3 className="mt-1.5 text-base font-bold text-foreground">
                    {item.title}
                  </h3>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location.city}, {item.location.region} · {item.date}
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-all group-hover:gap-2.5">
                    Voir le projet
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
