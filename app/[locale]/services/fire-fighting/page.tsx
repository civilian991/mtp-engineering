import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Flame, AlertTriangle, Shield, Bell, Droplets, Radio, ArrowRight, CheckCircle } from 'lucide-react'
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
    title: isRTL ? 'أنظمة مكافحة الحريق | MTP Engineering' : 'Fire Fighting Systems | MTP Engineering',
    description: isRTL
      ? 'أنظمة الإطفاء، الإنذار، الرشاشات الآلية وأنظمة الحماية من الحرائق'
      : 'Fire suppression, alarm systems, sprinklers, and fire protection systems',
  }
}

export default async function FireFightingServicesPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: <Droplets className="h-8 w-8" />,
      title: isRTL ? 'أنظمة الرشاشات الآلية' : 'Automatic Sprinkler Systems',
      description: isRTL
        ? 'تصميم وتركيب أنظمة الرش الآلي للمباني والمنشآت'
        : 'Design and installation of automatic sprinkler systems for buildings and facilities',
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: isRTL ? 'أنظمة إنذار الحريق' : 'Fire Alarm Systems',
      description: isRTL
        ? 'أنظمة كشف وإنذار متطورة مع أجهزة استشعار ذكية'
        : 'Advanced detection and alarm systems with smart sensors',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: isRTL ? 'أنظمة الإطفاء بالغاز' : 'Gas Suppression Systems',
      description: isRTL
        ? 'أنظمة إطفاء بالغازات النظيفة لغرف الخوادم والمعدات الحساسة'
        : 'Clean agent suppression systems for server rooms and sensitive equipment',
    },
    {
      icon: <Flame className="h-8 w-8" />,
      title: isRTL ? 'أنظمة الإطفاء بالرغوة' : 'Foam Suppression Systems',
      description: isRTL
        ? 'أنظمة إطفاء بالرغوة للمنشآت البترولية والصناعية'
        : 'Foam suppression systems for petroleum and industrial facilities',
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: isRTL ? 'مضخات الحريق' : 'Fire Pumps',
      description: isRTL
        ? 'محطات ضخ مياه الإطفاء وشبكات التوزيع'
        : 'Fire water pumping stations and distribution networks',
    },
    {
      icon: <Radio className="h-8 w-8" />,
      title: isRTL ? 'أنظمة الاتصال الطارئ' : 'Emergency Communication',
      description: isRTL
        ? 'أنظمة اتصال وإخلاء صوتي للطوارئ'
        : 'Emergency communication and voice evacuation systems',
    },
  ]

  const features = [
    isRTL ? 'تصميم وفقًا لمعايير NFPA الدولية' : 'Design according to international NFPA standards',
    isRTL ? 'فريق مدرب ومعتمد في السلامة' : 'Trained and certified safety team',
    isRTL ? 'معدات معتمدة من الدفاع المدني' : 'Civil Defense approved equipment',
    isRTL ? 'صيانة دورية وفحص الأنظمة' : 'Regular maintenance and system inspection',
    isRTL ? 'خدمة طوارئ على مدار الساعة' : '24/7 emergency service',
    isRTL ? 'تدريب الموظفين على استخدام الأنظمة' : 'Staff training on system usage',
  ]

  const projects = [
    {
      title: isRTL ? 'مجمع تجاري كبير' : 'Large Shopping Complex',
      scope: isRTL ? '50,000 متر مربع' : '50,000 Square Meters',
      services: isRTL ? 'نظام إطفاء وإنذار متكامل' : 'Complete Fire Suppression & Alarm System',
    },
    {
      title: isRTL ? 'مركز بيانات' : 'Data Center',
      scope: isRTL ? '2,000 متر مربع' : '2,000 Square Meters',
      services: isRTL ? 'أنظمة إطفاء بالغاز النظيف' : 'Clean Agent Gas Suppression',
    },
    {
      title: isRTL ? 'مصنع بتروكيماويات' : 'Petrochemical Plant',
      scope: isRTL ? '15 هكتار' : '15 Hectares',
      services: isRTL ? 'أنظمة إطفاء بالرغوة والمياه' : 'Foam & Water Suppression Systems',
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
              <Flame className="h-12 w-12 text-primary-400 mr-4 rtl:ml-4 rtl:mr-0" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {isRTL ? 'أنظمة مكافحة الحريق' : 'Fire Fighting Systems'}
              </h1>
            </div>
            <p className="text-xl text-primary-300 mb-8">
              {isRTL
                ? 'حماية شاملة بأحدث أنظمة مكافحة الحرائق'
                : 'Complete protection with the latest fire fighting systems'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/contact`}>
                <Button as="span" size="lg" variant="primary">
                  {isRTL ? 'استشارة مجانية' : 'Free Consultation'}
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
              {isRTL ? 'خدماتنا في مكافحة الحريق' : 'Our Fire Fighting Services'}
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              {isRTL
                ? 'نوفر أنظمة حماية شاملة من الحرائق لجميع أنواع المنشآت'
                : 'We provide comprehensive fire protection systems for all types of facilities'}
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
                  {isRTL ? 'السلامة أولويتنا القصوى' : 'Safety is Our Top Priority'}
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
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className="h-32 w-32 text-red-600/30" />
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
              {isRTL ? 'نماذج من مشاريع أنظمة الحماية المنجزة' : 'Examples of completed protection system projects'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <Card key={index} className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-red-600" />
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
              {isRTL ? 'المعايير والاعتمادات' : 'Standards & Certifications'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['NFPA', 'FM Global', 'UL Listed', 'Civil Defense'].map((standard, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="font-semibold text-primary-600">{standard}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-red-700 to-red-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isRTL ? 'احم منشأتك من مخاطر الحريق' : 'Protect Your Facility from Fire Hazards'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isRTL
                ? 'خبراؤنا جاهزون لتصميم نظام حماية متكامل'
                : 'Our experts are ready to design a complete protection system'}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button as="span" size="lg" variant="secondary">
                {isRTL ? 'احصل على تقييم مجاني' : 'Get Free Assessment'}
                <ArrowRight className={`h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}