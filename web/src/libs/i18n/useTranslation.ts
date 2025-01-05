// packages
import { create } from 'zustand'

// libs
import { translations } from '@/libs/i18n/translations'

// types
type LanguageProps = 'pt-BR' | 'en-US'
type TranslationKeyProps = keyof (typeof translations)['pt-BR']

interface I18nStore {
  language: LanguageProps
  setLanguage: (language: LanguageProps) => void
  t: (key: string) => string
}

export const useI18n = create<I18nStore>((set, get) => ({
  language: 'pt-BR',
  setLanguage: (language: LanguageProps) => set({ language }),
  t: (key: string) => {
    const { language } = get()
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
        if (typeof value === 'string') break
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    return value as string
  }
}))
