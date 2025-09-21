import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Building, CheckCircle, ArrowRight, Landmark, Users, Shield } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isRTL = locale === 'ar'

  return {
    title: isRTL ? 'القطاع الحكومي | MTP Engineering' : 'Government Sector | MTP Engineering',
    description: isRTL
      ? 'خدمات هندسية متخصصة للوزارات والهيئات الحكومية والمشاريع العامة'
      : 'Specialized engineering services for ministries, government agencies, and public projects',
  }
}

export default async function GovernmentSectorPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: Landmark,
      title: isRTL ? 'الوزارات والهيئات' : 'Ministries and Agencies',
      description: isRTL
        ? 'تقديم خدمات هندسية شاملة للمؤسسات الحكومية'
        : 'Providing comprehensive engineering services to government institutions',
      projects: [
        isRTL ? 'وزارة النقل' : 'Ministry of Transport',
        isRTL ? 'وزارة الإسكان' : 'Ministry of Housing',
        isRTL ? 'وزارة التعليم' : 'Ministry of Education',
        isRTL ? 'وزارة الصحة' : 'Ministry of Health',
      ],
    },
    {
      icon: Building,
      title: isRTL ? 'البنية التحتية العامة' : 'Public Infrastructure',
      description: isRTL
        ? 'تطوير مشاريع البنية التحتية الحيوية للمجتمع'
        : 'Developing vital infrastructure projects for the community',
      projects: [
        isRTL ? 'الطرق والجسور' : 'Roads and bridges',
        isRTL ? 'شبكات المياه' : 'Water networks',
        isRTL ? 'أنظمة الصرف الصحي' : 'Sewerage systems',
        isRTL ? 'المرافق العامة' : 'Public utilities',
      ],
    },
    {
      icon: Users,
      title: isRTL ? 'المشاريع البلدية' : 'Municipal Projects',
      description: isRTL
        ? 'دعم البلديات في تطوير المدن والمجتمعات'
        : 'Supporting municipalities in developing cities and communities',
      projects: [
        isRTL ? 'الحدائق العامة' : 'Public parks',
        isRTL ? 'المراكز المجتمعية' : 'Community centers',
        isRTL ? 'أسواق البلدية' : 'Municipal markets',
        isRTL ? 'مواقف السيارات' : 'Parking facilities',
      ],
    },
  ]

  const keyProjects = [
    {
      name: isRTL ? 'مبنى وزارة الداخلية' : 'Ministry of Interior Building',
      location: isRTL ? 'الرياض' : 'Riyadh',
      value: '$150M',
      year: '2020',
      description: isRTL
        ? 'تصميم وإشراف على بناء مجمع وزاري حديث'
        : 'Design and supervision of modern ministerial complex',
    },
    {
      name: isRTL ? 'مشروع تطوير البنية التحتية' : 'Infrastructure Development Project',
      location: isRTL ? 'المنطقة الشرقية' : 'Eastern Province',
      value: '$250M',
      year: '2021',
      description: isRTL
        ? 'تطوير شامل للبنية التحتية في 5 مدن'
        : 'Comprehensive infrastructure development in 5 cities',
    },
    {
      name: isRTL ? 'مركز الخدمات الحكومية' : 'Government Services Center',
      location: isRTL ? 'جدة' : 'Jeddah',
      value: '$80M',
      year: '2019',
      description: isRTL
        ? 'مركز متكامل للخدمات الحكومية بتصميم مستدام'
        : 'Integrated government services center with sustainable design',
    },
  ]

  const expertise = [
    {
      title: isRTL ? 'الامتثال التنظيمي' : 'Regulatory Compliance',
      description: isRTL
        ? 'ضمان الامتثال الكامل لجميع اللوائح والمعايير الحكومية'
        : 'Ensuring full compliance with all government regulations and standards',
    },
    {
      title: isRTL ? 'إدارة المشاريع الكبرى' : 'Mega Project Management',
      description: isRTL
        ? 'خبرة واسعة في إدارة المشاريع الحكومية الضخمة'
        : 'Extensive experience in managing large-scale government projects',
    },
    {
      title: isRTL ? 'الشراكات الحكومية' : 'Government Partnerships',
      description: isRTL
        ? 'علاقات قوية مع الجهات الحكومية والوزارات'
        : 'Strong relationships with government entities and ministries',
    },
    {
      title: isRTL ? 'الأمن والسرية' : 'Security and Confidentiality',
      description: isRTL
        ? 'أعلى معايير الأمن والسرية في التعامل مع المشاريع الحساسة'
        : 'Highest standards of security and confidentiality for sensitive projects',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-600/10 rounded-2xl">
                <Landmark className="h-16 w-16 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'القطاع الحكومي' : 'Government Sector'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'شريك موثوق للمؤسسات الحكومية في تطوير البنية التحتية والمشاريع العامة'
                : 'Trusted partner for government institutions in infrastructure and public project development'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'خدماتنا للقطاع الحكومي' : 'Our Government Sector Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="h-full">
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-600/10 rounded-xl">
                        <Icon className="h-10 w-10 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.projects.map((project, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{project}</span>
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
            {isRTL ? 'مشاريع حكومية مميزة' : 'Featured Government Projects'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.year}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      📍 {project.location}
                    </span>
                    <span className="text-lg font-semibold text-blue-600">
                      {project.value}
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
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
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
      <section className="py-16 px-4 bg-blue-600">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">{isRTL ? 'جهة حكومية' : 'Government Entities'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-blue-100">{isRTL ? 'مشروع حكومي' : 'Government Projects'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$2B+</div>
              <div className="text-blue-100">{isRTL ? 'قيمة المشاريع' : 'Project Value'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">35+</div>
              <div className="text-blue-100">{isRTL ? 'سنة خبرة' : 'Years Experience'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {isRTL
              ? 'شريكك الموثوق في المشاريع الحكومية'
              : 'Your Trusted Partner in Government Projects'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'دعنا نساعدك في تحقيق رؤية المملكة 2030'
              : "Let us help you achieve Saudi Arabia's Vision 2030"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                {isRTL ? 'ابدأ مشروعك' : 'Start Your Project'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button variant="outline" size="lg">
                {isRTL ? 'عرض المشاريع الحكومية' : 'View Government Projects'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}