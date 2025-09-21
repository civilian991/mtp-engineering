import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import {
  Building2,
  Route,
  ClipboardCheck,
  Users,
  Leaf,
  Shield,
  ArrowRight
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Link from 'next/link'
import Button from '@/components/ui/Button'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isRTL = locale === 'ar'

  return {
    title: isRTL ? 'خدماتنا | MTP Engineering' : 'Our Services | MTP Engineering',
    description: isRTL
      ? 'خدمات هندسية شاملة تشمل الهندسة المدنية والبنية التحتية وإدارة المشاريع والاستشارات'
      : 'Comprehensive engineering services including civil engineering, infrastructure, project management, and consulting',
  }
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      icon: <Building2 className="h-12 w-12" />,
      title: isRTL ? 'الهندسة المدنية' : 'Civil Engineering',
      description: isRTL
        ? 'التصميم الهيكلي والتحليل وهندسة الأساسات وتصميم الجسور والطرق السريعة'
        : 'Structural design and analysis, foundation engineering, bridge and highway design',
      slug: 'civil-engineering',
      features: [
        isRTL ? 'التصميم والتحليل الإنشائي' : 'Structural design and analysis',
        isRTL ? 'هندسة الأساسات' : 'Foundation engineering',
        isRTL ? 'تصميم الجسور والطرق' : 'Bridge and highway design',
        isRTL ? 'الفحوصات الجيوتقنية' : 'Geotechnical investigations',
      ],
    },
    {
      icon: <Route className="h-12 w-12" />,
      title: isRTL ? 'تطوير البنية التحتية' : 'Infrastructure Development',
      description: isRTL
        ? 'أنظمة النقل وشبكات المرافق والتخطيط العمراني وحلول المدن الذكية'
        : 'Transportation systems, utility networks, urban planning, and smart city solutions',
      slug: 'infrastructure',
      features: [
        isRTL ? 'أنظمة النقل' : 'Transportation systems',
        isRTL ? 'شبكات المرافق' : 'Utility networks',
        isRTL ? 'حلول المدن الذكية' : 'Smart city solutions',
        isRTL ? 'البنية التحتية المستدامة' : 'Sustainable infrastructure',
      ],
    },
    {
      icon: <ClipboardCheck className="h-12 w-12" />,
      title: isRTL ? 'إدارة المشاريع' : 'Project Management',
      description: isRTL
        ? 'التخطيط والجدولة والتحكم في التكاليف وإدارة المخاطر وضمان الجودة'
        : 'Project planning, cost control, risk management, quality assurance, and supervision',
      slug: 'project-management',
      features: [
        isRTL ? 'تخطيط وجدولة المشاريع' : 'Project planning and scheduling',
        isRTL ? 'التحكم في التكاليف' : 'Cost control and estimation',
        isRTL ? 'إدارة المخاطر' : 'Risk management',
        isRTL ? 'الإشراف على البناء' : 'Construction supervision',
      ],
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: isRTL ? 'الاستشارات الفنية' : 'Technical Consulting',
      description: isRTL
        ? 'دراسات الجدوى والعناية الواجبة الفنية ومراجعة التصميم وهندسة القيمة'
        : 'Feasibility studies, technical due diligence, design review, and value engineering',
      slug: 'consulting',
      features: [
        isRTL ? 'دراسات الجدوى' : 'Feasibility studies',
        isRTL ? 'العناية الواجبة الفنية' : 'Technical due diligence',
        isRTL ? 'مراجعة وتحسين التصميم' : 'Design review and optimization',
        isRTL ? 'هندسة القيمة' : 'Value engineering',
      ],
    },
    {
      icon: <Leaf className="h-12 w-12" />,
      title: isRTL ? 'الهندسة البيئية' : 'Environmental Engineering',
      description: isRTL
        ? 'تقييمات الأثر البيئي واستشارات الاستدامة وحلول معالجة المياه'
        : 'Environmental impact assessments, sustainability consulting, and water treatment',
      slug: 'environmental',
      features: [
        isRTL ? 'تقييمات الأثر البيئي' : 'Environmental impact assessments',
        isRTL ? 'استشارات الاستدامة' : 'Sustainability consulting',
        isRTL ? 'حلول معالجة المياه' : 'Water treatment solutions',
        isRTL ? 'شهادة المباني الخضراء' : 'Green building certification',
      ],
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: isRTL ? 'ضمان الجودة' : 'Quality Assurance',
      description: isRTL
        ? 'الاختبار والفحص والتحقق من الامتثال وأنظمة مراقبة الجودة'
        : 'Testing and inspection, compliance verification, and quality control systems',
      slug: 'quality-assurance',
      features: [
        isRTL ? 'الاختبار والفحص' : 'Testing and inspection',
        isRTL ? 'التحقق من الامتثال' : 'Compliance verification',
        isRTL ? 'أنظمة مراقبة الجودة' : 'Quality control systems',
        isRTL ? 'مراقبة الأداء' : 'Performance monitoring',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'خدماتنا الهندسية' : 'Our Engineering Services'}
            </h1>
            <p className="text-xl opacity-90">
              {isRTL
                ? 'حلول هندسية شاملة تدعم رؤية المملكة 2030'
                : 'Comprehensive engineering solutions supporting Saudi Vision 2030'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              {isRTL ? 'خبرة شاملة في جميع التخصصات' : 'Comprehensive Expertise Across Disciplines'}
            </h2>
            <p className="text-lg text-secondary-600">
              {isRTL
                ? 'نقدم مجموعة كاملة من الخدمات الهندسية لدعم المشاريع من المفهوم إلى الإنجاز'
                : 'We offer a full spectrum of engineering services to support projects from concept to completion'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-shadow duration-300">
                <div className="text-primary-600 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{service.title}</h3>
                <p className="text-secondary-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-secondary-600">
                      <span className="text-primary-600 mr-2 rtl:ml-2 rtl:mr-0">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/${locale}/services/${service.slug}`}>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary-600 group-hover:text-white">
                    {isRTL ? 'اعرف المزيد' : 'Learn More'}
                    <ArrowRight className={`h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0 ${isRTL ? 'rotate-180' : ''}`} />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
              {isRTL ? 'لماذا تختار MTP؟' : 'Why Choose MTP?'}
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">40+</span>
                </div>
                <h4 className="font-semibold text-secondary-900 mb-2">
                  {isRTL ? 'سنوات من الخبرة' : 'Years of Experience'}
                </h4>
                <p className="text-sm text-secondary-600">
                  {isRTL ? 'خبرة عميقة في السوق السعودي' : 'Deep expertise in the Saudi market'}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">500+</span>
                </div>
                <h4 className="font-semibold text-secondary-900 mb-2">
                  {isRTL ? 'مشروع منجز' : 'Projects Completed'}
                </h4>
                <p className="text-sm text-secondary-600">
                  {isRTL ? 'سجل حافل بالنجاحات' : 'Proven track record of success'}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">ISO</span>
                </div>
                <h4 className="font-semibold text-secondary-900 mb-2">
                  {isRTL ? 'معايير دولية' : 'International Standards'}
                </h4>
                <p className="text-sm text-secondary-600">
                  {isRTL ? 'معتمدون بأعلى المعايير' : 'Certified to the highest standards'}
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">24/7</span>
                </div>
                <h4 className="font-semibold text-secondary-900 mb-2">
                  {isRTL ? 'دعم مستمر' : 'Continuous Support'}
                </h4>
                <p className="text-sm text-secondary-600">
                  {isRTL ? 'متواجدون دائماً لدعمكم' : 'Always available to support you'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
              {isRTL ? 'منهجيتنا في العمل' : 'Our Work Process'}
            </h2>
            <div className="grid md:grid-cols-5 gap-4">
              {[
                { num: '01', title: isRTL ? 'التشاور' : 'Consultation', desc: isRTL ? 'فهم احتياجاتك' : 'Understanding your needs' },
                { num: '02', title: isRTL ? 'التخطيط' : 'Planning', desc: isRTL ? 'وضع الاستراتيجية' : 'Developing strategy' },
                { num: '03', title: isRTL ? 'التصميم' : 'Design', desc: isRTL ? 'إنشاء الحلول' : 'Creating solutions' },
                { num: '04', title: isRTL ? 'التنفيذ' : 'Implementation', desc: isRTL ? 'تنفيذ المشروع' : 'Executing the project' },
                { num: '05', title: isRTL ? 'التسليم' : 'Delivery', desc: isRTL ? 'ضمان الجودة' : 'Quality assurance' },
              ].map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    {step.num}
                  </div>
                  <h4 className="font-semibold text-secondary-900 text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-secondary-600">{step.desc}</p>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-primary-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isRTL ? 'هل لديك مشروع في ذهنك؟' : 'Have a Project in Mind?'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isRTL
                ? 'دع خبراءنا يساعدونك في تحقيق رؤيتك'
                : 'Let our experts help you bring your vision to life'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`}>
                <Button size="lg" variant="secondary">
                  {isRTL ? 'ابدأ مشروعك' : 'Start Your Project'}
                </Button>
              </Link>
              <Link href={`/${locale}/projects`}>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary-700">
                  {isRTL ? 'عرض مشاريعنا' : 'View Our Projects'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}