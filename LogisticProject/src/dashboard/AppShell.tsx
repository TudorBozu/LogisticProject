import type { ReactNode } from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

// ── Typed nav item ────────────────────────────────────────────────────────
interface NavItem {
  to: string
  end?: boolean
  label: string
  highlight?: boolean
  icon: ReactNode
}

const NAV: NavItem[] = [
  {
    to: '/app', end: true, label: 'Home',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>,
  },
  {
    to: '/app/orders', label: 'Comenzile mele',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/></svg>,
  },
  {
    to: '/app/new-order', label: 'Comandă nouă', highlight: true,
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>,
  },
  {
    to: '/app/orders/RX-2026-0041', label: 'Detalii comandă',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/></svg>,
  },
  {
    to: '/app/orders/RX-2026-0041/status', label: 'Stare comandă',
    icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>,
  },
]

// ── SidebarContent extras în afara AppShell ───────────────────────────────
// IMPORTANT: definit AFARA lui AppShell — altfel React îl recreează
// la fiecare render și apar erori cu `key` + performanță slabă.
interface SidebarContentProps {
  isDark: boolean
  toggleTheme: () => void
  onNavClick: () => void
  onLogout: () => void
}

function SidebarContent({ isDark, toggleTheme, onNavClick, onLogout }: SidebarContentProps) {
  return (
      <>
        {/* Logo */}
        <div className="flex h-16 flex-shrink-0 items-center gap-2.5 border-b border-slate-200 px-5 dark:border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 shadow-soft">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M5 15V5H12C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11H5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11L15 15" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          Routa<span className="text-brand-600">X</span>
        </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
            Navigare
          </p>
          {NAV.map((item) => (
              <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onNavClick}
                  className={({ isActive }) =>
                      [
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                        item.highlight
                            ? 'bg-brand-600 text-white shadow-soft hover:bg-brand-700 active:scale-[.98]'
                            : isActive
                                ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200',
                      ].join(' ')
                  }
              >
                {item.icon}
                {item.label}
              </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="flex-shrink-0 space-y-3 border-t border-slate-200 p-4 dark:border-slate-800">
          {/* Theme toggle */}
          <button
              onClick={toggleTheme}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {isDark
                ? <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/></svg>
                : <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/></svg>
            }
            {isDark ? 'Mod luminos' : 'Mod întunecat'}
          </button>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
              AM
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">Ana Moraru</p>
              <p className="truncate text-xs text-slate-400">ana@logicompany.md</p>
            </div>
            <button
                onClick={onLogout}
                className="text-slate-400 transition-colors hover:text-red-500"
                title="Ieșire"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"/>
              </svg>
            </button>
          </div>
        </div>
      </>
  )
}

// ── AppShell ──────────────────────────────────────────────────────────────
export default function AppShell({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
      <div className="flex min-h-screen bg-slate-50 transition-colors duration-250 dark:bg-slate-950">

        {/* ── Desktop Sidebar ──────────────────────── */}
        <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-shrink-0 flex-col border-r border-slate-200 bg-white transition-colors duration-250 dark:border-slate-800 dark:bg-slate-900 lg:flex">
          <SidebarContent
              isDark={isDark}
              toggleTheme={toggleTheme}
              onNavClick={() => setMobileOpen(false)}
              onLogout={() => navigate('/sign-in')}
          />
        </aside>

        {/* ── Mobile overlay ───────────────────────── */}
        {mobileOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setMobileOpen(false)}
              />
              <aside className="absolute left-0 top-0 flex h-full w-72 flex-col border-r border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                <SidebarContent
                    isDark={isDark}
                    toggleTheme={toggleTheme}
                    onNavClick={() => setMobileOpen(false)}
                    onLogout={() => navigate('/sign-in')}
                />
              </aside>
            </div>
        )}

        {/* ── Main ─────────────────────────────────── */}
        <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
          {/* Mobile topbar */}
          <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-900/90 lg:hidden">
            <button
                onClick={() => setMobileOpen(true)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M5 15V5H12C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11H5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 11L15 15" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display text-base font-bold text-slate-900 dark:text-white">
              Routa<span className="text-brand-600">X</span>
            </span>
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>

      </div>
  )
}
