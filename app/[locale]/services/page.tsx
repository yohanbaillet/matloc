import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, Handshake, Wrench, ShieldCheck } from 'lucide-react'
import ContactCta from '@/components/sections/ContactCta'

export const metadata: Metadata = {
  title: 'Nos services',
  description: 'Conseil, installation, maintenance et contrôle — MatLoc Indus vous accompagne de A à Z.',
}

const icons = [Handshake, Wrench, ShieldCheck]

const servicesData = [
  {
    slug: 'conseil-vente',
    title: 'Conseil & Vente',
    desc: 'Visite de site, étude technique gratuite, devis détaillé. Sans engagement.',
  },
  {
    slug: 'montage-installation',
    title: 'Montage & Installation',
    desc: 'Techniciens certifiés, chantier géré de A à Z, formation des opérateurs.',
  },
  {
    slug: 'maintenance-controle',
    title: 'Maintenance & Contrôle',
    desc: 'Contrats d\'entretien annuels, contrôles ICPE, SAV sous 48h.',
  },
]

export default async function ServicesPage() {
  const locale = await getLocale()
  const base = `/${locale}`

  return (
    <>
      <section className="bg-midnight pb-16 pt-32">
        <div className="container-site max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-8 bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Services</span>
          </div>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
            Accompagnement de A à Z
          </h1>
          <p className="mt-4 text-lg text-white/65">
            MatLoc Indus n'est pas un simple fournisseur d'équipement. Nous sommes partenaires sur la durée.
          </p>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {servicesData.map((s, i) => {
              const Icon = icons[i]
              return (
                <Link
                  key={s.slug}
                  href={`${base}/services/${s.slug}`}
                  className="group rounded-xl border border-border bg-white p-8 card-lift hover:border-amber-200"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-lg font-bold">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-all group-hover:gap-2.5">
                    En savoir plus <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
