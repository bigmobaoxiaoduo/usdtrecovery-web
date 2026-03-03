'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Shield } from 'lucide-react'
import Link from 'next/link'

// Cookie同意状态类型
type CookieConsent = 'accepted' | 'rejected' | null

// localStorage key
const COOKIE_CONSENT_KEY = 'cookie-consent'

interface CookieConsentBannerProps {
  onConsentChange?: (consent: CookieConsent) => void
}

export default function CookieConsentBanner({ onConsentChange }: CookieConsentBannerProps) {
  const [hasConsent, setHasConsent] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // 组件挂载后检查localStorage
  useEffect(() => {
    setIsMounted(true)
    
    try {
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsent
      if (storedConsent) {
        setHasConsent(true)
        onConsentChange?.(storedConsent)
      } else {
        // 首次访问，延迟显示banner以获得更好的用户体验
        const timer = setTimeout(() => {
          setIsVisible(true)
        }, 1000)
        return () => clearTimeout(timer)
      }
    } catch {
      // 如果localStorage不可用（如隐私模式），默认显示banner
      setIsVisible(true)
    }
  }, [onConsentChange])

  // 处理接受
  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
      setHasConsent(true)
      setIsVisible(false)
      onConsentChange?.('accepted')
      // 触发自定义事件通知其他组件
      window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: 'accepted' }))
    } catch (_err) {
      console.warn('无法保存Cookie同意状态')
    }
  }

  // 处理拒绝
  const handleReject = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected')
      setHasConsent(true)
      setIsVisible(false)
      onConsentChange?.('rejected')
      // 触发自定义事件通知其他组件
      window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: 'rejected' }))
    } catch (_err) {
      console.warn('无法保存Cookie同意状态')
    }
  }

  // 关闭banner（用户点击X）- 这种情况下我们不记录选择，下次访问仍会显示
  const handleClose = () => {
    setIsVisible(false)
    // 24小时后再次显示
    setTimeout(() => {
      try {
        const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
        if (!storedConsent) {
          setIsVisible(true)
        }
      } catch {
        // 忽略错误
      }
    }, 24 * 60 * 60 * 1000)
  }

  // 如果组件未挂载，返回null以避免hydration不匹配
  if (!isMounted) return null

  // 已经有同意选择，不显示banner
  if (hasConsent) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie同意通知"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-slate-900/95 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
              {/* 顶部装饰条 */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />
              
              <div className="p-5 sm:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  {/* 左侧：图标和文案 */}
                  <div className="flex-1 flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Cookie className="w-6 h-6 text-blue-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">Cookie设置</h3>
                        <Shield className="w-4 h-4 text-green-400" aria-hidden="true" />
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        我们使用Cookie和类似技术来改善您的浏览体验、分析网站流量并个性化内容。
                        点击&quot;接受&quot;即表示您同意我们使用Cookie。
                        <Link 
                          href="/privacy" 
                          className="text-blue-400 hover:text-blue-300 underline underline-offset-2 ml-1 transition-colors"
                          onClick={() => setIsVisible(false)}
                        >
                          了解更多
                        </Link>
                      </p>
                    </div>
                  </div>
                  
                  {/* 右侧：按钮组 */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:flex-shrink-0">
                    <button
                      onClick={handleAccept}
                      className="order-2 sm:order-1 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 whitespace-nowrap"
                      aria-label="接受Cookie"
                    >
                      接受
                    </button>
                    <button
                      onClick={handleReject}
                      className="order-3 sm:order-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg border border-slate-700 transition-all duration-200 hover:border-slate-600 active:scale-95 whitespace-nowrap"
                      aria-label="拒绝Cookie"
                    >
                      拒绝
                    </button>
                    <button
                      onClick={handleClose}
                      className="order-1 sm:order-3 sm:ml-2 p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-all duration-200 self-end sm:self-center"
                      aria-label="关闭通知"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* 底部：类型说明 */}
                <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span>必要Cookie（始终启用）</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>分析Cookie（需同意）</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// 导出工具函数
export function getCookieConsent(): CookieConsent {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsent
  } catch {
    return null
  }
}

export function setCookieConsent(consent: CookieConsent) {
  if (typeof window === 'undefined') return
  try {
    if (consent) {
      localStorage.setItem(COOKIE_CONSENT_KEY, consent)
    } else {
      localStorage.removeItem(COOKIE_CONSENT_KEY)
    }
  } catch {
    // 忽略localStorage错误
  }
}

export { COOKIE_CONSENT_KEY }
export type { CookieConsent }
