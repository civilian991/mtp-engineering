'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { Locale } from '@/lib/i18n'

interface HeaderProps {
  locale: Locale
  dictionary: any
}

export default function Header({ locale, dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: dictionary.navigation.home, href: `/${locale}` },
    { name: dictionary.navigation.about, href: `/${locale}/about` },
    { name: dictionary.navigation.services, href: `/${locale}/services` },
    { name: dictionary.navigation.projects, href: `/${locale}/projects` },
    { name: dictionary.navigation.sectors || (locale === 'ar' ? 'القطاعات' : 'Sectors'), href: `/${locale}/sectors` },
    { name: dictionary.navigation.careers, href: `/${locale}/careers` },
    { name: dictionary.navigation.contact, href: `/${locale}/contact` },
  ]

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-primary-100 sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex-shrink-0 flex items-center group">
              <img
                src="/images/mtp-logo-professional.png"
                alt="MTP Engineering"
                className="h-20 w-auto object-contain py-2"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-primary-700 hover:text-accent-600 px-3 py-2 text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <LanguageSwitcher currentLocale={locale} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 rtl:mr-4 rtl:ml-0 inline-flex items-center justify-center p-2 rounded-md text-secondary-600 hover:text-primary-600 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-secondary-200 pb-3 pt-2">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-secondary-600 hover:text-primary-600 hover:bg-secondary-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}