'use client'

import { useState } from 'react'
import { Search, Eye, Trash2, CheckCircle, Clock, Filter } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface Inquiry {
  id: number
  name: string
  email: string
  phone: string
  company: string
  subject: string
  inquiryType: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
}

export default function AdminInquiriesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [inquiries] = useState<Inquiry[]>([
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@company.sa',
      phone: '+966501234567',
      company: 'Al-Rashid Construction',
      subject: 'Partnership Opportunity',
      inquiryType: 'partnership',
      message: 'We are interested in partnering with MTP for upcoming infrastructure projects...',
      status: 'new',
      createdAt: '2025-01-20T10:30:00',
    },
    {
      id: 2,
      name: 'Sara Khan',
      email: 'sara.khan@email.com',
      phone: '+966551234567',
      company: 'Tech Solutions Ltd',
      subject: 'Project Consultation',
      inquiryType: 'project',
      message: 'Looking for consultation services for a new smart city project...',
      status: 'read',
      createdAt: '2025-01-19T14:45:00',
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      email: 'mali@gmail.com',
      phone: '+966561234567',
      company: '',
      subject: 'General Inquiry',
      inquiryType: 'general',
      message: 'I would like to know more about your services and previous projects...',
      status: 'replied',
      createdAt: '2025-01-18T09:15:00',
    },
  ])

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || inquiry.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            New
          </span>
        )
      case 'read':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700 flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            Read
          </span>
        )
      case 'replied':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/10 text-success flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Replied
          </span>
        )
      default:
        return null
    }
  }

  const getInquiryTypeBadge = (type: string) => {
    const types: Record<string, string> = {
      general: 'General',
      project: 'Project',
      partnership: 'Partnership',
      career: 'Career',
      media: 'Media',
    }
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700">
        {types[type] || type}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Inquiries</h1>
          <p className="text-secondary-600 mt-1">Manage contact form submissions</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {inquiries.filter(i => i.status === 'new').length} New
          </span>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, email, company, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="h-5 w-5 text-secondary-400" />}
            />
          </div>
          <select
            className="px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
          <Button variant="outline">
            <Filter className="h-5 w-5 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => (
          <Card key={inquiry.id} className={inquiry.status === 'new' ? 'border-l-4 border-l-blue-500' : ''}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-secondary-900">{inquiry.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-secondary-600 mt-1">
                      <span>{inquiry.email}</span>
                      {inquiry.phone && <span>• {inquiry.phone}</span>}
                      {inquiry.company && <span>• {inquiry.company}</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getInquiryTypeBadge(inquiry.inquiryType)}
                    {getStatusBadge(inquiry.status)}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="font-medium text-secondary-900">{inquiry.subject}</p>
                  <p className="text-secondary-600 mt-1 line-clamp-2">{inquiry.message}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-500">
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {inquiry.status !== 'replied' && (
                      <Button variant="primary" size="sm">
                        Reply
                      </Button>
                    )}
                    <button className="p-2 text-secondary-600 hover:text-error">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-secondary-600">
          Showing {filteredInquiries.length} of {inquiries.length} inquiries
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  )
}