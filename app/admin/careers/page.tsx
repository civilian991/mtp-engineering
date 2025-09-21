'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye, Users, Briefcase, MapPin, Calendar } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Job {
  id: number
  title: string
  titleAr: string
  department: string
  location: string
  type: 'full-time' | 'part-time' | 'contract'
  level: 'entry' | 'mid' | 'senior' | 'executive'
  status: 'active' | 'draft' | 'closed'
  applications: number
  postedDate: string
  deadline: string
}

export default function AdminCareersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'positions' | 'applications'>('positions')
  const [jobs] = useState<Job[]>([
    {
      id: 1,
      title: 'Senior Project Engineer',
      titleAr: 'مهندس مشروع أول',
      department: 'Engineering',
      location: 'Riyadh',
      type: 'full-time',
      level: 'senior',
      status: 'active',
      applications: 12,
      postedDate: '2025-01-01',
      deadline: '2025-02-01',
    },
    {
      id: 2,
      title: 'Civil Engineer',
      titleAr: 'مهندس مدني',
      department: 'Engineering',
      location: 'Jeddah',
      type: 'full-time',
      level: 'mid',
      status: 'active',
      applications: 8,
      postedDate: '2025-01-05',
      deadline: '2025-02-05',
    },
    {
      id: 3,
      title: 'Project Manager',
      titleAr: 'مدير مشروع',
      department: 'Management',
      location: 'Dammam',
      type: 'full-time',
      level: 'senior',
      status: 'draft',
      applications: 0,
      postedDate: '2025-01-10',
      deadline: '2025-02-10',
    },
  ])

  const applications = [
    {
      id: 1,
      candidateName: 'Ali Hassan',
      email: 'ali.hassan@email.com',
      phone: '+966501234567',
      position: 'Senior Project Engineer',
      experience: '8 years',
      status: 'new',
      appliedDate: '2025-01-20',
    },
    {
      id: 2,
      candidateName: 'Fatima Ahmed',
      email: 'fatima.ahmed@email.com',
      phone: '+966551234567',
      position: 'Civil Engineer',
      experience: '5 years',
      status: 'shortlisted',
      appliedDate: '2025-01-19',
    },
    {
      id: 3,
      candidateName: 'Mohammed Ibrahim',
      email: 'm.ibrahim@email.com',
      phone: '+966561234567',
      position: 'Senior Project Engineer',
      experience: '10 years',
      status: 'interviewed',
      appliedDate: '2025-01-18',
    },
  ]

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.titleAr.includes(searchQuery) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success'
      case 'draft':
        return 'bg-yellow-100 text-yellow-700'
      case 'closed':
        return 'bg-secondary-100 text-secondary-700'
      case 'new':
        return 'bg-blue-100 text-blue-700'
      case 'shortlisted':
        return 'bg-purple-100 text-purple-700'
      case 'interviewed':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-secondary-100 text-secondary-700'
    }
  }

  const getTypeColor = (type: string) => {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Careers</h1>
          <p className="text-secondary-600 mt-1">Manage job postings and applications</p>
        </div>
        <Button>
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
              <p className="text-2xl font-bold text-secondary-900">
                {jobs.filter(j => j.status === 'active').length}
              </p>
            </div>
            <Briefcase className="h-8 w-8 text-primary-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600">Total Applications</p>
              <p className="text-2xl font-bold text-secondary-900">
                {jobs.reduce((sum, job) => sum + job.applications, 0)}
              </p>
            </div>
            <Users className="h-8 w-8 text-primary-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600">New This Week</p>
              <p className="text-2xl font-bold text-secondary-900">7</p>
            </div>
            <Calendar className="h-8 w-8 text-primary-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-secondary-600">Interviews Scheduled</p>
              <p className="text-2xl font-bold text-secondary-900">3</p>
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

      {/* Content */}
      {activeTab === 'positions' ? (
        <Card className="overflow-hidden">
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
                    Applications
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
                        <p className="text-sm font-medium text-secondary-900">{job.title}</p>
                        <p className="text-xs text-secondary-500">{job.titleAr}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-secondary-900">{job.department}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-secondary-900">{job.location}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(job.type)}`}>
                        {job.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-secondary-900">{job.applications}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-1 text-secondary-600 hover:text-primary-600">
                          <Eye className="h-4 w-4" />
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
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-secondary-900">{app.candidateName}</h3>
                  <div className="flex items-center space-x-4 text-sm text-secondary-600 mt-1">
                    <span>{app.email}</span>
                    <span>• {app.phone}</span>
                    <span>• {app.experience}</span>
                  </div>
                  <div className="flex items-center space-x-3 mt-3">
                    <span className="text-sm font-medium text-secondary-900">Applied for: {app.position}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-secondary-500">{app.appliedDate}</p>
                  <div className="flex items-center space-x-2 mt-3">
                    <Button variant="outline" size="sm">View CV</Button>
                    <Button variant="primary" size="sm">Review</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}