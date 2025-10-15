import NewHomePage from '@/components/home/NewHomePage'
import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/lib/i18n'
import { getProjects } from '@/lib/dal/projects'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const dictionary = await getDictionary(locale as Locale)

  // Fetch all projects ordered by year for the history section
  const projects = await getProjects()

  return (
    <NewHomePage locale={locale as Locale} dictionary={dictionary} projects={projects} />
  )
}