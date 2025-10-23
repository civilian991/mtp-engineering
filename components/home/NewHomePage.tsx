'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import ProjectSketch from '@/components/ProjectSketch'

interface HomePageProps {
  locale: Locale
  dictionary: any
  projects: any[]
}

function Counter({ end, suffix = '', prefix = '', delay = 0 }: { end: number; suffix?: string; prefix?: string; delay?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timer = setTimeout(() => {
      let startTime: number | null = null
      const duration = 2000
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)

        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(easeOutCubic * end))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }, [end, isVisible, delay])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  )
}

function Timeline({ locale }: { locale: Locale }) {
  const [hoveredEra, setHoveredEra] = useState<string | null>(null)
  const isRTL = locale === 'ar'

  const eraData = [
    { era: '1980s', milestone: locale === 'ar' ? 'التأسيس والنمو' : 'Foundation & Growth', projects: '50+' },
    { era: '1990s', milestone: locale === 'ar' ? 'التوسع والابتكار' : 'Expansion & Innovation', projects: '150+' },
    { era: '2000s', milestone: locale === 'ar' ? 'عصر المشاريع الضخمة' : 'Mega Projects Era', projects: '300+' },
    { era: '2020s', milestone: locale === 'ar' ? 'المدن الذكية والمستقبل' : 'Smart Cities & Future', projects: '400+' },
  ]

  // Don't reverse - the timeline is already correct
  const displayData = eraData

  return (
    <div className="w-full py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500/0 via-gold-500 to-gold-500/0 transform -translate-y-1/2"></div>

        <div className="relative flex items-center justify-between">
          {displayData.map((item, index) => (
            <div
              key={item.era}
              className="flex flex-col items-center group cursor-pointer relative"
              onMouseEnter={() => setHoveredEra(item.era)}
              onMouseLeave={() => setHoveredEra(null)}
            >
              <div className="relative">
                <div className="w-6 h-6 rounded-full bg-black border-2 border-gold-500 shadow-lg group-hover:scale-150 transition-all duration-500 relative z-20">
                  <div className="absolute inset-0 rounded-full bg-gold-500 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                </div>

                {index < displayData.length - 1 && (
                  <div className={`absolute top-1/2 ${isRTL ? 'right-full' : 'left-full'} w-[calc(100vw/4-1.5rem)] h-0.5 bg-gold-500/20 transform -translate-y-1/2 transition-all duration-500 group-hover:bg-gold-500/40`}></div>
                )}

                <div className={`absolute -top-20 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm border border-gold-500/50 rounded-lg p-3 whitespace-nowrap transition-all duration-300 pointer-events-none ${
                  hoveredEra === item.era ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  <p className="text-gold-500 font-bold text-sm">{item.projects} {locale === 'ar' ? 'مشروع' : 'Projects'}</p>
                  <p className="text-white text-xs mt-1">{item.milestone}</p>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black border-r border-b border-gold-500/50 rotate-45"></div>
                </div>
              </div>

              <span className="mt-6 text-gold-500 font-bold text-sm sm:text-base group-hover:text-gold-400 transition-colors">
                {item.era}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HistorySection({ locale, projects }: { locale: Locale; projects: any[] }) {
  const [selectedEra, setSelectedEra] = useState<string | null>(null)
  const isRTL = locale === 'ar'

  // Get 4 actual projects from the database
  const getProjectsByEra = () => {
    // If no projects available, return empty array
    if (!projects || projects.length === 0) {
      return []
    }

    // Prioritize featured projects, then sort by year
    const sortedProjects = [...projects]
      .sort((a, b) => {
        // Featured projects first
        if (a.is_featured && !b.is_featured) return -1
        if (!a.is_featured && b.is_featured) return 1
        // Then by year (newest first)
        return (b.year || 0) - (a.year || 0)
      })

    // Take first 4 projects
    const selectedProjects = sortedProjects.slice(0, 4)

    // Format the projects for display
    const formattedProjects = selectedProjects.map(project => {
      // Determine era based on year
      let era = '2020s'
      if (project.year) {
        if (project.year >= 2020) era = '2020s'
        else if (project.year >= 2010) era = '2010s'
        else if (project.year >= 2000) era = '2000s'
        else if (project.year >= 1990) era = '1990s'
        else era = '1980s'
      }

      // Generate unique variant (1-20) based on project ID for consistency
      // This ensures the same project always gets the same sketch
      const generateVariant = (id: string): number => {
        // Simple hash function to convert UUID to number
        let hash = 0
        for (let i = 0; i < id.length; i++) {
          hash = ((hash << 5) - hash) + id.charCodeAt(i)
          hash = hash & hash // Convert to 32-bit integer
        }
        // Return a number between 1-20
        return Math.abs(hash % 20) + 1
      }

      const variant = generateVariant(project.id)

      // Create short description (first 60 characters)
      const shortDesc = project.description_en
        ? (project.description_en.length > 60
          ? project.description_en.substring(0, 60) + '...'
          : project.description_en)
        : (project.sector || 'Engineering Excellence')

      const shortDescAr = project.description_ar
        ? (project.description_ar.length > 60
          ? project.description_ar.substring(0, 60) + '...'
          : project.description_ar)
        : (project.sector || 'التميز الهندسي')

      return {
        era,
        title: project.name_en || 'Project',
        title_ar: project.name_ar || project.name_en || 'مشروع',
        value: project.value ? `${(project.value / 1000000).toFixed(0)} M SAR` : shortDesc,
        value_ar: project.value ? `${(project.value / 1000000).toFixed(0)} ريال سعودي` : shortDescAr,
        variant,
        projectId: project.id,
      }
    })

    return formattedProjects
  }

  const items = getProjectsByEra()

  // If no items, don't render the section
  if (items.length === 0) {
    return null
  }

  return (
    <section className="bg-gradient-to-b from-black via-black/95 to-black py-16 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 35px, #C9A646 35px, #C9A646 36px),
                           repeating-linear-gradient(0deg, transparent, transparent 35px, #C9A646 35px, #C9A646 36px)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight whitespace-nowrap">
            {isRTL ? (
              <span className="text-gold-500 relative">
                تاريخنا
                <span className="absolute -bottom-2 left-0 right-0 w-full h-1 bg-gold-500/50 rounded-full"></span>
              </span>
            ) : (
              <>
                Our{' '}
                <span className="text-gold-500 relative">
                  History
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gold-500/50 rounded-full"></span>
                </span>
              </>
            )}
          </h2>
          <div className={`h-0.5 flex-1 ${isRTL ? 'mr-8' : 'ml-8'} ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-gold-500/50 to-transparent`}></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" dir={isRTL ? 'rtl' : 'ltr'}>
          {items.map((item, index) => {
            const cardKey = `${item.era}-${index}`
            const card = (
              <div
                className="group relative bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold-500/30 transition-all duration-700 hover:-translate-y-3 border border-gray-800 hover:border-gold-500/70 transform perspective-1000"
                style={{
                  animationDelay: `${index * 150}ms`,
                  transform: selectedEra === cardKey ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={() => setSelectedEra(cardKey)}
                onMouseLeave={() => setSelectedEra(null)}
              >
              <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
                <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out">
                  <ProjectSketch variant={item.variant} className="w-full h-full" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute top-4 right-4 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold text-xs px-3 py-2 rounded-lg shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                  <span className="relative z-10">{item.era}</span>
                </div>

                <div className="absolute top-4 left-4 w-12 h-12 border-2 border-gold-500/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                  <div className="w-6 h-6 bg-gold-500/20 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="p-6 relative bg-gradient-to-b from-transparent to-black/50">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-500 transition-colors duration-500 relative">
                  {locale === 'ar' ? item.title_ar : item.title}
                  <span className={`absolute ${isRTL ? '-right-6' : '-left-6'} top-1/2 -translate-y-1/2 w-2 h-8 bg-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ${isRTL ? 'origin-right' : 'origin-left'}`}></span>
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    {(() => {
                      const displayValue = locale === 'ar' && item.value_ar ? item.value_ar : item.value
                      const isMonetary = displayValue.includes('SAR') || displayValue.includes('ريال')

                      if (isMonetary) {
                        return (
                          <>
                            <p className="text-2xl font-bold text-gold-500 group-hover:text-gold-400 transition-colors">
                              {displayValue.split(' ')[0]}
                            </p>
                            <p className="text-xs text-gold-500/70 uppercase tracking-wider mt-1">
                              {displayValue.split(' ').slice(1).join(' ')}
                            </p>
                          </>
                        )
                      } else {
                        return (
                          <p className="text-sm text-gold-500/90 leading-relaxed">
                            {displayValue}
                          </p>
                        )
                      }
                    })()}
                  </div>

                  <div className="relative">
                    <svg
                      className={`w-8 h-8 text-gold-500/30 group-hover:text-gold-500 transform ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'} group-hover:scale-110 transition-all duration-500`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-xs text-gray-400">
                    {locale === 'ar' ? 'انقر لاستكشاف المشاريع' : `Click to explore ${item.era} projects`}
                  </p>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 to-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ${isRTL ? 'origin-right' : 'origin-left'}`}></div>
              </div>
            </div>
            )

            return item.projectId ? (
              <Link key={cardKey} href={`/${locale}/projects/${item.projectId}`} className="block">
                {card}
              </Link>
            ) : (
              <div key={cardKey}>{card}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ParticleBackground() {
  const [particles, setParticles] = useState<Array<{ left: string; top: string; delay: string; duration: string }>>([])

  useEffect(() => {
    const generatedParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`
    }))
    setParticles(generatedParticles)
  }, [])

  if (particles.length === 0) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gold-500/20 rounded-full animate-pulse"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration
          }}
        />
      ))}
    </div>
  )
}

