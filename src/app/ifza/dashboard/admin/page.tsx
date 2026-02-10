'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/ifza')
      return
    }

    const { data: adminData } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', user.email)
      .single()

    if (adminData) {
      setIsAdmin(true)
      fetchApplications()
    } else {
      router.push('/ifza/dashboard') // Redirect regular users
    }
  }

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching applications:', error)
    } else {
      setApplications(data || [])
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full text-slate-500">Loading admin panel...</div>
  }

  if (!isAdmin) return null

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Admin Dashboard</h1>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md border border-slate-200">
        <ul role="list" className="divide-y divide-gray-200">
          {applications.length === 0 ? (
            <li className="px-4 py-12 text-center text-slate-500">No applications found.</li>
          ) : (
            applications.map((app) => (
              <li key={app.id}>
                <Link href={`/ifza/dashboard/admin/${app.id}`} className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-[#2E447A] truncate">
                            {app.type === 'company' ? 'Company Registration' : 'Visa Application'}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${app.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                app.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                              {app.status.toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              Applicant: {app.data.fullName || app.data.employeeName || 'N/A'}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              Submitted on {new Date(app.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
