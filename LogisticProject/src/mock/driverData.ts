import type { DriverProfile } from '../types/driver'

export const MOCK_DRIVER: DriverProfile = {
  id: 'd-001',
  name: 'Alexandru Vrabie',
  initials: 'AV',
  tripsThisMonth: 14,
  rating: 4.9,
  dailyActiveMinutes: 380,  // 6h 20min out of 600
  vehicle: {
    code: 'TR-001',
    name: 'Volvo FH16',
    fuelPct: 60,
    temperatureC: 24,
    burden:  { used: 5000, total: 10000 },
    volume:  { used: 23,   total: 45    },
    usedCapacityPct: 50,
    mechanics: { engine: 90, brakes: 90, tires: 80, oil: 89, suspension: 92 },
  },
  assignment: {
    orderId:  'RX-2026-0041',
    barcode:  '789456123041',
    status:   'in_transit',
    items: [
      { id: '1', productType: 'Alimente',  name: 'Făină albă tip 550',    netWeight: 25, units: 40, kg: 1000 },
      { id: '2', productType: 'Băuturi',   name: 'Ulei floarea soarelui', netWeight: 5,  units: 60, kg: 300  },
    ],
    depot: {
      name:    'Depozit Central Chișinău',
      address: 'Str. Calea Orheiului 108, Chișinău',
      lat: 47.065,
      lng: 28.857,
    },
    destination: {
      name:     'Metro Cash & Carry Iași',
      address:  'Șos. Păcurari 130, Iași, România',
      contact:  'Andrei Popa – Manager logistică',
      phone:    '+40 232 450 123',
      schedule: 'Luni–Vineri, 08:00–18:00',
      lat: 47.162,
      lng: 27.589,
    },
    estimatedArrival: '2026-02-18T14:45:00',
    distance:          128,
    distanceRemaining: 54,
    cost:      3240,
    fuelCost:  1850,
    tollCost:   420,
    eta:       '14:45',
    currentLocation: 'Sculeni, punct vamal MD-RO',
  },
}

// Waypoints for the Chișinău → Iași route (matches truckRoutes.ts t1)
export const ROUTE_WAYPOINTS: [number, number][] = [
  [47.0245, 28.8324], // Chișinău
  [47.1414, 28.6074], // Strășeni
  [47.2100, 28.3500], // Lăpușna direction
  [47.2110, 27.8075], // Ungheni (border crossing)
  [47.2200, 27.7200], // Near Ungheni RO
  [47.1585, 27.6014], // Iași
]

// Approximate progress index (truck is past waypoint 3, near Ungheni)
export const CURRENT_PROGRESS_IDX = 3

export const STATUS_STEPS = [
  { key: 'processing' as const, label: 'Prelucrare',     desc: 'Comanda înregistrată și verificată' },
  { key: 'confirmed'  as const, label: 'Confirmată',     desc: 'Șofer și camion atribuit' },
  { key: 'pickup'     as const, label: 'Ridicare marfă', desc: 'Marfa încărcată la depozit' },
  { key: 'in_transit' as const, label: 'În tranzit',     desc: 'Pe drum spre destinație' },
  { key: 'delivered'  as const, label: 'Livrată',        desc: 'Marfă predată la destinație' },
]
