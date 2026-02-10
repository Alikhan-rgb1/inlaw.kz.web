import { createAdminClient } from '@/utils/supabase/admin'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/ifza')
  }

  // Note: In a real production app, you MUST verify here that 'user.email' matches an admin email
  // or that the user has an 'admin' role in the database.
  // For this demo, we proceed so you can see the table.
  
  const adminClient = createAdminClient()
  
  // We handle the case where table might not exist yet gracefully
  let applications = []
  let error = null
  
  try {
      const result = await adminClient
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })
      applications = result.data || []
      error = result.error
  } catch (e) {
      console.error(e)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>

        {error ? (
             <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
                 Error loading data: {error.message}. <br/>
                 (Did you run the SQL setup script in Supabase?)
             </div>
        ) : null}

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {applications.map((app: any) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{app.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 capitalize">{app.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{app.user_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'completed' ? 'bg-green-100 text-green-800' : 
                      app.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-[#2E447A] hover:text-[#233560]">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {applications.length === 0 && !error && (
             <div className="p-8 text-center text-slate-500">No applications found.</div>
          )}
        </div>
      </div>
    </div>
  )
}
