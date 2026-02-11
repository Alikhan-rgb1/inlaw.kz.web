'use client'

import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

import Image from 'next/image'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t, language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserEmail(user.email ?? null)
        
        // Check if admin
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', user.email)
          .single()
        
        if (adminData) {
          setIsAdmin(true)
        }
      } else {
        router.push('/ifza')
      }
    }
    getUser()
  }, [router, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/ifza')
    router.refresh()
  }

  const navItems = [
    { name: t.ifza.dashboard, href: '/ifza/dashboard' },
    { name: t.ifza.companyReg, href: '/ifza/dashboard/company' },
    { name: t.ifza.visaApp, href: '/ifza/dashboard/visa' },
  ]

  if (isAdmin) {
    navItems.push({ name: t.ifza.adminPanel, href: '/ifza/dashboard/admin' })
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-200">
           <div className="flex items-center gap-3 mb-4">
               <div className="relative h-10 w-10 flex-shrink-0">
                 <Image src="/logo.png" alt="INLAW Logo" fill className="object-contain" />
               </div>
               <span className="font-bold text-slate-900 text-lg leading-tight">INLAW<br/><span className="text-xs text-[#2E447A] font-normal">Portal</span></span>
           </div>
           
           {/* Language Switcher moved here */}
           <div className="flex justify-center gap-2">
              <button 
                onClick={() => setLanguage('ru')}
                className={`text-xs font-bold px-2 py-1 rounded transition-colors ${language === 'ru' ? 'bg-[#2E447A] text-white' : 'text-slate-600 bg-slate-100 hover:bg-slate-200'}`}
              >
                RU
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`text-xs font-bold px-2 py-1 rounded transition-colors ${language === 'en' ? 'bg-[#2E447A] text-white' : 'text-slate-600 bg-slate-100 hover:bg-slate-200'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('chi')}
                className={`text-xs font-bold px-2 py-1 rounded transition-colors ${language === 'chi' ? 'bg-[#2E447A] text-white' : 'text-slate-600 bg-slate-100 hover:bg-slate-200'}`}
              >
                CHI
              </button>
           </div>
        </div>
        
        <nav className="p-4 space-y-1 flex-grow">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-[#2E447A]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="px-4 py-2 mb-2">
             <p className="text-xs text-slate-500">{t.ifza.signedInAs}</p>
             <p className="text-sm font-medium text-slate-900 truncate">{userEmail}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {t.ifza.signOut}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
