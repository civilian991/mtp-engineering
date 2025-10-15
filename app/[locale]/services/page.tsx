'use client'

import React, { useState, useEffect } from 'react'
import { Zap, Snowflake, Droplets, Shield, Wifi, Cog } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Locale } from '@/lib/i18n'
import Link from 'next/link'

const services = [
  {
    id: 'electrical',
    icon: Zap,
    title: {
      en: 'Electrical Installations',
      ar: 'التركيبات الكهربائية'
    },
    description: {
      en: 'HV/MV substations, power distribution, lighting and smart grid systems.',
      ar: 'محطات الجهد العالي والمتوسط، توزيع الطاقة، الإضاءة وأنظمة الشبكات الذكية.'
    },
    features: [
      { en: 'High Voltage Systems', ar: 'أنظمة الجهد العالي' },
      { en: 'Power Distribution', ar: 'توزيع الطاقة' },
      { en: 'Smart Lighting', ar: 'الإضاءة الذكية' },
      { en: 'Emergency Power', ar: 'الطاقة الاحتياطية' }
    ]
  },
  {
    id: 'hvac',
    icon: Snowflake,
    title: {
      en: 'Mechanical & HVAC',
      ar: 'الميكانيكية والتكييف'
    },
    description: {
      en: 'Heating, ventilation, air conditioning and climate control solutions.',
      ar: 'حلول التدفئة والتهوية وتكييف الهواء والتحكم بالمناخ.'
    },
    features: [
      { en: 'Central AC Systems', ar: 'أنظمة التكييف المركزي' },
      { en: 'Ventilation Design', ar: 'تصميم التهوية' },
      { en: 'Climate Control', ar: 'التحكم بالمناخ' },
      { en: 'Energy Efficiency', ar: 'كفاءة الطاقة' }
    ]
  },
  {
    id: 'plumbing',
    icon: Droplets,
    title: {
      en: 'Plumbing & Sanitary',
      ar: 'السباكة والصرف الصحي'
    },
    description: {
      en: 'Water supply networks, drainage systems, sanitary fixtures and water treatment.',
      ar: 'شبكات إمداد المياه، أنظمة الصرف، التركيبات الصحية ومعالجة المياه.'
    },
    features: [
      { en: 'Water Networks', ar: 'شبكات المياه' },
      { en: 'Drainage Systems', ar: 'أنظمة الصرف' },
      { en: 'Water Treatment', ar: 'معالجة المياه' },
      { en: 'Pump Stations', ar: 'محطات الضخ' }
    ]
  },
  {
    id: 'fire',
    icon: Shield,
    title: {
      en: 'Fire Fighting & Safety',
      ar: 'مكافحة الحريق والسلامة'
    },
    description: {
      en: 'Fire suppression systems, alarms, sprinklers and emergency lighting.',
      ar: 'أنظمة إطفاء الحريق، الإنذارات، الرشاشات وإضاءة الطوارئ.'
    },
    features: [
      { en: 'Fire Suppression', ar: 'إطفاء الحريق' },
      { en: 'Alarm Systems', ar: 'أنظمة الإنذار' },
      { en: 'Sprinkler Networks', ar: 'شبكات الرشاشات' },
      { en: 'Emergency Systems', ar: 'أنظمة الطوارئ' }
    ]
  },
  {
    id: 'low-current',
    icon: Wifi,
    title: {
      en: 'Low Current & Smart Systems',
      ar: 'التيار المنخفض والأنظمة الذكية'
    },
    description: {
      en: 'CCTV, access control, AV, PA systems, nurse call, building automation.',
      ar: 'كاميرات المراقبة، التحكم بالدخول، الصوت والصورة، أنظمة النداء، أتمتة المباني.'
    },
    features: [
      { en: 'CCTV Systems', ar: 'أنظمة المراقبة' },
      { en: 'Access Control', ar: 'التحكم بالدخول' },
      { en: 'Building Automation', ar: 'أتمتة المباني' },
      { en: 'Network Infrastructure', ar: 'البنية التحتية للشبكات' }
    ]
  },
  {
    id: 'project-management',
    icon: Cog,
    title: {
      en: 'Project Management',
      ar: 'إدارة المشاريع'
    },
    description: {
      en: 'Complete project lifecycle management from design to handover.',
      ar: 'إدارة دورة حياة المشروع الكاملة من التصميم إلى التسليم.'
    },
    features: [
      { en: 'Design & Planning', ar: 'التصميم والتخطيط' },
      { en: 'Quality Control', ar: 'ضبط الجودة' },
      { en: 'Cost Management', ar: 'إدارة التكاليف' },
      { en: 'Timely Delivery', ar: 'التسليم في الوقت' }
    ]
  }
]

