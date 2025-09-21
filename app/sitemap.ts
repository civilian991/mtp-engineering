import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mtp.com.sa'
  const locales = ['en', 'ar']

  const routes = [
    '',
    '/projects',
    '/careers',
    '/contact',
  ]

  const urls: MetadataRoute.Sitemap = []

  locales.forEach(locale => {
    routes.forEach(route => {
      urls.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return urls
}