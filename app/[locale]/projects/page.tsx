'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { Calendar, MapPin, Building2, TrendingUp, Loader2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react'
import ProjectSketch from '@/components/ProjectSketch'

interface Project {
  id: string
  name_en: string
  name_ar: string
  slug: string
  description_en?: string
  description_ar?: string
  client_name?: string
  location_en?: string
  location_ar?: string
  city?: string
  start_date?: string
  end_date?: string
  project_value?: number
  status?: string
  category?: string
  thumbnail_url?: string
  is_featured?: boolean
  completion_percentage?: number
}

export default function ProjectsPage() {
  const params = useParams()
  const locale = params.locale as Locale
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetchProjects()
    setIsVisible(true)
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      // Fetch only published projects for public view
      const response = await fetch('/api/projects?is_published=true')

      if (!response.ok) {
        throw new Error('Failed to fetch projects')
      }

      const data = await response.json()
      // Sort featured projects first, then by sort_order
      const sortedData = data
        .filter((p: Project) => p.status !== 'cancelled') // Don't show cancelled projects
        .sort((a: Project, b: Project) => {
          if (a.is_featured && !b.is_featured) return -1
          if (!a.is_featured && b.is_featured) return 1
          return 0
        })

      setProjects(sortedData)
      setError(null)
    } catch (err) {
      console.error('Error fetching projects:', err)
      setError('Failed to load projects. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Get unique categories and statuses for filtering
  const categories = [...new Set(projects.map(p => p.category).filter(Boolean))]
  const statuses = [...new Set(projects.map(p => p.status).filter(Boolean))]

  // Filter projects based on selected filters
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus
    return matchesCategory && matchesStatus
  })

  const getProjectYear = (startDate?: string, endDate?: string) => {
    if (startDate && endDate) {
      const start = new Date(startDate).getFullYear()
      const end = new Date(endDate).getFullYear()
      return start === end ? `${start}` : `${start}-${end}`
    } else if (startDate) {
      return new Date(startDate).getFullYear().toString()
    }
    return 'Ongoing'
  }

  // Generate unique variant (1-20) based on project ID for consistency
  const generateVariant = (id: string): number => {
    let hash = 0
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i)
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash % 20) + 1
  }

  const getStatusBadge = (status?: string) => {
    const statusColors: Record<string, string> = {
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      ongoing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      planned: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'on-hold': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    }

    if (!status) return null

    return (
      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${statusColors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    )
  }

  const formatProjectValue = (value?: number) => {
    if (!value) return null
    return `${(value / 1000000).toFixed(0)}M SAR`
  }

  const content = {
    en: {
      title: 'Our Projects',
      subtitle: 'Delivering excellence in engineering and construction across the Kingdom',
      filterCategory: 'Category',
      filterStatus: 'Status',
      allCategories: 'All Categories',
      allStatuses: 'All Status',
      viewDetails: 'View Details',
      projectValue: 'Project Value',
      completion: 'Completion',
      featured: 'Featured',
      noProjects: 'No projects found',
      loadingProjects: 'Loading projects...',
      errorLoading: 'Error loading projects',
      tryAgain: 'Try Again',
      totalProjects: 'Total Projects'
    },
    ar: {
      title: 'مشاريعنا',
      subtitle: 'تقديم التميز في الهندسة والبناء في جميع أنحاء المملكة',
      filterCategory: 'الفئة',
      filterStatus: 'الحالة',
      allCategories: 'جميع الفئات',
      allStatuses: 'جميع الحالات',
      viewDetails: 'عرض التفاصيل',
      projectValue: 'قيمة المشروع',
      completion: 'الإنجاز',
      featured: 'مميز',
      noProjects: 'لم يتم العثور على مشاريع',
      loadingProjects: 'جاري تحميل المشاريع...',
      errorLoading: 'خطأ في تحميل المشاريع',
      tryAgain: 'حاول مرة أخرى',
      totalProjects: 'إجمالي المشاريع'
    }
  }

  const t = content[locale]

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
              <p className="text-gray-400">{t.loadingProjects}</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col items-center gap-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <p className="text-gray-400">{t.errorLoading}</p>
              <button
                onClick={fetchProjects}
                className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-gold-500/30 transition-all"
              >
                {t.tryAgain}
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 35px, #C9A646 35px, #C9A646 36px),
                             repeating-linear-gradient(0deg, transparent, transparent 35px, #C9A646 35px, #C9A646 36px)`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-gold-500 text-sm font-bold uppercase tracking-[0.3em] bg-gold-500/10 px-4 py-2 rounded-full border border-gold-500/30 inline-block mb-6">
              {locale === 'ar' ? 'محفظتنا' : 'Our Portfolio'}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              {locale === 'ar' ? 'مشاريعنا' : 'Our'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">
                {locale === 'ar' ? 'المميزة' : 'Projects'}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t.subtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {[
                { number: filteredProjects.length.toString(), label: { en: 'Total Projects', ar: 'إجمالي المشاريع' } },
                { number: filteredProjects.filter(p => p.is_featured).length.toString(), label: { en: 'Featured', ar: 'مميز' } },
                { number: categories.length.toString(), label: { en: 'Categories', ar: 'فئات' } },
                { number: filteredProjects.filter(p => p.status === 'ongoing').length.toString(), label: { en: 'Ongoing', ar: 'جاري' } }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400 mb-2">
                    {stat.number}
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label[locale]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-400">{t.filterCategory}:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all"
              >
                <option value="all">{t.allCategories}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-400">{t.filterStatus}:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all"
              >
                <option value="all">{t.allStatuses}</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status ? status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ') : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <Building2 className="h-16 w-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">{t.noProjects}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold-500/30 transition-all duration-700 hover:-translate-y-3 border border-gray-800 hover:border-gold-500/50"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Featured Badge */}
                  {project.is_featured && (
                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-gold-600 to-gold-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {t.featured}
                    </div>
                  )}

                  {/* Status Badge */}
                  {project.status && (
                    <div className="absolute top-4 right-4 z-10">
                      {getStatusBadge(project.status)}
                    </div>
                  )}

                  {/* Project Image */}
                  <div className="relative h-64 bg-gray-800 overflow-hidden">
                    {project.thumbnail_url ? (
                      <Image
                        src={project.thumbnail_url}
                        alt={locale === 'ar' ? project.name_ar : project.name_en}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
                        <div className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out w-full h-full">
                          <ProjectSketch variant={generateVariant(project.id)} className="w-full h-full" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 relative">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-500 transition-colors">
                      {locale === 'ar' ? project.name_ar : project.name_en}
                    </h3>

                    {(project.description_en || project.description_ar) && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {locale === 'ar' ? project.description_ar : project.description_en}
                      </p>
                    )}

                    <div className="space-y-2 text-sm text-gray-400">
                      {project.category && (
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gold-500" />
                          <span>{project.category}</span>
                        </div>
                      )}

                      {project.city && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gold-500" />
                          <span>{project.city}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gold-500" />
                        <span>{getProjectYear(project.start_date, project.end_date)}</span>
                      </div>

                      {project.project_value && (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-gold-500" />
                          <span className="text-gold-500 font-semibold">{formatProjectValue(project.project_value)}</span>
                        </div>
                      )}

                      {project.completion_percentage !== undefined && project.completion_percentage > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-800">
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-gray-500">{t.completion}</span>
                            <span className="text-gold-500 font-bold">{project.completion_percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-gold-600 to-gold-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.completion_percentage}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/${locale}/projects/${project.slug || project.id}`}
                      className="group/btn relative inline-flex items-center justify-center w-full mt-6 py-2 text-sm font-bold text-gold-500 border border-gold-500/50 rounded-lg overflow-hidden transition-all duration-500 hover:text-black"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></span>
                      <span className="relative flex items-center gap-2">
                        {t.viewDetails}
                        <ArrowRight className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gold-500/5 to-transparent"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            {locale === 'ar' ? 'هل لديك مشروع في الاعتبار؟' : 'Have a Project in Mind?'}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {locale === 'ar'
              ? 'دعنا نساعدك في تحويل رؤيتك إلى واقع'
              : "Let us help you turn your vision into reality"
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative">
                {locale === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
              </span>
            </Link>
            <Link
              href={`/${locale}/about`}
              className="group relative inline-flex items-center gap-3 bg-transparent border-2 border-gold-500/50 text-gold-500 font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:border-gold-500 hover:bg-gold-500/10 hover:scale-105"
            >
              {locale === 'ar' ? 'تعرف على المزيد' : 'Learn More'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
