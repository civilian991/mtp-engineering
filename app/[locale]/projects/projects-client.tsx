'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Filter, MapPin, Calendar, Building } from 'lucide-react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { Locale } from '@/lib/i18n'

interface ProjectsClientProps {
  locale: Locale
  dictionary: any
}

// Mock data - will be replaced with Supabase data
const mockProjects = [
  {
    id: '1',
    name_en: 'King Abdulaziz International Airport Expansion',
    name_ar: 'توسعة مطار الملك عبدالعزيز الدولي',
    location_en: 'Jeddah',
    location_ar: 'جدة',
    year: '2023',
    sector: 'infrastructure',
    status: 'completed',
    is_legacy: false,
  },
  {
    id: '2',
    name_en: 'Riyadh Metro Line 3',
    name_ar: 'مترو الرياض الخط الثالث',
    location_en: 'Riyadh',
    location_ar: 'الرياض',
    year: '2022',
    sector: 'infrastructure',
    status: 'ongoing',
    is_legacy: false,
  },
  {
    id: '3',
    name_en: 'NEOM Smart City Infrastructure',
    name_ar: 'البنية التحتية لمدينة نيوم الذكية',
    location_en: 'NEOM',
    location_ar: 'نيوم',
    year: '2024',
    sector: 'government',
    status: 'ongoing',
    is_legacy: false,
  },
  {
    id: '4',
    name_en: 'Al Faisaliah Tower Foundation',
    name_ar: 'أساسات برج الفيصلية',
    location_en: 'Riyadh',
    location_ar: 'الرياض',
    year: '1997',
    sector: 'real_estate',
    status: 'completed',
    is_legacy: true,
  },
]

export default function ProjectsClient({ locale, dictionary }: ProjectsClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSector, setSelectedSector] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [showLegacy, setShowLegacy] = useState(true)

  const sectorOptions = [
    { value: 'all', label: locale === 'ar' ? 'جميع القطاعات' : 'All Sectors' },
    { value: 'government', label: locale === 'ar' ? 'القطاع الحكومي' : 'Government' },
    { value: 'infrastructure', label: locale === 'ar' ? 'البنية التحتية' : 'Infrastructure' },
    { value: 'real_estate', label: locale === 'ar' ? 'العقارات' : 'Real Estate' },
  ]

  const statusOptions = [
    { value: 'all', label: locale === 'ar' ? 'جميع الحالات' : 'All Status' },
    { value: 'completed', label: dictionary.projects.status.completed },
    { value: 'ongoing', label: dictionary.projects.status.ongoing },
    { value: 'planned', label: dictionary.projects.status.planned },
  ]

  const yearOptions = [
    { value: 'all', label: locale === 'ar' ? 'جميع السنوات' : 'All Years' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: 'legacy', label: locale === 'ar' ? 'مشاريع سابقة (قبل 2020)' : 'Legacy (Before 2020)' },
  ]

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const nameMatch = searchQuery === '' ||
        project.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.name_ar.includes(searchQuery)

      const sectorMatch = selectedSector === 'all' || project.sector === selectedSector
      const statusMatch = selectedStatus === 'all' || project.status === selectedStatus

      let yearMatch = true
      if (selectedYear !== 'all') {
        if (selectedYear === 'legacy') {
          yearMatch = parseInt(project.year) < 2020
        } else {
          yearMatch = project.year === selectedYear
        }
      }

      const legacyMatch = showLegacy || !project.is_legacy

      return nameMatch && sectorMatch && statusMatch && yearMatch && legacyMatch
    })
  }, [searchQuery, selectedSector, selectedStatus, selectedYear, showLegacy])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="lg:col-span-full">
            <div className="relative">
              <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder={locale === 'ar' ? 'البحث عن مشروع...' : 'Search projects...'}
                className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Select
            label={dictionary.projects.sector}
            options={sectorOptions}
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          />

          <Select
            label={locale === 'ar' ? 'الحالة' : 'Status'}
            options={statusOptions}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          />

          <Select
            label={dictionary.projects.year}
            options={yearOptions}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />

          <div className="flex items-end">
            <Button
              variant={showLegacy ? 'primary' : 'outline'}
              onClick={() => setShowLegacy(!showLegacy)}
              className="w-full"
            >
              <Filter className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {showLegacy
                ? locale === 'ar' ? 'إخفاء المشاريع السابقة' : 'Hide Legacy Projects'
                : locale === 'ar' ? 'عرض المشاريع السابقة' : 'Show Legacy Projects'}
            </Button>
          </div>
        </div>

        <div className="text-sm text-secondary-600">
          {locale === 'ar'
            ? `عرض ${filteredProjects.length} مشروع من أصل ${mockProjects.length}`
            : `Showing ${filteredProjects.length} of ${mockProjects.length} projects`}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} variant="bordered" className="hover:shadow-lg transition-shadow">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 h-48"></div>

            <h3 className="text-xl font-semibold text-secondary-900 mb-3">
              {locale === 'ar' ? project.name_ar : project.name_en}
            </h3>

            <div className="space-y-2 text-sm text-secondary-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-secondary-400" />
                {locale === 'ar' ? project.location_ar : project.location_en}
              </div>

              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-secondary-400" />
                {project.year}
              </div>

              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-secondary-400" />
                {sectorOptions.find(s => s.value === project.sector)?.label}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                project.status === 'completed'
                  ? 'bg-success/10 text-success'
                  : project.status === 'ongoing'
                  ? 'bg-warning/10 text-warning'
                  : 'bg-info/10 text-info'
              }`}>
                {statusOptions.find(s => s.value === project.status)?.label}
              </span>

              {project.is_legacy && (
                <span className="text-xs text-secondary-500 italic">
                  {locale === 'ar' ? 'مشروع سابق' : 'Legacy Project'}
                </span>
              )}
            </div>

            <Link href={`/${locale}/projects/${project.id}`} className="block mt-4">
              <Button as="span" variant="outline" size="sm" className="w-full">
                {locale === 'ar' ? 'عرض التفاصيل' : 'View Details'} →
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-secondary-600">
            {locale === 'ar' ? 'لم يتم العثور على مشاريع مطابقة' : 'No projects found matching your criteria'}
          </p>
        </div>
      )}
    </div>
  )
}