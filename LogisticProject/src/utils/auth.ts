export interface SessionUser {
  id: string
  name: string
  role: string
}

export function getSessionUser(): SessionUser | null {
  const raw = sessionStorage.getItem('routax_user')
  if (!raw) return null
  try { return JSON.parse(raw) as SessionUser }
  catch { return null }
}

export function logout(navigate: (to: string) => void): void {
  sessionStorage.removeItem('routax_user')
  sessionStorage.removeItem('routax_auth_nav')
  navigate('/sign-in')
}
