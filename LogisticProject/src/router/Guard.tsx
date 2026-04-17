import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PATHS } from './paths'

interface SessionUser {
  id: string
  name: string
  role: string
}

function getUser(): SessionUser | null {
  const raw = sessionStorage.getItem('routax_user')
  if (!raw) return null
  try { return JSON.parse(raw) as SessionUser }
  catch { return null }
}

export function allowAuthNav() {
  sessionStorage.setItem('routax_auth_nav', '1')
}

export function clearAuthNav() {
  sessionStorage.removeItem('routax_auth_nav')
}

function homeForRole(role: string): string {
  if (role === 'client') return PATHS.DASHBOARD
  if (role === 'depot_worker') return PATHS.DEPOT
  return PATHS.app.fleet
}

type GuardProps = {
  requireAuth?: boolean
  publicOnly?: boolean
  redirectTo?: string
  allowedRoles?: string[]
}

export function Guard({ requireAuth = false, publicOnly = false, redirectTo, allowedRoles }: GuardProps) {
  const location = useLocation()
  const user = getUser()

  if (publicOnly) {
    if (user) {
      return <Navigate to={redirectTo ?? homeForRole(user.role)} replace />
    }
    if (!sessionStorage.getItem('routax_auth_nav')) {
      return <Navigate to={PATHS.public.home} replace />
    }
  }

  if (requireAuth) {
    if (!user) {
      return <Navigate to={redirectTo ?? PATHS.public.signIn} replace state={{ from: location }} />
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to={homeForRole(user.role)} replace />
    }
  }

  return <Outlet />
}
