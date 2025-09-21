import ApplicationForm from './application-form'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'ar' ? 'تقديم طلب وظيفة | MTP' : 'Job Application | MTP',
    description: locale === 'ar'
      ? 'قدم طلبك للانضمام إلى فريقنا'
      : 'Apply to join our team',
  }
}

export default async function JobApplicationPage({ params }: Props) {
  const { locale, id } = await params

  return <ApplicationForm locale={locale} jobId={id} />
}