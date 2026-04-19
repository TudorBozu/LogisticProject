import type {
  DriverAssignment,
  DriverProfile,
  DriverStats,
  DriverVehicle,
  TripRecord,
} from '../types/driver'

export interface MaintenanceRecord {
  id: string
  date: string
  type: string
  mileageKm: number
  shop: string
}

export interface NextServiceInfo {
  atKm: number
  byDate: string
  type: string
  currentKm: number
}

export const driverVehicle: DriverVehicle = {
  code: 'TR-001',
  name: 'Volvo FH16',
  fuelPct: 60,
  temperatureC: 24,
  burden:  { used: 6300, total: 10000 },
  volume:  { used: 23,   total: 45    },
  usedCapacityPct: 63,
  mechanics: { engine: 90, brakes: 90, tires: 80, oil: 89, suspension: 92 },
}

export const currentAssignment: DriverAssignment = {
  orderId:  'RX-2026-0041',
  barcode:  '789456123041',
  status:   'in_transit',
  items: [
    { id: '1', productType: 'Alimente',  name: 'Făină albă tip 550',    netWeight: 25, units: 40, kg: 1000 },
    { id: '2', productType: 'Băuturi',   name: 'Ulei floarea soarelui', netWeight: 5,  units: 60, kg: 300  },
    { id: '3', productType: 'Alimente',  name: 'Zahăr cristal',         netWeight: 50, units: 100, kg: 5000 },
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
  distance:          128,
  distanceRemaining: 54,
  cost:      3240,
  fuelCost:  1850,
  tollCost:   420,
  eta:       '14:45',
  currentLocation: 'Sculeni, punct vamal MD-RO',
  startedAt: '2026-04-19T06:30:00',
}

export const driverProfile: DriverProfile = {
  id:                 'DRV-001',
  name:               'Alexandru Vrabie',
  initials:           'AV',
  email:              'driver@routax.com',
  phone:              '+373 79 543 210',
  licenseNumber:      'MD-543210',
  licenseCategory:    'C+E',
  assignedTruck:      'Volvo FH16 2022',
  truckPlate:         'GL-12 ABC',
  avatar:             'AV',
  joinedAt:           '2020-05-14',
  tripsThisMonth:     14,
  rating:             4.9,
  dailyActiveMinutes: 380,
  vehicle:            driverVehicle,
  assignment:         currentAssignment,
}

export const driverStats: DriverStats = {
  totalTrips:        342,
  totalKm:           187450,
  rating:            4.9,
  earningsThisMonth: 8340,
  tripsThisMonth:    14,
  onTimeRate:        97,
}

export const maintenanceHistory: MaintenanceRecord[] = [
  { id: 'm-001', date: '2026-04-01', type: 'Revizie tehnică', mileageKm: 142000, shop: 'Auto Service Chișinău' },
  { id: 'm-002', date: '2026-02-15', type: 'Schimb ulei motor', mileageKm: 138000, shop: 'TirService MD' },
  { id: 'm-003', date: '2026-01-10', type: 'Anvelope iarnă montate', mileageKm: 133000, shop: 'Vulcanizare Centrală' },
  { id: 'm-004', date: '2025-11-20', type: 'Frâne – garnituri înlocuite', mileageKm: 125000, shop: 'Auto Service Chișinău' },
  { id: 'm-005', date: '2025-09-05', type: 'Inspecție completă', mileageKm: 118000, shop: 'Volvo Service Oficial' },
]

export const nextService: NextServiceInfo = {
  atKm:      148000,
  byDate:    '2026-06-01',
  type:      'Revizie generală 6 luni',
  currentKm: 144320,
}

export const tripHistory: TripRecord[] = [
  {
    id: 'TR-001', orderId: 'RX-2026-0040',
    from: 'Chișinău', to: 'București',
    distance: 463, date: '2026-04-18',
    status: 'completed', rating: 5, earnings: 620, duration: '5h 12m',
  },
  {
    id: 'TR-002', orderId: 'RX-2026-0038',
    from: 'Chișinău', to: 'Odesa',
    distance: 188, date: '2026-04-17',
    status: 'completed', rating: 4, earnings: 280, duration: '2h 45m',
  },
  {
    id: 'TR-003', orderId: 'RX-2026-0035',
    from: 'Chișinău', to: 'Iași',
    distance: 150, date: '2026-04-16',
    status: 'completed', rating: 5, earnings: 210, duration: '2h 05m',
  },
  {
    id: 'TR-004', orderId: 'RX-2026-0033',
    from: 'Chișinău', to: 'Timișoara',
    distance: 780, date: '2026-04-14',
    status: 'completed', rating: 4, earnings: 1040, duration: '8h 30m',
  },
  {
    id: 'TR-005', orderId: 'RX-2026-0031',
    from: 'Chișinău', to: 'Galați',
    distance: 210, date: '2026-04-13',
    status: 'cancelled', rating: null, earnings: 0, duration: '—',
  },
  {
    id: 'TR-006', orderId: 'RX-2026-0029',
    from: 'Chișinău', to: 'Brașov',
    distance: 620, date: '2026-04-12',
    status: 'completed', rating: 5, earnings: 830, duration: '6h 55m',
  },
  {
    id: 'TR-007', orderId: 'RX-2026-0027',
    from: 'Chișinău', to: 'Constanța',
    distance: 385, date: '2026-04-10',
    status: 'completed', rating: 3, earnings: 515, duration: '4h 20m',
  },
  {
    id: 'TR-008', orderId: 'RX-2026-0025',
    from: 'Chișinău', to: 'Suceava',
    distance: 220, date: '2026-04-09',
    status: 'completed', rating: 5, earnings: 295, duration: '2h 50m',
  },
  {
    id: 'TR-009', orderId: 'RX-2026-0023',
    from: 'Chișinău', to: 'Craiova',
    distance: 510, date: '2026-04-07',
    status: 'cancelled', rating: null, earnings: 0, duration: '—',
  },
  {
    id: 'TR-010', orderId: 'RX-2026-0021',
    from: 'Chișinău', to: 'Cluj-Napoca',
    distance: 847, date: '2026-04-05',
    status: 'completed', rating: 5, earnings: 1130, duration: '9h 10m',
  },
  {
    id: 'TR-011', orderId: 'RX-2026-0019',
    from: 'Chișinău', to: 'Bacău',
    distance: 186, date: '2026-04-03',
    status: 'completed', rating: 4, earnings: 250, duration: '2h 30m',
  },
  {
    id: 'TR-012', orderId: 'RX-2026-0017',
    from: 'Chișinău', to: 'Ploiești',
    distance: 398, date: '2026-04-01',
    status: 'completed', rating: 5, earnings: 530, duration: '4h 40m',
  },
]
