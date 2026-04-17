import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrders } from '../../context/OrdersContext'
import { useTheme } from '../../context/ThemeContext'
import OrdersNavbar from '../../components/ui/OrdersNavbar'
import { fmtMDL, distToETA, statusLabel, statusColors, timeAgo, fmtDate, driverInitials } from '../../utils/format'
import { PATHS, orderRoutePath } from '../../router/paths'
import type { Order } from '../../types/orders'
import OrderMap from '../../components/orders/OrderMap'

export default function ClientDashboard() {
  const { orders } = useOrders()
  const navigate   = useNavigate()
  const { theme }  = useTheme()
  const dark       = theme === 'dark'

  const active     = useMemo(() => orders.filter(o => o.status === 'transit'),     [orders])
  const processing = useMemo(() => orders.filter(o => o.status === 'processing'),  [orders])
  const delivered  = useMemo(() => orders.filter(o => o.status === 'delivered'),   [orders])
  const recent     = useMemo(() => orders.slice(0, 5), [orders])
  const hero       = active[0] ?? processing[0]

  const thisMonth = useMemo(() => {
    const now = new Date()
    return orders.filter(o => {
      const d = new Date(o.createdAt)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
  }, [orders])

  const monthSpend = useMemo(() => thisMonth.reduce((s, o) => s + o.cost.total, 0), [thisMonth])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bună dimineața' : hour < 18 ? 'Bună ziua' : 'Bună seara'

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <OrdersNavbar />

      <div className="max-w-[1200px] mx-auto px-4 py-7 pb-16">

        {/* Header */}
        <div className="flex items-start justify-between mb-6 animate-fade-up">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{greeting}, Alexandru</p>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
              {orders.length === 0
                ? 'Bun venit în RoutaX'
                : active.length > 0
                  ? `${active.length} ${active.length === 1 ? 'livrare activă' : 'livrări active'} acum`
                  : 'Toate comenzile sunt procesate'}
            </h1>
          </div>
          <button
            onClick={() => navigate(PATHS.ORDER_NEW)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-blue-600/20 flex-shrink-0"
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Comandă nouă
          </button>
        </div>

        {orders.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-fade-up-1">
              {[
                { val: orders.length,    label: 'Total comenzi',      color: 'text-slate-900 dark:text-slate-100' },
                { val: active.length,    label: 'În tranzit',         color: 'text-emerald-600 dark:text-emerald-400' },
                { val: processing.length,label: 'În prelucrare',      color: 'text-amber-600 dark:text-amber-400' },
                { val: fmtMDL(monthSpend),label: 'Cheltuit luna aceasta', color: 'text-blue-600 dark:text-blue-400', small: true },
              ].map(s => (
                <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                  <div className={`font-display font-bold ${s.small ? 'text-base' : 'text-2xl'} ${s.color}`}>{s.val}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
              <div className="flex flex-col gap-5">

                {/* Hero active order */}
                {hero && (
                  <div className="animate-fade-up-2">
                    <SectionHeader
                      title={active.length > 0 ? 'Livrare în curs' : 'Comandă în prelucrare'}
                      link={active.length > 1 ? `+${active.length - 1} mai multe →` : undefined}
                      onLink={() => navigate(PATHS.ORDERS)}
                    />
                    <ActiveOrderHero order={hero} dark={dark} onTrack={() => navigate(orderRoutePath(hero.id))} />
                  </div>
                )}

                {/* Recent orders */}
                <div className="animate-fade-up-3">
                  <SectionHeader
                    title="Comenzi recente"
                    link="Vezi toate →"
                    onLink={() => navigate(PATHS.ORDERS)}
                  />
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    {recent.map((o, i) => (
                      <div
                        key={o.id}
                        onClick={() => navigate(orderRoutePath(o.id))}
                        className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${i < recent.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}
                      >
                        <div className="min-w-[120px]">
                          <div className="text-sm font-display font-bold text-slate-900 dark:text-slate-100">{o.id}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[120px]">{o.product}</div>
                          <div className="text-xs text-slate-400 dark:text-slate-500">{fmtDate(o.createdAt)}</div>
                        </div>
                        <div className="flex-1 hidden sm:flex items-center gap-1.5 text-xs font-semibold">
                          <span className="text-blue-600 dark:text-blue-400">{o.from}</span>
                          <span className="text-slate-400">→</span>
                          <span className="text-emerald-600 dark:text-emerald-400">{o.destinations[0].city}</span>
                        </div>
                        <div className="flex items-center gap-2.5 flex-shrink-0">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors(o.status)}`}>
                            {statusLabel(o.status)}
                          </span>
                          <span className="font-display text-sm font-bold text-blue-600 dark:text-blue-400 hidden sm:block">
                            {fmtMDL(o.cost.total)}
                          </span>
                          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-slate-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar */}
              <aside className="flex flex-col gap-4">

                {/* Quick actions */}
                <div className="animate-fade-up-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Acțiuni rapide</h3>
                  {[
                    { label: 'Comandă nouă',    sub: 'Creați o livrare',     color: 'bg-blue-50 dark:bg-blue-900/20', icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>, to: PATHS.ORDER_NEW },
                    { label: 'Toate comenzile', sub: 'Istoricul complet',    color: 'bg-emerald-50 dark:bg-emerald-900/20', icon: <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/></svg>, to: PATHS.ORDERS },
                  ].map(a => (
                    <button
                      key={a.label}
                      onClick={() => navigate(a.to)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mb-2 last:mb-0 text-left"
                    >
                      <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center text-sm flex-shrink-0`}>{a.icon}</div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{a.label}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{a.sub}</div>
                      </div>
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-slate-400 ml-auto flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  ))}
                </div>

                {/* Monthly summary */}
                {thisMonth.length > 0 && (
                  <div className="animate-fade-up-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Luna curentă</h3>
                    <div className="flex items-center gap-2 mb-4">
                      {[
                        { val: thisMonth.length, lbl: 'Comenzi' },
                        { val: delivered.filter(o => { const d = new Date(o.createdAt); const n = new Date(); return d.getMonth() === n.getMonth() }).length, lbl: 'Livrate' },
                      ].map((s, i) => (
                        <>
                          <div key={s.lbl} className="flex-1 text-center">
                            <div className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">{s.val}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.lbl}</div>
                          </div>
                          {i === 0 && <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />}
                        </>
                      ))}
                      <div className="w-px h-8 bg-slate-200 dark:bg-slate-700" />
                      <div className="flex-1 text-center">
                        <div className="font-display text-sm font-bold text-blue-600 dark:text-blue-400">{fmtMDL(monthSpend)}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Cheltuit</div>
                      </div>
                    </div>
                    {(['transit', 'processing', 'delivered'] as const).map(s => {
                      const cnt = thisMonth.filter(o => o.status === s).length
                      const pct = Math.round((cnt / thisMonth.length) * 100)
                      if (!cnt) return null
                      const bar = { transit: 'bg-emerald-500', processing: 'bg-amber-500', delivered: 'bg-slate-400' }[s]
                      return (
                        <div key={s} className="flex items-center gap-2 mb-2 last:mb-0">
                          <span className="text-xs text-slate-500 dark:text-slate-400 w-20 flex-shrink-0">{statusLabel(s)}</span>
                          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 w-3">{cnt}</span>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Active drivers */}
                {active.length > 0 && (
                  <div className="animate-fade-up-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Șoferi activi</h3>
                    {active.map(o => (
                      <div
                        key={o.id}
                        onClick={() => navigate(orderRoutePath(o.id))}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors mb-2 last:mb-0"
                      >
                        <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {driverInitials(o.driver)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">{o.driver}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{o.from} → {o.destinations[0].city}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{distToETA(o.distance)}</div>
                          <div className="text-xs text-slate-400">ETA</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ title, link, onLink }: { title: string; link?: string; onLink?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-2.5">
      <h2 className="font-display text-sm font-bold text-slate-900 dark:text-slate-100">{title}</h2>
      {link && (
        <button onClick={onLink} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          {link}
        </button>
      )}
    </div>
  )
}

function ActiveOrderHero({ order, onTrack }: { order: Order; dark: boolean; onTrack: () => void }) {
  const dest   = order.destinations[0]
  const etaPct = order.status === 'transit' ? 55 : order.status === 'processing' ? 10 : 100

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-emerald-500" />

      {/* Info row */}
      <div className="flex flex-col gap-3">
        {/* Top row */}
        <div className="flex items-center gap-2 flex-wrap">
          {order.status === 'transit' ? (
            <span className="flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-live-pulse" />
              Live
            </span>
          ) : (
            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full">
              Prelucrare
            </span>
          )}
          <span className="font-display text-xs font-bold text-slate-700 dark:text-slate-300">{order.id}</span>
          <span className="text-xs text-slate-400 ml-auto">{timeAgo(order.createdAt)}</span>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">{order.product}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{order.productType} · {order.units} unități · {order.totalKg} kg</p>
        </div>

        {/* Route + progress */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{order.from}</div>
              <div className="text-xs text-slate-400">Depozit</div>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative h-1 bg-slate-100 dark:bg-slate-800 rounded-full mb-1">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full" style={{ width: `${etaPct}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center shadow-sm" style={{ left: `${etaPct}%` }}>
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>{order.distance} km</span>
              <span>{distToETA(order.distance)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{dest.city}</div>
              <div className="text-xs text-slate-400">Destinație</div>
            </div>
          </div>
        </div>

        {/* Driver + cost + button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
              {driverInitials(order.driver)}
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">{order.driver}</div>
              <div className="text-xs text-slate-400">{order.truck}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-display text-base font-bold text-blue-600 dark:text-blue-400">{fmtMDL(order.cost.total)}</div>
              <div className="text-xs text-slate-400">Cost total</div>
            </div>
            <button
              onClick={onTrack}
              className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow shadow-blue-600/25"
            >
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
              </svg>
              Urmărire în timp real
            </button>
          </div>
        </div>
      </div>

      {/* Hartă rută comandă */}
      <div style={{ height: 360 }}>
        <OrderMap
          fromCity={order.from}
          toCity={dest.city}
          driver={order.driver}
          truck={order.truck}
          status={order.status}
        />
      </div>
    </div>
  )
}

function EmptyState() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-up-1">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} className="text-slate-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      </div>
      <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Nicio comandă încă</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
        Creați prima comandă de transport și urmăriți-o în timp real pe hartă.
      </p>
      <button
        onClick={() => navigate(PATHS.ORDER_NEW)}
        className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-blue-600/25"
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Creează prima comandă
      </button>
    </div>
  )
}
