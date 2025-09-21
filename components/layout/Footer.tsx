import Link from 'next/link'
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
    <footer className="bg-primary-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img
                src="/images/mtp-logo-white-bg.png"
                alt="MTP Engineering"
                className="h-20 w-auto object-contain mb-2"
              />
              <span className="text-sm font-medium text-primary-300">
                {locale === 'ar' ? 'منصور للتجارة والمشاريع' : 'Mansour Trade & Projects'}
              </span>
            </div>
            <p className="text-primary-300 mb-4">
              {locale === 'ar'
                ? 'حيث يلتقي الأداء بالجودة - مقاول كهروميكانيكي منذ 1980'
                : 'Where Performance Meets Quality - Electro-Mechanical Contractor Since 1980'}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a
                href="#"
                className="text-primary-400 hover:text-accent-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-primary-400 hover:text-accent-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              {locale === 'ar' ? 'الشركة' : 'Company'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-400 hover:text-accent-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{dictionary.navigation.services}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-400 hover:text-accent-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{dictionary.navigation.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-accent-500" />
                <span className="text-primary-300">
                  {locale === 'ar' ? 'جدة، المملكة العربية السعودية' : 'Jeddah, Saudi Arabia'}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-accent-500" />
                <span className="text-primary-300" dir="ltr">
                  +966 2 653 4098
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-accent-500" />
                <span className="text-primary-300">info@mtpksa.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-400 text-sm">
              © {currentYear} MTP Engineering Consultants. {dictionary.footer.rights}
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
              <Link
                href={`/${locale}/privacy`}
                className="text-primary-400 hover:text-accent-500 text-sm transition-colors"
              >
                {dictionary.footer.privacy}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-primary-400 hover:text-accent-500 text-sm transition-colors"
              >
                {dictionary.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}