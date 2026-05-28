'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import TechLabel from '@/components/shared/TechLabel'
import MetricBig from '@/components/shared/MetricBig'

export default function EndothermicTech() {
  const t = useTranslations('v2')

  const bullets = [1, 2, 3, 4, 5].map((i) => t(`endothermic_bullet_${i}`))

  return (
    <section className="section-v2 relative overflow-hidden bg-[var(--surface)]">
      <div
        aria-hidden
        className="thermal-glow pointer-events-none absolute -left-40 top-1/3 h-[40rem] w-[40rem] opacity-50"
      />
      <div className="container-v2 relative">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7 flex flex-col gap-12">
            <div className="flex flex-col gap-4 max-w-2xl">
              <TechLabel>{t('endothermic_label')}</TechLabel>
              <h2 className="display-lg text-[var(--text-primary)]">{t('endothermic_title')}</h2>
              <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                {t('endothermic_subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
              <MetricBig value={t('endothermic_metric_energy')} label={t('endothermic_metric_energy_label')} />
              <MetricBig value={t('endothermic_metric_co2')}    label={t('endothermic_metric_co2_label')} />
              <MetricBig value={t('endothermic_metric_roi')}    label={t('endothermic_metric_roi_label')} />
            </div>

            <ul className="flex flex-col gap-3 border-t border-[var(--border-v2)] pt-8">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-4 text-base text-[var(--text-secondary)]">
                  <span className="mt-2 h-1.5 w-6 shrink-0 bg-[var(--accent-v2)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/illustrations/endo-panel.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain"
                style={{ filter: 'invert(1)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
