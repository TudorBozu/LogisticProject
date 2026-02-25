// =============================================
//  RoutaX — Mock Auth Service
//  Replace with real API calls when backend is ready.
// =============================================

import type { AuthUser, SocialProvider, SignInFormData, RegisterFormData } from '../types/auth'

const MOCK_USER: AuthUser = {
  id: 'user-001',
  firstName: 'Luca',
  lastName: 'Davidson',
  email: 'luca.davidson@routax.com',
  avatarUrl: undefined,
}

/** Simulate network delay */
const delay = (ms = 900) => new Promise(resolve => setTimeout(resolve, ms))

export async function mockSignIn(data: SignInFormData): Promise<AuthUser> {
  await delay()
  if (!data.email || !data.password) {
    throw new Error('Email and password are required.')
  }
  // Simulate wrong credentials for demo
  if (data.password === 'wrong') {
    throw new Error('Invalid email or password.')
  }
  return MOCK_USER
}

export async function mockRegister(data: RegisterFormData): Promise<AuthUser> {
  await delay()
  if (!data.email || !data.password || !data.firstName) {
    throw new Error('Please fill in all required fields.')
  }
  return {
    ...MOCK_USER,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
  }
}

export async function mockSocialAuth(provider: SocialProvider): Promise<AuthUser> {
  await delay(600)
  console.log(`[Mock] Authenticating with ${provider}`)
  return {
    ...MOCK_USER,
    email: `user@${provider}.mock`,
  }
}
