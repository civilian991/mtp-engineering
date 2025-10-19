'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Eye, Image, Loader2 } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Tables } from '@/types/database'

type Project = Tables<'projects'>

export default function AdminProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sectorFilter, setSectorFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  // Fetch projects
  useEffect(() => {
    fetchProjects()
  }, [sectorFilter, statusFilter, searchQuery])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (sectorFilter && sectorFilter !== 'all') params.append('sector', sectorFilter)
      if (statusFilter && statusFilter !== 'all') params.append('status', statusFilter)
      if (searchQuery) params.append('q', searchQuery)

      const response = await fetch(`/api/projects?${params}`)
      if (!response.ok) throw new Error('Failed to fetch projects')

      const data = await response.json()
      setProjects(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects')
      console.error('Error fetching projects:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete project')

      // Refresh the list
      fetchProjects()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete project')
    }
  }

  const toggleFeatured = async (project: Project) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: project.id,
          is_featured: !project.is_featured
        })
      })

      if (!response.ok) throw new Error('Failed to update project')

      // Refresh the list
      fetchProjects()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update project')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'ongoing':
        return 'bg-blue-100 text-blue-700'
      case 'planned':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchProjects}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Projects</h1>
          <p className="text-secondary-600 mt-1">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
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
          <select
            className="px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
          >
            <option value="">All Sectors</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="transportation">Transportation</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
            <option value="government">Government</option>
            <option value="healthcare">Healthcare</option>
            <option value="utilities">Utilities</option>
            <option value="oil-gas">Oil & Gas</option>
          </select>
          <select
            className="px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="ongoing">Ongoing</option>
            <option value="planned">Planned</option>
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
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-secondary-900">{project.name_en}</p>
                      <p className="text-xs text-secondary-500">{project.name_ar}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-secondary-900">{project.client_en}</p>
                      {project.client_ar && (
                        <p className="text-xs text-secondary-500">{project.client_ar}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-secondary-900">{project.sector}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status || '')}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-secondary-900">{project.year}</p>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleFeatured(project)}
                      className={`text-sm font-medium ${
                        project.is_featured
                          ? 'text-green-600 hover:text-green-800'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {project.is_featured ? '★' : '☆'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setEditingProject(project)
                          setShowModal(true)
                        }}
                        className="p-1 text-secondary-600 hover:text-primary-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1 text-secondary-600 hover:text-red-600"
                      >
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
            Showing {projects.length} results
          </p>
        </div>
      </Card>

      {/* Project Modal - Add/Edit */}
      {showModal && (
        <ProjectModal
          project={editingProject}
          onClose={() => {
            setShowModal(false)
            setEditingProject(null)
          }}
          onSave={() => {
            setShowModal(false)
            setEditingProject(null)
            fetchProjects()
          }}
        />
      )}
    </div>
  )
}

// Project Modal Component
function ProjectModal({
  project,
  onClose,
  onSave
}: {
  project: Project | null
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState({
    name_en: project?.name_en || '',
    name_ar: project?.name_ar || '',
    description_en: project?.description_en || '',
    description_ar: project?.description_ar || '',
    client_en: project?.client_en || '',
    client_ar: project?.client_ar || '',
    location_en: project?.location_en || '',
    location_ar: project?.location_ar || '',
    year: project?.year || new Date().getFullYear(),
    value: project?.value || 0,
    sector: project?.sector || '',
    status: project?.status || 'planned',
    is_featured: project?.is_featured || false,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const method = project ? 'PUT' : 'POST'
      const body = project ? { id: project.id, ...formData } : formData

      const response = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!response.ok) throw new Error('Failed to save project')

      onSave()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name (English)</label>
                <input
                  type="text"
                  value={formData.name_en}
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name (Arabic)</label>
                <input
                  type="text"
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Client (English)</label>
                <input
                  type="text"
                  value={formData.client_en}
                  onChange={(e) => setFormData({ ...formData, client_en: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Client (Arabic)</label>
                <input
                  type="text"
                  value={formData.client_ar}
                  onChange={(e) => setFormData({ ...formData, client_ar: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sector</label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Sector</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="transportation">Transportation</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="government">Government</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="utilities">Utilities</option>
                  <option value="oil-gas">Oil & Gas</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="planned">Planned</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="mr-2"
                />
                Featured Project
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  project ? 'Update' : 'Create'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}