import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useDriver } from '../../context/DriverContext'
import { queryTrips, tripSummaryStats } from '../../services/driverService'
import type { TripFilters, TripRecord, TripStatus } from '../../types/driver'

type SelectOption<T extends string> = { label: string; value: T }

function FilterSelect<T extends string>({
  options, value, onChange,
}: {
  options: SelectOption<T>[]
  value: T
  onChange: (v: T) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find(o => o.value === value)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`flex items-center justify-between gap-2 pl-3 pr-2.5 py-2 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[148px] w-full transition-colors ${
          open
            ? 'border-blue-500 ring-2 ring-blue-500/20'
            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
        }`}
      >
        <span>{selected?.label}</span>
        <svg
          viewBox="0 0 24 24" fill="none"
          className={`w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 z-50 overflow-hidden">
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onMouseDown={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                opt.value === value
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const DEFAULT_FILTERS: TripFilters = {
  search:  '',
  status:  'all',
  sortBy:  'date',
  sortDir: 'desc',
  page:    1,
}

function StatusBadge({ status }: { status: TripStatus }) {
  const map: Record<TripStatus, string> = {
    completed:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    in_transit: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    cancelled:  'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  }
  const label: Record<TripStatus, string> = {
    completed:  'Finalizat',
    in_transit: 'În tranzit',
    cancelled:  'Anulat',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[status]}`}>
      {label[status]}
    </span>
  )
}

function StarRating({ value }: { value: number | null }) {
  if (value === null) return <span className="text-xs text-slate-300 dark:text-slate-600">—</span>
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} viewBox="0 0 20 20" fill={s <= value ? '#f59e0b' : 'none'} stroke={s <= value ? '#f59e0b' : '#cbd5e1'} className="w-3 h-3">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

