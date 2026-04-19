import type { DriverAssignment } from '../../types/driver'

type Props = { assignment: DriverAssignment }

export default function DriverCargoCard({ assignment }: Props) {
  const totalKg    = assignment.items.reduce((s, i) => s + i.kg, 0)
  const totalUnits = assignment.items.reduce((s, i) => s + i.units, 0)
  const capPct     = Math.min(100, Math.round((totalKg / 10000) * 100))

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      {/* table header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
        <div>Produs</div><div>Tip</div><div>Unități</div><div className="text-right">Total kg</div>
      </div>

      {/* items */}
      {assignment.items.map((item, i) => (
        <div
          key={item.id}
          className={`grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 items-center px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors ${i < assignment.items.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}
        >
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.name}</div>
            <div className="text-xs text-slate-400 mt-0.5">{item.netWeight} kg / buc</div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{item.productType}</div>
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.units} buc</div>
          <div className="text-right text-sm font-bold text-slate-800 dark:text-slate-200">{item.kg.toLocaleString()} kg</div>
        </div>
      ))}

      {/* totals */}
      <div className="grid grid-cols-3 gap-3 px-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
        <div className="text-center">
          <div className="font-display font-bold text-blue-600 dark:text-blue-400">{totalKg.toLocaleString()}</div>
          <div className="text-xs text-slate-400 mt-0.5">Total kg</div>
        </div>
        <div className="text-center">
          <div className="font-display font-bold text-slate-800 dark:text-slate-200">{totalUnits}</div>
          <div className="text-xs text-slate-400 mt-0.5">Total buc</div>
        </div>
        <div className="text-center">
          <div className="font-display font-bold text-emerald-600 dark:text-emerald-400">{capPct}%</div>
          <div className="text-xs text-slate-400 mt-0.5">Capacitate</div>
        </div>
      </div>
    </div>
  )
}
