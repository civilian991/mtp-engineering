import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import {
  Building,
  Fuel,
  Plane,
  Heart,
  GraduationCap,
  Home,
  Factory,
  Droplets,
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
    title: isRTL ? 'القطاعات | MTP Engineering' : 'Sectors | MTP Engineering',
    description: isRTL
      ? 'خبرة واسعة في القطاعات الحكومية والنفط والغاز والنقل والرعاية الصحية والتعليم والصناعة'
      : 'Extensive expertise across government, oil & gas, transportation, healthcare, education, and industrial sectors',
  }
}

export default async function SectorsPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const sectors = [
    {
      icon: <Building className="h-12 w-12" />,
      title: isRTL ? 'الحكومي' : 'Government',
      description: isRTL
        ? 'مشاريع الوزارات والهيئات الحكومية والبنية التحتية العامة والبلدية'
        : 'Ministry and agency projects, public infrastructure, and municipal developments',
      slug: 'government',
      stats: {
        projects: '150+',
        clients: isRTL ? '25 جهة حكومية' : '25 Government Entities',
      },
      highlights: [
        isRTL ? 'المباني الحكومية' : 'Government buildings',
        isRTL ? 'البنية التحتية العامة' : 'Public infrastructure',
        isRTL ? 'المشاريع البلدية' : 'Municipal projects',
        isRTL ? 'المرافق العامة' : 'Public facilities',
      ],
    },
    {
      icon: <Fuel className="h-12 w-12" />,
      title: isRTL ? 'النفط والغاز' : 'Oil & Gas',
      description: isRTL
        ? 'مصافي التكرير والبنية التحتية لخطوط الأنابيب ومرافق المعالجة'
        : 'Refineries, pipeline infrastructure, and processing facilities',
      slug: 'oil-gas',
      stats: {
        projects: '80+',
        clients: isRTL ? 'أرامكو وشركاء' : 'Aramco & Partners',
      },
      highlights: [
        isRTL ? 'المصافي' : 'Refineries',
        isRTL ? 'خطوط الأنابيب' : 'Pipeline infrastructure',
        isRTL ? 'مرافق المعالجة' : 'Processing facilities',
        isRTL ? 'محطات التوزيع' : 'Distribution stations',
      ],
    },
    {
      icon: <Plane className="h-12 w-12" />,
      title: isRTL ? 'النقل' : 'Transportation',
      description: isRTL
        ? 'المطارات والموانئ البحرية والسكك الحديدية والطرق السريعة'
        : 'Airports, seaports, railways, and highway systems',
      slug: 'transportation',
      stats: {
        projects: '120+',
        clients: isRTL ? 'هيئة الطيران والنقل' : 'Aviation & Transport Authorities',
      },
      highlights: [
        isRTL ? 'المطارات' : 'Airports',
        isRTL ? 'الموانئ البحرية' : 'Seaports',
        isRTL ? 'السكك الحديدية' : 'Railways',
        isRTL ? 'الطرق السريعة' : 'Highways',
      ],
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: isRTL ? 'الرعاية الصحية' : 'Healthcare',
      description: isRTL
        ? 'المستشفيات والمدن الطبية والعيادات والمراكز الصحية'
        : 'Hospitals, medical cities, clinics, and healthcare centers',
      slug: 'healthcare',
      stats: {
        projects: '60+',
        clients: isRTL ? 'وزارة الصحة' : 'Ministry of Health',
      },
      highlights: [
        isRTL ? 'المستشفيات' : 'Hospitals',
        isRTL ? 'المدن الطبية' : 'Medical cities',
        isRTL ? 'العيادات المتخصصة' : 'Specialized clinics',
        isRTL ? 'مراكز الأبحاث' : 'Research centers',
      ],
    },
    {
      icon: <GraduationCap className="h-12 w-12" />,
      title: isRTL ? 'التعليم' : 'Education',
      description: isRTL
        ? 'الجامعات والمدارس ومراكز التدريب والمرافق التعليمية'
        : 'Universities, schools, training centers, and educational facilities',
      slug: 'education',
      stats: {
        projects: '90+',
        clients: isRTL ? 'وزارة التعليم والجامعات' : 'Ministry of Education & Universities',
      },
      highlights: [
        isRTL ? 'الجامعات' : 'Universities',
        isRTL ? 'المدارس' : 'Schools',
        isRTL ? 'مراكز التدريب' : 'Training centers',
        isRTL ? 'المكتبات' : 'Libraries',
      ],
    },
    {
      icon: <Home className="h-12 w-12" />,
      title: isRTL ? 'التجاري والسكني' : 'Commercial & Residential',
      description: isRTL
        ? 'المباني المكتبية ومراكز التسوق والمجمعات السكنية والتطورات متعددة الاستخدامات'
        : 'Office buildings, shopping centers, residential complexes, and mixed-use developments',
      slug: 'commercial-residential',
      stats: {
        projects: '200+',
        clients: isRTL ? 'مطورون خاصون' : 'Private Developers',
      },
      highlights: [
        isRTL ? 'المباني المكتبية' : 'Office buildings',
        isRTL ? 'مراكز التسوق' : 'Shopping centers',
        isRTL ? 'المجمعات السكنية' : 'Residential complexes',
        isRTL ? 'التطويرات المختلطة' : 'Mixed-use developments',
      ],
    },
    {
      icon: <Factory className="h-12 w-12" />,
      title: isRTL ? 'الصناعي' : 'Industrial',
      description: isRTL
        ? 'مصانع التصنيع والمستودعات والمدن الصناعية والمرافق اللوجستية'
        : 'Manufacturing plants, warehouses, industrial cities, and logistics facilities',
      slug: 'industrial',
      stats: {
        projects: '110+',
        clients: isRTL ? 'شركات صناعية' : 'Industrial Companies',
      },
      highlights: [
        isRTL ? 'المصانع' : 'Manufacturing plants',
        isRTL ? 'المستودعات' : 'Warehouses',
        isRTL ? 'المدن الصناعية' : 'Industrial cities',
        isRTL ? 'المرافق اللوجستية' : 'Logistics facilities',
      ],
    },
    {
      icon: <Droplets className="h-12 w-12" />,
      title: isRTL ? 'المياه والمرافق' : 'Water & Utilities',
      description: isRTL
        ? 'محطات معالجة المياه والبنية التحتية للطاقة وإدارة النفايات'
        : 'Water treatment plants, power infrastructure, and waste management',
      slug: 'utilities',
      stats: {
        projects: '70+',
        clients: isRTL ? 'شركات المرافق' : 'Utility Companies',
      },
      highlights: [
        isRTL ? 'محطات معالجة المياه' : 'Water treatment plants',
        isRTL ? 'البنية التحتية للطاقة' : 'Power infrastructure',
        isRTL ? 'إدارة النفايات' : 'Waste management',
        isRTL ? 'شبكات التوزيع' : 'Distribution networks',
      ],
    },
  ]

  const stats = [
    { value: '15+', label: isRTL ? 'قطاع مخدوم' : 'Sectors Served' },
    { value: '500+', label: isRTL ? 'مشروع منجز' : 'Projects Completed' },
    { value: '100+', label: isRTL ? 'عميل راضي' : 'Satisfied Clients' },
    { value: '40+', label: isRTL ? 'سنة من الخبرة' : 'Years of Experience' },
  ]

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'قطاعات متنوعة، خبرة عميقة' : 'Diverse Sectors, Deep Expertise'}
            </h1>
            <p className="text-xl opacity-90">
              {isRTL
                ? 'نخدم جميع القطاعات الرئيسية في المملكة العربية السعودية بحلول هندسية مبتكرة'
                : 'Serving all major sectors in Saudi Arabia with innovative engineering solutions'}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                <div className="text-secondary-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              {isRTL ? 'قطاعاتنا الرئيسية' : 'Our Key Sectors'}
            </h2>
            <p className="text-lg text-secondary-600">
              {isRTL
                ? 'خبرة متخصصة في كل قطاع، مع فهم عميق للمتطلبات والتحديات الفريدة'
                : 'Specialized expertise in each sector, with deep understanding of unique requirements and challenges'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-primary-600 mb-4">{sector.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">{sector.title}</h3>
                <p className="text-secondary-600 text-sm mb-4">{sector.description}</p>

                <div className="mb-4 pb-4 border-b">
                  <div className="text-sm text-secondary-500 mb-1">
                    <span className="font-semibold text-primary-600">{sector.stats.projects}</span>
                    {isRTL ? ' مشروع' : ' Projects'}
                  </div>
                  <div className="text-xs text-secondary-500">{sector.stats.clients}</div>
                </div>

                <ul className="space-y-1 mb-6">
                  {sector.highlights.slice(0, 3).map((highlight, idx) => (
                    <li key={idx} className="flex items-start text-xs text-secondary-600">
                      <span className="text-primary-600 mr-2 rtl:ml-2 rtl:mr-0">•</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <Link href={`/${locale}/sectors/${sector.slug}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary-600 group-hover:text-white"
                  >
                    {isRTL ? 'استكشف القطاع' : 'Explore Sector'}
                    <ArrowRight className={`h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0 ${isRTL ? 'rotate-180' : ''}`} />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision 2030 Alignment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary-600 to-primary-700 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                {isRTL ? 'متوافقون مع رؤية 2030' : 'Aligned with Vision 2030'}
              </h2>
              <p className="text-xl mb-6 opacity-90">
                {isRTL
                  ? 'نساهم في تحقيق رؤية المملكة 2030 من خلال مشاريع تحويلية في جميع القطاعات'
                  : 'Contributing to Saudi Vision 2030 through transformative projects across all sectors'}
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold mb-1">NEOM</div>
                  <div className="text-primary-100 text-sm">
                    {isRTL ? 'مدينة المستقبل' : 'City of the Future'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">Red Sea</div>
                  <div className="text-primary-100 text-sm">
                    {isRTL ? 'مشروع البحر الأحمر' : 'Red Sea Project'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold mb-1">Qiddiya</div>
                  <div className="text-primary-100 text-sm">
                    {isRTL ? 'عاصمة الترفيه' : 'Entertainment Capital'}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
              {isRTL ? 'قصص نجاح من قطاعات مختلفة' : 'Success Stories Across Sectors'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <div className="h-48 bg-secondary-200 rounded-lg mb-4"></div>
                <div className="text-xs text-primary-600 font-semibold mb-2">
                  {isRTL ? 'النقل' : 'TRANSPORTATION'}
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">
                  {isRTL ? 'مطار الملك عبدالعزيز الدولي' : 'King Abdulaziz International Airport'}
                </h3>
                <p className="text-sm text-secondary-600">
                  {isRTL
                    ? 'تصميم وإشراف على توسعة المطار لاستيعاب 30 مليون مسافر سنوياً'
                    : 'Design and supervision of airport expansion to accommodate 30 million passengers annually'}
                </p>
              </Card>

              <Card>
                <div className="h-48 bg-secondary-200 rounded-lg mb-4"></div>
                <div className="text-xs text-primary-600 font-semibold mb-2">
                  {isRTL ? 'الرعاية الصحية' : 'HEALTHCARE'}
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">
                  {isRTL ? 'مدينة الملك فهد الطبية' : 'King Fahad Medical City'}
                </h3>
                <p className="text-sm text-secondary-600">
                  {isRTL
                    ? 'البنية التحتية والمرافق لأكبر مدينة طبية في الشرق الأوسط'
                    : 'Infrastructure and facilities for the largest medical city in the Middle East'}
                </p>
              </Card>

              <Card>
                <div className="h-48 bg-secondary-200 rounded-lg mb-4"></div>
                <div className="text-xs text-primary-600 font-semibold mb-2">
                  {isRTL ? 'التعليم' : 'EDUCATION'}
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">
                  {isRTL ? 'جامعة الملك عبدالله للعلوم والتقنية' : 'KAUST University'}
                </h3>
                <p className="text-sm text-secondary-600">
                  {isRTL
                    ? 'مرافق بحثية متطورة ومختبرات علمية عالمية المستوى'
                    : 'Advanced research facilities and world-class scientific laboratories'}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isRTL ? 'خبرة قطاعية تحقق نتائج' : 'Sector Expertise That Delivers Results'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isRTL
                ? 'اكتشف كيف يمكن لخبرتنا القطاعية أن تفيد مشروعك'
                : 'Discover how our sector expertise can benefit your project'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/projects`}>
                <Button size="lg" variant="secondary">
                  {isRTL ? 'عرض المشاريع' : 'View Projects'}
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary-700">
                  {isRTL ? 'ناقش مشروعك' : 'Discuss Your Project'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}