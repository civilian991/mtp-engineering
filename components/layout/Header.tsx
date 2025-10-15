'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { Locale } from '@/lib/i18n'

interface HeaderProps {
  locale: Locale
  dictionary: any
}

export default function Header({ locale, dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

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
    <header className="bg-black text-white border-b border-muted-600 sticky top-0 z-20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex-shrink-0 flex items-center">
              <Image
                src="/images/mtp-logo.svg"
                alt="MTP Logo - Mansour for Trade & Projects"
                width={140}
                height={70}
                className="h-12 w-auto"
                priority
              />
              <span className="sr-only">Mansour for Trade & Projects</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse text-sm font-medium">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== `/${locale}` && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative hover:text-gold-500 transition-colors ${
                    isActive ? 'text-gold-500' : 'text-muted-200'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"></span>
                  )}
                </Link>
              )
            })}
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <LanguageSwitcher currentLocale={locale} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 rtl:mr-4 rtl:ml-0 inline-flex items-center justify-center p-2 rounded-md text-muted-200 hover:text-gold-500 hover:bg-muted-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gold-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-muted-600 pb-3 pt-2">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== `/${locale}` && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      isActive ? 'text-gold-500 bg-muted-900' : 'text-muted-200 hover:text-gold-500 hover:bg-muted-900'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}