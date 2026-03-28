import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Language, type Translations } from './translations'

interface LanguageContextType {
  lang: Language
  t: Translations
  toggleLanguage: () => void
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const STORAGE_KEY = 'doofengshui-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null
    return saved === 'en' || saved === 'ar' ? saved : 'ar' // default Arabic
  })

  const isRTL = lang === 'ar'
  const t = translations[lang]

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [lang, isRTL])

  const toggleLanguage = useCallback(() => {
    setLang(l => l === 'en' ? 'ar' : 'en')
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
