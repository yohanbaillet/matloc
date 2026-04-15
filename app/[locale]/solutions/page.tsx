import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { solutions } from '@/lib/data/solutions'
import ContactCta from '@/components/sections/ContactCta'

export const metadata: Metadata = {
  title: 'Nos solutions',
  description: 'Cabines de peinture, laboratoires, aires de préparation, solutions énergétiques et location.',
}

export default async function SolutionsPage() {
  const locale = await getLocale()
  const base = `/${locale}`

  return (
    <>
      <section className="bg-midnight pb-16 pt-32">
        <div className="container-site">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                Solutions
              </span>
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
              Notre gamme complète
            </h1>
            <p className="mt-4 text-lg text-white/65">
              Des équipements de traitement de surface sur-mesure pour tous les métiers.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <Link
                key={s.slug}
                href={`${base}/solutions/${s.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-white card-lift"
              >
                <div className="aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.heroImage}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-bold text-foreground">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.shortDesc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-all group-hover:gap-2.5">
                    Découvrir
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
