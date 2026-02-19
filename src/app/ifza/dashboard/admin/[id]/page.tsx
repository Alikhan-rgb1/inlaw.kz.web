'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

export default function ApplicationDetails() {
  const { t } = useLanguage()
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

  if (loading) return <div className="p-8">{t.ifza.adminLoading}</div>
  if (!application) return <div className="p-8">Application not found</div>

  const { data, user_info } = application

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return t.ifza.adminStatusApproved
      case 'rejected':
        return t.ifza.adminStatusRejected
      default:
        return t.ifza.adminStatusPending
    }
  }

  const fieldLabels: Record<string, string> = {
    nameEng: t.ifza.nameEng,
    nameRu: t.ifza.nameRu,
    nameKz: t.ifza.nameKz,
    legalType: t.ifza.legalType,
    orgStructure: t.ifza.orgStructure,
    ownership: t.ifza.ownershipForm,
    international: t.ifza.internationalStatus,
    mainActivity: t.ifza.mainActivity,
    secondActivity: t.ifza.secondActivity,
    thirdActivity: t.ifza.thirdActivity,
    vatPayer: t.ifza.vatPayer,
    totalCapital: t.ifza.totalCapital,
    currency: t.ifza.currency,
    shareClass: t.ifza.shareClass,
    nominalValue: t.ifza.nominalValue,
    totalShares: t.ifza.totalShares,
    votesPerShare: t.ifza.votesPerShare,
    shareDistribution: t.ifza.shareDistribution,
    founderName: t.ifza.founderName,
    founderContact: t.ifza.founderContact,
    founderAddress: t.ifza.founderAddress,
    founderId: t.ifza.founderId,
    stateParticipation: t.ifza.stateParticipation,
    uboInfo: t.ifza.uboInfo,
    directorName: t.ifza.directorName,
    directorContact: t.ifza.founderContact,
    directorAddress: t.ifza.founderAddress,
    secretaryName: t.ifza.secretaryName,
    secretaryContact: t.ifza.founderContact,
    secretaryAddress: t.ifza.founderAddress,
    staffCount: t.ifza.staffCount,
    legalAddress: t.ifza.legalAddress,
    companyEmail: t.ifza.companyEmail,
    fullName: t.ifza.fullName,
    phone: t.ifza.phone,
    email: t.ifza.email,
    employeeName: t.ifza.employeeName,
    maritalStatus: t.ifza.maritalStatus,
    religion: t.ifza.religion,
    religionNote: t.ifza.religionNote,
    fatherName: t.ifza.fatherName,
    motherName: t.ifza.motherName,
    passportNumber: t.ifza.passportNumber,
    nationality: t.ifza.nationality,
    visaType: t.ifza.visaType,
    position: t.ifza.position,
    salary: t.ifza.salary,
    location: t.ifza.currentLocation
  }

  // Define field order for Company Registration
  const companySections = [
    {
      title: t.ifza.companyId,
      fields: ["nameEng", "nameRu", "nameKz", "legalType", "orgStructure", "ownership", "international"]
    },
    {
      title: t.ifza.economicActivity,
      fields: ["mainActivity", "secondActivity", "thirdActivity", "vatPayer"]
    },
    {
      title: t.ifza.shareCapital,
      fields: ["totalCapital", "currency", "shareClass", "nominalValue", "totalShares", "votesPerShare", "shareDistribution"]
    },
    {
      title: t.ifza.foundersInfo,
      fields: ["founderName", "founderContact", "founderAddress", "founderId", "stateParticipation", "uboInfo"]
    },
    {
      title: t.ifza.management,
      fields: ["directorName", "directorContact", "directorAddress", "secretaryName", "secretaryContact", "secretaryAddress", "staffCount"]
    },
    {
      title: t.ifza.contactData,
      fields: ["legalAddress", "companyEmail"]
    },
    {
      title: t.ifza.applicantInfo,
      fields: ["fullName", "phone", "email"]
    }
  ]

  // Define field order for Visa Application
  const visaSections = [
    {
      title: t.ifza.visaPersonalInfo,
      fields: ["employeeName", "maritalStatus", "religion", "religionNote", "fatherName", "motherName", "passportNumber", "nationality", "visaType"]
    },
    {
      title: t.ifza.employmentData,
      fields: ["position", "salary"]
    },
    {
      title: t.ifza.locationStatus,
      fields: ["location"]
    }
  ]

  const sections = application.type === 'company' ? companySections : visaSections

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
            {application.type === 'company' ? t.ifza.companyReg : t.ifza.visaApp}
        </h1>
        <Link href="/ifza/dashboard/admin" className="text-[#2E447A] hover:underline font-medium">
          &larr; {t.ifza.adminBackToDashboard}
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6 border border-slate-200">
        {/* User Registration Info Block */}
        <div className="px-4 py-5 sm:px-6 bg-blue-50 border-b border-blue-100">
            <h3 className="text-lg leading-6 font-medium text-slate-900">{t.ifza.adminUserInfoTitle}</h3>
            <p className="mt-1 text-sm text-slate-500">{t.ifza.adminUserInfoDesc}</p>
        </div>
        <div className="border-b border-gray-200 px-4 py-5 sm:p-0">
             <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-500">{t.ifza.fullName}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user_info ? `${user_info.first_name || ''} ${user_info.last_name || ''}` : 'N/A'}
                    </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-500">{t.ifza.email}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user_info?.email || 'N/A'}
                    </dd>
                </div>
                 <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-gray-50 transition-colors">
                    <dt className="text-sm font-medium text-gray-500">{t.ifza.phone}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user_info?.phone || 'N/A'}
                    </dd>
                </div>
             </dl>
        </div>

        <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-slate-50 border-b border-slate-200">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{t.ifza.adminDetailsTitle}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {t.ifza.adminIdLabel}: {application.id} | {t.ifza.adminCreatedLabel}: {new Date(application.created_at).toLocaleString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-bold 
                ${application.status === 'approved' ? 'bg-green-100 text-green-800' : 
                  application.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'}`}>
                {getStatusText(application.status)}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => updateStatus('approved')}
                  disabled={updating}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm disabled:opacity-50 transition-colors"
                >
                  {t.ifza.adminApproveButton}
                </button>
                <button 
                  onClick={() => updateStatus('rejected')}
                  disabled={updating}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm disabled:opacity-50 transition-colors"
                >
                  {t.ifza.adminRejectButton}
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
                            {fieldLabels[field] || field.replace(/([A-Z])/g, ' $1').trim()}
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
            <h3 className="text-lg leading-6 font-medium text-gray-900">{t.ifza.adminAttachedFilesTitle}</h3>
            <p className="mt-1 text-sm text-gray-500">{t.ifza.adminAttachedFilesDesc}</p>
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
                          {t.ifza.adminDownloadView}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
             ) : (
                <p className="text-sm text-gray-500 italic">{t.ifza.adminNoFiles}</p>
             )}
          </div>
      </div>

    </div>
  )
}
