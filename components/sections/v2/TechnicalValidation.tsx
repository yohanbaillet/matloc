'use client'

import { useTranslations } from 'next-intl'
import TechLabel from '@/components/shared/TechLabel'
import EnergySimulator from '@/components/sections/EnergySimulator'

export default function TechnicalValidation() {
  const t = useTranslations('v2')

  return (
    <section id="simulator" className="theme-light section-v2 bg-background text-foreground">
      <div className="container-v2">
        <div className="mb-16 flex flex-col gap-6 max-w-3xl">
          <TechLabel>{t('validation_label')}</TechLabel>
          <h2 className="display-lg text-foreground">{t('validation_title')}</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {t('validation_subtitle')}
          </p>
        </div>

        <div className="overflow-hidden rounded-[var(--radius-card)]">
          <EnergySimulator />
        </div>
      </div>
    </section>
  )
}
