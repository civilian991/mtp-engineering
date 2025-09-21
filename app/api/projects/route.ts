import { NextResponse } from 'next/server'

interface Project {
  id: string
  name_en: string
  name_ar: string
  description_en?: string
  description_ar?: string
  location_en: string
  location_ar: string
  year: string
  sector: string
  status: 'completed' | 'ongoing' | 'planned'
  is_legacy: boolean
  images?: string[]
}

// Mock database - in production, this would connect to a real database
const projects: Project[] = [
  {
    id: '1',
    name_en: 'King Abdulaziz International Airport Expansion',
    name_ar: 'توسعة مطار الملك عبدالعزيز الدولي',
    location_en: 'Jeddah',
    location_ar: 'جدة',
    year: '2023',
    sector: 'infrastructure',
    status: 'completed',
    is_legacy: false,
  },
  {
    id: '2',
    name_en: 'Riyadh Metro Line 3',
    name_ar: 'مترو الرياض الخط الثالث',
    location_en: 'Riyadh',
    location_ar: 'الرياض',
    year: '2022',
    sector: 'infrastructure',
    status: 'ongoing',
    is_legacy: false,
  },
  {
    id: '3',
    name_en: 'NEOM Smart City Infrastructure',
    name_ar: 'البنية التحتية لمدينة نيوم الذكية',
    location_en: 'NEOM',
    location_ar: 'نيوم',
    year: '2024',
    sector: 'government',
    status: 'ongoing',
    is_legacy: false,
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  let filteredProjects = [...projects]

  // Filter by sector
  const sector = searchParams.get('sector')
  if (sector && sector !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.sector === sector)
  }

  // Filter by status
  const status = searchParams.get('status')
  if (status && status !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.status === status)
  }

  // Filter by year
  const year = searchParams.get('year')
  if (year && year !== 'all') {
    if (year === 'legacy') {
      filteredProjects = filteredProjects.filter(p => parseInt(p.year) < 2020)
    } else {
      filteredProjects = filteredProjects.filter(p => p.year === year)
    }
  }

  // Search query
  const query = searchParams.get('q')
  if (query) {
    filteredProjects = filteredProjects.filter(p =>
      p.name_en.toLowerCase().includes(query.toLowerCase()) ||
      p.name_ar.includes(query)
    )
  }

  return NextResponse.json(filteredProjects)
}

export async function POST(request: Request) {
  try {
    const body: Omit<Project, 'id'> = await request.json()

    // Validate required fields
    if (!body.name_en || !body.name_ar || !body.location_en || !body.location_ar) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new project
    const newProject: Project = {
      ...body,
      id: Date.now().toString(),
    }

    projects.push(newProject)

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}