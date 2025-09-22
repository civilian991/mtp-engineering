import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Droplets, Waves, Filter, Home, Gauge, Wrench, ArrowRight, CheckCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Link from 'next/link'
import Button from '@/components/ui/Button'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isRTL = locale === 'ar'

  return {
    title: isRTL ? 'الأعمال الصحية | MTP Engineering' : 'Plumbing Systems | MTP Engineering',
    description: isRTL
      ? 'أنظمة المياه والصرف الصحي، معالجة المياه، أنظمة الري والخزانات'
      : 'Water supply, drainage, water treatment, irrigation systems, and tanks',
  }
}

export default async function PlumbingServicesPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: <Droplets className="h-8 w-8" />,
      title: isRTL ? 'شبكات المياه النظيفة' : 'Clean Water Networks',
      description: isRTL
        ? 'تصميم وتنفيذ شبكات توزيع المياه النظيفة للمباني'
        : 'Design and implementation of clean water distribution networks for buildings',
    },
    {
      icon: <Waves className="h-8 w-8" />,
      title: isRTL ? 'أنظمة الصرف الصحي' : 'Drainage Systems',
      description: isRTL
        ? 'شبكات صرف صحي متطورة وأنظمة معالجة المياه العادمة'
        : 'Advanced sewage networks and wastewater treatment systems',
    },
    {
      icon: <Filter className="h-8 w-8" />,
      title: isRTL ? 'معالجة المياه' : 'Water Treatment',
      description: isRTL
        ? 'محطات معالجة المياه وأنظمة التنقية والتحلية'
        : 'Water treatment plants, purification and desalination systems',
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: isRTL ? 'خزانات المياه' : 'Water Tanks',
      description: isRTL
        ? 'تركيب وصيانة خزانات المياه الأرضية والعلوية'
        : 'Installation and maintenance of ground and overhead water tanks',
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: isRTL ? 'أنظمة الضخ' : 'Pumping Systems',
      description: isRTL
        ? 'محطات الضخ وأنظمة رفع المياه للمباني العالية'
        : 'Pumping stations and water lifting systems for high-rise buildings',
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: isRTL ? 'أنظمة الري' : 'Irrigation Systems',
      description: isRTL
        ? 'أنظمة ري حديثة للحدائق والمناطق الخضراء'
        : 'Modern irrigation systems for gardens and green areas',
    },
  ]

  const features = [
    isRTL ? 'استخدام مواد عالية الجودة ومعتمدة' : 'Use of high-quality certified materials',
    isRTL ? 'تصميم يضمن كفاءة استخدام المياه' : 'Design ensuring water use efficiency',
    isRTL ? 'أنظمة حماية من التسربات' : 'Leak protection systems',
    isRTL ? 'حلول صديقة للبيئة' : 'Eco-friendly solutions',
    isRTL ? 'صيانة دورية وخدمة طوارئ' : 'Regular maintenance and emergency service',
    isRTL ? 'التزام بمعايير الصحة العامة' : 'Compliance with public health standards',
  ]

  const projects = [
    {
      title: isRTL ? 'مجمع سكني فاخر' : 'Luxury Residential Complex',
      scope: isRTL ? '200 وحدة' : '200 Units',
      services: isRTL ? 'شبكات مياه وصرف متكاملة' : 'Complete Water & Drainage Networks',
    },
    {
      title: isRTL ? 'محطة معالجة مياه' : 'Water Treatment Plant',
      scope: isRTL ? '10,000 م³/يوم' : '10,000 m³/day',
      services: isRTL ? 'معالجة وتنقية المياه' : 'Water Treatment & Purification',
    },
    {
      title: isRTL ? 'منتجع سياحي' : 'Tourist Resort',
      scope: isRTL ? '50 هكتار' : '50 Hectares',
      services: isRTL ? 'أنظمة ري وحمامات سباحة' : 'Irrigation & Swimming Pool Systems',
    },
  ]

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-800 to-secondary-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-transparent"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            <div className="flex items-center mb-6">
              <Droplets className="h-12 w-12 text-primary-400 mr-4 rtl:ml-4 rtl:mr-0" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {isRTL ? 'الأعمال الصحية' : 'Plumbing Systems'}
              </h1>
            </div>
            <p className="text-xl text-primary-300 mb-8">
              {isRTL
                ? 'حلول متكاملة لأنظمة المياه والصرف الصحي'
                : 'Integrated solutions for water and drainage systems'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/contact`}>
                <Button as="span" size="lg" variant="primary">
                  {isRTL ? 'اطلب عرض سعر' : 'Request Quote'}
                  <ArrowRight className={`h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              <Link href={`/${locale}/projects`}>
                <Button as="span" size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary-700">
                  {isRTL ? 'مشاريعنا' : 'Our Projects'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              {isRTL ? 'خدماتنا في الأعمال الصحية' : 'Our Plumbing Services'}
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              {isRTL
                ? 'نقدم حلولاً شاملة لجميع احتياجات المياه والصرف الصحي'
                : 'We provide comprehensive solutions for all water and drainage needs'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <div className="text-primary-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{service.title}</h3>
                <p className="text-secondary-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                  {isRTL ? 'لماذا تختار خدماتنا؟' : 'Why Choose Our Services?'}
                </h2>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary-600 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
                      <span className="text-secondary-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-96 bg-secondary-100 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Droplets className="h-32 w-32 text-primary-600/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              {isRTL ? 'مشاريع حديثة' : 'Recent Projects'}
            </h2>
            <p className="text-lg text-secondary-600">
              {isRTL ? 'نماذج من مشاريع الأعمال الصحية المنجزة' : 'Examples of completed plumbing projects'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <Card key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">{project.title}</h3>
                <p className="text-sm text-secondary-600 mb-1">{project.scope}</p>
                <p className="text-sm text-primary-600">{project.services}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="py-16 bg-secondary-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">
              {isRTL ? 'المعايير والمواصفات' : 'Standards & Specifications'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['SASO', 'IPC', 'NSF', 'WHO Standards'].map((standard, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="font-semibold text-primary-600">{standard}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isRTL ? 'دعنا نساعدك في مشروعك' : 'Let Us Help With Your Project'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isRTL
                ? 'فريقنا جاهز لتقديم أفضل الحلول الصحية'
                : 'Our team is ready to provide the best plumbing solutions'}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button as="span" size="lg" variant="secondary">
                {isRTL ? 'تواصل معنا الآن' : 'Contact Us Now'}
                <ArrowRight className={`h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}