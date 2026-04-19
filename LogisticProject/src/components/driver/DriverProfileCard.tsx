import type { DriverProfile } from '../../types/driver'
import Pill from '../ui/Pill'

type Props = { driver: DriverProfile }

export default function DriverProfileCard({ driver }: Props) {
  const dailyPct = Math.round((driver.dailyActiveMinutes / 600) * 100)
  const h = Math.floor(driver.dailyActiveMinutes / 60)
  const m = driver.dailyActiveMinutes % 60

  return (
    <div className="bg-white rounded-[28px] shadow-soft border border-slate-100 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[12px] text-slate-400">Driver</div>
          <Pill label="En route" dotClassName="bg-emerald-400 animate-pulse" />
        </div>

        {/* avatar + name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 grid place-items-center text-white text-[20px] font-extrabold shadow-sm flex-shrink-0">
            {driver.initials}
          </div>
          <div>
            <div className="text-[20px] font-extrabold tracking-[-0.5px] text-slate-900">
              {driver.name}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {driver.vehicle.code} · {driver.vehicle.name}
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { val: driver.assignment?.distance ?? 0, unit: 'km trip',   color: 'text-slate-900' },
            { val: driver.tripsThisMonth,             unit: 'trips/mo',  color: 'text-emerald-600' },
            { val: driver.rating,                     unit: 'rating',    color: 'text-blue-500' },
          ].map(s => (
            <div key={s.unit} className="rounded-[16px] bg-slate-50 border border-slate-100 p-2.5 text-center">
              <div className={`text-[16px] font-extrabold ${s.color}`}>{s.val}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">{s.unit}</div>
            </div>
          ))}
        </div>

        {/* daily active time */}
        <div className="mb-4">
          <div className="flex justify-between text-[11px] mb-1.5">
            <span className="font-semibold text-slate-500">Daily active time</span>
            <span className="text-slate-400">{h}h {m}min / 10h</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${dailyPct}%` }} />
          </div>
        </div>

        {/* action buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 h-11 rounded-[16px] bg-blue-500 text-white text-[13px] font-bold hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M22 16.9v3a2 2 0 01-2.18 2 19.9 19.9 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.9 19.9 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.72c.12.86.3 1.7.57 2.5a2 2 0 01-.45 2.11L8.1 9.4a16 16 0 006 6l1.07-1.12a2 2 0 012.11-.45c.8.27 1.64.45 2.5.57A2 2 0 0122 16.9z"
                stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Call dispatcher
          </button>
          <button
            type="button"
            className="w-11 h-11 rounded-[16px] bg-slate-50 border border-slate-100 grid place-items-center text-slate-500 hover:bg-slate-100 transition"
            title="Message"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
                stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
