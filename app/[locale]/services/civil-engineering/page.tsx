import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Building2, CheckCircle, ArrowRight } from 'lucide-react'
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
    title: isRTL ? 'الهندسة المدنية | MTP Engineering' : 'Civil Engineering | MTP Engineering',
    description: isRTL
      ? 'خدمات الهندسة المدنية الشاملة - التصميم الإنشائي وهندسة الأساسات وتصميم الجسور'
      : 'Comprehensive civil engineering services - structural design, foundation engineering, and bridge design',
  }
}

export default async function CivilEngineeringPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const services = [
    {
      title: isRTL ? 'التصميم والتحليل الإنشائي' : 'Structural Design and Analysis',
      description: isRTL
        ? 'تصميم هياكل آمنة وفعالة من حيث التكلفة باستخدام أحدث البرامج والتقنيات'
        : 'Designing safe and cost-effective structures using the latest software and techniques',
      features: [
        isRTL ? 'تصميم المباني السكنية والتجارية' : 'Residential and commercial building design',
        isRTL ? 'التحليل الزلزالي' : 'Seismic analysis',
        isRTL ? 'تصميم الهياكل الفولاذية والخرسانية' : 'Steel and concrete structure design',
        isRTL ? 'تقييم وتحديث الهياكل القائمة' : 'Assessment and retrofit of existing structures',
      ],
    },
    {
      title: isRTL ? 'هندسة الأساسات' : 'Foundation Engineering',
      description: isRTL
        ? 'حلول أساسات مبتكرة تضمن استقرار وطول عمر المباني'
        : 'Innovative foundation solutions ensuring stability and longevity of structures',
      features: [
        isRTL ? 'تصميم الأساسات الضحلة والعميقة' : 'Shallow and deep foundation design',
        isRTL ? 'تحليل التربة والصخور' : 'Soil and rock analysis',
        isRTL ? 'الخوازيق والجدران الاستنادية' : 'Piling and retaining walls',
        isRTL ? 'تحسين التربة' : 'Ground improvement techniques',
      ],
    },
    {
      title: isRTL ? 'تصميم الجسور والطرق السريعة' : 'Bridge and Highway Design',
      description: isRTL
        ? 'تطوير بنية تحتية للنقل آمنة وفعالة'
        : 'Developing safe and efficient transportation infrastructure',
      features: [
        isRTL ? 'تصميم الجسور والجسور العلوية' : 'Bridge and overpass design',
        isRTL ? 'هندسة الطرق السريعة' : 'Highway engineering',
        isRTL ? 'تقاطعات الطرق والدوارات' : 'Intersections and roundabouts',
        isRTL ? 'دراسات المرور وإدارة الحركة' : 'Traffic studies and management',
      ],
    },
    {
      title: isRTL ? 'هندسة الموارد المائية' : 'Water Resources Engineering',
      description: isRTL
        ? 'إدارة مستدامة وفعالة للموارد المائية'
        : 'Sustainable and efficient management of water resources',
      features: [
        isRTL ? 'تصميم السدود والخزانات' : 'Dam and reservoir design',
        isRTL ? 'أنظمة الصرف الصحي' : 'Drainage systems',
        isRTL ? 'إدارة مياه الأمطار' : 'Stormwater management',
        isRTL ? 'أنظمة الري' : 'Irrigation systems',
      ],
    },
    {
      title: isRTL ? 'الفحوصات الجيوتقنية' : 'Geotechnical Investigations',
      description: isRTL
        ? 'تقييمات شاملة لظروف الموقع لضمان سلامة المشروع'
        : 'Comprehensive site condition assessments to ensure project safety',
      features: [
        isRTL ? 'استكشاف الموقع' : 'Site exploration',
        isRTL ? 'اختبار المواد' : 'Material testing',
        isRTL ? 'تحليل المخاطر الجيولوجية' : 'Geological hazard analysis',
        isRTL ? 'تقارير جيوتقنية مفصلة' : 'Detailed geotechnical reports',
      ],
    },
  ]

  const projects = [
    {
      name: isRTL ? 'مطار الملك عبدالعزيز الدولي' : 'King Abdulaziz International Airport',
      type: isRTL ? 'تصميم إنشائي' : 'Structural Design',
      year: '2023',
    },
    {
      name: isRTL ? 'جسر وادي لبن' : 'Wadi Laban Bridge',
      type: isRTL ? 'تصميم الجسور' : 'Bridge Design',
      year: '2022',
    },
    {
      name: isRTL ? 'أبراج الملك عبدالله المالية' : 'King Abdullah Financial Towers',
      type: isRTL ? 'هندسة الأساسات' : 'Foundation Engineering',
      year: '2021',
    },
  ]

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            <div className="flex items-center mb-4">
              <Building2 className="h-12 w-12 mr-4 rtl:ml-4 rtl:mr-0" />
              <span className="text-primary-200">
                {isRTL ? 'الخدمات' : 'Services'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'الهندسة المدنية' : 'Civil Engineering'}
            </h1>
            <p className="text-xl opacity-90 mb-8">
              {isRTL
                ? 'حلول هندسية مدنية متكاملة تجمع بين الابتكار والخبرة العميقة'
                : 'Integrated civil engineering solutions combining innovation with deep expertise'}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm">
            <Link href={`/${locale}`} className="text-secondary-600 hover:text-primary-600">
              {isRTL ? 'الرئيسية' : 'Home'}
            </Link>
            <span className="mx-2 text-secondary-400">/</span>
            <Link href={`/${locale}/services`} className="text-secondary-600 hover:text-primary-600">
              {isRTL ? 'الخدمات' : 'Services'}
            </Link>
            <span className="mx-2 text-secondary-400">/</span>
            <span className="text-secondary-900">{isRTL ? 'الهندسة المدنية' : 'Civil Engineering'}</span>
          </nav>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                {isRTL ? 'نظرة عامة' : 'Overview'}
              </h2>
              <div className="prose prose-lg max-w-none text-secondary-700">
                <p>
                  {isRTL
                    ? 'يقدم قسم الهندسة المدنية في MTP مجموعة شاملة من الخدمات التي تغطي جميع جوانب مشاريع البناء والبنية التحتية. مع أكثر من 40 عامًا من الخبرة، قدمنا حلولاً هندسية مبتكرة لبعض من أكثر المشاريع تحديًا في المملكة العربية السعودية.'
                    : 'MTP\'s Civil Engineering department offers a comprehensive range of services covering all aspects of construction and infrastructure projects. With over 40 years of experience, we have delivered innovative engineering solutions for some of the most challenging projects in Saudi Arabia.'}
                </p>
                <p>
                  {isRTL
                    ? 'فريقنا من المهندسين المدنيين المعتمدين يجمع بين الخبرة التقنية العميقة والفهم الشامل للمعايير والأنظمة المحلية والدولية. نحن نستخدم أحدث التقنيات والبرمجيات لضمان تقديم حلول دقيقة وفعالة من حيث التكلفة.'
                    : 'Our team of certified civil engineers combines deep technical expertise with comprehensive understanding of local and international standards and regulations. We utilize the latest technologies and software to ensure accurate and cost-effective solutions.'}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
              {isRTL ? 'خدماتنا المتخصصة' : 'Our Specialized Services'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={index}>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-3">{service.title}</h3>
                  <p className="text-secondary-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary-600 mr-2 rtl:ml-2 rtl:mr-0 flex-shrink-0 mt-0.5" />
                        <span className="text-secondary-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Standards */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Card>
              <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
                {isRTL ? 'التقنيات والمعايير' : 'Technology & Standards'}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    {isRTL ? 'البرمجيات المستخدمة' : 'Software Used'}
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-secondary-700">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></span>
                      AutoCAD & Civil 3D
                    </li>
                    <li className="flex items-center text-secondary-700">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></span>
                      ETABS & SAP2000
                    </li>
                    <li className="flex items-center text-secondary-700">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></span>
                      Revit & BIM 360
                    </li>
                    <li className="flex items-center text-secondary-700">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></span>
                      PLAXIS & GeoStudio
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                    {isRTL ? 'المعايير المتبعة' : 'Standards Followed'}
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center text-secondary-700">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></span>
                      {isRTL ? 'كود البناء السعودي (SBC)' : 'Saudi Building Code (SBC)'}
                    </li>
                    <li className="flex items-center text-secondary-700">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></span>
                      {isRTL ? 'المعايير الأمريكية (ASCE/ACI)' : 'American Standards (ASCE/ACI)'}
                    </li>
                    <li className="flex items-center text-secondary-700">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></span>
                      {isRTL ? 'المعايير البريطانية (BS)' : 'British Standards (BS)'}
                    </li>
                    <li className="flex items-center text-secondary-700">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3 rtl:ml-3 rtl:mr-0"></span>
                      {isRTL ? 'الكود الأوروبي (Eurocode)' : 'Eurocode'}
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
              {isRTL ? 'مشاريع حديثة' : 'Recent Projects'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="h-40 bg-secondary-200 rounded-lg mb-4"></div>
                  <h3 className="font-semibold text-secondary-900 mb-1">{project.name}</h3>
                  <p className="text-sm text-primary-600 mb-1">{project.type}</p>
                  <p className="text-sm text-secondary-500">{project.year}</p>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href={`/${locale}/projects`}>
                <Button variant="outline">
                  {isRTL ? 'عرض جميع المشاريع' : 'View All Projects'}
                  <ArrowRight className={`h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isRTL ? 'هل تحتاج خدمات الهندسة المدنية؟' : 'Need Civil Engineering Services?'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isRTL
                ? 'تواصل مع خبرائنا لمناقشة متطلبات مشروعك'
                : 'Contact our experts to discuss your project requirements'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`}>
                <Button size="lg" variant="secondary">
                  {isRTL ? 'احصل على استشارة' : 'Get Consultation'}
                </Button>
              </Link>
              <Link href={`/${locale}/services`}>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary-700">
                  {isRTL ? 'خدمات أخرى' : 'Other Services'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}