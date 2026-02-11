'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import NextImage from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'

export default function AuthPage() {
  const { t } = useLanguage()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (view === 'sign-up') {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
            data: {
              first_name: firstName,
              last_name: lastName,
              phone: phone,
            },
          },
        })
        if (error) throw error
        
        if (data.session) {
            router.push('/ifza/dashboard')
            router.refresh()
        } else {
            setMessage({ text: 'Check your email for the confirmation link.', type: 'success' })
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/ifza/dashboard')
        router.refresh()
      }
    } catch (error: any) {
      setMessage({ text: error.message, type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center">
          <div className="relative h-16 w-16 mb-4">
             <NextImage src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-slate-900">
            {view === 'sign-in' ? t.ifza.signInTitle : t.ifza.signUpTitle}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            {view === 'sign-in' ? t.ifza.signInDesc : t.ifza.signUpDesc}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="space-y-4">
            {view === 'sign-up' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-slate-700">
                    {t.ifza.firstName}
                  </label>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="relative block w-full appearance-none rounded-xl border border-slate-300 px-3 py-3 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-[#2E447A] focus:outline-none focus:ring-1 focus:ring-[#2E447A] sm:text-sm mt-1"
                    placeholder={t.ifza.firstName}
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-slate-700">
                    {t.ifza.lastName}
                  </label>
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="relative block w-full appearance-none rounded-xl border border-slate-300 px-3 py-3 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-[#2E447A] focus:outline-none focus:ring-1 focus:ring-[#2E447A] sm:text-sm mt-1"
                    placeholder={t.ifza.lastName}
                  />
                </div>
              </div>
            )}
            {view === 'sign-up' && (
              <div className="mt-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                    {t.ifza.phone}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="relative block w-full appearance-none rounded-xl border border-slate-300 px-3 py-3 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-[#2E447A] focus:outline-none focus:ring-1 focus:ring-[#2E447A] sm:text-sm mt-1"
                    placeholder="+7 (777) 123-45-67"
                  />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-slate-700">
                {t.ifza.email}
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full appearance-none rounded-xl border border-slate-300 px-3 py-3 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-[#2E447A] focus:outline-none focus:ring-1 focus:ring-[#2E447A] sm:text-sm mt-1"
                placeholder={t.ifza.email}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                {t.ifza.password}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-xl border border-slate-300 px-3 py-3 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-[#2E447A] focus:outline-none focus:ring-1 focus:ring-[#2E447A] sm:text-sm mt-1"
                placeholder={t.ifza.password}
              />
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {message.text}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-xl bg-[#2E447A] px-4 py-3 text-sm font-semibold text-white hover:bg-[#233560] focus:outline-none focus:ring-2 focus:ring-[#2E447A] focus:ring-offset-2 disabled:opacity-70 transition-all"
            >
              {loading ? t.ifza.processing : (view === 'sign-in' ? t.ifza.signInButton : t.ifza.signUpButton)}
            </button>
          </div>
        </form>
        
        <div className="text-center">
            <button
                onClick={() => {
                    setView(view === 'sign-in' ? 'sign-up' : 'sign-in')
                    setMessage(null)
                }}
                className="text-sm font-medium text-[#2E447A] hover:text-[#233560]"
            >
                {view === 'sign-in' ? t.ifza.toSignUp : t.ifza.toSignIn}
            </button>
        </div>
      </div>
      </div>

      <Footer />
    </div>
  )
}
