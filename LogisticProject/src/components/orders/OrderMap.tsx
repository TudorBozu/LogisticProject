import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { LatLng } from '../../mock/truckRoutes'

// ─── Real lat/lng for Moldovan cities ────────────────────────────────────────

const CITY_LATLNG: Record<string, LatLng> = {
  'Chișinău':  [47.0245, 28.8324],
  'Bălți':     [47.7617, 27.9297],
  'Cahul':     [45.9119, 28.1922],
  'Orhei':     [47.3806, 28.8264],
  'Ungheni':   [47.2110, 27.8075],
  'Soroca':    [48.1566, 28.2875],
  'Edineț':    [48.1683, 27.3042],
  'Comrat':    [46.3014, 28.6561],
  'Căușeni':   [46.6418, 29.4091],
  'Florești':  [47.8657, 28.2863],
  'Hîncești':  [46.8367, 28.5862],
  'Strășeni':  [47.1414, 28.6074],
  'Cimișlia':  [46.5231, 28.7284],
  'Leova':     [46.4831, 28.2621],
}

function getLatLng(city: string): LatLng {
  return CITY_LATLNG[city] ?? [47.0245, 28.8324]
}

function midpoint(a: LatLng, b: LatLng): LatLng {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
}

function interpolate(a: LatLng, b: LatLng, t: number): LatLng {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

// ─── Fly to position when order changes ──────────────────────────────────────

function MapFlyTo({ position }: { position: LatLng }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(position, map.getZoom(), { duration: 1.2 })
  }, [position, map])
  return null
}

// ─── Truck icon ───────────────────────────────────────────────────────────────

function makeTruckIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:38px;height:38px;
      border-radius:50%;
      background:#2563eb;
      border:2.5px solid white;
      box-shadow:0 0 0 3px #2563eb55,0 4px 14px rgba(0,0,0,0.3);
      display:flex;align-items:center;justify-content:center;
      font-size:18px;
    ">🚛</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -23],
  })
}

function makeDepotIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:28px;height:28px;
      border-radius:50%;
      background:#2563eb;
      border:2.5px solid white;
      box-shadow:0 2px 8px rgba(37,99,235,0.4);
      display:flex;align-items:center;justify-content:center;
      font-size:13px;
    ">📦</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -18],
  })
}

function makeDestIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:28px;height:28px;
      border-radius:50%;
      background:#10b981;
      border:2.5px solid white;
      box-shadow:0 2px 8px rgba(16,185,129,0.4);
      display:flex;align-items:center;justify-content:center;
      font-size:13px;
    ">📍</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -18],
  })
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  fromCity: string
  toCity: string
  driver: string
  truck: string
  status: string
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function OrderMap({ fromCity, toCity, driver, truck, status }: Props) {
  const fromPos = getLatLng(fromCity)
  const toPos   = getLatLng(toCity)
  const mid     = midpoint(fromPos, toPos)
  const waypoints: LatLng[] = [fromPos, mid, toPos]

  const [progress, setProgress] = useState(status === 'transit' ? 0.3 : status === 'delivered' ? 1 : 0.05)
  const raf = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (status !== 'transit') return
    raf.current = setInterval(() => {
      setProgress(p => {
        const next = p + 0.0008
        return next >= 1 ? 0.05 : next
      })
    }, 80)
    return () => { if (raf.current) clearInterval(raf.current) }
  }, [status])

  const truckPos: LatLng = progress <= 0.5
    ? interpolate(fromPos, mid, progress * 2)
    : interpolate(mid, toPos, (progress - 0.5) * 2)

  const mapCenter: LatLng = [
    (fromPos[0] + toPos[0]) / 2,
    (fromPos[1] + toPos[1]) / 2,
  ]

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-full" style={{ minHeight: 300 }}>
      <MapContainer
        center={mapCenter}
        zoom={7}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapFlyTo position={mapCenter} />

        {/* Route line */}
        <Polyline
          positions={waypoints}
          pathOptions={{ color: '#bfdbfe', weight: 4, dashArray: '10 6', lineCap: 'round' }}
        />
        <Polyline
          positions={[fromPos, truckPos]}
          pathOptions={{ color: '#2563eb', weight: 4, lineCap: 'round' }}
        />

        {/* Depot marker */}
        <Marker position={fromPos} icon={makeDepotIcon()}>
          <Popup closeButton={false}>
            <div style={{ fontFamily: 'inherit', fontSize: 12 }}>
              <strong>📦 Depozit</strong><br />{fromCity}
            </div>
          </Popup>
        </Marker>

        {/* Destination marker */}
        <Marker position={toPos} icon={makeDestIcon()}>
          <Popup closeButton={false}>
            <div style={{ fontFamily: 'inherit', fontSize: 12 }}>
              <strong>📍 Destinație</strong><br />{toCity}
            </div>
          </Popup>
        </Marker>

        {/* Truck marker */}
        {status !== 'processing' && (
          <Marker position={truckPos} icon={makeTruckIcon()}>
            <Popup closeButton={false}>
              <div style={{ fontFamily: 'inherit', fontSize: 12, minWidth: 150 }}>
                <strong>🚛 {driver}</strong><br />
                <span style={{ color: '#64748b' }}>{truck}</span><br />
                <span style={{ color: '#64748b' }}>{fromCity} → {toCity}</span>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}
