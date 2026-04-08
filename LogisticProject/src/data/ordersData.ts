import type { Order } from '../types/orders'
import { calcCost } from '../utils/format'

const ordersData: Order[] = [
  {
    id: 'RX-2024-001',
    product: 'Ulei de floarea-soarelui',
    productType: 'Produse alimentare',
    units: 800, massPerUnit: 0.9, totalKg: 720,
    from: 'Chișinău', fromAddr: 'str. Industrială 12',
    destinations: [{ city: 'Bălți', addr: 'str. Independenței 45', contact: 'Ion Rusu', phone: '+373 78 123 456' }],
    status: 'transit',
    barcode: '3214567890123',
    driver: 'Vasile Moraru', truck: 'TR-007',
    distance: 134, cost: calcCost(134),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'RX-2024-002',
    product: 'Ciment Portland M500',
    productType: 'Materiale de construcție',
    units: 200, massPerUnit: 50, totalKg: 10000,
    from: 'Bălți', fromAddr: 'str. Fabricii 7',
    destinations: [{ city: 'Orhei', addr: 'str. Vasile Lupu 22', contact: 'Petru Botnari', phone: '+373 69 234 567' }],
    status: 'delivered',
    barcode: '3214567891456',
    driver: 'Ion Ciobanu', truck: 'TR-012',
    distance: 94, cost: calcCost(94),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: 'RX-2024-003',
    product: 'Televizoare LED 55"',
    productType: 'Electronice',
    units: 40, massPerUnit: 12, totalKg: 480,
    from: 'Chișinău', fromAddr: 'str. Meșteșugarilor 3',
    destinations: [{ city: 'Cahul', addr: 'str. Republicii 18', contact: 'Maria Ionescu', phone: '+373 79 345 678' }],
    status: 'processing',
    barcode: '3214567892789',
    driver: 'Andrei Lungu', truck: 'TR-019',
    distance: 154, cost: calcCost(154),
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
]

export default ordersData
