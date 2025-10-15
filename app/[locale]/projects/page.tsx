'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { Calendar, MapPin, Building2, TrendingUp } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: { en: 'King Abdullah Economic City', ar: 'مدينة الملك عبدالله الاقتصادية' },
    sector: { en: 'Infrastructure', ar: 'البنية التحتية' },
    location: { en: 'Rabigh', ar: 'رابغ' },
    year: '2018-2020',
    value: '180M SAR',
    image: '/images/kaec.png',
    description: {
      en: 'Comprehensive electro-mechanical works for multiple residential and commercial buildings',
      ar: 'أعمال كهروميكانيكية شاملة للعديد من المباني السكنية والتجارية'
    },
    featured: true
  },
  {
    id: 2,
    title: { en: 'King Abdulaziz International Conference Center', ar: 'مركز الملك عبدالعزيز الدولي للمؤتمرات' },
    sector: { en: 'Commercial', ar: 'تجاري' },
    location: { en: 'Riyadh', ar: 'الرياض' },
    year: '2019-2021',
    value: '95M SAR',
    image: '/images/kaicc.png',
    description: {
      en: 'Advanced HVAC and electrical systems for a world-class conference facility',
      ar: 'أنظمة تكييف وكهرباء متقدمة لمنشأة مؤتمرات عالمية المستوى'
    },
    featured: true
  },
  {
    id: 3,
    title: { en: 'Le Meridien Hotel', ar: 'فندق لو ميريديان' },
    sector: { en: 'Hospitality', ar: 'الضيافة' },
    location: { en: 'Jeddah', ar: 'جدة' },
    year: '2020-2022',
    value: '75M SAR',
    image: '/images/le-meridien.png',
    description: {
      en: 'Complete MEP solutions for luxury 5-star hotel development',
      ar: 'حلول كهروميكانيكية كاملة لتطوير فندق فاخر 5 نجوم'
    },
    featured: true
  },
  {
    id: 4,
    title: { en: 'King Fahd Medical City Expansion', ar: 'توسعة مدينة الملك فهد الطبية' },
    sector: { en: 'Healthcare', ar: 'الرعاية الصحية' },
    location: { en: 'Riyadh', ar: 'الرياض' },
    year: '2017-2019',
    value: '120M SAR',
    image: '/images/hospital.png',
    description: {
      en: 'Critical medical gas systems and specialized HVAC for healthcare facilities',
      ar: 'أنظمة غازات طبية حرجة وتكييف متخصص للمرافق الصحية'
    }
  },
  {
    id: 5,
    title: { en: 'King Saud University', ar: 'جامعة الملك سعود' },
    sector: { en: 'Education', ar: 'التعليم' },
    location: { en: 'Riyadh', ar: 'الرياض' },
    year: '2018-2020',
    value: '85M SAR',
    image: '/images/university.png',
    description: {
      en: 'Smart building systems and energy-efficient solutions for educational complex',
      ar: 'أنظمة مباني ذكية وحلول موفرة للطاقة للمجمع التعليمي'
    }
  },
  {
    id: 6,
    title: { en: 'Industrial City Factory Complex', ar: 'مجمع مصانع المدينة الصناعية' },
    sector: { en: 'Industrial', ar: 'صناعي' },
    location: { en: 'Jubail', ar: 'الجبيل' },
    year: '2019-2021',
    value: '150M SAR',
    image: '/images/factory.png',
    description: {
      en: 'Heavy-duty electrical and mechanical systems for industrial facilities',
      ar: 'أنظمة كهربائية وميكانيكية شاقة للمنشآت الصناعية'
    }
  }
]

const sectors = [
  { en: 'All', ar: 'الكل' },
  { en: 'Infrastructure', ar: 'البنية التحتية' },
  { en: 'Commercial', ar: 'تجاري' },
  { en: 'Healthcare', ar: 'الرعاية الصحية' },
  { en: 'Education', ar: 'التعليم' },
  { en: 'Hospitality', ar: 'الضيافة' },
  { en: 'Industrial', ar: 'صناعي' }
]

