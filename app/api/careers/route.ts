import { NextResponse } from 'next/server'

interface JobPosting {
  id: string
  title_en: string
  title_ar: string
  department: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  experience: string
  description_en: string
  description_ar: string
  requirements_en: string[]
  requirements_ar: string[]
  posted_date: string
  is_active: boolean
}

// Mock database
const jobs: JobPosting[] = [
  {
    id: '1',
    title_en: 'Senior Civil Engineer',
    title_ar: 'مهندس مدني أول',
    department: 'Civil Engineering',
    location: 'Riyadh',
    type: 'full-time',
    experience: '5-7 years',
    description_en: 'We are seeking an experienced Senior Civil Engineer to lead infrastructure projects.',
    description_ar: 'نبحث عن مهندس مدني أول ذو خبرة لقيادة مشاريع البنية التحتية.',
    requirements_en: ["Bachelor's degree in Civil Engineering", "5+ years experience", "PMP certification preferred"],
    requirements_ar: ["بكالوريوس هندسة مدنية", "خبرة 5 سنوات أو أكثر", "شهادة PMP مفضلة"],
    posted_date: '2025-01-10',
    is_active: true,
  },
  {
    id: '2',
    title_en: 'Project Manager',
    title_ar: 'مدير مشروع',
    department: 'Project Management',
    location: 'Jeddah',
    type: 'full-time',
    experience: '7-10 years',
    description_en: 'Looking for an experienced Project Manager to oversee large-scale construction projects.',
    description_ar: 'نبحث عن مدير مشروع ذو خبرة للإشراف على مشاريع البناء الكبرى.',
    requirements_en: ["Bachelor's degree in Engineering", "7+ years in project management", "Fluent in Arabic and English"],
    requirements_ar: ["بكالوريوس في الهندسة", "7 سنوات خبرة في إدارة المشاريع", "إجادة اللغتين العربية والإنجليزية"],
    posted_date: '2025-01-05',
    is_active: true,
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  let filteredJobs = [...jobs]

  // Filter by department
  const department = searchParams.get('department')
  if (department && department !== 'all') {
    filteredJobs = filteredJobs.filter(j => j.department === department)
  }

  // Filter by location
  const location = searchParams.get('location')
  if (location && location !== 'all') {
    filteredJobs = filteredJobs.filter(j => j.location === location)
  }

  // Filter by type
  const type = searchParams.get('type')
  if (type && type !== 'all') {
    filteredJobs = filteredJobs.filter(j => j.type === type)
  }

  // Filter only active jobs by default
  const showInactive = searchParams.get('show_inactive') === 'true'
  if (!showInactive) {
    filteredJobs = filteredJobs.filter(j => j.is_active)
  }

  return NextResponse.json(filteredJobs)
}

export async function POST(request: Request) {
  try {
    const body: Omit<JobPosting, 'id'> = await request.json()

    // Validate required fields
    if (!body.title_en || !body.title_ar || !body.department || !body.location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new job posting
    const newJob: JobPosting = {
      ...body,
      id: Date.now().toString(),
      posted_date: new Date().toISOString().split('T')[0],
      is_active: true,
    }

    jobs.push(newJob)

    return NextResponse.json(newJob, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}