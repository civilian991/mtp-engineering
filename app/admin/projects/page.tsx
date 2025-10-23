'use client'

import { useState, useEffect } from 'react'
import {
  Plus, Edit2, Trash2, Eye, Upload, X, Save, Search,
  Filter, Download, Image as ImageIcon, FileText, Video,
  DollarSign, Calendar, MapPin, Users, Building, ChevronDown,
  ChevronUp, Star, AlertCircle, CheckCircle
} from 'lucide-react'
import Card from '@/components/ui/Card'

interface Project {
  id: string
  name_en: string
  name_ar: string
  slug: string
  description_en?: string
  description_ar?: string
  client_name?: string
  location_en?: string
  location_ar?: string
  city?: string
  start_date?: string
  end_date?: string
  project_value?: number
  status?: string
  is_legacy?: boolean
  is_featured?: boolean
  is_published?: boolean
  thumbnail_url?: string
  images?: string[]
  documents?: string[]
  videos?: string[]
  tags?: string[]
  category?: string
  project_type?: string
  contract_number?: string
  project_manager?: string
  contractor?: string
  consultant?: string
  scope_of_work?: string
  achievements?: string
  challenges?: string
  completion_percentage?: number
  budget?: number
  actual_cost?: number
  area_size?: number
  duration_months?: number
  team_size?: number
  safety_incidents?: number
  quality_score?: number
  client_satisfaction?: number
  seo_keywords?: string[]
  sort_order?: number
  views?: number
  created_at?: string
  updated_at?: string
}

