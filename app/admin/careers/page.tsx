'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Eye, Users, Briefcase, MapPin, Calendar, X, AlertCircle, Check, Loader2 } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Tables } from '@/types/database'

type Career = Tables<'careers'>
type JobApplication = Tables<'job_applications'> & {
  careers?: {
    id: string
    title_en: string
    title_ar: string
    department_en: string | null
    department_ar: string | null
  } | null
}

interface JobFormData {
  id?: string
  title_en: string
  title_ar: string
  department_en: string
  department_ar: string
  location_en: string
  location_ar: string
  type: string
  experience_level: string
  description_en: string
  description_ar: string
  requirements_en: string
  requirements_ar: string
  responsibilities_en: string
  responsibilities_ar: string
  benefits_en: string
  benefits_ar: string
  closing_date: string
  is_active: boolean
}

const initialFormData: JobFormData = {
  title_en: '',
  title_ar: '',
  department_en: '',
  department_ar: '',
  location_en: '',
  location_ar: '',
  type: 'full-time',
  experience_level: 'mid',
  description_en: '',
  description_ar: '',
  requirements_en: '',
  requirements_ar: '',
  responsibilities_en: '',
  responsibilities_ar: '',
  benefits_en: '',
  benefits_ar: '',
  closing_date: '',
  is_active: true,
}

