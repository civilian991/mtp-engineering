'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { Briefcase, MapPin, Clock, Users, TrendingUp, Heart, Sparkles, ChevronRight } from 'lucide-react'

// Mock data
const mockJobs = [
  {
    id: '1',
    title: { en: 'Senior Civil Engineer', ar: 'مهندس مدني أول' },
    department: { en: 'Civil Engineering', ar: 'الهندسة المدنية' },
    location: { en: 'Riyadh', ar: 'الرياض' },
    employment_type: 'full-time',
    experience_level: 'senior',
    posted_date: '2024-01-15',
    description: {
      en: 'Lead civil engineering projects with a focus on infrastructure development',
      ar: 'قيادة مشاريع الهندسة المدنية مع التركيز على تطوير البنية التحتية'
    }
  },
  {
    id: '2',
    title: { en: 'Project Manager', ar: 'مدير مشروع' },
    department: { en: 'Project Management', ar: 'إدارة المشاريع' },
    location: { en: 'Jeddah', ar: 'جدة' },
    employment_type: 'full-time',
    experience_level: 'senior',
    posted_date: '2024-01-10',
    description: {
      en: 'Oversee large-scale engineering projects from inception to completion',
      ar: 'الإشراف على المشاريع الهندسية الكبرى من البداية إلى النهاية'
    }
  },
  {
    id: '3',
    title: { en: 'Junior Structural Engineer', ar: 'مهندس إنشائي مبتدئ' },
    department: { en: 'Structural Engineering', ar: 'الهندسة الإنشائية' },
    location: { en: 'Riyadh', ar: 'الرياض' },
    employment_type: 'full-time',
    experience_level: 'entry',
    posted_date: '2024-01-20',
    description: {
      en: 'Support structural design and analysis for various construction projects',
      ar: 'دعم التصميم والتحليل الإنشائي لمختلف مشاريع البناء'
    }
  },
  {
    id: '4',
    title: { en: 'CAD Technician', ar: 'فني CAD' },
    department: { en: 'Design', ar: 'التصميم' },
    location: { en: 'Dammam', ar: 'الدمام' },
    employment_type: 'full-time',
    experience_level: 'mid',
    posted_date: '2024-01-18',
    description: {
      en: 'Create detailed technical drawings and 3D models for engineering projects',
      ar: 'إنشاء رسومات فنية مفصلة ونماذج ثلاثية الأبعاد للمشاريع الهندسية'
    }
  },
]

