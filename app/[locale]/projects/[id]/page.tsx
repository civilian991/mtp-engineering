import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MapPin, Calendar, Building, Users, Award, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { getProjectById, getProjects } from '@/lib/dal/projects'
import { Tables } from '@/types/database'

type Project = Tables<'projects'>

// Mock data for fallback when project not in database
const mockProjects = [
  {
    id: '1',
    name_en: 'King Abdulaziz International Airport Expansion',
    name_ar: 'توسعة مطار الملك عبدالعزيز الدولي',
    description_en: 'A major expansion project for King Abdulaziz International Airport in Jeddah, including new terminals, runways, and support facilities. This project aims to increase the airport capacity to handle 80 million passengers annually.',
    description_ar: 'مشروع توسعة كبير لمطار الملك عبدالعزيز الدولي في جدة، يشمل محطات جديدة ومدارج ومرافق دعم. يهدف هذا المشروع إلى زيادة سعة المطار للتعامل مع 80 مليون مسافر سنويًا.',
    location_en: 'Jeddah, Saudi Arabia',
    location_ar: 'جدة، المملكة العربية السعودية',
    client_en: 'General Authority of Civil Aviation',
    client_ar: 'الهيئة العامة للطيران المدني',
    year: '2023',
    duration: '36 months',
    sector: 'infrastructure',
    status: 'completed',
    services: ['Civil Engineering', 'Structural Design', 'MEP Engineering', 'Project Management'],
    team_size: 45,
    project_value: '$2.5 Billion',
    images: ['/images/projects/airport1.jpg', '/images/projects/airport2.jpg'],
    highlights_en: [
      'Designed to handle 80 million passengers annually',
      'LEED Gold certified sustainable design',
      'State-of-the-art baggage handling system',
      'Advanced air traffic control systems'
    ],
    highlights_ar: [
      'مصمم للتعامل مع 80 مليون مسافر سنويًا',
      'تصميم مستدام معتمد من LEED الذهبي',
      'نظام متطور لمعالجة الأمتعة',
      'أنظمة متقدمة لمراقبة الحركة الجوية'
    ]
  },
  {
    id: '2',
    name_en: 'Riyadh Metro Line 3',
    name_ar: 'مترو الرياض الخط الثالث',
    description_en: 'Part of the Riyadh Metro megaproject, Line 3 spans 41.6 km with 22 stations, connecting key areas of the capital. Our team provided comprehensive engineering consultancy for station design and track infrastructure.',
    description_ar: 'جزء من مشروع مترو الرياض الضخم، يمتد الخط الثالث 41.6 كم مع 22 محطة، يربط المناطق الرئيسية في العاصمة. قدم فريقنا استشارات هندسية شاملة لتصميم المحطات والبنية التحتية للمسار.',
    location_en: 'Riyadh, Saudi Arabia',
    location_ar: 'الرياض، المملكة العربية السعودية',
    client_en: 'Riyadh Development Authority',
    client_ar: 'الهيئة العليا لتطوير مدينة الرياض',
    year: '2022',
    duration: '48 months',
    sector: 'infrastructure',
    status: 'ongoing',
    services: ['Civil Engineering', 'Structural Design', 'Transportation Planning', 'Environmental Impact Assessment'],
    team_size: 60,
    project_value: '$7.8 Billion',
    images: ['/images/projects/metro1.jpg', '/images/projects/metro2.jpg'],
    highlights_en: [
      '41.6 km of track with 22 stations',
      'Fully automated driverless system',
      'Integration with other transit modes',
      'Sustainable urban mobility solution'
    ],
    highlights_ar: [
      '41.6 كم من المسار مع 22 محطة',
      'نظام آلي بالكامل بدون سائق',
      'التكامل مع وسائل النقل الأخرى',
      'حل التنقل الحضري المستدام'
    ]
  },
  {
    id: '3',
    name_en: 'NEOM Smart City Infrastructure',
    name_ar: 'البنية التحتية لمدينة نيوم الذكية',
    description_en: 'Contributing to the visionary NEOM project, we are providing engineering consultancy for critical infrastructure including renewable energy systems, smart utilities, and sustainable transportation networks.',
    description_ar: 'المساهمة في مشروع نيوم الرؤيوي، نقدم استشارات هندسية للبنية التحتية الحيوية بما في ذلك أنظمة الطاقة المتجددة والمرافق الذكية وشبكات النقل المستدامة.',
    location_en: 'NEOM, Saudi Arabia',
    location_ar: 'نيوم، المملكة العربية السعودية',
    client_en: 'NEOM Company',
    client_ar: 'شركة نيوم',
    year: '2024',
    duration: '60 months',
    sector: 'government',
    status: 'ongoing',
    services: ['Smart Infrastructure', 'Renewable Energy', 'Urban Planning', 'Environmental Engineering'],
    team_size: 80,
    project_value: '$15 Billion',
    images: ['/images/projects/neom1.jpg', '/images/projects/neom2.jpg'],
    highlights_en: [
      '100% renewable energy powered',
      'AI-integrated smart city systems',
      'Zero-carbon footprint design',
      'Advanced water recycling systems'
    ],
    highlights_ar: [
      'مدعوم بالطاقة المتجددة 100%',
      'أنظمة المدينة الذكية المتكاملة مع الذكاء الاصطناعي',
      'تصميم بصمة كربونية صفرية',
      'أنظمة متقدمة لإعادة تدوير المياه'
    ]
  }
]

async function getProject(id: string) {
  // First try to fetch from database
  const dbProject = await getProjectById(id)
  if (dbProject) return dbProject

  // Fallback to mock data for legacy projects
  return mockProjects.find((p: any) => p.id === id) || null
}

