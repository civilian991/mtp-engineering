'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Locale } from '@/lib/i18n'
import Link from 'next/link'
import { Award, Target, Eye, Shield, Lightbulb, Users, Clock, CheckCircle } from 'lucide-react'

export default function AboutPage() {
  const params = useParams()
  const locale = (params.locale as Locale) || 'en'
  const [isVisible, setIsVisible] = useState(false)
  const [activeValue, setActiveValue] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const values = [
    {
      icon: Award,
      title: { en: 'Excellence', ar: 'التميز' },
      description: {
        en: 'We strive for excellence in every project we undertake',
        ar: 'نسعى للتميز في كل مشروع نقوم به'
      },
      color: 'from-gold-600 to-gold-400'
    },
    {
      icon: Shield,
      title: { en: 'Integrity', ar: 'النزاهة' },
      description: {
        en: 'We operate with the highest standards of integrity and transparency',
        ar: 'نعمل بأعلى معايير النزاهة والشفافية'
      },
      color: 'from-gold-500 to-gold-400'
    },
    {
      icon: Lightbulb,
      title: { en: 'Innovation', ar: 'الابتكار' },
      description: {
        en: 'We embrace innovation to deliver cutting-edge solutions',
        ar: 'نحتضن الابتكار لتقديم حلول متطورة'
      },
      color: 'from-gold-600 to-gold-500'
    },
    {
      icon: Users,
      title: { en: 'Collaboration', ar: 'التعاون' },
      description: {
        en: 'We believe in the power of teamwork and partnership',
        ar: 'نؤمن بقوة العمل الجماعي والشراكة'
      },
      color: 'from-gold-500 to-gold-400'
    }
  ]

  const milestones = [
    {
      year: '1980',
      title: { en: 'Foundation', ar: 'التأسيس' },
      description: {
        en: 'MTP Engineering was established to provide world-class engineering services',
        ar: 'تأسست MTP Engineering لتقديم خدمات هندسية عالمية المستوى'
      },
      highlight: true
    },
    {
      year: '1990',
      title: { en: 'Regional Expansion', ar: 'التوسع الإقليمي' },
      description: {
        en: 'Expanded operations across the Kingdom',
        ar: 'توسعت عملياتنا لتشمل جميع أنحاء المملكة'
      }
    },
    {
      year: '2000',
      title: { en: 'ISO Certification', ar: 'شهادة ISO' },
      description: {
        en: 'Achieved ISO 9001 and ISO 14001 certifications',
        ar: 'حصلنا على شهادات ISO 9001 و ISO 14001'
      },
      highlight: true
    },
    {
      year: '2010',
      title: { en: 'Mega Projects', ar: 'مشاريع ضخمة' },
      description: {
        en: 'Participated in major infrastructure projects across Saudi Arabia',
        ar: 'شاركنا في مشاريع البنية التحتية الكبرى في المملكة'
      }
    },
    {
      year: '2020',
      title: { en: 'Digital Transformation', ar: 'التحول الرقمي' },
      description: {
        en: 'Embraced advanced digital technologies across all services',
        ar: 'تبنينا التقنيات الرقمية المتقدمة في جميع خدماتنا'
      },
      highlight: true
    },
    {
      year: '2030',
      title: { en: 'Vision 2030', ar: 'رؤية 2030' },
      description: {
        en: 'Aligning our services with Saudi Vision 2030',
        ar: 'مواءمة خدماتنا مع رؤية المملكة 2030'
      },
      highlight: true
    }
  ]

  const achievements = [
    { number: '44+', label: { en: 'Years of Excellence', ar: 'سنوات من التميز' } },
    { number: '500+', label: { en: 'Projects Delivered', ar: 'مشروع منجز' } },
    { number: '200+', label: { en: 'Expert Engineers', ar: 'مهندس خبير' } },
    { number: '100%', label: { en: 'Client Satisfaction', ar: 'رضا العملاء' } }
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
              {locale === 'ar' ? 'من نحن' : 'About Us'}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              {locale === 'ar' ? 'بناء' : 'Building'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">
                {locale === 'ar' ? 'المستقبل' : 'The Future'}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {locale === 'ar'
                ? 'أكثر من 44 عامًا من التميز الهندسي والابتكار في المملكة العربية السعودية'
                : '44+ Years of Engineering Excellence and Innovation in Saudi Arabia'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400 mb-2 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`} style={{ animationDelay: `${index * 100}ms` }}>
                  {stat.number}
                </div>
                <p className="text-gray-400">{stat.label[locale]}</p>
                <div className="w-16 h-1 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {locale === 'ar' ? 'قصة' : 'Our'} <span className="text-gold-500">Story</span>
          </h2>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p className="text-lg">
              {locale === 'ar'
                ? 'تأسست MTP Engineering في عام 1980 برؤية واضحة: تقديم حلول هندسية عالمية المستوى تلبي تطلعات المملكة العربية السعودية النامية.'
                : 'Founded in 1980 with a clear vision: to provide world-class engineering solutions that meet the growing aspirations of Saudi Arabia.'
              }
            </p>
            <p className="text-lg">
              {locale === 'ar'
                ? 'على مدى أربعة عقود، نمت لتصبح واحدة من أكبر شركات الاستشارات الهندسية في المنطقة، مع أكثر من 500 مشروع ناجح عبر جميع القطاعات.'
                : 'Over four decades, we\'ve grown to become one of the largest engineering consultancies in the region, with over 500 successful projects across all sectors.'
              }
            </p>
            <p className="text-lg">
              {locale === 'ar'
                ? 'اليوم، نقف في طليعة التحول الرقمي والابتكار في الهندسة، ملتزمون برؤية المملكة 2030 وتقديم حلول مستدامة للجيل القادم.'
                : 'Today, we stand at the forefront of digital transformation and engineering innovation, committed to Saudi Vision 2030 and delivering sustainable solutions for the next generation.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border border-gray-800 hover:border-gold-500/50 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-500/10 to-transparent rounded-bl-full"></div>
              <Eye className="w-12 h-12 text-gold-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                {locale === 'ar' ? 'رؤيتنا' : 'Our Vision'}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {locale === 'ar'
                  ? 'أن نكون الشركة الرائدة في الاستشارات الهندسية لدفع التنمية المستدامة في المملكة العربية السعودية والمنطقة.'
                  : 'To be the leading engineering consultancy driving sustainable development in Saudi Arabia and the region.'
                }
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>

            <div className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border border-gray-800 hover:border-gold-500/50 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-500/10 to-transparent rounded-bl-full"></div>
              <Target className="w-12 h-12 text-gold-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                {locale === 'ar' ? 'مهمتنا' : 'Our Mission'}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {locale === 'ar'
                  ? 'تقديم حلول هندسية مبتكرة بنزاهة، وتجاوز توقعات العملاء من خلال الخبرة الفنية والالتزام بالتميز.'
                  : 'Delivering innovative engineering solutions with integrity, exceeding client expectations through technical expertise and commitment to excellence.'
                }
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {locale === 'ar' ? 'قيمنا' : 'Our'} <span className="text-gold-500">Values</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-b from-gray-900/50 to-black/50 rounded-lg overflow-hidden border border-gray-800 hover:border-gold-500/50 transition-all duration-500 p-6"
                  onMouseEnter={() => setActiveValue(index)}
                  onMouseLeave={() => setActiveValue(null)}
                >
                  <div className="relative z-10">
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${value.color} rounded-xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500`}></div>
                      <div className="relative bg-gradient-to-br from-gold-500/20 to-gold-500/5 rounded-xl p-3 border border-gold-500/30 group-hover:border-gold-500/50 transition-colors duration-500">
                        <Icon className="w-full h-full text-gold-500 group-hover:text-gold-400 transition-colors duration-500" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 text-center group-hover:text-gold-500 transition-colors duration-500">
                      {value.title[locale]}
                    </h3>
                    <p className={`text-gray-400 text-center text-sm transition-all duration-500 ${
                      activeValue === index ? 'opacity-100 max-h-20' : 'opacity-80 max-h-0 overflow-hidden'
                    }`}>
                      {value.description[locale]}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            {locale === 'ar' ? 'رحلتنا' : 'Our'} <span className="text-gold-500">Journey</span>
          </h2>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-gold-500 via-gold-400 to-gold-500 opacity-30"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="group relative bg-gradient-to-b from-gray-900 to-black rounded-lg p-6 border border-gray-800 hover:border-gold-500/50 transition-all duration-500">
                      <div className="text-gold-500 font-bold text-2xl mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {milestone.title[locale]}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {milestone.description[locale]}
                      </p>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                    </div>
                  </div>
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 ${
                    milestone.highlight ? 'bg-gold-500' : 'bg-gray-700'
                  } rounded-full border-4 border-black shadow-lg shadow-gold-500/20`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {locale === 'ar' ? 'شهاداتنا' : 'Our'} <span className="text-gold-500">Certifications</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'ISO 9001:2015',
              'ISO 14001:2015',
              'OHSAS 18001',
              'Saudi Engineering Council'
            ].map((cert, index) => (
              <div key={index} className="group relative bg-gradient-to-b from-gray-900/50 to-black/50 rounded-lg p-6 border border-gray-800 hover:border-gold-500/50 transition-all duration-500 text-center">
                <Award className="w-12 h-12 text-gold-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-500" />
                <p className="text-gray-300 font-medium group-hover:text-gold-500 transition-colors duration-500">
                  {cert}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
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
            {locale === 'ar' ? 'دعنا نبني المستقبل معًا' : "Let's Build the Future Together"}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {locale === 'ar'
              ? 'اكتشف كيف يمكن لخبرتنا أن تساعد في تحقيق رؤية مشروعك'
              : 'Discover how our expertise can help bring your project vision to life'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative">
                {locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </span>
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="group relative inline-flex items-center gap-3 bg-transparent border-2 border-gold-500/50 text-gold-500 font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:border-gold-500 hover:bg-gold-500/10 hover:scale-105"
            >
              {locale === 'ar' ? 'عرض مشاريعنا' : 'View Our Projects'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}