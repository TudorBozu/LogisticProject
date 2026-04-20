import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../router/paths'
import { clearAuthNav } from '../../router/Guard'
import { useLang } from '../../context/LangContext'
import { useTheme } from '../../context/ThemeContext'
import BrandLogo from './BrandLogo'

export default function Navbar() {
    const { lang, toggleLang } = useLang()
    const { theme, toggleTheme } = useTheme()
    const dark = theme === 'dark'
    const [langAnim, setLangAnim] = useState(false)
    const [themeAnim, setThemeAnim] = useState(false)

    function handleLangClick() { setLangAnim(true); setTimeout(() => setLangAnim(false), 300); toggleLang() }
    function handleThemeClick() { setThemeAnim(true); setTimeout(() => setThemeAnim(false), 300); toggleTheme() }

    return (
        <nav className="
      fixed top-0 left-0 right-0 z-50
      flex items-center gap-2 px-4 py-2.5
      border-b border-slate-200 dark:border-slate-800
      bg-white/90 dark:bg-slate-950/90
      backdrop-blur-md
      transition-colors duration-250
    ">
            {/* Logo — link spre landing */}
            <Link
                to={PATHS.public.home}
                onClick={clearAuthNav}
                className="flex items-center gap-2 mr-2 hover:opacity-80 transition-opacity"
            >
                <BrandLogo inverted={!dark} />
            </Link>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Lang toggle */}
            <button
                onClick={handleLangClick}
                className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white w-8 text-center focus:outline-none"
                aria-label="Toggle language"
                style={{
                    transform: langAnim ? 'scale(1.3)' : 'scale(1)',
                    transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), color 0.2s',
                }}
            >
                {lang}
            </button>

            {/* Theme toggle */}
            <button
                onClick={handleThemeClick}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white focus:outline-none"
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
        </nav>
    )
}
