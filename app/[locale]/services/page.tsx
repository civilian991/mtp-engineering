import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import {
  Zap,
  Wind,
  Droplets,
  Flame,
  Wrench,
  Gauge,
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
      icon: <Zap className="h-12 w-12" />,
      title: isRTL ? 'الأعمال الكهربائية' : 'Electrical Works',
      description: isRTL
        ? 'أنظمة الطاقة والتوزيع، الإنارة، أنظمة الجهد المنخفض والعالي'
        : 'Power systems, distribution, lighting, low and high voltage systems',
      slug: 'electrical',
      features: [
        isRTL ? 'أنظمة توزيع الطاقة' : 'Power distribution systems',
        isRTL ? 'أنظمة الإنارة الداخلية والخارجية' : 'Indoor and outdoor lighting',
        isRTL ? 'لوحات التحكم والتوزيع' : 'Control panels and switchboards',
        isRTL ? 'أنظمة الطاقة الاحتياطية' : 'Backup power systems',
      ],
    },
    {
      icon: <Wind className="h-12 w-12" />,
      title: isRTL ? 'أنظمة التكييف والتهوية' : 'HVAC Systems',
      description: isRTL
        ? 'أنظمة التكييف المركزي، التهوية، التبريد الصناعي والتحكم البيئي'
        : 'Central air conditioning, ventilation, industrial cooling, and environmental control',
      slug: 'hvac',
      features: [
        isRTL ? 'أنظمة التكييف المركزي' : 'Central air conditioning',
        isRTL ? 'أنظمة التهوية والعادم' : 'Ventilation and exhaust systems',
        isRTL ? 'غرف التبريد والتجميد' : 'Cold rooms and freezers',
        isRTL ? 'أنظمة التحكم الآلي' : 'Building automation systems',
      ],
    },
    {
      icon: <Droplets className="h-12 w-12" />,
      title: isRTL ? 'الأعمال الصحية' : 'Plumbing Systems',
      description: isRTL
        ? 'أنظمة المياه والصرف الصحي، معالجة المياه، أنظمة الري والخزانات'
        : 'Water supply, drainage, water treatment, irrigation systems, and tanks',
      slug: 'plumbing',
      features: [
        isRTL ? 'شبكات المياه النظيفة' : 'Clean water networks',
        isRTL ? 'أنظمة الصرف الصحي' : 'Sewage and drainage systems',
        isRTL ? 'محطات معالجة المياه' : 'Water treatment plants',
        isRTL ? 'أنظمة الري الحديثة' : 'Modern irrigation systems',
      ],
    },
    {
      icon: <Flame className="h-12 w-12" />,
      title: isRTL ? 'أنظمة مكافحة الحريق' : 'Fire Fighting Systems',
      description: isRTL
        ? 'أنظمة الإطفاء، الإنذار، الرشاشات الآلية وأنظمة الحماية من الحرائق'
        : 'Fire suppression, alarm systems, sprinklers, and fire protection systems',
      slug: 'fire-fighting',
      features: [
        isRTL ? 'أنظمة الرشاشات الآلية' : 'Automatic sprinkler systems',
        isRTL ? 'أنظمة إنذار الحريق' : 'Fire alarm and detection',
        isRTL ? 'أنظمة الإطفاء بالغاز' : 'Gas suppression systems',
        isRTL ? 'مضخات ومعدات الإطفاء' : 'Fire pumps and equipment',
      ],
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: isRTL ? 'الصيانة والتشغيل' : 'Maintenance & Operation',
      description: isRTL
        ? 'الصيانة الوقائية والتصحيحية، إدارة المرافق وخدمات التشغيل المتكاملة'
        : 'Preventive and corrective maintenance, facility management, and integrated operation services',
      slug: 'maintenance',
      features: [
        isRTL ? 'الصيانة الوقائية المجدولة' : 'Scheduled preventive maintenance',
        isRTL ? 'الصيانة التصحيحية السريعة' : 'Rapid corrective maintenance',
        isRTL ? 'إدارة المرافق المتكاملة' : 'Integrated facility management',
        isRTL ? 'خدمات الدعم الفني 24/7' : '24/7 technical support',
      ],
    },
    {
      icon: <Gauge className="h-12 w-12" />,
      title: isRTL ? 'أنظمة التحكم والأتمتة' : 'Control & Automation',
      description: isRTL
        ? 'أنظمة BMS، التحكم الآلي، أنظمة SCADA والتكامل الذكي للمباني'
        : 'BMS systems, automation control, SCADA systems, and smart building integration',
      slug: 'automation',
      features: [
        isRTL ? 'أنظمة إدارة المباني BMS' : 'Building Management Systems',
        isRTL ? 'أنظمة SCADA الصناعية' : 'Industrial SCADA systems',
        isRTL ? 'التكامل مع أنظمة IoT' : 'IoT systems integration',
        isRTL ? 'لوحات التحكم الذكية' : 'Smart control panels',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary-800 to-secondary-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-transparent"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'خدماتنا الكهروميكانيكية' : 'Our Electro-Mechanical Services'}
            </h1>
            <p className="text-xl text-primary-300">
              {isRTL
                ? 'حلول كهروميكانيكية متكاملة منذ عام 1980'
                : 'Integrated Electro-Mechanical Solutions Since 1980'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              {isRTL ? 'خبرة متكاملة في الأنظمة الكهروميكانيكية' : 'Integrated Expertise in Electro-Mechanical Systems'}
            </h2>
            <p className="text-lg text-secondary-600">
              {isRTL
                ? 'نقدم حلولاً كهروميكانيكية شاملة لجميع أنواع المباني والمنشآت'
                : 'We provide comprehensive electro-mechanical solutions for all types of buildings and facilities'}
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
                  <Button as="span" variant="outline" size="sm" className="group-hover:bg-primary-600 group-hover:text-white">
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
                  <span className="text-2xl font-bold text-primary-600">44+</span>
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
      <section className="py-16 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
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
                <Button as="span" size="lg" variant="secondary">
                  {isRTL ? 'ابدأ مشروعك' : 'Start Your Project'}
                </Button>
              </Link>
              <Link href={`/${locale}/projects`}>
                <Button as="span" size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary-700">
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