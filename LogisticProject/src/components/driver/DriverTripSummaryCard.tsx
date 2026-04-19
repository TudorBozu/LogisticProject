import type { DriverAssignment } from '../../types/driver'

type Props = { assignment: DriverAssignment; dailyActiveMinutes: number }

function fmtMDL(n: number) { return n.toLocaleString('ro-RO') + ' MDL' }

export default function DriverTripSummaryCard({ assignment, dailyActiveMinutes }: Props) {
  const dailyPct  = Math.round((dailyActiveMinutes / 600) * 100)
  const h = Math.floor(dailyActiveMinutes / 60)
  const m = dailyActiveMinutes % 60
  const totalCost = assignment.cost + assignment.fuelCost + assignment.tollCost

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Rezumat cursă</h3>

      <div className="flex flex-col gap-2 mb-3">
        {[
          ['Cost transport',    fmtMDL(assignment.cost)],
          ['Carburant estimat', fmtMDL(assignment.fuelCost)],
          ['Taxe vamale/drum',  fmtMDL(assignment.tollCost)],
        ].map(([l, v]) => (
          <div key={l} className="flex justify-between text-xs">
            <span className="text-slate-400">{l}</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{v}</span>
          </div>
        ))}
        <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Total</span>
          <span className="font-display font-bold text-lg text-blue-600 dark:text-blue-400">{fmtMDL(totalCost)}</span>
        </div>
      </div>

      {/* Daily active time */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-400">Daily active time</span>
          <span className="text-slate-400">{h}h {m}min / 10h</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden mb-1.5">
          <div className="h-full rounded-full bg-blue-500" style={{ width: `${dailyPct}%` }} />
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Normal day
          </span>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{dailyPct}%</span>
        </div>
      </div>
    </div>
  )
}