export default function CareersPage() {
  const params = useParams()
  const locale = (params.locale as Locale) || 'en'
  const [isVisible, setIsVisible] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const employmentTypes: Record<string, { en: string; ar: string }> = {
    'full-time': { en: 'Full Time', ar: 'دوام كامل' },
    'part-time': { en: 'Part Time', ar: 'دوام جزئي' },
    'contract': { en: 'Contract', ar: 'عقد' },
    'internship': { en: 'Internship', ar: 'تدريب' },
  }

  const experienceLevels: Record<string, { en: string; ar: string }> = {
    'entry': { en: 'Entry Level', ar: 'مبتدئ' },
    'mid': { en: 'Mid Level', ar: 'متوسط' },
    'senior': { en: 'Senior Level', ar: 'خبير' },
    'executive': { en: 'Executive', ar: 'تنفيذي' },
  }

  const benefits = [
    {
      icon: Heart,
      title: { en: 'Health Insurance', ar: 'تأمين صحي' },
      description: {
        en: 'Comprehensive medical coverage for you and family',
        ar: 'تغطية طبية شاملة لك ولعائلتك'
      }
    },
    {
      icon: TrendingUp,
      title: { en: 'Career Growth', ar: 'نمو مهني' },
      description: {
        en: 'Continuous learning and development opportunities',
        ar: 'فرص التعلم والتطوير المستمر'
      }
    },
    {
      icon: Users,
      title: { en: 'Great Team', ar: 'فريق رائع' },
      description: {
        en: 'Work with industry experts and talented professionals',
        ar: 'العمل مع خبراء الصناعة والمحترفين الموهوبين'
      }
    }
  ]

  const filteredJobs = selectedDepartment === 'all'
    ? mockJobs
    : mockJobs.filter(job => job.department.en.toLowerCase().includes(selectedDepartment))

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
              {locale === 'ar' ? 'انضم إلينا' : 'Join Our Team'}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              {locale === 'ar' ? 'ابني' : 'Build Your'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">
                {locale === 'ar' ? 'مستقبلك' : 'Future'}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              {locale === 'ar'
                ? 'انضم إلى فريقنا من الخبراء والمهندسين المحترفين وكن جزءًا من رحلة التميز'
                : 'Join our team of expert engineers and professionals and be part of our excellence journey'
              }
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {[
                { number: '200+', label: { en: 'Employees', ar: 'موظف' } },
                { number: '44+', label: { en: 'Years Experience', ar: 'سنة خبرة' } },
                { number: '5', label: { en: 'Office Locations', ar: 'مواقع مكاتب' } },
                { number: '95%', label: { en: 'Employee Retention', ar: 'معدل الاحتفاظ' } }
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

      {/* Why Join Us */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {locale === 'ar' ? 'لماذا' : 'Why'} <span className="text-gold-500">MTP?</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border border-gray-800 hover:border-gold-500/50 transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-500/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <Icon className="w-10 h-10 text-gold-500 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">
                    {benefit.title[locale]}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {benefit.description[locale]}
                  </p>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {locale === 'ar' ? 'الوظائف' : 'Open'} <span className="text-gold-500">{locale === 'ar' ? 'المتاحة' : 'Positions'}</span>
          </h2>

          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <div
                key={job.id}
                className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 hover:border-gold-500/50 transition-all duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold-500 transition-colors">
                        {job.title[locale]}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {job.description[locale]}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-gray-300">
                          <Briefcase className="w-4 h-4 mr-2 text-gold-500/70" />
                          {job.department[locale]}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <MapPin className="w-4 h-4 mr-2 text-gold-500/70" />
                          {job.location[locale]}
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Clock className="w-4 h-4 mr-2 text-gold-500/70" />
                          {employmentTypes[job.employment_type][locale]}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <span className="px-3 py-1 bg-gold-500/10 text-gold-500 rounded-full text-xs font-medium border border-gold-500/30">
                          {experienceLevels[job.experience_level][locale]}
                        </span>
                        <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs font-medium">
                          {locale === 'ar' ? 'منذ ' : 'Posted '}
                          {new Date(job.posted_date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                        </span>
                      </div>
                    </div>
                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <Link
                        href={`/${locale}/careers/${job.id}/apply`}
                        className="group/btn relative inline-flex items-center gap-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-3 px-8 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-105 overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></span>
                        <span className="relative flex items-center">
                          {locale === 'ar' ? 'تقدم الآن' : 'Apply Now'}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-lg text-gray-400">
                {locale === 'ar'
                  ? 'لا توجد وظائف شاغرة حاليًا. يرجى التحقق لاحقًا.'
                  : 'No open positions currently. Please check back later.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            {locale === 'ar' ? 'ثقافتنا' : 'Our'} <span className="text-gold-500">{locale === 'ar' ? '' : 'Culture'}</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {locale === 'ar'
              ? 'نؤمن بخلق بيئة عمل تشجع على الابتكار والتعاون والنمو المستمر'
              : 'We believe in creating a workplace that fosters innovation, collaboration, and continuous growth'
            }
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: { en: 'Innovation', ar: 'الابتكار' },
                description: { en: 'Encouraging creative solutions', ar: 'تشجيع الحلول الإبداعية' }
              },
              {
                icon: Users,
                title: { en: 'Teamwork', ar: 'العمل الجماعي' },
                description: { en: 'Collaborating for success', ar: 'التعاون من أجل النجاح' }
              },
              {
                icon: TrendingUp,
                title: { en: 'Growth', ar: 'النمو' },
                description: { en: 'Continuous development', ar: 'التطوير المستمر' }
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="group text-center">
                  <div className="w-20 h-20 mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-400 rounded-full opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-br from-gold-500/20 to-gold-500/5 rounded-full p-5 border border-gold-500/30 group-hover:border-gold-500/50 transition-colors duration-500">
                      <Icon className="w-full h-full text-gold-500 group-hover:text-gold-400 transition-colors duration-500" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title[locale]}</h3>
                  <p className="text-gray-400 text-sm">{item.description[locale]}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gold-500/5 to-transparent"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            {locale === 'ar' ? 'لم تجد الوظيفة المناسبة؟' : "Can't Find the Right Position?"}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {locale === 'ar'
              ? 'أرسل سيرتك الذاتية وسنتواصل معك عند توفر فرص مناسبة'
              : 'Send us your CV and we\'ll contact you when suitable opportunities arise'
            }
          </p>
          <Link
            href={`/${locale}/contact`}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-105 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative">
              {locale === 'ar' ? 'أرسل سيرتك الذاتية' : 'Send Your CV'}
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}