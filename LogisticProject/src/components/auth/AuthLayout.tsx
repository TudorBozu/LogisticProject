import type { ReactNode } from 'react'
import { useLang } from '../../context/LangContext'
import { authT } from '../../data/authTranslations'

interface AuthLayoutProps {
  children: ReactNode
  panelTitle: string
  panelSubtitle: string
    panelStatsLabel: string
    panelStats: { value: string; label: string; icon: ReactNode }[]
    panelQuote: { text: string; name: string; role: string; initials: string }
}

interface StatCardProps {
  value: string
  label: string
  icon: ReactNode
}

function StatCard({ value, label, icon }: StatCardProps) {
  return (
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/15">
          {icon}
        </div>
        <div>
          <div className="font-display text-lg font-semibold leading-none text-white">{value}</div>
          <div className="mt-0.5 text-xs text-indigo-100">{label}</div>
        </div>
      </div>
  )
}

export default function AuthLayout({
                                     children,
                                     panelTitle,
                                     panelSubtitle,
                                     panelStats,
                                     panelStatsLabel,
                                     panelQuote,
                                   }: AuthLayoutProps) {
    const { lang } = useLang()
    const lt = authT[lang].layout

  return (
      <div className="flex min-h-screen flex-col lg:flex-row pt-[53px]">

        {/* ── Brand Panel ─── */}
        <aside className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-brand-900 w-full lg:w-[460px] xl:w-[520px] lg:flex-shrink-0 lg:min-h-[calc(100vh-53px)]">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand-400/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-brand-900/60 blur-3xl" />
          <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
          />
          <div className="relative z-10 flex flex-col justify-between p-7 sm:p-9 lg:h-full lg:p-10">

            {/* Logo */}
              <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 15V5H12C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11H5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10 11L15 15" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                  </div>
                  <span className="font-display text-xl font-bold tracking-tight text-white">RoutaX</span>
              </div>

            {/* Hero */}
            <div className="mt-8 lg:mt-10">
              <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-3xl xl:text-4xl">
                {panelTitle}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-indigo-100 sm:text-base">
                {panelSubtitle}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 space-y-2.5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-indigo-300">
                  {panelStatsLabel}
              </p>
              {panelStats.map((s, i) => (
                  // key pe div nativ — evită eroarea Rider "Unresolved component prop key"
                  <div key={i}>
                    <StatCard value={s.value} label={s.label} icon={s.icon} />
                  </div>
              ))}
            </div>

            {/* Quote */}
            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-sm italic leading-relaxed text-indigo-100">"{panelQuote.text}"</p>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white">
                  {panelQuote.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{panelQuote.name}</div>
                  <div className="text-xs text-indigo-200">{panelQuote.role}</div>
                </div>
              </div>
            </div>

            <div className="h-2 lg:hidden" />
          </div>
        </aside>

        {/* ── Form Panel ─── */}
        <main className="relative flex min-h-[calc(100vh-53px)] flex-1 flex-col items-center justify-center overflow-hidden px-4 py-10 sm:px-8">
          {/* Background image */}
          <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                backgroundImage: 'url(/trucks-hero.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center 60%',
              }}
          />
          {/* Blue overlay */}
          <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                background: 'linear-gradient(160deg, rgba(49,46,129,.88) 0%, rgba(79,70,229,.78) 40%, rgba(49,46,129,.94) 100%)',
              }}
          />

          {/* Card */}
          <div className="relative z-10 w-full max-w-xl animate-fade-up rounded-3xl border border-white/60 bg-white dark:bg-slate-900 dark:border-slate-700/60 p-8 shadow-card backdrop-blur-md sm:p-10">
            {children}
          </div>

            <p className="relative z-10 mt-8 text-center text-xs text-white/50">
                © {new Date().getFullYear()} RoutaX Technologies SRL · {lt.rights}
            </p>
        </main>

      </div>
  )
}
