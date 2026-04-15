export const locales = ['fr', 'en', 'de', 'es', 'nl', 'zh'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  nl: 'Nederlands',
  zh: '中文',
}

export const localeFlags: Record<Locale, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
  de: '🇩🇪',
  es: '🇪🇸',
  nl: '🇳🇱',
  zh: '🇨🇳',
}

// RTL locales (none currently, but ready for Arabic if needed)
export const rtlLocales: Locale[] = []

// CJK locales — need special typography treatment
export const cjkLocales: Locale[] = ['zh']
