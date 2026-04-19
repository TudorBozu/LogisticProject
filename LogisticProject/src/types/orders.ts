export type OrderStatus = 'processing' | 'transit' | 'delivered'

export type ProductType =
  | 'Produse alimentare'
  | 'Materiale de construcție'
  | 'Electronice'
  | 'Textile'
  | 'Produse chimice'
  | 'Mobilier'

export interface Destination {
  city: string
  addr: string
  contact: string
  phone: string
}

export interface CostBreakdown {
  base: number
  fuel: number
  taxes: number
  subtotal: number
  vat: number
  total: number
}

export interface Order {
  id: string
  product: string
  productType: ProductType
  units: number
  massPerUnit: number
  totalKg: number
  from: string
  fromAddr: string
  destinations: Destination[]
  status: OrderStatus
  barcode: string
  driver: string
  truck: string
  distance: number
  cost: CostBreakdown
  createdAt: string
}
