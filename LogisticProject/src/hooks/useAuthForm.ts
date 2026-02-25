import { useState, useCallback, useRef } from 'react'

export interface FieldError {
  field: string
  message: string
}

type Validator<T> = (values: T) => FieldError[]

interface UseAuthFormOptions<T> {
  initialValues: T
  validate: Validator<T>
  onSubmit: (values: T) => Promise<void>
}

export function useAuthForm<T extends Record<string, string | boolean>>({
  initialValues,
  validate,
  onSubmit,
}: UseAuthFormOptions<T>) {
  const [values, setValues]           = useState<T>(initialValues)
  const [errors, setErrors]           = useState<FieldError[]>([])
  const [isLoading, setIsLoading]     = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  // Stable refs so callbacks don't go stale
  const valuesRef   = useRef<T>(values)
  const validateRef = useRef<Validator<T>>(validate)
  const onSubmitRef = useRef<(v: T) => Promise<void>>(onSubmit)
  valuesRef.current   = values
  validateRef.current = validate
  onSubmitRef.current = onSubmit

  const hasFieldError = useCallback(
    (field: string) => errors.some(e => e.field === field),
    [errors]
  )

  // Stable handleChange — only clears the error for the changed field
  const handleChange = useCallback(
    (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setValues(prev => ({ ...prev, [field]: value }))
      setErrors(prev => prev.filter(err => err.field !== String(field)))
      setServerError(null)
    },
    []
  )

  // Stable handleSubmit — reads latest values from ref
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError(null)

    const latest  = valuesRef.current
    const errs    = validateRef.current(latest)

    if (errs.length > 0) {
      setErrors(errs)
      return
    }

    setErrors([])
    setIsLoading(true)
    try {
      await onSubmitRef.current(latest)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Ceva nu a mers. Încercați din nou.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { values, errors, isLoading, serverError, hasFieldError, handleChange, handleSubmit }
}
