'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function DashboardPage() {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{t.ifza.welcome}</h1>
      <p className="text-slate-600 mb-8">{t.ifza.selectService}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  )
}
