import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  return (
    <>
      <HeroSection locale={locale as Locale} dictionary={dictionary} />
      <ServicesSection locale={locale as Locale} dictionary={dictionary} />
      <ProjectsSection locale={locale as Locale} dictionary={dictionary} />
    </>
  )
}