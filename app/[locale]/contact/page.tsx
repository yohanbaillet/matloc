import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez MatLoc Indus — réponse sous 24h. Sulniac, Morbihan.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-midnight pb-16 pt-32">
        <div className="container-site max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-8 bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Contact</span>
          </div>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mt-4 text-lg text-white/65">
            Une question, un projet à étudier, un devis à demander — notre équipe répond sous 24h.
          </p>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-white p-6">
                <h2 className="mb-5 text-lg font-bold">Nos coordonnées</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-muted-foreground">Sulniac, Morbihan (56)<br />Bretagne, France</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:contact@matlocindus.fr" className="text-amber-600 hover:underline">
                        contact@matlocindus.fr
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <div>
                      <p className="font-medium">Téléphone</p>
                      <a href="tel:+33XXXXXXXXX" className="text-amber-600 hover:underline">
                        +33 (0)X XX XX XX XX
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <div>
                      <p className="font-medium">Horaires</p>
                      <p className="text-muted-foreground">Lun–Ven : 8h–18h</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-midnight p-6">
                <p className="text-sm font-semibold text-white">Réponse garantie sous 24h</p>
                <p className="mt-1 text-xs text-white/55">
                  Pour les urgences SAV, notre technicien est joignable directement par téléphone.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-xl border border-border bg-white p-8 lg:col-span-2">
              <h2 className="mb-6 text-xl font-bold">Envoyer un message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
