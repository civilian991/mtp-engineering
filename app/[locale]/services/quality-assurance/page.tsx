import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { ShieldCheck, CheckCircle, ArrowRight, ClipboardList, Gauge, Award } from 'lucide-react'
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
    title: isRTL ? 'ضمان الجودة | MTP Engineering' : 'Quality Assurance | MTP Engineering',
    description: isRTL
      ? 'خدمات ضمان الجودة الشاملة - الاختبار والفحص والامتثال ومراقبة الأداء'
      : 'Comprehensive quality assurance services - testing, inspection, compliance, and performance monitoring',
  }
}

export default async function QualityAssurancePage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      title: isRTL ? 'الاختبار والفحص' : 'Testing and Inspection',
      description: isRTL
        ? 'خدمات اختبار وفحص شاملة لضمان جودة المواد والتنفيذ'
        : 'Comprehensive testing and inspection services to ensure material and execution quality',
      features: [
        isRTL ? 'اختبارات غير مدمرة' : 'Non-destructive testing',
        isRTL ? 'فحص المواد' : 'Material inspection',
        isRTL ? 'اختبارات الأداء' : 'Performance testing',
        isRTL ? 'فحص اللحام' : 'Welding inspection',
      ],
    },
    {
      title: isRTL ? 'التحقق من الامتثال' : 'Compliance Verification',
      description: isRTL
        ? 'ضمان الامتثال الكامل للمعايير المحلية والدولية والمتطلبات التنظيمية'
        : 'Ensuring full compliance with local and international standards and regulatory requirements',
      features: [
        isRTL ? 'مراجعة الامتثال للكود' : 'Code compliance review',
        isRTL ? 'تدقيق المعايير' : 'Standards auditing',
        isRTL ? 'التحقق من المواصفات' : 'Specification verification',
        isRTL ? 'توثيق الامتثال' : 'Compliance documentation',
      ],
    },
    {
      title: isRTL ? 'أنظمة مراقبة الجودة' : 'Quality Control Systems',
      description: isRTL
        ? 'تطوير وتنفيذ أنظمة مراقبة جودة قوية لجميع مراحل المشروع'
        : 'Developing and implementing robust quality control systems for all project phases',
      features: [
        isRTL ? 'تطوير إجراءات الجودة' : 'Quality procedure development',
        isRTL ? 'قوائم التحقق من الجودة' : 'Quality checklists',
        isRTL ? 'بروتوكولات الفحص' : 'Inspection protocols',
        isRTL ? 'أنظمة التتبع' : 'Tracking systems',
      ],
    },
    {
      title: isRTL ? 'اختبار المواد' : 'Materials Testing',
      description: isRTL
        ? 'اختبارات مختبرية شاملة للتحقق من خصائص وجودة مواد البناء'
        : 'Comprehensive laboratory testing to verify construction material properties and quality',
      features: [
        isRTL ? 'اختبار الخرسانة' : 'Concrete testing',
        isRTL ? 'اختبار الفولاذ' : 'Steel testing',
        isRTL ? 'اختبار التربة' : 'Soil testing',
        isRTL ? 'اختبار الأسفلت' : 'Asphalt testing',
      ],
    },
    {
      title: isRTL ? 'مراقبة الأداء' : 'Performance Monitoring',
      description: isRTL
        ? 'مراقبة مستمرة لأداء المشروع وتحديد مجالات التحسين'
        : 'Continuous monitoring of project performance and identification of improvement areas',
      features: [
        isRTL ? 'مؤشرات الأداء الرئيسية' : 'Key performance indicators',
        isRTL ? 'تحليل الاتجاهات' : 'Trend analysis',
        isRTL ? 'تقارير الأداء' : 'Performance reporting',
        isRTL ? 'التحسين المستمر' : 'Continuous improvement',
      ],
    },
  ]

  const qualityProcess = [
    {
      step: isRTL ? 'التخطيط' : 'Planning',
      description: isRTL
        ? 'وضع خطط وإجراءات الجودة'
        : 'Establish quality plans and procedures',
    },
    {
      step: isRTL ? 'التنفيذ' : 'Implementation',
      description: isRTL
        ? 'تطبيق معايير وضوابط الجودة'
        : 'Apply quality standards and controls',
    },
    {
      step: isRTL ? 'المراقبة' : 'Monitoring',
      description: isRTL
        ? 'فحص ومراقبة مستمرة'
        : 'Continuous inspection and monitoring',
    },
    {
      step: isRTL ? 'التصحيح' : 'Correction',
      description: isRTL
        ? 'معالجة المشكلات وتنفيذ التحسينات'
        : 'Address issues and implement improvements',
    },
    {
      step: isRTL ? 'التحقق' : 'Verification',
      description: isRTL
        ? 'التحقق من تحقيق معايير الجودة'
        : 'Verify quality standards are met',
    },
  ]

  const certifications = [
    { name: 'ISO 9001:2015', description: isRTL ? 'نظام إدارة الجودة' : 'Quality Management System' },
    { name: 'ISO 14001:2015', description: isRTL ? 'نظام الإدارة البيئية' : 'Environmental Management System' },
    { name: 'OHSAS 18001', description: isRTL ? 'الصحة والسلامة المهنية' : 'Occupational Health and Safety' },
    { name: 'ISO 45001:2018', description: isRTL ? 'نظام إدارة السلامة' : 'Safety Management System' },
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
                <ShieldCheck className="h-16 w-16 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'ضمان الجودة' : 'Quality Assurance'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'ضمان التميز في كل مرحلة من خلال أنظمة ضمان الجودة الصارمة'
                : 'Ensuring excellence at every stage through rigorous quality assurance systems'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'خدمات ضمان الجودة' : 'Quality Assurance Services'}
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

      {/* Quality Process */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'عملية ضمان الجودة' : 'Quality Assurance Process'}
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-5xl mx-auto">
            {qualityProcess.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center mb-8 md:mb-0 flex-1">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.step}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm max-w-xs">
                  {item.description}
                </p>
                {index < qualityProcess.length - 1 && (
                  <div className="hidden md:block absolute w-full h-0.5 bg-gray-300 dark:bg-gray-600 top-8 -z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            {isRTL ? 'شهاداتنا' : 'Our Certifications'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center">
                <div className="p-6">
                  <Award className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Metrics */}
      <section className="py-16 px-4 bg-primary-600">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Gauge className="h-12 w-12 text-white mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">99.8%</div>
              <div className="text-primary-100">{isRTL ? 'معدل النجاح' : 'Success Rate'}</div>
            </div>
            <div>
              <ClipboardList className="h-12 w-12 text-white mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-primary-100">{isRTL ? 'فحص منجز' : 'Inspections Completed'}</div>
            </div>
            <div>
              <ShieldCheck className="h-12 w-12 text-white mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-primary-100">{isRTL ? 'الامتثال' : 'Compliance'}</div>
            </div>
            <div>
              <Award className="h-12 w-12 text-white mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-primary-100">{isRTL ? 'جوائز الجودة' : 'Quality Awards'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {isRTL
              ? 'ضمان الجودة في كل خطوة'
              : 'Quality Assured at Every Step'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'دعنا نضمن أعلى معايير الجودة لمشروعك'
              : 'Let us ensure the highest quality standards for your project'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button size="lg">
                {isRTL ? 'احصل على خدمات الجودة' : 'Get Quality Services'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/services`}>
              <Button variant="outline" size="lg">
                {isRTL ? 'جميع الخدمات' : 'All Services'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}