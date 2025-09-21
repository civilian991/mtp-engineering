import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  locale?: 'en' | 'ar'
  alternateLocale?: 'en' | 'ar'
  canonicalUrl?: string
}

const siteConfig = {
  name: 'Mansour for Trade & Projects',
  nameAr: 'منصور للتجارة والمشاريع',
  url: 'https://mtp.com.sa',
  description: 'Leader in Electro-Mechanical engineering and construction since 1980, qualified as a special grade company. Where performance meets the quality.',
  descriptionAr: 'رائدة في الهندسة والإنشاءات الكهروميكانيكية منذ 1980، مؤهلة كشركة من الدرجة الخاصة. حيث يلتقي الأداء بالجودة.',
  twitterHandle: '@MTPEngineering',
  defaultOgImage: '/images/og-image.jpg',
}

export function generateSEO({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author,
  locale = 'en',
  alternateLocale = 'ar',
  canonicalUrl,
}: SEOProps): Metadata {
  const isArabic = locale === 'ar'
  const siteName = isArabic ? siteConfig.nameAr : siteConfig.name
  const siteDescription = isArabic ? siteConfig.descriptionAr : siteConfig.description

  const finalTitle = title
    ? `${title} | ${siteName}`
    : siteName

  const finalDescription = description || siteDescription

  const defaultKeywords = isArabic
    ? ['هندسة', 'استشارات', 'السعودية', 'البناء', 'البنية التحتية', 'تصميم', 'مشاريع']
    : ['engineering', 'consultancy', 'Saudi Arabia', 'construction', 'infrastructure', 'design', 'projects']

  const finalKeywords = [...defaultKeywords, ...keywords].join(', ')

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    authors: author ? [{ name: author }] : [{ name: 'MTP Engineering' }],
    creator: 'MTP Engineering',
    publisher: 'MTP Engineering',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl || siteConfig.url,
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl || siteConfig.url,
      siteName: siteName,
      images: [
        {
          url: ogImage || siteConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: alternateLocale === 'ar' ? 'ar_SA' : 'en_US',
      type: ogType,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
      images: [ogImage || siteConfig.defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/safari-pinned-tab.svg',
        },
      ],
    },
    manifest: '/manifest.json',
    category: 'engineering',
  }
}

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    en: {
      title: undefined, // Use site name only
      description: 'Mansour for Trade & Projects (MTP) - Leading Electro-Mechanical contractor in Saudi Arabia since 1980. Specializing in electrical installations, HVAC systems, plumbing, fire fighting, and complete MEP solutions for hospitals, schools, hotels, and industrial buildings.',
      keywords: ['electro-mechanical contractor', 'MEP contractor Saudi Arabia', 'HVAC systems', 'electrical installations', 'fire fighting systems', 'plumbing contractor', 'special grade contractor'],
    },
    ar: {
      title: undefined,
      description: 'منصور للتجارة والمشاريع (MTP) - رائدة في المقاولات الكهروميكانيكية في المملكة العربية السعودية منذ 1980. متخصصون في التركيبات الكهربائية وأنظمة التكييف والسباكة ومكافحة الحريق وحلول MEP الكاملة للمستشفيات والمدارس والفنادق والمباني الصناعية.',
      keywords: ['مقاول كهروميكانيكي', 'مقاول MEP السعودية', 'أنظمة التكييف', 'التركيبات الكهربائية', 'أنظمة مكافحة الحريق', 'مقاول سباكة', 'مقاول درجة خاصة'],
    },
  },
  about: {
    en: {
      title: 'About Us',
      description: 'Learn about MTP Engineering\'s history, mission, and commitment to excellence in engineering consultancy services since 1980.',
      keywords: ['about MTP', 'engineering history', 'company profile', 'Saudi consultants'],
    },
    ar: {
      title: 'عن الشركة',
      description: 'تعرف على تاريخ ورسالة والتزام MTP للاستشارات الهندسية بالتميز في الخدمات الاستشارية الهندسية منذ 1980.',
      keywords: ['عن MTP', 'تاريخ الهندسة', 'ملف الشركة', 'استشاريون سعوديون'],
    },
  },
  projects: {
    en: {
      title: 'Our Projects',
      description: 'Explore MTP Engineering\'s portfolio of successful projects across various sectors including infrastructure, commercial, residential, and government developments.',
      keywords: ['engineering projects', 'portfolio', 'Saudi projects', 'infrastructure projects'],
    },
    ar: {
      title: 'مشاريعنا',
      description: 'اكتشف محفظة مشاريع MTP الهندسية الناجحة عبر قطاعات مختلفة بما في ذلك البنية التحتية والتجارية والسكنية والتطورات الحكومية.',
      keywords: ['مشاريع هندسية', 'محفظة', 'مشاريع سعودية', 'مشاريع البنية التحتية'],
    },
  },
  services: {
    en: {
      title: 'Our Services',
      description: 'Complete Electro-Mechanical contracting services including electrical installations, HVAC systems, plumbing & sanitary, fire fighting systems, low current systems, and project management for all types of buildings.',
      keywords: ['MEP contracting', 'electrical installation', 'HVAC systems', 'plumbing services', 'fire fighting systems', 'CCTV installation', 'PABX systems'],
    },
    ar: {
      title: 'خدماتنا',
      description: 'خدمات المقاولات الكهروميكانيكية الكاملة تشمل التركيبات الكهربائية وأنظمة التكييف والسباكة والصرف الصحي وأنظمة مكافحة الحريق وأنظمة التيار المنخفض وإدارة المشاريع لجميع أنواع المباني.',
      keywords: ['مقاولات MEP', 'تركيبات كهربائية', 'أنظمة التكييف', 'خدمات السباكة', 'أنظمة مكافحة الحريق', 'تركيب كاميرات المراقبة', 'أنظمة PABX'],
    },
  },
  careers: {
    en: {
      title: 'Careers',
      description: 'Join MTP Engineering and build your career with Saudi Arabia\'s leading engineering consultancy firm. Explore current job opportunities.',
      keywords: ['engineering jobs', 'careers Saudi Arabia', 'job opportunities', 'engineering careers'],
    },
    ar: {
      title: 'الوظائف',
      description: 'انضم إلى MTP للاستشارات الهندسية وابني مستقبلك المهني مع الشركة الرائدة في الاستشارات الهندسية في المملكة العربية السعودية. اكتشف فرص العمل الحالية.',
      keywords: ['وظائف هندسية', 'وظائف السعودية', 'فرص عمل', 'مهن هندسية'],
    },
  },
  contact: {
    en: {
      title: 'Contact Us',
      description: 'Get in touch with Mansour for Trade & Projects for your electro-mechanical contracting needs. Contact our office in Jeddah, Saudi Arabia. Tel: +966 2 653 4098',
      keywords: ['contact MTP', 'electro-mechanical contractor contact', 'Jeddah office', 'Saudi Arabia contractor'],
    },
    ar: {
      title: 'اتصل بنا',
      description: 'تواصل مع منصور للتجارة والمشاريع لاحتياجات المقاولات الكهروميكانيكية. اتصل بمكتبنا في جدة، المملكة العربية السعودية. هاتف: +966 2 653 4098',
      keywords: ['اتصل بـ MTP', 'اتصال مقاول كهروميكانيكي', 'مكتب جدة', 'مقاول السعودية'],
    },
  },
}