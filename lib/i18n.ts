export type Locale = 'en' | 'ar'

export const locales: Locale[] = ['en', 'ar']
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية'
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}