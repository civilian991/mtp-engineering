'use client'

import { useState, useEffect } from 'react'
import {
  Briefcase,
  Users,
  Mail,
  TrendingUp,
  FileText,
  Calendar,
  Eye,
  DollarSign,
  Activity
} from 'lucide-react'
import Card from '@/components/ui/Card'

interface StatCardProps {
  title: string
  value: string | number
  change: string
  icon: React.ReactNode
  trend: 'up' | 'down' | 'neutral'
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-secondary-500',
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary-600">{title}</p>
          <p className="text-2xl font-bold text-secondary-900 mt-1">{value}</p>
          <p className={`text-sm mt-2 ${trendColors[trend]}`}>{change}</p>
        </div>
        <div className="bg-primary-50 p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </Card>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: { total: 127, active: 8, completed: 119 },
    careers: { openPositions: 5, applications: 43 },
    inquiries: { total: 234, pending: 12 },
    visitors: { today: 1234, thisMonth: 28456 },
  })

  const recentActivities = [
    { id: 1, type: 'inquiry', description: 'New inquiry from Ahmed Ali', time: '2 hours ago' },
    { id: 2, type: 'application', description: 'Job application for Senior Engineer', time: '4 hours ago' },
    { id: 3, type: 'project', description: 'Project "Mall of Arabia" updated', time: '6 hours ago' },
    { id: 4, type: 'inquiry', description: 'Contact form submission from Sara Khan', time: '8 hours ago' },
    { id: 5, type: 'application', description: 'New application for Project Manager', time: '1 day ago' },
  ]

  const upcomingProjects = [
    { id: 1, name: 'Riyadh Metro Extension', deadline: '2025-03-15', status: 'planning' },
    { id: 2, name: 'NEOM Infrastructure', deadline: '2025-04-20', status: 'design' },
    { id: 3, name: 'Jeddah Tower Systems', deadline: '2025-05-01', status: 'planning' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
        <p className="text-secondary-600 mt-1">Welcome back! Here&apos;s an overview of your site.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={stats.projects.total}
          change={`${stats.projects.active} active`}
          icon={<Briefcase className="h-6 w-6 text-primary-600" />}
          trend="up"
        />
        <StatCard
          title="Job Applications"
          value={stats.careers.applications}
          change={`${stats.careers.openPositions} open positions`}
          icon={<Users className="h-6 w-6 text-primary-600" />}
          trend="up"
        />
        <StatCard
          title="Inquiries"
          value={stats.inquiries.total}
          change={`${stats.inquiries.pending} pending`}
          icon={<Mail className="h-6 w-6 text-primary-600" />}
          trend="neutral"
        />
        <StatCard
          title="Site Visitors"
          value={stats.visitors.thisMonth.toLocaleString()}
          change="+12% from last month"
          icon={<Eye className="h-6 w-6 text-primary-600" />}
          trend="up"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">Recent Activities</h2>
            <Activity className="h-5 w-5 text-secondary-400" />
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                <div className="bg-primary-100 p-2 rounded-full">
                  {activity.type === 'inquiry' && <Mail className="h-4 w-4 text-primary-600" />}
                  {activity.type === 'application' && <Users className="h-4 w-4 text-primary-600" />}
                  {activity.type === 'project' && <Briefcase className="h-4 w-4 text-primary-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-secondary-900">{activity.description}</p>
                  <p className="text-xs text-secondary-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Projects */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-secondary-900">Upcoming Projects</h2>
            <Calendar className="h-5 w-5 text-secondary-400" />
          </div>
          <div className="space-y-3">
            {upcomingProjects.map((project) => (
              <div key={project.id} className="border-b last:border-0 pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-secondary-900">{project.name}</h3>
                    <p className="text-sm text-secondary-600 mt-1">
                      Deadline: {new Date(project.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'planning'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
            <Briefcase className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-secondary-900">Add Project</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
            <Users className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-secondary-900">Post Job</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
            <FileText className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-secondary-900">Add News</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
            <Mail className="h-8 w-8 text-primary-600 mb-2" />
            <span className="text-sm font-medium text-secondary-900">View Inquiries</span>
          </button>
        </div>
      </Card>
    </div>
  )
}