import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../router/paths'

export default function Page401() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 transition-colors">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-100 dark:bg-amber-900/30 mb-6">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-amber-600 dark:text-amber-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <p className="text-6xl font-display font-black text-slate-200 dark:text-slate-800 mb-2 select-none">401</p>
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-slate-100 mb-2">Neautorizat</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Trebuie să fii autentificat pentru a accesa această pagină. Te rugăm să te conectezi cu un cont valid.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(PATHS.public.signIn)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-blue-600/20"
          >
            Autentifică-te
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
