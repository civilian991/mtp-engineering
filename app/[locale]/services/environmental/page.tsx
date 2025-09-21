import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Leaf, CheckCircle, ArrowRight, TreePine, Droplets, Recycle } from 'lucide-react'
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
    title: isRTL ? 'الهندسة البيئية | MTP Engineering' : 'Environmental Engineering | MTP Engineering',
    description: isRTL
      ? 'خدمات الهندسة البيئية الشاملة - تقييمات الأثر البيئي وحلول الاستدامة ومعالجة المياه'
      : 'Comprehensive environmental engineering services - impact assessments, sustainability solutions, and water treatment',
  }
}

export default async function EnvironmentalPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      title: isRTL ? 'تقييمات الأثر البيئي' : 'Environmental Impact Assessments',
      description: isRTL
        ? 'تقييم شامل للآثار البيئية للمشاريع لضمان الامتثال والاستدامة'
        : 'Comprehensive evaluation of project environmental effects to ensure compliance and sustainability',
      features: [
        isRTL ? 'دراسات خط الأساس' : 'Baseline studies',
        isRTL ? 'تحليل التأثيرات' : 'Impact analysis',
        isRTL ? 'خطط التخفيف' : 'Mitigation plans',
        isRTL ? 'مراقبة الامتثال' : 'Compliance monitoring',
      ],
    },
    {
      title: isRTL ? 'استشارات الاستدامة' : 'Sustainability Consulting',
      description: isRTL
        ? 'تطوير استراتيجيات مستدامة تحقق التوازن بين النمو الاقتصادي والمسؤولية البيئية'
        : 'Developing sustainable strategies that balance economic growth with environmental responsibility',
      features: [
        isRTL ? 'استراتيجيات الاستدامة' : 'Sustainability strategies',
        isRTL ? 'تقليل البصمة الكربونية' : 'Carbon footprint reduction',
        isRTL ? 'تقارير ESG' : 'ESG reporting',
        isRTL ? 'الاقتصاد الدائري' : 'Circular economy',
      ],
    },
    {
      title: isRTL ? 'حلول معالجة المياه' : 'Water Treatment Solutions',
      description: isRTL
        ? 'أنظمة معالجة مياه متقدمة للاستخدامات البلدية والصناعية'
        : 'Advanced water treatment systems for municipal and industrial applications',
      features: [
        isRTL ? 'معالجة مياه الشرب' : 'Drinking water treatment',
        isRTL ? 'معالجة مياه الصرف' : 'Wastewater treatment',
        isRTL ? 'إعادة استخدام المياه' : 'Water reuse systems',
        isRTL ? 'تحلية المياه' : 'Desalination',
      ],
    },
    {
      title: isRTL ? 'أنظمة إدارة النفايات' : 'Waste Management Systems',
      description: isRTL
        ? 'حلول شاملة لإدارة النفايات تركز على تقليل وإعادة التدوير واستعادة الموارد'
        : 'Comprehensive waste management solutions focusing on reduction, recycling, and resource recovery',
      features: [
        isRTL ? 'تخطيط إدارة النفايات' : 'Waste management planning',
        isRTL ? 'أنظمة إعادة التدوير' : 'Recycling systems',
        isRTL ? 'استعادة الطاقة' : 'Energy recovery',
        isRTL ? 'معالجة النفايات الخطرة' : 'Hazardous waste treatment',
      ],
    },
    {
      title: isRTL ? 'شهادة المباني الخضراء' : 'Green Building Certification',
      description: isRTL
        ? 'دعم المشاريع في تحقيق معايير البناء الأخضر المعترف بها دوليًا'
        : 'Supporting projects in achieving internationally recognized green building standards',
      features: [
        isRTL ? 'شهادة LEED' : 'LEED certification',
        isRTL ? 'شهادة BREEAM' : 'BREEAM certification',
        isRTL ? 'تقييم الأداء البيئي' : 'Environmental performance assessment',
        isRTL ? 'تحسين كفاءة الطاقة' : 'Energy efficiency optimization',
      ],
    },
  ]

  const sustainabilityGoals = [
    {
      icon: TreePine,
      title: isRTL ? 'الحياد الكربوني' : 'Carbon Neutrality',
      description: isRTL
        ? 'مساعدة العملاء في تحقيق أهداف الحياد الكربوني'
        : 'Helping clients achieve carbon neutrality goals',
    },
    {
      icon: Droplets,
      title: isRTL ? 'الحفاظ على المياه' : 'Water Conservation',
      description: isRTL
        ? 'تطوير حلول مبتكرة للحفاظ على الموارد المائية'
        : 'Developing innovative solutions for water resource conservation',
    },
    {
      icon: Recycle,
      title: isRTL ? 'الاقتصاد الدائري' : 'Circular Economy',
      description: isRTL
        ? 'تعزيز ممارسات الاقتصاد الدائري في جميع المشاريع'
        : 'Promoting circular economy practices across all projects',
    },
  ]

  const stats = [
    { value: '150+', label: isRTL ? 'مشروع بيئي' : 'Environmental Projects' },
    { value: '50+', label: isRTL ? 'شهادة خضراء' : 'Green Certifications' },
    { value: '30M', label: isRTL ? 'متر مكعب مياه معالجة' : 'Cubic Meters Water Treated' },
    { value: '25%', label: isRTL ? 'تقليل الانبعاثات' : 'Emissions Reduced' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-600/10 rounded-2xl">
                <Leaf className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'الهندسة البيئية' : 'Environmental Engineering'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'بناء مستقبل مستدام من خلال حلول هندسية بيئية مبتكرة'
                : 'Building a sustainable future through innovative environmental engineering solutions'}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'خدماتنا البيئية' : 'Our Environmental Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Goals */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'أهدافنا للاستدامة' : 'Our Sustainability Goals'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sustainabilityGoals.map((goal, index) => {
              const Icon = goal.icon
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-green-600/10 rounded-xl">
                      <Icon className="h-12 w-12 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {goal.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {goal.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {isRTL
              ? 'دعنا نساعدك في تحقيق أهدافك البيئية'
              : "Let's Help You Achieve Your Environmental Goals"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'حلول بيئية مستدامة تحمي كوكبنا للأجيال القادمة'
              : 'Sustainable environmental solutions that protect our planet for future generations'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                {isRTL ? 'ابدأ مشروعك الأخضر' : 'Start Your Green Project'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button variant="outline" size="lg">
                {isRTL ? 'عرض المشاريع البيئية' : 'View Environmental Projects'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}