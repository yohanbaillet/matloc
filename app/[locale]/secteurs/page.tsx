import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { sectors } from '@/lib/data/sectors'
import ContactCta from '@/components/sections/ContactCta'

export const metadata: Metadata = {
  title: 'Secteurs',
  description: 'Cabines de peinture et équipements pour l\'automobile, la carrosserie et l\'industrie.',
}

export default async function SectorsPage() {
  const locale = await getLocale()
  const base = `/${locale}`

  return (
    <>
      <section className="bg-midnight pb-16 pt-32">
        <div className="container-site max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-8 bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Secteurs</span>
          </div>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
            Votre secteur, nos solutions
          </h1>
          <p className="mt-4 text-lg text-white/65">
            Des équipements pensés pour les contraintes spécifiques de chaque métier.
          </p>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {sectors.map((s) => (
              <Link
                key={s.slug}
                href={`${base}/secteurs/${s.slug}`}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.heroImage}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="mb-3 inline-flex w-fit rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
                    {s.title}
                  </span>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">{s.headline}</h2>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-amber-400 transition-all group-hover:gap-3">
                    Découvrir <ArrowRight className="h-4 w-4" />
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
