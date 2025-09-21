import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { FileText, Scale, AlertTriangle, CheckCircle, Ban, Globe } from 'lucide-react'
import Card from '@/components/ui/Card'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isRTL = locale === 'ar'

  return {
    title: isRTL ? 'شروط الاستخدام | MTP Engineering' : 'Terms of Use | MTP Engineering',
    description: isRTL
      ? 'شروط استخدام موقع MTP Engineering الإلكتروني'
      : 'Terms of use for MTP Engineering website',
  }
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const sections = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: isRTL ? 'قبول الشروط' : 'Acceptance of Terms',
      content: isRTL
        ? 'باستخدام موقع MTP Engineering الإلكتروني، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام موقعنا.'
        : 'By using the MTP Engineering website, you agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our website.',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: isRTL ? 'استخدام الموقع' : 'Use of Website',
      content: isRTL
        ? 'يُسمح لك باستخدام هذا الموقع لأغراض قانونية فقط. يُحظر استخدام الموقع بأي طريقة قد تضر أو تعطل الموقع أو تتداخل مع استخدام أي طرف آخر للموقع.'
        : 'You may use this website for lawful purposes only. You are prohibited from using the site in any way that could damage, disable, or impair the site or interfere with any other party\'s use of the site.',
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: isRTL ? 'الملكية الفكرية' : 'Intellectual Property',
      content: isRTL
        ? 'جميع المحتويات على هذا الموقع، بما في ذلك النصوص والصور والشعارات والرسومات، هي ملك لشركة MTP Engineering ومحمية بموجب قوانين حقوق الطبع والنشر.'
        : 'All content on this website, including text, images, logos, and graphics, is the property of MTP Engineering and is protected by copyright laws.',
    },
    {
      icon: <Ban className="h-6 w-6" />,
      title: isRTL ? 'الأنشطة المحظورة' : 'Prohibited Activities',
      content: isRTL
        ? 'يُحظر: محاولة الوصول غير المصرح به إلى أنظمتنا، نشر محتوى ضار أو مسيء، انتحال شخصية أي شخص أو كيان، أو جمع معلومات المستخدمين دون إذن.'
        : 'Prohibited: attempting unauthorized access to our systems, posting harmful or offensive content, impersonating any person or entity, or collecting user information without permission.',
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: isRTL ? 'إخلاء المسؤولية' : 'Disclaimer',
      content: isRTL
        ? 'يتم توفير المعلومات على هذا الموقع "كما هي" دون أي ضمانات. لا تتحمل MTP Engineering المسؤولية عن أي أضرار ناتجة عن استخدام هذا الموقع.'
        : 'Information on this website is provided "as is" without any warranties. MTP Engineering is not liable for any damages arising from the use of this website.',
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: isRTL ? 'القانون الحاكم' : 'Governing Law',
      content: isRTL
        ? 'تخضع هذه الشروط وتُفسر وفقًا لقوانين المملكة العربية السعودية. أي نزاعات تنشأ عن استخدام هذا الموقع ستخضع للولاية القضائية للمحاكم السعودية.'
        : 'These terms are governed by and construed in accordance with the laws of Saudi Arabia. Any disputes arising from the use of this website will be subject to the jurisdiction of Saudi courts.',
    },
  ]

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isRTL ? 'شروط الاستخدام' : 'Terms of Use'}
            </h1>
            <p className="text-xl opacity-90">
              {isRTL
                ? 'الشروط والأحكام التي تحكم استخدام موقعنا'
                : 'Terms and conditions governing the use of our website'}
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-secondary-600">
            {isRTL ? 'آخر تحديث: يناير 2025' : 'Last Updated: January 2025'}
            {' | '}
            {isRTL ? 'ساري المفعول: يناير 2025' : 'Effective Date: January 2025'}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              {isRTL ? 'مرحبًا بكم في MTP Engineering' : 'Welcome to MTP Engineering'}
            </h2>
            <div className="prose prose-lg max-w-none text-secondary-700">
              <p>
                {isRTL
                  ? 'يرجى قراءة شروط الاستخدام هذه بعناية قبل استخدام موقع MTP Engineering الإلكتروني. تحدد هذه الشروط حقوقك والتزاماتك القانونية فيما يتعلق باستخدامك لموقعنا وخدماتنا.'
                  : 'Please read these terms of use carefully before using the MTP Engineering website. These terms set forth your legal rights and obligations with respect to your use of our website and services.'}
              </p>
              <p>
                {isRTL
                  ? 'نحتفظ بالحق في تحديث أو تعديل هذه الشروط في أي وقت دون إشعار مسبق. استخدامك المستمر للموقع بعد أي تغييرات يعني موافقتك على الشروط المعدلة.'
                  : 'We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the website after any changes indicates your acceptance of the modified terms.'}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
              {isRTL ? 'الشروط والأحكام' : 'Terms and Conditions'}
            </h2>
            <div className="space-y-6">
              {sections.map((section, index) => (
                <Card key={index}>
                  <div className="flex items-start">
                    <div className="text-primary-600 mr-4 rtl:ml-4 rtl:mr-0">{section.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        {index + 1}. {section.title}
                      </h3>
                      <p className="text-secondary-700">{section.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Terms */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              {isRTL ? 'أحكام إضافية' : 'Additional Terms'}
            </h2>
            <div className="space-y-4 text-secondary-700">
              <div>
                <h3 className="font-semibold text-secondary-900 mb-2">
                  {isRTL ? 'حدود المسؤولية' : 'Limitation of Liability'}
                </h3>
                <p>
                  {isRTL
                    ? 'لن تكون MTP Engineering مسؤولة عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو خاصة أو تبعية ناتجة عن استخدامك أو عدم قدرتك على استخدام الموقع.'
                    : 'MTP Engineering shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use or inability to use the website.'}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900 mb-2">
                  {isRTL ? 'التعديلات' : 'Modifications'}
                </h3>
                <p>
                  {isRTL
                    ? 'نحتفظ بالحق في تعديل أو إيقاف الموقع أو أي جزء منه، مؤقتًا أو بشكل دائم، مع أو بدون إشعار.'
                    : 'We reserve the right to modify or discontinue the website or any part thereof, temporarily or permanently, with or without notice.'}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900 mb-2">
                  {isRTL ? 'قابلية الفصل' : 'Severability'}
                </h3>
                <p>
                  {isRTL
                    ? 'إذا تم اعتبار أي حكم من هذه الشروط غير صالح أو غير قابل للتنفيذ، فستظل الأحكام المتبقية سارية المفعول.'
                    : 'If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              {isRTL ? 'اتصل بنا' : 'Contact Us'}
            </h2>
            <p className="text-secondary-700 mb-4">
              {isRTL
                ? 'إذا كان لديك أي أسئلة حول شروط الاستخدام هذه، يرجى الاتصال بنا:'
                : 'If you have any questions about these terms of use, please contact us:'}
            </p>
            <div className="space-y-2 text-secondary-700">
              <p>
                <strong>{isRTL ? 'البريد الإلكتروني:' : 'Email:'}</strong> legal@mtp.com.sa
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
            <Link href={`/${locale}/privacy`} className="text-primary-600 hover:text-primary-700">
              {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link href={`/${locale}/contact`} className="text-primary-600 hover:text-primary-700">
              {isRTL ? 'اتصل بنا' : 'Contact Us'}
            </Link>
            <Link href={`/${locale}`} className="text-primary-600 hover:text-primary-700">
              {isRTL ? 'الصفحة الرئيسية' : 'Homepage'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}