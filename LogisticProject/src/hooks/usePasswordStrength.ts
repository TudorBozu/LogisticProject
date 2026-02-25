import { useMemo } from 'react'
import type { PasswordStrength } from '../types/auth'

export interface PasswordCriteria {
  minLength: boolean
  hasUppercase: boolean
  hasNumber: boolean
  hasSymbol: boolean
}

export interface UsePasswordStrengthResult {
  strength: PasswordStrength
  score: number          // 0-4
  criteria: PasswordCriteria
}

export function usePasswordStrength(password: string): UsePasswordStrengthResult {
  return useMemo(() => {
    const criteria: PasswordCriteria = {
      minLength:    password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber:    /[0-9]/.test(password),
      hasSymbol:    /[^A-Za-z0-9]/.test(password),
    }

    const score = Object.values(criteria).filter(Boolean).length

    const strength: PasswordStrength =
      score <= 1 ? 'weak' :
      score === 2 ? 'fair' :
      score === 3 ? 'good' : 'strong'

    return { strength, score, criteria }
  }, [password])
}
