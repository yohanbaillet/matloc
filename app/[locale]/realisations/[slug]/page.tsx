import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { MapPin, Calendar, ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { realisations, getRealizationBySlug } from '@/lib/data/realisations'
import ContactCta from '@/components/sections/ContactCta'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  return realisations.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = getRealizationBySlug(slug)
  if (!item) return {}
  return {
    title: item.title,
    description: item.challenge.slice(0, 160),
  }
}

export default async function RealizationDetailPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const base = `/${locale}`
  const item = getRealizationBySlug(slug)
  if (!item) notFound()

  const others = realisations.filter((r) => r.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] bg-midnight pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${item.images[0]}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 to-midnight" />
        <div className="container-site relative z-10 py-16">
          <Link
            href={`${base}/realisations`}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Toutes les réalisations
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
              {item.sector}
            </span>
            <span className="text-xs text-white/50">{item.type}</span>
          </div>
          <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            {item.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-amber-400" />
              {item.location.city}, {item.location.region}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-amber-400" />
              {item.date}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Image gallery */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {item.images.map((img, i) => (
                  <div key={i} className="overflow-hidden rounded-xl aspect-video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${item.title} — photo ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Challenge */}
              <div>
                <h2 className="text-xl font-bold text-foreground">Le défi</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {item.challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-xl font-bold text-foreground">Notre solution</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {item.solution}
                </p>
              </div>

              {/* Testimonial */}
              {item.testimonial && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-7">
                  <Quote className="mb-4 h-7 w-7 text-amber-300" />
                  <p className="text-base italic leading-relaxed text-foreground/80">
                    &ldquo;{item.testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-midnight text-sm font-bold text-white">
                      {item.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{item.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Results */}
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Résultats clés
                </h3>
                <div className="mt-4 space-y-4">
                  {item.results.map((r, i) => (
                    <div key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="text-2xl font-black text-amber-500">{r.value}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project info */}
              <div className="rounded-xl border border-border bg-white p-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Détails projet
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Client</dt>
                    <dd className="font-medium text-right">{item.client}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Secteur</dt>
                    <dd className="font-medium">{item.sector}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Type</dt>
                    <dd className="font-medium text-right">{item.type}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Localisation</dt>
                    <dd className="font-medium">{item.location.city}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Année</dt>
                    <dd className="font-medium">{item.date}</dd>
                  </div>
                </dl>
              </div>

              {/* CTA */}
              <div className="rounded-xl bg-midnight p-6">
                <p className="font-semibold text-white">Un projet similaire ?</p>
                <p className="mt-1 text-sm text-white/60">Parlons-en, c'est gratuit.</p>
                <Link
                  href={`${base}/devis`}
                  className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-400"
                >
                  Demander un devis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other projects */}
      {others.length > 0 && (
        <section className="section-padding-sm bg-surface">
          <div className="container-site">
            <h2 className="mb-8 text-2xl font-bold">Autres réalisations</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`${base}/realisations/${other.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-white card-lift"
                >
                  <div className="aspect-video overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={other.images[0]}
                      alt={other.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium text-amber-600">{other.type}</p>
                    <p className="mt-1 text-sm font-bold">{other.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {other.location.city} · {other.date}
                    </p>
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
