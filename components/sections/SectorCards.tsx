import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'

export default async function SectorCards() {
  const t = await getTranslations('home')
  const locale = await getLocale()
  const base = `/${locale}`

  const sectors = [
    {
      title: t('sector_auto_headline'),
      description: t('sector_auto_desc'),
      cta: t('sector_auto_cta'),
      href: `${base}/secteurs/automobile-carrosserie`,
      image:
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
      badge: 'Automobile',
    },
    {
      title: t('sector_industry_headline'),
      description: t('sector_industry_desc'),
      cta: t('sector_industry_cta'),
      href: `${base}/secteurs/industrie`,
      image:
        'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80',
      badge: 'Industrie',
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <SectionHeader
          eyebrow="Secteurs"
          title={t('sectors_title')}
          subtitle={t('sectors_subtitle')}
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {sectors.map((sector) => (
            <Link
              key={sector.href}
              href={sector.href}
              className="group relative overflow-hidden rounded-xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <span className="mb-3 inline-flex w-fit rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  {sector.badge}
                </span>
                <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                  {sector.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-base">
                  {sector.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-amber-400 transition-all group-hover:gap-3">
                  {sector.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
