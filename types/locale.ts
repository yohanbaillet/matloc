import { locales } from '@/lib/i18n/config'

export type Locale = (typeof locales)[number]

export type LocaleString = Partial<Record<Locale, string>>
export type LocaleText = Partial<Record<Locale, string>>
export type LocaleSlug = Partial<Record<Locale, { current: string }>>
