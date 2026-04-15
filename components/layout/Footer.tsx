import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react'

export default async function Footer() {
  const locale = await getLocale()
  const t = await getTranslations('footer')
  const tn = await getTranslations('nav')
  const base = `/${locale}`
  const year = new Date().getFullYear()

  return (
    <footer className="bg-midnight text-white">
      {/* Main footer */}
      <div className="container-site py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="inline-flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tight">
                MatLoc<span className="text-amber-500">.</span>
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-white/50">
                Indus
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {t('tagline')}
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>{t('address')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-amber-500" />
                <a
                  href="mailto:contact@matlocindus.fr"
                  className="transition-colors hover:text-white"
                >
                  contact@matlocindus.fr
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-amber-500" />
                <a
                  href="tel:+33XXXXXXXXX"
                  className="transition-colors hover:text-white"
                >
                  +33 (0)X XX XX XX XX
                </a>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t('solutions')}
            </h3>
            <ul className="space-y-2">
              {[
                { key: 'solutions_booths', href: `${base}/solutions/cabines-de-peinture` },
                { key: 'solutions_labs', href: `${base}/solutions/laboratoires-de-peinture` },
                { key: 'solutions_prep', href: `${base}/solutions/aires-de-preparation` },
                { key: 'solutions_energy', href: `${base}/solutions/gain-energetique` },
                { key: 'solutions_rental', href: `${base}/solutions/location` },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Secteurs + Services */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t('sectors')}
            </h3>
            <ul className="mb-6 space-y-2">
              {[
                { key: 'sector_auto', href: `${base}/secteurs/automobile-carrosserie` },
                { key: 'sector_industry', href: `${base}/secteurs/industrie` },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Services
            </h3>
            <ul className="space-y-2">
              {[
                { key: 'services_sales', href: `${base}/services/conseil-vente` },
                { key: 'services_install', href: `${base}/services/montage-installation` },
                { key: 'services_maintenance', href: `${base}/services/maintenance-controle` },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + CTA */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              {t('company')}
            </h3>
            <ul className="space-y-2">
              {[
                { label: tn('realizations'), href: `${base}/realisations` },
                { label: tn('about'), href: `${base}/a-propos` },
                { label: tn('contact'), href: `${base}/contact` },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* CTA block */}
            <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Un projet en tête ?</p>
              <p className="mt-1 text-xs text-white/60">
                Réponse sous 24h · Étude gratuite
              </p>
              <Link
                href={`${base}/devis`}
                className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-400"
              >
                Demander un devis
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-xs text-white/40">
            {t('copyright', { year })}
          </p>
          <div className="flex gap-4">
            <Link
              href={`${base}/mentions-legales`}
              className="text-xs text-white/40 transition-colors hover:text-white/70"
            >
              {t('legal')}
            </Link>
            <Link
              href={`${base}/plan-du-site`}
              className="text-xs text-white/40 transition-colors hover:text-white/70"
            >
              {t('sitemap')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
