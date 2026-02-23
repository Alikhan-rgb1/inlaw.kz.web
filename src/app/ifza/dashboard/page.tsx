'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { t } = useLanguage()
  interface Application {
    id: string
    type: 'company' | 'visa'
    status: string
    created_at: string
    data: any
  }

  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const supabase = createClient()

  const fetchUserApplications = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return

      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching applications:', error)
      } else {
        console.log('Fetched applications:', data)
        setApplications(data || [])
      }
    } catch (err) {
      console.error('Unexpected error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserApplications()
  }, []) // Empty dependency array to run once on mount

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500'
      case 'rejected':
        return 'bg-red-500'
      default:
        return 'bg-orange-400' // pending
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
        case 'approved': return 'Approved'
        case 'rejected': return 'Rejected'
        default: return 'Pending'
    }
  }

  const handleDelete = async (id: string) => {
    if (!id || id === 'undefined') {
      window.alert('Некорректный ID заявки.')
      return
    }

    const confirmed = window.confirm('Удалить эту заявку?')
    if (!confirmed) return
    setDeletingId(id)
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        console.error('Error deleting application via API:', data)
        window.alert(
          `Ошибка при удалении заявки: ${
            (data && (data.error || data.message)) || 'Попробуйте ещё раз.'
          }`
        )
        return
      }

      setApplications((prev) => prev.filter((app) => app.id !== id))
    } catch (err) {
      console.error('Unexpected error while deleting application:', err)
      window.alert('Неожиданная ошибка при удалении заявки.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.ifza.welcome}</h1>
      <p className="text-slate-600 mb-8">{t.ifza.selectService}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Link href="/ifza/dashboard/company" className="group block p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#2E447A] transition-all">
          <div className="h-12 w-12 bg-blue-100 text-[#2E447A] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2E447A] group-hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{t.ifza.companyReg}</h3>
          <p className="text-slate-600">{t.ifza.startJourney}</p>
        </Link>

        <Link href="/ifza/dashboard/visa" className="group block p-8 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#2E447A] transition-all">
          <div className="h-12 w-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{t.ifza.visaApp}</h3>
          <p className="text-slate-600">{t.ifza.applyVisa}</p>
        </Link>
      </div>

      {/* Applications List */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-900">{t.ifza.myApplications}</h2>
        <button onClick={fetchUserApplications} className="text-sm text-[#2E447A] hover:underline flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Refresh
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
            <div className="p-8 text-center text-slate-500">Loading...</div>
        ) : applications.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No applications yet. Start by creating one above.</div>
        ) : (
            <div className="divide-y divide-slate-100">
                {applications.map((app) => (
                    <div key={app.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-semibold text-slate-900">
                                    {app.type === 'company' ? t.ifza.companyReg : t.ifza.visaApp}
                                </h4>
                                <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                                    {new Date(app.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500">
                                {app.type === 'company' ? (app.data.nameEng || 'Company Registration') : (app.data.employeeName || 'Visa Application')}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(app.status)}`}></span>
                            <span className="text-sm font-medium text-slate-700 capitalize">
                                {getStatusText(app.status)}
                            </span>
                            {app.status === 'pending' && (
                              <button
                                type="button"
                                onClick={() => handleDelete(app.id)}
                                disabled={deletingId === app.id}
                                className="ml-3 inline-flex items-center justify-center rounded-full p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg
                                  className="h-4 w-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9 11V17"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M15 11V17"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M4 7H20"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M6 7L7 19C7.05279 19.5789 7.30262 20.1254 7.70885 20.5316C8.11508 20.9379 8.66157 21.1877 9.2405 21.2405H14.7595C15.3384 21.1877 15.8849 20.9379 16.2911 20.5316C16.6974 20.1254 16.9472 19.5789 17 19L18 7"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10 7V5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4H13C13.2652 4 13.5196 4.10536 13.7071 4.29289C13.8946 4.48043 14 4.73478 14 5V7"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  )
}