function TripRow({ trip }: { trip: TripRecord }) {
  return (
    <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-3 items-center px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-b-0">
      {/* from → to + orderId */}
      <div>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
          <span>{trip.from}</span>
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 text-slate-400 flex-shrink-0">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{trip.to}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-slate-400">{trip.orderId}</span>
          <span className="text-xs text-slate-300 dark:text-slate-600">·</span>
          <span className="text-xs text-slate-400">{trip.duration}</span>
        </div>
      </div>

      {/* date */}
      <div className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
        {new Date(trip.date).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short' })}
      </div>

      {/* distance */}
      <div className="hidden sm:block text-sm font-semibold text-slate-700 dark:text-slate-300">
        {trip.distance} km
      </div>

      {/* earnings */}
      <div className="hidden sm:block text-sm font-bold text-emerald-600 dark:text-emerald-400">
        {trip.earnings > 0 ? `${trip.earnings.toLocaleString()} MDL` : '—'}
      </div>

      {/* status + rating */}
      <div className="flex flex-col items-end gap-1">
        <StatusBadge status={trip.status} />
        <StarRating value={trip.rating} />
      </div>
    </div>
  )
}

export default function DriverHistoryPage() {
  const { trips, stats, loading } = useDriver()
  const [filters, setFilters]     = useState<TripFilters>(DEFAULT_FILTERS)
  const [serviceError, setServiceError] = useState(false)

  const setFilter = useCallback(<K extends keyof TripFilters>(key: K, val: TripFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: val, ...(key !== 'page' ? { page: 1 } : {}) }))
  }, [])

  const result = useMemo(() => {
    if (serviceError) return null
    try {
      return queryTrips(trips, filters)
    } catch {
      return null
    }
  }, [trips, filters, serviceError])

  const summary = useMemo(() => tripSummaryStats(trips), [trips])

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-10 flex justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
          <p className="text-sm text-slate-400">Se încarcă istoricul...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-5 pb-14">

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">Istoric curse</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{stats.totalTrips} curse totale</p>
        </div>
        {/* Simulate 500 error */}
        <button
          onClick={() => setServiceError(v => !v)}
          className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
            serviceError
              ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
              : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
          }`}
          title="Simulează eroare serviciu (500)"
        >
          {serviceError ? '⚠ Resetează eroarea' : 'Simulează eroare 500'}
        </button>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
        {[
          { val: `${summary.totalEarnings.toLocaleString()} MDL`, label: 'Câștiguri totale',  color: 'text-emerald-600 dark:text-emerald-400' },
          { val: `${summary.totalKm.toLocaleString()} km`,        label: 'Km parcurși',       color: 'text-blue-600 dark:text-blue-400' },
          { val: summary.completedCount,                           label: 'Curse finalizate',  color: 'text-slate-900 dark:text-slate-100' },
          { val: `${stats.onTimeRate}%`,                           label: 'Livrări la timp',   color: 'text-amber-600 dark:text-amber-400' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
            <div className={`font-display font-bold text-xl ${s.color}`}>{s.val}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 mb-4 flex flex-col sm:flex-row gap-2.5">
        {/* Search */}
        <div className="relative flex-1">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Caută după ID comandă, oraș..."
            value={filters.search}
            onChange={e => setFilter('search', e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status filter */}
        <FilterSelect
          value={filters.status}
          onChange={v => setFilter('status', v)}
          options={[
            { label: 'Toate statusurile', value: 'all'        },
            { label: 'Finalizate',        value: 'completed'  },
            { label: 'Anulate',           value: 'cancelled'  },
            { label: 'În tranzit',        value: 'in_transit' },
          ]}
        />

        {/* Sort by */}
        <FilterSelect
          value={filters.sortBy}
          onChange={v => setFilter('sortBy', v)}
          options={[
            { label: 'Sortare: Dată',      value: 'date'     },
            { label: 'Sortare: Distanță',  value: 'distance' },
            { label: 'Sortare: Câștiguri', value: 'earnings' },
          ]}
        />

        {/* Sort direction */}
        <button
          onClick={() => setFilter('sortDir', filters.sortDir === 'desc' ? 'asc' : 'desc')}
          title={filters.sortDir === 'desc' ? 'Descrescător' : 'Crescător'}
          className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {filters.sortDir === 'desc' ? '↓ Desc' : '↑ Asc'}
        </button>
      </div>

      {/* ── Error state ── */}
      {serviceError && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 mb-3">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-red-600 dark:text-red-400">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-sm font-bold text-red-700 dark:text-red-400 mb-1">500 — Eroare internă de serviciu</p>
          <p className="text-xs text-red-500 dark:text-red-500/70 mb-4">Serviciul de date a returnat un răspuns invalid. Încearcă din nou.</p>
          <button
            onClick={() => setServiceError(false)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Reîncarcă
          </button>
        </div>
      )}

      {/* ── Results table ── */}
      {!serviceError && result && (
        <>
          {/* Column headers (desktop only) */}
          <div className="hidden sm:grid grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-3 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <div>Cursă</div>
            <div>Data</div>
            <div>Distanță</div>
            <div>Câștiguri</div>
            <div>Status</div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            {result.items.length === 0 ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-slate-400">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Nicio cursă găsită</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs">Încearcă să ajustezi filtrele sau termenul de căutare.</p>
                <button
                  onClick={() => setFilters(DEFAULT_FILTERS)}
                  className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Resetează filtrele
                </button>
              </div>
            ) : (
              result.items.map(trip => <TripRow key={trip.id} trip={trip} />)
            )}
          </div>

          {/* ── Pagination ── */}
          {result.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {result.total} curse · pagina {filters.page} din {result.totalPages}
              </p>
              <div className="flex items-center gap-1">
                <button
                  disabled={filters.page <= 1}
                  onClick={() => setFilter('page', filters.page - 1)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  ← Anterior
                </button>
                {Array.from({ length: result.totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setFilter('page', p)}
                    className={`w-8 h-8 text-xs font-semibold rounded-xl transition-colors ${
                      p === filters.page
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={filters.page >= result.totalPages}
                  onClick={() => setFilter('page', filters.page + 1)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Următor →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
