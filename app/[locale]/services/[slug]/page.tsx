import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { services, getServiceBySlug } from '@/lib/data/services'
import ContactCta from '@/components/sections/ContactCta'
import SectionHeader from '@/components/shared/SectionHeader'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return { title: service.title, description: service.shortDesc }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale()
  const base = `/${locale}`
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] bg-midnight pt-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url('${service.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 to-midnight" />
        <div className="container-site relative z-10 py-20">
          <Link
            href={`${base}/services`}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Tous les services
          </Link>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-8 bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Service</span>
          </div>
          <h1 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/65">{service.shortDesc}</p>
          <div className="mt-8">
            <Link
              href={`${base}/devis`}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-7 py-3 font-semibold text-white shadow-amber transition-all hover:bg-amber-400 hover:-translate-y-0.5"
            >
              Nous contacter
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold">Comment ça se passe</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{service.longDesc}</p>

              {/* Steps */}
              <div className="mt-10 space-y-6">
                {service.steps.map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-sm font-bold text-amber-600">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-bold text-foreground">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Included sidebar */}
            <div>
              <div className="sticky top-24 rounded-xl border border-border bg-surface p-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Ce qui est inclus
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 space-y-3">
                  <Link
                    href={`${base}/devis`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-400"
                  >
                    Demander un devis <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`${base}/contact`}
                    className="flex w-full items-center justify-center rounded-lg border border-border bg-white px-5 py-3 text-sm font-medium transition-colors hover:bg-surface"
                  >
                    Poser une question
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
