'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Locale } from '@/lib/i18n'
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Building2, Globe } from 'lucide-react'

export default function ContactPage() {
  const params = useParams()
  const locale = (params.locale as Locale) || 'en'
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    inquiry_type: 'general',
    message: '',
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const inquiryTypes = [
    { value: 'general', label: { en: 'General Inquiry', ar: 'استفسار عام' } },
    { value: 'project', label: { en: 'New Project', ar: 'مشروع جديد' } },
    { value: 'partnership', label: { en: 'Partnership', ar: 'شراكة' } },
    { value: 'career', label: { en: 'Career', ar: 'وظائف' } },
    { value: 'support', label: { en: 'Technical Support', ar: 'دعم فني' } },
  ]

  const contactInfo = [
    {
      icon: MapPin,
      title: { en: 'Head Office', ar: 'المكتب الرئيسي' },
      details: [
        { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، المملكة العربية السعودية' },
        { en: 'King Fahd Road, Al Olaya', ar: 'طريق الملك فهد، العليا' }
      ]
    },
    {
      icon: Phone,
      title: { en: 'Phone', ar: 'الهاتف' },
      details: ['+966 11 XXX XXXX', '+966 50 XXX XXXX']
    },
    {
      icon: Mail,
      title: { en: 'Email', ar: 'البريد الإلكتروني' },
      details: ['info@mtp.com.sa', 'projects@mtp.com.sa']
    },
    {
      icon: Clock,
      title: { en: 'Business Hours', ar: 'ساعات العمل' },
      details: [
        { en: 'Sunday - Thursday', ar: 'الأحد - الخميس' },
        '8:00 AM - 5:00 PM'
      ]
    }
  ]

  const branches = [
    {
      city: { en: 'Jeddah', ar: 'جدة' },
      district: 'Al Rawdah District',
      phone: '+966 12 XXX XXXX'
    },
    {
      city: { en: 'Dammam', ar: 'الدمام' },
      district: 'Al Faisaliyah District',
      phone: '+966 13 XXX XXXX'
    },
    {
      city: { en: 'Jubail', ar: 'الجبيل' },
      district: 'Industrial Area',
      phone: '+966 13 XXX XXXX'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        inquiry_type: 'general',
        message: '',
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
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
              {locale === 'ar' ? 'تواصل معنا' : 'Get In Touch'}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
              {locale === 'ar' ? 'دعنا' : "Let's"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400">
                {locale === 'ar' ? 'نتحدث' : 'Talk'}
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {locale === 'ar'
                ? 'نحن هنا للإجابة على استفساراتك ومناقشة مشاريعك المستقبلية'
                : "We're here to answer your questions and discuss your future projects"
              }
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border border-gray-800 hover:border-gold-500/50 transition-all duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-500/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <Icon className="w-8 h-8 text-gold-500 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-3">
                    {typeof info.title === 'object' ? info.title[locale] : info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-400 text-sm">
                        {typeof detail === 'object' ? detail[locale] : detail}
                      </p>
                    ))}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                </div>
              )
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Branch Offices */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Building2 className="w-6 h-6 text-gold-500 mr-2" />
                  {locale === 'ar' ? 'فروعنا' : 'Our Branches'}
                </h2>
                <div className="space-y-6">
                  {branches.map((branch, index) => (
                    <div key={index} className="group">
                      <h3 className="text-lg font-semibold text-gold-500 mb-2">
                        {typeof branch.city === 'object' ? branch.city[locale] : branch.city}
                      </h3>
                      <p className="text-gray-400 text-sm">{branch.district}</p>
                      <p className="text-gray-400 text-sm">{branch.phone}</p>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-gold-600 to-gold-400 mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border border-gray-800 mt-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Globe className="w-6 h-6 text-gold-500 mr-2" />
                  {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
                </h2>
                <div className="space-y-3">
                  {['LinkedIn', 'Twitter', 'WhatsApp Business'].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="block text-gray-400 hover:text-gold-500 transition-colors duration-300"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MessageSquare className="w-6 h-6 text-gold-500 mr-2" />
                  {locale === 'ar' ? 'أرسل رسالة' : 'Send a Message'}
                </h2>

                {isSubmitted && (
                  <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-4 mb-6">
                    <p className="text-gold-500 font-medium">
                      {locale === 'ar'
                        ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.'
                        : 'Your message has been sent successfully! We will contact you soon.'}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {locale === 'ar' ? 'الاسم *' : 'Name *'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder={locale === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {locale === 'ar' ? 'البريد الإلكتروني *' : 'Email *'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder={locale === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {locale === 'ar' ? 'الهاتف' : 'Phone'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder={locale === 'ar' ? 'رقم هاتفك' : 'Your phone number'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {locale === 'ar' ? 'الشركة' : 'Company'}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder={locale === 'ar' ? 'اسم شركتك' : 'Your company name'}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {locale === 'ar' ? 'نوع الاستفسار *' : 'Inquiry Type *'}
                      </label>
                      <select
                        name="inquiry_type"
                        value={formData.inquiry_type}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gold-500 transition-colors"
                      >
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label[locale]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {locale === 'ar' ? 'الموضوع *' : 'Subject *'}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder={locale === 'ar' ? 'موضوع رسالتك' : 'Message subject'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {locale === 'ar' ? 'الرسالة *' : 'Message *'}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      placeholder={locale === 'ar'
                        ? 'اكتب رسالتك هنا...'
                        : 'Write your message here...'}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      <span className="relative flex items-center">
                        {isSubmitting ? (
                          locale === 'ar' ? 'جاري الإرسال...' : 'Sending...'
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            {locale === 'ar' ? 'إرسال الرسالة' : 'Send Message'}
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800">
              <div className="h-96 bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gold-500/30 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">
                    {locale === 'ar' ? 'موقعنا على الخريطة' : 'Our Location'}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {locale === 'ar'
                      ? 'يمكن إضافة خريطة Google Maps هنا'
                      : 'Google Maps can be integrated here'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gold-500/5 to-transparent"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            {locale === 'ar' ? 'جاهز لبدء مشروعك؟' : 'Ready to Start Your Project?'}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {locale === 'ar'
              ? 'فريقنا من الخبراء جاهز لمساعدتك في تحقيق أهدافك'
              : 'Our team of experts is ready to help you achieve your goals'
            }
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href={`tel:+966111234567`}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                {locale === 'ar' ? 'اتصل الآن' : 'Call Now'}
              </span>
            </a>
            <a
              href="https://wa.me/966501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-transparent border-2 border-gold-500/50 text-gold-500 font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:border-gold-500 hover:bg-gold-500/10 hover:scale-105"
            >
              {locale === 'ar' ? 'واتساب' : 'WhatsApp'}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}