export default function ProjectsPage() {
  const params = useParams()
  const locale = (params.locale as Locale) || 'en'
  const [selectedSector, setSelectedSector] = useState('All')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProjects = selectedSector === 'All'
    ? projects
    : projects.filter(p => p.sector.en === selectedSector)

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
              {locale === 'ar' ? 'محفظة أعمالنا' : 'Our Portfolio'}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              {locale === 'ar' ? 'مشاريع' : 'Projects That'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">
                {locale === 'ar' ? 'رائدة' : 'Define Excellence'}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {locale === 'ar'
                ? 'أكثر من 500 مشروع ناجح عبر المملكة العربية السعودية منذ عام 1980'
                : 'Over 500 successful projects across Saudi Arabia since 1980'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {sectors.map((sector) => (
              <button
                key={sector.en}
                onClick={() => setSelectedSector(sector.en)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedSector === sector.en
                    ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-black'
                    : 'bg-transparent border border-gold-500/30 text-gold-500 hover:border-gold-500 hover:bg-gold-500/10'
                }`}
              >
                {sector[locale]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {projects.filter(p => p.featured).length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-white mb-8">
                {locale === 'ar' ? 'مشاريع مميزة' : 'Featured Projects'}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {projects.filter(p => p.featured).map((project) => (
                  <div
                    key={project.id}
                    className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold-500/30 transition-all duration-700 hover:-translate-y-3 border border-gray-800 hover:border-gold-500/50"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title[locale]}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                      {/* Project Value Badge */}
                      <div className="absolute top-4 right-4 bg-gold-500 text-black font-bold px-3 py-1 rounded-lg">
                        {project.value}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-gold-500 text-xs font-medium uppercase tracking-wider">
                          {project.sector[locale]}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-xs">
                          {project.year}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-500 transition-colors">
                        {project.title[locale]}
                      </h3>

                      <p className="text-gray-400 text-sm mb-4">
                        {project.description[locale]}
                      </p>

                      <div className="flex items-center text-sm text-gray-300">
                        <MapPin className="w-4 h-4 mr-1 text-gold-500/70" />
                        {project.location[locale]}
                      </div>

                      {/* Hover Bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* All Projects Grid */}
          <h2 className="text-3xl font-bold text-white mb-8">
            {locale === 'ar' ? 'جميع المشاريع' : 'All Projects'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-gradient-to-b from-gray-900/50 to-black/50 rounded-lg overflow-hidden border border-gray-800 hover:border-gold-500/50 transition-all duration-500"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gold-500 text-xs font-medium uppercase">
                      {project.sector[locale]}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-500 transition-colors">
                    {project.title[locale]}
                  </h3>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-400">
                      <MapPin className="w-3 h-3 mr-1" />
                      {project.location[locale]}
                    </div>
                    <span className="text-gold-500 font-semibold">
                      {project.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: locale === 'ar' ? 'مشروع منجز' : 'Projects Completed' },
              { number: '400M+', label: locale === 'ar' ? 'ريال قيمة المشاريع' : 'SAR Project Value' },
              { number: '6', label: locale === 'ar' ? 'قطاعات مختلفة' : 'Different Sectors' },
              { number: '15+', label: locale === 'ar' ? 'مدن سعودية' : 'Saudi Cities' }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400 mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gold-500/5 to-transparent"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            {locale === 'ar' ? 'دعنا نبني مشروعك القادم معًا' : "Let's Build Your Next Project Together"}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {locale === 'ar'
              ? 'انضم إلى أكثر من 500 عميل راضٍ عن خدماتنا'
              : 'Join over 500 satisfied clients who trust our expertise'
            }
          </p>
          <Link
            href={`/${locale}/contact`}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-105 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative">
              {locale === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}