import { getTranslations } from 'next-intl/server'
import { Quote } from 'lucide-react'
import SectionHeader from '@/components/shared/SectionHeader'

// Placeholder data — will be replaced by Sanity CMS
const testimonials = [
  {
    quote:
      "MatLoc Indus a su comprendre nos contraintes d'atelier dès la première visite. L'installation s'est faite en 3 jours, dans les délais. La cabine tourne impeccablement depuis 2 ans.",
    author: 'Laurent M.',
    role: 'Directeur technique',
    company: 'Carrosserie du Sud-Ouest',
    sector: 'Automobile',
  },
  {
    quote:
      "On cherchait une solution énergétiquement efficace pour notre atelier de traitement bois. Les panneaux endothermiques ont réduit notre consommation de 40%. Le ROI était là dès la première année.",
    author: 'Sylvie T.',
    role: 'Responsable production',
    company: 'Menuiseries Atlantique',
    sector: 'Industrie',
  },
  {
    quote:
      "Très bonne réactivité du SAV. Un problème sur la ventilation un lundi matin, un technicien chez nous le mardi. C'est exactement ce qu'on attend d'un partenaire.",
    author: 'Karim B.',
    role: "Chef d'atelier",
    company: 'Groupe Renault Bretagne',
    sector: 'Automobile',
  },
]

export default async function TestimonialsSection() {
  const t = await getTranslations('home')

  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <SectionHeader
          eyebrow="Témoignages"
          title={t('testimonials_title')}
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-xl border border-border bg-white p-7 transition-all duration-300 card-lift hover:border-amber-200"
            >
              {/* Accent top bar */}
              <div className="absolute inset-x-0 top-0 h-0.5 w-0 rounded-t-xl bg-amber-500 transition-all duration-500 group-hover:w-full" />

              <Quote className="mb-5 h-8 w-8 text-amber-200" />

              <p className="text-sm leading-relaxed text-foreground/80">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                {/* Initials avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-midnight text-sm font-bold text-white">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.author}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.role} · {item.company}
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {item.sector}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
