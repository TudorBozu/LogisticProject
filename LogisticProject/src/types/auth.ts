export interface SignInValues {
  [key: string]: string | boolean
  email: string
  password: string
  remember: boolean
}

export interface SignUpValues {
  [key: string]: string | boolean
  firstName: string
  lastName: string
  email: string
  company: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export type SocialProvider = 'google' | 'facebook' | 'apple' | 'microsoft'

export interface AuthUser {
  id: string
  firstName: string
  lastName: string
  email: string
  avatarUrl?: string
}

export type SignInFormData = Pick<SignInValues, 'email' | 'password'>
export type RegisterFormData = Pick<SignUpValues, 'email' | 'password' | 'firstName' | 'lastName' | 'company'>

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong'
