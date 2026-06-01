'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'
import TechLabel from '@/components/shared/TechLabel'

type Card = {
  key: string
  image: string | null
  span: string
  href: string
}

const cards: Card[] = [
  { key: 'endothermic', image: '/brand/MatIndus-3.png',              span: 'md:col-span-2 md:row-span-2', href: '/solutions/gain-energetique' },
  { key: 'truck',       image: '/products/poids-lourds.jpg',         span: 'md:col-span-2',               href: '/solutions/cabines-de-peinture' },
  { key: 'prep',        image: '/products/air-preparation.jpg',      span: 'md:col-span-2',               href: '/solutions/aires-de-preparation' },
  { key: 'mixing',      image: '/products/laboratoire-peinture.jpg', span: 'md:col-span-2',               href: '/solutions/laboratoires-de-peinture' },
  { key: 'automation',  image: '/products/sur-mesure.jpg',           span: 'md:col-span-2',               href: '/solutions/cabines-de-peinture' },
]

export default function ProductArchitectureGrid() {
  const t = useTranslations('v2')
  const locale = useLocale()

  return (
    <section id="products" className="section-v2 bg-[var(--bg)]">
      <div className="container-v2">
        <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4 max-w-2xl">
            <TechLabel>{t('products_label')}</TechLabel>
            <h2 className="display-lg text-[var(--text-primary)]">{t('products_title')}</h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[var(--text-secondary)]">
            {t('products_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[18rem]">
          {cards.map(({ key, image, span, href }) => (
            <Link
              key={key}
              href={`/${locale}${href}`}
              className={`card-v2 group relative flex flex-col overflow-hidden p-6 transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none ${span}`}
            >
              {image && (
                <div className="relative -mx-2 -mt-2 mb-6 flex-1 min-h-[11rem] w-[calc(100%+1rem)] overflow-hidden rounded-2xl bg-[var(--surface-elevated)]">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              )}

              <div className="mt-auto flex flex-col gap-3">
                <h3 className="heading-md-v2 text-[var(--text-primary)]">
                  {t(`product_${key}_title`)}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {t(`product_${key}_desc`)}
                </p>
                <div className="tech-label mt-2 text-[var(--accent-v2)]">
                  {t(`product_${key}_metric`)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
