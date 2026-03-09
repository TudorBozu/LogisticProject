import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type Lang = 'EN' | 'RO'

interface LangContextType {
  lang: Lang
  toggleLang: () => void
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('EN')

  function toggleLang() {
    setLang(prev => (prev === 'EN' ? 'RO' : 'EN'))
  }

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
