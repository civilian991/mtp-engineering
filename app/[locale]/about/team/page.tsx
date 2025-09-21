import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { Mail, Linkedin, Users } from 'lucide-react'
import Card from '@/components/ui/Card'
import Link from 'next/link'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isRTL = locale === 'ar'

  return {
    title: isRTL ? 'فريق القيادة | MTP Engineering' : 'Leadership Team | MTP Engineering',
    description: isRTL
      ? 'تعرف على فريق القيادة في MTP Engineering'
      : 'Meet the leadership team at MTP Engineering',
  }
}

interface TeamMember {
  name: string
  nameAr: string
  position: string
  positionAr: string
  bio: string
  bioAr: string
  image: string
  email: string
  linkedin?: string
  experience: string
  education: string[]
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params
  const isRTL = locale === 'ar'
  const dictionary = await getDictionary(locale as Locale)

  const executives: TeamMember[] = [
    {
      name: 'Dr. Mohammed Al-Rashid',
      nameAr: 'د. محمد الراشد',
      position: 'Chief Executive Officer',
      positionAr: 'الرئيس التنفيذي',
      bio: 'With over 30 years of experience in engineering consultancy, Dr. Al-Rashid has led MTP through significant growth and transformation.',
      bioAr: 'مع أكثر من 30 عامًا من الخبرة في الاستشارات الهندسية، قاد الدكتور الراشد شركة MTP خلال نمو وتحول كبير.',
      image: '/team/ceo.jpg',
      email: 'ceo@mtp.com.sa',
      linkedin: 'mohammed-alrashid',
      experience: '30+ years',
      education: ['PhD in Civil Engineering, MIT', 'MBA, Harvard Business School'],
    },
    {
      name: 'Eng. Ahmed Hassan',
      nameAr: 'م. أحمد حسن',
      position: 'Chief Operating Officer',
      positionAr: 'الرئيس التشغيلي',
      bio: 'Ahmed oversees all operational aspects of MTP, ensuring project delivery excellence and client satisfaction.',
      bioAr: 'يشرف أحمد على جميع الجوانب التشغيلية لشركة MTP، مما يضمن التميز في تسليم المشاريع ورضا العملاء.',
      image: '/team/coo.jpg',
      email: 'ahmed.hassan@mtp.com.sa',
      linkedin: 'ahmed-hassan',
      experience: '25+ years',
      education: ["Master's in Engineering Management, Stanford", 'BSc Civil Engineering, KFUPM'],
    },
    {
      name: 'Eng. Fatima Al-Zahra',
      nameAr: 'م. فاطمة الزهراء',
      position: 'Chief Technical Officer',
      positionAr: 'الرئيس الفني',
      bio: 'Fatima leads technical innovation and ensures MTP stays at the forefront of engineering technology.',
      bioAr: 'تقود فاطمة الابتكار الفني وتضمن بقاء MTP في طليعة تكنولوجيا الهندسة.',
      image: '/team/cto.jpg',
      email: 'fatima.alzahra@mtp.com.sa',
      experience: '22+ years',
      education: ["Master's in Structural Engineering, UC Berkeley", 'BSc Civil Engineering, KSU'],
    },
  ]

  const departmentHeads: TeamMember[] = [
    {
      name: 'Eng. Khalid Al-Mutairi',
      nameAr: 'م. خالد المطيري',
      position: 'Head of Civil Engineering',
      positionAr: 'رئيس قسم الهندسة المدنية',
      bio: 'Khalid leads our civil engineering department with expertise in infrastructure and structural design.',
      bioAr: 'يقود خالد قسم الهندسة المدنية لدينا بخبرة في البنية التحتية والتصميم الهيكلي.',
      image: '/team/civil-head.jpg',
      email: 'khalid.mutairi@mtp.com.sa',
      experience: '18+ years',
      education: ["Master's in Structural Engineering", 'Professional Engineer (PE)'],
    },
    {
      name: 'Eng. Sarah Abdullah',
      nameAr: 'م. سارة عبدالله',
      position: 'Head of Project Management',
      positionAr: 'رئيس قسم إدارة المشاريع',
      bio: 'Sarah ensures successful delivery of all projects through effective planning and resource management.',
      bioAr: 'تضمن سارة التسليم الناجح لجميع المشاريع من خلال التخطيط الفعال وإدارة الموارد.',
      image: '/team/pm-head.jpg',
      email: 'sarah.abdullah@mtp.com.sa',
      experience: '15+ years',
      education: ['PMP Certified', "Master's in Project Management"],
    },
    {
      name: 'Dr. Omar Al-Qahtani',
      nameAr: 'د. عمر القحطاني',
      position: 'Head of Environmental Engineering',
      positionAr: 'رئيس قسم الهندسة البيئية',
      bio: 'Dr. Al-Qahtani specializes in sustainable engineering solutions and environmental impact assessments.',
      bioAr: 'يتخصص الدكتور القحطاني في الحلول الهندسية المستدامة وتقييمات الأثر البيئي.',
      image: '/team/env-head.jpg',
      email: 'omar.qahtani@mtp.com.sa',
      experience: '20+ years',
      education: ['PhD in Environmental Engineering', 'LEED AP'],
    },
  ]

