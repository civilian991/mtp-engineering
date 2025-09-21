'use client'

import { useState, useEffect } from 'react'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Download, FileText, FileBadge, FileCheck, Presentation, Book, ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string }>
}

interface Resource {
  category: string
  categoryAr: string
  icon: any
  items: {
    title: string
    titleAr: string
    description: string
    descriptionAr: string
    fileSize: string
    format: string
    downloadUrl: string
  }[]
}

export default function ResourcesPage({ params }: Props) {
  const [locale, setLocale] = useState<string>('en')
  const [isRTL, setIsRTL] = useState(false)
  const [dictionary, setDictionary] = useState<any>(null)

  useEffect(() => {
    params.then((p) => {
      setLocale(p.locale)
      setIsRTL(p.locale === 'ar')
      getDictionary(p.locale as Locale).then(setDictionary)
    })
  }, [params])

  if (!dictionary) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const resources: Resource[] = [
    {
      category: 'Company Profile',
      categoryAr: 'ملف الشركة',
      icon: FileText,
      items: [
        {
          title: 'MTP Engineering Company Profile 2025',
          titleAr: 'ملف شركة MTP الهندسية 2025',
          description: 'Comprehensive overview of our services, projects, and capabilities',
          descriptionAr: 'نظرة شاملة على خدماتنا ومشاريعنا وقدراتنا',
          fileSize: '15.2 MB',
          format: 'PDF',
          downloadUrl: '/downloads/mtp-company-profile-2025.pdf',
        },
        {
          title: 'Executive Summary',
          titleAr: 'الملخص التنفيذي',
          description: 'Quick overview of MTP Engineering for executives',
          descriptionAr: 'نظرة عامة سريعة على MTP الهندسية للمديرين التنفيذيين',
          fileSize: '2.8 MB',
          format: 'PDF',
          downloadUrl: '/downloads/executive-summary.pdf',
        },
      ],
    },
    {
      category: 'Service Brochures',
      categoryAr: 'كتيبات الخدمات',
      icon: Book,
      items: [
        {
          title: 'Civil Engineering Services',
          titleAr: 'خدمات الهندسة المدنية',
          description: 'Detailed information about our civil engineering capabilities',
          descriptionAr: 'معلومات مفصلة عن قدراتنا في الهندسة المدنية',
          fileSize: '5.4 MB',
          format: 'PDF',
          downloadUrl: '/downloads/civil-engineering-brochure.pdf',
        },
        {
          title: 'Infrastructure Development',
          titleAr: 'تطوير البنية التحتية',
          description: 'Our infrastructure development services and expertise',
          descriptionAr: 'خدماتنا وخبراتنا في تطوير البنية التحتية',
          fileSize: '6.1 MB',
          format: 'PDF',
          downloadUrl: '/downloads/infrastructure-brochure.pdf',
        },
        {
          title: 'Project Management Services',
          titleAr: 'خدمات إدارة المشاريع',
          description: 'Complete guide to our project management methodology',
          descriptionAr: 'دليل كامل لمنهجية إدارة المشاريع لدينا',
          fileSize: '4.8 MB',
          format: 'PDF',
          downloadUrl: '/downloads/project-management-brochure.pdf',
        },
        {
          title: 'Environmental Engineering',
          titleAr: 'الهندسة البيئية',
          description: 'Sustainable and environmental engineering solutions',
          descriptionAr: 'الحلول الهندسية المستدامة والبيئية',
          fileSize: '5.9 MB',
          format: 'PDF',
          downloadUrl: '/downloads/environmental-engineering-brochure.pdf',
        },
      ],
    },
    {
      category: 'Certifications',
      categoryAr: 'الشهادات',
      icon: FileBadge,
      items: [
        {
          title: 'ISO 9001:2015 Certificate',
          titleAr: 'شهادة ISO 9001:2015',
          description: 'Quality Management System certification',
          descriptionAr: 'شهادة نظام إدارة الجودة',
          fileSize: '1.2 MB',
          format: 'PDF',
          downloadUrl: '/downloads/iso-9001-certificate.pdf',
        },
        {
          title: 'ISO 14001:2015 Certificate',
          titleAr: 'شهادة ISO 14001:2015',
          description: 'Environmental Management System certification',
          descriptionAr: 'شهادة نظام الإدارة البيئية',
          fileSize: '1.1 MB',
          format: 'PDF',
          downloadUrl: '/downloads/iso-14001-certificate.pdf',
        },
        {
          title: 'OHSAS 18001 Certificate',
          titleAr: 'شهادة OHSAS 18001',
          description: 'Occupational Health and Safety certification',
          descriptionAr: 'شهادة الصحة والسلامة المهنية',
          fileSize: '1.3 MB',
          format: 'PDF',
          downloadUrl: '/downloads/ohsas-18001-certificate.pdf',
        },
        {
          title: 'Saudi Engineering Council Registration',
          titleAr: 'تسجيل الهيئة السعودية للمهندسين',
          description: 'Official registration with Saudi Engineering Council',
          descriptionAr: 'التسجيل الرسمي لدى الهيئة السعودية للمهندسين',
          fileSize: '980 KB',
          format: 'PDF',
          downloadUrl: '/downloads/saudi-engineering-council.pdf',
        },
      ],
    },
    {
      category: 'Project Portfolios',
      categoryAr: 'ملفات المشاريع',
      icon: Presentation,
      items: [
        {
          title: 'Government Projects Portfolio',
          titleAr: 'ملف المشاريع الحكومية',
          description: 'Showcase of our government sector projects',
          descriptionAr: 'عرض لمشاريعنا في القطاع الحكومي',
          fileSize: '18.5 MB',
          format: 'PDF',
          downloadUrl: '/downloads/government-projects-portfolio.pdf',
        },
        {
          title: 'Oil & Gas Projects Portfolio',
          titleAr: 'ملف مشاريع النفط والغاز',
          description: 'Our experience in the oil and gas sector',
          descriptionAr: 'خبرتنا في قطاع النفط والغاز',
          fileSize: '22.3 MB',
          format: 'PDF',
          downloadUrl: '/downloads/oil-gas-portfolio.pdf',
        },
        {
          title: 'Infrastructure Projects Portfolio',
          titleAr: 'ملف مشاريع البنية التحتية',
          description: 'Major infrastructure projects completed',
          descriptionAr: 'مشاريع البنية التحتية الكبرى المنجزة',
          fileSize: '20.1 MB',
          format: 'PDF',
          downloadUrl: '/downloads/infrastructure-portfolio.pdf',
        },
      ],
    },
    {
      category: 'Technical Papers',
      categoryAr: 'الأوراق الفنية',
      icon: FileCheck,
      items: [
        {
          title: 'Sustainable Engineering Practices in Saudi Arabia',
          titleAr: 'ممارسات الهندسة المستدامة في المملكة العربية السعودية',
          description: 'White paper on sustainable engineering approaches',
          descriptionAr: 'ورقة بيضاء حول نهج الهندسة المستدامة',
          fileSize: '3.7 MB',
          format: 'PDF',
          downloadUrl: '/downloads/sustainable-engineering-paper.pdf',
        },
        {
          title: 'Innovation in Construction Technology',
          titleAr: 'الابتكار في تقنيات البناء',
          description: 'Latest innovations in construction technology',
          descriptionAr: 'أحدث الابتكارات في تقنيات البناء',
          fileSize: '4.2 MB',
          format: 'PDF',
          downloadUrl: '/downloads/construction-innovation-paper.pdf',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10" />
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-600/10 rounded-2xl">
                <Download className="h-16 w-16 text-primary-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {isRTL ? 'الموارد والتنزيلات' : 'Resources & Downloads'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {isRTL
                ? 'قم بتنزيل ملفات الشركة والكتيبات والشهادات والموارد الفنية'
                : 'Download company profiles, brochures, certifications, and technical resources'}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-400">
                {isRTL ? 'وثيقة متاحة' : 'Documents Available'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">6</div>
              <div className="text-gray-600 dark:text-gray-400">
                {isRTL ? 'فئات' : 'Categories'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-400">
                {isRTL ? 'تنزيلات' : 'Downloads'}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">2025</div>
              <div className="text-gray-600 dark:text-gray-400">
                {isRTL ? 'محدث' : 'Updated'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {resources.map((category, categoryIndex) => {
            const Icon = category.icon
            return (
              <div key={categoryIndex} className="mb-16">
                <div className="flex items-center mb-8">
                  <Icon className="h-8 w-8 text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {isRTL ? category.categoryAr : category.category}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="h-full hover:shadow-lg transition-shadow">
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {isRTL ? item.titleAr : item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {isRTL ? item.descriptionAr : item.description}
                          </p>
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {item.format} • {item.fileSize}
                            </span>
                          </div>
                          <Button
                            className="w-full"
                            variant="outline"
                            onClick={() => {
                              // In a real application, this would trigger a download
                              console.log(`Downloading: ${item.downloadUrl}`)
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            {isRTL ? 'تنزيل' : 'Download'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Request Custom Documents */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {isRTL
              ? 'هل تحتاج إلى وثائق مخصصة؟'
              : 'Need Custom Documents?'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {isRTL
              ? 'اتصل بنا للحصول على معلومات مخصصة أو وثائق خاصة بالمشروع'
              : 'Contact us for customized information or project-specific documentation'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/contact`}>
              <Button as="span" size="lg">
                {isRTL ? 'طلب وثائق مخصصة' : 'Request Custom Documents'}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button as="span" variant="outline" size="lg">
                {isRTL ? 'اتصل بفريق المبيعات' : 'Contact Sales Team'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}