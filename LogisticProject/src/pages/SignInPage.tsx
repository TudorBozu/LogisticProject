import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import FormInput from '../components/auth/FormInput'
import { useAuthForm, type FieldError } from '../hooks/useAuthForm'
import type { SignInValues } from '../types/auth'
import { useLang } from '../context/LangContext'
import { authT } from '../data/authTranslations'

const PANEL_STATS = [
  { value: '98.6%', label: 'Fleet uptime guaranteed', icon: (<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>) },
  { value: '2,400+', label: 'Vehicles tracked globally', icon: (<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>) },
  { value: '34%', label: 'Average fuel cost reduction', icon: (<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"/></svg>) },
]
const PANEL_QUOTE = { text: 'RoutaX transformed the way we manage our 200-truck fleet. Real-time insights, zero guesswork.', name: 'Alexandru Vrabie', role: 'Operations Director, LogiTrans', initials: 'AV' }

const initialValues: SignInValues = { email: '', password: '', remember: false }

function validate(values: SignInValues): FieldError[] {
  const errs: FieldError[] = []
  if (!values.email) errs.push({ field: 'email', message: 'Adresa de e-mail este obligatorie' })
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.push({ field: 'email', message: 'Adresa de e-mail nu este validă' })
  if (!values.password) errs.push({ field: 'password', message: 'Parola este obligatorie' })
  else if (values.password.length < 6) errs.push({ field: 'password', message: 'Parola trebuie să aibă cel puțin 6 caractere' })
  return errs
}

async function mockSignIn(values: SignInValues): Promise<void> {
  await new Promise<void>(r => setTimeout(r, 1200))
  if (values.email === 'fail@example.com') throw new Error('Email sau parolă incorectă.')
}

export default function SignInPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const t = authT[lang].signIn

  const onSubmit = useCallback(async (v: SignInValues) => { await mockSignIn(v); navigate('/dashboard') }, [navigate])
  const { values, errors, serverError, isLoading, hasFieldError, handleChange, handleSubmit } = useAuthForm({ initialValues, validate, onSubmit })

  const allErrors = [...errors.map(e => e.message), ...(serverError ? [serverError] : [])]

  return (
    <AuthLayout panelTitle={t.panelTitle} panelSubtitle={t.panelSubtitle} panelStats={PANEL_STATS} panelQuote={PANEL_QUOTE}>

      <div className="mb-7">
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">{t.title}</h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormInput
          label={t.email} type="email" placeholder={t.emailPlaceholder} autoComplete="email"
          value={values.email} onChange={handleChange('email')} hasError={hasFieldError('email')}
          icon={<svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>}
        />

        <div>
          <FormInput
            label={t.password} type="password" placeholder={t.passwordPlaceholder} autoComplete="current-password"
            value={values.password} onChange={handleChange('password')} hasError={hasFieldError('password')}
            icon={<svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>}
          />
          <div className="mt-2 flex justify-end">
            <a href="#" className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">{t.forgotPassword}</a>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5">
          <div className="relative flex-shrink-0">
            <input type="checkbox" className="peer sr-only" checked={values.remember as boolean} onChange={handleChange('remember')}/>
            <div className="h-5 w-5 rounded-md border-2 border-slate-300 bg-white peer-checked:border-brand-600 peer-checked:bg-brand-600 dark:border-slate-600 dark:bg-slate-800 dark:peer-checked:bg-brand-600"/>
            <svg className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-400">{t.remember}</span>
        </label>

        {allErrors.length > 0 && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 dark:border-red-900/40 dark:bg-red-950/30">
            <div className="mb-2 flex items-center gap-2">
              <svg className="h-3.5 w-3.5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/></svg>
              <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                {allErrors.length} eroare{allErrors.length !== 1 ? 'ri' : ''} găsite
              </span>
            </div>
            <ul className="space-y-1">
              {allErrors.map((msg, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-red-600 dark:text-red-400">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"/>
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-55">
          {isLoading
            ? <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"/></svg>{t.submitting}</>
            : t.submit}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        {t.noAccount}{' '}
        <Link to="/sign-up" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">{t.createAccount}</Link>
      </p>
    </AuthLayout>
  )
}
