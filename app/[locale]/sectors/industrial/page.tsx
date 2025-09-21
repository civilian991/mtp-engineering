import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Factory, CheckCircle, ArrowRight, Warehouse, Cog, Package } from 'lucide-react'
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
    title: isRTL ? 'القطاع الصناعي | MTP Engineering' : 'Industrial Sector | MTP Engineering',
    description: isRTL
      ? 'خدمات هندسية متخصصة للمصانع والمستودعات والمدن الصناعية'
      : 'Specialized engineering services for manufacturing plants, warehouses, and industrial cities',
  }
}

export default async function IndustrialSectorPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: Factory,
      title: isRTL ? 'المصانع' : 'Manufacturing Plants',
      description: isRTL
        ? 'تصميم وبناء منشآت صناعية حديثة وفعالة'
        : 'Design and construction of modern and efficient manufacturing facilities',
      features: [
        isRTL ? 'مصانع الإنتاج' : 'Production plants',
        isRTL ? 'خطوط التجميع' : 'Assembly lines',
        isRTL ? 'مرافق المعالجة' : 'Processing facilities',
        isRTL ? 'غرف التحكم' : 'Control rooms',
      ],
    },
    {
      icon: Warehouse,
      title: isRTL ? 'المستودعات' : 'Warehouses',
      description: isRTL
        ? 'مرافق تخزين وتوزيع متقدمة وآلية'
        : 'Advanced and automated storage and distribution facilities',
      features: [
        isRTL ? 'مستودعات آلية' : 'Automated warehouses',
        isRTL ? 'مراكز التوزيع' : 'Distribution centers',
        isRTL ? 'التخزين البارد' : 'Cold storage',
        isRTL ? 'مرافق لوجستية' : 'Logistics facilities',
      ],
    },
    {
      icon: Cog,
      title: isRTL ? 'المدن الصناعية' : 'Industrial Cities',
      description: isRTL
        ? 'تطوير مدن صناعية متكاملة ومستدامة'
        : 'Development of integrated and sustainable industrial cities',
      features: [
        isRTL ? 'البنية التحتية' : 'Infrastructure',
        isRTL ? 'مرافق الخدمات' : 'Service facilities',
        isRTL ? 'شبكات المرافق' : 'Utility networks',
        isRTL ? 'مناطق الأعمال' : 'Business zones',
      ],
    },
    {
      icon: Package,
      title: isRTL ? 'مرافق خاصة' : 'Special Facilities',
      description: isRTL
        ? 'منشآت صناعية متخصصة للصناعات الدقيقة'
        : 'Specialized industrial facilities for precision industries',
      features: [
        isRTL ? 'غرف نظيفة' : 'Clean rooms',
        isRTL ? 'مختبرات البحث' : 'Research labs',
        isRTL ? 'مرافق الأدوية' : 'Pharmaceutical facilities',
        isRTL ? 'مصانع الأغذية' : 'Food processing plants',
      ],
    },
  ]

  const keyProjects = [
    {
      name: isRTL ? 'مدينة جدة الصناعية' : 'Jeddah Industrial City',
      type: isRTL ? 'مدينة صناعية' : 'Industrial City',
      location: isRTL ? 'جدة' : 'Jeddah',
      area: '12 كم²',
    },
    {
      name: isRTL ? 'مصنع البتروكيماويات' : 'Petrochemical Plant',
      type: isRTL ? 'مصنع' : 'Plant',
      location: isRTL ? 'ينبع' : 'Yanbu',
      area: '500,000 م²',
    },
    {
      name: isRTL ? 'مجمع المستودعات اللوجستية' : 'Logistics Hub Complex',
      type: isRTL ? 'مستودعات' : 'Warehouses',
      location: isRTL ? 'الدمام' : 'Dammam',
      area: '1,000,000 م²',
    },
    {
      name: isRTL ? 'مصنع الأغذية' : 'Food Processing Plant',
      type: isRTL ? 'مصنع أغذية' : 'Food Plant',
      location: isRTL ? 'القصيم' : 'Qassim',
      area: '200,000 م²',
    },
  ]

  const features = [
    {
      title: isRTL ? 'الأتمتة الصناعية' : 'Industrial Automation',
      description: isRTL
        ? 'دمج أحدث أنظمة الأتمتة والذكاء الاصطناعي'
        : 'Integration of latest automation and AI systems',
    },
    {
      title: isRTL ? 'السلامة الصناعية' : 'Industrial Safety',
      description: isRTL
        ? 'أعلى معايير السلامة والصحة المهنية'
        : 'Highest standards of safety and occupational health',
    },
    {
      title: isRTL ? 'الكفاءة الإنتاجية' : 'Production Efficiency',
      description: isRTL
        ? 'تصاميم تحقق أقصى كفاءة إنتاجية'
        : 'Designs that achieve maximum production efficiency',
    },
    {
      title: isRTL ? 'الاستدامة البيئية' : 'Environmental Sustainability',
      description: isRTL
        ? 'حلول صناعية صديقة للبيئة'
        : 'Eco-friendly industrial solutions',
    },
  ]

  const stats = [
    { value: '75+', label: isRTL ? 'مصنع' : 'Plants' },
    { value: '100+', label: isRTL ? 'مستودع' : 'Warehouses' },
    { value: '10+', label: isRTL ? 'مدينة صناعية' : 'Industrial Cities' },
    { value: '20M+', label: isRTL ? 'متر مربع' : 'Square Meters' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600/10 to-slate-600/10" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gray-600/10 rounded-2xl">
                <Factory className="h-16 w-16 text-gray-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'القطاع الصناعي' : 'Industrial Sector'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'تمكين النمو الصناعي من خلال بنية تحتية حديثة وفعالة'
                : 'Enabling industrial growth through modern and efficient infrastructure'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'خدماتنا الصناعية' : 'Our Industrial Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="h-full">
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-gray-600/10 rounded-xl">
                        <Icon className="h-10 w-10 text-gray-600" />
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
                          <CheckCircle className="h-4 w-4 text-gray-600 mt-0.5 mr-2 flex-shrink-0" />
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
            {isRTL ? 'مشاريع صناعية رئيسية' : 'Major Industrial Projects'}
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
                    <span className="text-lg font-semibold text-gray-600">
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
                <Cog className="h-12 w-12 text-gray-600 mx-auto mb-4" />
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
      <section className="py-16 px-4 bg-gray-700">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
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
              ? 'شريكك في التنمية الصناعية'
              : 'Your Partner in Industrial Development'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'نساعدك في بناء منشآت صناعية عالمية المستوى'
              : 'Helping you build world-class industrial facilities'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button as="span" size="lg" className="bg-gray-700 hover:bg-gray-800">
                {isRTL ? 'ابدأ مشروعك الصناعي' : 'Start Your Industrial Project'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button as="span" variant="outline" size="lg">
                {isRTL ? 'المشاريع الصناعية' : 'Industrial Projects'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}