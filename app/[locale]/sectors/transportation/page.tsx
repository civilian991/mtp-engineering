import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Plane, CheckCircle, ArrowRight, Train, Ship, Car } from 'lucide-react'
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
    title: isRTL ? 'قطاع النقل | MTP Engineering' : 'Transportation Sector | MTP Engineering',
    description: isRTL
      ? 'خدمات هندسية متخصصة للمطارات والموانئ والسكك الحديدية والطرق السريعة'
      : 'Specialized engineering services for airports, seaports, railways, and highways',
  }
}

export default async function TransportationSectorPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: Plane,
      title: isRTL ? 'المطارات' : 'Airports',
      description: isRTL
        ? 'تصميم وتطوير البنية التحتية للمطارات الحديثة'
        : 'Design and development of modern airport infrastructure',
      features: [
        isRTL ? 'مدارج الطائرات' : 'Runways and taxiways',
        isRTL ? 'محطات الركاب' : 'Terminal buildings',
        isRTL ? 'أنظمة الملاحة' : 'Navigation systems',
        isRTL ? 'مرافق الصيانة' : 'Maintenance facilities',
      ],
    },
    {
      icon: Ship,
      title: isRTL ? 'الموانئ البحرية' : 'Seaports',
      description: isRTL
        ? 'تطوير الموانئ ومرافق الشحن البحري'
        : 'Development of ports and maritime cargo facilities',
      features: [
        isRTL ? 'أرصفة الشحن' : 'Cargo terminals',
        isRTL ? 'محطات الحاويات' : 'Container terminals',
        isRTL ? 'المرافق اللوجستية' : 'Logistics facilities',
        isRTL ? 'أنظمة المناولة' : 'Handling systems',
      ],
    },
    {
      icon: Train,
      title: isRTL ? 'السكك الحديدية' : 'Railways',
      description: isRTL
        ? 'أنظمة السكك الحديدية والمترو والنقل السريع'
        : 'Railway, metro, and rapid transit systems',
      features: [
        isRTL ? 'خطوط السكك الحديدية' : 'Railway tracks',
        isRTL ? 'المحطات' : 'Stations',
        isRTL ? 'أنظمة الإشارات' : 'Signaling systems',
        isRTL ? 'مراكز الصيانة' : 'Maintenance centers',
      ],
    },
    {
      icon: Car,
      title: isRTL ? 'الطرق السريعة' : 'Highways',
      description: isRTL
        ? 'شبكات الطرق السريعة والجسور والأنفاق'
        : 'Highway networks, bridges, and tunnels',
      features: [
        isRTL ? 'الطرق السريعة' : 'Expressways',
        isRTL ? 'التقاطعات' : 'Interchanges',
        isRTL ? 'الجسور والأنفاق' : 'Bridges and tunnels',
        isRTL ? 'أنظمة المرور الذكية' : 'Smart traffic systems',
      ],
    },
  ]

  const keyProjects = [
    {
      name: isRTL ? 'مطار الملك عبدالعزيز الدولي' : 'King Abdulaziz International Airport',
      type: isRTL ? 'مطار' : 'Airport',
      location: isRTL ? 'جدة' : 'Jeddah',
      value: '$2.8B',
    },
    {
      name: isRTL ? 'قطار الحرمين السريع' : 'Haramain High-Speed Railway',
      type: isRTL ? 'سكة حديد' : 'Railway',
      location: isRTL ? 'مكة - المدينة' : 'Makkah - Madinah',
      value: '$16B',
    },
    {
      name: isRTL ? 'ميناء الملك عبدالله' : 'King Abdullah Port',
      type: isRTL ? 'ميناء' : 'Seaport',
      location: isRTL ? 'رابغ' : 'Rabigh',
      value: '$5.2B',
    },
    {
      name: isRTL ? 'مترو الرياض' : 'Riyadh Metro',
      type: isRTL ? 'مترو' : 'Metro',
      location: isRTL ? 'الرياض' : 'Riyadh',
      value: '$23B',
    },
  ]

  const stats = [
    { value: '15+', label: isRTL ? 'مطار' : 'Airports' },
    { value: '8+', label: isRTL ? 'موانئ' : 'Seaports' },
    { value: '2000+', label: isRTL ? 'كم سكك حديدية' : 'KM Railways' },
    { value: '50,000+', label: isRTL ? 'كم طرق' : 'KM Highways' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600/10 to-blue-600/10" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-sky-600/10 rounded-2xl">
                <Plane className="h-16 w-16 text-sky-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'قطاع النقل' : 'Transportation Sector'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'بناء شبكات النقل التي تربط المملكة وتدفع النمو الاقتصادي'
                : 'Building transportation networks that connect the Kingdom and drive economic growth'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'خدماتنا في قطاع النقل' : 'Our Transportation Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="h-full">
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-sky-600/10 rounded-xl">
                        <Icon className="h-10 w-10 text-sky-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-center text-sm">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-sky-600 mt-0.5 mr-2 flex-shrink-0" />
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
            {isRTL ? 'مشاريع النقل الرئيسية' : 'Major Transportation Projects'}
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
                  <p className="text-2xl font-bold text-sky-600">
                    {project.value}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-sky-600">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sky-100">{stat.label}</div>
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
              ? 'نبني مستقبل النقل في المملكة'
              : 'Building the Future of Transportation in the Kingdom'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'دعنا نساعدك في تطوير مشاريع النقل الحيوية'
              : 'Let us help you develop vital transportation projects'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button as="span" size="lg" className="bg-sky-600 hover:bg-sky-700">
                {isRTL ? 'ابدأ مشروعك' : 'Start Your Project'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button as="span" variant="outline" size="lg">
                {isRTL ? 'مشاريع النقل' : 'Transportation Projects'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}