export default function ServicesPage() {
  const params = useParams()
  const locale = (params.locale as Locale) || 'en'
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
              {locale === 'ar' ? 'خدماتنا المتخصصة' : 'Our Specialized Services'}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              {locale === 'ar' ? 'خدمات' : 'Complete'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">
                {locale === 'ar' ? 'متكاملة' : 'Solutions'}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {locale === 'ar'
                ? 'حلول كهروميكانيكية متكاملة مع أكثر من 44 عامًا من الخبرة في تقديم مشاريع عالية الجودة'
                : 'Comprehensive electro-mechanical solutions with over 44 years of expertise delivering high-quality projects'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold-500/30 transition-all duration-700 hover:-translate-y-3 border border-gray-800 hover:border-gold-500/50 cursor-pointer"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                  onMouseEnter={() => setSelectedService(service.id)}
                  onMouseLeave={() => setSelectedService(null)}
                >
                  {/* Icon Section */}
                  <div className="p-8 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold-500/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="w-20 h-20 mx-auto mb-6 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-400 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-gold-500/20 to-gold-500/5 rounded-2xl p-5 border border-gold-500/30 group-hover:border-gold-500/50 transition-colors duration-500">
                          <Icon className="w-full h-full text-gold-500 group-hover:text-gold-400 transition-colors duration-500" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 text-center group-hover:text-gold-500 transition-colors duration-500">
                        {service.title[locale]}
                      </h3>

                      <p className="text-gray-400 text-center mb-6 text-sm leading-relaxed">
                        {service.description[locale]}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className={`space-y-2 transition-all duration-500 ${
                      selectedService === service.id ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}>
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></div>
                          {feature[locale]}
                        </div>
                      ))}
                    </div>

                    {/* Hover Effect Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            {locale === 'ar' ? 'لماذا تختار' : 'Why Choose'} <span className="text-gold-500">MTP?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '44+', label: locale === 'ar' ? 'سنوات من الخبرة' : 'Years of Experience' },
              { number: '500+', label: locale === 'ar' ? 'مشروع منجز' : 'Projects Completed' },
              { number: '24/7', label: locale === 'ar' ? 'دعم مستمر' : 'Continuous Support' },
              { number: 'ISO', label: locale === 'ar' ? 'معايير دولية' : 'International Standards' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-gold-500/20 to-transparent rounded-full flex items-center justify-center border border-gold-500/30 group-hover:border-gold-500 transition-colors duration-300">
                    <span className="text-3xl font-bold text-gold-500">{stat.number}</span>
                  </div>
                  <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl scale-0 group-hover:scale-110 transition-transform duration-500"></div>
                </div>
                <p className="text-white font-semibold">{stat.label}</p>
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
            {locale === 'ar' ? 'هل لديك مشروع في ذهنك؟' : 'Have a Project in Mind?'}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {locale === 'ar'
              ? 'دعنا نساعدك في تحويل رؤيتك إلى واقع مع حلولنا الشاملة'
              : "Let's help you transform your vision into reality with our comprehensive solutions"
            }
          </p>
          <div className="flex gap-4 justify-center">
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