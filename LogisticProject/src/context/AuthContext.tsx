import { createContext, useContext, useState, type ReactNode } from 'react'
import type { AuthUser } from '../types/auth'

interface AuthContextType {
  user: AuthUser | null
  login(user: AuthUser): void
  logout(): void
}

const AuthContext = createContext<AuthContextType | null>(null)

function loadUser(): AuthUser | null {
  const raw = sessionStorage.getItem('routax_user')
  if (!raw) return null
  try { return JSON.parse(raw) as AuthUser }
  catch { return null }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser)

  function login(u: AuthUser) {
    sessionStorage.setItem('routax_user', JSON.stringify(u))
    setUser(u)
  }

  function logout() {
    sessionStorage.removeItem('routax_user')
    sessionStorage.removeItem('routax_auth_nav')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
