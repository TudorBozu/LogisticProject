import type { DriverVehicle } from '../../types/driver'
import Progress from '../ui/Progress'
import Pill from '../ui/Pill'

type Props = { vehicle: DriverVehicle }

const MECH_KEYS: (keyof DriverVehicle['mechanics'])[] = ['engine', 'brakes', 'tires', 'oil', 'suspension']
const MECH_LABELS: Record<keyof DriverVehicle['mechanics'], string> = {
  engine: 'Engine', brakes: 'Brakes', tires: 'Tires', oil: 'Oil', suspension: 'Susp.',
}

export default function DriverVehicleCard({ vehicle }: Props) {
  const capClamped  = Math.max(0, Math.min(100, vehicle.usedCapacityPct))
  const fuelClamped = Math.max(0, Math.min(100, vehicle.fuelPct))
  const mechAvg     = Math.round(
    Object.values(vehicle.mechanics).reduce((s, v) => s + v, 0) / 5
  )

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[28px] shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="p-5">
        {/* header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-[16px] font-extrabold text-slate-900 dark:text-slate-100">Vehicle</div>
          <div className="text-[12px] font-semibold text-slate-500 dark:text-slate-400">{vehicle.code}</div>
        </div>

        {/* burden + volume */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-[11px] text-slate-400">Burden</div>
            <div className="mt-1 text-[12.5px] font-semibold text-slate-700 dark:text-slate-300">
              {vehicle.burden.used.toLocaleString()} / {vehicle.burden.total.toLocaleString()} kg
            </div>
          </div>
          <div className="relative pl-4">
            <div className="absolute left-0 top-1 bottom-1 w-px bg-slate-100 dark:bg-slate-800" />
            <div className="text-[11px] text-slate-400">Used volume</div>
            <div className="mt-1 text-[12.5px] font-semibold text-slate-700 dark:text-slate-300">
              {vehicle.volume.used} / {vehicle.volume.total} m³
            </div>
          </div>
        </div>

        {/* capacity bar */}
        <div className="grid grid-cols-[1fr,100px,38px] items-center gap-3 mb-4">
          <div className="text-[11px] text-slate-400">Used capacity</div>
          <Progress value={capClamped} />
          <div className="text-right text-[11px] font-semibold text-slate-500 dark:text-slate-400">{capClamped}%</div>
        </div>

        {/* fuel + temperature */}
        <div className="rounded-[22px] bg-gradient-to-b from-white to-blue-50 dark:from-slate-800 dark:to-slate-800/60 border border-slate-100 dark:border-slate-700 p-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Fuel */}
            <div className="rounded-[18px] bg-white/70 dark:bg-slate-700/50 border border-white/70 dark:border-slate-600/50 p-4">
              <div className="text-[11px] text-slate-400">Fuel</div>
              <div className="mt-1 text-[22px] font-extrabold text-slate-900 dark:text-slate-100">{fuelClamped}%</div>
              <div className="mt-3 h-[62px] rounded-[16px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 overflow-hidden relative">
                <div
                  className="absolute left-0 right-0 bottom-0"
                  style={{ height: `${fuelClamped}%`, background: 'linear-gradient(to top, #2F6DF6, #6FAEFF)' }}
                />
              </div>
            </div>

            {/* Temperature */}
            <div className="rounded-[18px] bg-white/70 dark:bg-slate-700/50 border border-white/70 dark:border-slate-600/50 p-4">
              <div className="text-[11px] text-slate-400">Temperature</div>
              <div className="mt-1 text-[22px] font-extrabold text-slate-900 dark:text-slate-100">{vehicle.temperatureC}°C</div>
              <div
                className="mt-3 h-[62px] rounded-[16px] border border-white/40 grid place-items-center"
                style={{ background: 'linear-gradient(to bottom, #00B7FF, #5393ED)' }}
              >
                <span className="text-[11px] text-white/80 font-medium">Normal</span>
              </div>
            </div>
          </div>
        </div>

        {/* mechanical condition */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[12px] font-extrabold text-slate-900 dark:text-slate-100">Mechanical condition</div>
            <div className="flex items-center gap-2">
              <div className="text-[16px] font-extrabold text-slate-900 dark:text-slate-100">{mechAvg}%</div>
              <Pill label="Optimal" dotClassName="bg-emerald-400" />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {MECH_KEYS.map(k => (
              <div key={k} className="flex flex-col items-center gap-1.5">
                <div className="w-full h-11 rounded-[14px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 overflow-hidden relative">
                  <div
                    className="absolute inset-x-0 bottom-0 bg-[#2F6DF6]/30"
                    style={{ height: `${vehicle.mechanics[k]}%` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(47,109,246,.12)] to-transparent" />
                </div>
                <div className="text-[9px] font-bold text-slate-600 dark:text-slate-400">{vehicle.mechanics[k]}%</div>
                <div className="text-[9px] text-slate-400">{MECH_LABELS[k]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
