import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import Card, { CardContent, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Locale } from '@/lib/i18n'
import { Tables } from '@/types/database'

type Project = Tables<'projects'>

interface ProjectsSectionProps {
  locale: Locale
  dictionary: any
  projects?: Project[]
}

// Mock data - will be replaced with Supabase query
const featuredProjects = [
  {
    id: '1',
    name_en: 'King Abdulaziz International Airport Expansion',
    name_ar: 'توسعة مطار الملك عبدالعزيز الدولي',
    location_en: 'Jeddah',
    location_ar: 'جدة',
    year: '2023',
    image: '/images/projects/airport.jpg',
    sector: 'Infrastructure',
  },
  {
    id: '2',
    name_en: 'Riyadh Metro Line 3',
    name_ar: 'مترو الرياض الخط الثالث',
    location_en: 'Riyadh',
    location_ar: 'الرياض',
    year: '2022',
    image: '/images/projects/metro.jpg',
    sector: 'Transportation',
  },
  {
    id: '3',
    name_en: 'NEOM Smart City Infrastructure',
    name_ar: 'البنية التحتية لمدينة نيوم الذكية',
    location_en: 'NEOM',
    location_ar: 'نيوم',
    year: '2024',
    image: '/images/projects/neom.jpg',
    sector: 'Smart Cities',
  },
]

export default function ProjectsSection({ locale, dictionary, projects: dbProjects }: ProjectsSectionProps) {
  // Use database projects if available, otherwise fall back to mock data
  const displayProjects = dbProjects && dbProjects.length > 0 ? dbProjects : featuredProjects

  return (
    <section className="py-16 bg-secondary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            {dictionary.projects.recent}
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'مشاريعنا الحديثة التي تعكس خبرتنا والتزامنا بالتميز'
              : 'Our recent projects showcasing our expertise and commitment to excellence'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.slice(0, 6).map((project) => (
            <Card key={project.id} variant="elevated" className="overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="aspect-w-16 aspect-h-9 bg-secondary-200 relative h-48">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={locale === 'ar' ? project.name_ar || project.name_en : project.name_en || project.name_ar}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                )}
                {project.sector && (
                  <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto">
                    <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-primary-600">
                      {typeof project.sector === 'string' ? project.sector.replace(/_/g, ' ') : project.sector}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <CardTitle className="mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {locale === 'ar' ? project.name_ar || project.name_en : project.name_en || project.name_ar}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-secondary-500 mb-4">
                  {(project.location_en || project.location_ar) && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                      {locale === 'ar' ? project.location_ar || project.location_en : project.location_en || project.location_ar}
                    </div>
                  )}
                  {project.year && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                      {project.year}
                    </div>
                  )}
                </div>
                <Link href={`/${locale}/projects/${project.id}`}>
                  <span className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium">
                    {dictionary.projects.viewDetails}
                    <ArrowRight className="ml-1 rtl:mr-1 rtl:ml-0 h-4 w-4" />
                  </span>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={`/${locale}/projects`}>
            <Button as="span" size="lg">
              {dictionary.projects.all}
              <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}