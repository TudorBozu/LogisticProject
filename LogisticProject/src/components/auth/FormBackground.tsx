export default function FormBackground() {
  return (
      <div
          className="pointer-events-none absolute inset-0 hidden overflow-hidden 2xl:block"
          aria-hidden
      >
        {/* Dot grid */}
        <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(37,99,235,.055) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
        />

        {/* LEFT COLUMN */}
        <div className="absolute right-[calc(50%+340px)] top-1/2 -translate-y-1/2 flex flex-col gap-3 w-[280px]">

          {/* Fleet Status */}
          <SideCard style={{ animation: 'floatA 6s ease-in-out infinite' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Fleet Status</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />Live
            </span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
              <span>Active</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">56 / 64</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-1.5 rounded-full bg-brand-600" style={{ width: '87.5%' }} />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-slate-400">
              <span>In maintenance: 5</span><span>Idle: 3</span>
            </div>
          </SideCard>

          {/* Today's Deliveries */}
          <SideCard style={{ animation: 'floatA 7s ease-in-out infinite .8s' }}>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">Today's Deliveries</div>
            <div className="space-y-2">
              {[
                { id: 'TR-001', route: 'Chișinău → Iași', status: 'On route',  color: 'text-brand-600' },
                { id: 'TR-007', route: 'Bălți → Soroca',  status: 'Delivered', color: 'text-emerald-500' },
                { id: 'TR-012', route: 'Orhei → Cahul',   status: 'Delayed',   color: 'text-amber-500' },
              ].map(d => (
                  <div key={d.id} className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{d.id}</span>
                      <span className="ml-1.5 text-[11px] text-slate-400">{d.route}</span>
                    </div>
                    <span className={`text-[11px] font-medium ${d.color}`}>{d.status}</span>
                  </div>
              ))}
            </div>
          </SideCard>

          {/* Fuel */}
          <SideCard style={{ animation: 'floatA 8s ease-in-out infinite 1.4s' }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-900/20 flex-shrink-0">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#f59e0b" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500">Fuel saved today</div>
                <div className="font-display text-sm font-bold text-slate-800 dark:text-slate-200">
                  €1,240 <span className="text-emerald-500 text-[11px]">↑ 12%</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              {[['340L','Diesel','text-slate-700'],['180L','LNG','text-slate-700'],['22kWh','EV','text-brand-600']].map(([v,l,c])=>(
                  <div key={l} className="rounded-xl bg-slate-50 dark:bg-slate-800 py-1.5">
                    <div className={`text-xs font-semibold ${c} dark:text-slate-200`}>{v}</div>
                    <div className="text-[10px] text-slate-400">{l}</div>
                  </div>
              ))}
            </div>
          </SideCard>
        </div>

        {/* RIGHT COLUMN */}
        <div className="absolute left-[calc(50%+340px)] top-1/2 -translate-y-1/2 flex flex-col gap-3 w-[280px]">

          {/* Top Drivers */}
          <SideCard style={{ animation: 'floatB 6.5s ease-in-out infinite .3s' }}>
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-3">Top Drivers</div>
            <div className="space-y-2.5">
              {[
                { name: 'Luis Davidson', score: 94, bg: 'bg-amber-400',  init: 'LD' },
                { name: 'Ana Moraru',    score: 91, bg: 'bg-slate-400',  init: 'AM' },
                { name: 'Vlad Ciobanu', score: 88, bg: 'bg-orange-300', init: 'VC' },
              ].map((d, i) => (
                  <div key={d.name} className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 w-3">{i+1}</span>
                    <div className={`h-6 w-6 rounded-full ${d.bg} flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0`}>
                      {d.init}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">{d.name}</div>
                      <div className="h-1 w-full rounded-full bg-slate-100 dark:bg-slate-800 mt-0.5">
                        <div className="h-1 rounded-full bg-brand-500" style={{ width: `${d.score}%` }} />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{d.score}</span>
                  </div>
              ))}
            </div>
          </SideCard>

          {/* Maintenance */}
          <SideCard style={{ animation: 'floatB 7.5s ease-in-out infinite 1s' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">Maintenance</span>
              <span className="rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-[10px] font-semibold text-red-600 dark:text-red-400">3 alerts</span>
            </div>
            <div className="space-y-2.5">
              {[
                { truck: 'TR-004', issue: 'Tire pressure low', priority: 'High',   dot: 'bg-red-500' },
                { truck: 'TR-011', issue: 'Oil change due',    priority: 'Medium', dot: 'bg-amber-400' },
                { truck: 'TR-023', issue: 'Brake inspection',  priority: 'Low',    dot: 'bg-blue-400' },
              ].map(a => (
                  <div key={a.truck} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${a.dot}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{a.truck}</span>
                        <span className="text-[10px] text-slate-400">{a.priority}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">{a.issue}</div>
                    </div>
                  </div>
              ))}
            </div>
          </SideCard>

          {/* Cargo */}
          <SideCard style={{ animation: 'floatB 6s ease-in-out infinite 1.8s' }}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/20 flex-shrink-0">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#2563eb" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/>
                </svg>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500">Cargo in transit</div>
                <div className="font-display text-sm font-bold text-slate-800 dark:text-slate-200">128 loads</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[['94','On time','text-emerald-600'],['12','Late','text-red-500'],['211','Delivered','text-brand-600'],['34','Pending','text-amber-500']].map(([v,l,c])=>(
                  <div key={l} className="rounded-xl bg-slate-50 dark:bg-slate-800 px-3 py-2">
                    <div className={`font-display text-sm font-bold ${c}`}>{v}</div>
                    <div className="text-[10px] text-slate-400">{l}</div>
                  </div>
              ))}
            </div>
          </SideCard>
        </div>
      </div>
  )
}

function SideCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
      <div
          className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-card dark:border-slate-800 dark:bg-slate-900 transition-colors duration-250"
          style={style}
      >
        {children}
      </div>
  )
}
