import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Zap, Shield, Cpu, Battery, Building, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Image from 'next/image'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isRTL = locale === 'ar'

  return {
    title: isRTL ? 'الأعمال الكهربائية | MTP Engineering' : 'Electrical Works | MTP Engineering',
    description: isRTL
      ? 'خدمات كهربائية شاملة تشمل أنظمة الطاقة والتوزيع، الإنارة، وأنظمة الجهد المنخفض والعالي'
      : 'Comprehensive electrical services including power systems, distribution, lighting, and low/high voltage systems',
  }
}

export default async function ElectricalServicesPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: <Building className="h-8 w-8" />,
      title: isRTL ? 'أنظمة توزيع الطاقة' : 'Power Distribution Systems',
      description: isRTL
        ? 'تصميم وتنفيذ أنظمة توزيع الطاقة الكهربائية للمباني والمنشآت الصناعية'
        : 'Design and implementation of electrical power distribution systems for buildings and industrial facilities',
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: isRTL ? 'أنظمة الإنارة' : 'Lighting Systems',
      description: isRTL
        ? 'حلول إنارة داخلية وخارجية متطورة مع تقنيات توفير الطاقة'
        : 'Advanced indoor and outdoor lighting solutions with energy-saving technologies',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: isRTL ? 'أنظمة الحماية الكهربائية' : 'Electrical Protection Systems',
      description: isRTL
        ? 'أنظمة حماية متقدمة للمعدات والأنظمة الكهربائية'
        : 'Advanced protection systems for electrical equipment and systems',
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: isRTL ? 'لوحات التحكم' : 'Control Panels',
      description: isRTL
        ? 'تصميم وتصنيع لوحات التحكم والتوزيع الكهربائية'
        : 'Design and manufacturing of electrical control and distribution panels',
    },
    {
      icon: <Battery className="h-8 w-8" />,
      title: isRTL ? 'أنظمة الطاقة الاحتياطية' : 'Backup Power Systems',
      description: isRTL
        ? 'أنظمة UPS والمولدات الاحتياطية لضمان استمرارية الطاقة'
        : 'UPS systems and backup generators for power continuity',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: isRTL ? 'أنظمة الجهد العالي' : 'High Voltage Systems',
      description: isRTL
        ? 'تركيب وصيانة أنظمة الجهد العالي والمحطات الفرعية'
        : 'Installation and maintenance of high voltage systems and substations',
    },
  ]

  const features = [
    isRTL ? 'تصميم هندسي متقدم وفقًا للمعايير الدولية' : 'Advanced engineering design according to international standards',
    isRTL ? 'تنفيذ دقيق بأيدي خبراء متخصصين' : 'Precise implementation by specialized experts',
    isRTL ? 'استخدام معدات ومواد عالية الجودة' : 'Use of high-quality equipment and materials',
    isRTL ? 'الالتزام بمعايير السلامة والأمان' : 'Commitment to safety and security standards',
    isRTL ? 'خدمات صيانة وقائية وتصحيحية' : 'Preventive and corrective maintenance services',
    isRTL ? 'دعم فني على مدار الساعة' : '24/7 technical support',
  ]

  const projects = [
    {
      title: isRTL ? 'مجمع سكني راقي' : 'Luxury Residential Complex',
      scope: isRTL ? '50 وحدة سكنية' : '50 Residential Units',
      services: isRTL ? 'نظام كهربائي متكامل' : 'Complete Electrical System',
    },
    {
      title: isRTL ? 'مصنع للأغذية' : 'Food Processing Plant',
      scope: isRTL ? '10,000 متر مربع' : '10,000 Square Meters',
      services: isRTL ? 'أنظمة طاقة صناعية' : 'Industrial Power Systems',
    },
    {
      title: isRTL ? 'مستشفى متخصص' : 'Specialized Hospital',
      scope: isRTL ? '200 سرير' : '200 Beds',
      services: isRTL ? 'أنظمة طاقة حرجة' : 'Critical Power Systems',
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
              <Zap className="h-12 w-12 text-primary-400 mr-4 rtl:ml-4 rtl:mr-0" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {isRTL ? 'الأعمال الكهربائية' : 'Electrical Works'}
              </h1>
            </div>
            <p className="text-xl text-primary-300 mb-8">
              {isRTL
                ? 'حلول كهربائية متكاملة بخبرة تزيد عن 44 عامًا'
                : 'Integrated electrical solutions with over 44 years of experience'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/contact`}>
                <Button as="span" size="lg" variant="primary">
                  {isRTL ? 'احصل على عرض سعر' : 'Get a Quote'}
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
              {isRTL ? 'خدماتنا الكهربائية' : 'Our Electrical Services'}
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              {isRTL
                ? 'نقدم مجموعة شاملة من الخدمات الكهربائية لتلبية جميع احتياجات عملائنا'
                : 'We offer a comprehensive range of electrical services to meet all our clients needs'}
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
                  {isRTL ? 'لماذا تختار خدماتنا الكهربائية؟' : 'Why Choose Our Electrical Services?'}
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
                  <Zap className="h-32 w-32 text-primary-600/30" />
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
              {isRTL ? 'نماذج من مشاريعنا الكهربائية المنجزة' : 'Examples of our completed electrical projects'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <Card key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-primary-600" />
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
              {isRTL ? 'المعايير والشهادات' : 'Standards & Certifications'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['ISO 9001', 'IEC Standards', 'SASO', 'KAHRAMAA'].map((standard, index) => (
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
              {isRTL ? 'ابدأ مشروعك الكهربائي معنا' : 'Start Your Electrical Project With Us'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isRTL
                ? 'فريقنا من الخبراء جاهز لتقديم أفضل الحلول الكهربائية'
                : 'Our team of experts is ready to provide the best electrical solutions'}
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