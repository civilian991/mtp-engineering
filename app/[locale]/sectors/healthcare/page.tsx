import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Heart, CheckCircle, ArrowRight, Hospital, Activity, Stethoscope } from 'lucide-react'
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
    title: isRTL ? 'قطاع الرعاية الصحية | MTP Engineering' : 'Healthcare Sector | MTP Engineering',
    description: isRTL
      ? 'خدمات هندسية متخصصة للمستشفيات والمدن الطبية والعيادات'
      : 'Specialized engineering services for hospitals, medical cities, and clinics',
  }
}

export default async function HealthcareSectorPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: Hospital,
      title: isRTL ? 'المستشفيات' : 'Hospitals',
      description: isRTL
        ? 'تصميم وبناء مستشفيات حديثة ومتطورة'
        : 'Design and construction of modern, advanced hospitals',
      features: [
        isRTL ? 'أقسام الطوارئ' : 'Emergency departments',
        isRTL ? 'غرف العمليات' : 'Operating theaters',
        isRTL ? 'وحدات العناية المركزة' : 'ICU units',
        isRTL ? 'أقسام الأشعة' : 'Radiology departments',
      ],
    },
    {
      icon: Activity,
      title: isRTL ? 'المدن الطبية' : 'Medical Cities',
      description: isRTL
        ? 'مجمعات طبية متكاملة بأحدث التقنيات'
        : 'Integrated medical complexes with latest technologies',
      features: [
        isRTL ? 'مراكز متخصصة' : 'Specialized centers',
        isRTL ? 'مرافق البحث' : 'Research facilities',
        isRTL ? 'مراكز التدريب' : 'Training centers',
        isRTL ? 'الخدمات المساندة' : 'Support services',
      ],
    },
    {
      icon: Stethoscope,
      title: isRTL ? 'العيادات' : 'Clinics',
      description: isRTL
        ? 'عيادات خارجية ومراكز رعاية صحية أولية'
        : 'Outpatient clinics and primary healthcare centers',
      features: [
        isRTL ? 'عيادات متخصصة' : 'Specialty clinics',
        isRTL ? 'مراكز التشخيص' : 'Diagnostic centers',
        isRTL ? 'عيادات الأسنان' : 'Dental clinics',
        isRTL ? 'مراكز إعادة التأهيل' : 'Rehabilitation centers',
      ],
    },
  ]

  const keyProjects = [
    {
      name: isRTL ? 'مدينة الملك فهد الطبية' : 'King Fahad Medical City',
      type: isRTL ? 'مدينة طبية' : 'Medical City',
      location: isRTL ? 'الرياض' : 'Riyadh',
      capacity: '1200 سرير / beds',
    },
    {
      name: isRTL ? 'مستشفى الملك فيصل التخصصي' : 'King Faisal Specialist Hospital',
      type: isRTL ? 'مستشفى' : 'Hospital',
      location: isRTL ? 'جدة' : 'Jeddah',
      capacity: '800 سرير / beds',
    },
    {
      name: isRTL ? 'مركز الأمير سلطان للقلب' : 'Prince Sultan Cardiac Center',
      type: isRTL ? 'مركز متخصص' : 'Specialty Center',
      location: isRTL ? 'القصيم' : 'Qassim',
      capacity: '300 سرير / beds',
    },
  ]

  const expertise = [
    {
      title: isRTL ? 'معايير الرعاية الصحية' : 'Healthcare Standards',
      description: isRTL
        ? 'الامتثال لمعايير JCI وCBAHI الدولية'
        : 'Compliance with JCI and CBAHI international standards',
    },
    {
      title: isRTL ? 'التقنيات الطبية' : 'Medical Technologies',
      description: isRTL
        ? 'دمج أحدث التقنيات الطبية والذكاء الاصطناعي'
        : 'Integration of latest medical technologies and AI',
    },
    {
      title: isRTL ? 'مكافحة العدوى' : 'Infection Control',
      description: isRTL
        ? 'أنظمة متقدمة لمكافحة العدوى والتعقيم'
        : 'Advanced infection control and sterilization systems',
    },
    {
      title: isRTL ? 'الاستدامة الصحية' : 'Healthcare Sustainability',
      description: isRTL
        ? 'مباني صحية صديقة للبيئة وموفرة للطاقة'
        : 'Eco-friendly and energy-efficient healthcare buildings',
    },
  ]

  const stats = [
    { value: '50+', label: isRTL ? 'مستشفى' : 'Hospitals' },
    { value: '200+', label: isRTL ? 'عيادة' : 'Clinics' },
    { value: '25,000+', label: isRTL ? 'سرير' : 'Beds' },
    { value: '15+', label: isRTL ? 'مدينة طبية' : 'Medical Cities' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-pink-600/10" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-600/10 rounded-2xl">
                <Heart className="h-16 w-16 text-red-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'قطاع الرعاية الصحية' : 'Healthcare Sector'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'بناء مرافق صحية متطورة تعزز جودة الحياة وتدعم رؤية المملكة الصحية'
                : "Building advanced healthcare facilities that enhance quality of life and support the Kingdom's health vision"}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'خدماتنا الصحية' : 'Our Healthcare Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="h-full">
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-red-600/10 rounded-xl">
                        <Icon className="h-10 w-10 text-red-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
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
            {isRTL ? 'مشاريع صحية رئيسية' : 'Major Healthcare Projects'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {project.type}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    📍 {project.location}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-semibold text-red-600">
                      {project.capacity}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'خبراتنا المتخصصة' : 'Our Specialized Expertise'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <div key={index} className="text-center">
                <Activity className="h-12 w-12 text-red-600 mx-auto mb-4" />
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
      <section className="py-16 px-4 bg-red-600">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-red-100">{stat.label}</div>
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
              ? 'نبني مستقبل الرعاية الصحية'
              : 'Building the Future of Healthcare'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'دعنا نساعدك في إنشاء مرافق صحية عالمية المستوى'
              : 'Let us help you create world-class healthcare facilities'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button as="span" size="lg" className="bg-red-600 hover:bg-red-700">
                {isRTL ? 'ابدأ مشروعك الصحي' : 'Start Your Healthcare Project'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button as="span" variant="outline" size="lg">
                {isRTL ? 'مشاريع الرعاية الصحية' : 'Healthcare Projects'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}