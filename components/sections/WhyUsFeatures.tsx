import { getTranslations } from 'next-intl/server'
import { Settings2, Handshake, ShieldCheck, TrendingDown } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'

export default async function WhyUsFeatures() {
  const t = await getTranslations('home')

  const features = [
    {
      icon: Settings2,
      title: t('why_custom_title'),
      description: t('why_custom_desc'),
    },
    {
      icon: Handshake,
      title: t('why_accomp_title'),
      description: t('why_accomp_desc'),
    },
    {
      icon: ShieldCheck,
      title: t('why_expert_title'),
      description: t('why_expert_desc'),
    },
    {
      icon: TrendingDown,
      title: t('why_energy_title'),
      description: t('why_energy_desc'),
    },
  ]

  return (
    <section className="section-padding bg-midnight">
      <div className="container-site">
        <SectionHeader
          eyebrow="Notre différence"
          title={t('why_title')}
          subtitle={t('why_subtitle')}
          className="mb-14"
          titleClassName="text-white"
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 sm:grid-cols-2">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="group relative border-b border-white/10 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.05] sm:border-r last:border-b-0 even:border-r-0 lg:even:border-r"
              >
                {/* Accent corner */}
                <div className="absolute left-0 top-0 h-px w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />

                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-amber-400">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
