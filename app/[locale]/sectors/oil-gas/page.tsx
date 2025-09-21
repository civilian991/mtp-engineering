import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Fuel, CheckCircle, ArrowRight, Factory, Gauge, FlameKindling } from 'lucide-react'
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
    title: isRTL ? 'قطاع النفط والغاز | MTP Engineering' : 'Oil & Gas Sector | MTP Engineering',
    description: isRTL
      ? 'خدمات هندسية متخصصة لصناعة النفط والغاز والبتروكيماويات'
      : 'Specialized engineering services for oil, gas, and petrochemical industries',
  }
}

export default async function OilGasSectorPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: Factory,
      title: isRTL ? 'مصافي التكرير' : 'Refineries',
      description: isRTL
        ? 'تصميم وتطوير وصيانة مصافي النفط'
        : 'Design, development, and maintenance of oil refineries',
      features: [
        isRTL ? 'وحدات التقطير' : 'Distillation units',
        isRTL ? 'وحدات التكسير' : 'Cracking units',
        isRTL ? 'أنظمة المعالجة' : 'Processing systems',
        isRTL ? 'خزانات التخزين' : 'Storage tanks',
      ],
    },
    {
      icon: Fuel,
      title: isRTL ? 'البنية التحتية للأنابيب' : 'Pipeline Infrastructure',
      description: isRTL
        ? 'تصميم وإنشاء شبكات خطوط الأنابيب'
        : 'Design and construction of pipeline networks',
      features: [
        isRTL ? 'خطوط النقل' : 'Transmission lines',
        isRTL ? 'محطات الضخ' : 'Pumping stations',
        isRTL ? 'أنظمة المراقبة' : 'Monitoring systems',
        isRTL ? 'صيانة الخطوط' : 'Pipeline maintenance',
      ],
    },
    {
      icon: FlameKindling,
      title: isRTL ? 'مرافق المعالجة' : 'Processing Facilities',
      description: isRTL
        ? 'مرافق معالجة الغاز والمنتجات البترولية'
        : 'Gas and petroleum product processing facilities',
      features: [
        isRTL ? 'وحدات فصل الغاز' : 'Gas separation units',
        isRTL ? 'معالجة المكثفات' : 'Condensate processing',
        isRTL ? 'أنظمة التبريد' : 'Cooling systems',
        isRTL ? 'معدات السلامة' : 'Safety equipment',
      ],
    },
  ]

  const keyClients = [
    { name: 'Saudi Aramco', projects: '75+' },
    { name: 'SABIC', projects: '45+' },
    { name: 'Petro Rabigh', projects: '30+' },
    { name: 'YASREF', projects: '20+' },
  ]

  const expertise = [
    {
      title: isRTL ? 'معايير السلامة الصارمة' : 'Strict Safety Standards',
      description: isRTL
        ? 'الالتزام بأعلى معايير السلامة الدولية في الصناعة'
        : 'Adherence to highest international safety standards in the industry',
    },
    {
      title: isRTL ? 'التقنيات المتقدمة' : 'Advanced Technologies',
      description: isRTL
        ? 'استخدام أحدث التقنيات في تصميم وتنفيذ المشاريع'
        : 'Using cutting-edge technologies in project design and execution',
    },
    {
      title: isRTL ? 'الخبرة المحلية' : 'Local Expertise',
      description: isRTL
        ? 'فهم عميق للسوق السعودي ومتطلباته الخاصة'
        : 'Deep understanding of Saudi market and its specific requirements',
    },
    {
      title: isRTL ? 'الاستدامة البيئية' : 'Environmental Sustainability',
      description: isRTL
        ? 'حلول صديقة للبيئة تقلل من الأثر البيئي'
        : 'Eco-friendly solutions that minimize environmental impact',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-orange-600/10 rounded-2xl">
                <Fuel className="h-16 w-16 text-orange-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'قطاع النفط والغاز' : 'Oil & Gas Sector'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'حلول هندسية متقدمة لصناعة الطاقة الحيوية في المملكة'
                : 'Advanced engineering solutions for the Kingdom\'s vital energy industry'}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="h-full">
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-orange-600/10 rounded-xl">
                        <Icon className="h-10 w-10 text-orange-600" />
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
                          <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" />
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

      {/* Key Clients */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'عملاؤنا الرئيسيون' : 'Our Key Clients'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {keyClients.map((client, index) => (
              <Card key={index} className="text-center">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {client.name}
                  </h3>
                  <p className="text-2xl font-bold text-orange-600">{client.projects}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isRTL ? 'مشاريع منجزة' : 'Projects Completed'}
                  </p>
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
            {isRTL ? 'مميزاتنا' : 'Our Advantages'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <div key={index} className="text-center">
                <Gauge className="h-12 w-12 text-orange-600 mx-auto mb-4" />
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
      <section className="py-16 px-4 bg-orange-600">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">170+</div>
              <div className="text-orange-100">{isRTL ? 'مشروع نفط وغاز' : 'Oil & Gas Projects'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">25+</div>
              <div className="text-orange-100">{isRTL ? 'مصفاة ومنشأة' : 'Refineries & Facilities'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">5000+</div>
              <div className="text-orange-100">{isRTL ? 'كم خطوط أنابيب' : 'KM of Pipelines'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-orange-100">{isRTL ? 'معايير السلامة' : 'Safety Standards'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {isRTL
              ? 'شريكك في مشاريع الطاقة'
              : 'Your Partner in Energy Projects'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'خبرة تمتد لأكثر من 40 عامًا في قطاع النفط والغاز'
              : 'Over 40 years of expertise in the oil and gas sector'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button as="span" size="lg" className="bg-orange-600 hover:bg-orange-700">
                {isRTL ? 'ناقش مشروعك' : 'Discuss Your Project'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button as="span" variant="outline" size="lg">
                {isRTL ? 'مشاريع النفط والغاز' : 'Oil & Gas Projects'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}