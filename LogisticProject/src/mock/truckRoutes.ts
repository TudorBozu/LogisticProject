export type LatLng = [number, number]

export interface TruckRoute {
  truckId: string
  name: string
  from: string
  to: string
  color: string
  waypoints: LatLng[]
  /** Progress offset (0-1 relative) so trucks start at different points */
  initialProgress: number
  /** Km/h simulated speed factor */
  speedFactor: number
}

export const truckRoutes: TruckRoute[] = [
  {
    truckId: 't1',
    name: 'Chișinău → Iași',
    from: 'Chișinău',
    to: 'Iași',
    color: '#2F6DF6',
    initialProgress: 0.15,
    speedFactor: 1.0,
    waypoints: [
      [47.0245, 28.8324], // Chișinău
      [47.1414, 28.6074], // Strășeni
      [47.2100, 28.3500], // Lăpușna direction
      [47.2110, 27.8075], // Ungheni (border crossing)
      [47.2200, 27.7200], // Near Ungheni RO
      [47.1585, 27.6014], // Iași
    ],
  },
  {
    truckId: 't2',
    name: 'Bălți → Soroca',
    from: 'Bălți',
    to: 'Soroca',
    color: '#10b981',
    initialProgress: 0.45,
    speedFactor: 0.9,
    waypoints: [
      [47.7617, 27.9297], // Bălți
      [47.8100, 28.0200], // Glodeni direction
      [47.8657, 28.2863], // Florești
      [48.0400, 28.2900], // Between Florești-Soroca
      [48.1566, 28.2875], // Soroca
    ],
  },
  {
    truckId: 't3',
    name: 'Chișinău → Cahul',
    from: 'Chișinău',
    to: 'Cahul',
    color: '#f59e0b',
    initialProgress: 0.60,
    speedFactor: 0.85,
    waypoints: [
      [47.0245, 28.8324], // Chișinău
      [46.8367, 28.5862], // Hîncești
      [46.6500, 28.4500], // Cimișlia direction
      [46.4831, 28.2621], // Leova
      [46.2000, 28.2200], // Toward Cahul
      [45.9119, 28.1922], // Cahul
    ],
  },
  {
    truckId: 't4',
    name: 'Iași → Bacău',
    from: 'Iași',
    to: 'Bacău',
    color: '#ef4444',
    initialProgress: 0.30,
    speedFactor: 1.1,
    waypoints: [
      [47.1585, 27.6014], // Iași
      [47.1800, 27.1500], // Toward Pașcani
      [47.2522, 26.7306], // Pașcani
      [47.0500, 26.9000], // Between Pașcani-Roman
      [46.9199, 26.9196], // Roman
      [46.7000, 26.9200], // Between Roman-Bacău
      [46.5671, 26.9146], // Bacău
    ],
  },
]
