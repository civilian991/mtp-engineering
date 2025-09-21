'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye, Image } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Project {
  id: number
  title: string
  titleAr: string
  client: string
  sector: string
  status: 'completed' | 'ongoing' | 'planning'
  year: number
  featured: boolean
  images: number
  createdAt: string
}

export default function AdminProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: 'King Abdulaziz International Airport',
      titleAr: 'مطار الملك عبدالعزيز الدولي',
      client: 'General Authority of Civil Aviation',
      sector: 'Transportation',
      status: 'completed',
      year: 2023,
      featured: true,
      images: 8,
      createdAt: '2023-01-15',
    },
    {
      id: 2,
      title: 'NEOM Infrastructure Development',
      titleAr: 'تطوير البنية التحتية لنيوم',
      client: 'NEOM',
      sector: 'Infrastructure',
      status: 'ongoing',
      year: 2024,
      featured: true,
      images: 12,
      createdAt: '2024-03-20',
    },
    {
      id: 3,
      title: 'Riyadh Metro Line 3',
      titleAr: 'مترو الرياض الخط 3',
      client: 'Riyadh Development Authority',
      sector: 'Transportation',
      status: 'completed',
      year: 2022,
      featured: false,
      images: 15,
      createdAt: '2022-06-10',
    },
  ])

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.titleAr.includes(searchQuery) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success'
      case 'ongoing':
        return 'bg-blue-100 text-blue-700'
      case 'planning':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-secondary-100 text-secondary-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Projects</h1>
          <p className="text-secondary-600 mt-1">Manage your portfolio projects</p>
        </div>
        <Button>
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-5 w-5 text-secondary-400" />}
            />
          </div>
          <select className="px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="">All Sectors</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="transportation">Transportation</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>
          <select className="px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
            <option value="planning">Planning</option>
          </select>
        </div>
      </Card>

      {/* Projects Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-secondary-900">{project.title}</p>
                      <p className="text-xs text-secondary-500">{project.titleAr}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-secondary-900">{project.client}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-secondary-900">{project.sector}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-secondary-900">{project.year}</p>
                  </td>
                  <td className="px-6 py-4">
                    {project.featured ? (
                      <span className="text-success">✓</span>
                    ) : (
                      <span className="text-secondary-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-secondary-600 hover:text-primary-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-600 hover:text-primary-600" aria-label="View images">
                        <Image className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-600 hover:text-primary-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-secondary-600 hover:text-error">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-secondary-50 px-6 py-3 flex items-center justify-between">
          <p className="text-sm text-secondary-600">
            Showing 1 to {filteredProjects.length} of {projects.length} results
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}