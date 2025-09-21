import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Shield, Lock, Eye, Database, Globe, Mail } from 'lucide-react'
import Card from '@/components/ui/Card'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isRTL = locale === 'ar'

  return {
    title: isRTL ? 'سياسة الخصوصية | MTP Engineering' : 'Privacy Policy | MTP Engineering',
    description: isRTL
      ? 'سياسة الخصوصية وحماية البيانات لشركة MTP Engineering'
      : 'Privacy policy and data protection for MTP Engineering',
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const sections = [
    {
      icon: <Database className="h-6 w-6" />,
      title: isRTL ? 'جمع المعلومات' : 'Information Collection',
      content: isRTL
        ? 'نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند استخدام موقعنا، بما في ذلك الاسم والبريد الإلكتروني ورقم الهاتف وتفاصيل الشركة عند ملء نماذج الاتصال أو التقديم على الوظائف.'
        : 'We collect information you provide directly when using our website, including name, email, phone number, and company details when filling out contact forms or job applications.',
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: isRTL ? 'استخدام المعلومات' : 'Information Use',
      content: isRTL
        ? 'نستخدم المعلومات المجمعة للرد على استفساراتك، ومعالجة طلبات التوظيف، وتحسين خدماتنا، وإرسال التحديثات ذات الصلة بموافقتك.'
        : 'We use collected information to respond to inquiries, process job applications, improve our services, and send relevant updates with your consent.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: isRTL ? 'حماية البيانات' : 'Data Protection',
      content: isRTL
        ? 'نطبق إجراءات أمنية صارمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التغيير أو الكشف أو التدمير.'
        : 'We implement strict security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: isRTL ? 'ملفات تعريف الارتباط' : 'Cookies',
      content: isRTL
        ? 'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل حركة المرور على الموقع. يمكنك تعطيل ملفات تعريف الارتباط من إعدادات المتصفح.'
        : 'We use cookies to enhance browsing experience and analyze site traffic. You can disable cookies through your browser settings.',
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: isRTL ? 'مشاركة البيانات' : 'Data Sharing',
      content: isRTL
        ? 'لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية. قد نشارك المعلومات مع مقدمي الخدمات الموثوقين الذين يساعدوننا في تشغيل موقعنا.'
        : 'We do not sell, rent, or share your personal information with third parties for marketing purposes. We may share information with trusted service providers who help us operate our website.',
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: isRTL ? 'حقوقك' : 'Your Rights',
      content: isRTL
        ? 'لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها أو حذفها. يمكنك أيضًا إلغاء الاشتراك في اتصالاتنا التسويقية في أي وقت.'
        : 'You have the right to access, correct, or delete your personal information. You can also opt-out of our marketing communications at any time.',
    },
  ]

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </h1>
            <p className="text-xl opacity-90">
              {isRTL
                ? 'التزامنا بحماية خصوصيتك وبياناتك'
                : 'Our commitment to protecting your privacy and data'}
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-secondary-600">
            {isRTL ? 'آخر تحديث: يناير 2025' : 'Last Updated: January 2025'}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              {isRTL ? 'مقدمة' : 'Introduction'}
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                {isRTL
                  ? 'في MTP Engineering، نحن ملتزمون بحماية خصوصيتك واحترام بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا للمعلومات التي تقدمها عند استخدام موقعنا الإلكتروني وخدماتنا.'
                  : 'At MTP Engineering, we are committed to protecting your privacy and respecting your personal data. This privacy policy explains how we collect, use, and protect the information you provide when using our website and services.'}
              </p>
              <p>
                {isRTL
                  ? 'باستخدام موقعنا، فإنك توافق على ممارسات جمع واستخدام المعلومات الموضحة في هذه السياسة.'
                  : 'By using our website, you agree to the collection and use of information practices described in this policy.'}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
              {isRTL ? 'سياستنا' : 'Our Policy'}
            </h2>
            <div className="space-y-6">
              {sections.map((section, index) => (
                <Card key={index}>
                  <div className="flex items-start">
                    <div className="text-primary-600 mr-4 rtl:ml-4 rtl:mr-0">{section.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">{section.title}</h3>
                      <p className="text-secondary-700">{section.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto bg-primary-50">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              {isRTL ? 'اتصل بنا' : 'Contact Us'}
            </h2>
            <p className="text-secondary-700 mb-4">
              {isRTL
                ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارساتنا، يرجى الاتصال بنا:'
                : 'If you have any questions about this privacy policy or our practices, please contact us:'}
            </p>
            <div className="space-y-2 text-secondary-700">
              <p>
                <strong>{isRTL ? 'البريد الإلكتروني:' : 'Email:'}</strong> privacy@mtp.com.sa
              </p>
              <p>
                <strong>{isRTL ? 'الهاتف:' : 'Phone:'}</strong> +966 11 XXX XXXX
              </p>
              <p>
                <strong>{isRTL ? 'العنوان:' : 'Address:'}</strong>{' '}
                {isRTL
                  ? 'الرياض، المملكة العربية السعودية'
                  : 'Riyadh, Saudi Arabia'}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-8 bg-secondary-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 rtl:space-x-reverse">
            <Link href={`/${locale}/terms`} className="text-primary-600 hover:text-primary-700">
              {isRTL ? 'شروط الاستخدام' : 'Terms of Use'}
            </Link>
            <Link href={`/${locale}/contact`} className="text-primary-600 hover:text-primary-700">
              {isRTL ? 'اتصل بنا' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}