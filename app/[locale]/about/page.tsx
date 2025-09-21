'use client'

import { useEffect, useState } from 'react'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Award, Target, Eye, Heart, Shield, Lightbulb, Leaf, HardHat } from 'lucide-react'
import Card from '@/components/ui/Card'
import Link from 'next/link'
import Button from '@/components/ui/Button'

type Props = {
  params: Promise<{ locale: string }>
}

export default function AboutPage({ params }: Props) {
  const [locale, setLocale] = useState<string>('en')
  const [dictionary, setDictionary] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      const { locale: paramLocale } = await params
      setLocale(paramLocale)
      const dict = await getDictionary(paramLocale as Locale)
      setDictionary(dict)
    }
    loadData()
  }, [params])

  const isRTL = locale === 'ar'

  if (!dictionary) {
    return <div className="min-h-screen bg-secondary-50 flex items-center justify-center">Loading...</div>
  }

  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: isRTL ? 'التميز' : 'Excellence',
      description: isRTL
        ? 'نسعى للتميز في كل مشروع نقوم به'
        : 'We strive for excellence in every project we undertake',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: isRTL ? 'النزاهة' : 'Integrity',
      description: isRTL
        ? 'نعمل بأعلى معايير النزاهة والشفافية'
        : 'We operate with the highest standards of integrity and transparency',
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: isRTL ? 'الابتكار' : 'Innovation',
      description: isRTL
        ? 'نحتضن الابتكار لتقديم حلول متطورة'
        : 'We embrace innovation to deliver cutting-edge solutions',
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: isRTL ? 'الاستدامة' : 'Sustainability',
      description: isRTL
        ? 'نلتزم بالتنمية المستدامة والمسؤولية البيئية'
        : 'We are committed to sustainable development and environmental responsibility',
    },
    {
      icon: <HardHat className="h-8 w-8" />,
      title: isRTL ? 'السلامة' : 'Safety',
      description: isRTL
        ? 'السلامة هي أولويتنا القصوى في جميع عملياتنا'
        : 'Safety is our top priority in all our operations',
    },
  ]

  const milestones = [
    {
      year: '1980',
      title: isRTL ? 'التأسيس' : 'Foundation',
      description: isRTL
        ? 'تأسست MTP Engineering لتقديم خدمات هندسية عالمية المستوى'
        : 'MTP Engineering was established to provide world-class engineering services',
    },
    {
      year: '1990',
      title: isRTL ? 'التوسع الإقليمي' : 'Regional Expansion',
      description: isRTL
        ? 'توسعت عملياتنا لتشمل جميع أنحاء المملكة'
        : 'Expanded operations across the Kingdom',
    },
    {
      year: '2000',
      title: isRTL ? 'شهادة ISO' : 'ISO Certification',
      description: isRTL
        ? 'حصلنا على شهادات ISO 9001 و ISO 14001'
        : 'Achieved ISO 9001 and ISO 14001 certifications',
    },
    {
      year: '2010',
      title: isRTL ? 'مشاريع ضخمة' : 'Mega Projects',
      description: isRTL
        ? 'شاركنا في مشاريع البنية التحتية الكبرى في المملكة'
        : 'Participated in major infrastructure projects across Saudi Arabia',
    },
    {
      year: '2020',
      title: isRTL ? 'التحول الرقمي' : 'Digital Transformation',
      description: isRTL
        ? 'تبنينا التقنيات الرقمية المتقدمة في جميع خدماتنا'
        : 'Embraced advanced digital technologies across all services',
    },
    {
      year: '2025',
      title: isRTL ? 'رؤية 2030' : 'Vision 2030',
      description: isRTL
        ? 'مواءمة خدماتنا مع رؤية المملكة 2030'
        : 'Aligning our services with Saudi Vision 2030',
    },
  ]

  const certifications = [
    'ISO 9001:2015',
    'ISO 14001:2015',
    'OHSAS 18001',
    'Saudi Engineering Council',
  ]

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {isRTL ? 'بناء مستقبل المملكة العربية السعودية' : "Building Saudi Arabia's Future"}
            </h1>
            <p className="text-xl opacity-90">
              {isRTL
                ? 'أكثر من 40 عامًا من التميز الهندسي والابتكار'
                : '40+ Years of Engineering Excellence and Innovation'}
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                {isRTL ? 'نبذة عن الشركة' : 'Company Overview'}
              </h2>
              <div className="prose prose-lg max-w-none text-secondary-700">
                <p>
                  {isRTL
                    ? 'تأسست شركة MTP Engineering في عام 1980، وقد رسخت مكانتها كواحدة من الشركات الرائدة في مجال الاستشارات الهندسية في المملكة العربية السعودية. مع أكثر من أربعة عقود من الخبرة، قدمنا خدماتنا لأكثر من 500 مشروع في مختلف القطاعات.'
                    : 'Founded in 1980, MTP Engineering has established itself as one of the leading engineering consultancy firms in Saudi Arabia. With over four decades of experience, we have delivered our services to more than 500 projects across various sectors.'}
                </p>
                <p>
                  {isRTL
                    ? 'نحن ملتزمون بتقديم حلول هندسية مبتكرة تلبي احتياجات عملائنا وتساهم في تحقيق رؤية المملكة 2030. فريقنا من المهندسين والخبراء المؤهلين يعملون بلا كلل لضمان تحقيق أعلى معايير الجودة والسلامة في كل مشروع.'
                    : 'We are committed to delivering innovative engineering solutions that meet our clients\' needs and contribute to achieving Saudi Vision 2030. Our team of qualified engineers and experts work tirelessly to ensure the highest standards of quality and safety in every project.'}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">40+</div>
                  <div className="text-secondary-600">{isRTL ? 'سنوات من الخبرة' : 'Years of Experience'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">500+</div>
                  <div className="text-secondary-600">{isRTL ? 'مشروع منجز' : 'Projects Completed'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">200+</div>
                  <div className="text-secondary-600">{isRTL ? 'مهندس محترف' : 'Professional Engineers'}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">15+</div>
                  <div className="text-secondary-600">{isRTL ? 'قطاعات مخدومة' : 'Sectors Served'}</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-primary-50 border-primary-200">
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-primary-600 mr-3 rtl:ml-3 rtl:mr-0" />
                  <h2 className="text-2xl font-bold text-secondary-900">
                    {isRTL ? 'رؤيتنا' : 'Our Vision'}
                  </h2>
                </div>
                <p className="text-secondary-700">
                  {isRTL
                    ? 'أن نكون الشركة الرائدة في الاستشارات الهندسية لدفع التنمية المستدامة في المملكة العربية السعودية والمنطقة.'
                    : 'To be the leading engineering consultancy driving sustainable development in Saudi Arabia and the region.'}
                </p>
              </Card>

              <Card className="bg-primary-50 border-primary-200">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-primary-600 mr-3 rtl:ml-3 rtl:mr-0" />
                  <h2 className="text-2xl font-bold text-secondary-900">
                    {isRTL ? 'مهمتنا' : 'Our Mission'}
                  </h2>
                </div>
                <p className="text-secondary-700">
                  {isRTL
                    ? 'تقديم حلول هندسية مبتكرة بنزاهة، وتجاوز توقعات العملاء من خلال الخبرة الفنية والالتزام بالتميز.'
                    : 'Delivering innovative engineering solutions with integrity, exceeding client expectations through technical expertise and commitment to excellence.'}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
              {isRTL ? 'قيمنا الأساسية' : 'Our Core Values'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <div className="text-primary-600 mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-2">{value.title}</h3>
                  <p className="text-secondary-600">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
              {isRTL ? 'رحلتنا' : 'Our Journey'}
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200"></div>
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`w-5/12 ${
                        index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
                      }`}
                    >
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-primary-600 font-bold text-xl mb-2">{milestone.year}</div>
                        <h3 className="font-semibold text-secondary-900 mb-1">{milestone.title}</h3>
                        <p className="text-secondary-600 text-sm">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <h2 className="text-3xl font-bold text-secondary-900 text-center mb-8">
                {isRTL ? 'الشهادات والاعتمادات' : 'Certifications & Accreditations'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-secondary-50 rounded-lg p-4 text-center"
                  >
                    <Award className="h-12 w-12 text-primary-600 mx-auto mb-2" />
                    <p className="font-medium text-secondary-900">{cert}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isRTL ? 'دعنا نبني المستقبل معًا' : "Let's Build the Future Together"}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isRTL
                ? 'اكتشف كيف يمكن لخبرتنا أن تساعد في تحقيق رؤية مشروعك'
                : 'Discover how our expertise can help bring your project vision to life'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`}>
                <Button size="lg" variant="secondary">
                  {isRTL ? 'اتصل بنا' : 'Contact Us'}
                </Button>
              </Link>
              <Link href={`/${locale}/about/team`}>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary-700">
                  {isRTL ? 'تعرف على فريقنا' : 'Meet Our Team'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}