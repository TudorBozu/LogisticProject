import { Link, useLocation } from 'react-router-dom'
import { PATHS } from '../../router/paths'
import { useTheme } from '../../context/ThemeContext'

const NAV = [
  { to: PATHS.DASHBOARD, label: 'Dashboard' },
  { to: PATHS.ORDER_NEW, label: 'Comandă nouă' },
  { to: PATHS.ORDERS,    label: 'Comenzile mele' },
]

export default function OrdersNavbar() {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const toggle = toggleTheme

  return (
    <header className="sticky top-0 z-50 flex items-center gap-2 h-14 px-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Logo */}
      <Link to={PATHS.DASHBOARD} className="flex items-center gap-2.5 mr-3 flex-shrink-0">
        <div className="w-8 h-8 bg-blue-600 rounded-[10px] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M5 15V5H12C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11H5"
              stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 11L15 15" stroke="white" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100">
          Routa<span className="text-blue-600">X</span>
        </span>
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-1">
        {NAV.map(({ to, label }) => {
          const active = pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Right */}
      <div className="ml-auto flex items-center gap-2.5">
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
            AC
          </div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Alexandru C.</span>
        </div>
        <button
          onClick={toggle}
          className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 flex items-center justify-center hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
        >
          {dark ? (
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          ) : (
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}
