import type { DriverAssignment } from '../../types/driver'

type Props = { assignment: DriverAssignment }

export default function DriverDestinationCard({ assignment }: Props) {
  const { destination } = assignment
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Destinație</h3>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="#10b981" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="10" r="3" stroke="#10b981" strokeWidth="1.7"/>
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{destination.name}</div>
          <div className="text-xs text-slate-400 mt-0.5 truncate">{destination.address}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{destination.contact}</div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <a href={`tel:${(destination.phone ?? '').replace(/\s/g,'')}`}
              className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                <path d="M22 16.9v3a2 2 0 01-2.18 2 19.9 19.9 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.9 19.9 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.72c.12.86.3 1.7.57 2.5a2 2 0 01-.45 2.11L8.1 9.4a16 16 0 006 6l1.07-1.12a2 2 0 012.11-.45c.8.27 1.64.45 2.5.57A2 2 0 0122 16.9z" stroke="currentColor" strokeWidth="1.7"/>
              </svg>
              {destination.phone}
            </a>
            <span className="text-xs text-slate-400">{destination.schedule}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
