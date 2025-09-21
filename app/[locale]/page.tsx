import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { getServices } from '@/lib/dal/services'
import { getFeaturedProjects } from '@/lib/dal/projects'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  // Fetch data from database
  const services = await getServices()
  const featuredProjects = await getFeaturedProjects()

  return (
    <>
      <HeroSection locale={locale as Locale} dictionary={dictionary} />
      <ServicesSection locale={locale as Locale} dictionary={dictionary} services={services} />
      <ProjectsSection locale={locale as Locale} dictionary={dictionary} projects={featuredProjects} />
    </>
  )
}