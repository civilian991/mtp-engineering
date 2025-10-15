import Link from 'next/link'
import Image from 'next/image'
import { Locale } from '@/lib/i18n'
import { Phone, Mail, MapPin, Linkedin, Twitter } from 'lucide-react'

interface FooterProps {
  locale: Locale
  dictionary: any
}

export default function Footer({ locale, dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: dictionary.navigation.about, href: `/${locale}/about` },
      { name: dictionary.navigation.services, href: `/${locale}/services` },
      { name: dictionary.navigation.projects, href: `/${locale}/projects` },
      { name: dictionary.navigation.careers, href: `/${locale}/careers` },
    ],
    services: [
      { name: dictionary.services.electrical, href: `/${locale}/services#electrical` },
      { name: dictionary.services.hvac, href: `/${locale}/services#hvac` },
      { name: dictionary.services.plumbing, href: `/${locale}/services#plumbing` },
      { name: dictionary.services.fire_fighting, href: `/${locale}/services#fire-fighting` },
    ],
  }

  return (
    <footer className="bg-black text-muted-300 border-t border-muted-600 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/mtp-logo.svg"
                alt="MTP Logo - Mansour for Trade & Projects"
                width={140}
                height={70}
                className="h-16 w-auto"
              />
            </div>
            <p className="text-sm">
              {locale === 'ar'
                ? 'مقاول كهروميكانيكي رائد منذ 1980'
                : 'Leading electro‑mechanical contractor since 1980.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-500 font-semibold mb-2">
              {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="text-sm space-y-1">
              <li>
                <Link href={`/${locale}/projects`} className="hover:text-gold-500 transition-colors">
                  {dictionary.navigation.projects}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-gold-500 transition-colors">
                  {dictionary.navigation.services}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/careers`} className="hover:text-gold-500 transition-colors">
                  {dictionary.navigation.careers}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-gold-500 transition-colors">
                  {dictionary.navigation.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gold-500 font-semibold mb-2">{dictionary.navigation.contact}</h4>
            <p className="text-sm">
              {locale === 'ar' ? 'المقر الرئيسي بجدة' : 'Jeddah Headquarters'}<br />
              {locale === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia'}
            </p>
            <p className="text-sm mt-2">
              {locale === 'ar' ? 'البريد الإلكتروني: ' : 'Email: '}
              <a href="mailto:info@mtp.com.sa" className="hover:text-gold-500">
                info@mtp.com.sa
              </a>
            </p>
            <p className="text-sm">
              {locale === 'ar' ? 'الهاتف: ' : 'Phone: '}
              <a href="tel:+96612345678" className="hover:text-gold-500" dir="ltr">
                +966 12 345 678
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-400">
          © {currentYear} {locale === 'ar' ? 'منصور للتجارة والمشاريع' : 'Mansour for Trade & Projects'}. {dictionary.footer.rights}
        </div>
      </div>
    </footer>
  )
}