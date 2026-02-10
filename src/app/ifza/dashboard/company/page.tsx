'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useLanguage } from '@/context/LanguageContext'

export default function CompanyRegistrationPage() {
  const { t } = useLanguage()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    // 1. Identification
    nameEng: '',
    nameRu: '',
    nameKz: '',
    legalType: 'commercial',
    orgStructure: 'private',
    ownership: 'private',
    international: 'no',

    // 2. Economic Activity
    mainActivity: '',
    secondActivity: '',
    thirdActivity: '',
    vatPayer: 'no',

    // 3. Share Capital
    totalCapital: '',
    currency: 'USD',
    shareClass: 'ordinary',
    nominalValue: '',
    totalShares: '',
    votesPerShare: '',
    shareDistribution: '',

    // 4. Founders
    founderName: '',
    founderContact: '',
    founderAddress: '',
    founderId: '',
    stateParticipation: 'no',
    uboInfo: '',

    // 5. Management
    directorName: '',
    directorContact: '',
    directorAddress: '',
    secretaryName: '',
    secretaryContact: '',
    secretaryAddress: '',
    staffCount: '',

    // 6. Contact
    legalAddress: '',
    companyEmail: '',

    // Applicant Info (kept for record)
    fullName: '',
    phone: '',
    email: '',
  })
  const [files, setFiles] = useState<{ passport: File | null; photo: File | null; proof: File | null }>({
    passport: null,
    photo: null,
    proof: null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof typeof files) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [type]: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Upload files
      const uploadedFiles: Record<string, string> = {}
      
      for (const [key, file] of Object.entries(files)) {
        if (file) {
          const fileExt = file.name.split('.').pop()
          const fileName = `${user.id}/${Date.now()}_${key}.${fileExt}`
          const { error: uploadError } = await supabase.storage
            .from('documents')
            .upload(fileName, file)

          if (uploadError) throw uploadError
          
          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('documents')
            .getPublicUrl(fileName)
            
          uploadedFiles[key] = publicUrl
        }
      }

      const { error } = await supabase.from('applications').insert({
        user_id: user.id,
        type: 'company',
        status: 'pending',
        data: { ...formData, files: uploadedFiles },
      })

      if (error) {
          if (error.code === '42P01') {
              throw new Error('Database not setup. Please run the SQL migration provided.')
          }
          throw error
      }

      setSuccess(true)
    } catch (error: any) {
      console.error('Error submitting application:', error)
      alert(`Error: ${error.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-green-50 rounded-2xl border border-green-100 text-center">
        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">{t.ifza.appSubmitted}</h2>
        <p className="text-green-700">{t.ifza.companySuccess}</p>
        <button onClick={() => setSuccess(false)} className="mt-6 text-green-800 font-semibold hover:underline">{t.ifza.submitAnother}</button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">{t.ifza.companyReg}</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
        
        {/* 1. Identification */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">{t.ifza.companyId}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.nameEng}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]" 
                value={formData.nameEng} onChange={e => setFormData({...formData, nameEng: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.nameRu}</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.nameRu} onChange={e => setFormData({...formData, nameRu: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.nameKz}</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.nameKz} onChange={e => setFormData({...formData, nameKz: e.target.value})} />
            </div>
            
            {/* Type & Structure */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.legalType}</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.legalType} onChange={e => setFormData({...formData, legalType: e.target.value})}>
                <option value="commercial">{t.ifza.commercial}</option>
                <option value="nonCommercial">{t.ifza.nonCommercial}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.orgStructure}</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.orgStructure} onChange={e => setFormData({...formData, orgStructure: e.target.value})}>
                <option value="private">{t.ifza.private}</option>
                <option value="public">{t.ifza.public}</option>
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.ownershipForm}</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.ownership} onChange={e => setFormData({...formData, ownership: e.target.value})}>
                <option value="private">{t.ifza.private}</option>
                <option value="state">{t.ifza.stateOwned}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.internationalStatus}</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.international} onChange={e => setFormData({...formData, international: e.target.value})}>
                <option value="no">{t.ifza.no}</option>
                <option value="yes">{t.ifza.yes}</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Economic Activity */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">{t.ifza.economicActivity}</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.mainActivity}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.mainActivity} onChange={e => setFormData({...formData, mainActivity: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.secondActivity}</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.secondActivity} onChange={e => setFormData({...formData, secondActivity: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.vatPayer}</label>
               <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.vatPayer} onChange={e => setFormData({...formData, vatPayer: e.target.value})}>
                <option value="no">{t.ifza.no}</option>
                <option value="yes">{t.ifza.yes}</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3. Share Capital */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">{t.ifza.shareCapital}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.totalCapital}</label>
              <input required type="number" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.totalCapital} onChange={e => setFormData({...formData, totalCapital: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.currency}</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value})}>
                <option value="USD">USD</option>
                <option value="KZT">KZT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.shareClass}</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.shareClass} onChange={e => setFormData({...formData, shareClass: e.target.value})}>
                <option value="ordinary">{t.ifza.ordinary}</option>
                <option value="preferred">{t.ifza.preferred}</option>
              </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.nominalValue}</label>
              <input required type="number" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.nominalValue} onChange={e => setFormData({...formData, nominalValue: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.totalShares}</label>
              <input required type="number" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.totalShares} onChange={e => setFormData({...formData, totalShares: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.votesPerShare}</label>
              <input required type="number" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.votesPerShare} onChange={e => setFormData({...formData, votesPerShare: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.shareDistribution}</label>
              <textarea required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]" rows={3}
                value={formData.shareDistribution} onChange={e => setFormData({...formData, shareDistribution: e.target.value})} />
            </div>
          </div>
        </div>

        {/* 4. Founders */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">{t.ifza.foundersInfo}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.founderName}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.founderName} onChange={e => setFormData({...formData, founderName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.founderContact}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.founderContact} onChange={e => setFormData({...formData, founderContact: e.target.value})} />
            </div>
             <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.founderAddress}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.founderAddress} onChange={e => setFormData({...formData, founderAddress: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.founderId}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.founderId} onChange={e => setFormData({...formData, founderId: e.target.value})} />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.stateParticipation}</label>
              <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.stateParticipation} onChange={e => setFormData({...formData, stateParticipation: e.target.value})}>
                <option value="no">{t.ifza.no}</option>
                <option value="yes">{t.ifza.yes}</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.uboInfo}</label>
              <textarea className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]" rows={2}
                value={formData.uboInfo} onChange={e => setFormData({...formData, uboInfo: e.target.value})} />
            </div>
          </div>
        </div>

        {/* 5. Management */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">{t.ifza.management}</h2>
          
          <h3 className="text-md font-medium text-slate-800 mt-2">{t.ifza.director}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.directorName}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.directorName} onChange={e => setFormData({...formData, directorName: e.target.value})} />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.founderContact}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.directorContact} onChange={e => setFormData({...formData, directorContact: e.target.value})} />
            </div>
             <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.founderAddress}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.directorAddress} onChange={e => setFormData({...formData, directorAddress: e.target.value})} />
            </div>
          </div>

          <h3 className="text-md font-medium text-slate-800 mt-4">{t.ifza.secretary}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.secretaryName}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.secretaryName} onChange={e => setFormData({...formData, secretaryName: e.target.value})} />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.founderContact}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.secretaryContact} onChange={e => setFormData({...formData, secretaryContact: e.target.value})} />
            </div>
             <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.founderAddress}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.secretaryAddress} onChange={e => setFormData({...formData, secretaryAddress: e.target.value})} />
            </div>
          </div>

           <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.staffCount}</label>
              <input required type="number" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.staffCount} onChange={e => setFormData({...formData, staffCount: e.target.value})} />
            </div>
        </div>

        {/* 6. Contact Data */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">{t.ifza.contactData}</h2>
          <div className="grid grid-cols-1 gap-4">
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.legalAddress}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.legalAddress} onChange={e => setFormData({...formData, legalAddress: e.target.value})} />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.companyEmail}</label>
              <input required type="email" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.companyEmail} onChange={e => setFormData({...formData, companyEmail: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Applicant Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">{t.ifza.personalInfo}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.fullName}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]" 
                value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.phone}</label>
              <input required type="tel" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
             <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.email}</label>
              <input required type="email" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">{t.ifza.uploadDocs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.ifza.directorDocs}</label>
              <input type="file" onChange={e => handleFileChange(e, 'passport')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#2E447A] hover:file:bg-blue-100" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2E447A] text-white font-bold py-4 rounded-xl hover:bg-[#233560] transition-all transform hover:scale-[1.01] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
             {loading ? t.ifza.submitting : t.ifza.submitCompany}
          </button>
        </div>

      </form>
    </div>
  )
}
