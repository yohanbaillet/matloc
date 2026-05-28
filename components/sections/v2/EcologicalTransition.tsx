'use client'

import { useTranslations } from 'next-intl'
import TechLabel from '@/components/shared/TechLabel'

export default function EcologicalTransition() {
  const t = useTranslations('v2')

  const pillars = [1, 2, 3].map((i) => ({
    title: t(`ecological_pillar_${i}_title`),
    desc: t(`ecological_pillar_${i}_desc`),
  }))

  return (
    <section className="section-v2 relative overflow-hidden bg-[var(--bg)]">
      <div
        aria-hidden
        className="thermal-glow pointer-events-none absolute inset-x-0 top-0 mx-auto h-[40rem] w-[60rem] opacity-30"
      />
      <div className="container-v2 relative">
        <div className="mb-20 flex flex-col gap-6 max-w-3xl">
          <TechLabel>{t('ecological_label')}</TechLabel>
          <h2 className="display-lg text-[var(--text-primary)]">{t('ecological_title')}</h2>
          <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
            {t('ecological_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {pillars.map((p, i) => (
            <article key={i} className="card-v2 flex flex-col gap-6 p-8 md:p-10">
              <div className="tech-label text-[var(--accent-v2)]">
                0{i + 1}
              </div>
              <h3 className="heading-md-v2 text-[var(--text-primary)]">{p.title}</h3>
              <p className="text-base leading-relaxed text-[var(--text-secondary)]">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
