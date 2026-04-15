'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Phone, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function StickyCtaBanner() {
  const [visible, setVisible] = useState(false)
  const locale = useLocale()
  const tc = useTranslations('common')

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white/95 p-3 backdrop-blur-sm shadow-lg transition-transform duration-300 lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="flex gap-2">
        <a
          href="tel:+33XXXXXXXXX"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
        >
          <Phone className="h-4 w-4" />
          Appeler
        </a>
        <Link
          href={`/${locale}/devis`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-sm font-semibold text-white shadow-amber transition-colors hover:bg-amber-400"
        >
          <FileText className="h-4 w-4" />
          {tc('cta_quote')}
        </Link>
      </div>
    </div>
  )
}
