import type { DriverAssignment } from '../../types/driver'

type Props = { assignment: DriverAssignment }

export default function DriverAssignmentCard({ assignment }: Props) {
  return (
    <div className="bg-white rounded-[28px] shadow-soft border border-slate-100 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[15px] font-extrabold text-slate-900">Current Assignment</div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-bold text-blue-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            In transit
          </span>
        </div>

        {/* order ID */}
        <div className="text-[24px] font-extrabold tracking-[-0.5px] text-slate-900 mb-3">
          {assignment.orderId}
        </div>

        {/* route */}
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-start gap-2.5">
            <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">Depozit ridicare</div>
              <div className="text-[12px] font-semibold text-slate-800">{assignment.depot.name}</div>
              <div className="text-[10px] text-slate-400">{assignment.depot.address}</div>
            </div>
          </div>
          <div className="ml-[5px] w-px h-4 bg-slate-200" />
          <div className="flex items-start gap-2.5">
            <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <div>
              <div className="text-[10px] text-slate-400">Destinație</div>
              <div className="text-[12px] font-semibold text-slate-800">{assignment.destination.name}</div>
              <div className="text-[10px] text-slate-400">{assignment.destination.address}</div>
            </div>
          </div>
        </div>

        {/* ETA / distance / remaining */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="rounded-[14px] bg-slate-50 border border-slate-100 p-2.5 text-center">
            <div className="text-[15px] font-extrabold text-slate-900">{assignment.eta}</div>
            <div className="text-[9px] text-slate-400">ETA</div>
          </div>
          <div className="rounded-[14px] bg-slate-50 border border-slate-100 p-2.5 text-center">
            <div className="text-[15px] font-extrabold text-slate-900">{assignment.distance}</div>
            <div className="text-[9px] text-slate-400">km total</div>
          </div>
          <div className="rounded-[14px] bg-amber-50 border border-amber-100 p-2.5 text-center">
            <div className="text-[15px] font-extrabold text-amber-600">{assignment.distanceRemaining}</div>
            <div className="text-[9px] text-slate-400">km left</div>
          </div>
        </div>

        {/* current location live pill */}
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-[14px] bg-blue-50 border border-blue-100">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
          <div>
            <div className="text-[9px] text-slate-400">Current position</div>
            <div className="text-[11px] font-semibold text-blue-700">{assignment.currentLocation}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
