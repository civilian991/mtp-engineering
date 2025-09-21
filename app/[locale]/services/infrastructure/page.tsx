import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Building2, CheckCircle, ArrowRight, Globe, Network, Cpu } from 'lucide-react'
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
    title: isRTL ? 'تطوير البنية التحتية | MTP Engineering' : 'Infrastructure Development | MTP Engineering',
    description: isRTL
      ? 'خدمات تطوير البنية التحتية الشاملة - أنظمة النقل وشبكات المرافق والتخطيط العمراني'
      : 'Comprehensive infrastructure development services - transportation systems, utility networks, and urban planning',
  }
}

export default async function InfrastructurePage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      title: isRTL ? 'أنظمة النقل' : 'Transportation Systems',
      description: isRTL
        ? 'تصميم وتطوير شبكات نقل حديثة وفعالة تربط المجتمعات'
        : 'Designing and developing modern, efficient transportation networks that connect communities',
      features: [
        isRTL ? 'تصميم الطرق والطرق السريعة' : 'Road and highway design',
        isRTL ? 'أنظمة النقل العام' : 'Public transportation systems',
        isRTL ? 'إدارة حركة المرور' : 'Traffic management',
        isRTL ? 'مرافق مواقف السيارات' : 'Parking facilities',
      ],
    },
    {
      title: isRTL ? 'شبكات المرافق' : 'Utility Networks',
      description: isRTL
        ? 'حلول البنية التحتية الشاملة للمياه والكهرباء والاتصالات'
        : 'Comprehensive infrastructure solutions for water, power, and telecommunications',
      features: [
        isRTL ? 'شبكات توزيع المياه' : 'Water distribution networks',
        isRTL ? 'أنظمة الصرف الصحي' : 'Sewerage systems',
        isRTL ? 'البنية التحتية للكهرباء' : 'Electrical infrastructure',
        isRTL ? 'شبكات الاتصالات' : 'Telecommunications networks',
      ],
    },
    {
      title: isRTL ? 'التخطيط العمراني' : 'Urban Planning',
      description: isRTL
        ? 'تطوير مساحات حضرية مستدامة وقابلة للعيش للأجيال القادمة'
        : 'Creating sustainable and livable urban spaces for future generations',
      features: [
        isRTL ? 'تخطيط المدن الرئيسية' : 'Master planning',
        isRTL ? 'تصميم المناطق السكنية' : 'Residential district design',
        isRTL ? 'المناطق التجارية' : 'Commercial zones',
        isRTL ? 'المساحات العامة والحدائق' : 'Public spaces and parks',
      ],
    },
    {
      title: isRTL ? 'حلول المدن الذكية' : 'Smart City Solutions',
      description: isRTL
        ? 'دمج التكنولوجيا لتحسين جودة الحياة الحضرية والكفاءة'
        : 'Integrating technology to enhance urban quality of life and efficiency',
      features: [
        isRTL ? 'أنظمة إدارة المدن الذكية' : 'Smart city management systems',
        isRTL ? 'إنترنت الأشياء للبنية التحتية' : 'IoT infrastructure',
        isRTL ? 'أنظمة المراقبة والأمن' : 'Surveillance and security systems',
        isRTL ? 'حلول الطاقة الذكية' : 'Smart energy solutions',
      ],
    },
    {
      title: isRTL ? 'البنية التحتية المستدامة' : 'Sustainable Infrastructure',
      description: isRTL
        ? 'تطوير بنية تحتية صديقة للبيئة تقلل من التأثير البيئي'
        : 'Developing eco-friendly infrastructure that minimizes environmental impact',
      features: [
        isRTL ? 'البنية التحتية الخضراء' : 'Green infrastructure',
        isRTL ? 'أنظمة الطاقة المتجددة' : 'Renewable energy systems',
        isRTL ? 'إدارة مياه الأمطار' : 'Stormwater management',
        isRTL ? 'مواد البناء المستدامة' : 'Sustainable building materials',
      ],
    },
  ]

  const keyProjects = [
    {
      name: isRTL ? 'مدينة نيوم' : 'NEOM City',
      category: isRTL ? 'تطوير حضري' : 'Urban Development',
      value: '$500B',
    },
    {
      name: isRTL ? 'مترو الرياض' : 'Riyadh Metro',
      category: isRTL ? 'النقل' : 'Transportation',
      value: '$23B',
    },
    {
      name: isRTL ? 'مدينة الملك عبد الله الاقتصادية' : 'King Abdullah Economic City',
      category: isRTL ? 'بنية تحتية متكاملة' : 'Integrated Infrastructure',
      value: '$100B',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-600/10 rounded-2xl">
                <Network className="h-16 w-16 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'تطوير البنية التحتية' : 'Infrastructure Development'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'بناء أساس التقدم من خلال حلول البنية التحتية المبتكرة والمستدامة'
                : 'Building the foundation of progress through innovative and sustainable infrastructure solutions'}
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
                        <CheckCircle className="h-5 w-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
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

      {/* Key Projects */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'المشاريع الرئيسية' : 'Key Projects'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyProjects.map((project, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800">
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{project.category}</p>
                  <p className="text-2xl font-bold text-primary-600">{project.value}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {isRTL
              ? 'هل لديك مشروع بنية تحتية؟'
              : 'Have an Infrastructure Project?'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'دعنا نساعدك في بناء البنية التحتية للمستقبل'
              : "Let's help you build the infrastructure of tomorrow"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button size="lg">
                {isRTL ? 'ابدأ مشروعك' : 'Start Your Project'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button variant="outline" size="lg">
                {isRTL ? 'عرض مشاريعنا' : 'View Our Projects'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}