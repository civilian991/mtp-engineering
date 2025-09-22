import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Gauge, Cpu, Network, Smartphone, Database, Monitor, ArrowRight, CheckCircle } from 'lucide-react'
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
    title: isRTL ? 'أنظمة التحكم والأتمتة | MTP Engineering' : 'Control & Automation | MTP Engineering',
    description: isRTL
      ? 'أنظمة BMS، التحكم الآلي، أنظمة SCADA والتكامل الذكي للمباني'
      : 'BMS systems, automation control, SCADA systems, and smart building integration',
  }
}

export default async function AutomationServicesPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: <Gauge className="h-8 w-8" />,
      title: isRTL ? 'أنظمة إدارة المباني BMS' : 'Building Management Systems',
      description: isRTL
        ? 'أنظمة متكاملة للتحكم في جميع أنظمة المبنى من منصة واحدة'
        : 'Integrated systems to control all building systems from one platform',
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: isRTL ? 'أنظمة SCADA' : 'SCADA Systems',
      description: isRTL
        ? 'أنظمة التحكم الإشرافي وجمع البيانات للمنشآت الصناعية'
        : 'Supervisory control and data acquisition systems for industrial facilities',
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: isRTL ? 'تكامل أنظمة IoT' : 'IoT Systems Integration',
      description: isRTL
        ? 'ربط وتكامل أجهزة إنترنت الأشياء لتحسين الكفاءة'
        : 'Connecting and integrating IoT devices to improve efficiency',
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: isRTL ? 'أنظمة التحكم الصناعي' : 'Industrial Control Systems',
      description: isRTL
        ? 'أنظمة PLC وDCS للتحكم في العمليات الصناعية'
        : 'PLC and DCS systems for industrial process control',
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: isRTL ? 'تطبيقات الهاتف الذكي' : 'Smart Mobile Applications',
      description: isRTL
        ? 'تطبيقات للتحكم والمراقبة عن بُعد'
        : 'Applications for remote control and monitoring',
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: isRTL ? 'أنظمة تحليل البيانات' : 'Data Analytics Systems',
      description: isRTL
        ? 'تحليل البيانات والتقارير الذكية لتحسين الأداء'
        : 'Data analysis and smart reports to improve performance',
    },
  ]

  const features = [
    isRTL ? 'توفير الطاقة بنسبة تصل إلى 30%' : 'Energy savings up to 30%',
    isRTL ? 'تحكم مركزي من أي مكان' : 'Central control from anywhere',
    isRTL ? 'تقارير وتحليلات فورية' : 'Real-time reports and analytics',
    isRTL ? 'تنبيهات ذكية للصيانة الوقائية' : 'Smart alerts for preventive maintenance',
    isRTL ? 'تكامل سلس مع الأنظمة الحالية' : 'Seamless integration with existing systems',
    isRTL ? 'واجهات سهلة الاستخدام' : 'User-friendly interfaces',
  ]

  const solutions = [
    {
      title: isRTL ? 'المباني الذكية' : 'Smart Buildings',
      description: isRTL ? 'حلول متكاملة للمباني التجارية والإدارية' : 'Integrated solutions for commercial and administrative buildings',
      features: [
        isRTL ? 'إضاءة ذكية' : 'Smart lighting',
        isRTL ? 'تحكم في التكييف' : 'HVAC control',
        isRTL ? 'أنظمة الأمان' : 'Security systems',
      ],
    },
    {
      title: isRTL ? 'المصانع الذكية' : 'Smart Factories',
      description: isRTL ? 'أتمتة العمليات الصناعية وخطوط الإنتاج' : 'Industrial process and production line automation',
      features: [
        isRTL ? 'مراقبة الإنتاج' : 'Production monitoring',
        isRTL ? 'التحكم في الجودة' : 'Quality control',
        isRTL ? 'إدارة المخزون' : 'Inventory management',
      ],
    },
    {
      title: isRTL ? 'البنية التحتية' : 'Infrastructure',
      description: isRTL ? 'أنظمة تحكم لمحطات المياه والطاقة' : 'Control systems for water and power plants',
      features: [
        isRTL ? 'مراقبة الشبكات' : 'Network monitoring',
        isRTL ? 'إدارة التوزيع' : 'Distribution management',
        isRTL ? 'تحسين الأداء' : 'Performance optimization',
      ],
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
              <Gauge className="h-12 w-12 text-primary-400 mr-4 rtl:ml-4 rtl:mr-0" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {isRTL ? 'أنظمة التحكم والأتمتة' : 'Control & Automation'}
              </h1>
            </div>
            <p className="text-xl text-primary-300 mb-8">
              {isRTL
                ? 'حلول ذكية لمباني ومنشآت المستقبل'
                : 'Smart solutions for buildings and facilities of the future'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/contact`}>
                <Button as="span" size="lg" variant="primary">
                  {isRTL ? 'ابدأ التحول الرقمي' : 'Start Digital Transformation'}
                  <ArrowRight className={`h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              <Link href={`/${locale}/projects`}>
                <Button as="span" size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary-700">
                  {isRTL ? 'مشاريعنا الذكية' : 'Our Smart Projects'}
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
              {isRTL ? 'خدمات التحكم والأتمتة' : 'Control & Automation Services'}
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              {isRTL
                ? 'نقدم حلولاً متقدمة للتحكم الآلي وإدارة المنشآت بكفاءة عالية'
                : 'We provide advanced solutions for automatic control and efficient facility management'}
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
                  {isRTL ? 'فوائد الأتمتة الذكية' : 'Smart Automation Benefits'}
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
                  <Cpu className="h-32 w-32 text-primary-600/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              {isRTL ? 'حلولنا المتخصصة' : 'Our Specialized Solutions'}
            </h2>
            <p className="text-lg text-secondary-600">
              {isRTL ? 'حلول مخصصة لكل قطاع' : 'Customized solutions for every sector'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Network className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{solution.title}</h3>
                <p className="text-secondary-600 mb-4 text-sm">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-secondary-600 flex items-center">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-2 rtl:ml-2 rtl:mr-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Partners Section */}
      <section className="py-16 bg-secondary-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8">
              {isRTL ? 'شركاء التقنية' : 'Technology Partners'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Siemens', 'Schneider', 'Honeywell', 'Johnson Controls'].map((partner, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <p className="font-semibold text-primary-600">{partner}</p>
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
              {isRTL ? 'حوّل منشأتك إلى منشأة ذكية' : 'Transform Your Facility into a Smart Facility'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isRTL
                ? 'اكتشف كيف يمكن للأتمتة تحسين كفاءة عملياتك'
                : 'Discover how automation can improve your operational efficiency'}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button as="span" size="lg" variant="secondary">
                {isRTL ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                <ArrowRight className={`h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}