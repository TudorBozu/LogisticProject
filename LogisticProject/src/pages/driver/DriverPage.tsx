import { useState } from 'react'
import { useDriver } from '../../context/DriverContext'
import DriverLiveMap         from '../../components/driver/DriverLiveMap'
import DriverStatusCard      from '../../components/driver/DriverStatusCard'
import DriverTripSummaryCard from '../../components/driver/DriverTripSummaryCard'
import DriverCargoCard       from '../../components/driver/DriverCargoCard'
import DriverDestinationCard from '../../components/driver/DriverDestinationCard'
import DriverVehicleCompact  from '../../components/driver/DriverVehicleCompact'
import type { OrderStatus }  from '../../types/driver'

function fmtMDL(n: number) { return n.toLocaleString('ro-RO') + ' MDL' }

export default function DriverPage() {
  const { profile, assignment } = useDriver()
  const [status, setStatus] = useState<OrderStatus>(assignment?.status ?? 'in_transit')

  /* ── Empty state ── */
  if (!assignment) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2} className="text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Nicio cursă activă</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">Cursele noi vor apărea automat când ți se atribuie o comandă.</p>
      </div>
    )
  }

  const { vehicle } = profile
  const totalCost   = assignment.cost + assignment.fuelCost + assignment.tollCost
  const progressPct = Math.round(((assignment.distance - assignment.distanceRemaining) / assignment.distance) * 100)
  const greeting    = new Date().getHours() < 12 ? 'Bună dimineața' : new Date().getHours() < 18 ? 'Bună ziua' : 'Bună seara'

  const gmapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${assignment.depot.lat},${assignment.depot.lng}&destination=${assignment.destination.lat},${assignment.destination.lng}&travelmode=driving`

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-5 pb-14">

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
            {greeting}, {profile.name.split(' ')[0]}
          </p>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
            {status === 'delivered' ? 'Cursă finalizată' : '1 cursă activă acum'}
          </h1>
        </div>
        <button
          onClick={() => alert('Se apelează dispatcher-ul...')}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-blue-600/20 flex-shrink-0"
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.9v3a2 2 0 01-2.18 2 19.9 19.9 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.9 19.9 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.72c.12.86.3 1.7.57 2.5a2 2 0 01-.45 2.11L8.1 9.4a16 16 0 006 6l1.07-1.12a2 2 0 012.11-.45c.8.27 1.64.45 2.5.57A2 2 0 0122 16.9z"/>
          </svg>
          Sună dispatcher
        </button>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-5">
        {[
          {
            val:   status === 'delivered' ? 'Livrat' : 'En route',
            label: 'Status cursă',
            color: status === 'delivered' ? 'text-slate-500' : 'text-emerald-600 dark:text-emerald-400',
          },
          { val: assignment.eta,                       label: 'ETA destinație',  color: 'text-slate-900 dark:text-slate-100' },
          { val: `${assignment.distanceRemaining} km`, label: 'Distanță rămasă', color: 'text-amber-600 dark:text-amber-400' },
          { val: fmtMDL(totalCost),                    label: 'Total cursă',     color: 'text-blue-600 dark:text-blue-400'  },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3">
            <div className={`font-display font-bold text-xl ${s.color} truncate`}>{s.val}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── HERO MAP — full width, overlay info ── */}
      <div className="relative rounded-2xl overflow-hidden mb-5 border border-slate-200 dark:border-slate-800 shadow-sm"
           style={{ height: 460 }}>

        {/* Leaflet map fills the entire container */}
        <DriverLiveMap assignment={assignment} />

        {/* Top-left: order badge */}
        <div className="absolute top-3 left-3 z-[1000] flex items-center gap-2 pointer-events-none">
          {status !== 'delivered' ? (
            <span className="flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          ) : (
            <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-600 dark:text-slate-400 text-xs font-bold px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              Livrat
            </span>
          )}
          <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-700 dark:text-slate-300 text-xs font-bold px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
            {assignment.orderId}
          </span>
        </div>

        {/* Top-right: Google Maps button */}
        <a
          href={gmapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 z-[1000] flex items-center gap-1.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-blue-500">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
          </svg>
          Google Maps
        </a>

        {/* Bottom overlay: route info */}
        <div className="absolute bottom-0 left-0 right-0 z-[1000] pointer-events-none">
          {/* fade gradient */}
          <div className="h-20 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200/60 dark:border-slate-700/60 pointer-events-auto">
            <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">

              {/* Route: depozit → destinație cu progress bar */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[120px]">
                      {assignment.depot.name.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700 mx-1" />
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[120px]">
                      {assignment.destination.name.split(' ').slice(0, 2).join(' ')}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  </div>
                </div>
                <div className="relative h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>{progressPct}% parcurs</span>
                  <span>{assignment.distanceRemaining} km rămași din {assignment.distance} km</span>
                </div>
              </div>

              {/* Separator */}
              <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-slate-700 flex-shrink-0" />

              {/* Poziție curentă */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse block" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Poziție curentă</div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{assignment.currentLocation}</div>
                </div>
              </div>

              {/* Separator */}
              <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-slate-700 flex-shrink-0" />

              {/* ETA */}
              <div className="flex-shrink-0 text-center">
                <div className="text-[10px] text-slate-400">ETA</div>
                <div className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">{assignment.eta}</div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Compact order info + Main grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">

        {/* Left */}
        <div className="flex flex-col gap-5">

          {/* Order summary card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  {assignment.items.map(i => i.name).join(', ')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {assignment.items[0].productType} · {assignment.items.reduce((s, i) => s + i.units, 0)} unități · {assignment.items.reduce((s, i) => s + i.kg, 0).toLocaleString()} kg
                </p>
              </div>
              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium px-2.5 py-1.5 rounded-lg flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                {assignment.currentLocation}
              </span>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                {profile.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">{profile.name}</div>
                <div className="text-xs text-slate-400">{vehicle.code} · {vehicle.name}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-display text-sm font-bold text-blue-600 dark:text-blue-400">{fmtMDL(totalCost)}</div>
                <div className="text-xs text-slate-400">total cursă</div>
              </div>
            </div>
          </div>

          {/* Cargo manifest */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="font-display text-sm font-bold text-slate-900 dark:text-slate-100">Manifest marfă</h2>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{assignment.orderId}</span>
            </div>
            <DriverCargoCard assignment={assignment} />
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="flex flex-col gap-4">
          <DriverStatusCard assignment={{ ...assignment, status }} onStatusChange={setStatus} />
          <DriverDestinationCard assignment={assignment} />
          <DriverVehicleCompact vehicle={vehicle} />
          <DriverTripSummaryCard assignment={assignment} dailyActiveMinutes={profile.dailyActiveMinutes} />
        </aside>
      </div>
    </div>
  )
}
