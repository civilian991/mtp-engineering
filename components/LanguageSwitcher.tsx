'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Locale, localeNames } from '@/lib/i18n'

export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (newLocale: Locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const oppositeLocale: Locale = currentLocale === 'en' ? 'ar' : 'en'

  return (
    <button
      onClick={() => switchLanguage(oppositeLocale)}
      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
      aria-label={`Switch to ${localeNames[oppositeLocale]}`}
    >
      {localeNames[oppositeLocale]}
    </button>
  )
}