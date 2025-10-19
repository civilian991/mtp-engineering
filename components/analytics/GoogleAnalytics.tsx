'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
    dataLayer: any[]
  }
}

interface GoogleAnalyticsProps {
  gtag_id: string
}

export default function GoogleAnalytics({ gtag_id }: GoogleAnalyticsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!gtag_id || !window.gtag) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

    window.gtag('config', gtag_id, {
      page_path: url,
    })
  }, [pathname, searchParams, gtag_id])

  if (!gtag_id) return null

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag_id}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag_id}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

// Analytics helper functions
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    })
  }
}

export const trackCustomEvent = (eventName: string, parameters: any = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Predefined tracking functions
export const trackContactFormSubmission = () => {
  trackEvent('submit', 'contact_form', 'contact_page')
}

export const trackCareerApplication = (jobId: string, jobTitle: string) => {
  trackEvent('apply', 'career', jobTitle, undefined)
  trackCustomEvent('career_application', {
    job_id: jobId,
    job_title: jobTitle
  })
}

export const trackProjectView = (projectId: string, projectName: string) => {
  trackEvent('view', 'project', projectName)
  trackCustomEvent('project_view', {
    project_id: projectId,
    project_name: projectName
  })
}

export const trackNewsView = (newsId: string, newsTitle: string) => {
  trackEvent('view', 'news', newsTitle)
  trackCustomEvent('news_view', {
    news_id: newsId,
    news_title: newsTitle
  })
}

export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent('search', 'site_search', query, resultsCount)
  trackCustomEvent('search', {
    search_term: query,
    results_count: resultsCount
  })
}

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('download', 'file', fileName)
  trackCustomEvent('file_download', {
    file_name: fileName,
    file_type: fileType
  })
}