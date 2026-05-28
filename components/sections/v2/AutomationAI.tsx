'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import TechLabel from '@/components/shared/TechLabel'

export default function AutomationAI() {
  const t = useTranslations('v2')

  const principles = [1, 2, 3].map((i) => ({
    title: t(`automation_principle_${i}_title`),
    desc: t(`automation_principle_${i}_desc`),
  }))

  return (
    <section className="section-v2 bg-[var(--surface)]">
      <div className="container-v2">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface-elevated)]">
              <Image
                src="/brand/MatIndus-1.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-12">
            <div className="flex flex-col gap-4 max-w-2xl">
              <TechLabel>{t('automation_label')}</TechLabel>
              <h2 className="display-lg text-[var(--text-primary)]">{t('automation_title')}</h2>
              <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                {t('automation_subtitle')}
              </p>
            </div>

            <ul className="flex flex-col divide-y divide-[var(--border-v2)]">
              {principles.map((p, i) => (
                <li key={i} className="grid grid-cols-[3rem_1fr] items-start gap-6 py-6 first:pt-0">
                  <div className="tech-label text-[var(--accent-v2)] pt-1">0{i + 1}</div>
                  <div className="flex flex-col gap-2">
                    <h3 className="heading-md-v2 text-[var(--text-primary)]">{p.title}</h3>
                    <p className="text-base leading-relaxed text-[var(--text-secondary)]">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
