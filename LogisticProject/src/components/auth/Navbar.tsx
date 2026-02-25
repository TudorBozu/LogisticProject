import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const { pathname } = useLocation()

    return (
        <nav className="
      fixed top-0 left-0 right-0 z-50
      flex items-center gap-2 px-4 py-2.5
      border-b border-slate-200 dark:border-slate-800
      bg-white/90 dark:bg-slate-950/90
      backdrop-blur-md
      transition-colors duration-250
    ">
            {/* Logo */}
            <div className="flex items-center gap-2 mr-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M5 15V5H12C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11H5"
                              stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 11L15 15"
                              stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <span className="font-display text-sm font-bold tracking-tight text-slate-900 dark:text-white">
          Routa<span className="text-brand-600">X</span>
        </span>
            </div>

            {/* Tabs */}
            <Link
                to="/sign-in"
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    pathname === '/sign-in'
                        ? 'bg-brand-600 text-white shadow-soft'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
            >
                Sign In
            </Link>
            <Link
                to="/sign-up"
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    pathname === '/sign-up'
                        ? 'bg-brand-600 text-white shadow-soft'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
            >
                Sign Up
            </Link>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Theme toggle */}
            <ThemeToggle />
        </nav>
    )
}
