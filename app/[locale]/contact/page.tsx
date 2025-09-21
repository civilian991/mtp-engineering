'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Locale } from '@/lib/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export default function ContactPage({ params }: Props) {
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

  const locale: string = 'en' // Default for now
  const isRTL = locale === 'ar'

  const inquiryTypes = [
    { value: 'general', label: isRTL ? 'استفسار عام' : 'General Inquiry' },
    { value: 'project', label: isRTL ? 'مشروع جديد' : 'New Project' },
    { value: 'partnership', label: isRTL ? 'شراكة' : 'Partnership' },
    { value: 'career', label: isRTL ? 'وظائف' : 'Career' },
    { value: 'media', label: isRTL ? 'إعلام' : 'Media' },
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
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isRTL ? 'اتصل بنا' : 'Contact Us'}
            </h1>
            <p className="text-xl opacity-90">
              {isRTL
                ? 'نحن هنا للإجابة على استفساراتك ومناقشة مشاريعك'
                : "We're here to answer your questions and discuss your projects"}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              {/* Office Information */}
              <Card>
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                  {isRTL ? 'معلومات المكتب' : 'Office Information'}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary-600 mt-1 mr-3 rtl:ml-3 rtl:mr-0" />
                    <div>
                      <p className="font-medium text-secondary-900">
                        {isRTL ? 'المكتب الرئيسي' : 'Head Office'}
                      </p>
                      <p className="text-secondary-600">
                        {isRTL
                          ? 'الرياض، المملكة العربية السعودية'
                          : 'Riyadh, Saudi Arabia'}
                      </p>
                      <p className="text-secondary-600">
                        King Fahd Road, Al Olaya District
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary-600 mt-1 mr-3 rtl:ml-3 rtl:mr-0" />
                    <div>
                      <p className="font-medium text-secondary-900">
                        {isRTL ? 'الهاتف' : 'Phone'}
                      </p>
                      <p className="text-secondary-600" dir="ltr">
                        +966 11 XXX XXXX
                      </p>
                      <p className="text-secondary-600" dir="ltr">
                        +966 50 XXX XXXX
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary-600 mt-1 mr-3 rtl:ml-3 rtl:mr-0" />
                    <div>
                      <p className="font-medium text-secondary-900">
                        {isRTL ? 'البريد الإلكتروني' : 'Email'}
                      </p>
                      <p className="text-secondary-600">info@mtp.com.sa</p>
                      <p className="text-secondary-600">projects@mtp.com.sa</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary-600 mt-1 mr-3 rtl:ml-3 rtl:mr-0" />
                    <div>
                      <p className="font-medium text-secondary-900">
                        {isRTL ? 'ساعات العمل' : 'Business Hours'}
                      </p>
                      <p className="text-secondary-600">
                        {isRTL ? 'الأحد - الخميس' : 'Sunday - Thursday'}
                      </p>
                      <p className="text-secondary-600">8:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Branch Offices */}
              <Card>
                <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                  {isRTL ? 'الفروع' : 'Branch Offices'}
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-secondary-900">
                      {isRTL ? 'جدة' : 'Jeddah'}
                    </p>
                    <p className="text-secondary-600 text-sm">
                      Al Rawdah District
                    </p>
                    <p className="text-secondary-600 text-sm" dir="ltr">
                      +966 12 XXX XXXX
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-secondary-900">
                      {isRTL ? 'الدمام' : 'Dammam'}
                    </p>
                    <p className="text-secondary-600 text-sm">
                      Al Faisaliyah District
                    </p>
                    <p className="text-secondary-600 text-sm" dir="ltr">
                      +966 13 XXX XXXX
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
                  {isRTL ? 'أرسل رسالة' : 'Send a Message'}
                </h2>

                {isSubmitted ? (
                  <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-6">
                    <p className="text-success font-medium">
                      {isRTL
                        ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.'
                        : 'Your message has been sent successfully! We will contact you soon.'}
                    </p>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label={isRTL ? 'الاسم *' : 'Name *'}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label={isRTL ? 'البريد الإلكتروني *' : 'Email *'}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label={isRTL ? 'الهاتف' : 'Phone'}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Input
                      label={isRTL ? 'الشركة' : 'Company'}
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Select
                      label={isRTL ? 'نوع الاستفسار *' : 'Inquiry Type *'}
                      name="inquiry_type"
                      options={inquiryTypes}
                      value={formData.inquiry_type}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label={isRTL ? 'الموضوع *' : 'Subject *'}
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {isRTL ? 'الرسالة *' : 'Message *'}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder={isRTL
                        ? 'اكتب رسالتك هنا...'
                        : 'Write your message here...'}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      size="lg"
                      isLoading={isSubmitting}
                      className="min-w-[200px]"
                    >
                      {isSubmitting ? (
                        isRTL ? 'جاري الإرسال...' : 'Sending...'
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0" />
                          {isRTL ? 'إرسال الرسالة' : 'Send Message'}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <Card className="p-0 overflow-hidden">
              <div className="bg-secondary-200 h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                  <p className="text-secondary-600">
                    {isRTL ? 'خريطة الموقع' : 'Location Map'}
                  </p>
                  <p className="text-sm text-secondary-500 mt-2">
                    {isRTL
                      ? 'يمكن إضافة خريطة Google Maps هنا'
                      : 'Google Maps can be integrated here'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}