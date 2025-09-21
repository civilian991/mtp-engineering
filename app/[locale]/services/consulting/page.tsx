import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Lightbulb, CheckCircle, ArrowRight, TrendingUp, Shield, Award } from 'lucide-react'
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
    title: isRTL ? 'الاستشارات الفنية | MTP Engineering' : 'Technical Consulting | MTP Engineering',
    description: isRTL
      ? 'خدمات استشارية فنية متخصصة - دراسات الجدوى والعناية الواجبة وهندسة القيمة'
      : 'Specialized technical consulting services - feasibility studies, due diligence, and value engineering',
  }
}

export default async function ConsultingPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      title: isRTL ? 'دراسات الجدوى' : 'Feasibility Studies',
      description: isRTL
        ? 'تحليل شامل لجدوى المشروع لاتخاذ قرارات استثمارية مدروسة'
        : 'Comprehensive project viability analysis for informed investment decisions',
      features: [
        isRTL ? 'التحليل الفني' : 'Technical analysis',
        isRTL ? 'التقييم الاقتصادي' : 'Economic evaluation',
        isRTL ? 'دراسة السوق' : 'Market study',
        isRTL ? 'تقييم المخاطر' : 'Risk assessment',
      ],
    },
    {
      title: isRTL ? 'العناية الواجبة الفنية' : 'Technical Due Diligence',
      description: isRTL
        ? 'تقييم دقيق للأصول والمشاريع لضمان اتخاذ قرارات مستنيرة'
        : 'Thorough assessment of assets and projects for informed decision-making',
      features: [
        isRTL ? 'تقييم حالة الأصول' : 'Asset condition assessment',
        isRTL ? 'مراجعة الامتثال' : 'Compliance review',
        isRTL ? 'تحليل الأداء' : 'Performance analysis',
        isRTL ? 'تقدير التكاليف المستقبلية' : 'Future cost estimation',
      ],
    },
    {
      title: isRTL ? 'مراجعة وتحسين التصميم' : 'Design Review and Optimization',
      description: isRTL
        ? 'تحسين التصاميم لتحقيق الكفاءة والفعالية من حيث التكلفة'
        : 'Optimizing designs for efficiency and cost-effectiveness',
      features: [
        isRTL ? 'مراجعة التصميم الإنشائي' : 'Structural design review',
        isRTL ? 'تحسين الأنظمة' : 'Systems optimization',
        isRTL ? 'تحليل البدائل' : 'Alternative analysis',
        isRTL ? 'تحسين التكلفة' : 'Cost optimization',
      ],
    },
    {
      title: isRTL ? 'هندسة القيمة' : 'Value Engineering',
      description: isRTL
        ? 'تحسين القيمة من خلال تحليل الوظائف وتقليل التكاليف دون المساس بالجودة'
        : 'Maximizing value through function analysis and cost reduction without compromising quality',
      features: [
        isRTL ? 'تحليل الوظائف' : 'Function analysis',
        isRTL ? 'تطوير البدائل' : 'Alternative development',
        isRTL ? 'تحليل دورة الحياة' : 'Life cycle analysis',
        isRTL ? 'ورش عمل القيمة' : 'Value workshops',
      ],
    },
    {
      title: isRTL ? 'خدمات الشهود الخبراء' : 'Expert Witness Services',
      description: isRTL
        ? 'تقديم شهادات خبرة فنية موثوقة في النزاعات والتحكيم'
        : 'Providing reliable technical expertise in disputes and arbitration',
      features: [
        isRTL ? 'تحليل المطالبات' : 'Claims analysis',
        isRTL ? 'التقارير الفنية' : 'Technical reports',
        isRTL ? 'شهادة الخبراء' : 'Expert testimony',
        isRTL ? 'دعم التحكيم' : 'Arbitration support',
      ],
    },
  ]

  const expertise = [
    {
      icon: TrendingUp,
      title: isRTL ? 'تحليل البيانات' : 'Data Analysis',
      description: isRTL
        ? 'استخدام أحدث أدوات التحليل للحصول على رؤى قيمة'
        : 'Using advanced analytics tools for valuable insights',
    },
    {
      icon: Shield,
      title: isRTL ? 'إدارة المخاطر' : 'Risk Management',
      description: isRTL
        ? 'تحديد وتخفيف المخاطر المحتملة في وقت مبكر'
        : 'Identifying and mitigating potential risks early',
    },
    {
      icon: Award,
      title: isRTL ? 'أفضل الممارسات' : 'Best Practices',
      description: isRTL
        ? 'تطبيق معايير الصناعة وأفضل الممارسات العالمية'
        : 'Applying industry standards and global best practices',
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
                <Lightbulb className="h-16 w-16 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'الاستشارات الفنية' : 'Technical Consulting'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'حلول استشارية متخصصة تدعم قراراتك الاستراتيجية وتحقق أهداف مشروعك'
                : 'Specialized consulting solutions that support your strategic decisions and achieve project goals'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'خدماتنا الاستشارية' : 'Our Consulting Services'}
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

      {/* Expertise Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'خبراتنا المتميزة' : 'Our Core Expertise'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary-600/10 rounded-xl">
                      <Icon className="h-12 w-12 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
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
              ? 'احصل على استشارة متخصصة'
              : 'Get Expert Consultation'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'فريقنا من الخبراء جاهز لتقديم الحلول المناسبة لتحدياتك'
              : 'Our team of experts is ready to provide the right solutions for your challenges'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button size="lg">
                {isRTL ? 'طلب استشارة' : 'Request Consultation'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/about`}>
              <Button variant="outline" size="lg">
                {isRTL ? 'تعرف على خبرائنا' : 'Meet Our Experts'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}