import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Locale } from '@/lib/i18n'

interface HeroSectionProps {
  locale: Locale
  dictionary: any
}

export default function HeroSection({ locale, dictionary }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 min-h-[700px] flex items-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-24 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="h1 mb-6 animate-fade-in">
            {dictionary.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-primary-600 mb-10 animate-slide-up max-w-3xl mx-auto">
            {dictionary.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link href={`/${locale}/projects`}>
              <Button size="lg" className="w-full sm:w-auto group">
                {dictionary.hero.cta}
                <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 h-5 w-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {dictionary.navigation.contact}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
            <div className="text-center group hover:transform hover:-translate-y-1 transition-transform">
              <div className="text-4xl font-bold text-accent-600 mb-2">44+</div>
              <div className="caption">
                {locale === 'ar' ? 'سنوات خبرة' : 'Years Experience'}
              </div>
            </div>
            <div className="text-center group hover:transform hover:-translate-y-1 transition-transform">
              <div className="text-4xl font-bold text-accent-600 mb-2">100+</div>
              <div className="caption">
                {locale === 'ar' ? 'مشروع منجز' : 'Projects Completed'}
              </div>
            </div>
            <div className="text-center group hover:transform hover:-translate-y-1 transition-transform">
              <div className="text-4xl font-bold text-accent-600 mb-2">180</div>
              <div className="caption">
                {locale === 'ar' ? 'موظف محترف' : 'Professional Staff'}
              </div>
            </div>
            <div className="text-center group hover:transform hover:-translate-y-1 transition-transform">
              <div className="text-4xl font-bold text-accent-600 mb-2">500M+</div>
              <div className="caption">
                {locale === 'ar' ? 'ريال قيمة المشاريع' : 'SAR Project Value'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}