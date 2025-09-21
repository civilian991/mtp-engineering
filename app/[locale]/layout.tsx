import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'ar' ? 'MTP للاستشارات الهندسية' : 'MTP Engineering Consultants',
    description: locale === 'ar'
      ? 'شركة رائدة في الاستشارات الهندسية في المملكة العربية السعودية منذ 1980'
      : 'Leading engineering consultancy firm in Saudi Arabia since 1980',
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA',
      siteName: 'MTP Engineering',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  const dictionary = await getDictionary(locale as Locale)

  return (
    <html lang={locale} dir={dir}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header locale={locale as Locale} dictionary={dictionary} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale as Locale} dictionary={dictionary} />
      </body>
    </html>
  )
}