'use client'

import { useTranslations } from 'next-intl'
import TechLabel from '@/components/shared/TechLabel'
import EnergySimulator from '@/components/sections/EnergySimulator'

export default function TechnicalValidation() {
  const t = useTranslations('v2')

  return (
    <section id="simulator" className="section-v2 bg-[var(--bg)]">
      <div className="container-v2">
        <div className="mb-16 flex flex-col gap-6 max-w-3xl">
          <TechLabel>{t('validation_label')}</TechLabel>
          <h2 className="display-lg text-[var(--text-primary)]">{t('validation_title')}</h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            {t('validation_subtitle')}
          </p>
        </div>

        {/* Embed the existing simulator. The component already opts into
         * theme-light internally, so it reads as a deliberate light panel
         * inside the dark validation section. */}
        <div className="card-v2 overflow-hidden">
          <EnergySimulator />
        </div>
      </div>
    </section>
  )
}
