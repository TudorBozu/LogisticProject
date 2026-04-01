import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/auth/AuthLayout'
import FormInput from '../components/auth/FormInput'
import { useAuthForm, type FieldError } from '../hooks/useAuthForm'
import type { SignUpValues } from '../types/auth'
import { useLang } from '../context/LangContext'
import { authT } from '../data/authTranslations'

const initialValues: SignUpValues = { firstName: '', lastName: '', email: '', company: '', password: '', confirmPassword: '', agreeToTerms: false }

function validate(v: SignUpValues): FieldError[] {
  const errs: FieldError[] = []
  if (!v.firstName.trim()) errs.push({ field: 'firstName', message: 'Prenumele este obligatoriu' })
  if (!v.lastName.trim())  errs.push({ field: 'lastName',  message: 'Numele este obligatoriu' })
  if (!v.email) errs.push({ field: 'email', message: 'Adresa de e-mail este obligatorie' })
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.push({ field: 'email', message: 'Adresa de e-mail nu este validă' })
  if (!v.password) {
    errs.push({ field: 'password', message: 'Parola este obligatorie' })
  } else {
    if (v.password.length < 8)   errs.push({ field: 'password', message: 'Parola trebuie să aibă cel puțin 8 caractere' })
    if (!/[A-Z]/.test(v.password)) errs.push({ field: 'password', message: 'Parola trebuie să conțină cel puțin o literă mare' })
    if (!/[a-z]/.test(v.password)) errs.push({ field: 'password', message: 'Parola trebuie să conțină cel puțin o literă mică' })
    if (!/[0-9]/.test(v.password)) errs.push({ field: 'password', message: 'Parola trebuie să conțină cel puțin o cifră' })
  }
  if (!v.confirmPassword) errs.push({ field: 'confirmPassword', message: 'Confirmarea parolei este obligatorie' })
  else if (v.password !== v.confirmPassword) errs.push({ field: 'confirmPassword', message: 'Parolele nu coincid' })
  if (!v.agreeToTerms) errs.push({ field: 'agreeToTerms', message: 'Trebuie să acceptați Termenii și Condițiile' })
  return errs
}

async function mockSignUp(v: SignUpValues): Promise<void> {
  await new Promise<void>(r => setTimeout(r, 1400))
  console.log('[mock] registered:', v.email)
}

export default function SignUpPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const t = authT[lang].signUp

  const onSubmit = useCallback(async (v: SignUpValues) => { await mockSignUp(v); navigate('/dashboard') }, [navigate])
  const { values, errors, serverError, isLoading, hasFieldError, handleChange, handleSubmit } = useAuthForm({ initialValues, validate, onSubmit })

  const allErrors = [...errors.map(e => e.message), ...(serverError ? [serverError] : [])]

  const panelStats = t.panelStats.map((s, i) => ({
    value: s.value,
    label: s.label,
    icon: [
      <svg key={i} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>,
      <svg key={i} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>,
      <svg key={i} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/></svg>,
    ][i],
  }))

  return (
    <AuthLayout panelTitle={t.panelTitle} panelSubtitle={t.panelSubtitle} panelStats={panelStats} panelQuote={t.panelQuote}>

      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">{t.title}</h1>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <FormInput label={t.firstName} type="text" placeholder={t.firstNamePlaceholder} autoComplete="given-name"
            value={values.firstName} onChange={handleChange('firstName')} hasError={hasFieldError('firstName')} />
          <FormInput label={t.lastName} type="text" placeholder={t.lastNamePlaceholder} autoComplete="family-name"
            value={values.lastName} onChange={handleChange('lastName')} hasError={hasFieldError('lastName')} />
        </div>

        <FormInput label={t.email} type="email" placeholder={t.emailPlaceholder} autoComplete="email"
          value={values.email} onChange={handleChange('email')} hasError={hasFieldError('email')}
          icon={<svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>}
        />

        <FormInput label={t.company} type="text" placeholder={t.companyPlaceholder} autoComplete="organization"
          optional value={values.company} onChange={handleChange('company')}
          icon={<svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"/></svg>}
        />

        <FormInput label={t.password} type="password" placeholder={t.passwordPlaceholder} autoComplete="new-password"
          value={values.password} onChange={handleChange('password')} hasError={hasFieldError('password')} showStrength
          icon={<svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>}
        />

        <FormInput label={t.confirmPassword} type="password" placeholder={t.confirmPasswordPlaceholder} autoComplete="new-password"
          value={values.confirmPassword} onChange={handleChange('confirmPassword')} hasError={hasFieldError('confirmPassword')}
          icon={<svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>}
        />

        <label className="flex cursor-pointer items-start gap-2.5">
          <div className="relative mt-0.5 flex-shrink-0">
            <input type="checkbox" className="peer sr-only" checked={values.agreeToTerms as boolean} onChange={handleChange('agreeToTerms')}/>
            <div className={`h-5 w-5 rounded-md border-2 bg-white peer-checked:bg-brand-600 dark:bg-slate-800 dark:peer-checked:bg-brand-600 ${hasFieldError('agreeToTerms') ? 'border-red-400' : 'border-slate-300 peer-checked:border-brand-600 dark:border-slate-600'}`}/>
            <svg className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
          </div>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            {t.terms}{' '}
            <a href="#" className="font-medium text-brand-600 hover:underline dark:text-brand-400">{t.termsLink}</a>
            {' '}{t.and}{' '}
            <a href="#" className="font-medium text-brand-600 hover:underline dark:text-brand-400">{t.privacyLink}</a>
          </span>
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
        {t.hasAccount}{' '}
        <Link to="/sign-in" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">{t.signIn}</Link>
      </p>
    </AuthLayout>
  )
}
