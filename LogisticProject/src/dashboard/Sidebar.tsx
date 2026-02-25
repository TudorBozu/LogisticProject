import { NavLink, useNavigate } from 'react-router-dom'

const NAV = [
  {
    to: '/app',
    end: true,
    label: 'Home',
    icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
        </svg>
    ),
  },
  {
    to: '/app/orders',
    label: 'Comenzile mele',
    icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
        </svg>
    ),
  },
  {
    to: '/app/new-order',
    label: 'Comandă nouă',
    icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
    ),
    highlight: true,
  },
  {
    to: '/app/orders/RX-2026-0041',
    label: 'Detalii comandă',
    icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
        </svg>
    ),
  },
  {
    to: '/app/orders/RX-2026-0041/status',
    label: 'Stare comandă',
    icon: (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
        </svg>
    ),
  },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
      <aside className="
      fixed left-0 top-0 z-40 flex h-full w-64 flex-shrink-0 flex-col
      border-r border-slate-200 bg-white
      dark:border-slate-800 dark:bg-slate-900
      transition-colors duration-250
    ">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2.5 border-b border-slate-200 px-5 dark:border-slate-800">
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
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV.map((item) => (
              <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `
              flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium
              transition-all duration-150
              ${item.highlight
                      ? 'bg-brand-600 text-white shadow-soft hover:bg-brand-700'
                      : isActive
                          ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                  }
            `}
              >
                {item.icon}
                {item.label}
              </NavLink>
          ))}
        </nav>

        {/* Bottom: user */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">Ana Moraru</p>
              <p className="text-xs text-slate-400 truncate">ana@logicompany.md</p>
            </div>
            <button
                onClick={() => navigate('/sign-in')}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Sign out"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>
  )
}
