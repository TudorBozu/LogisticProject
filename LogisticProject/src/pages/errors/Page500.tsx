import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../router/paths'

export default function Page500() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 transition-colors">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-rose-100 dark:bg-rose-900/30 mb-6">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-rose-600 dark:text-rose-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <p className="text-6xl font-display font-black text-slate-200 dark:text-slate-800 mb-2 select-none">500</p>
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-slate-100 mb-2">Eroare de server</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          A apărut o eroare internă. Serviciul nu a putut procesa cererea ta. Încearcă din nou sau revino mai târziu.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-blue-600/20"
          >
            Încearcă din nou
          </button>
          <button
            onClick={() => navigate(PATHS.public.home)}
            className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Pagina principală
          </button>
        </div>
        <p className="mt-6 text-xs text-slate-400 dark:text-slate-600 font-mono">
          ERR_INTERNAL_SERVICE_FAILURE
        </p>
      </div>
    </div>
  )
}