export default function AdminCareersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'positions' | 'applications'>('positions')
  const [jobs, setJobs] = useState<Career[]>([])
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Career | null>(null)
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null)
  const [formData, setFormData] = useState<JobFormData>(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/careers?show_inactive=true')
      if (!response.ok) throw new Error('Failed to fetch jobs')
      const data = await response.json()
      setJobs(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load careers')
    } finally {
      setLoading(false)
    }
  }

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/careers/applications')
      if (!response.ok) throw new Error('Failed to fetch applications')
      const data = await response.json()
      setApplications(data)
    } catch (err) {
      console.error('Error fetching applications:', err)
    }
  }

  useEffect(() => {
    fetchJobs()
    fetchApplications()
  }, [])

  // Handle create job
  const handleCreateJob = () => {
    setEditingJob(null)
    setFormData(initialFormData)
    setIsModalOpen(true)
  }

  // Handle edit job
  const handleEditJob = (job: Career) => {
    setEditingJob(job)
    setFormData({
      id: job.id,
      title_en: job.title_en || '',
      title_ar: job.title_ar || '',
      department_en: job.department_en || '',
      department_ar: job.department_ar || '',
      location_en: job.location_en || '',
      location_ar: job.location_ar || '',
      type: job.type || 'full-time',
      experience_level: job.experience_level || 'mid',
      description_en: job.description_en || '',
      description_ar: job.description_ar || '',
      requirements_en: job.requirements_en || '',
      requirements_ar: job.requirements_ar || '',
      responsibilities_en: job.responsibilities_en || '',
      responsibilities_ar: job.responsibilities_ar || '',
      benefits_en: job.benefits_en || '',
      benefits_ar: job.benefits_ar || '',
      closing_date: job.closing_date || '',
      is_active: job.is_active ?? true,
    })
    setIsModalOpen(true)
  }

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const url = editingJob ? '/api/careers' : '/api/careers'
      const method = editingJob ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingJob ? { id: editingJob.id, ...formData } : formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save job')
      }

      setSuccessMessage(editingJob ? 'Job updated successfully!' : 'Job created successfully!')
      setIsModalOpen(false)
      fetchJobs()
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save job')
    } finally {
      setSubmitting(false)
    }
  }

  // Handle delete job
  const handleDeleteJob = (jobId: string) => {
    setDeletingJobId(jobId)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!deletingJobId) return

    setSubmitting(true)
    try {
      const response = await fetch(`/api/careers?id=${deletingJobId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete job')

      setSuccessMessage('Job deleted successfully!')
      setIsDeleteModalOpen(false)
      setDeletingJobId(null)
      fetchJobs()
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete job')
    } finally {
      setSubmitting(false)
    }
  }

  const filteredJobs = jobs.filter(job =>
    job.title_en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.title_ar?.includes(searchQuery) ||
    job.department_en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department_ar?.includes(searchQuery)
  )

  const filteredApplications = applications.filter(app =>
    app.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.careers?.title_en?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-700'
      case 'shortlisted':
        return 'bg-purple-100 text-purple-700'
      case 'interviewed':
        return 'bg-orange-100 text-orange-700'
      case 'accepted':
        return 'bg-success/10 text-success'
      case 'rejected':
        return 'bg-error/10 text-error'
      default:
        return 'bg-secondary-100 text-secondary-700'
    }
  }

  const getTypeColor = (type: string | null) => {
    switch (type) {
      case 'full-time':
        return 'bg-primary-100 text-primary-700'
      case 'part-time':
        return 'bg-blue-100 text-blue-700'
      case 'contract':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-secondary-100 text-secondary-700'
    }
  }

  const activeJobs = jobs.filter(j => j.is_active)
  const totalApplications = applications.length

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-success text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <Check className="h-5 w-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-error/10 border border-error text-error px-4 py-3 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Careers</h1>
          <p className="text-secondary-600 mt-1">Manage job postings and applications</p>
        </div>
        <Button onClick={handleCreateJob}>
          <Plus className="h-5 w-5 mr-2" />
          Add Position
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600">Active Positions</p>
              <p className="text-2xl font-bold text-secondary-900">{activeJobs.length}</p>
            </div>
            <Briefcase className="h-8 w-8 text-primary-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600">Total Applications</p>
              <p className="text-2xl font-bold text-secondary-900">{totalApplications}</p>
            </div>
            <Users className="h-8 w-8 text-primary-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600">Pending Review</p>
              <p className="text-2xl font-bold text-secondary-900">
                {applications.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-primary-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600">Shortlisted</p>
              <p className="text-2xl font-bold text-secondary-900">
                {applications.filter(a => a.status === 'shortlisted').length}
              </p>
            </div>
            <MapPin className="h-8 w-8 text-primary-600" />
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-secondary-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('positions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'positions'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700'
            }`}
          >
            Job Positions ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'applications'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700'
            }`}
          >
            Applications ({applications.length})
          </button>
        </nav>
      </div>

      {/* Search */}
      <Card>
        <Input
          placeholder={activeTab === 'positions' ? 'Search positions...' : 'Search applications...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="h-5 w-5 text-secondary-400" />}
        />
      </Card>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      ) : (
        <>
          {/* Content */}
          {activeTab === 'positions' ? (
            <Card className="overflow-hidden">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
                  <p className="text-secondary-600">No job positions found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary-50 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                          Position
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-600 uppercase tracking-wider">
                          Closing Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-secondary-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-secondary-200">
                      {filteredJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-secondary-50">
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-secondary-900">{job.title_en}</p>
                              <p className="text-xs text-secondary-500">{job.title_ar}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-secondary-900">{job.department_en || '-'}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-secondary-900">{job.location_en || '-'}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(job.type)}`}>
                              {job.type || '-'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              job.is_active ? 'bg-success/10 text-success' : 'bg-secondary-100 text-secondary-700'
                            }`}>
                              {job.is_active ? 'active' : 'inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-secondary-900">{job.closing_date || '-'}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleEditJob(job)}
                                className="p-1 text-secondary-600 hover:text-primary-600"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="p-1 text-secondary-600 hover:text-error"
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
              )}
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredApplications.length === 0 ? (
                <Card>
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
                    <p className="text-secondary-600">No applications found</p>
                  </div>
                </Card>
              ) : (
                filteredApplications.map((app) => (
                  <Card key={app.id}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-secondary-900">{app.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-secondary-600 mt-1">
                          <span>{app.email}</span>
                          {app.phone && <span>• {app.phone}</span>}
                          {app.years_of_experience && <span>• {app.years_of_experience} years</span>}
                        </div>
                        <div className="flex items-center space-x-3 mt-3">
                          <span className="text-sm font-medium text-secondary-900">
                            Applied for: {app.careers?.title_en || 'Unknown Position'}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                            {app.status || 'pending'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-secondary-500">
                          {new Date(app.created_at || '').toLocaleDateString()}
                        </p>
                        <div className="flex items-center space-x-2 mt-3">
                          {app.cv_url && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(app.cv_url || '', '_blank')}
                            >
                              View CV
                            </Button>
                          )}
                          <Button variant="primary" size="sm">Review</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-secondary-900">
                {editingJob ? 'Edit Job Position' : 'Create Job Position'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-secondary-400 hover:text-secondary-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Title (English) *
                  </label>
                  <Input
                    required
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    placeholder="Senior Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Title (Arabic) *
                  </label>
                  <Input
                    required
                    value={formData.title_ar}
                    onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                    placeholder="مهندس أول"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Department (English)
                  </label>
                  <Input
                    value={formData.department_en}
                    onChange={(e) => setFormData({ ...formData, department_en: e.target.value })}
                    placeholder="Engineering"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Department (Arabic)
                  </label>
                  <Input
                    value={formData.department_ar}
                    onChange={(e) => setFormData({ ...formData, department_ar: e.target.value })}
                    placeholder="الهندسة"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Location (English)
                  </label>
                  <Input
                    value={formData.location_en}
                    onChange={(e) => setFormData({ ...formData, location_en: e.target.value })}
                    placeholder="Riyadh"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Location (Arabic)
                  </label>
                  <Input
                    value={formData.location_ar}
                    onChange={(e) => setFormData({ ...formData, location_ar: e.target.value })}
                    placeholder="الرياض"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Experience Level</label>
                  <select
                    value={formData.experience_level}
                    onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="entry">Entry</option>
                    <option value="mid">Mid</option>
                    <option value="senior">Senior</option>
                    <option value="executive">Executive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Closing Date</label>
                  <Input
                    type="date"
                    value={formData.closing_date}
                    onChange={(e) => setFormData({ ...formData, closing_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-secondary-700">Active Position</span>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Description (English)
                  </label>
                  <textarea
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    placeholder="Detailed job description..."
                    rows={4}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Description (Arabic)
                  </label>
                  <textarea
                    value={formData.description_ar}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                    placeholder="وصف تفصيلي للوظيفة..."
                    rows={4}
                    dir="rtl"
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Requirements (English)
                  </label>
                  <textarea
                    value={formData.requirements_en}
                    onChange={(e) => setFormData({ ...formData, requirements_en: e.target.value })}
                    placeholder="List of requirements..."
                    rows={4}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Requirements (Arabic)
                  </label>
                  <textarea
                    value={formData.requirements_ar}
                    onChange={(e) => setFormData({ ...formData, requirements_ar: e.target.value })}
                    placeholder="قائمة المتطلبات..."
                    rows={4}
                    dir="rtl"
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Responsibilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Responsibilities (English)
                  </label>
                  <textarea
                    value={formData.responsibilities_en}
                    onChange={(e) => setFormData({ ...formData, responsibilities_en: e.target.value })}
                    placeholder="List of responsibilities..."
                    rows={4}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Responsibilities (Arabic)
                  </label>
                  <textarea
                    value={formData.responsibilities_ar}
                    onChange={(e) => setFormData({ ...formData, responsibilities_ar: e.target.value })}
                    placeholder="قائمة المسؤوليات..."
                    rows={4}
                    dir="rtl"
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Benefits (English)
                  </label>
                  <textarea
                    value={formData.benefits_en}
                    onChange={(e) => setFormData({ ...formData, benefits_en: e.target.value })}
                    placeholder="List of benefits..."
                    rows={4}
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Benefits (Arabic)
                  </label>
                  <textarea
                    value={formData.benefits_ar}
                    onChange={(e) => setFormData({ ...formData, benefits_ar: e.target.value })}
                    placeholder="قائمة المزايا..."
                    rows={4}
                    dir="rtl"
                    className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingJob ? 'Update Job' : 'Create Job'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-secondary-900 mb-4">Confirm Delete</h3>
            <p className="text-secondary-600 mb-6">
              Are you sure you want to delete this job position? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteModalOpen(false)
                  setDeletingJobId(null)
                }}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={submitting}
                className="bg-error hover:bg-error/90"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
