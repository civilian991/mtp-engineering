import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'ar' ? 'الوظائف | MTP للاستشارات الهندسية' : 'Careers | MTP Engineering Consultants',
    description: locale === 'ar'
      ? 'انضم إلى فريقنا من المهندسين والخبراء المحترفين'
      : 'Join our team of professional engineers and experts',
  }
}

// Mock data - will be replaced with Supabase query
const mockJobs = [
  {
    id: '1',
    title_en: 'Senior Civil Engineer',
    title_ar: 'مهندس مدني أول',
    department_en: 'Civil Engineering',
    department_ar: 'الهندسة المدنية',
    location_en: 'Riyadh',
    location_ar: 'الرياض',
    employment_type: 'full-time',
    experience_level: 'senior',
    salary_range_min: 15000,
    salary_range_max: 25000,
    posted_date: '2024-01-15',
    is_active: true,
  },
  {
    id: '2',
    title_en: 'Project Manager',
    title_ar: 'مدير مشروع',
    department_en: 'Project Management',
    department_ar: 'إدارة المشاريع',
    location_en: 'Jeddah',
    location_ar: 'جدة',
    employment_type: 'full-time',
    experience_level: 'senior',
    salary_range_min: 20000,
    salary_range_max: 30000,
    posted_date: '2024-01-10',
    is_active: true,
  },
  {
    id: '3',
    title_en: 'Junior Structural Engineer',
    title_ar: 'مهندس إنشائي مبتدئ',
    department_en: 'Structural Engineering',
    department_ar: 'الهندسة الإنشائية',
    location_en: 'Riyadh',
    location_ar: 'الرياض',
    employment_type: 'full-time',
    experience_level: 'entry',
    salary_range_min: 8000,
    salary_range_max: 12000,
    posted_date: '2024-01-20',
    is_active: true,
  },
  {
    id: '4',
    title_en: 'CAD Technician',
    title_ar: 'فني CAD',
    department_en: 'Design',
    department_ar: 'التصميم',
    location_en: 'Dammam',
    location_ar: 'الدمام',
    employment_type: 'full-time',
    experience_level: 'mid',
    salary_range_min: 7000,
    salary_range_max: 10000,
    posted_date: '2024-01-18',
    is_active: true,
  },
]

export default async function CareersPage({ params }: Props) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  const employmentTypes: Record<string, string> = {
    'full-time': locale === 'ar' ? 'دوام كامل' : 'Full Time',
    'part-time': locale === 'ar' ? 'دوام جزئي' : 'Part Time',
    'contract': locale === 'ar' ? 'عقد' : 'Contract',
    'internship': locale === 'ar' ? 'تدريب' : 'Internship',
  }

  const experienceLevels: Record<string, string> = {
    'entry': locale === 'ar' ? 'مبتدئ' : 'Entry Level',
    'mid': locale === 'ar' ? 'متوسط' : 'Mid Level',
    'senior': locale === 'ar' ? 'خبير' : 'Senior Level',
    'executive': locale === 'ar' ? 'تنفيذي' : 'Executive',
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {dictionary.careers.title}
            </h1>
            <p className="text-xl opacity-90 mb-8">
              {locale === 'ar'
                ? 'انضم إلى فريقنا وكن جزءًا من رحلة التميز الهندسي'
                : 'Join our team and be part of our engineering excellence journey'}
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">100+</div>
                <div className="opacity-80">
                  {locale === 'ar' ? 'موظف' : 'Employees'}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">40+</div>
                <div className="opacity-80">
                  {locale === 'ar' ? 'سنة خبرة' : 'Years Experience'}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">5</div>
                <div className="opacity-80">
                  {locale === 'ar' ? 'مكاتب' : 'Offices'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-secondary-900">
              {locale === 'ar' ? 'لماذا تنضم إلينا؟' : 'Why Join Us?'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4 rtl:mr-4 rtl:ml-0">
                  <h3 className="font-semibold text-lg mb-2 text-secondary-900">
                    {locale === 'ar' ? 'مشاريع متنوعة' : 'Diverse Projects'}
                  </h3>
                  <p className="text-secondary-600">
                    {locale === 'ar'
                      ? 'العمل على مشاريع كبرى ومتنوعة في جميع أنحاء المملكة'
                      : 'Work on major and diverse projects across the Kingdom'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4 rtl:mr-4 rtl:ml-0">
                  <h3 className="font-semibold text-lg mb-2 text-secondary-900">
                    {locale === 'ar' ? 'التوازن بين العمل والحياة' : 'Work-Life Balance'}
                  </h3>
                  <p className="text-secondary-600">
                    {locale === 'ar'
                      ? 'ساعات عمل مرنة وبيئة عمل صحية'
                      : 'Flexible working hours and healthy work environment'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4 rtl:mr-4 rtl:ml-0">
                  <h3 className="font-semibold text-lg mb-2 text-secondary-900">
                    {locale === 'ar' ? 'مزايا تنافسية' : 'Competitive Benefits'}
                  </h3>
                  <p className="text-secondary-600">
                    {locale === 'ar'
                      ? 'رواتب تنافسية وتأمين صحي شامل'
                      : 'Competitive salaries and comprehensive health insurance'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4 rtl:mr-4 rtl:ml-0">
                  <h3 className="font-semibold text-lg mb-2 text-secondary-900">
                    {locale === 'ar' ? 'مواقع متعددة' : 'Multiple Locations'}
                  </h3>
                  <p className="text-secondary-600">
                    {locale === 'ar'
                      ? 'فرص عمل في الرياض وجدة والدمام'
                      : 'Opportunities in Riyadh, Jeddah, and Dammam'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-secondary-900">
            {dictionary.careers.openings}
          </h2>

          <div className="max-w-5xl mx-auto space-y-4">
            {mockJobs.map((job) => (
              <Card key={job.id} variant="bordered" className="hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                      {locale === 'ar' ? job.title_ar : job.title_en}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-secondary-600">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {locale === 'ar' ? job.department_ar : job.department_en}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {locale === 'ar' ? job.location_ar : job.location_en}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {employmentTypes[job.employment_type]}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                        {job.salary_range_min}-{job.salary_range_max} SAR
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                        {experienceLevels[job.experience_level]}
                      </span>
                      <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium">
                        {locale === 'ar' ? 'منذ ' : 'Posted '}
                        {new Date(job.posted_date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 rtl:md:mr-6 rtl:md:ml-0">
                    <Link href={`/${locale}/careers/${job.id}/apply`}>
                      <Button variant="primary">
                        {dictionary.careers.apply}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {mockJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-secondary-600">
                {locale === 'ar'
                  ? 'لا توجد وظائف شاغرة حاليًا. يرجى التحقق لاحقًا.'
                  : 'No open positions currently. Please check back later.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}