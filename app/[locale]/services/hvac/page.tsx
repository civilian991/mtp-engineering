import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Wind, Thermometer, Fan, Snowflake, Building, Gauge, ArrowRight, CheckCircle } from 'lucide-react'
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
    title: isRTL ? 'أنظمة التكييف والتهوية | MTP Engineering' : 'HVAC Systems | MTP Engineering',
    description: isRTL
      ? 'أنظمة التكييف المركزي، التهوية، التبريد الصناعي والتحكم البيئي'
      : 'Central air conditioning, ventilation, industrial cooling, and environmental control',
  }
}

export default async function HVACServicesPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: <Thermometer className="h-8 w-8" />,
      title: isRTL ? 'أنظمة التكييف المركزي' : 'Central Air Conditioning',
      description: isRTL
        ? 'تصميم وتنفيذ أنظمة التكييف المركزي للمباني التجارية والسكنية'
        : 'Design and implementation of central AC systems for commercial and residential buildings',
    },
    {
      icon: <Fan className="h-8 w-8" />,
      title: isRTL ? 'أنظمة التهوية' : 'Ventilation Systems',
      description: isRTL
        ? 'أنظمة تهوية متطورة لضمان جودة الهواء الداخلي'
        : 'Advanced ventilation systems to ensure indoor air quality',
    },
    {
      icon: <Snowflake className="h-8 w-8" />,
      title: isRTL ? 'غرف التبريد' : 'Cold Rooms',
      description: isRTL
        ? 'تصميم وتنفيذ غرف التبريد والتجميد للمنشآت الصناعية'
        : 'Design and implementation of cold rooms and freezers for industrial facilities',
    },
    {
      icon: <Wind className="h-8 w-8" />,
      title: isRTL ? 'أنظمة معالجة الهواء' : 'Air Handling Units',
      description: isRTL
        ? 'وحدات معالجة الهواء وأنظمة التحكم في الرطوبة'
        : 'Air handling units and humidity control systems',
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: isRTL ? 'أنظمة التحكم الآلي' : 'Building Automation',
      description: isRTL
        ? 'أنظمة BMS للتحكم الذكي في أنظمة التكييف'
        : 'BMS systems for intelligent HVAC control',
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: isRTL ? 'أنظمة VRF' : 'VRF Systems',
      description: isRTL
        ? 'أنظمة التدفق المتغير للمبردات للكفاءة القصوى'
        : 'Variable Refrigerant Flow systems for maximum efficiency',
    },
  ]

  const features = [
    isRTL ? 'تصميم موفر للطاقة وفقًا لمعايير ASHRAE' : 'Energy-efficient design according to ASHRAE standards',
    isRTL ? 'استخدام تقنيات التبريد الصديقة للبيئة' : 'Use of eco-friendly cooling technologies',
    isRTL ? 'أنظمة تحكم ذكية لتحسين الأداء' : 'Smart control systems for performance optimization',
    isRTL ? 'صيانة دورية للحفاظ على الكفاءة' : 'Regular maintenance to maintain efficiency',
    isRTL ? 'ضمان جودة الهواء الداخلي' : 'Indoor air quality assurance',
    isRTL ? 'حلول مخصصة لكل مشروع' : 'Customized solutions for each project',
  ]

  const projects = [
    {
      title: isRTL ? 'مركز تجاري' : 'Shopping Mall',
      scope: isRTL ? '25,000 متر مربع' : '25,000 Square Meters',
      services: isRTL ? 'نظام تكييف مركزي متكامل' : 'Complete Central AC System',
    },
    {
      title: isRTL ? 'مستودع تبريد' : 'Cold Storage Warehouse',
      scope: isRTL ? '5,000 متر مربع' : '5,000 Square Meters',
      services: isRTL ? 'غرف تبريد وتجميد' : 'Cold and Freezer Rooms',
    },
    {
      title: isRTL ? 'برج مكاتب' : 'Office Tower',
      scope: isRTL ? '30 طابق' : '30 Floors',
      services: isRTL ? 'أنظمة VRF وBMS' : 'VRF and BMS Systems',
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
              <Wind className="h-12 w-12 text-primary-400 mr-4 rtl:ml-4 rtl:mr-0" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {isRTL ? 'أنظمة التكييف والتهوية' : 'HVAC Systems'}
              </h1>
            </div>
            <p className="text-xl text-primary-300 mb-8">
              {isRTL
                ? 'حلول تكييف وتهوية متقدمة لبيئة مثالية'
                : 'Advanced HVAC solutions for an ideal environment'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/contact`}>
                <Button as="span" size="lg" variant="primary">
                  {isRTL ? 'احصل على استشارة' : 'Get Consultation'}
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
              {isRTL ? 'خدماتنا في التكييف والتهوية' : 'Our HVAC Services'}
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              {isRTL
                ? 'نقدم حلولاً متكاملة لأنظمة التكييف والتهوية بأحدث التقنيات'
                : 'We provide integrated HVAC solutions with the latest technologies'}
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
                  {isRTL ? 'مميزات خدماتنا' : 'Our Service Features'}
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
                  <Wind className="h-32 w-32 text-primary-600/30" />
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
              {isRTL ? 'نماذج من مشاريع التكييف المنجزة' : 'Examples of completed HVAC projects'}
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
              {isRTL ? 'المعايير المتبعة' : 'Standards We Follow'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['ASHRAE', 'SMACNA', 'ISO 14001', 'LEED'].map((standard, index) => (
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
              {isRTL ? 'احصل على نظام تكييف مثالي' : 'Get the Perfect HVAC System'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isRTL
                ? 'خبراؤنا جاهزون لتصميم أفضل حل لاحتياجاتك'
                : 'Our experts are ready to design the best solution for your needs'}
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