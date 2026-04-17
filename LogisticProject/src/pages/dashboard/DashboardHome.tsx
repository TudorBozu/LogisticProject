import { Link } from 'react-router-dom'
import { MOCK_ORDERS, STATUS_STEPS } from '../../data/mockData'

const STATUS_COLOR: Record<string, string> = {
  processing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  confirmed:  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  pickup:     'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  in_transit: 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400',
  delivered:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
}

export default function DashboardHome() {
  const active = MOCK_ORDERS.filter(o => o.status === 'in_transit' || o.status === 'pickup')
  const total  = MOCK_ORDERS.length
  const delivered = MOCK_ORDERS.filter(o => o.status === 'delivered').length

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Bună ziua, Ana
          </h1>
          <p className="mt-1 text-slate-500 dark:text-slate-400 text-sm">
            Iată o privire de ansamblu asupra comenzilor tale
          </p>
        </div>
        <Link
          to="/app/new-order"
          className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-brand-700 transition-colors active:scale-[.98] self-start sm:self-auto"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
          </svg>
          Comandă nouă
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total comenzi', value: total, icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg>, color: 'bg-brand-50 dark:bg-brand-900/20' },
          { label: 'Active', value: active.length, icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d97706" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>, color: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Livrate', value: delivered, icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>, color: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'km parcurși', value: MOCK_ORDERS.reduce((a,o)=>a+o.distance,0), icon: <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#7c3aed" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"/></svg>, color: 'bg-purple-50 dark:bg-purple-900/20' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border border-slate-200/80 ${s.color} p-4 dark:border-slate-800`}>
            <div className="mb-1">{s.icon}</div>
            <div className="font-display text-2xl font-bold text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Comenzi recente</h2>
          <Link to="/app/orders" className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
            Vezi toate →
          </Link>
        </div>

        <div className="space-y-3">
          {MOCK_ORDERS.map(order => (
            <Link
              key={order.id}
              to={`/app/orders/${order.id}`}
              className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/30">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{order.id}</p>
                  <p className="text-xs text-slate-400 truncate">{order.depot.name} → {order.destination.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{order.distance} km</p>
                  <p className="text-xs text-slate-400">{order.cost} MDL</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_COLOR[order.status]}`}>
                  {STATUS_STEPS.find(s => s.key === order.status)?.label}
                </span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-slate-300 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
