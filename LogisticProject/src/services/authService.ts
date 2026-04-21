import { findUser } from '../data/mockUsers'
import type { AuthUser, SignInFormData, RegisterFormData, SocialProvider } from '../types/auth'

const delay = (ms = 900) => new Promise(resolve => setTimeout(resolve, ms))

export async function mockSignIn(data: SignInFormData): Promise<AuthUser> {
  await delay()
  const user = findUser(data.email, data.password)
  if (!user) throw new Error('Email sau parolă incorectă.')
  const [firstName, ...rest] = user.name.split(' ')
  return {
    id: user.id,
    firstName,
    lastName: rest.join(' '),
    email: user.email,
    role: user.role,
  }
}

export async function mockRegister(data: RegisterFormData): Promise<AuthUser> {
  await delay()
  if (!data.email || !data.password || !data.firstName) {
    throw new Error('Please fill in all required fields.')
  }
  return {
    id: `user-${Date.now()}`,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: 'client',
  }
}

export async function mockSocialAuth(provider: SocialProvider): Promise<AuthUser> {
  await delay(600)
  return {
    id: `social-${Date.now()}`,
    firstName: 'Social',
    lastName: 'User',
    email: `user@${provider}.mock`,
    role: 'client',
  }
}
