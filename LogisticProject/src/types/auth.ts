export interface SignInValues {
  email: string
  password: string
  remember: boolean
}

export interface SignUpValues {
  firstName: string
  lastName: string
  email: string
  company: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export type SocialProvider = 'google' | 'facebook' | 'apple' | 'microsoft'
