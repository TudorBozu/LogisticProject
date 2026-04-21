import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../router/paths'
import { useAuth } from '../../context/AuthContext'

function homeForRole(role: string): string {
  if (role === 'client') return PATHS.DASHBOARD
  if (role === 'depot_worker') return PATHS.DEPOT
  if (role === 'driver') return PATHS.DRIVER
  return PATHS.app.fleet
}

export default function Page403() {
  const navigate = useNavigate()
  const { user } = useAuth()
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 transition-colors">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-red-100 dark:bg-red-900/30 mb-6">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-red-600 dark:text-red-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        </div>
        <p className="text-6xl font-display font-black text-slate-200 dark:text-slate-800 mb-2 select-none">403</p>
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-slate-100 mb-2">Acces interzis</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Contul tău nu are permisiunile necesare pentru a accesa această secțiune. Contactează un administrator dacă crezi că este o eroare.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(user ? homeForRole(user.role) : PATHS.public.home)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-blue-600/20"
          >
            Înapoi
          </button>
          <button
            onClick={() => navigate(PATHS.public.home)}
            className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Pagina principală
          </button>
        </div>
      </div>
    </div>
  )
}
