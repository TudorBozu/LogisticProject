import type {
  TripRecord,
  TripFilters,
  TripQueryResult,
  DriverProfileFormData,
  DriverProfileErrors,
} from '../types/driver'

const PAGE_SIZE = 6

export function filterAndSortTrips(
  trips: TripRecord[],
  filters: Omit<TripFilters, 'page'>
): TripRecord[] {
  let result = [...trips]

  const q = filters.search.trim().toLowerCase()
  if (q) {
    result = result.filter(
      t =>
        t.orderId.toLowerCase().includes(q) ||
        t.from.toLowerCase().includes(q) ||
        t.to.toLowerCase().includes(q)
    )
  }

  if (filters.status !== 'all') {
    result = result.filter(t => t.status === filters.status)
  }

  result.sort((a, b) => {
    let cmp = 0
    switch (filters.sortBy) {
      case 'date':     cmp = new Date(a.date).getTime() - new Date(b.date).getTime(); break
      case 'distance': cmp = a.distance - b.distance; break
      case 'earnings': cmp = a.earnings - b.earnings; break
    }
    return filters.sortDir === 'asc' ? cmp : -cmp
  })

  return result
}

export function queryTrips(trips: TripRecord[], filters: TripFilters): TripQueryResult {
  const filtered = filterAndSortTrips(trips, filters)
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage = Math.min(filters.page, totalPages)
  const items = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  return { items, total, totalPages }
}

export function tripSummaryStats(trips: TripRecord[]) {
  const completed = trips.filter(t => t.status === 'completed')
  return {
    totalEarnings: completed.reduce((s, t) => s + t.earnings, 0),
    totalKm: trips.reduce((s, t) => s + t.distance, 0),
    completedCount: completed.length,
  }
}

export function validateProfileForm(data: DriverProfileFormData): DriverProfileErrors {
  const errors: DriverProfileErrors = {}
  const phoneRx = /^[+]?[\d\s\-()\\.]{8,15}$/
  if (!data.phone.trim())
    errors.phone = 'Telefonul este obligatoriu'
  else if (!phoneRx.test(data.phone.trim()))
    errors.phone = 'Format invalid (ex: +373 79 123 456)'
  if (!data.truckPlate.trim())
    errors.truckPlate = 'Plăcuța camionului este obligatorie'
  else if (data.truckPlate.trim().length < 4)
    errors.truckPlate = 'Minim 4 caractere'
  return errors
}
