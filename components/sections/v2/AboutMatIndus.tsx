'use client'

import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import TechLabel from '@/components/shared/TechLabel'

export default function AboutMatIndus() {
  const t = useTranslations('v2')
  const tc = useTranslations('common')
  const locale = useLocale()
  const catalog = locale === 'fr' ? '/catalogues/Catalogue-FR.pdf' : '/catalogues/Catalogue-EN.pdf'

  return (
    <section className="section-v2 bg-[var(--surface)]">
      <div className="container-v2">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <TechLabel>{t('about_label')}</TechLabel>
            <h2 className="display-lg text-[var(--text-primary)]">{t('about_title')}</h2>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-6 text-lg leading-relaxed text-[var(--text-secondary)]">
              <p>{t('about_paragraph_1')}</p>
              <p>{t('about_paragraph_2')}</p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-4 border-t border-[var(--border-v2)]">
              <Link href={`/${locale}/devis`} className="btn-primary-v2">
                {t('about_cta')}
              </Link>
              <a href={catalog} download className="btn-secondary-v2">
                {tc('download_catalog')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
