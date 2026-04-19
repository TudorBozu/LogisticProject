import { useState, useCallback, useEffect } from 'react'
import type { DriverProfile, DriverProfileFormData, DriverProfileErrors } from '../../types/driver'
import { validateProfileForm } from '../../services/driverService'

interface Props {
  profile: DriverProfile
  onSave: (data: DriverProfileFormData) => void
  onClose: () => void
}

export default function DriverProfileModal({ profile, onSave, onClose }: Props) {
  const [form, setForm] = useState<DriverProfileFormData>({
    phone: profile.phone ?? '',
    truckPlate: profile.truckPlate ?? '',
  })
  const [errors, setErrors] = useState<DriverProfileErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof DriverProfileFormData, boolean>>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setForm({ phone: profile.phone ?? '', truckPlate: profile.truckPlate ?? '' })
    setErrors({})
    setTouched({})
  }, [profile])

  const handleChange = useCallback((field: keyof DriverProfileFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setTouched(prev => ({ ...prev, [field]: true }))
  }, [])

  const handleBlur = useCallback(
    (field: keyof DriverProfileFormData) => {
      setTouched(prev => ({ ...prev, [field]: true }))
      setErrors(validateProfileForm({ ...form }))
    },
    [form]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setTouched({ phone: true, truckPlate: true })
      const errs = validateProfileForm(form)
      setErrors(errs)
      if (Object.keys(errs).length > 0) return
      setSaving(true)
      await new Promise(r => setTimeout(r, 600))
      onSave(form)
      setSaving(false)
    },
    [form, onSave]
  )

  function fieldErr(f: keyof DriverProfileFormData) {
    return touched[f] ? errors[f] : undefined
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
            Editează profilul
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">
          <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-xs text-blue-700 dark:text-blue-300">
            Poți actualiza numărul de telefon și plăcuța camionului. Alte modificări necesită contactul administratorului.
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
              Telefon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              placeholder="+373 79 123 456"
              className={inputCls(!!fieldErr('phone'))}
            />
            {fieldErr('phone') && (
              <p className="text-xs text-red-500 dark:text-red-400">{fieldErr('phone')}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">
              Plăcuță camion <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.truckPlate}
              onChange={e => handleChange('truckPlate', e.target.value)}
              onBlur={() => handleBlur('truckPlate')}
              placeholder="ex: GL-12 ABC"
              className={inputCls(!!fieldErr('truckPlate'))}
            />
            {fieldErr('truckPlate') && (
              <p className="text-xs text-red-500 dark:text-red-400">{fieldErr('truckPlate')}</p>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Anulează
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white transition-colors flex items-center justify-center gap-2"
            >
              {saving && (
                <svg className="animate-spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {saving ? 'Se salvează…' : 'Salvează'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function inputCls(hasError: boolean) {
  return `w-full px-3 py-2.5 text-sm rounded-xl border transition-colors bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none ${
    hasError
      ? 'border-red-400 dark:border-red-600 focus:border-red-500'
      : 'border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-600'
  }`
}
