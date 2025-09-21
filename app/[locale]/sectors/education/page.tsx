import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { GraduationCap, CheckCircle, ArrowRight, School, BookOpen, Users2 } from 'lucide-react'
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
    title: isRTL ? 'قطاع التعليم | MTP Engineering' : 'Education Sector | MTP Engineering',
    description: isRTL
      ? 'خدمات هندسية متخصصة للجامعات والمدارس ومراكز التدريب'
      : 'Specialized engineering services for universities, schools, and training centers',
  }
}

export default async function EducationSectorPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: GraduationCap,
      title: isRTL ? 'الجامعات' : 'Universities',
      description: isRTL
        ? 'تصميم وبناء حرم جامعي حديث ومرافق أكاديمية'
        : 'Design and construction of modern campuses and academic facilities',
      features: [
        isRTL ? 'قاعات المحاضرات' : 'Lecture halls',
        isRTL ? 'المختبرات العلمية' : 'Science laboratories',
        isRTL ? 'المكتبات' : 'Libraries',
        isRTL ? 'مرافق الأبحاث' : 'Research facilities',
      ],
    },
    {
      icon: School,
      title: isRTL ? 'المدارس' : 'Schools',
      description: isRTL
        ? 'بناء بيئات تعليمية آمنة ومحفزة للطلاب'
        : 'Building safe and inspiring learning environments for students',
      features: [
        isRTL ? 'الفصول الدراسية' : 'Classrooms',
        isRTL ? 'المرافق الرياضية' : 'Sports facilities',
        isRTL ? 'المسارح' : 'Auditoriums',
        isRTL ? 'مناطق اللعب' : 'Play areas',
      ],
    },
    {
      icon: BookOpen,
      title: isRTL ? 'مراكز التدريب' : 'Training Centers',
      description: isRTL
        ? 'مراكز تدريب متخصصة بأحدث التقنيات التعليمية'
        : 'Specialized training centers with latest educational technologies',
      features: [
        isRTL ? 'قاعات التدريب' : 'Training rooms',
        isRTL ? 'مختبرات الحاسوب' : 'Computer labs',
        isRTL ? 'ورش العمل' : 'Workshops',
        isRTL ? 'استوديوهات التسجيل' : 'Recording studios',
      ],
    },
  ]

  const keyProjects = [
    {
      name: isRTL ? 'جامعة الملك سعود' : 'King Saud University',
      type: isRTL ? 'جامعة' : 'University',
      location: isRTL ? 'الرياض' : 'Riyadh',
      students: '60,000+',
    },
    {
      name: isRTL ? 'مدينة الملك عبدالله للطالبات' : 'Princess Nourah University',
      type: isRTL ? 'جامعة' : 'University',
      location: isRTL ? 'الرياض' : 'Riyadh',
      students: '50,000+',
    },
    {
      name: isRTL ? 'مجمع مدارس التميز' : 'Excellence Schools Complex',
      type: isRTL ? 'مدرسة' : 'School',
      location: isRTL ? 'جدة' : 'Jeddah',
      students: '5,000+',
    },
    {
      name: isRTL ? 'معهد التقنية المتقدمة' : 'Advanced Technology Institute',
      type: isRTL ? 'معهد تدريب' : 'Training Institute',
      location: isRTL ? 'الدمام' : 'Dammam',
      students: '10,000+',
    },
  ]

  const features = [
    {
      title: isRTL ? 'التعلم الذكي' : 'Smart Learning',
      description: isRTL
        ? 'دمج التقنيات الذكية في البيئة التعليمية'
        : 'Integrating smart technologies in educational environments',
    },
    {
      title: isRTL ? 'الاستدامة' : 'Sustainability',
      description: isRTL
        ? 'مباني تعليمية صديقة للبيئة وموفرة للطاقة'
        : 'Eco-friendly and energy-efficient educational buildings',
    },
    {
      title: isRTL ? 'السلامة' : 'Safety',
      description: isRTL
        ? 'أعلى معايير السلامة والأمان للطلاب'
        : 'Highest safety and security standards for students',
    },
    {
      title: isRTL ? 'المرونة' : 'Flexibility',
      description: isRTL
        ? 'تصاميم مرنة تتكيف مع احتياجات التعليم المتغيرة'
        : 'Flexible designs that adapt to changing educational needs',
    },
  ]

  const stats = [
    { value: '100+', label: isRTL ? 'مؤسسة تعليمية' : 'Educational Institutions' },
    { value: '50+', label: isRTL ? 'جامعة ومعهد' : 'Universities & Colleges' },
    { value: '200+', label: isRTL ? 'مدرسة' : 'Schools' },
    { value: '500K+', label: isRTL ? 'طالب يستفيد' : 'Students Served' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-indigo-600/10 rounded-2xl">
                <GraduationCap className="h-16 w-16 text-indigo-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'قطاع التعليم' : 'Education Sector'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'بناء مؤسسات تعليمية متطورة تشكل عقول المستقبل'
                : 'Building advanced educational institutions that shape the minds of tomorrow'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'خدماتنا التعليمية' : 'Our Educational Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="h-full">
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-indigo-600/10 rounded-xl">
                        <Icon className="h-10 w-10 text-indigo-600" />
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
                          <CheckCircle className="h-5 w-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
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
            {isRTL ? 'مشاريع تعليمية رائدة' : 'Leading Educational Projects'}
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
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <Users2 className="h-5 w-5 text-indigo-600" />
                    <span className="text-lg font-semibold text-indigo-600">
                      {project.students}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'مميزاتنا' : 'Our Features'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, index) => (
              <div key={index} className="text-center">
                <BookOpen className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
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
      <section className="py-16 px-4 bg-indigo-600">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-indigo-100">{stat.label}</div>
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
              ? 'نبني مستقبل التعليم'
              : 'Building the Future of Education'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'دعنا نساعدك في إنشاء مؤسسات تعليمية عالمية المستوى'
              : 'Let us help you create world-class educational institutions'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                {isRTL ? 'ابدأ مشروعك التعليمي' : 'Start Your Education Project'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button variant="outline" size="lg">
                {isRTL ? 'المشاريع التعليمية' : 'Education Projects'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}