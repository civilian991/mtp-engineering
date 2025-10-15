'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Locale } from '@/lib/i18n'
import Link from 'next/link'
import {
  Building,
  Fuel,
  Plane,
  Heart,
  GraduationCap,
  Home,
  Factory,
  Droplets,
  ArrowRight,
  Zap
} from 'lucide-react'

export default function SectorsPage() {
  const params = useParams()
  const locale = (params.locale as Locale) || 'en'
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSector, setHoveredSector] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const sectors = [
    {
      icon: Building,
      title: { en: 'Government', ar: 'الحكومي' },
      description: {
        en: 'Ministry and agency projects, public infrastructure, and municipal developments',
        ar: 'مشاريع الوزارات والهيئات الحكومية والبنية التحتية العامة والبلدية'
      },
      slug: 'government',
      stats: { projects: '150+', value: '2.5B SAR' },
      color: 'from-gold-600 to-gold-400',
      highlights: [
        { en: 'Government buildings', ar: 'المباني الحكومية' },
        { en: 'Public infrastructure', ar: 'البنية التحتية العامة' },
        { en: 'Municipal projects', ar: 'المشاريع البلدية' }
      ]
    },
    {
      icon: Fuel,
      title: { en: 'Oil & Gas', ar: 'النفط والغاز' },
      description: {
        en: 'Refineries, pipeline infrastructure, and processing facilities',
        ar: 'مصافي التكرير والبنية التحتية لخطوط الأنابيب ومرافق المعالجة'
      },
      slug: 'oil-gas',
      stats: { projects: '80+', value: '3.8B SAR' },
      color: 'from-gold-500 to-gold-400',
      highlights: [
        { en: 'Refineries', ar: 'المصافي' },
        { en: 'Pipeline infrastructure', ar: 'خطوط الأنابيب' },
        { en: 'Processing facilities', ar: 'مرافق المعالجة' }
      ]
    },
    {
      icon: Plane,
      title: { en: 'Transportation', ar: 'النقل' },
      description: {
        en: 'Airports, seaports, railways, and highway systems',
        ar: 'المطارات والموانئ البحرية والسكك الحديدية والطرق السريعة'
      },
      slug: 'transportation',
      stats: { projects: '120+', value: '4.2B SAR' },
      color: 'from-gold-600 to-gold-500',
      highlights: [
        { en: 'Airports', ar: 'المطارات' },
        { en: 'Seaports', ar: 'الموانئ البحرية' },
        { en: 'Railways', ar: 'السكك الحديدية' }
      ]
    },
    {
      icon: Heart,
      title: { en: 'Healthcare', ar: 'الرعاية الصحية' },
      description: {
        en: 'Hospitals, medical cities, clinics, and healthcare centers',
        ar: 'المستشفيات والمدن الطبية والعيادات والمراكز الصحية'
      },
      slug: 'healthcare',
      stats: { projects: '60+', value: '1.8B SAR' },
      color: 'from-gold-500 to-gold-400',
      highlights: [
        { en: 'Hospitals', ar: 'المستشفيات' },
        { en: 'Medical cities', ar: 'المدن الطبية' },
        { en: 'Research centers', ar: 'مراكز الأبحاث' }
      ]
    },
    {
      icon: GraduationCap,
      title: { en: 'Education', ar: 'التعليم' },
      description: {
        en: 'Universities, schools, training centers, and educational facilities',
        ar: 'الجامعات والمدارس ومراكز التدريب والمرافق التعليمية'
      },
      slug: 'education',
      stats: { projects: '90+', value: '2.1B SAR' },
      color: 'from-gold-600 to-gold-400',
      highlights: [
        { en: 'Universities', ar: 'الجامعات' },
        { en: 'Schools', ar: 'المدارس' },
        { en: 'Libraries', ar: 'المكتبات' }
      ]
    },
    {
      icon: Home,
      title: { en: 'Commercial & Residential', ar: 'التجاري والسكني' },
      description: {
        en: 'Office buildings, shopping centers, residential complexes, and mixed-use developments',
        ar: 'المباني المكتبية ومراكز التسوق والمجمعات السكنية والتطورات متعددة الاستخدامات'
      },
      slug: 'commercial-residential',
      stats: { projects: '200+', value: '5.5B SAR' },
      color: 'from-gold-500 to-gold-400',
      highlights: [
        { en: 'Office buildings', ar: 'المباني المكتبية' },
        { en: 'Shopping centers', ar: 'مراكز التسوق' },
        { en: 'Residential complexes', ar: 'المجمعات السكنية' }
      ]
    },
    {
      icon: Factory,
      title: { en: 'Industrial', ar: 'الصناعي' },
      description: {
        en: 'Manufacturing plants, warehouses, industrial cities, and logistics facilities',
        ar: 'مصانع التصنيع والمستودعات والمدن الصناعية والمرافق اللوجستية'
      },
      slug: 'industrial',
      stats: { projects: '110+', value: '3.2B SAR' },
      color: 'from-gold-600 to-gold-500',
      highlights: [
        { en: 'Manufacturing plants', ar: 'المصانع' },
        { en: 'Warehouses', ar: 'المستودعات' },
        { en: 'Industrial cities', ar: 'المدن الصناعية' }
      ]
    },
    {
      icon: Droplets,
      title: { en: 'Water & Utilities', ar: 'المياه والمرافق' },
      description: {
        en: 'Water treatment plants, power infrastructure, and waste management',
        ar: 'محطات معالجة المياه والبنية التحتية للطاقة وإدارة النفايات'
      },
      slug: 'utilities',
      stats: { projects: '70+', value: '1.6B SAR' },
      color: 'from-gold-500 to-gold-400',
      highlights: [
        { en: 'Water treatment', ar: 'معالجة المياه' },
        { en: 'Power infrastructure', ar: 'البنية التحتية للطاقة' },
        { en: 'Waste management', ar: 'إدارة النفايات' }
      ]
    }
  ]

  const vision2030Projects = [
    { name: 'NEOM', description: { en: 'City of the Future', ar: 'مدينة المستقبل' } },
    { name: 'Red Sea', description: { en: 'Luxury Tourism Hub', ar: 'وجهة سياحية فاخرة' } },
    { name: 'Qiddiya', description: { en: 'Entertainment Capital', ar: 'عاصمة الترفيه' } },
    { name: 'ROSHN', description: { en: 'Housing Development', ar: 'تطوير الإسكان' } }
  ]

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
              {locale === 'ar' ? 'قطاعاتنا' : 'Our Sectors'}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              {locale === 'ar' ? 'خبرة في' : 'Expertise Across'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">
                {locale === 'ar' ? 'كل قطاع' : 'All Sectors'}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {locale === 'ar'
                ? 'نخدم جميع القطاعات الرئيسية في المملكة العربية السعودية بحلول هندسية متطورة'
                : 'Serving all major sectors in Saudi Arabia with advanced engineering solutions'
              }
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {[
                { number: '8', label: { en: 'Major Sectors', ar: 'قطاعات رئيسية' } },
                { number: '500+', label: { en: 'Projects Completed', ar: 'مشروع منجز' } },
                { number: '25B+', label: { en: 'SAR Project Value', ar: 'ريال قيمة المشاريع' } },
                { number: '100+', label: { en: 'Active Clients', ar: 'عميل نشط' } }
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

      {/* Sectors Grid */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {locale === 'ar' ? 'قطاعاتنا' : 'Our'} <span className="text-gold-500">{locale === 'ar' ? 'المتخصصة' : 'Specialized Sectors'}</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sector, index) => {
              const Icon = sector.icon
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold-500/30 transition-all duration-700 hover:-translate-y-3 border border-gray-800 hover:border-gold-500/50"
                  onMouseEnter={() => setHoveredSector(index)}
                  onMouseLeave={() => setHoveredSector(null)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Top accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${sector.color}`}></div>

                  <div className="p-6 relative">
                    {/* Icon */}
                    <div className="w-16 h-16 mb-4 relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${sector.color} rounded-xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500`}></div>
                      <div className="relative bg-gradient-to-br from-gold-500/20 to-gold-500/5 rounded-xl p-4 border border-gold-500/30 group-hover:border-gold-500/50 transition-colors duration-500">
                        <Icon className="w-full h-full text-gold-500 group-hover:text-gold-400 transition-colors duration-500" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-500 transition-colors">
                      {sector.title[locale]}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {sector.description[locale]}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
                      <div>
                        <div className="text-gold-500 font-bold">{sector.stats.projects}</div>
                        <div className="text-xs text-gray-500">{locale === 'ar' ? 'مشروع' : 'Projects'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-gold-500 font-bold">{sector.stats.value}</div>
                        <div className="text-xs text-gray-500">{locale === 'ar' ? 'القيمة' : 'Value'}</div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className={`space-y-1 transition-all duration-500 ${
                      hoveredSector === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}>
                      {sector.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-300">
                          <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></div>
                          {highlight[locale]}
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/${locale}/sectors/${sector.slug}`}
                      className="group/btn relative inline-flex items-center justify-center w-full mt-4 py-2 text-sm font-bold text-gold-500 border border-gold-500/50 rounded-lg overflow-hidden transition-all duration-500 hover:text-black"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></span>
                      <span className="relative flex items-center">
                        {locale === 'ar' ? 'استكشف القطاع' : 'Explore Sector'}
                        <ArrowRight className={`w-4 h-4 ml-2 ${locale === 'ar' ? 'rotate-180' : ''}`} />
                      </span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Vision 2030 Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              {locale === 'ar' ? 'نساهم في' : 'Contributing to'} <span className="text-gold-500">{locale === 'ar' ? 'رؤية 2030' : 'Vision 2030'}</span>
            </h2>
            <p className="text-xl text-gray-400">
              {locale === 'ar'
                ? 'نفخر بدورنا في مشاريع رؤية المملكة الطموحة'
                : 'Proud to play our part in the Kingdom\'s ambitious vision projects'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {vision2030Projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-b from-gray-900/50 to-black/50 rounded-lg p-6 border border-gray-800 hover:border-gold-500/50 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Zap className="w-8 h-8 text-gold-500 mb-3" />
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-500 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {project.description[locale]}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {locale === 'ar' ? 'قصص' : 'Success'} <span className="text-gold-500">{locale === 'ar' ? 'النجاح' : 'Stories'}</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                sector: { en: 'TRANSPORTATION', ar: 'النقل' },
                title: { en: 'King Abdulaziz International Airport', ar: 'مطار الملك عبدالعزيز الدولي' },
                description: {
                  en: 'Design and supervision of airport expansion to accommodate 30 million passengers annually',
                  ar: 'تصميم وإشراف على توسعة المطار لاستيعاب 30 مليون مسافر سنوياً'
                }
              },
              {
                sector: { en: 'HEALTHCARE', ar: 'الرعاية الصحية' },
                title: { en: 'King Fahad Medical City', ar: 'مدينة الملك فهد الطبية' },
                description: {
                  en: 'Infrastructure and facilities for the largest medical city in the Middle East',
                  ar: 'البنية التحتية والمرافق لأكبر مدينة طبية في الشرق الأوسط'
                }
              },
              {
                sector: { en: 'EDUCATION', ar: 'التعليم' },
                title: { en: 'KAUST University', ar: 'جامعة الملك عبدالله للعلوم والتقنية' },
                description: {
                  en: 'Advanced research facilities and world-class scientific laboratories',
                  ar: 'مرافق بحثية متطورة ومختبرات علمية عالمية المستوى'
                }
              }
            ].map((story, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 hover:border-gold-500/50 transition-all duration-500"
              >
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900"></div>
                <div className="p-6">
                  <div className="text-xs text-gold-500 font-bold uppercase tracking-wider mb-2">
                    {story.sector[locale]}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-500 transition-colors">
                    {story.title[locale]}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {story.description[locale]}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
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
            {locale === 'ar' ? 'خبرة قطاعية تحقق نتائج' : 'Sector Expertise That Delivers Results'}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {locale === 'ar'
              ? 'اكتشف كيف يمكن لخبرتنا القطاعية أن تفيد مشروعك'
              : 'Discover how our sector expertise can benefit your project'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/projects`}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative">
                {locale === 'ar' ? 'عرض المشاريع' : 'View Projects'}
              </span>
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="group relative inline-flex items-center gap-3 bg-transparent border-2 border-gold-500/50 text-gold-500 font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:border-gold-500 hover:bg-gold-500/10 hover:scale-105"
            >
              {locale === 'ar' ? 'ناقش مشروعك' : 'Discuss Your Project'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}