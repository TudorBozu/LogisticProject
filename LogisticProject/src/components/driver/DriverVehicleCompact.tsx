import type { DriverVehicle } from '../../types/driver'

type Props = { vehicle: DriverVehicle }

export default function DriverVehicleCompact({ vehicle }: Props) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
        Vehicul · {vehicle.code}
      </h3>

      {/* Fuel + temp */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
          <div className="text-xs text-slate-400 mb-1">Fuel</div>
          <div className="font-display font-bold text-xl text-slate-900 dark:text-slate-100 mb-2">{vehicle.fuelPct}%</div>
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: `${vehicle.fuelPct}%` }}
            />
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
          <div className="text-xs text-slate-400 mb-1">Temp.</div>
          <div className="font-display font-bold text-xl text-slate-900 dark:text-slate-100 mb-2">{vehicle.temperatureC}°C</div>
          <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: '40%' }} />
          </div>
        </div>
      </div>

      {/* Burden */}
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="text-slate-400">Burden</span>
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {vehicle.burden.used.toLocaleString()} / {vehicle.burden.total.toLocaleString()} kg
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mb-3">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${vehicle.usedCapacityPct}%` }}
        />
      </div>

      {/* Mechanical */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">Stare mecanică</span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {Math.round(Object.values(vehicle.mechanics).reduce((s, v) => s + v, 0) / 5)}% Optimal
        </span>
      </div>
    </div>
  )
}
