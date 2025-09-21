import Link from 'next/link'
import { Zap, Wind, Droplet, Flame, Wifi, ClipboardCheck } from 'lucide-react'
import Card, { CardContent, CardTitle } from '@/components/ui/Card'
import { Locale } from '@/lib/i18n'

interface ServicesSectionProps {
  locale: Locale
  dictionary: any
}

const serviceIcons = {
  electrical: Zap,
  hvac: Wind,
  plumbing: Droplet,
  fire_fighting: Flame,
  low_current: Wifi,
  project_management: ClipboardCheck,
}

const serviceDescriptions = {
  electrical: {
    en: 'H.V. & M.V. switchgears, power stations, complete electrical installations',
    ar: 'المفاتيح الكهربائية عالية ومتوسطة الجهد، محطات الطاقة، التركيبات الكهربائية الكاملة'
  },
  hvac: {
    en: 'Complete heating, ventilating and air conditioning systems',
    ar: 'أنظمة التدفئة والتهوية والتكييف الكاملة'
  },
  plumbing: {
    en: 'Sanitary fixtures, water supply, drainage and sewer systems',
    ar: 'الأدوات الصحية، إمدادات المياه، أنظمة الصرف الصحي'
  },
  fire_fighting: {
    en: 'Sprinkler systems, fire alarms, CO2 & FM200 systems',
    ar: 'أنظمة الرشاشات، إنذار الحريق، أنظمة CO2 و FM200'
  },
  low_current: {
    en: 'CCTV, audio/video, telephone PABX, data networks',
    ar: 'المراقبة، الصوت والفيديو، أنظمة الهاتف، شبكات البيانات'
  },
  project_management: {
    en: 'Complete MEP project management and supervision',
    ar: 'إدارة وإشراف كامل على مشاريع MEP'
  }
}

export default function ServicesSection({ locale, dictionary }: ServicesSectionProps) {
  const services = [
    { key: 'electrical', name: dictionary.services.electrical },
    { key: 'hvac', name: dictionary.services.hvac },
    { key: 'plumbing', name: dictionary.services.plumbing },
    { key: 'fire_fighting', name: dictionary.services.fire_fighting },
    { key: 'low_current', name: dictionary.services.low_current },
    { key: 'project_management', name: dictionary.services.project_management },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            {dictionary.services.title}
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'خدمات المقاولات الكهروميكانيكية الكاملة - مقاول من الدرجة الخاصة منذ 1980'
              : 'Complete Electro-Mechanical Contracting Services - Special Grade Contractor Since 1980'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = serviceIcons[service.key as keyof typeof serviceIcons]
            return (
              <Link key={service.key} href={`/${locale}/services#${service.key}`}>
                <Card variant="bordered" className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                    <div className="ml-4 rtl:mr-4 rtl:ml-0">
                      <CardTitle className="text-lg mb-2 group-hover:text-primary-600 transition-colors">
                        {service.name}
                      </CardTitle>
                      <CardContent className="text-sm">
                        {serviceDescriptions[service.key as keyof typeof serviceDescriptions]?.[locale] ||
                         (locale === 'ar'
                          ? 'حلول متخصصة ومبتكرة تلبي أعلى معايير الجودة'
                          : 'Specialized and innovative solutions meeting the highest quality standards')}
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href={`/${locale}/services`}>
            <Button variant="primary" size="lg">
              {locale === 'ar' ? 'جميع الخدمات' : 'View All Services'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Import Button component
import Button from '@/components/ui/Button'