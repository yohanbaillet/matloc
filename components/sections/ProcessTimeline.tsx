import { getTranslations } from 'next-intl/server'
import { MessageSquare, ClipboardList, Wrench, HeartHandshake } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'

export default async function ProcessTimeline() {
  const t = await getTranslations('home')

  const steps = [
    {
      number: '01',
      icon: MessageSquare,
      title: t('process_step1_title'),
      description: t('process_step1_desc'),
    },
    {
      number: '02',
      icon: ClipboardList,
      title: t('process_step2_title'),
      description: t('process_step2_desc'),
    },
    {
      number: '03',
      icon: Wrench,
      title: t('process_step3_title'),
      description: t('process_step3_desc'),
    },
    {
      number: '04',
      icon: HeartHandshake,
      title: t('process_step4_title'),
      description: t('process_step4_desc'),
    },
  ]

  return (
    <section className="section-padding bg-surface">
      <div className="container-site">
        <SectionHeader
          eyebrow="Notre processus"
          title={t('process_title')}
          subtitle={t('process_subtitle')}
          className="mb-14"
        />

        {/* Desktop timeline */}
        <div className="hidden lg:block">
          {/* Connector line */}
          <div className="relative mb-2 flex items-start">
            <div className="absolute left-[12.5%] right-[12.5%] top-6 h-px bg-gradient-to-r from-border via-amber-300 to-border" />
            <div className="grid w-full grid-cols-4 gap-8">
              {steps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.number} className="flex flex-col items-center text-center">
                    {/* Step circle */}
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400 bg-white shadow-sm">
                      <Icon className="h-5 w-5 text-amber-600" />
                    </div>
                    {/* Number */}
                    <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-amber-500">
                      {step.number}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Mobile / tablet timeline */}
        <div className="space-y-0 lg:hidden">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isLast = i === steps.length - 1
            return (
              <div key={step.number} className="relative flex gap-6">
                {/* Left column — icon + connector */}
                <div className="flex flex-col items-center">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-amber-400 bg-white shadow-sm">
                    <Icon className="h-4 w-4 text-amber-600" />
                  </div>
                  {!isLast && (
                    <div className="mt-1 w-px flex-1 bg-border" />
                  )}
                </div>
                {/* Content */}
                <div className={`pb-8 ${isLast ? '' : ''}`}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
                    {step.number}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