export default function NewHomePage({ locale, dictionary, projects }: HomePageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center">
        <ParticleBackground />

        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Background showcasing MTP projects"
            fill
            className={`object-cover transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'} ${locale === 'ar' ? 'scale-x-[-1]' : ''}`}
            priority
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        <div className={`absolute inset-0 ${locale === 'ar' ? 'bg-gradient-to-l from-black/90 via-black/30 to-transparent' : 'bg-gradient-to-r from-black/90 via-black/30 to-transparent'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(201, 166, 70, 0.15) 0%, transparent 50%)`
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-20">
          <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block mb-6">
              <span className="text-gold-500 text-sm font-bold uppercase tracking-[0.3em] bg-gold-500/10 px-4 py-2 rounded-full border border-gold-500/30">
                {locale === 'ar' ? 'التميز منذ 1980' : 'Excellence Since 1980'}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-8 uppercase tracking-tighter relative">
              <span className="block relative">
                {locale === 'ar' ? 'حيث' : 'Where'}
                <span className="absolute -right-4 top-0 text-gold-500/20 text-6xl font-thin">_</span>
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-600 to-gold-400 relative py-2">
                {locale === 'ar' ? 'الأداء' : 'Performance'}
                <span className="absolute inset-0 bg-gradient-to-r from-gold-600/20 to-gold-400/20 blur-2xl"></span>
              </span>
              <span className="block relative">
                {locale === 'ar' ? 'يلتقي بالجودة' : 'Meets Quality'}
                <span className="absolute -bottom-4 left-0 w-32 h-1 bg-gradient-to-r from-gold-500 to-transparent rounded-full"></span>
              </span>
            </h1>
          </div>

          <div className={`flex items-center mb-12 gap-6 max-w-md transition-all duration-1000 delay-300 transform ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative">
              <span className="text-gold-500 font-bold text-2xl">1980</span>
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gold-500/50 rounded-full"></div>
            </div>

            <div className="flex-1 relative h-12">
              <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C9A646" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#C9A646" stopOpacity="1" />
                    <stop offset="100%" stopColor="#C9A646" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 20 Q 50 5, 100 20 T 200 20"
                  fill="none"
                  stroke="url(#waveGradient)"
                  strokeWidth="3"
                  className="animate-pulse"
                />
                <circle cx="100" cy="20" r="4" fill="#C9A646" className="animate-ping" />
              </svg>
            </div>

            <div className="relative">
              <span className="text-gold-500 font-bold text-2xl">2030</span>
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gold-500/50 rounded-full"></div>
            </div>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-16 mb-16 max-w-4xl transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-gold-500/5 to-transparent border border-gold-500/10 hover:border-gold-500/30 transition-all duration-500 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gold-500/5 rounded-2xl blur-xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              <div className="relative">
                <div className="text-5xl sm:text-6xl font-black mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-400">
                    <Counter end={44} suffix="+" delay={0} />
                  </span>
                </div>
                <p className="text-sm text-gray-400 uppercase tracking-[0.2em] font-semibold">
                  {locale === 'ar' ? 'سنة من التميز' : 'Years of Excellence'}
                </p>
              </div>
            </div>

            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-gold-500/5 to-transparent border border-gold-500/10 hover:border-gold-500/30 transition-all duration-500 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gold-500/5 rounded-2xl blur-xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              <div className="relative">
                <div className="text-5xl sm:text-6xl font-black mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-400">
                    <Counter end={400} suffix="M+" delay={200} />
                  </span>
                </div>
                <p className="text-sm text-gray-400 uppercase tracking-[0.2em] font-semibold">
                  {locale === 'ar' ? 'ريال سعودي مشاريع' : 'SAR Projects'}
                </p>
              </div>
            </div>

            <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-gold-500/5 to-transparent border border-gold-500/10 hover:border-gold-500/30 transition-all duration-500 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gold-500/5 rounded-2xl blur-xl scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              <div className="relative">
                <div className="text-5xl sm:text-6xl font-black mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-400">
                    <Counter end={500} suffix="+" delay={400} />
                  </span>
                </div>
                <p className="text-sm text-gray-400 uppercase tracking-[0.2em] font-semibold">
                  {locale === 'ar' ? 'موظف خبير' : 'Expert Staff'}
                </p>
              </div>
            </div>
          </div>

          <div className={`flex gap-4 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link
              href={`/${locale}/projects`}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gold-600 to-gold-500 text-black font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:shadow-2xl hover:shadow-gold-500/40 hover:scale-105 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative flex items-center gap-3">
                {locale === 'ar' ? 'عرض مشاريعنا' : 'View Our Projects'}
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="group relative inline-flex items-center gap-3 bg-transparent border-2 border-gold-500/50 text-gold-500 font-bold py-4 px-10 rounded-xl text-sm uppercase tracking-wider transition-all duration-500 hover:border-gold-500 hover:bg-gold-500/10 hover:scale-105"
            >
              <span className="relative flex items-center gap-3">
                {locale === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-black via-gray-950 to-black pb-16 relative">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A646' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <Timeline locale={locale} />
        <HistorySection locale={locale} projects={projects} />
      </section>
    </>
  )
}