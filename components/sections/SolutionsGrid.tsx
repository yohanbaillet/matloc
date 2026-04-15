import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { ArrowRight, Wind, FlaskConical, Layers, Leaf, Truck } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'

export default async function SolutionsGrid() {
  const t = await getTranslations('home')
  const tn = await getTranslations('nav')
  const locale = await getLocale()
  const base = `/${locale}`

  const solutions = [
    {
      icon: Wind,
      title: tn('solutions_booths'),
      description:
        'Cabines thermiques, électriques ou hybrides. Dimensionnées pour vos véhicules et vos volumes de production.',
      href: `${base}/solutions/cabines-de-peinture`,
    },
    {
      icon: FlaskConical,
      title: tn('solutions_labs'),
      description:
        'Espaces de mélange et de contrôle couleur pour carrosseries et ateliers de peinture industrielle.',
      href: `${base}/solutions/laboratoires-de-peinture`,
    },
    {
      icon: Layers,
      title: tn('solutions_prep'),
      description:
        'Aires de ponçage et de préparation surface, intégrées ou indépendantes de la cabine principale.',
      href: `${base}/solutions/aires-de-preparation`,
    },
    {
      icon: Leaf,
      title: tn('solutions_energy'),
      description:
        'Panneaux endothermiques, systèmes de récupération de chaleur. Réduisez votre consommation de 30 à 50 %.',
      href: `${base}/solutions/gain-energetique`,
    },
    {
      icon: Truck,
      title: tn('solutions_rental'),
      description:
        'Besoin ponctuel ou pic d\'activité ? Location de cabines et équipements sans investissement lourd.',
      href: `${base}/solutions/location`,
    },
  ]

  return (
    <section className="section-padding bg-surface">
      <div className="container-site">
        <SectionHeader
          eyebrow="Notre gamme"
          title={t('solutions_title')}
          subtitle={t('solutions_subtitle')}
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => {
            const Icon = solution.icon
            return (
              <Link
                key={solution.href}
                href={solution.href}
                className={`group relative overflow-hidden rounded-xl border border-border bg-white p-7 transition-all duration-300 card-lift hover:border-amber-200 ${
                  i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {solution.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {solution.description}
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-all group-hover:gap-2.5">
                  En savoir plus
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>

                {/* Subtle number badge */}
                <span className="absolute right-5 top-5 text-3xl font-black text-border opacity-0 transition-opacity group-hover:opacity-100">
                  0{i + 1}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
