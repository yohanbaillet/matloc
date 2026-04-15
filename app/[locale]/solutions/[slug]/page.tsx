import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react'
import { solutions, getSolutionBySlug } from '@/lib/data/solutions'
import { realisations } from '@/lib/data/realisations'
import ContactCta from '@/components/sections/ContactCta'
import SectionHeader from '@/components/shared/SectionHeader'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getSolutionBySlug(slug)
  if (!item) return {}
  return { title: item.title, description: item.shortDesc }
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const base = `/${locale}`
  const solution = getSolutionBySlug(slug)
  if (!solution) notFound()

  const related = realisations.filter((r) => r.solutionSlug === slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] bg-midnight pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${solution.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/50 to-midnight" />
        <div className="container-site relative z-10 py-20">
          <Link
            href={`${base}/solutions`}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Toutes les solutions
          </Link>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Solutions
            </span>
          </div>
          <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            {solution.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/65">{solution.shortDesc}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={`${base}/devis`}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-7 py-3 font-semibold text-white shadow-amber transition-all hover:bg-amber-400 hover:-translate-y-0.5"
            >
              Demander un devis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-7 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Poser une question
            </Link>
          </div>
        </div>
      </section>

      {/* Description + specs */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold">Vue d'ensemble</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {solution.longDesc}
              </p>

              {/* Features grid */}
              <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {solution.features.map((f, i) => (
                  <div key={i} className="rounded-xl border border-border bg-surface p-6">
                    <CheckCircle2 className="mb-3 h-5 w-5 text-amber-500" />
                    <h3 className="font-bold text-foreground">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs sidebar */}
            <div>
              <div className="sticky top-24 rounded-xl border border-border bg-surface p-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Caractéristiques
                </h3>
                <dl className="mt-4 space-y-3">
                  {solution.specs.map((spec, i) => (
                    <div key={i} className="border-b border-border pb-3 last:border-0 last:pb-0">
                      <dt className="text-xs text-muted-foreground">{spec.label}</dt>
                      <dd className="mt-0.5 font-semibold text-foreground">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 space-y-3">
                  <Link
                    href={`${base}/devis`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-400"
                  >
                    Demander un devis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`${base}/contact`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 py-3 text-sm font-medium transition-colors hover:bg-surface"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related realizations */}
      {related.length > 0 && (
        <section className="section-padding bg-surface">
          <div className="container-site">
            <SectionHeader
              eyebrow="Réalisations"
              title={`Exemples d'installations`}
              subtitle="Des projets concrets réalisés avec cette solution."
              align="left"
              className="mb-10"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((r) => (
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
                    <p className="mt-1 text-xs text-muted-foreground">
                      {r.location.city} · {r.date}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                      Voir le projet <ArrowRight className="h-3.5 w-3.5" />
                    </div>
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
