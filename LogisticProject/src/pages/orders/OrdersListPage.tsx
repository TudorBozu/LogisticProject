import { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrders } from '../../context/OrdersContext'
import OrdersNavbar from '../../components/ui/OrdersNavbar'
import { fmtMDL, distToETA, statusLabel, statusColors, fmtDate } from '../../utils/format'
import { PATHS, orderRoutePath } from '../../router/paths'
import type { OrderStatus } from '../../types/orders'

const PAGE_SIZE = 5

type SortKey = 'date' | 'cost' | 'distance'
type FilterStatus = 'all' | OrderStatus

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'date',     label: 'Sortare: Dată' },
  { value: 'cost',     label: 'Sortare: Cost' },
  { value: 'distance', label: 'Sortare: Distanță' },
]

interface DeleteModal {
  open: boolean
  orderId: string
  orderLabel: string
}

export default function OrdersListPage() {
  const { orders, deleteOrder } = useOrders()
  const navigate = useNavigate()

  const [search, setSearch]           = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [sort, setSort]               = useState<SortKey>('date')
  const [page, setPage]               = useState(1)
  const [deleteModal, setDeleteModal] = useState<DeleteModal>({ open: false, orderId: '', orderLabel: '' })
  const [sortOpen, setSortOpen]       = useState(false)
  const sortRef                       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const stats = useMemo(() => ({
    total:      orders.length,
    transit:    orders.filter(o => o.status === 'transit').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered:  orders.filter(o => o.status === 'delivered').length,
  }), [orders])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let result = orders.filter(o => {
      if (filterStatus !== 'all' && o.status !== filterStatus) return false
      if (q && !o.id.toLowerCase().includes(q) && !o.product.toLowerCase().includes(q)) return false
      return true
    })
    if (sort === 'date')     result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    if (sort === 'cost')     result = [...result].sort((a, b) => b.cost.total - a.cost.total)
    if (sort === 'distance') result = [...result].sort((a, b) => b.distance - a.distance)
    return result
  }, [orders, search, filterStatus, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage   = Math.min(page, totalPages)
  const paginated  = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }, [])

  const handleFilterChange = useCallback((val: FilterStatus) => {
    setFilterStatus(val)
    setPage(1)
  }, [])

  const handleSortChange = useCallback((val: SortKey) => {
    setSort(val)
    setPage(1)
  }, [])

  const openDeleteModal = useCallback((orderId: string, orderLabel: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setDeleteModal({ open: true, orderId, orderLabel })
  }, [])

  const confirmDelete = useCallback(() => {
    deleteOrder(deleteModal.orderId)
    setDeleteModal({ open: false, orderId: '', orderLabel: '' })
    setPage(1)
  }, [deleteOrder, deleteModal.orderId])

  const cancelDelete = useCallback(() => {
    setDeleteModal({ open: false, orderId: '', orderLabel: '' })
  }, [])

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
            { val: stats.total,      lbl: 'Total',      color: 'text-slate-900 dark:text-slate-100',        filter: 'all'        as FilterStatus },
            { val: stats.transit,    lbl: 'În tranzit', color: 'text-emerald-600 dark:text-emerald-400',    filter: 'transit'    as FilterStatus },
            { val: stats.processing, lbl: 'Prelucrare', color: 'text-amber-600 dark:text-amber-400',        filter: 'processing' as FilterStatus },
            { val: stats.delivered,  lbl: 'Livrate',    color: 'text-slate-500 dark:text-slate-400',        filter: 'delivered'  as FilterStatus },
          ].map(s => (
            <button
              key={s.lbl}
              onClick={() => handleFilterChange(filterStatus === s.filter ? 'all' : s.filter)}
              className={`bg-white dark:bg-slate-900 border rounded-2xl p-4 text-left transition-all ${
                filterStatus === s.filter
                  ? 'border-blue-400 dark:border-blue-600 ring-1 ring-blue-400 dark:ring-blue-600'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className={`font-display text-2xl font-bold ${s.color}`}>{s.val}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.lbl}</div>
            </button>
          ))}
        </div>

        {/* Search + Sort toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 animate-fade-up-2">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Caută după ID sau produs…"
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-400 dark:focus:border-blue-600 transition-colors"
            />
          </div>
          <div ref={sortRef} className="relative">
            <button
              onClick={() => setSortOpen(o => !o)}
              className={`flex items-center gap-2 px-3 py-2.5 text-sm bg-white dark:bg-slate-900 border rounded-xl text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap ${
                sortOpen
                  ? 'border-blue-400 dark:border-blue-600'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {SORT_OPTIONS.find(o => o.value === sort)?.label}
              <svg
                width="12" height="12" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" strokeWidth={2.5}
                className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {sortOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden z-20">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { handleSortChange(opt.value); setSortOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      sort === opt.value
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        {search || filterStatus !== 'all' ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            {filtered.length} {filtered.length === 1 ? 'rezultat' : 'rezultate'}
            {filterStatus !== 'all' && <> · filtru: <span className="font-semibold">{statusLabel(filterStatus as OrderStatus)}</span></>}
            {search && <> · căutare: <span className="font-semibold">„{search}"</span></>}
            <button onClick={() => { setSearch(''); setFilterStatus('all'); setPage(1) }} className="ml-2 text-blue-600 dark:text-blue-400 hover:underline">Resetează</button>
          </p>
        ) : null}

        {/* Orders list */}
        <div className="flex flex-col gap-2.5">
          {filtered.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center">
              <svg className="mx-auto mb-3 text-slate-300 dark:text-slate-700" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              <p className="text-sm text-slate-500 dark:text-slate-400">Nicio comandă găsită.</p>
              {(search || filterStatus !== 'all') && (
                <button onClick={() => { setSearch(''); setFilterStatus('all'); setPage(1) }} className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Resetează filtrele
                </button>
              )}
            </div>
          ) : (
            paginated.map(order => {
              const dest = order.destinations[0]
              return (
                <div
                  key={order.id}
                  onClick={() => navigate(orderRoutePath(order.id))}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md hover:shadow-blue-600/5 transition-all flex flex-col gap-3"
                >
                  <div className="flex items-start gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-base font-bold text-slate-900 dark:text-slate-100">{order.id}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">{order.product}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">{order.units} unități · {order.totalKg} kg · {fmtDate(order.createdAt)}</div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors(order.status)}`}>
                      {statusLabel(order.status)}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <span className="text-blue-600 dark:text-blue-400">{order.from}</span>
                      <span className="text-slate-400">→</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{dest.city}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-slate-500 dark:text-slate-400">{order.distance} km · {distToETA(order.distance)}</span>
                    <span className="font-display text-sm font-bold text-blue-600 dark:text-blue-400 ml-auto">{fmtMDL(order.cost.total)}</span>
                    <button
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                      onClick={e => { e.stopPropagation(); navigate(orderRoutePath(order.id)) }}
                    >
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c-.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                      </svg>
                      Urmărire
                    </button>
                    <button
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                      onClick={e => openDeleteModal(order.id, order.id, e)}
                    >
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                      Șterge
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pagina {safePage} din {totalPages} · {filtered.length} rezultate
            </p>
            <div className="flex items-center gap-1">
              <button
                disabled={safePage === 1}
                onClick={() => setPage(p => p - 1)}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-semibold transition-colors ${
                    n === safePage
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                disabled={safePage === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={cancelDelete} />
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-fade-up">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto mb-4">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-red-600 dark:text-red-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
            <h2 className="text-center font-display text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">Șterge comanda</h2>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-6">
              Ești sigur că vrei să ștergi comanda <span className="font-semibold text-slate-700 dark:text-slate-300">{deleteModal.orderLabel}</span>? Această acțiune nu poate fi anulată.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Anulează
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Șterge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
