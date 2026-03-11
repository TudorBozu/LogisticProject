import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PATHS } from './paths'

function getUser() {
  return sessionStorage.getItem('routax_user') ? { id: 'mock' } : null
}

export function allowAuthNav() {
  sessionStorage.setItem('routax_auth_nav', '1')
}

export function clearAuthNav() {
  sessionStorage.removeItem('routax_auth_nav')
}

type GuardProps = {
  requireAuth?: boolean
  publicOnly?: boolean
  redirectTo?: string
}

export function Guard({ requireAuth = false, publicOnly = false, redirectTo }: GuardProps) {
  const location = useLocation()
  const user = getUser()

  if (publicOnly) {
    if (user) {
      return <Navigate to={redirectTo ?? PATHS.app.dashboard} replace />
    }
    if (!sessionStorage.getItem('routax_auth_nav')) {
      return <Navigate to={PATHS.public.home} replace />
    }
  }

  if (requireAuth && !user) {
    return (
      <Navigate
        to={redirectTo ?? PATHS.public.signIn}
        replace
        state={{ from: location }}
      />
    )
  }

  return <Outlet />
}
