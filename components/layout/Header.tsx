'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import LocaleSwitcher from './LocaleSwitcher'
import { cn } from '@/lib/utils'

type NavItem = {
  labelKey: string
  href?: string
  children?: { labelKey: string; href: string }[]
}

export default function Header() {
  const t = useTranslations('nav')
  const tc = useTranslations('common')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const base = `/${locale}`

  const navItems: NavItem[] = [
    {
      labelKey: 'solutions',
      children: [
        { labelKey: 'solutions_booths', href: `${base}/solutions/cabines-de-peinture` },
        { labelKey: 'solutions_labs', href: `${base}/solutions/laboratoires-de-peinture` },
        { labelKey: 'solutions_prep', href: `${base}/solutions/aires-de-preparation` },
        { labelKey: 'solutions_energy', href: `${base}/solutions/gain-energetique` },
        { labelKey: 'solutions_rental', href: `${base}/solutions/location` },
      ],
    },
    {
      labelKey: 'sectors',
      children: [
        { labelKey: 'sector_auto', href: `${base}/secteurs/automobile-carrosserie` },
        { labelKey: 'sector_industry', href: `${base}/secteurs/industrie` },
      ],
    },
    {
      labelKey: 'services',
      children: [
        { labelKey: 'services_sales', href: `${base}/services/conseil-vente` },
        { labelKey: 'services_install', href: `${base}/services/montage-installation` },
        { labelKey: 'services_maintenance', href: `${base}/services/maintenance-controle` },
      ],
    },
    { labelKey: 'realizations', href: `${base}/realisations` },
    { labelKey: 'about', href: `${base}/a-propos` },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-white/95 shadow-sm backdrop-blur-sm'
          : 'bg-white/90 backdrop-blur-sm'
      )}
    >
      <div className="container-site">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[70px]">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex shrink-0 flex-col leading-none"
          >
            <span className="text-xl font-black tracking-tight text-midnight">
              MatLoc<span className="text-amber-500">.</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Indus
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.labelKey}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.labelKey)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-foreground">
                    {t(item.labelKey)}
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform duration-200',
                        openDropdown === item.labelKey && 'rotate-180'
                      )}
                    />
                  </button>
                  {openDropdown === item.labelKey && (
                    <div className="absolute left-0 top-full z-50 pt-1">
                      <div className="min-w-[200px] rounded-lg border border-border bg-white py-1.5 shadow-lg">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-surface hover:text-foreground"
                          >
                            {t(child.labelKey)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.labelKey}
                  href={item.href!}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-foreground"
                >
                  {t(item.labelKey)}
                </Link>
              )
            )}
          </nav>

          {/* Desktop right side */}
          <div className="hidden items-center gap-2 lg:flex">
            <LocaleSwitcher />
            <a
              href="tel:+33XXXXXXXXX"
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Nous appeler</span>
            </a>
            <Link
              href={`${base}/devis`}
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-1.5 text-sm font-semibold text-white shadow-amber transition-all hover:bg-amber-400 hover:shadow-amber-hover"
            >
              {tc('cta_quote')}
            </Link>
          </div>

          {/* Mobile right side */}
          <div className="flex items-center gap-2 lg:hidden">
            <LocaleSwitcher />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-surface" aria-label="Menu">
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex h-full flex-col">
                  <div className="border-b border-border p-4">
                    <span className="text-lg font-black tracking-tight text-midnight">
                      MatLoc<span className="text-amber-500">.</span>
                      <span className="ml-0.5 text-sm font-medium text-muted-foreground">Indus</span>
                    </span>
                  </div>
                  <nav className="flex-1 overflow-y-auto p-4">
                    {navItems.map((item) => (
                      <div key={item.labelKey} className="mb-1">
                        {item.children ? (
                          <div>
                            <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                              {t(item.labelKey)}
                            </p>
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-surface hover:text-foreground"
                              >
                                {t(child.labelKey)}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            href={item.href!}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-surface hover:text-foreground"
                          >
                            {t(item.labelKey)}
                          </Link>
                        )}
                      </div>
                    ))}
                  </nav>
                  <div className="border-t border-border p-4">
                    <Link
                      href={`${base}/devis`}
                      onClick={() => setMobileOpen(false)}
                      className="flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-amber transition-colors hover:bg-amber-400"
                    >
                      {tc('cta_quote')}
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
