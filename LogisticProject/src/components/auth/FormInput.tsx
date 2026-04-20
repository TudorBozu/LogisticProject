import type { InputHTMLAttributes } from 'react'
import { useState, forwardRef } from 'react'
import { useLang } from '../../context/LangContext'
import { authT } from '../../data/authTranslations'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    hasError?: boolean   // highlights border red (error detail is in the list below)
    optional?: boolean   // shows "(optional)" label
    hint?: string
    icon?: React.ReactNode
    showStrength?: boolean
}

function getStrength(pw: string, labels: readonly string[]): { score: number; label: string; color: string } {
    if (!pw) return { score: 0, label: '', color: '' }
    const checks = [pw.length >= 8, /[A-Z]/.test(pw), /[a-z]/.test(pw), /\d/.test(pw), /[^A-Za-z0-9]/.test(pw)]
    const score = checks.filter(Boolean).length
    const colors = ['', '#ef4444', '#f97316', '#eab308', '#6366f1', '#10b981']
    return { score, label: labels[score], color: colors[score] }
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, hasError, optional, hint, icon, type, showStrength, className = '', ...props }, ref) => {
        const [showPw, setShowPw] = useState(false)
        const isPassword = type === 'password'
        const resolvedType = isPassword ? (showPw ? 'text' : 'password') : type
        const { lang } = useLang()
        const ft = authT[lang].form
        const strength = showStrength ? getStrength(String(props.value ?? ''), ft.passwordStrength) : null

        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {label}
                    {optional && <span className="ml-1 font-normal text-slate-400 dark:text-slate-500">{ft.optional}</span>}
                </label>

                <div className="relative">
                    {icon && (
                        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
              {icon}
            </span>
                    )}

                    <input
                        ref={ref}
                        type={resolvedType}
                        className={`
              theme-transition w-full rounded-xl border py-3 text-sm outline-none
              bg-white text-slate-800 placeholder:text-slate-400
              dark:bg-slate-800/60 dark:text-slate-100 dark:placeholder:text-slate-500
              ${icon ? 'pl-10 pr-4' : 'px-4'}
              ${isPassword ? '!pr-11' : ''}
              ${hasError
                            ? 'border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.14)] dark:border-red-500/60'
                            : 'border-slate-200 hover:border-slate-300 focus:border-brand-500 focus:shadow-input dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-brand-400'}
              ${className}
            `}
                        {...props}
                    />

                    {isPassword && (
                        <button type="button" tabIndex={-1} onClick={() => setShowPw(v => !v)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
                            {showPw ? (
                                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                            ) : (
                                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
                            )}
                        </button>
                    )}
                </div>

                {/* Password strength bar */}
                {showStrength && strength && strength.score > 0 && (
                    <div className="flex items-center gap-2 pt-0.5">
                        <div className="flex flex-1 gap-1">
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                                     style={{ background: i <= strength.score ? strength.color : '#e2e8f0' }}/>
                            ))}
                        </div>
                        <span className="text-[11px] font-medium" style={{ color: strength.color }}>{strength.label}</span>
                    </div>
                )}

                {hint && <p className="text-xs text-slate-400 dark:text-slate-500">{hint}</p>}
            </div>
        )
    }
)

FormInput.displayName = 'FormInput'
export default FormInput
