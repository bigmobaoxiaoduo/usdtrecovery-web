'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import zh from '@/locales/zh.json'
import en from '@/locales/en.json'

const translations = { zh, en }

export type Locale = 'zh' | 'en'

export function useTranslation() {
  const pathname = usePathname()
  
  // Detect locale from pathname
  const locale: Locale = useMemo(() => {
    if (pathname?.startsWith('/en')) return 'en'
    return 'zh'
  }, [pathname])

  const t = useCallback(
    (key: string): any => {
      const keys = key.split('.')
      let value: unknown = translations[locale]

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k]
        } else {
          // Fallback to zh if key not found
          let fallback: unknown = translations['zh']
          for (const fk of keys) {
            if (fallback && typeof fallback === 'object' && fk in fallback) {
              fallback = (fallback as Record<string, unknown>)[fk]
            } else {
              return key
            }
          }
          value = fallback
          break
        }
      }

      return value
    },
    [locale]
  )

  return useMemo(
    () => ({
      t,
      locale,
      isZh: locale === 'zh',
      isEn: locale === 'en',
    }),
    [t, locale]
  )
}

export function useLocale(): Locale {
  const pathname = usePathname()
  return useMemo(() => {
    if (pathname?.startsWith('/en')) return 'en'
    return 'zh'
  }, [pathname])
}
