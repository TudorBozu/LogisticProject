export interface CityCoord { x: number; y: number }

export const CITY_COORDS: Record<string, CityCoord> = {
  'Chișinău': { x: 46, y: 62 },
  'Bălți':    { x: 35, y: 22 },
  'Orhei':    { x: 50, y: 46 },
  'Cahul':    { x: 28, y: 88 },
  'Soroca':   { x: 55, y: 12 },
  'Ungheni':  { x: 18, y: 44 },
  'Comrat':   { x: 40, y: 80 },
  'Edineț':   { x: 22, y: 8  },
}

export const ALL_CITIES = Object.keys(CITY_COORDS)

const DISTANCES: Record<string, number> = {
  'Chișinău-Bălți': 134,   'Bălți-Chișinău': 134,
  'Chișinău-Orhei': 46,    'Orhei-Chișinău': 46,
  'Chișinău-Ungheni': 110, 'Ungheni-Chișinău': 110,
  'Chișinău-Soroca': 161,  'Soroca-Chișinău': 161,
  'Chișinău-Cahul': 154,   'Cahul-Chișinău': 154,
  'Chișinău-Comrat': 93,   'Comrat-Chișinău': 93,
  'Chișinău-Edineț': 210,  'Edineț-Chișinău': 210,
  'Bălți-Orhei': 94,       'Orhei-Bălți': 94,
  'Bălți-Soroca': 85,      'Soroca-Bălți': 85,
  'Bălți-Ungheni': 115,    'Ungheni-Bălți': 115,
  'Bălți-Cahul': 220,      'Cahul-Bălți': 220,
  'Bălți-Comrat': 193,     'Comrat-Bălți': 193,
  'Bălți-Edineț': 60,      'Edineț-Bălți': 60,
  'Cahul-Comrat': 92,      'Comrat-Cahul': 92,
  'Orhei-Soroca': 115,     'Soroca-Orhei': 115,
}

export function getDistance(from: string, to: string): number {
  if (from === to) return 0
  const k = `${from}-${to}`
  if (DISTANCES[k]) return DISTANCES[k]
  const fc = CITY_COORDS[from], tc = CITY_COORDS[to]
  if (fc && tc) {
    const dx = fc.x - tc.x, dy = fc.y - tc.y
    return Math.round(Math.sqrt(dx * dx + dy * dy) * 3.8)
  }
  return 100
}

export function getRoutePath(from: string, to: string): string {
  const fc = CITY_COORDS[from] ?? { x: 46, y: 62 }
  const tc = CITY_COORDS[to]   ?? { x: 35, y: 22 }
  const dx = tc.x - fc.x, dy = tc.y - fc.y
  const mx = (fc.x + tc.x) / 2 - dy * 0.25
  const my = (fc.y + tc.y) / 2 + dx * 0.25
  return `M${fc.x},${fc.y} Q${mx.toFixed(1)},${my.toFixed(1)} ${tc.x},${tc.y}`
}
