'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'

export default function ApplicationDetails() {
  const [application, setApplication] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    fetchApplication()
  }, [id])

  const fetchApplication = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/ifza')
      return
    }

    // Check admin
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', user.email)
      .single()

    if (!adminData) {
      router.push('/ifza/dashboard')
      return
    }

    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching application:', error)
      alert('Error fetching application')
    } else {
      setApplication(data)
    }
    setLoading(false)
  }

  const updateStatus = async (newStatus: string) => {
    setUpdating(true)
    
    // Debug: check current user
    const { data: { user } } = await supabase.auth.getUser()
    console.log('Updating status as user:', user?.email)

    const { error } = await supabase
      .from('applications')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      console.error('Error updating status:', error)
      alert(`Error updating status: ${error.message}`)
    } else {
      console.log('Status updated successfully to:', newStatus)
      setApplication({ ...application, status: newStatus })
    }
    setUpdating(false)
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (!application) return <div className="p-8">Application not found</div>

  const { data } = application

  // Define field order for Company Registration
  const companySections = [
    {
      title: "1. Identification of the Company",
      fields: ["nameEng", "nameRu", "nameKz", "legalType", "orgStructure", "ownership", "international"]
    },
    {
      title: "2. Economic Activity",
      fields: ["mainActivity", "secondActivity", "thirdActivity", "vatPayer"]
    },
    {
      title: "3. Share Capital",
      fields: ["totalCapital", "currency", "shareClass", "nominalValue", "totalShares", "votesPerShare", "shareDistribution"]
    },
    {
      title: "4. Founders",
      fields: ["founderName", "founderContact", "founderAddress", "founderId", "stateParticipation", "uboInfo"]
    },
    {
      title: "5. Management",
      fields: ["directorName", "directorContact", "directorAddress", "secretaryName", "secretaryContact", "secretaryAddress", "staffCount"]
    },
    {
      title: "6. Contact Data",
      fields: ["legalAddress", "companyEmail"]
    },
    {
      title: "Applicant Info",
      fields: ["fullName", "phone", "email"]
    }
  ]

  // Define field order for Visa Application
  const visaSections = [
    {
      title: "1. Personal Information",
      fields: ["employeeName", "maritalStatus", "religion", "religionNote", "fatherName", "motherName", "passportNumber", "nationality", "visaType"]
    },
    {
      title: "2. Employment Data",
      fields: ["position", "salary"]
    },
    {
      title: "3. Status",
      fields: ["location"]
    }
  ]

  const sections = application.type === 'company' ? companySections : visaSections

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
            {application.type === 'company' ? 'Company Registration' : 'Visa Application'}
        </h1>
        <Link href="/ifza/dashboard/admin" className="text-[#2E447A] hover:underline font-medium">
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6 border border-slate-200">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-slate-50 border-b border-slate-200">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Application Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              ID: {application.id} | Created: {new Date(application.created_at).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-bold 
                ${application.status === 'approved' ? 'bg-green-100 text-green-800' : 
                  application.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                {application.status.toUpperCase()}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => updateStatus('approved')}
                  disabled={updating}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm disabled:opacity-50 transition-colors"
                >
                  Approve
                </button>
                <button 
                  onClick={() => updateStatus('rejected')}
                  disabled={updating}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm disabled:opacity-50 transition-colors"
                >
                  Reject
                </button>
              </div>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
             {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="border-b border-gray-100 last:border-0">
                   <div className="px-4 py-3 bg-gray-50 font-bold text-slate-700 text-sm uppercase tracking-wider">
                      {section.title}
                   </div>
                   {section.fields.map((field) => {
                      if (data[field] === undefined || data[field] === '') return null
                      return (
                        <div key={field} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-gray-50 transition-colors">
                          <dt className="text-sm font-medium text-gray-500 capitalize">
                            {field.replace(/([A-Z])/g, ' $1').trim()}
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-words">
                            {String(data[field])}
                          </dd>
                        </div>
                      )
                   })}
                </div>
             ))}
             
             {/* Show any remaining fields that weren't in the sections (optional, good for debugging or future fields) */}
             {/* Removed 'Other Info' section as requested */}
          </dl>
        </div>
      </div>

      {/* Files Section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-slate-200">
          <div className="px-4 py-5 sm:px-6 bg-slate-50 border-b border-slate-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Attached Files</h3>
            <p className="mt-1 text-sm text-gray-500">Files uploaded with this application.</p>
          </div>
          <div className="px-4 py-5 sm:px-6">
             {data.files && Object.keys(data.files).length > 0 ? (
                <ul className="mt-4 border border-gray-200 rounded-md divide-y divide-gray-200">
                  {Object.entries(data.files).map(([key, url]) => (
                    <li key={key} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 flex-1 w-0 truncate capitalize">{key}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href={url as string} target="_blank" rel="noopener noreferrer" className="font-medium text-[#2E447A] hover:text-[#1a2e5e]">
                          Download / View
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
             ) : (
                <p className="text-sm text-gray-500 italic">No files attached.</p>
             )}
          </div>
      </div>

    </div>
  )
}
