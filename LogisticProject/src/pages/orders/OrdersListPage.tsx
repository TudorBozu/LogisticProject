import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrders } from '../../context/OrdersContext'
import OrdersNavbar from '../../components/ui/OrdersNavbar'
import { fmtMDL, distToETA, statusLabel, statusColors, fmtDate } from '../../utils/format'
import { PATHS, orderRoutePath } from '../../router/paths'

export default function OrdersListPage() {
  const { orders } = useOrders()
  const navigate   = useNavigate()

  const stats = useMemo(() => ({
    total:      orders.length,
    transit:    orders.filter(o => o.status === 'transit').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered:  orders.filter(o => o.status === 'delivered').length,
  }), [orders])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <OrdersNavbar />

      <div className="max-w-4xl mx-auto px-4 py-7 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-up">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">Comenzile mele</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {orders.length} {orders.length === 1 ? 'comandă înregistrată' : 'comenzi înregistrate'}
            </p>
          </div>
          <button
            onClick={() => navigate(PATHS.ORDER_NEW)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-blue-600/20"
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Comandă nouă
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 animate-fade-up-1">
          {[
            { val: stats.total,      lbl: 'Total',         color: 'text-slate-900 dark:text-slate-100' },
            { val: stats.transit,    lbl: 'În tranzit',    color: 'text-emerald-600 dark:text-emerald-400' },
            { val: stats.processing, lbl: 'Prelucrare',    color: 'text-amber-600 dark:text-amber-400' },
            { val: stats.delivered,  lbl: 'Livrate',       color: 'text-slate-500 dark:text-slate-400' },
          ].map(s => (
            <div key={s.lbl} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
              <div className={`font-display text-2xl font-bold ${s.color}`}>{s.val}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Orders list */}
        <div className="animate-fade-up-2 flex flex-col gap-2.5">
          {orders.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-sm text-slate-500 dark:text-slate-400">
              Nicio comandă înregistrată.
            </div>
          ) : (
            orders.map(order => {
              const dest = order.destinations[0]
              return (
                <div
                  key={order.id}
                  onClick={() => navigate(orderRoutePath(order.id))}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md hover:shadow-blue-600/5 transition-all flex flex-col gap-3"
                >
                  <div className="flex items-start gap-3 flex-wrap">
                    <div>
                      <div className="font-display text-base font-bold text-slate-900 dark:text-slate-100">{order.id}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{order.product}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">{order.units} unități · {order.totalKg} kg · {fmtDate(order.createdAt)}</div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors(order.status)}`}>
                      {statusLabel(order.status)}
                    </span>
                    <div className="flex items-center gap-1.5 ml-auto text-xs font-semibold">
                      <span className="text-blue-600 dark:text-blue-400">{order.from}</span>
                      <span className="text-slate-400">→</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{dest.city}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-xs text-slate-500 dark:text-slate-400">{order.distance} km · {distToETA(order.distance)}</span>
                    <span className="font-display text-sm font-bold text-blue-600 dark:text-blue-400 ml-auto">{fmtMDL(order.cost.total)}</span>
                    <button
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                      onClick={e => { e.stopPropagation(); navigate(orderRoutePath(order.id)) }}
                    >
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"/></svg>
                      Urmărire
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
