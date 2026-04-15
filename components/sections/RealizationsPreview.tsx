import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { ArrowRight, MapPin } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'

// Static placeholder data — will be replaced by Sanity CMS data
const placeholderRealizations = [
  {
    id: '1',
    title: 'Cabine A7200 — Carrosserie Dupont',
    sector: 'Automobile',
    location: 'Rennes, Bretagne',
    type: 'Cabine de peinture VU/VL',
    image:
      'https://images.unsplash.com/photo-1611651338412-8403fa6e3599?auto=format&fit=crop&w=800&q=80',
    slug: 'cabine-a7200-carrosserie-dupont',
  },
  {
    id: '2',
    title: 'Installation industrielle — Menuiserie Leblanc',
    sector: 'Industrie',
    location: 'Nantes, Pays de la Loire',
    type: 'Cabine bois grande capacité',
    image:
      'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=800&q=80',
    slug: 'installation-industrielle-menuiserie-leblanc',
  },
  {
    id: '3',
    title: 'Cabine électrique E7200 — Groupe Bernard',
    sector: 'Automobile',
    location: 'Lille, Hauts-de-France',
    type: 'Cabine électrique écologique',
    image:
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    slug: 'cabine-electrique-e7200-groupe-bernard',
  },
]

export default async function RealizationsPreview() {
  const t = await getTranslations('home')
  const tc = await getTranslations('common')
  const locale = await getLocale()
  const base = `/${locale}`

  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Réalisations"
            title={t('realizations_title')}
            subtitle={t('realizations_subtitle')}
            align="left"
          />
          <Link
            href={`${base}/realisations`}
            className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-amber-600 transition-all hover:gap-3"
          >
            {tc('cta_see_all')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderRealizations.map((item) => (
            <Link
              key={item.id}
              href={`${base}/realisations/${item.slug}`}
              className="group overflow-hidden rounded-xl border border-border bg-white card-lift"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Sector badge */}
                <span className="absolute left-3 top-3 rounded-full bg-midnight/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {item.sector}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-amber-600">
                  {item.type}
                </p>
                <h3 className="mt-1.5 text-base font-bold text-foreground">
                  {item.title}
                </h3>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {item.location}
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-all group-hover:gap-2.5">
                  Voir le projet
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
