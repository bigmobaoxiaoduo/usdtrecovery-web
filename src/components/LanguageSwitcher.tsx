'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { Globe } from 'lucide-react'

export type Locale = 'zh' | 'en'

interface LanguageSwitcherProps {
  className?: string
  compact?: boolean
}

export default function LanguageSwitcher({ className = '', compact = false }: LanguageSwitcherProps) {
  const pathname = usePathname()
  
  const currentLocale: Locale = useMemo(() => {
    if (pathname?.startsWith('/en')) return 'en'
    return 'zh'
  }, [pathname])

  const getPathForLocale = (locale: Locale): string => {
    if (!pathname) return locale === 'zh' ? '/' : '/en'
    
    // Remove current locale prefix (/zh or /en)
    let pathWithoutLocale = pathname
    if (pathname.startsWith('/zh/')) {
      pathWithoutLocale = pathname.slice(3) // Remove '/zh'
    } else if (pathname === '/zh') {
      pathWithoutLocale = '/'
    } else if (pathname.startsWith('/en/')) {
      pathWithoutLocale = pathname.slice(3) // Remove '/en'
    } else if (pathname === '/en') {
      pathWithoutLocale = '/'
    }
    
    // Add new locale prefix
    if (locale === 'en') {
      return `/en${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
    }
    return pathWithoutLocale
  }

  const locales: { code: Locale; label: string; shortLabel: string }[] = useMemo(
    () => [
      { code: 'zh', label: '中文', shortLabel: 'ZH' },
      { code: 'en', label: 'English', shortLabel: 'EN' },
    ],
    []
  )

  if (compact) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        {locales.map((loc, index) => (
          <span key={loc.code} className="flex items-center">
            <Link
              href={getPathForLocale(loc.code)}
              className={`
                px-2 py-1 text-xs font-medium rounded transition-all duration-200
                ${currentLocale === loc.code
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }
              `}
            >
              {loc.shortLabel}
            </Link>
            {index < locales.length - 1 && (
              <span className="text-slate-600 mx-1">|</span>
            )}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="w-4 h-4 text-slate-400" />
      <div className="flex items-center bg-slate-800/50 rounded-lg p-1">
        {locales.map((loc) => (
          <Link
            key={loc.code}
            href={getPathForLocale(loc.code)}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200
              ${currentLocale === loc.code
                ? 'text-white bg-blue-600 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }
            `}
          >
            {loc.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
