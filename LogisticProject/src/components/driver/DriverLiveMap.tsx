import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { ROUTE_WAYPOINTS, CURRENT_PROGRESS_IDX } from '../../mock/driverData'
import type { DriverAssignment } from '../../types/driver'

type Props = { assignment: DriverAssignment }

function makeIcon(emoji: string, color: string, size = 30) {
  return L.divIcon({
    className: '',
    html: `<div style="width:${size}px;height:${size}px;background:${color};border-radius:50%;border:3px solid white;box-shadow:0 2px 10px ${color}66,0 4px 16px rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center;font-size:${Math.round(size*.43)}px">${emoji}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  })
}

const truckIcon  = makeIcon('🚛', '#2563eb', 38)
const depotIcon  = makeIcon('🏭', '#2563eb', 30)
const destIcon   = makeIcon('📦', '#10b981', 30)

export default function DriverLiveMap({ assignment }: Props) {
  const [truckPos, setTruckPos] = useState<[number, number]>(
    ROUTE_WAYPOINTS[CURRENT_PROGRESS_IDX] ?? ROUTE_WAYPOINTS[0]
  )
  const progRef = useRef(0)
  const remaining = ROUTE_WAYPOINTS.slice(CURRENT_PROGRESS_IDX)

  useEffect(() => {
    const interval = setInterval(() => {
      progRef.current = (progRef.current + 0.003) % 1
      const p = progRef.current * (remaining.length - 1)
      const seg = Math.min(Math.floor(p), remaining.length - 2)
      const t = p - seg
      const [lat0, lng0] = remaining[seg]
      const [lat1, lng1] = remaining[seg + 1]
      setTruckPos([lat0 + (lat1 - lat0) * t, lng0 + (lng1 - lng0) * t])
    }, 120)
    return () => clearInterval(interval)
  }, [remaining])

  return (
    <MapContainer
      center={truckPos}
      zoom={9}
      zoomControl
      attributionControl
      style={{ height: '100%', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={18} />

      {/* Traveled — solid blue */}
      <Polyline
        positions={ROUTE_WAYPOINTS.slice(0, CURRENT_PROGRESS_IDX + 1)}
        pathOptions={{ color: '#2563eb', weight: 4, lineCap: 'round', lineJoin: 'round' }}
      />
      {/* Remaining — dashed grey */}
      <Polyline
        positions={ROUTE_WAYPOINTS.slice(CURRENT_PROGRESS_IDX)}
        pathOptions={{ color: '#94a3b8', weight: 3, dashArray: '6 6', opacity: 0.6 }}
      />

      <Marker position={[assignment.depot.lat, assignment.depot.lng]} icon={depotIcon}>
        <Popup><strong>{assignment.depot.name}</strong><br/>{assignment.depot.address}</Popup>
      </Marker>

      <Marker position={truckPos} icon={truckIcon}>
        <Popup><strong>Poziție curentă</strong><br/>{assignment.currentLocation}</Popup>
      </Marker>

      <Marker position={[assignment.destination.lat, assignment.destination.lng]} icon={destIcon}>
        <Popup><strong>{assignment.destination.name}</strong><br/>{assignment.destination.address}</Popup>
      </Marker>
    </MapContainer>
  )
}
