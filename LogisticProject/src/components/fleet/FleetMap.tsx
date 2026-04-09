import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState, Fragment } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Truck } from '../../types/fleet'
import { truckRoutes } from '../../mock/truckRoutes'
import type { LatLng } from '../../mock/truckRoutes'

// ─── helpers ─────────────────────────────────────────────────────────────────

function interpolateRoute(waypoints: LatLng[], progress: number): LatLng {
  const maxP = waypoints.length - 1
  const p = ((progress % maxP) + maxP) % maxP
  const segIdx = Math.min(Math.floor(p), maxP - 1)
  const t = p - segIdx
  const from = waypoints[segIdx]
  const to = waypoints[segIdx + 1]
  return [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t]
}

function makeTruckIcon(color: string, selected: boolean) {
  const size = selected ? 46 : 36
  const border = selected ? '3px solid white' : '2px solid rgba(255,255,255,0.8)'
  const shadow = selected
    ? `0 0 0 3px ${color}55, 0 4px 16px rgba(0,0,0,0.35)`
    : '0 2px 10px rgba(0,0,0,0.28)'
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      border-radius:50%;
      background:${color};
      border:${border};
      box-shadow:${shadow};
      display:flex;align-items:center;justify-content:center;
      font-size:${selected ? 22 : 17}px;
      transition:all .2s;
      cursor:pointer;
    ">🚛</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  })
}

// ─── sub-component: re-center map when truck selection changes ────────────────

function MapFlyTo({ position }: { position: LatLng }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(position, map.getZoom(), { duration: 1.2 })
  }, [position, map])
  return null
}

// ─── main component ───────────────────────────────────────────────────────────

type Props = {
  trucks: Truck[]
  selectedId: string
  onSelect: (id: string) => void
  minHeight?: number
}

export default function FleetMap({ trucks, selectedId, onSelect, minHeight = 540 }: Props) {
  // Initialize progress for each truck at its initialProgress offset
  const [progress, setProgress] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {}
    truckRoutes.forEach(r => {
      init[r.truckId] = r.initialProgress * (r.waypoints.length - 1)
    })
    return init
  })

  // Animation loop
  const raf = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    raf.current = setInterval(() => {
      setProgress(prev => {
        const next = { ...prev }
        truckRoutes.forEach(r => {
          const maxP = r.waypoints.length - 1
          next[r.truckId] = ((prev[r.truckId] ?? 0) + 0.004 * r.speedFactor) % maxP
        })
        return next
      })
    }, 80)
    return () => { if (raf.current) clearInterval(raf.current) }
  }, [])

  const selectedRoute = truckRoutes.find(r => r.truckId === selectedId)
  const selectedPos = selectedRoute
    ? interpolateRoute(selectedRoute.waypoints, progress[selectedId] ?? 0)
    : null

  return (
    <div className="relative rounded-[28px] overflow-hidden shadow-soft border border-white/40 h-full" style={{ minHeight }}>
      <MapContainer
        center={[47.0, 28.0]}
        zoom={7}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        {/* Tile layer – OpenStreetMap (gratis, fără API key) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Fly to selected truck */}
        {selectedPos && <MapFlyTo position={selectedPos} />}

        {trucks.map(truck => {
          const route = truckRoutes.find(r => r.truckId === truck.id)
          if (!route) return null
          const isSelected = truck.id === selectedId
          const pos = interpolateRoute(route.waypoints, progress[truck.id] ?? 0)

          return (
            <Fragment key={truck.id}>
              {/* Dashed background route line */}
              <Polyline
                positions={route.waypoints}
                pathOptions={{
                  color: route.color,
                  weight: isSelected ? 5 : 3,
                  opacity: isSelected ? 0.85 : 0.35,
                  dashArray: isSelected ? undefined : '10 6',
                  lineCap: 'round',
                  lineJoin: 'round',
                }}
              />

              {/* Animated truck marker */}
              <Marker
                key={`${truck.id}-${isSelected}`}
                position={pos}
                icon={makeTruckIcon(route.color, isSelected)}
                eventHandlers={{ click: () => onSelect(truck.id) }}
                zIndexOffset={isSelected ? 1000 : 0}
              >
                <Popup closeButton={false}>
                  <div style={{ minWidth: 170, fontFamily: 'inherit' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: route.color, flexShrink: 0
                      }} />
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{truck.code} — {truck.name}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>
                      📍 {route.from} → {route.to}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                      <div style={{ fontSize: 11 }}>👤 {truck.driver.name}</div>
                      <div style={{ fontSize: 11 }}>⛽ {truck.fuelPct}%</div>
                      <div style={{ fontSize: 11 }}>📦 {truck.usedCapacityPct}%</div>
                      <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>● {truck.status}</div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </Fragment>
          )
        })}
      </MapContainer>

    </div>
  )
}
