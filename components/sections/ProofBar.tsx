import { getTranslations } from 'next-intl/server'
import AnimatedNumber from '@/components/shared/AnimatedNumber'
import { Award, Calendar, Users, Zap } from 'lucide-react'

export default async function ProofBar() {
  const t = await getTranslations('home')

  const stats = [
    {
      icon: Award,
      value: 150,
      suffix: '+',
      label: t('proof_installations'),
    },
    {
      icon: Calendar,
      value: 20,
      suffix: '+',
      label: t('proof_years'),
    },
    {
      icon: Users,
      value: null,
      suffix: '',
      prefix: '',
      staticValue: t('proof_certified'),
      label: '',
    },
    {
      icon: Zap,
      value: 48,
      suffix: 'h',
      label: t('proof_response'),
    },
  ]

  return (
    <section className="border-y border-border bg-surface">
      <div className="container-site">
        <div className="grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-2 px-4 py-8 text-center sm:px-8"
              >
                <Icon className="h-5 w-5 text-amber-500" />
                <div className="text-3xl font-black tracking-tight text-midnight sm:text-4xl">
                  {stat.value !== null ? (
                    <AnimatedNumber
                      value={stat.value as number}
                      suffix={stat.suffix}
                    />
                  ) : (
                    <span>{stat.staticValue}</span>
                  )}
                </div>
                {stat.label && (
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
                    {stat.label}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
