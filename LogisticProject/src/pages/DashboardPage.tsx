import { Link } from 'react-router-dom'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 dark:bg-slate-950 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600">
        <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
          <path d="M5 15V5H12C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11H5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 11L15 15" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Bine ai venit în RoutaX!</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Autentificarea a funcționat cu succes.</p>
      </div>
      <Link to="/sign-in" className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors">
        ← Înapoi la Sign In
      </Link>
    </div>
  )
}
