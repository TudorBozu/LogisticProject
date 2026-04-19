import { useState } from 'react'
import type { OrderStatus, DriverAssignment } from '../../types/driver'
import { STATUS_STEPS } from '../../mock/driverData'

type Props = {
  assignment: DriverAssignment
  onStatusChange?: (next: OrderStatus) => void
}

const STATUS_ORDER: OrderStatus[] = ['processing', 'confirmed', 'pickup', 'in_transit', 'delivered']
const NEXT_ACTION: Partial<Record<OrderStatus, { label: string; next: OrderStatus }>> = {
  pickup:     { label: 'Confirmă ridicarea mărfii', next: 'in_transit' },
  in_transit: { label: 'Confirmă livrarea',         next: 'delivered'  },
}

export default function DriverStatusCard({ assignment, onStatusChange }: Props) {
  const [status, setStatus]       = useState<OrderStatus>(assignment.status)
  const [confirmed, setConfirmed] = useState(false)
  const activeIdx = STATUS_ORDER.indexOf(status)
  const action    = NEXT_ACTION[status]

  const handleConfirm = () => {
    if (!action) return
    setStatus(action.next)
    setConfirmed(action.next === 'delivered')
    onStatusChange?.(action.next)
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Stare cursă</h3>

      <div className="flex flex-col gap-0 mb-4">
        {STATUS_STEPS.map((step, i) => {
          const isDone    = i < activeIdx
          const isActive  = i === activeIdx
          const isPending = i > activeIdx
          return (
            <div key={step.key}>
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={[
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    isDone    ? 'bg-blue-600 border-blue-600 text-white'  : '',
                    isActive  ? 'border-blue-600 bg-white dark:bg-slate-900' : '',
                    isPending ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900' : '',
                  ].join(' ')}>
                    {isDone && (
                      <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {isActive && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse block" />}
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div className="w-px mt-1 mb-1"
                      style={{ height: 20, background: isDone ? '#bfdbfe' : '#e2e8f0' }} />
                  )}
                </div>
                <div className="pb-1 pt-0.5">
                  <div className={[
                    'text-xs font-bold',
                    isDone    ? 'text-slate-600 dark:text-slate-400' : '',
                    isActive  ? 'text-blue-600 dark:text-blue-400'   : '',
                    isPending ? 'text-slate-300 dark:text-slate-600'  : '',
                  ].join(' ')}>
                    {step.label}
                  </div>
                  <div className={`text-xs ${isActive ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300 dark:text-slate-600'}`}>
                    {isActive && step.key === 'in_transit'
                      ? `ETA ${assignment.eta} · ${assignment.distanceRemaining} km`
                      : step.desc}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {confirmed ? (
        <div className="flex items-center justify-center gap-2 h-10 rounded-xl bg-emerald-500 text-white text-sm font-semibold">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Livrare confirmată!
        </div>
      ) : action ? (
        <button onClick={handleConfirm}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-blue-600/20">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {action.label}
        </button>
      ) : null}

      <button className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.7"/>
          <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
          <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Raportează incident
      </button>
    </div>
  )
}
