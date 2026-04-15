import type { Metadata } from 'next'
import { Clock, Shield, Phone } from 'lucide-react'
import QuoteForm from '@/components/forms/QuoteForm'

export const metadata: Metadata = {
  title: 'Demander un devis',
  description: 'Demandez votre étude de projet gratuite. Réponse sous 24h, sans engagement.',
}

type Props = {
  searchParams: Promise<{ name?: string; company?: string; email?: string }>
}

export default async function DevisPage({ searchParams }: Props) {
  const { name, company, email } = await searchParams
  return (
    <>
      <section className="bg-midnight pb-16 pt-32">
        <div className="container-site max-w-3xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-8 bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Devis</span>
          </div>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
            Étude de projet gratuite
          </h1>
          <p className="mt-4 text-lg text-white/65">
            Décrivez votre projet. Notre équipe technique vous répond sous 24h avec une première analyse.
            Sans engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/55">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              Réponse sous 24h
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-400" />
              Sans engagement
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-400" />
              Visite de site offerte
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Process sidebar */}
            <div className="space-y-5 lg:order-last">
              <div className="rounded-xl border border-border bg-white p-6">
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Ce qui se passe ensuite
                </h3>
                <div className="space-y-5">
                  {[
                    { n: '01', title: 'Réception', desc: 'On lit votre demande et on identifie un technicien référent.' },
                    { n: '02', title: 'Réponse sous 24h', desc: 'Premier retour avec questions complémentaires si besoin.' },
                    { n: '03', title: 'Visite de site', desc: 'On se déplace gratuitement pour une analyse précise.' },
                    { n: '04', title: 'Devis détaillé', desc: 'Chiffrage complet sous 5 jours ouvrés.' },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-bold text-amber-600">
                        {step.n}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{step.title}</p>
                        <p className="text-xs text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-midnight p-6">
                <p className="text-sm font-semibold text-white">Besoin d'un échange rapide ?</p>
                <a
                  href="tel:+33XXXXXXXXX"
                  className="mt-3 flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +33 (0)X XX XX XX XX
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-xl border border-border bg-white p-8 lg:col-span-2">
              <QuoteForm defaultName={name} defaultCompany={company} defaultEmail={email} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
