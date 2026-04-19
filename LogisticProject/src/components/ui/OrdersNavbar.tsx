import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { PATHS } from '../../router/paths'
import { useTheme } from '../../context/ThemeContext'
import { useLang } from '../../context/LangContext'
import { getSessionUser, logout } from '../../utils/auth'

const NAV = [
  { to: PATHS.DASHBOARD, label: 'Dashboard' },
  { to: PATHS.ORDER_NEW, label: 'Comandă nouă' },
  { to: PATHS.ORDERS,    label: 'Comenzile mele' },
]

function initials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function OrdersNavbar() {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang } = useLang()
  const navigate = useNavigate()
  const dark = theme === 'dark'
  const user = getSessionUser()
  const [langAnim, setLangAnim] = useState(false)
  const [themeAnim, setThemeAnim] = useState(false)

  function handleLogout() { logout(navigate) }
  function handleLangClick() { setLangAnim(true); setTimeout(() => setLangAnim(false), 300); toggleLang() }
  function handleThemeClick() { setThemeAnim(true); setTimeout(() => setThemeAnim(false), 300); toggleTheme() }

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
        {user && (
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
              {initials(user.name)}
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{user.name}</span>
          </div>
        )}
        <button
          onClick={handleLangClick}
          className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white w-8 text-center focus:outline-none"
          aria-label="Toggle language"
          style={{
            transform: langAnim ? 'scale(1.3)' : 'scale(1)',
            transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.2s',
          }}
        >
          {lang}
        </button>
        <button
          onClick={handleThemeClick}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus:outline-none"
          aria-label="Toggle theme"
          style={{
            transform: themeAnim ? 'rotate(30deg) scale(1.2)' : 'rotate(0deg) scale(1)',
            transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), color 0.2s',
          }}
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
        <button
          onClick={handleLogout}
          title="Deconectare"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800 transition-colors"
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
          </svg>
          <span className="hidden sm:inline">Ieșire</span>
        </button>
      </div>
    </header>
  )
}
