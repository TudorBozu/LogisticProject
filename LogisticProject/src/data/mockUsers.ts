export type UserRole = 'admin' | 'dispatcher' | 'driver' | 'client' | 'depot_worker'

export interface MockUser {
  id: string
  email: string
  password: string
  name: string
  role: UserRole
}

export const mockUsers: MockUser[] = [
  {
    id: 'u-001',
    email: 'admin@routax.com',
    password: 'Admin123',
    name: 'Admin RoutaX',
    role: 'admin',
  },
  {
    id: 'u-002',
    email: 'dispatcher@routax.com',
    password: 'Disp456',
    name: 'Ion Dispatcher',
    role: 'dispatcher',
  },
  {
    id: 'u-003',
    email: 'client@routax.com',
    password: 'Client123',
    name: 'Alexandru Ciobanu',
    role: 'client',
  },
  {
    id: 'u-004',
    email: 'lucratorDepozit@routax.com',
    password: 'Depozit123',
    name: 'Lucrator Depozit',
    role: 'depot_worker',
  },
]

export function findUser(email: string, password: string): MockUser | null {
  return mockUsers.find(u => u.email === email && u.password === password) ?? null
}
