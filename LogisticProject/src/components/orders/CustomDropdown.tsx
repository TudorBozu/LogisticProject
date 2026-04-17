import { useState, useRef, useEffect, useCallback } from 'react'

interface Props {
  options: string[]
  value: string
  onChange: (val: string) => void
  placeholder?: string
  error?: boolean
}

export default function CustomDropdown({
  options, value, onChange, placeholder = 'Selectați…', error = false,
}: Props) {
  const [open, setOpen]   = useState(false)
  const [pos, setPos]     = useState<React.CSSProperties>({})
  const triggerRef        = useRef<HTMLButtonElement>(null)
  const menuRef           = useRef<HTMLDivElement>(null)

  const reposition = useCallback(() => {
    if (!triggerRef.current) return
    const r = triggerRef.current.getBoundingClientRect()
    setPos({ top: r.bottom + window.scrollY + 4, left: r.left + window.scrollX, width: r.width })
  }, [])

  const toggle = () => { if (!open) reposition(); setOpen(v => !v) }
  const select = (opt: string) => { onChange(opt); setOpen(false) }

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!triggerRef.current?.contains(e.target as Node) &&
          !menuRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  useEffect(() => {
    if (!open) return
    const repos = () => reposition()
    window.addEventListener('scroll', repos, true)
    return () => window.removeEventListener('scroll', repos, true)
  }, [open, reposition])

  const shown = value && value !== placeholder ? value : placeholder
  const isPlaceholder = !value || value === placeholder

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={toggle}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm text-left transition-colors outline-none
          ${error
            ? 'border-red-400 focus:ring-2 focus:ring-red-400/20'
            : open
              ? 'border-blue-500 ring-2 ring-blue-500/20'
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }
          bg-white dark:bg-slate-800`}
      >
        <span className={isPlaceholder ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-slate-100'}>
          {shown}
        </span>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{ position: 'fixed', zIndex: 9999, ...pos }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 max-h-52 overflow-y-auto animate-fade-up"
        >
          {options.map(opt => (
            <div
              key={opt}
              onMouseDown={() => select(opt)}
              className={`px-3 py-2 text-sm cursor-pointer transition-colors
                ${opt === value
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
