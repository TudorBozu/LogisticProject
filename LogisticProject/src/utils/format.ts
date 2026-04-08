import type { CostBreakdown, OrderStatus } from '../types/orders'

export function fmtMDL(n: number): string {
  return n.toLocaleString('ro-RO') + ' MDL'
}

export function distToETA(km: number): string {
  const totalMin = Math.round((km / 70) * 60)
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  if (h === 0) return `${m} min`
  if (m === 0) return `${h}h`
  return `${h}h ${m}min`
}

export function calcCost(distKm: number): CostBreakdown {
  const base     = Math.round(distKm * 11.5)
  const fuel     = Math.round(distKm * 4.5)
  const taxes    = Math.round(distKm * 1.8)
  const subtotal = base + fuel + taxes
  const vat      = Math.round(subtotal * 0.2)
  const total    = subtotal + vat
  return { base, fuel, taxes, subtotal, vat, total }
}

export function statusLabel(s: OrderStatus): string {
  return { transit: 'În tranzit', processing: 'Prelucrare', delivered: 'Livrat' }[s]
}

export function statusColors(s: OrderStatus): string {
  return {
    transit:    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    processing: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    delivered:  'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
  }[s]
}

export function generateOrderId(): string {
  return `RX-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`
}

export function generateBarcode(): string {
  return '32145678' + String(Math.floor(Math.random() * 99999)).padStart(5, '0')
}

export function driverInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('')
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'acum câteva secunde'
  if (m < 60) return `acum ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `acum ${h}h`
  return `acum ${Math.floor(h / 24)} zile`
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short', year: 'numeric' })
}

export const DRIVERS = ['Vasile Moraru', 'Ion Ciobanu', 'Andrei Lungu', 'Mihail Rusu']
export const TRUCKS  = ['TR-007', 'TR-012', 'TR-019', 'TR-024']