const PROJECT_STATUSES = ['planned', 'ongoing', 'completed', 'on-hold', 'cancelled']
const PROJECT_CATEGORIES = ['Infrastructure', 'Commercial', 'Residential', 'Industrial', 'Government', 'Healthcare', 'Education', 'Transportation']
const PROJECT_TYPES = ['Construction', 'Renovation', 'Maintenance', 'Consultation', 'Design & Build']
const CITIES = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Khobar', 'Jubail', 'Yanbu']

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  // Form state
  const [formData, setFormData] = useState<Partial<Project>>({
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
    client_name: '',
    location_en: '',
    location_ar: '',
    city: '',
    status: 'planned',
    category: '',
    project_type: '',
    contract_number: '',
    project_manager: '',
    contractor: '',
    consultant: '',
    scope_of_work: '',
    achievements: '',
    challenges: '',
    start_date: '',
    end_date: '',
    thumbnail_url: '',
    project_value: 0,
    budget: 0,
    actual_cost: 0,
    area_size: 0,
    images: [],
    documents: [],
    videos: [],
    tags: [],
    completion_percentage: 0,
    is_featured: false,
    is_legacy: false,
    is_published: true,
    sort_order: 0,
    seo_keywords: []
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      setNotification({ type: 'error', message: 'Failed to fetch projects' })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingProject
        ? '/api/projects'
        : '/api/projects'

      const method = editingProject ? 'PUT' : 'POST'
      const body = editingProject
        ? { ...formData, id: editingProject.id }
        : formData

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        setNotification({
          type: 'success',
          message: editingProject ? 'Project updated successfully' : 'Project created successfully'
        })
        fetchProjects()
        resetForm()
      } else {
        throw new Error('Failed to save project')
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to save project' })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setNotification({ type: 'success', message: 'Project deleted successfully' })
        fetchProjects()
      } else {
        throw new Error('Failed to delete project')
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to delete project' })
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    // Convert null values to empty strings for controlled inputs
    setFormData({
      ...project,
      description_en: project.description_en || '',
      description_ar: project.description_ar || '',
      client_name: project.client_name || '',
      location_en: project.location_en || '',
      location_ar: project.location_ar || '',
      city: project.city || '',
      start_date: project.start_date || '',
      end_date: project.end_date || '',
      category: project.category || '',
      project_type: project.project_type || '',
      contract_number: project.contract_number || '',
      project_manager: project.project_manager || '',
      contractor: project.contractor || '',
      consultant: project.consultant || '',
      scope_of_work: project.scope_of_work || '',
      achievements: project.achievements || '',
      challenges: project.challenges || '',
      thumbnail_url: project.thumbnail_url || '',
      // Convert null numbers to 0 for number inputs
      project_value: project.project_value ?? 0,
      budget: project.budget ?? 0,
      actual_cost: project.actual_cost ?? 0,
      area_size: project.area_size ?? 0
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingProject(null)
    setFormData({
      name_en: '',
      name_ar: '',
      description_en: '',
      description_ar: '',
      client_name: '',
      location_en: '',
      location_ar: '',
      city: '',
      status: 'planned',
      category: '',
      project_type: '',
      contract_number: '',
      project_manager: '',
      contractor: '',
      consultant: '',
      scope_of_work: '',
      achievements: '',
      challenges: '',
      start_date: '',
      end_date: '',
      thumbnail_url: '',
      project_value: 0,
      budget: 0,
      actual_cost: 0,
      area_size: 0,
      images: [],
      documents: [],
      videos: [],
      tags: [],
      completion_percentage: 0,
      is_featured: false,
      is_legacy: false,
      is_published: true,
      sort_order: 0,
      seo_keywords: []
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'images' | 'documents') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucket', type === 'documents' ? 'project-documents' : 'project-images')

    if (editingProject) {
      formData.append('projectId', editingProject.id)
    }

    try {
      const response = await fetch('/api/projects/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()

        if (type === 'thumbnail') {
          setFormData(prev => ({ ...prev, thumbnail_url: data.url }))
        } else if (type === 'images') {
          setFormData(prev => ({
            ...prev,
            images: [...(prev.images || []), data.url]
          }))
        } else if (type === 'documents') {
          setFormData(prev => ({
            ...prev,
            documents: [...(prev.documents || []), data.url]
          }))
        }

        setNotification({ type: 'success', message: 'File uploaded successfully' })
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to upload file' })
    } finally {
      setUploadingImage(false)
    }
  }

  const removeMedia = (type: 'images' | 'documents' | 'videos', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type]?.filter((_, i) => i !== index)
    }))
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.name_ar?.includes(searchTerm) ||
      project.client_name?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === 'all' || project.status === filterStatus
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'ongoing': return 'bg-blue-100 text-blue-800'
      case 'planned': return 'bg-yellow-100 text-yellow-800'
      case 'on-hold': return 'bg-orange-100 text-orange-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle /> : <AlertCircle />}
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Projects Management</h1>
          <p className="text-secondary-600 mt-1">Manage all your projects and their details</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Plus className="h-5 w-5" />
          Add New Project
        </button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-lg"
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            {PROJECT_STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Categories</option>
            {PROJECT_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="h-5 w-5" />
            Export
          </button>
        </div>
      </Card>

      {/* Projects List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map(project => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Project Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-secondary-900">{project.name_en}</h3>
                      {project.is_featured && (
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status || 'planned')}`}>
                        {project.status}
                      </span>
                      {!project.is_published && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-secondary-600 mt-1">{project.name_ar}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-secondary-600">
                      {project.client_name && (
                        <span className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {project.client_name}
                        </span>
                      )}
                      {project.city && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {project.city}
                        </span>
                      )}
                      {project.project_value && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          SAR {project.project_value.toLocaleString()}
                        </span>
                      )}
                      {project.completion_percentage !== undefined && (
                        <span className="flex items-center gap-1">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${project.completion_percentage}%` }}
                            />
                          </div>
                          {project.completion_percentage}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {expandedProject === project.id ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedProject === project.id && (
                  <div className="border-t pt-4 space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-secondary-500">Category</p>
                        <p className="font-medium">{project.category || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-500">Type</p>
                        <p className="font-medium">{project.project_type || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-500">Contract #</p>
                        <p className="font-medium">{project.contract_number || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-500">Project Manager</p>
                        <p className="font-medium">{project.project_manager || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-500">Start Date</p>
                        <p className="font-medium">{project.start_date ? new Date(project.start_date).toLocaleDateString() : '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-500">End Date</p>
                        <p className="font-medium">{project.end_date ? new Date(project.end_date).toLocaleDateString() : '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-500">Budget</p>
                        <p className="font-medium">{project.budget ? `SAR ${project.budget.toLocaleString()}` : '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary-500">Team Size</p>
                        <p className="font-medium">{project.team_size || '-'}</p>
                      </div>
                    </div>

                    {project.description_en && (
                      <div>
                        <p className="text-xs text-secondary-500">Description</p>
                        <p className="text-sm mt-1">{project.description_en}</p>
                      </div>
                    )}

                    <div className="flex gap-4">
                      {project.images && project.images.length > 0 && (
                        <div className="flex items-center gap-2">
                          <ImageIcon className="h-4 w-4 text-secondary-500" />
                          <span className="text-sm">{project.images.length} images</span>
                        </div>
                      )}
                      {project.documents && project.documents.length > 0 && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-secondary-500" />
                          <span className="text-sm">{project.documents.length} documents</span>
                        </div>
                      )}
                      {project.videos && project.videos.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-secondary-500" />
                          <span className="text-sm">{project.videos.length} videos</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}

          {filteredProjects.length === 0 && (
            <Card>
              <div className="text-center py-12">
                <p className="text-secondary-500">No projects found</p>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Name (English) *</label>
                    <input
                      type="text"
                      required
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Name (Arabic) *</label>
                    <input
                      type="text"
                      required
                      value={formData.name_ar}
                      onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="">Select Category</option>
                      {PROJECT_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Type</label>
                    <select
                      value={formData.project_type}
                      onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="">Select Type</option>
                      {PROJECT_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      {PROJECT_STATUSES.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="">Select City</option>
                      {CITIES.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Client Name</label>
                    <input
                      type="text"
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contract Number</label>
                    <input
                      type="text"
                      value={formData.contract_number}
                      onChange={(e) => setFormData({ ...formData, contract_number: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Manager</label>
                    <input
                      type="text"
                      value={formData.project_manager}
                      onChange={(e) => setFormData({ ...formData, project_manager: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Contractor</label>
                    <input
                      type="text"
                      value={formData.contractor}
                      onChange={(e) => setFormData({ ...formData, contractor: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Consultant</label>
                    <input
                      type="text"
                      value={formData.consultant}
                      onChange={(e) => setFormData({ ...formData, consultant: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Completion %</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.completion_percentage}
                      onChange={(e) => setFormData({ ...formData, completion_percentage: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Dates & Values */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Dates & Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Value (SAR)</label>
                    <input
                      type="number"
                      value={formData.project_value}
                      onChange={(e) => setFormData({ ...formData, project_value: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Budget (SAR)</label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Actual Cost (SAR)</label>
                    <input
                      type="number"
                      value={formData.actual_cost}
                      onChange={(e) => setFormData({ ...formData, actual_cost: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Area Size (m²)</label>
                    <input
                      type="number"
                      value={formData.area_size}
                      onChange={(e) => setFormData({ ...formData, area_size: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Descriptions</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Description (English)</label>
                    <textarea
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description (Arabic)</label>
                    <textarea
                      value={formData.description_ar}
                      onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Scope of Work</label>
                    <textarea
                      value={formData.scope_of_work}
                      onChange={(e) => setFormData({ ...formData, scope_of_work: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Media */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Media</h3>

                {/* Thumbnail */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'thumbnail')}
                      className="hidden"
                      id="thumbnail-upload"
                      disabled={uploadingImage}
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Thumbnail
                    </label>
                    {formData.thumbnail_url && (
                      <img src={formData.thumbnail_url} alt="Thumbnail" className="h-20 w-20 object-cover rounded" />
                    )}
                  </div>
                </div>

                {/* Gallery Images */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Gallery Images</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'images')}
                      className="hidden"
                      id="images-upload"
                      disabled={uploadingImage}
                    />
                    <label
                      htmlFor="images-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                    >
                      <ImageIcon className="h-4 w-4" />
                      Add Image
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.images?.map((img, idx) => (
                        <div key={idx} className="relative">
                          <img src={img} alt={`Image ${idx + 1}`} className="h-20 w-20 object-cover rounded" />
                          <button
                            type="button"
                            onClick={() => removeMedia('images', idx)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Documents</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleImageUpload(e, 'documents')}
                      className="hidden"
                      id="documents-upload"
                      disabled={uploadingImage}
                    />
                    <label
                      htmlFor="documents-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                    >
                      <FileText className="h-4 w-4" />
                      Add Document
                    </label>
                    <div className="space-y-1">
                      {formData.documents?.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <a href={doc} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            Document {idx + 1}
                          </a>
                          <button
                            type="button"
                            onClick={() => removeMedia('documents', idx)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Video URLs */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Video URLs</label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="Enter video URL"
                        className="flex-1 px-3 py-2 border rounded-lg"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            const input = e.target as HTMLInputElement
                            if (input.value) {
                              setFormData(prev => ({
                                ...prev,
                                videos: [...(prev.videos || []), input.value]
                              }))
                              input.value = ''
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                        onClick={(e) => {
                          const input = (e.target as HTMLElement).parentElement?.querySelector('input')
                          if (input?.value) {
                            setFormData(prev => ({
                              ...prev,
                              videos: [...(prev.videos || []), input.value]
                            }))
                            input.value = ''
                          }
                        }}
                      >
                        Add
                      </button>
                    </div>
                    <div className="space-y-1">
                      {formData.videos?.map((video, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <a href={video} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate">
                            {video}
                          </a>
                          <button
                            type="button"
                            onClick={() => removeMedia('videos', idx)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Settings</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Featured Project</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_legacy}
                      onChange={(e) => setFormData({ ...formData, is_legacy: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Legacy Project</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Published</span>
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  disabled={uploadingImage}
                >
                  <Save className="h-5 w-5" />
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}