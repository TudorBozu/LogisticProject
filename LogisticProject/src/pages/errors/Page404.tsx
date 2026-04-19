import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../router/paths'

export default function Page404() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 transition-colors">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-6">
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-slate-500 dark:text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <p className="text-6xl font-display font-black text-slate-200 dark:text-slate-800 mb-2 select-none">404</p>
        <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-slate-100 mb-2">Pagina nu există</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
          Adresa pe care ai accesat-o nu există sau a fost mutată. Verifică URL-ul sau întoarce-te la pagina principală.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(PATHS.public.home)}
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
