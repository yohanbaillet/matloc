'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'
import { locales, localeNames, localeFlags } from '@/lib/i18n/config'
import type { Locale } from '@/lib/i18n/config'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (next: Locale) => {
    const segments = pathname.split('/')
    segments[1] = next
    router.push(segments.join('/') || `/${next}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground focus:outline-none">
        <Globe className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">{localeFlags[locale]} {locale.toUpperCase()}</span>
        <span className="sm:hidden">{localeFlags[locale]}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchLocale(l)}
            className={`cursor-pointer gap-2 ${l === locale ? 'font-semibold text-amber-600' : ''}`}
          >
            <span>{localeFlags[l]}</span>
            <span>{localeNames[l]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
