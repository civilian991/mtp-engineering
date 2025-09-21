import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Droplets, CheckCircle, ArrowRight, Zap, Trash2, Wifi } from 'lucide-react'
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
    title: isRTL ? 'قطاع المرافق | MTP Engineering' : 'Utilities Sector | MTP Engineering',
    description: isRTL
      ? 'خدمات هندسية متخصصة لمحطات معالجة المياه والبنية التحتية للطاقة وإدارة النفايات'
      : 'Specialized engineering services for water treatment plants, power infrastructure, and waste management',
  }
}

export default async function UtilitiesSectorPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: Droplets,
      title: isRTL ? 'معالجة المياه' : 'Water Treatment',
      description: isRTL
        ? 'محطات معالجة المياه وشبكات التوزيع'
        : 'Water treatment plants and distribution networks',
      features: [
        isRTL ? 'محطات التحلية' : 'Desalination plants',
        isRTL ? 'محطات معالجة مياه الشرب' : 'Drinking water treatment',
        isRTL ? 'محطات معالجة مياه الصرف' : 'Wastewater treatment',
        isRTL ? 'شبكات توزيع المياه' : 'Water distribution networks',
      ],
    },
    {
      icon: Zap,
      title: isRTL ? 'البنية التحتية للطاقة' : 'Power Infrastructure',
      description: isRTL
        ? 'محطات توليد الطاقة وشبكات النقل والتوزيع'
        : 'Power generation plants and transmission networks',
      features: [
        isRTL ? 'محطات الطاقة' : 'Power plants',
        isRTL ? 'محطات التحويل' : 'Substations',
        isRTL ? 'شبكات النقل' : 'Transmission networks',
        isRTL ? 'الطاقة المتجددة' : 'Renewable energy',
      ],
    },
    {
      icon: Trash2,
      title: isRTL ? 'إدارة النفايات' : 'Waste Management',
      description: isRTL
        ? 'أنظمة متكاملة لجمع ومعالجة النفايات'
        : 'Integrated systems for waste collection and treatment',
      features: [
        isRTL ? 'محطات معالجة النفايات' : 'Waste treatment plants',
        isRTL ? 'مراكز إعادة التدوير' : 'Recycling centers',
        isRTL ? 'مدافن النفايات الصحية' : 'Sanitary landfills',
        isRTL ? 'تحويل النفايات لطاقة' : 'Waste-to-energy',
      ],
    },
    {
      icon: Wifi,
      title: isRTL ? 'البنية التحتية للاتصالات' : 'Telecommunications',
      description: isRTL
        ? 'شبكات الاتصالات والألياف الضوئية'
        : 'Communication networks and fiber optic infrastructure',
      features: [
        isRTL ? 'شبكات الألياف الضوئية' : 'Fiber optic networks',
        isRTL ? 'أبراج الاتصالات' : 'Telecom towers',
        isRTL ? 'مراكز البيانات' : 'Data centers',
        isRTL ? 'شبكات 5G' : '5G networks',
      ],
    },
  ]

  const keyProjects = [
    {
      name: isRTL ? 'محطة تحلية الجبيل' : 'Jubail Desalination Plant',
      type: isRTL ? 'تحلية المياه' : 'Water Desalination',
      location: isRTL ? 'الجبيل' : 'Jubail',
      capacity: '1M م³/يوم',
    },
    {
      name: isRTL ? 'محطة كهرباء الرياض' : 'Riyadh Power Station',
      type: isRTL ? 'توليد الطاقة' : 'Power Generation',
      location: isRTL ? 'الرياض' : 'Riyadh',
      capacity: '2,400 MW',
    },
    {
      name: isRTL ? 'مركز معالجة النفايات' : 'Waste Treatment Center',
      type: isRTL ? 'إدارة النفايات' : 'Waste Management',
      location: isRTL ? 'جدة' : 'Jeddah',
      capacity: '3,000 طن/يوم',
    },
    {
      name: isRTL ? 'شبكة الألياف الضوئية' : 'Fiber Optic Network',
      type: isRTL ? 'اتصالات' : 'Telecommunications',
      location: isRTL ? 'على مستوى المملكة' : 'Kingdom-wide',
      capacity: '50,000 كم',
    },
  ]

  const sustainability = [
    {
      title: isRTL ? 'الطاقة المتجددة' : 'Renewable Energy',
      description: isRTL
        ? 'دمج حلول الطاقة الشمسية وطاقة الرياح'
        : 'Integration of solar and wind energy solutions',
    },
    {
      title: isRTL ? 'كفاءة الموارد' : 'Resource Efficiency',
      description: isRTL
        ? 'تحسين استخدام الموارد وتقليل الهدر'
        : 'Optimizing resource use and reducing waste',
    },
    {
      title: isRTL ? 'الاقتصاد الدائري' : 'Circular Economy',
      description: isRTL
        ? 'تحويل النفايات إلى موارد قيمة'
        : 'Converting waste into valuable resources',
    },
    {
      title: isRTL ? 'التقنيات الذكية' : 'Smart Technologies',
      description: isRTL
        ? 'أنظمة مراقبة وتحكم ذكية للمرافق'
        : 'Smart monitoring and control systems for utilities',
    },
  ]

  const stats = [
    { value: '50+', label: isRTL ? 'محطة معالجة' : 'Treatment Plants' },
    { value: '100+', label: isRTL ? 'مشروع مرافق' : 'Utility Projects' },
    { value: '10GW', label: isRTL ? 'قدرة طاقة' : 'Power Capacity' },
    { value: '5M+', label: isRTL ? 'مستفيد' : 'Beneficiaries' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-teal-600/10" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-cyan-600/10 rounded-2xl">
                <Droplets className="h-16 w-16 text-cyan-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'قطاع المرافق' : 'Utilities Sector'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'توفير البنية التحتية الحيوية للمياه والطاقة والاتصالات'
                : 'Providing vital infrastructure for water, power, and communications'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'خدمات المرافق' : 'Utility Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="h-full">
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-cyan-600/10 rounded-xl">
                        <Icon className="h-10 w-10 text-cyan-600" />
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
                          <CheckCircle className="h-4 w-4 text-cyan-600 mt-0.5 mr-2 flex-shrink-0" />
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
            {isRTL ? 'مشاريع المرافق الرئيسية' : 'Major Utility Projects'}
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
                    <span className="text-lg font-semibold text-cyan-600">
                      {project.capacity}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'الاستدامة والابتكار' : 'Sustainability & Innovation'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sustainability.map((item, index) => (
              <div key={index} className="text-center">
                <Zap className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
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
      <section className="py-16 px-4 bg-cyan-600">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-cyan-100">{stat.label}</div>
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
              ? 'نبني البنية التحتية الأساسية للحياة'
              : 'Building Essential Infrastructure for Life'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'دعنا نساعدك في تطوير مشاريع المرافق الحيوية'
              : 'Let us help you develop vital utility projects'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button as="span" size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                {isRTL ? 'ابدأ مشروع المرافق' : 'Start Your Utility Project'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button as="span" variant="outline" size="lg">
                {isRTL ? 'مشاريع المرافق' : 'Utility Projects'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}