'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { Plus, Edit2, Trash2, Search, User } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  image?: string
  bio?: string
  joinDate: string
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Khalid Al-Rashid',
    position: 'Chief Executive Officer',
    department: 'Executive',
    email: 'khalid.rashid@mtp.com.sa',
    phone: '+966 11 123 4567',
    joinDate: '2015-03-15',
    bio: 'Over 25 years of experience in engineering consultancy'
  },
  {
    id: '2',
    name: 'Eng. Fatima Al-Zahrani',
    position: 'Head of Civil Engineering',
    department: 'Civil Engineering',
    email: 'fatima.zahrani@mtp.com.sa',
    phone: '+966 11 123 4568',
    joinDate: '2018-06-20'
  },
  {
    id: '3',
    name: 'Eng. Mohammed Al-Qahtani',
    position: 'Senior Structural Engineer',
    department: 'Structural Engineering',
    email: 'mohammed.qahtani@mtp.com.sa',
    phone: '+966 11 123 4569',
    joinDate: '2019-09-10'
  },
  {
    id: '4',
    name: 'Eng. Sarah Abdullah',
    position: 'MEP Department Manager',
    department: 'MEP Engineering',
    email: 'sarah.abdullah@mtp.com.sa',
    phone: '+966 11 123 4570',
    joinDate: '2017-01-15'
  },
  {
    id: '5',
    name: 'Eng. Ahmed Hassan',
    position: 'Project Manager',
    department: 'Project Management',
    email: 'ahmed.hassan@mtp.com.sa',
    phone: '+966 11 123 4571',
    joinDate: '2020-04-01'
  }
]

export default function TeamPage() {
  const [teamMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const departments = ['all', 'Executive', 'Civil Engineering', 'Structural Engineering', 'MEP Engineering', 'Project Management']

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Team Management</h1>
          <p className="text-secondary-600 mt-2">Manage your team members and their information</p>
        </div>
        <Button variant="primary" size="md">
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">
                  Team Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-secondary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="h-10 w-10 rounded-full" />
                        ) : (
                          <User className="h-5 w-5 text-primary-600" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-secondary-900">{member.name}</div>
                        <div className="text-sm text-secondary-500">{member.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                      {member.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-secondary-900">{member.email}</div>
                    <div className="text-sm text-secondary-500">{member.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}