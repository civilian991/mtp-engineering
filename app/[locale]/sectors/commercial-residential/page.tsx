import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Building2, CheckCircle, ArrowRight, ShoppingBag, Home, Hotel } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isRTL = locale === 'ar'

  return {
    title: isRTL ? 'القطاع التجاري والسكني | MTP Engineering' : 'Commercial & Residential Sector | MTP Engineering',
    description: isRTL
      ? 'خدمات هندسية متخصصة للمباني المكتبية ومراكز التسوق والمجمعات السكنية'
      : 'Specialized engineering services for office buildings, shopping centers, and residential complexes',
  }
}

export default async function CommercialResidentialPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: Building2,
      title: isRTL ? 'المباني المكتبية' : 'Office Buildings',
      description: isRTL
        ? 'مباني مكتبية حديثة بتصاميم مبتكرة وفعالة'
        : 'Modern office buildings with innovative and efficient designs',
      features: [
        isRTL ? 'أبراج المكاتب' : 'Office towers',
        isRTL ? 'مجمعات الأعمال' : 'Business complexes',
        isRTL ? 'مساحات العمل المشتركة' : 'Co-working spaces',
        isRTL ? 'مراكز المؤتمرات' : 'Conference centers',
      ],
    },
    {
      icon: ShoppingBag,
      title: isRTL ? 'مراكز التسوق' : 'Shopping Centers',
      description: isRTL
        ? 'مراكز تسوق ووجهات تجارية متكاملة'
        : 'Shopping malls and integrated retail destinations',
      features: [
        isRTL ? 'المولات الكبرى' : 'Mega malls',
        isRTL ? 'مراكز التسوق المحلية' : 'Community centers',
        isRTL ? 'الأسواق التجارية' : 'Retail markets',
        isRTL ? 'مناطق الترفيه' : 'Entertainment zones',
      ],
    },
    {
      icon: Home,
      title: isRTL ? 'المجمعات السكنية' : 'Residential Complexes',
      description: isRTL
        ? 'مجتمعات سكنية متكاملة بأعلى معايير الجودة'
        : 'Integrated residential communities with highest quality standards',
      features: [
        isRTL ? 'الفلل السكنية' : 'Residential villas',
        isRTL ? 'الشقق الفاخرة' : 'Luxury apartments',
        isRTL ? 'المجمعات المسورة' : 'Gated communities',
        isRTL ? 'الإسكان الميسر' : 'Affordable housing',
      ],
    },
    {
      icon: Hotel,
      title: isRTL ? 'التطويرات متعددة الاستخدام' : 'Mixed-Use Developments',
      description: isRTL
        ? 'مشاريع متكاملة تجمع بين السكن والتجارة والترفيه'
        : 'Integrated projects combining residential, commercial, and entertainment',
      features: [
        isRTL ? 'الأبراج متعددة الاستخدام' : 'Mixed-use towers',
        isRTL ? 'المجتمعات الحضرية' : 'Urban communities',
        isRTL ? 'مراكز نمط الحياة' : 'Lifestyle centers',
        isRTL ? 'الواجهات البحرية' : 'Waterfront developments',
      ],
    },
  ]

  const keyProjects = [
    {
      name: isRTL ? 'برج المملكة' : 'Kingdom Tower',
      type: isRTL ? 'برج تجاري' : 'Commercial Tower',
      location: isRTL ? 'الرياض' : 'Riyadh',
      area: '300,000 م²',
    },
    {
      name: isRTL ? 'الرياض بارك' : 'Riyadh Park Mall',
      type: isRTL ? 'مركز تسوق' : 'Shopping Mall',
      location: isRTL ? 'الرياض' : 'Riyadh',
      area: '150,000 م²',
    },
    {
      name: isRTL ? 'مجمع الواحة السكني' : 'Al Waha Residential',
      type: isRTL ? 'مجمع سكني' : 'Residential Complex',
      location: isRTL ? 'جدة' : 'Jeddah',
      area: '500,000 م²',
    },
    {
      name: isRTL ? 'مشروع البوليفارد' : 'Boulevard Project',
      type: isRTL ? 'متعدد الاستخدام' : 'Mixed-Use',
      location: isRTL ? 'الرياض' : 'Riyadh',
      area: '1,000,000 م²',
    },
  ]

  const features = [
    {
      title: isRTL ? 'التصميم المستدام' : 'Sustainable Design',
      description: isRTL
        ? 'مباني صديقة للبيئة بشهادات LEED وBREEAM'
        : 'Eco-friendly buildings with LEED and BREEAM certifications',
    },
    {
      title: isRTL ? 'المباني الذكية' : 'Smart Buildings',
      description: isRTL
        ? 'دمج أحدث تقنيات المباني الذكية وإنترنت الأشياء'
        : 'Integration of latest smart building and IoT technologies',
    },
    {
      title: isRTL ? 'التصميم الحضري' : 'Urban Design',
      description: isRTL
        ? 'تخطيط حضري متكامل يعزز جودة الحياة'
        : 'Integrated urban planning that enhances quality of life',
    },
    {
      title: isRTL ? 'القيمة الاستثمارية' : 'Investment Value',
      description: isRTL
        ? 'تصاميم تحقق أعلى عائد على الاستثمار'
        : 'Designs that achieve highest return on investment',
    },
  ]

  const stats = [
    { value: '200+', label: isRTL ? 'مشروع تجاري' : 'Commercial Projects' },
    { value: '150+', label: isRTL ? 'مجمع سكني' : 'Residential Complexes' },
    { value: '10M+', label: isRTL ? 'متر مربع' : 'Square Meters' },
    { value: '50+', label: isRTL ? 'مشروع متعدد الاستخدام' : 'Mixed-Use Projects' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-amber-600/10 rounded-2xl">
                <Building2 className="h-16 w-16 text-amber-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'القطاع التجاري والسكني' : 'Commercial & Residential Sector'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'نبني مساحات تجارية وسكنية تثري الحياة الحضرية'
                : 'Building commercial and residential spaces that enrich urban life'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'خدماتنا المتخصصة' : 'Our Specialized Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="h-full">
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-amber-600/10 rounded-xl">
                        <Icon className="h-10 w-10 text-amber-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-center text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-center text-sm">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Key Projects */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'مشاريع رئيسية' : 'Key Projects'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {project.type}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    📍 {project.location}
                  </p>
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-semibold text-amber-600">
                      {project.area}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'مميزاتنا' : 'Our Advantages'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
              <div key={index} className="text-center">
                <Home className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-amber-600">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-amber-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {isRTL
              ? 'نحول رؤيتك إلى واقع'
              : 'Transforming Your Vision into Reality'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'شريكك في تطوير مشاريع تجارية وسكنية استثنائية'
              : 'Your partner in developing exceptional commercial and residential projects'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                {isRTL ? 'ناقش مشروعك' : 'Discuss Your Project'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button variant="outline" size="lg">
                {isRTL ? 'معرض المشاريع' : 'Project Gallery'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}