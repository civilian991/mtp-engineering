import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Wrench, Clock, Shield, Settings, Calendar, Phone, ArrowRight, CheckCircle } from 'lucide-react'
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
    title: isRTL ? 'الصيانة والتشغيل | MTP Engineering' : 'Maintenance & Operation | MTP Engineering',
    description: isRTL
      ? 'الصيانة الوقائية والتصحيحية، إدارة المرافق وخدمات التشغيل المتكاملة'
      : 'Preventive and corrective maintenance, facility management, and integrated operation services',
  }
}

export default async function MaintenanceServicesPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: isRTL ? 'الصيانة الوقائية' : 'Preventive Maintenance',
      description: isRTL
        ? 'برامج صيانة مجدولة للحفاظ على كفاءة الأنظمة'
        : 'Scheduled maintenance programs to maintain system efficiency',
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: isRTL ? 'الصيانة التصحيحية' : 'Corrective Maintenance',
      description: isRTL
        ? 'إصلاحات سريعة وفعالة للأعطال الطارئة'
        : 'Quick and effective repairs for emergency breakdowns',
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: isRTL ? 'إدارة المرافق' : 'Facility Management',
      description: isRTL
        ? 'إدارة شاملة لجميع أنظمة ومرافق المبنى'
        : 'Comprehensive management of all building systems and facilities',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: isRTL ? 'خدمة 24/7' : '24/7 Service',
      description: isRTL
        ? 'دعم فني على مدار الساعة طوال أيام الأسبوع'
        : 'Technical support around the clock, seven days a week',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: isRTL ? 'عقود الصيانة السنوية' : 'Annual Maintenance Contracts',
      description: isRTL
        ? 'عقود صيانة شاملة مع ضمانات الأداء'
        : 'Comprehensive maintenance contracts with performance guarantees',
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: isRTL ? 'مركز الاتصال' : 'Call Center',
      description: isRTL
        ? 'مركز اتصال متخصص لاستقبال طلبات الصيانة'
        : 'Specialized call center for receiving maintenance requests',
    },
  ]

  const features = [
    isRTL ? 'فريق فني مدرب ومؤهل' : 'Trained and qualified technical team',
    isRTL ? 'قطع غيار أصلية مضمونة' : 'Guaranteed genuine spare parts',
    isRTL ? 'أوقات استجابة سريعة' : 'Fast response times',
    isRTL ? 'تقارير دورية مفصلة' : 'Detailed periodic reports',
    isRTL ? 'استخدام أحدث التقنيات' : 'Use of latest technologies',
    isRTL ? 'أسعار تنافسية وشفافة' : 'Competitive and transparent pricing',
  ]

  const packages = [
    {
      title: isRTL ? 'الباقة البرونزية' : 'Bronze Package',
      features: [
        isRTL ? 'صيانة ربع سنوية' : 'Quarterly maintenance',
        isRTL ? 'دعم في أوقات العمل' : 'Business hours support',
        isRTL ? 'تقارير أساسية' : 'Basic reports',
      ],
    },
    {
      title: isRTL ? 'الباقة الفضية' : 'Silver Package',
      features: [
        isRTL ? 'صيانة شهرية' : 'Monthly maintenance',
        isRTL ? 'دعم ممتد 16 ساعة' : '16-hour extended support',
        isRTL ? 'تقارير تفصيلية' : 'Detailed reports',
      ],
    },
    {
      title: isRTL ? 'الباقة الذهبية' : 'Gold Package',
      features: [
        isRTL ? 'صيانة أسبوعية' : 'Weekly maintenance',
        isRTL ? 'دعم 24/7' : '24/7 support',
        isRTL ? 'تقارير شاملة + تحليلات' : 'Comprehensive reports + analytics',
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
              <Wrench className="h-12 w-12 text-primary-400 mr-4 rtl:ml-4 rtl:mr-0" />
              <h1 className="text-4xl md:text-5xl font-bold">
                {isRTL ? 'الصيانة والتشغيل' : 'Maintenance & Operation'}
              </h1>
            </div>
            <p className="text-xl text-primary-300 mb-8">
              {isRTL
                ? 'شريكك الموثوق في صيانة وتشغيل جميع الأنظمة'
                : 'Your trusted partner in maintaining and operating all systems'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${locale}/contact`}>
                <Button as="span" size="lg" variant="primary">
                  {isRTL ? 'اطلب عقد صيانة' : 'Request Maintenance Contract'}
                  <ArrowRight className={`h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              <Link href="#packages">
                <Button as="span" size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary-700">
                  {isRTL ? 'عرض الباقات' : 'View Packages'}
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
              {isRTL ? 'خدمات الصيانة والتشغيل' : 'Maintenance & Operation Services'}
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              {isRTL
                ? 'نقدم خدمات صيانة شاملة لضمان استمرارية عمل أنظمتك'
                : 'We provide comprehensive maintenance services to ensure your systems continuity'}
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
                  {isRTL ? 'لماذا تختار صيانتنا؟' : 'Why Choose Our Maintenance?'}
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
                  <Settings className="h-32 w-32 text-primary-600/30 animate-spin-slow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              {isRTL ? 'باقات الصيانة' : 'Maintenance Packages'}
            </h2>
            <p className="text-lg text-secondary-600">
              {isRTL ? 'اختر الباقة المناسبة لاحتياجاتك' : 'Choose the package that suits your needs'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-full h-2 mb-6 rounded-full ${
                  index === 0 ? 'bg-orange-400' : index === 1 ? 'bg-gray-400' : 'bg-yellow-400'
                }`}></div>
                <h3 className="text-xl font-bold text-secondary-900 mb-4">{pkg.title}</h3>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-secondary-600">
                      <CheckCircle className="h-5 w-5 text-primary-600 mr-2 rtl:ml-2 rtl:mr-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/${locale}/contact`}>
                  <Button as="span" variant={index === 2 ? 'primary' : 'outline'} size="sm" className="w-full">
                    {isRTL ? 'اطلب الآن' : 'Order Now'}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-secondary-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-primary-600">500+</p>
                <p className="text-sm text-secondary-600 mt-2">
                  {isRTL ? 'عقد صيانة نشط' : 'Active Maintenance Contracts'}
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-600">98%</p>
                <p className="text-sm text-secondary-600 mt-2">
                  {isRTL ? 'رضا العملاء' : 'Customer Satisfaction'}
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-600">24/7</p>
                <p className="text-sm text-secondary-600 mt-2">
                  {isRTL ? 'دعم متواصل' : 'Continuous Support'}
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary-600">1hr</p>
                <p className="text-sm text-secondary-600 mt-2">
                  {isRTL ? 'وقت الاستجابة' : 'Response Time'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isRTL ? 'ضمان استمرارية أعمالك' : 'Ensure Your Business Continuity'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isRTL
                ? 'دع خبراءنا يتولون صيانة أنظمتك بكفاءة عالية'
                : 'Let our experts maintain your systems with high efficiency'}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button as="span" size="lg" variant="secondary">
                {isRTL ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
                <ArrowRight className={`h-5 w-5 ml-2 rtl:mr-2 rtl:ml-0 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}