import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PATHS } from '../../router/paths'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: PATHS.DRIVER,         label: 'Cursa mea' },
  { to: PATHS.DRIVER_VEHICLE, label: 'Vehicul'   },
  { to: PATHS.DRIVER_HISTORY, label: 'Istoric'   },
]

interface Props { driverName: string; driverInitials: string }

export default function DriverNavbar({ driverName, driverInitials }: Props) {
  const { pathname }           = useLocation()
  const { theme, toggleTheme } = useTheme()
  const navigate               = useNavigate()
  const { logout } = useAuth()
  const dark = theme === 'dark'
  const [themeAnim, setThemeAnim] = useState(false)

  function handleThemeClick() {
    setThemeAnim(true)
    setTimeout(() => setThemeAnim(false), 300)
    toggleTheme()
  }

  return (
    <header className="sticky top-0 z-50 flex items-center gap-1.5 h-12 px-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Logo */}
      <Link to={PATHS.DRIVER} className="flex items-center gap-2 mr-2 flex-shrink-0">
        <div className="w-8 h-8 bg-blue-600 rounded-[9px] flex items-center justify-center">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
            <path d="M5 15V5H12C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11H5"
              stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 11L15 15" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="font-display font-bold text-[15px] tracking-tight text-slate-900 dark:text-slate-100">
          Routa<span className="text-blue-600">X</span>
        </span>
      </Link>

      {/* Nav tabs */}
      <nav className="flex items-center gap-0.5">
        {NAV.map(({ to, label }) => {
          const active = pathname === to
          return (
            <Link key={to} to={to}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
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
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
            {driverInitials}
          </div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{driverName}</span>
        </div>
        <button
          onClick={handleThemeClick}
          aria-label={dark ? 'Mod luminos' : 'Mod întunecat'}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 focus:outline-none"
          style={{
            transform: themeAnim ? 'rotate(30deg) scale(1.2)' : 'rotate(0deg) scale(1)',
            transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), color 0.2s',
          }}
        >
          {dark ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        <button
          onClick={() => { logout(); navigate('/') }}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"/>
          </svg>
          Ieșire
        </button>
      </div>
    </header>
  )
}
