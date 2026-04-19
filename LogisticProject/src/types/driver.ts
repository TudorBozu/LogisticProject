// ── Order / Trip status ────────────────────────────────────────────────────
export type OrderStatus = 'processing' | 'confirmed' | 'pickup' | 'in_transit' | 'delivered'
export type TripStatus  = 'completed' | 'in_transit' | 'cancelled'

// ── Geo-aware location ─────────────────────────────────────────────────────
export interface DriverLocation {
  name: string
  address: string
  lat: number
  lng: number
  contact?: string
  phone?: string
  schedule?: string
}

// ── Cargo items ────────────────────────────────────────────────────────────
export interface CargoItem {
  id: string
  name: string
  netWeight: number
  productType: string
  units: number
  kg: number
}

// ── Vehicle mechanics ──────────────────────────────────────────────────────
export interface VehicleMechanics {
  engine: number
  brakes: number
  tires: number
  oil: number
  suspension: number
}

// ── Vehicle ────────────────────────────────────────────────────────────────
export interface DriverVehicle {
  code: string
  name: string
  usedCapacityPct: number
  fuelPct: number
  burden: { used: number; total: number }
  volume: { used: number; total: number }
  temperatureC: number
  mechanics: VehicleMechanics
}

// ── Active assignment ──────────────────────────────────────────────────────
export interface DriverAssignment {
  orderId: string
  barcode?: string
  status: OrderStatus
  items: CargoItem[]
  depot: DriverLocation
  destination: DriverLocation
  estimatedArrival?: string
  distance: number
  distanceRemaining: number
  cost: number
  fuelCost: number
  tollCost: number
  eta: string
  currentLocation: string
  startedAt?: string
}

// ── Driver profile ─────────────────────────────────────────────────────────
export interface DriverProfile {
  id: string
  name: string
  initials: string
  tripsThisMonth: number
  rating: number
  dailyActiveMinutes: number
  vehicle: DriverVehicle
  assignment?: DriverAssignment
  email?: string
  phone?: string
  licenseNumber?: string
  licenseCategory?: string
  assignedTruck?: string
  truckPlate?: string
  avatar?: string
  joinedAt?: string
}

// ── Aggregate stats ────────────────────────────────────────────────────────
export interface DriverStats {
  totalTrips: number
  totalKm: number
  rating: number
  earningsThisMonth: number
  tripsThisMonth: number
  onTimeRate: number
}

// ── Trip history record ────────────────────────────────────────────────────
export interface TripRecord {
  id: string
  orderId: string
  from: string
  to: string
  distance: number
  date: string
  status: TripStatus
  rating: number | null
  earnings: number
  duration: string
}

export type TripSortKey = 'date' | 'distance' | 'earnings'
export type TripSortDir = 'asc' | 'desc'

export interface TripFilters {
  search: string
  status: TripStatus | 'all'
  sortBy: TripSortKey
  sortDir: TripSortDir
  page: number
}

export interface TripQueryResult {
  items: TripRecord[]
  total: number
  totalPages: number
}

// ── Profile edit form ──────────────────────────────────────────────────────
export interface DriverProfileFormData {
  phone: string
  truckPlate: string
}

export type DriverProfileErrors = Partial<Record<keyof DriverProfileFormData, string>>
