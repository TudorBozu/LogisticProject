import { useDriver } from '../../context/DriverContext'
import DriverVehicleCard from '../../components/driver/DriverVehicleCard'
import { maintenanceHistory, nextService } from '../../data/driverData'

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function DriverVehiclePage() {
  const { profile } = useDriver()
  const { vehicle } = profile
  const kmLeft = nextService.atKm - nextService.currentKm

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-5 pb-14">

      {/* ── Header ── */}
      <div className="mb-5">
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">Vehiculul meu</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{vehicle.name} · {vehicle.code}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5">

        {/* Left — main vehicle card */}
        <DriverVehicleCard vehicle={vehicle} />

        {/* Right — next service + maintenance history */}
        <div className="flex flex-col gap-4">

          {/* Next service reminder */}
          <div className={`rounded-xl border p-4 ${
            kmLeft < 3000
              ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
              : 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                kmLeft < 3000 ? 'bg-red-100 dark:bg-red-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
              }`}>
                <svg viewBox="0 0 24 24" fill="none" className={`w-4 h-4 ${kmLeft < 3000 ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  <path d="M10.29 3.86 1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                  <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className={`text-xs font-bold uppercase tracking-wider ${
                  kmLeft < 3000 ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {kmLeft < 3000 ? 'Revizie urgentă' : 'Revizie programată'}
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{nextService.type}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/60 dark:bg-slate-900/40 rounded-lg p-2">
                <div className="font-display font-bold text-slate-900 dark:text-slate-100">{nextService.currentKm.toLocaleString()}</div>
                <div className="text-xs text-slate-400">km actuali</div>
              </div>
              <div className="bg-white/60 dark:bg-slate-900/40 rounded-lg p-2">
                <div className={`font-display font-bold ${kmLeft < 3000 ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {kmLeft.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">km rămași</div>
              </div>
              <div className="bg-white/60 dark:bg-slate-900/40 rounded-lg p-2">
                <div className="font-display font-bold text-slate-900 dark:text-slate-100">{fmtDate(nextService.byDate)}</div>
                <div className="text-xs text-slate-400">data limită</div>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/60 dark:bg-slate-900/40 overflow-hidden">
              <div
                className={`h-full rounded-full ${kmLeft < 3000 ? 'bg-red-500' : 'bg-amber-500'}`}
                style={{ width: `${Math.min(100, Math.round(((nextService.atKm - nextService.currentKm) / 10000) * 100))}%` }}
              />
            </div>
          </div>

          {/* Maintenance history */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Istoric mentenanță</h3>
            </div>
            {maintenanceHistory.map((rec, i) => (
              <div
                key={rec.id}
                className={`flex items-start gap-3 px-4 py-3 ${
                  i < maintenanceHistory.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''
                } hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">{rec.type}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{rec.shop}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{rec.mileageKm.toLocaleString()} km</div>
                  <div className="text-xs text-slate-400">{fmtDate(rec.date)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
