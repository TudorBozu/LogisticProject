export type OrderStatus = 'processing' | 'confirmed' | 'pickup' | 'in_transit' | 'delivered'

export interface OrderItem {
  id: string
  productType: string
  name: string
  netWeight: number
  units: number
  kg: number
}

export interface Order {
  id: string
  barcode: string
  createdAt: string
  status: OrderStatus
  items: OrderItem[]
  depot: { name: string; address: string; lat: number; lng: number }
  destination: { name: string; address: string; lat: number; lng: number }
  driver?: { name: string; truck: string; phone: string; avatar: string }
  estimatedArrival?: string
  distance: number
  cost: number
  fuelCost: number
  tollCost: number
  eta?: string
  currentLocation?: string
}

export const MOCK_DRIVERS = [
  { name: 'Alexandru Vrabie', truck: 'TR-001 · Volvo FH16', phone: '+373 69 123 456', avatar: 'AV' },
  { name: 'Marina Ionescu',   truck: 'TR-007 · MAN TGX',   phone: '+373 78 234 567', avatar: 'MI' },
  { name: 'Vlad Ciobanu',     truck: 'TR-012 · DAF XF',    phone: '+373 60 345 678', avatar: 'VC' },
]

export const MOCK_ORDERS: Order[] = [
  {
    id: 'RX-2026-0041',
    barcode: '789456123041',
    createdAt: '2026-02-18T08:30:00',
    status: 'in_transit',
    items: [
      { id: '1', productType: 'Alimente', name: 'Făină albă tip 550', netWeight: 25, units: 40, kg: 1000 },
      { id: '2', productType: 'Băuturi', name: 'Ulei floarea soarelui', netWeight: 5, units: 60, kg: 300 },
    ],
    depot: { name: 'Depozit Central Chișinău', address: 'Str. Calea Orheiului 108, Chișinău', lat: 47.065, lng: 28.857 },
    destination: { name: 'Metro Cash & Carry Iași', address: 'Șos. Păcurari 130, Iași, România', lat: 47.162, lng: 27.589 },
    driver: MOCK_DRIVERS[0],
    distance: 128,
    cost: 3240,
    fuelCost: 1850,
    tollCost: 420,
    eta: '14:45',
    currentLocation: 'Sculeni, punct vamal MD-RO',
    estimatedArrival: '2026-02-18T14:45:00',
  },
  {
    id: 'RX-2026-0038',
    barcode: '789456123038',
    createdAt: '2026-02-17T14:00:00',
    status: 'delivered',
    items: [
      { id: '1', productType: 'Materiale construcție', name: 'Cărămidă roșie M100', netWeight: 3.5, units: 500, kg: 1750 },
    ],
    depot: { name: 'Depozit Bălți Nord', address: 'Str. Independenței 44, Bălți', lat: 47.762, lng: 27.929 },
    destination: { name: 'Antrepozit Soroca', address: 'Str. Ștefan cel Mare 12, Soroca', lat: 48.157, lng: 28.288 },
    driver: MOCK_DRIVERS[1],
    distance: 94,
    cost: 2100,
    fuelCost: 1200,
    tollCost: 0,
    eta: '11:20',
    estimatedArrival: '2026-02-17T11:20:00',
  },
  {
    id: 'RX-2026-0035',
    barcode: '789456123035',
    createdAt: '2026-02-16T09:15:00',
    status: 'delivered',
    items: [
      { id: '1', productType: 'Electronice', name: 'Laptopuri Lenovo IdeaPad', netWeight: 2.1, units: 20, kg: 42 },
      { id: '2', productType: 'Electronice', name: 'Monitor Dell 27"', netWeight: 4.8, units: 10, kg: 48 },
    ],
    depot: { name: 'Depozit IT Chișinău', address: 'Bd. Dacia 23, Chișinău', lat: 47.021, lng: 28.832 },
    destination: { name: 'Oficiu Cahul', address: 'Str. Republicii 45, Cahul', lat: 45.910, lng: 28.191 },
    driver: MOCK_DRIVERS[2],
    distance: 212,
    cost: 4800,
    fuelCost: 3100,
    tollCost: 650,
    estimatedArrival: '2026-02-16T16:30:00',
  },
]

export const STATUS_STEPS: { key: OrderStatus; label: string; desc: string }[] = [
  { key: 'processing',  label: 'Prelucrare',       desc: 'Comanda a fost înregistrată și se verifică disponibilitatea' },
  { key: 'confirmed',   label: 'Confirmată',        desc: 'Comanda a fost confirmată, se alocă șoferul și camionul' },
  { key: 'pickup',      label: 'Ridicare marfă',    desc: 'Șoferul a ajuns la depozit și încarcă marfa' },
  { key: 'in_transit',  label: 'În tranzit',        desc: 'Marfa este pe drum către destinație' },
  { key: 'delivered',   label: 'Livrată',           desc: 'Marfa a fost livrată cu succes la destinație' },
]

export function getStatusIndex(status: OrderStatus): number {
  return STATUS_STEPS.findIndex(s => s.key === status)
}
