'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { getCookieConsent, type CookieConsent } from './CookieConsent'

// Google Analytics 测量ID
const GA_MEASUREMENT_ID = 'G-5NC9ZZECXF'

interface GoogleAnalyticsProps {
  // 是否强制加载（用于测试）
  forceLoad?: boolean
}

// 扩展Window接口
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export default function GoogleAnalytics({ forceLoad = false }: GoogleAnalyticsProps) {
  const [consent, setConsent] = useState<CookieConsent>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // 检查当前同意状态
    const currentConsent = getCookieConsent()
    setConsent(currentConsent)

    // 监听同意状态变化（通过自定义事件）
    const handleConsentChange = (e: CustomEvent<CookieConsent>) => {
      setConsent(e.detail)
      
      // 如果用户接受，更新GA同意状态
      if (e.detail === 'accepted' && typeof window !== 'undefined' && window.gtag) {
        const gtag = window.gtag
        gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'denied',
        })
      }
    }

    window.addEventListener('cookie-consent-change', handleConsentChange as EventListener)
    
    return () => {
      window.removeEventListener('cookie-consent-change', handleConsentChange as EventListener)
    }
  }, [])

  // 如果组件未挂载，返回null
  if (!isMounted) return null

  // 判断是否加载GA：用户接受 或 强制加载
  const _shouldLoadGA = forceLoad || consent === 'accepted'

  return (
    <>
      {/* 始终加载gtag脚本，但使用默认拒绝模式 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // 默认拒绝所有Cookie
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
          
          // 配置GA
          gtag('config', '${GA_MEASUREMENT_ID}', {
            'anonymize_ip': true,
            'allow_google_signals': false,
            'allow_ad_personalization_signals': false,
            'restricted_data_processing': true
          });
          
          // 如果用户已接受，更新同意状态
          ${consent === 'accepted' ? `
          gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
          ` : ''}
        `}
      </Script>
    </>
  )
}

// 用于在客户端更新同意状态的工具函数
export function updateGAConsent(consent: CookieConsent) {
  if (typeof window === 'undefined') return
  
  const gtag = window.gtag
  if (!gtag) return

  if (consent === 'accepted') {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
    })
  } else {
    // 如果用户拒绝，保持拒绝状态（或可以额外清除已收集的数据）
    gtag('consent', 'update', {
      analytics_storage: 'denied',
    })
  }
}
