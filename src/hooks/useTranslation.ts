'use client'

import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import zh from '@/locales/zh.json'
import en from '@/locales/en.json'

const translations = { zh, en }

export type Locale = 'zh' | 'en'

export function useTranslation() {
  const router = useRouter()
  const locale = (router.locale as Locale) || 'zh'

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
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

      if (typeof value !== 'string') {
        return key
      }

      // Variable interpolation
      if (vars) {
        return value.replace(/\{\{(\w+)\}\}/g, (_, varKey) => {
          return String(vars[varKey] ?? `{{${varKey}}}`)
        })
      }

      return value
    },
    [locale]
  )

  const changeLocale = useCallback(
    (newLocale: Locale) => {
      const { pathname, asPath, query } = router
      router.push({ pathname, query }, asPath, { locale: newLocale })
    },
    [router]
  )

  return useMemo(
    () => ({
      t,
      locale,
      changeLocale,
      isZh: locale === 'zh',
      isEn: locale === 'en',
    }),
    [t, locale, changeLocale]
  )
}

export function useLocale(): Locale {
  const router = useRouter()
  return (router.locale as Locale) || 'zh'
}
