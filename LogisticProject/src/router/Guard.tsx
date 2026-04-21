import { Navigate, Outlet } from 'react-router-dom'
import { PATHS } from './paths'
import Page403 from '../pages/errors/Page403'
import { useAuth } from '../context/AuthContext'

export function allowAuthNav(target: 'signin' | 'signup') {
  sessionStorage.setItem('routax_auth_nav', target)
}

export function clearAuthNav() {
  sessionStorage.removeItem('routax_auth_nav')
}

function homeForRole(role: string): string {
  if (role === 'client') return PATHS.DASHBOARD
  if (role === 'depot_worker') return PATHS.DEPOT
  if (role === 'driver') return PATHS.DRIVER
  return PATHS.app.fleet
}

type GuardProps = {
  requireAuth?: boolean
  publicOnly?: boolean
  redirectTo?: string
  allowedRoles?: string[]
  authTarget?: 'signin' | 'signup'
}

export function Guard({ requireAuth = false, publicOnly = false, redirectTo, allowedRoles, authTarget }: GuardProps) {
  const { user } = useAuth()

  if (publicOnly) {
    if (user) {
      return <Navigate to={redirectTo ?? homeForRole(user.role)} replace />
    }
    const stored = sessionStorage.getItem('routax_auth_nav')
    if (!stored || (authTarget && stored !== authTarget)) {
      return <Navigate to={PATHS.public.home} replace />
    }
  }

  if (requireAuth) {
    if (!user) {
      return <Navigate to={PATHS.public.signIn} replace />
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Page403 />
    }
  }

  return <Outlet />
}