  const allTeamMembers = [...executives, ...departmentHeads]

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {isRTL ? 'فريق القيادة' : 'Leadership Team'}
            </h1>
            <p className="text-xl opacity-90">
              {isRTL
                ? 'قيادة ذات رؤية تدفع الابتكار والتميز'
                : 'Visionary leadership driving innovation and excellence'}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-sm">
            <Link href={`/${locale}`} className="text-secondary-600 hover:text-primary-600">
              {isRTL ? 'الرئيسية' : 'Home'}
            </Link>
            <span className="mx-2 text-secondary-400">/</span>
            <Link href={`/${locale}/about`} className="text-secondary-600 hover:text-primary-600">
              {isRTL ? 'من نحن' : 'About'}
            </Link>
            <span className="mx-2 text-secondary-400">/</span>
            <span className="text-secondary-900">{isRTL ? 'الفريق' : 'Team'}</span>
          </nav>
        </div>
      </section>

      {/* Executive Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
              {isRTL ? 'الفريق التنفيذي' : 'Executive Team'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {executives.map((member, index) => (
                <Card key={index} className="text-center">
                  <div className="w-32 h-32 bg-secondary-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-16 w-16 text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary-900 mb-1">
                    {isRTL ? member.nameAr : member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {isRTL ? member.positionAr : member.position}
                  </p>
                  <p className="text-secondary-600 text-sm mb-4">
                    {isRTL ? member.bioAr : member.bio}
                  </p>
                  <div className="border-t pt-4">
                    <p className="text-sm text-secondary-500 mb-2">
                      <span className="font-medium">{isRTL ? 'الخبرة:' : 'Experience:'}</span> {member.experience}
                    </p>
                    <div className="flex justify-center space-x-3 rtl:space-x-reverse">
                      <a
                        href={`mailto:${member.email}`}
                        className="text-secondary-600 hover:text-primary-600"
                        aria-label="Email"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                      {member.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${member.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary-600 hover:text-primary-600"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Department Heads */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 text-center mb-12">
              {isRTL ? 'رؤساء الأقسام' : 'Department Heads'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {departmentHeads.map((member, index) => (
                <Card key={index}>
                  <div className="flex items-start">
                    <div className="w-20 h-20 bg-secondary-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-10 w-10 text-secondary-400" />
                    </div>
                    <div className="ml-4 rtl:mr-4 rtl:ml-0">
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {isRTL ? member.nameAr : member.name}
                      </h3>
                      <p className="text-primary-600 text-sm font-medium mb-2">
                        {isRTL ? member.positionAr : member.position}
                      </p>
                      <p className="text-secondary-600 text-sm mb-3">
                        {isRTL ? member.bioAr : member.bio}
                      </p>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <a
                          href={`mailto:${member.email}`}
                          className="text-secondary-500 hover:text-primary-600 text-sm"
                        >
                          <Mail className="h-4 w-4 inline mr-1 rtl:ml-1 rtl:mr-0" />
                          {isRTL ? 'بريد إلكتروني' : 'Email'}
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary-600 to-primary-700 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">200+</div>
                <div className="text-primary-100">{isRTL ? 'موظف' : 'Employees'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-primary-100">{isRTL ? 'مهندس معتمد' : 'Certified Engineers'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold">15+</div>
                <div className="text-primary-100">{isRTL ? 'جنسية' : 'Nationalities'}</div>
              </div>
              <div>
                <div className="text-3xl font-bold">25</div>
                <div className="text-primary-100">{isRTL ? 'متوسط سنوات الخبرة' : 'Avg Years Experience'}</div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}