import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'

export default function DepotNavbar() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang } = useLang()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const dark = theme === 'dark'
  const [langAnim, setLangAnim] = useState(false)
  const [themeAnim, setThemeAnim] = useState(false)

  function handleLogout() { logout(); navigate('/') }
  function handleLangClick() { setLangAnim(true); setTimeout(() => setLangAnim(false), 300); toggleLang() }
  function handleThemeClick() { setThemeAnim(true); setTimeout(() => setThemeAnim(false), 300); toggleTheme() }

  return (
    <header className="sticky top-0 z-50 flex items-center gap-3 h-14 px-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="w-8 h-8 bg-blue-600 rounded-[10px] flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M5 15V5H12C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11H5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 11L15 15" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 tracking-tight">
        Routa<span className="text-blue-600">X</span>
      </span>
      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
        Stație Depozit
      </span>

      <div className="ml-auto flex items-center gap-2.5">
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-xs font-bold flex items-center justify-center">
            DP
          </div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Depozit Chișinău</span>
        </div>
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
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>
          ) : (
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
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
