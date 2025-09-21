import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Map, ChevronRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isRTL = locale === 'ar'

  return {
    title: isRTL ? 'خريطة الموقع | MTP Engineering' : 'Sitemap | MTP Engineering',
    description: isRTL
      ? 'تصفح جميع صفحات وأقسام موقع MTP Engineering'
      : 'Browse all pages and sections of MTP Engineering website',
  }
}

export default async function SitemapPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const sitemapSections = [
    {
      title: isRTL ? 'الشركة' : 'Company',
      links: [
        { name: isRTL ? 'الصفحة الرئيسية' : 'Home', url: `/${locale}` },
        { name: isRTL ? 'من نحن' : 'About Us', url: `/${locale}/about` },
        { name: isRTL ? 'الفريق' : 'Team', url: `/${locale}/about/team` },
        { name: isRTL ? 'الوظائف' : 'Careers', url: `/${locale}/careers` },
        { name: isRTL ? 'اتصل بنا' : 'Contact', url: `/${locale}/contact` },
      ],
    },
    {
      title: isRTL ? 'الخدمات' : 'Services',
      links: [
        { name: isRTL ? 'جميع الخدمات' : 'All Services', url: `/${locale}/services` },
        { name: isRTL ? 'الهندسة المدنية' : 'Civil Engineering', url: `/${locale}/services/civil-engineering` },
        { name: isRTL ? 'تطوير البنية التحتية' : 'Infrastructure Development', url: `/${locale}/services/infrastructure` },
        { name: isRTL ? 'إدارة المشاريع' : 'Project Management', url: `/${locale}/services/project-management` },
        { name: isRTL ? 'الاستشارات الفنية' : 'Technical Consulting', url: `/${locale}/services/consulting` },
        { name: isRTL ? 'الهندسة البيئية' : 'Environmental Engineering', url: `/${locale}/services/environmental` },
        { name: isRTL ? 'ضمان الجودة' : 'Quality Assurance', url: `/${locale}/services/quality-assurance` },
      ],
    },
    {
      title: isRTL ? 'القطاعات' : 'Sectors',
      links: [
        { name: isRTL ? 'جميع القطاعات' : 'All Sectors', url: `/${locale}/sectors` },
        { name: isRTL ? 'القطاع الحكومي' : 'Government', url: `/${locale}/sectors/government` },
        { name: isRTL ? 'النفط والغاز' : 'Oil & Gas', url: `/${locale}/sectors/oil-gas` },
        { name: isRTL ? 'النقل' : 'Transportation', url: `/${locale}/sectors/transportation` },
        { name: isRTL ? 'الرعاية الصحية' : 'Healthcare', url: `/${locale}/sectors/healthcare` },
        { name: isRTL ? 'التعليم' : 'Education', url: `/${locale}/sectors/education` },
        { name: isRTL ? 'التجاري والسكني' : 'Commercial & Residential', url: `/${locale}/sectors/commercial-residential` },
        { name: isRTL ? 'الصناعي' : 'Industrial', url: `/${locale}/sectors/industrial` },
        { name: isRTL ? 'المرافق' : 'Utilities', url: `/${locale}/sectors/utilities` },
      ],
    },
    {
      title: isRTL ? 'المشاريع' : 'Projects',
      links: [
        { name: isRTL ? 'جميع المشاريع' : 'All Projects', url: `/${locale}/projects` },
        { name: isRTL ? 'المشاريع الحديثة' : 'Recent Projects', url: `/${locale}/projects/recent` },
        { name: isRTL ? 'المشاريع السابقة' : 'Legacy Projects', url: `/${locale}/projects/legacy` },
      ],
    },
    {
      title: isRTL ? 'الموارد' : 'Resources',
      links: [
        { name: isRTL ? 'التنزيلات' : 'Downloads', url: `/${locale}/resources` },
        { name: isRTL ? 'البحث' : 'Search', url: `/${locale}/search` },
        { name: isRTL ? 'خريطة الموقع' : 'Sitemap', url: `/${locale}/sitemap` },
      ],
    },
    {
      title: isRTL ? 'القانوني' : 'Legal',
      links: [
        { name: isRTL ? 'سياسة الخصوصية' : 'Privacy Policy', url: `/${locale}/privacy` },
        { name: isRTL ? 'شروط الاستخدام' : 'Terms of Use', url: `/${locale}/terms` },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-600/10 rounded-2xl">
                <Map className="h-16 w-16 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'خريطة الموقع' : 'Sitemap'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'دليل شامل لجميع صفحات وأقسام موقعنا'
                : 'A comprehensive guide to all pages and sections of our website'}
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sitemapSections.map((section, index) => (
              <Card key={index} className="h-full">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.url}
                          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors"
                        >
                          <ChevronRight className={`h-4 w-4 mr-2 text-gray-400 ${isRTL ? 'rotate-180' : ''}`} />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Language Switcher Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {isRTL ? 'تبديل اللغة' : 'Language Options'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {isRTL
              ? 'هذا الموقع متاح باللغتين العربية والإنجليزية'
              : 'This website is available in both English and Arabic'}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/en/sitemap"
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                !isRTL
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              English
            </Link>
            <Link
              href="/ar/sitemap"
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isRTL
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              العربية
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">
                {isRTL ? 'صفحة' : 'Pages'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">6</div>
              <div className="text-gray-600 dark:text-gray-400">
                {isRTL ? 'خدمات' : 'Services'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">8</div>
              <div className="text-gray-600 dark:text-gray-400">
                {isRTL ? 'قطاعات' : 'Sectors'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">2</div>
              <div className="text-gray-600 dark:text-gray-400">
                {isRTL ? 'لغات' : 'Languages'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}