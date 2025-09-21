'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'

interface ApplicationFormProps {
  locale: string
  jobId: string
}

export default function ApplicationForm({ locale, jobId }: ApplicationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    nationality: '',
    current_position: '',
    years_experience: '',
    education_level: '',
    cover_letter: '',
    linkedin_url: '',
    portfolio_url: '',
    availability: '',
    expected_salary: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const isRTL = locale === 'ar'

  const educationOptions = [
    { value: '', label: isRTL ? 'اختر...' : 'Select...' },
    { value: 'high_school', label: isRTL ? 'ثانوية عامة' : 'High School' },
    { value: 'diploma', label: isRTL ? 'دبلوم' : 'Diploma' },
    { value: 'bachelor', label: isRTL ? 'بكالوريوس' : "Bachelor's Degree" },
    { value: 'master', label: isRTL ? 'ماجستير' : "Master's Degree" },
    { value: 'phd', label: isRTL ? 'دكتوراه' : 'PhD' },
  ]

  const nationalityOptions = [
    { value: '', label: isRTL ? 'اختر...' : 'Select...' },
    { value: 'saudi', label: isRTL ? 'سعودي' : 'Saudi' },
    { value: 'gcc', label: isRTL ? 'خليجي' : 'GCC National' },
    { value: 'arab', label: isRTL ? 'عربي' : 'Arab' },
    { value: 'other', label: isRTL ? 'أخرى' : 'Other' },
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full text-center">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            {isRTL ? 'تم إرسال طلبك بنجاح!' : 'Application Submitted Successfully!'}
          </h2>
          <p className="text-secondary-600 mb-6">
            {isRTL
              ? 'شكرًا لاهتمامك. سنراجع طلبك ونتواصل معك قريبًا.'
              : 'Thank you for your interest. We will review your application and contact you soon.'}
          </p>
          <Link href={`/${locale}/careers`}>
            <Button variant="primary">
              {isRTL ? 'العودة إلى الوظائف' : 'Back to Careers'}
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href={`/${locale}/careers`}>
            <button className="flex items-center text-primary-600 hover:text-primary-700 mb-6">
              <ArrowLeft className={`h-5 w-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {isRTL ? 'العودة إلى الوظائف' : 'Back to Careers'}
            </button>
          </Link>

          <Card>
            <h1 className="text-2xl font-bold text-secondary-900 mb-2">
              {isRTL ? 'نموذج التقديم للوظيفة' : 'Job Application Form'}
            </h1>
            <p className="text-secondary-600 mb-8">
              {isRTL
                ? 'يرجى ملء جميع الحقول المطلوبة'
                : 'Please fill in all required fields'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  {isRTL ? 'المعلومات الشخصية' : 'Personal Information'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label={isRTL ? 'الاسم الكامل *' : 'Full Name *'}
                    name="full_name"
                    value={formData.full_name}
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
                  <Input
                    label={isRTL ? 'رقم الهاتف *' : 'Phone Number *'}
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <Select
                    label={isRTL ? 'الجنسية *' : 'Nationality *'}
                    name="nationality"
                    options={nationalityOptions}
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  {isRTL ? 'المعلومات المهنية' : 'Professional Information'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label={isRTL ? 'المنصب الحالي' : 'Current Position'}
                    name="current_position"
                    value={formData.current_position}
                    onChange={handleChange}
                  />
                  <Input
                    label={isRTL ? 'سنوات الخبرة *' : 'Years of Experience *'}
                    name="years_experience"
                    type="number"
                    min="0"
                    value={formData.years_experience}
                    onChange={handleChange}
                    required
                  />
                  <Select
                    label={isRTL ? 'المستوى التعليمي *' : 'Education Level *'}
                    name="education_level"
                    options={educationOptions}
                    value={formData.education_level}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label={isRTL ? 'الراتب المتوقع (SAR)' : 'Expected Salary (SAR)'}
                    name="expected_salary"
                    type="number"
                    min="0"
                    value={formData.expected_salary}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  {isRTL ? 'معلومات إضافية' : 'Additional Information'}
                </h3>
                <div className="space-y-4">
                  <Input
                    label={isRTL ? 'رابط LinkedIn' : 'LinkedIn URL'}
                    name="linkedin_url"
                    type="url"
                    value={formData.linkedin_url}
                    onChange={handleChange}
                  />
                  <Input
                    label={isRTL ? 'رابط الأعمال' : 'Portfolio URL'}
                    name="portfolio_url"
                    type="url"
                    value={formData.portfolio_url}
                    onChange={handleChange}
                  />
                  <Input
                    label={isRTL ? 'متى يمكنك البدء؟' : 'When can you start?'}
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                  />
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      {isRTL ? 'خطاب التقديم' : 'Cover Letter'}
                    </label>
                    <textarea
                      name="cover_letter"
                      rows={5}
                      className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      value={formData.cover_letter}
                      onChange={handleChange}
                      placeholder={isRTL ? 'اكتب خطاب التقديم هنا...' : 'Write your cover letter here...'}
                    />
                  </div>
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  {isRTL ? 'السيرة الذاتية' : 'Resume/CV'}
                </h3>
                <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                  <p className="text-secondary-600 mb-2">
                    {isRTL
                      ? 'اسحب وأفلت ملف السيرة الذاتية هنا، أو انقر للاختيار'
                      : 'Drag and drop your CV here, or click to select'}
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload">
                    <Button variant="outline" size="sm" as="span">
                      {isRTL ? 'اختر ملف' : 'Choose File'}
                    </Button>
                  </label>
                  <p className="text-xs text-secondary-500 mt-2">
                    PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Link href={`/${locale}/careers`}>
                  <Button variant="outline">
                    {isRTL ? 'إلغاء' : 'Cancel'}
                  </Button>
                </Link>
                <Button type="submit" isLoading={isSubmitting}>
                  {isSubmitting
                    ? isRTL ? 'جاري الإرسال...' : 'Submitting...'
                    : isRTL ? 'إرسال الطلب' : 'Submit Application'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}