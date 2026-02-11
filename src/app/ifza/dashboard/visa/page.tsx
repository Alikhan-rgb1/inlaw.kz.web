'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useLanguage } from '@/context/LanguageContext'
import { useRouter } from 'next/navigation'

export default function VisaApplicationPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    // 1. Personal Info
    employeeName: '',
    maritalStatus: '',
    religion: '',
    religionNote: '',
    fatherName: '',
    motherName: '',
    
    // 2. Employment
    position: '',
    salary: '',
    
    // 3. Status
    location: 'outside', // outside, inside

    // Legacy fields
    fullName: '',
    passportNumber: '',
    nationality: '',
    visaType: 'Investor',
  })
  const [files, setFiles] = useState<{ passport: File | null; photo: File | null; visa: File | null }>({
    passport: null,
    photo: null,
    visa: null,
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
        type: 'visa',
        status: 'pending',
        data: { ...formData, files: uploadedFiles },
        user_info: {
             first_name: user.user_metadata.first_name,
             last_name: user.user_metadata.last_name,
             email: user.email,
             phone: user.user_metadata.phone
        }
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
        <p className="text-green-700">{t.ifza.visaSuccess}</p>
        <div className="flex gap-4 justify-center mt-6">
             <button onClick={() => router.push('/ifza/dashboard')} className="px-6 py-2 bg-[#2E447A] text-white font-semibold rounded-lg hover:bg-[#233560] transition-colors">
                Go to Dashboard
             </button>
             <button onClick={() => setSuccess(false)} className="px-6 py-2 text-green-800 font-semibold hover:bg-green-100 rounded-lg transition-colors">
                {t.ifza.submitAnother}
             </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">{t.ifza.visaApp}</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-8">
        
        {/* 1. Personal Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">{t.ifza.visaPersonalInfo}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.employeeName}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]" 
                value={formData.employeeName} onChange={e => setFormData({...formData, employeeName: e.target.value})} />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.maritalStatus}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]" 
                value={formData.maritalStatus} onChange={e => setFormData({...formData, maritalStatus: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.religion}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.religion} onChange={e => setFormData({...formData, religion: e.target.value})} />
               <p className="text-xs text-slate-500 mt-1">{t.ifza.religionNote}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.fatherName}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.motherName}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]"
                value={formData.motherName} onChange={e => setFormData({...formData, motherName: e.target.value})} />
            </div>
          </div>
        </div>

        {/* 2. Employment Data */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">{t.ifza.employmentData}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.position}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]" 
                value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t.ifza.salary}</label>
              <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-[#2E447A] focus:border-[#2E447A]" 
                value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} />
            </div>
          </div>
        </div>

        {/* 3. Location Status */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">{t.ifza.locationStatus}</h2>
          <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.ifza.currentLocation}</label>
              <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="location" value="outside" checked={formData.location === 'outside'} onChange={e => setFormData({...formData, location: e.target.value})} className="text-[#2E447A] focus:ring-[#2E447A]" />
                      <span className="text-slate-700">{t.ifza.outsideUAE}</span>
                  </label>
                   <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="location" value="inside" checked={formData.location === 'inside'} onChange={e => setFormData({...formData, location: e.target.value})} className="text-[#2E447A] focus:ring-[#2E447A]" />
                      <span className="text-slate-700">{t.ifza.insideUAE}</span>
                  </label>
              </div>
          </div>
        </div>

        {/* 4. Documents */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 border-b pb-2">{t.ifza.requiredFiles}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.ifza.passportCopy} <span className="text-xs font-normal text-slate-500 block">{t.ifza.passportCopyDesc}</span></label>
              <input type="file" onChange={e => handleFileChange(e, 'passport')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#2E447A] hover:file:bg-blue-100" />
            </div>
             <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.ifza.photo} <span className="text-xs font-normal text-slate-500 block">{t.ifza.photoDesc}</span></label>
              <input type="file" onChange={e => handleFileChange(e, 'photo')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#2E447A] hover:file:bg-blue-100" />
            </div>
            
            {formData.location === 'inside' && (
             <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">{t.ifza.currentVisaCopy} <span className="text-xs font-normal text-slate-500 block">{t.ifza.insideUAENote}</span></label>
              <input type="file" onChange={e => handleFileChange(e, 'visa')} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#2E447A] hover:file:bg-blue-100" />
            </div>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2E447A] text-white font-bold py-4 rounded-xl hover:bg-[#233560] transition-all transform hover:scale-[1.01] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
             {loading ? t.ifza.submitting : t.ifza.submitVisa}
          </button>
        </div>

      </form>
    </div>
  )
}
