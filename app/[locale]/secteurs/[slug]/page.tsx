import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'
import { sectors, getSectorBySlug } from '@/lib/data/sectors'
import { solutions } from '@/lib/data/solutions'
import { realisations, getRealizationsBySector } from '@/lib/data/realisations'
import ContactCta from '@/components/sections/ContactCta'
import SectionHeader from '@/components/shared/SectionHeader'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sector = getSectorBySlug(slug)
  if (!sector) return {}
  return { title: sector.title, description: sector.description.slice(0, 160) }
}

export default async function SectorPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const base = `/${locale}`
  const sector = getSectorBySlug(slug)
  if (!sector) notFound()

  const relatedSolutions = solutions.filter((s) => sector.relatedSolutions.includes(s.slug))
  const sectorRealizations = getRealizationsBySector(slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] bg-midnight pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${sector.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/50 to-midnight" />
        <div className="container-site relative z-10 py-20">
          <Link
            href={`${base}/secteurs`}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Tous les secteurs
          </Link>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Secteur
            </span>
          </div>
          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            {sector.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/65">{sector.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`${base}/devis`}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-7 py-3 font-semibold text-white shadow-amber transition-all hover:bg-amber-400 hover:-translate-y-0.5"
            >
              Étude gratuite
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <SectionHeader
            eyebrow="Vos enjeux"
            title="Ce que nous comprenons de votre métier"
            align="left"
            className="mb-10"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {sector.painPoints.map((p, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-border bg-surface p-6">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div>
                  <h3 className="font-bold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-midnight">
        <div className="container-site">
          <SectionHeader
            eyebrow="Notre réponse"
            title="Ce que MatLoc Indus apporte à votre secteur"
            titleClassName="text-white"
            align="left"
            className="mb-10"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {sector.benefits.map((b, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-6">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div>
                  <h3 className="font-bold text-white">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding bg-surface">
        <div className="container-site">
          <SectionHeader
            eyebrow="Équipements"
            title="Solutions recommandées pour votre secteur"
            align="left"
            className="mb-10"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedSolutions.map((s) => (
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
                <div className="p-5">
                  <h3 className="font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.shortDesc}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                    Voir la solution <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Realizations */}
      {sectorRealizations.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-site">
            <div className="mb-10 flex items-end justify-between">
              <SectionHeader
                eyebrow="Réalisations"
                title={`Nos installations ${sector.title}`}
                align="left"
              />
              <Link
                href={`${base}/realisations`}
                className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-amber-600 hover:gap-2.5 sm:flex"
              >
                Voir tout <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {sectorRealizations.map((r) => (
                <Link
                  key={r.slug}
                  href={`${base}/realisations/${r.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-white card-lift"
                >
                  <div className="aspect-video overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.images[0]}
                      alt={r.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium text-amber-600">{r.type}</p>
                    <p className="mt-1 font-bold">{r.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{r.location.city} · {r.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCta />
    </>
  )
}
