import ProjectsClient from './projects-client'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'ar' ? 'المشاريع | MTP للاستشارات الهندسية' : 'Projects | MTP Engineering Consultants',
    description: locale === 'ar'
      ? 'استكشف مجموعة مشاريعنا الهندسية المتنوعة في المملكة العربية السعودية'
      : 'Explore our diverse portfolio of engineering projects across Saudi Arabia',
  }
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            {dictionary.projects.title}
          </h1>
          <p className="text-lg text-secondary-600">
            {locale === 'ar'
              ? 'أكثر من 500 مشروع منجز بنجاح منذ عام 1980'
              : 'Over 500 projects successfully completed since 1980'}
          </p>
        </div>
      </div>
      <ProjectsClient locale={locale as Locale} dictionary={dictionary} />
    </div>
  )
}