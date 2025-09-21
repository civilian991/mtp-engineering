import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { ClipboardCheck, CheckCircle, ArrowRight, BarChart3, Users, Calendar } from 'lucide-react'
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
    title: isRTL ? 'إدارة المشاريع | MTP Engineering' : 'Project Management | MTP Engineering',
    description: isRTL
      ? 'خدمات إدارة المشاريع الاحترافية - التخطيط والجدولة والتحكم في التكاليف والإشراف على البناء'
      : 'Professional project management services - planning, scheduling, cost control, and construction supervision',
  }
}

export default async function ProjectManagementPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      title: isRTL ? 'تخطيط وجدولة المشاريع' : 'Project Planning and Scheduling',
      description: isRTL
        ? 'وضع خطط شاملة وجداول زمنية واقعية لضمان تسليم المشاريع في الوقت المحدد'
        : 'Developing comprehensive plans and realistic schedules to ensure on-time project delivery',
      features: [
        isRTL ? 'تطوير نطاق العمل' : 'Work breakdown structure development',
        isRTL ? 'تحليل المسار الحرج' : 'Critical path analysis',
        isRTL ? 'تخصيص الموارد' : 'Resource allocation',
        isRTL ? 'تخطيط المعالم الرئيسية' : 'Milestone planning',
      ],
    },
    {
      title: isRTL ? 'التحكم في التكاليف والتقدير' : 'Cost Control and Estimation',
      description: isRTL
        ? 'إدارة دقيقة للميزانية وتقدير التكاليف لتحقيق أقصى قيمة للاستثمار'
        : 'Precise budget management and cost estimation to maximize return on investment',
      features: [
        isRTL ? 'تقدير التكاليف التفصيلية' : 'Detailed cost estimation',
        isRTL ? 'مراقبة الميزانية' : 'Budget monitoring',
        isRTL ? 'تحليل القيمة المكتسبة' : 'Earned value analysis',
        isRTL ? 'التقارير المالية' : 'Financial reporting',
      ],
    },
    {
      title: isRTL ? 'إدارة المخاطر' : 'Risk Management',
      description: isRTL
        ? 'تحديد وتقييم وتخفيف المخاطر المحتملة لضمان نجاح المشروع'
        : 'Identifying, assessing, and mitigating potential risks to ensure project success',
      features: [
        isRTL ? 'تحديد المخاطر' : 'Risk identification',
        isRTL ? 'التحليل النوعي والكمي' : 'Qualitative and quantitative analysis',
        isRTL ? 'استراتيجيات التخفيف' : 'Mitigation strategies',
        isRTL ? 'خطط الطوارئ' : 'Contingency planning',
      ],
    },
    {
      title: isRTL ? 'ضمان الجودة' : 'Quality Assurance',
      description: isRTL
        ? 'تطبيق معايير صارمة للجودة في جميع مراحل المشروع'
        : 'Implementing rigorous quality standards throughout all project phases',
      features: [
        isRTL ? 'تطوير خطط الجودة' : 'Quality plan development',
        isRTL ? 'عمليات التفتيش والمراجعة' : 'Inspections and audits',
        isRTL ? 'مراقبة الامتثال' : 'Compliance monitoring',
        isRTL ? 'التحسين المستمر' : 'Continuous improvement',
      ],
    },
    {
      title: isRTL ? 'الإشراف على البناء' : 'Construction Supervision',
      description: isRTL
        ? 'إشراف ميداني شامل لضمان التنفيذ وفقًا للتصميم والمواصفات'
        : 'Comprehensive on-site supervision to ensure execution according to design and specifications',
      features: [
        isRTL ? 'المراقبة اليومية للموقع' : 'Daily site monitoring',
        isRTL ? 'تنسيق المقاولين' : 'Contractor coordination',
        isRTL ? 'التحقق من التقدم' : 'Progress verification',
        isRTL ? 'تقارير الموقع' : 'Site reporting',
      ],
    },
  ]

  const methodology = [
    {
      phase: isRTL ? 'البدء' : 'Initiation',
      description: isRTL
        ? 'تحديد أهداف المشروع والنطاق والجدوى'
        : 'Define project objectives, scope, and feasibility',
    },
    {
      phase: isRTL ? 'التخطيط' : 'Planning',
      description: isRTL
        ? 'تطوير خطط تفصيلية وجداول زمنية وميزانيات'
        : 'Develop detailed plans, schedules, and budgets',
    },
    {
      phase: isRTL ? 'التنفيذ' : 'Execution',
      description: isRTL
        ? 'تنسيق الموارد وإدارة الأنشطة'
        : 'Coordinate resources and manage activities',
    },
    {
      phase: isRTL ? 'المراقبة' : 'Monitoring',
      description: isRTL
        ? 'تتبع التقدم والأداء والامتثال'
        : 'Track progress, performance, and compliance',
    },
    {
      phase: isRTL ? 'الإغلاق' : 'Closure',
      description: isRTL
        ? 'إكمال التسليم والتوثيق'
        : 'Complete deliverables and documentation',
    },
  ]

  const stats = [
    { value: '500+', label: isRTL ? 'مشروع مكتمل' : 'Projects Completed' },
    { value: '98%', label: isRTL ? 'في الوقت المحدد' : 'On-Time Delivery' },
    { value: '95%', label: isRTL ? 'ضمن الميزانية' : 'Within Budget' },
    { value: '100%', label: isRTL ? 'رضا العملاء' : 'Client Satisfaction' },
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
                <ClipboardCheck className="h-16 w-16 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'إدارة المشاريع' : 'Project Management'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'تحويل الرؤى إلى واقع من خلال إدارة احترافية ومنهجية للمشاريع'
                : 'Transforming visions into reality through professional and systematic project management'}
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
                <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
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
            {isRTL ? 'خدماتنا في إدارة المشاريع' : 'Our Project Management Services'}
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

      {/* Methodology Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'منهجيتنا' : 'Our Methodology'}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600" />

              {methodology.map((item, index) => (
                <div key={index} className="relative flex items-start mb-8">
                  {/* Timeline dot */}
                  <div className="absolute left-8 w-4 h-4 bg-primary-600 rounded-full -translate-x-1/2" />

                  <div className={`ml-16 ${isRTL ? 'text-right mr-16 ml-0' : ''}`}>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {index + 1}. {item.phase}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {isRTL
              ? 'دعنا نديـر مشروعك القادم'
              : "Let's Manage Your Next Project"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'فريقنا من الخبراء جاهز لضمان نجاح مشروعك'
              : 'Our expert team is ready to ensure your project success'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button as="span" size="lg">
                {isRTL ? 'احصل على استشارة' : 'Get Consultation'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button as="span" variant="outline" size="lg">
                {isRTL ? 'عرض مشاريعنا' : 'View Our Projects'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}