import { useParams, useNavigate } from 'react-router-dom'
import { useOrders } from '../../context/OrdersContext'
import { useTheme } from '../../context/ThemeContext'
import { fmtMDL, distToETA, statusLabel, statusColors, driverInitials } from '../../utils/format'
import { PATHS } from '../../router/paths'
import OrderMap from '../../components/orders/OrderMap'
import type { OrderStatus } from '../../types/orders'

const STEPS: { key: OrderStatus | 'confirmed' | 'assigned'; label: string }[] = [
  { key: 'processing', label: 'Prelucrare' },
  { key: 'confirmed',  label: 'Confirmat' },
  { key: 'assigned',   label: 'Șofer atribuit' },
  { key: 'transit',    label: 'În tranzit' },
  { key: 'delivered',  label: 'Livrat' },
]

const ACTIVE_IDX: Record<string, number> = { processing: 0, transit: 3, delivered: 4 }

export default function RouteViewPage() {
  const { id }              = useParams<{ id: string }>()
  const { orders }          = useOrders()
  const { theme, toggleTheme } = useTheme()
  const dark                = theme === 'dark'
  const navigate            = useNavigate()
  const order = orders.find(o => o.id === id) ?? orders[0]
  const dest  = order?.destinations[0]

  if (!order) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-500 mb-4">Comanda nu a fost găsită.</p>
        <button onClick={() => navigate(PATHS.ORDERS)} className="text-sm text-blue-600 hover:underline">← Înapoi la comenzi</button>
      </div>
    </div>
  )

  const activeIdx   = ACTIVE_IDX[order.status] ?? 0
  const isDelivered = order.status === 'delivered'
  const badgeClass  = statusColors(order.status)

  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950 h-screen overflow-hidden transition-colors">
      {/* Topbar */}
      <header className="flex items-center gap-3 h-14 px-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
        <div className="w-8 h-8 bg-blue-600 rounded-[10px] flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M5 15V5H12C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11H5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 11L15 15" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-display font-bold text-slate-900 dark:text-slate-100">{order.id}</span>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>{statusLabel(order.status)}</span>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={() => navigate(PATHS.ORDERS)} className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            ← Înapoi
          </button>
          <button onClick={toggleTheme} className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-500 flex items-center justify-center hover:border-slate-300 transition-colors">
            {dark ? (
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>
            ) : (
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col overflow-hidden lg:flex hidden">
          <div className="p-3.5 border-b border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Comandă activă</div>
            <div className="font-display font-bold text-slate-900 dark:text-slate-100">{order.id}</div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass} mt-1 inline-flex`}>{statusLabel(order.status)}</span>
          </div>
          <nav className="p-2 flex-1">
            {[
              { label: 'Comenzile mele', to: PATHS.ORDERS },
              { label: 'Detalii comandă', active: true },
              { label: 'Comandă nouă', to: PATHS.ORDER_NEW },
            ].map(n => (
              <button key={n.label} onClick={() => n.to && navigate(n.to)}
                className={`w-full text-left flex items-center px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-colors ${n.active ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                {n.label}
              </button>
            ))}
          </nav>

          {/* Timeline */}
          <div className="p-3.5 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Stare comandă</div>
            {STEPS.map((step, i) => {
              const isDone   = isDelivered || i < activeIdx
              const isActive = !isDelivered && i === activeIdx
              return (
                <div key={step.key}>
                  <div className="flex items-start gap-2.5 pb-1">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs border-2 transition-colors ${
                      isDone   ? 'bg-blue-600 border-blue-600 text-white' :
                      isActive ? 'border-blue-500 text-blue-500 bg-white dark:bg-slate-900' :
                      'border-slate-200 dark:border-slate-700 text-slate-400 bg-white dark:bg-slate-900'
                    }`}>
                      {isDone ? <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg> : isActive ? <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-live-pulse" /> : null}
                    </div>
                    <div className={`text-xs pt-0.5 font-medium ${isDone ? 'text-slate-400' : isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-400'}`}>
                      {step.label}
                      {isActive && step.key === 'transit' && (
                        <span className="block text-slate-400 font-normal text-xs">ETA: ~{distToETA(order.distance)}</span>
                      )}
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`w-0.5 h-4 ml-2.5 mb-1 rounded-full ${isDone ? 'bg-blue-300 dark:bg-blue-700' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  )}
                </div>
              )
            })}
          </div>

          {/* Driver */}
          <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
              {driverInitials(order.driver)}
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{order.driver}</div>
              <div className="text-xs text-slate-400">{order.truck} · Șofer</div>
            </div>
          </div>
        </aside>

        {/* Map */}
        <div className="flex-1 overflow-hidden p-4 flex flex-col">
          <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-live-pulse" />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Hartă traseu — {order.from} → {dest.city}
                </span>
              </div>
              <div className="hidden sm:flex gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-blue-600 rounded inline-block" />Traseu</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />Destinație</span>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <OrderMap
                fromCity={order.from}
                toCity={dest.city}
                driver={order.driver}
                truck={order.truck}
                status={order.status}
              />
            </div>
          </div>
        </div>

        {/* Right panel */}
        <aside className="w-72 flex-shrink-0 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto p-4 hidden xl:block">
          {/* Route details */}
          <Section title="Detalii traseu">
            <div className="grid grid-cols-2 gap-2">
              {[
                { val: `${order.distance} km`, lbl: 'Distanță', color: 'text-blue-600 dark:text-blue-400' },
                { val: distToETA(order.distance), lbl: 'Timp estimat', color: 'text-amber-600 dark:text-amber-400' },
                { val: fmtMDL(order.cost.total), lbl: 'Cost estimat', color: 'text-emerald-600 dark:text-emerald-400' },
                { val: order.truck, lbl: 'Camion', color: 'text-slate-900 dark:text-slate-100' },
              ].map(s => (
                <div key={s.lbl} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-2.5">
                  <div className={`font-display font-bold text-sm ${s.color}`}>{s.val}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.lbl}</div>
                </div>
              ))}
            </div>
          </Section>
          {/* Cost breakdown */}
          <Section title="Detalii cost">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3.5">
              {[
                ['Transport bază', order.cost.base],
                ['Carburant estimat', order.cost.fuel],
                ['Taxe & Asigurare', order.cost.taxes],
                ['TVA 20%', order.cost.vat],
              ].map(([l, v]) => (
                <div key={String(l)} className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-700 last:border-0 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{l}</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">{fmtMDL(v as number)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2.5 mt-0.5">
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Total</span>
                <span className="font-display font-bold text-base text-blue-600 dark:text-blue-400">{fmtMDL(order.cost.total)}</span>
              </div>
            </div>
          </Section>
          {/* Cargo */}
          <Section title="Marfă">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3.5">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{order.product}</p>
              <p className="text-xs text-slate-400 mt-0.5">{order.productType}</p>
              <div className="grid grid-cols-3 gap-1.5 mt-3">
                {[
                  { v: order.units, l: 'Unități' },
                  { v: `${order.massPerUnit}kg`, l: 'Masă/buc' },
                  { v: `${order.totalKg}kg`, l: 'Total' },
                ].map(c => (
                  <div key={c.l} className="bg-white dark:bg-slate-700 rounded-lg p-1.5 text-center">
                    <div className="font-display font-bold text-xs text-slate-900 dark:text-slate-100">{c.v}</div>
                    <div className="text-xs text-slate-400">{c.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
          {/* Destination */}
          <Section title="Destinație">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3.5 flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{dest.city}</p>
                <p className="text-xs text-slate-400">{dest.addr}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5"><strong>Contact:</strong> {dest.contact}</p>
                <a href={`tel:${dest.phone.replace(/\s/g, '')}`} className="text-xs text-blue-600 dark:text-blue-400">{dest.phone}</a>
              </div>
            </div>
          </Section>
        </aside>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">{title}</h3>
      {children}
    </div>
  )
}
