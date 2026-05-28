'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import TechLabel from '@/components/shared/TechLabel'

type Card = {
  key: string
  image: string | null
  span: string
}

const PLACEHOLDER = '/brand/MatIndus-3.png'

const cards: Card[] = [
  { key: 'endothermic', image: PLACEHOLDER, span: 'md:col-span-2 md:row-span-2' },
  { key: 'gas',         image: PLACEHOLDER, span: 'md:col-span-2' },
  { key: 'truck',       image: PLACEHOLDER, span: 'md:col-span-2' },
  { key: 'prep',        image: PLACEHOLDER, span: 'md:col-span-2' },
  { key: 'mixing',      image: PLACEHOLDER, span: 'md:col-span-2' },
  { key: 'automation',  image: PLACEHOLDER, span: 'md:col-span-2 md:row-span-2' },
  { key: 'retractable', image: PLACEHOLDER, span: 'md:col-span-2' },
  { key: 'energy',      image: PLACEHOLDER, span: 'md:col-span-2' },
]

export default function ProductArchitectureGrid() {
  const t = useTranslations('v2')

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
          {cards.map(({ key, image, span }) => (
            <article
              key={key}
              className={`card-v2 group relative flex flex-col overflow-hidden p-6 ${span}`}
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