// For now, we'll use dynamic rendering for project pages
// generateStaticParams would need a different approach without cookies

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>
}): Promise<Metadata> {
  const { id, locale } = await params
  const project = await getProject(id)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const title = (locale === 'ar' ? project.name_ar || project.name_en : project.name_en || project.name_ar) || ''
  const description = (locale === 'ar' ? project.description_ar || project.description_en : project.description_en || project.description_ar) || ''

  return {
    title: `${title} | MTP Engineering`,
    description: description || undefined,
    openGraph: {
      title,
      description: description || undefined,
      type: 'article',
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>
}) {
  const { id, locale } = await params
  const dictionary = await getDictionary(locale as Locale)
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  const isRTL = locale === 'ar'

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}/projects`}>
            <Button as="span" variant="outline" size="sm" className="mb-6 text-white border-white hover:bg-white hover:text-primary-600">
              <ArrowLeft className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 rtl:rotate-180" />
              {isRTL ? 'العودة للمشاريع' : 'Back to Projects'}
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isRTL ? project.name_ar || project.name_en : project.name_en || project.name_ar}
          </h1>
          <div className="flex flex-wrap gap-4 text-white/90">
            {(project.location_en || project.location_ar) && (
              <span className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                {isRTL ? project.location_ar || project.location_en : project.location_en || project.location_ar}
              </span>
            )}
            {project.year && (
              <span className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                {project.year}
              </span>
            )}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'completed'
                ? 'bg-green-500/20 text-green-100'
                : project.status === 'ongoing'
                ? 'bg-yellow-500/20 text-yellow-100'
                : 'bg-blue-500/20 text-blue-100'
            }`}>
              {project.status === 'completed' ? (isRTL ? 'مكتمل' : 'Completed') :
               project.status === 'ongoing' ? (isRTL ? 'جاري' : 'Ongoing') :
               (isRTL ? 'مخطط' : 'Planned')}
            </span>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                  {isRTL ? 'نظرة عامة على المشروع' : 'Project Overview'}
                </h2>
                <p className="text-secondary-600 leading-relaxed">
                  {isRTL ? project.description_ar || project.description_en : project.description_en || project.description_ar}
                </p>
              </div>

              {/* Project Images - Only show if we have images */}
              {'image_url' in project && project.image_url && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                    {isRTL ? 'صور المشروع' : 'Project Images'}
                  </h2>
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg h-48"></div>
                </div>
              )}

              {/* Key Features/Highlights */}
              {(('features' in project && project.features) || ('highlights_en' in project && project.highlights_en)) && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                    {isRTL ? 'المميزات الرئيسية' : 'Key Features'}
                  </h2>
                  <ul className="space-y-3">
                    {'features' in project && project.features ? (
                      (Array.isArray(project.features) ? project.features : []).map((feature: any, index: number) => (
                        <li key={index} className="flex items-start">
                          <Award className="h-5 w-5 text-primary-600 mr-3 rtl:ml-3 rtl:mr-0 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary-600">
                            {typeof feature === 'object' ? (isRTL ? feature.ar || feature.en : feature.en || feature.ar) : feature}
                          </span>
                        </li>
                      ))
                    ) : (
                      // For mock data with highlights_en/highlights_ar
                      ((isRTL ? (project as any).highlights_ar : (project as any).highlights_en) || []).map((highlight: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Award className="h-5 w-5 text-primary-600 mr-3 rtl:ml-3 rtl:mr-0 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary-600">{highlight}</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}

              {/* Services Provided - Only show if we have services */}
              {'services' in project && project.services && Array.isArray(project.services) && project.services.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold text-secondary-900 mb-4">
                    {isRTL ? 'الخدمات المقدمة' : 'Services Provided'}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service: any, index: number) => (
                      <span key={index} className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                        {typeof service === 'object' ? (isRTL ? service.ar || service.en : service.en || service.ar) : service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  {isRTL ? 'تفاصيل المشروع' : 'Project Details'}
                </h3>
                <div className="space-y-4">
                  {(project.client_en || project.client_ar) && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-secondary-500 mb-1">{isRTL ? 'العميل' : 'Client'}</p>
                      <p className="font-semibold text-secondary-900">
                        {isRTL ? project.client_ar || project.client_en : project.client_en || project.client_ar}
                      </p>
                    </div>
                  )}
                  {project.year && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-secondary-500 mb-1">{isRTL ? 'السنة' : 'Year'}</p>
                      <p className="font-semibold text-secondary-900">{project.year}</p>
                    </div>
                  )}
                  {project.sector && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-secondary-500 mb-1">{isRTL ? 'القطاع' : 'Sector'}</p>
                      <p className="font-semibold text-secondary-900 capitalize">{project.sector.replace(/_/g, ' ')}</p>
                    </div>
                  )}
                  {'team_size' in project && project.team_size && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-secondary-500 mb-1">{isRTL ? 'حجم الفريق' : 'Team Size'}</p>
                      <p className="font-semibold text-secondary-900">
                        <Users className="inline h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-secondary-400" />
                        {project.team_size} {isRTL ? 'عضو' : 'members'}
                      </p>
                    </div>
                  )}
                  {'project_value' in project && project.project_value && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-secondary-500 mb-1">{isRTL ? 'قيمة المشروع' : 'Project Value'}</p>
                      <p className="font-semibold text-secondary-900">{project.project_value}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <Link href={`/${locale}/contact`} className="block">
                    <Button as="span" variant="primary" size="md" className="w-full">
                      {isRTL ? 'استفسر عن مشروع مماثل' : 'Inquire About Similar Project'}
                    </Button>
                  </Link>
                  <Link href={`/${locale}/projects`} className="block">
                    <Button as="span" variant="outline" size="md" className="w-full">
                      {isRTL ? 'عرض جميع المشاريع' : 'View All Projects'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}