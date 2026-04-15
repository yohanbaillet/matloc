import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight, MapPin, Phone, Mail, Award, Users, Wrench, Leaf } from 'lucide-react'
import ContactCta from '@/components/sections/ContactCta'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'MatLoc Indus, spécialiste des cabines de peinture sur-mesure basé à Sulniac (Morbihan). Expertise, proximité et accompagnement.',
}

const values = [
  {
    icon: Award,
    title: 'Expertise technique',
    desc: 'Nos équipes maîtrisent l\'ensemble de la chaîne — du dimensionnement à la mise en service — avec rigueur et précision.',
  },
  {
    icon: Users,
    title: 'Proximité terrain',
    desc: 'Nous nous déplaçons sur site, nous comprenons vos contraintes et nous restons disponibles après l\'installation.',
  },
  {
    icon: Wrench,
    title: 'Sur-mesure absolu',
    desc: 'Aucune installation ne se ressemble. Chaque projet est pensé depuis vos contraintes spécifiques, pas depuis un catalogue.',
  },
  {
    icon: Leaf,
    title: 'Engagement environnemental',
    desc: 'Nos solutions énergétiques réduisent l\'empreinte carbone de vos ateliers. Performance et responsabilité ne s\'opposent pas.',
  },
]

export default async function AboutPage() {
  const locale = await getLocale()
  const base = `/${locale}`

  return (
    <>
      {/* Hero */}
      <section className="bg-midnight pb-20 pt-32">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="h-px w-8 bg-amber-500" />
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">À propos</span>
              </div>
              <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl">
                L'expertise terrain depuis plus de 20 ans
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-white/65">
                MatLoc Indus est une entreprise spécialisée dans la conception, la vente, l'installation et la
                maintenance de cabines de peinture sur-mesure et d'équipements de traitement de surface, basée
                à Sulniac, en Bretagne.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/55">
                Nous intervenons pour des carrosseries automobiles, des ateliers industriels et des entreprises
                de toutes tailles partout en France. Notre approche est simple : comprendre votre métier avant
                de vous proposer un équipement.
              </p>
            </div>
            <div className="flex items-center">
              <div className="grid grid-cols-2 gap-4 w-full">
                {[
                  { value: '20+', label: 'Ans d\'expertise' },
                  { value: '150+', label: 'Installations réalisées' },
                  { value: '2', label: 'Secteurs couverts' },
                  { value: '48h', label: 'Délai d\'intervention SAV' },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                    <div className="text-3xl font-black text-amber-400">{stat.value}</div>
                    <div className="mt-1 text-sm text-white/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold">Notre histoire</h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                MatLoc Indus est né d'une conviction simple : les professionnels de la carrosserie et de l'industrie
                méritent mieux que des équipements génériques mal adaptés à leurs réalités terrain. Trop souvent,
                les ateliers se retrouvaient avec des cabines sous-dimensionnées, énergivores, ou simplement mal
                installées faute d'un accompagnement technique sérieux.
              </p>
              <p>
                Dès le départ, nous avons fait le choix du sur-mesure systématique. Chaque projet commence par
                une visite sur site, une analyse des contraintes et une discussion avec les équipes qui vont
                travailler au quotidien avec l'équipement. C'est cette approche qui nous a permis de bâtir
                une réputation solide en Bretagne et au-delà.
              </p>
              <p>
                Aujourd'hui, MatLoc Indus accompagne des carrosseries indépendantes comme des groupes multi-sites,
                des menuiseries artisanales comme des métalleries industrielles. Ce qui ne change pas, c'est
                notre engagement : une réponse dans les 24h, une étude sérieuse, et une installation soignée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface">
        <div className="container-site">
          <h2 className="mb-10 text-3xl font-bold">Nos valeurs</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} className="rounded-xl border border-border bg-white p-7">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-midnight">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white">Basés en Bretagne, actifs partout en France</h2>
              <p className="mt-4 text-base leading-relaxed text-white/65">
                Notre siège est à Sulniac, dans le Morbihan. Depuis là, nous intervenons sur l'ensemble du
                territoire français. Nos techniciens se déplacent pour les études, les installations et le SAV.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 text-white/70">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                  <div>
                    <p className="font-medium text-white">Sulniac, Morbihan (56)</p>
                    <p className="text-sm">Bretagne, France</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="h-5 w-5 shrink-0 text-amber-400" />
                  <a href="mailto:contact@matlocindus.fr" className="hover:text-white transition-colors">
                    contact@matlocindus.fr
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="h-5 w-5 shrink-0 text-amber-400" />
                  <a href="tel:+33XXXXXXXXX" className="hover:text-white transition-colors">
                    +33 (0)X XX XX XX XX
                  </a>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href={`${base}/contact`}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-7 py-3 font-semibold text-white shadow-amber transition-all hover:bg-amber-400 hover:-translate-y-0.5"
                >
                  Nous contacter <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 h-64 lg:h-auto flex items-center justify-center">
              <p className="text-white/30 text-sm">Carte Google Maps intégrée ici</p>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  )
}
