'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, FileText, Building, Users, Briefcase, ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

type SearchResult = {
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  url: string
  category: string
  categoryAr: string
  icon: any
}

type Props = {
  params: Promise<{ locale: string }>
}

export default function SearchPage({ params }: Props) {
  const [locale, setLocale] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const getLocale = async () => {
      const { locale: paramLocale } = await params
      setLocale(paramLocale)
    }
    getLocale()
  }, [params])

  const isRTL = locale === 'ar'

  // Sample search data - in a real app, this would come from a database or search service
  const searchableContent: SearchResult[] = [
    // Services
    {
      title: 'Civil Engineering',
      titleAr: 'الهندسة المدنية',
      description: 'Structural design, foundation engineering, bridge and highway design',
      descriptionAr: 'التصميم الإنشائي وهندسة الأساسات وتصميم الجسور والطرق السريعة',
      url: `/${locale}/services/civil-engineering`,
      category: 'Services',
      categoryAr: 'الخدمات',
      icon: Building,
    },
    {
      title: 'Infrastructure Development',
      titleAr: 'تطوير البنية التحتية',
      description: 'Transportation systems, utility networks, urban planning',
      descriptionAr: 'أنظمة النقل وشبكات المرافق والتخطيط العمراني',
      url: `/${locale}/services/infrastructure`,
      category: 'Services',
      categoryAr: 'الخدمات',
      icon: Building,
    },
    {
      title: 'Project Management',
      titleAr: 'إدارة المشاريع',
      description: 'Planning, cost control, risk management, construction supervision',
      descriptionAr: 'التخطيط والتحكم في التكاليف وإدارة المخاطر والإشراف على البناء',
      url: `/${locale}/services/project-management`,
      category: 'Services',
      categoryAr: 'الخدمات',
      icon: Briefcase,
    },
    // Sectors
    {
      title: 'Government Sector',
      titleAr: 'القطاع الحكومي',
      description: 'Ministries, agencies, and public infrastructure projects',
      descriptionAr: 'الوزارات والهيئات ومشاريع البنية التحتية العامة',
      url: `/${locale}/sectors/government`,
      category: 'Sectors',
      categoryAr: 'القطاعات',
      icon: Building,
    },
    {
      title: 'Oil & Gas',
      titleAr: 'النفط والغاز',
      description: 'Refineries, pipelines, and processing facilities',
      descriptionAr: 'المصافي وخطوط الأنابيب ومرافق المعالجة',
      url: `/${locale}/sectors/oil-gas`,
      category: 'Sectors',
      categoryAr: 'القطاعات',
      icon: Building,
    },
    {
      title: 'Transportation',
      titleAr: 'النقل',
      description: 'Airports, seaports, railways, and highways',
      descriptionAr: 'المطارات والموانئ والسكك الحديدية والطرق السريعة',
      url: `/${locale}/sectors/transportation`,
      category: 'Sectors',
      categoryAr: 'القطاعات',
      icon: Building,
    },
    {
      title: 'Healthcare',
      titleAr: 'الرعاية الصحية',
      description: 'Hospitals, medical cities, and clinics',
      descriptionAr: 'المستشفيات والمدن الطبية والعيادات',
      url: `/${locale}/sectors/healthcare`,
      category: 'Sectors',
      categoryAr: 'القطاعات',
      icon: Building,
    },
    // Pages
    {
      title: 'About Us',
      titleAr: 'من نحن',
      description: 'Learn about MTP Engineering history and values',
      descriptionAr: 'تعرف على تاريخ وقيم MTP الهندسية',
      url: `/${locale}/about`,
      category: 'Company',
      categoryAr: 'الشركة',
      icon: Users,
    },
    {
      title: 'Projects',
      titleAr: 'المشاريع',
      description: 'Browse our portfolio of completed projects',
      descriptionAr: 'تصفح محفظة مشاريعنا المكتملة',
      url: `/${locale}/projects`,
      category: 'Portfolio',
      categoryAr: 'المحفظة',
      icon: FileText,
    },
    {
      title: 'Careers',
      titleAr: 'الوظائف',
      description: 'Join our team and grow your career',
      descriptionAr: 'انضم إلى فريقنا وطور مسيرتك المهنية',
      url: `/${locale}/careers`,
      category: 'Company',
      categoryAr: 'الشركة',
      icon: Users,
    },
    {
      title: 'Contact',
      titleAr: 'اتصل بنا',
      description: 'Get in touch with our team',
      descriptionAr: 'تواصل مع فريقنا',
      url: `/${locale}/contact`,
      category: 'Company',
      categoryAr: 'الشركة',
      icon: Users,
    },
  ]

  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setSearchTerm(query)
      performSearch(query)
    }
  }, [searchParams])

  const performSearch = (term: string) => {
    setIsSearching(true)

    // Simulate search delay
    setTimeout(() => {
      const results = searchableContent.filter(item => {
        const searchIn = isRTL
          ? `${item.titleAr} ${item.descriptionAr} ${item.categoryAr}`.toLowerCase()
          : `${item.title} ${item.description} ${item.category}`.toLowerCase()
        return searchIn.includes(term.toLowerCase())
      })

      setSearchResults(results)
      setIsSearching(false)
    }, 300)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchTerm)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Services':
        return 'text-blue-600 bg-blue-50'
      case 'Sectors':
        return 'text-green-600 bg-green-50'
      case 'Company':
        return 'text-purple-600 bg-purple-50'
      case 'Portfolio':
        return 'text-orange-600 bg-orange-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10" />
        <div className="container mx-auto max-w-4xl relative">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-600/10 rounded-2xl">
                <Search className="h-12 w-12 text-primary-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'البحث في الموقع' : 'Search'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {isRTL
                ? 'ابحث عن الخدمات والمشاريع والمعلومات'
                : 'Find services, projects, and information'}
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isRTL ? 'ابحث هنا...' : 'Search here...'}
                className="w-full px-6 py-4 pr-12 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-primary-600"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {isSearching ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {isRTL ? 'جاري البحث...' : 'Searching...'}
              </p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  {isRTL
                    ? `تم العثور على ${searchResults.length} نتيجة`
                    : `Found ${searchResults.length} results`}
                </p>
              </div>
              <div className="grid gap-6">
                {searchResults.map((result, index) => {
                  const Icon = result.icon
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <Link href={result.url}>
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <Icon className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-primary-600 transition-colors">
                                  {isRTL ? result.titleAr : result.title}
                                </h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(result.category)}`}>
                                  {isRTL ? result.categoryAr : result.category}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 mb-3">
                                {isRTL ? result.descriptionAr : result.description}
                              </p>
                              <div className="flex items-center text-primary-600 hover:text-primary-700">
                                <span className="text-sm font-medium">
                                  {isRTL ? 'عرض المزيد' : 'View More'}
                                </span>
                                <ArrowRight className={`h-4 w-4 ml-1 ${isRTL ? 'rotate-180' : ''}`} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  )
                })}
              </div>
            </>
          ) : searchTerm ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <Search className="h-16 w-16 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {isRTL ? 'لم يتم العثور على نتائج' : 'No results found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {isRTL
                  ? 'حاول البحث بكلمات مختلفة'
                  : 'Try searching with different keywords'}
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">
                {isRTL
                  ? 'ابدأ البحث للعثور على ما تحتاجه'
                  : 'Start searching to find what you need'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {isRTL ? 'روابط سريعة' : 'Quick Links'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href={`/${locale}/services`}>
              <Button variant="outline" className="w-full">
                {isRTL ? 'الخدمات' : 'Services'}
              </Button>
            </Link>
            <Link href={`/${locale}/projects`}>
              <Button variant="outline" className="w-full">
                {isRTL ? 'المشاريع' : 'Projects'}
              </Button>
            </Link>
            <Link href={`/${locale}/sectors`}>
              <Button variant="outline" className="w-full">
                {isRTL ? 'القطاعات' : 'Sectors'}
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button variant="outline" className="w-full">
                {isRTL ? 'اتصل بنا' : 'Contact'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}