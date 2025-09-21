'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { Plus, Edit2, Trash2, Eye, Calendar, Tag } from 'lucide-react'

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  publishDate: string
  status: 'draft' | 'published' | 'archived'
  views: number
  image?: string
}

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'MTP Engineering Wins Major Infrastructure Contract',
    excerpt: 'MTP Engineering has been awarded a significant contract for the development of new infrastructure in Riyadh.',
    content: 'Full article content here...',
    author: 'Admin',
    category: 'Company News',
    tags: ['Infrastructure', 'Riyadh', 'Contract'],
    publishDate: '2025-01-15',
    status: 'published',
    views: 1250
  },
  {
    id: '2',
    title: 'New Sustainable Engineering Practices Implemented',
    excerpt: 'We are proud to announce the implementation of new sustainable engineering practices across all our projects.',
    content: 'Full article content here...',
    author: 'Sarah Abdullah',
    category: 'Sustainability',
    tags: ['Sustainability', 'Green Engineering', 'Innovation'],
    publishDate: '2025-01-10',
    status: 'published',
    views: 890
  },
  {
    id: '3',
    title: 'MTP Engineering Expands Team with New Experts',
    excerpt: 'We welcome several new engineering experts to our growing team.',
    content: 'Full article content here...',
    author: 'HR Department',
    category: 'Team Updates',
    tags: ['Team', 'Growth', 'Careers'],
    publishDate: '2025-01-05',
    status: 'published',
    views: 456
  },
  {
    id: '4',
    title: 'Upcoming Webinar on Modern Construction Techniques',
    excerpt: 'Join us for an exclusive webinar on modern construction techniques and best practices.',
    content: 'Full article content here...',
    author: 'Admin',
    category: 'Events',
    tags: ['Webinar', 'Education', 'Construction'],
    publishDate: '2025-01-20',
    status: 'draft',
    views: 0
  }
]

export default function NewsPage() {
  const [articles] = useState<NewsArticle[]>(mockNews)
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'Company News', 'Sustainability', 'Team Updates', 'Events', 'Projects']

  const filteredArticles = articles.filter(article => {
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-secondary-100 text-secondary-800'
      default:
        return 'bg-secondary-100 text-secondary-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">News Management</h1>
          <p className="text-secondary-600 mt-2">Manage news articles and announcements</p>
        </div>
        <Button variant="primary" size="md">
          <Plus className="h-4 w-4 mr-2" />
          New Article
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="divide-y divide-secondary-200">
          {filteredArticles.map((article) => (
            <div key={article.id} className="p-6 hover:bg-secondary-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-secondary-900">{article.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(article.status)}`}>
                      {article.status}
                    </span>
                  </div>
                  <p className="text-secondary-600 mb-3">{article.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-500">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(article.publishDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {article.views} views
                    </span>
                    <span className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      {article.category}
                    </span>
                    <span>By {article.author}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {article.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-primary-50 text-primary-700 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-primary-600 hover:bg-primary-50 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-primary-600 hover:bg-primary-50 rounded">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}