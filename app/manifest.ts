import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MTP Engineering Consultancy',
    short_name: 'MTP',
    description: 'Leading engineering consultancy in Saudi Arabia with 40+ years of excellence',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#155e75',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}