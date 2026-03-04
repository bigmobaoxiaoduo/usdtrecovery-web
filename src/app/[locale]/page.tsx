'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Shield, TrendingUp, Users, Clock, ArrowRight, CheckCircle, Menu, X } from 'lucide-react'
import { useEffect, useState, useRef, useMemo, lazy, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/components/Logo'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { useTranslation } from '@/hooks/useTranslation'

// 动态导入非首屏组件
const CaseTable = lazy(() => import('@/components/CaseTable'))
const TestimonialsSection = lazy(() => import('@/components/Testimonials'))
const ConsultationModal = lazy(() => import('@/components/ConsultationModal'))

// 简单的加载占位符
function SectionSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-slate-800/30 ${className}`}>
      <div className="h-8 w-48 bg-slate-700/50 rounded mx-auto mb-4" />
      <div className="h-4 w-64 bg-slate-700/50 rounded mx-auto" />
    </div>
  )
}

import type { FormData } from '@/components/ConsultationForm'

// 简化的数字动画 - 使用CSS动画替代JS动画，只在桌面端启用
function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [isDesktop, setIsDesktop] = useState(false)
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768)
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isDesktop || hasAnimated.current) return
    hasAnimated.current = true

    const duration = 1200
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - (1 - progress) * (1 - progress)
      setCount(Math.floor(value * easeOut))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, isDesktop])

  if (!isDesktop) {
    return <span>{prefix}{value}{suffix}</span>
  }

  return <span>{prefix}{count}{suffix}</span>
}

// 公链图标组件
function ChainIcon({ chain }: { chain: string }) {
  const icons: Record<string, React.ReactNode> = {
    'BTC': (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <path d="M22.6 12.9c.4-2.7-1.7-4.2-4.5-5.1l.9-3.7-2.3-.6-.9 3.6c-.6-.1-1.2-.3-1.9-.4l.9-3.6-2.3-.6-.9 3.7c-.5-.1-1-.2-1.5-.3l-3.2-.8-.6 2.5s1.7.4 1.7.4c.9.2 1.1.8.8 1.5l-1.9 7.6c.1 0 .2 0 .3.1l-.3-.1-2.6 10.6c-.2.5-.7 1.3-1.8 1l-1.7-.4-.9 2.9 3 .8c.6.1 1.1.3 1.7.4l-1 3.8 2.3.6 1-3.7c.6.2 1.2.3 1.9.5l-.9 3.7 2.3.6.9-3.7c4 .8 7-1.5 7.8-5.1.6-2.9-.1-4.6-2.1-5.7 1.5-.3 2.6-1.3 2.9-3.3zm-5.1 7.2c-.4 2.1-3.6 1-4.7.7l.8-3.3c1.1.3 4.3.8 3.9 2.6zm.4-7.3c-.4 1.8-2.9.9-3.7.7l.7-3c.8.2 3.4.6 3 2.3z"/>
      </svg>
    ),
    'ETH': (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z"/>
      </svg>
    ),
    'USDT': (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <path d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm-2.573-8V8h5.146v16h-5.146zm0 0" fillRule="evenodd"/>
        <path d="M24.5 13.5c0-2.5-2-4.5-4.5-4.5h-8c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5h8c2.5 0 4.5-2 4.5-4.5z" fillOpacity=".5"/>
      </svg>
    ),
    'SOL': (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <path d="M4 8l8.5-8L24 11.5l-8.5 8L4 8zm0 16l8.5 8L24 20.5l-8.5-8L4 24z"/>
      </svg>
    ),
    'BNB': (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-3.5-16l3.5-3.5 3.5 3.5-3.5 3.5L12.5 16zM16 6.5l-5.5 5.5L16 17.5l5.5-5.5L16 6.5zM5.5 17l3.5 3.5L12.5 17 9 13.5 5.5 17zm10.5 8.5l-5.5-5.5L16 15l5.5 5.5-5.5 5.5zm6.5-8.5l3.5 3.5L26.5 17 23 13.5 22.5 17zm-3.5-3.5L22.5 10 19 6.5 15.5 10l3.5 3.5z"/>
      </svg>
    ),
    'TRON': (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-2.5-8V8l10 8-10 8z"/>
      </svg>
    ),
    'ARB': (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-4-20l4-2.5 4 2.5v5l-4 2.5-4-2.5v-5z"/>
        <circle cx="16" cy="16" r="4" fillOpacity=".3"/>
      </svg>
    ),
    'OP': (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="16" cy="16" r="5"/>
        <path d="M16 2v6M16 24v6M2 16h6M24 16h6" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    'AVAX': (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <path d="M16 2l12 26H4L16 2zm0 6l-8 17h16L16 8z"/>
      </svg>
    ),
    'Polygon': (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <path d="M16 2l12.5 7v14L16 30 3.5 23V9L16 2zm0 4L7 12v8l9 5 9-5v-8l-9-5z"/>
      </svg>
    ),
    'Base': (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="3"/>
        <ellipse cx="16" cy="16" rx="8" ry="8"/>
      </svg>
    ),
    'Fantom': (
      <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor">
        <path d="M16 2L4 9v14l12 7 12-7V9L16 2zm-8 9l8-4 8 4-8 4-8-4zm0 3l8 4 8-4v6l-8 4-8-4v-6z"/>
      </svg>
    ),
  }

  return icons[chain] || <span className="text-lg">🔗</span>
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined)
  const { t, locale } = useTranslation()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // 阻止滚动穿透
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // 打开咨询弹窗
  const openConsultation = (plan?: string) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  // 关闭咨询弹窗
  const closeConsultation = () => {
    setIsModalOpen(false)
    setSelectedPlan(undefined)
  }

  // 处理表单提交
  const handleFormSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    // 可以在这里添加其他提交逻辑，如发送到服务器
  }

  // 使用useMemo缓存数据，避免重复创建
  const stats = useMemo(() => [
    { label: t('hero.stats.completedCases'), value: 357, suffix: '+', icon: Shield },
    { label: t('hero.stats.recoveredAssets'), value: 35, suffix: 'M+', prefix: '$', icon: TrendingUp },
    { label: t('hero.stats.successRate'), value: 57, suffix: '%', icon: Users },
    { label: t('hero.stats.avgResponse'), value: 2, suffix: locale === 'zh' ? '小时' : 'h', icon: Clock },
  ], [t, locale])

  const services = useMemo(() => [
    { icon: '🔒', title: t('services.items.usdtStolen.title'), desc: t('services.items.usdtStolen.desc') },
    { icon: '🛡️', title: t('services.items.web3Scam.title'), desc: t('services.items.web3Scam.desc') },
    { icon: '🌐', title: t('services.items.rugPull.title'), desc: t('services.items.rugPull.desc') },
    { icon: '💼', title: t('services.items.exchangeFrozen.title'), desc: t('services.items.exchangeFrozen.desc') },
    { icon: '⚖️', title: t('services.items.bankFrozen.title'), desc: t('services.items.bankFrozen.desc') },
    { icon: '📋', title: t('services.items.summoned.title'), desc: t('services.items.summoned.desc') },
  ], [t])

  const process = useMemo(() => [
    { step: '01', title: t('process.steps.step1.title'), desc: t('process.steps.step1.desc'), detail: t('process.steps.step1.detail') },
    { step: '02', title: t('process.steps.step2.title'), desc: t('process.steps.step2.desc'), detail: t('process.steps.step2.detail') },
    { step: '03', title: t('process.steps.step3.title'), desc: t('process.steps.step3.desc'), detail: t('process.steps.step3.detail') },
    { step: '04', title: t('process.steps.step4.title'), desc: t('process.steps.step4.desc'), detail: t('process.steps.step4.detail') },
  ], [t])

  // 公链数据 - 带图标和显示名称
  const chains = useMemo(() => [
    { id: 'BTC', name: 'Bitcoin' },
    { id: 'ETH', name: 'Ethereum' },
    { id: 'USDT', name: 'USDT' },
    { id: 'SOL', name: 'Solana' },
    { id: 'BNB', name: 'BNB Chain' },
    { id: 'TRON', name: 'TRON' },
    { id: 'ARB', name: 'Arbitrum' },
    { id: 'OP', name: 'Optimism' },
    { id: 'AVAX', name: 'Avalanche' },
    { id: 'Polygon', name: 'Polygon' },
    { id: 'Base', name: 'Base' },
    { id: 'Fantom', name: 'Fantom' },
  ], [])



  const navLinks = useMemo(() => [
    { href: '#services', label: t('nav.services') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#process', label: t('nav.process') },
    { href: '#chains', label: t('nav.chains') },
    { href: '/about', label: t('nav.about'), isPage: true },
    { href: '/blog', label: t('nav.blog'), isPage: true },
  ], [t])

  // Helper function to safely get array from translation
  const getFeatures = (key: string): string[] => {
    const features = t(key);
    return Array.isArray(features) ? features : [];
  };

  const whyChooseItems = useMemo(() => getFeatures('whyChooseUs.features'), [t]);

  const partners = useMemo(() => [
    { name: locale === 'zh' ? '币安' : 'Binance', logo: '/images/partners/binance.svg', width: 40, height: 40 },
    { name: 'TikTok', logo: '/images/partners/tiktok.svg', width: 40, height: 40 },
    { name: locale === 'zh' ? '腾讯' : 'Tencent', logo: '/images/partners/tencent.svg', width: 40, height: 40 },
    { name: locale === 'zh' ? '北京大学' : 'Peking University', logo: '/images/partners/peking-university.svg', width: 40, height: 40 },
    { name: locale === 'zh' ? '北京邮电大学' : 'BUPT', logo: '/images/partners/bupt.svg', width: 40, height: 40 },
    { name: locale === 'zh' ? '中国科学院' : 'CAS', logo: '/images/partners/cas.svg', width: 40, height: 40 },
    { name: locale === 'zh' ? '德勤' : 'Deloitte', logo: '/images/partners/deloitte.svg', width: 40, height: 40 },
  ], [locale])

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Consultation Modal */}
      <Suspense fallback={null}>
        <ConsultationModal
          isOpen={isModalOpen}
          onClose={closeConsultation}
          onSubmit={handleFormSubmit}
          defaultPlan={selectedPlan}
        />
      </Suspense>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white hover:brightness-125 transition-all duration-200 py-2 px-3 rounded-lg hover:bg-slate-800/50"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => openConsultation()}
                className="bg-blue-600 hover:bg-blue-500 hover:brightness-110 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95"
              >
                {t('nav.consult')}
              </button>
              <LanguageSwitcher compact />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white transition-all duration-200 active:scale-95 touch-manipulation"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              type="button"
            >
              <div className="relative w-6 h-6">
                <Menu className={`w-6 h-6 absolute inset-0 transition-all duration-200 ${isMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`} />
                <X className={`w-6 h-6 absolute inset-0 transition-all duration-200 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence mode="wait">
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden bg-slate-950 border-b border-slate-800 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 px-4 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-200 active:scale-[0.98]"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    openConsultation()
                  }}
                  className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 text-center mt-4 active:scale-[0.98] hover:shadow-lg hover:shadow-blue-500/25"
                >
                  {t('nav.consult')}
                </button>
                <div className="pt-4 border-t border-slate-800 flex justify-center">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* 深色背景 */}
        <div className="absolute inset-0 bg-slate-950" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className={`text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-300">{t('hero.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title1')}
              <br />
              <span className="gradient-text">{t('hero.title2')}</span>
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => openConsultation()}
                className="bg-blue-600 hover:bg-blue-500 hover:brightness-110 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-95 inline-flex items-center justify-center gap-2"
              >
                {t('hero.ctaPrimary')}
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <a href="#process" className="bg-slate-800 hover:bg-slate-700 hover:brightness-110 text-white font-semibold py-4 px-8 rounded-lg border border-slate-700 transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-0.5 active:scale-95">
                {t('hero.ctaSecondary')}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 text-center transition-all duration-300 hover:bg-slate-800/60 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${200 + index * 50}ms` }}
                >
                  <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('services.title')}</h2>
            <p className="text-slate-300">{t('services.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:bg-slate-800/60 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 group cursor-pointer"
              >
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2 transition-colors duration-200 group-hover:text-blue-400">{service.title}</h3>
                <p className="text-slate-300 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Services CTA */}
          <div className="text-center mt-10">
            <button
              onClick={() => openConsultation()}
              className="bg-slate-800 hover:bg-slate-700 hover:brightness-110 text-white font-semibold py-3 px-8 rounded-lg border border-slate-700 transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-0.5 active:scale-95"
            >
              {t('services.learnMore')}
            </button>
          </div>
        </div>
      </section>

      {/* CaseTable */}
      <Suspense fallback={<SectionSkeleton className="py-20 max-w-6xl mx-auto" />}>
        <CaseTable />
      </Suspense>

      {/* Process Section */}
      <section id="process" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('process.title')}</h2>
            <p className="text-slate-300">{t('process.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <div
                key={step.step}
                className="relative bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 h-full transition-all duration-300 hover:bg-slate-800/60 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="absolute top-4 right-4 text-5xl font-bold text-blue-500/10">
                  {step.step}
                </div>

                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-700" />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <span className="text-blue-400 font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-300 text-sm mb-3">{step.desc}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chains Section */}
      <section id="chains" className="py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('chains.title')}</h2>
            <p className="text-slate-300">{t('chains.subtitle')}</p>
          </div>

          {/* Marquee */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee hover:[animation-play-state:paused]">
              {chains.map((chain) => (
                <div
                  key={`${chain.id}`}
                  className="flex-shrink-0 mx-3"
                >
                  <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-3 transition-all duration-300 hover:bg-slate-800 hover:border-blue-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10">
                    <div className="text-slate-300">
                      <ChainIcon chain={chain.id} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-200 font-medium whitespace-nowrap">{chain.id}</span>
                      <span className="text-slate-400 text-xs whitespace-nowrap">{chain.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile fallback */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:hidden">
            {chains.slice(0, 6).map((chain) => (
              <div
                key={chain.id}
                className="flex items-center gap-2 bg-slate-800/30 border border-slate-700 rounded-lg px-3 py-2"
              >
                <span className="text-slate-300">
                  <ChainIcon chain={chain.id} />
                </span>
                <span className="text-slate-300 text-sm">{chain.id}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('pricing.title')}</h2>
            <p className="text-slate-300">{t('pricing.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Free Plan */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="text-sm text-blue-400 mb-2">{t('pricing.plans.free.name')}</div>
              <div className="text-3xl font-bold mb-2">{t('pricing.plans.free.price')}</div>
              <p className="text-slate-300 text-sm mb-4">{t('pricing.plans.free.desc')}</p>
              <ul className="text-sm text-slate-300 space-y-2 mb-6">
                {getFeatures('pricing.plans.free.features').map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openConsultation(t('pricing.plans.free.name'))}
                className="block w-full text-center bg-slate-700 hover:bg-slate-600 hover:brightness-110 text-white font-semibold py-3 rounded-lg transition-all duration-200 active:scale-95"
              >
                {t('pricing.plans.free.cta')}
              </button>
            </div>

            {/* Basic Plan */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="text-sm text-blue-400 mb-2">{t('pricing.plans.basic.name')}</div>
              <div className="text-3xl font-bold mb-2">{t('pricing.plans.basic.price')}</div>
              <p className="text-slate-300 text-sm mb-4">{t('pricing.plans.basic.desc')}</p>
              <ul className="text-sm text-slate-300 space-y-2 mb-6">
                {getFeatures('pricing.plans.basic.features').map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openConsultation(t('pricing.plans.basic.name'))}
                className="block w-full text-center bg-blue-600 hover:bg-blue-500 hover:brightness-110 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
              >
                {t('pricing.plans.basic.cta')}
              </button>
            </div>

            {/* Pro Plan - Recommended */}
            <div className="relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-2 border-blue-500/50 rounded-xl p-6 transition-all duration-300 hover:border-blue-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                {t('pricing.plans.pro.badge')}
              </div>

              <div className="text-sm text-blue-400 mb-2 font-medium">{t('pricing.plans.pro.name')}</div>
              <div className="text-3xl font-bold mb-1">{t('pricing.plans.pro.price')}</div>
              <div className="text-sm text-slate-400 line-through mb-3">{t('pricing.plans.pro.originalPrice')}</div>
              <p className="text-slate-300 text-sm mb-4">{t('pricing.plans.pro.desc')}</p>
              <ul className="text-sm text-slate-300 space-y-2 mb-6">
                {getFeatures('pricing.plans.pro.features').map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openConsultation(t('pricing.plans.pro.name'))}
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/40 active:scale-95"
              >
                {t('pricing.plans.pro.cta')}
              </button>
            </div>

            {/* VIP Plan */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="text-sm text-blue-400 mb-2">{t('pricing.plans.vip.name')}</div>
              <div className="text-3xl font-bold mb-2">{t('pricing.plans.vip.price')}</div>
              <p className="text-slate-300 text-sm mb-4">{t('pricing.plans.vip.desc')}</p>
              <ul className="text-sm text-slate-300 space-y-2 mb-6">
                {getFeatures('pricing.plans.vip.features').map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openConsultation(t('pricing.plans.vip.name'))}
                className="block w-full text-center bg-slate-700 hover:bg-slate-600 hover:brightness-110 text-white font-semibold py-3 rounded-lg transition-all duration-200 active:scale-95"
              >
                {t('pricing.plans.vip.cta')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 风险提示 */}
      <div className="bg-slate-900/30 py-4">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs text-slate-400">
            {locale === 'zh'
              ? '* 服务结果因案情而异，不保证100%追回成功率。我们承诺尽最大努力为您提供专业服务。'
              : '* Service results vary depending on case circumstances. We do not guarantee 100% recovery success rate. We promise to do our best to provide professional services.'}
          </p>
        </div>
      </div>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('team.title')}</h2>
            <p className="text-slate-300">{t('team.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center transition-all duration-300 hover:-translate-y-1 p-4 rounded-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('team.experts.security.title')}</h3>
              <p className="text-slate-300 text-sm">{t('team.experts.security.desc')}</p>
            </div>

            <div className="text-center transition-all duration-300 hover:-translate-y-1 p-4 rounded-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('team.experts.judicial.title')}</h3>
              <p className="text-slate-300 text-sm">{t('team.experts.judicial.desc')}</p>
            </div>

            <div className="text-center transition-all duration-300 hover:-translate-y-1 p-4 rounded-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('team.experts.legal.title')}</h3>
              <p className="text-slate-300 text-sm">{t('team.experts.legal.desc')}</p>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-8">
            <h3 className="text-center text-xl font-semibold mb-3">{t('team.background')}</h3>
            <p className="text-center text-slate-400 mb-8">{t('team.bgDesc')}</p>

            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {partners.map((company, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-700/70 flex items-center justify-center shadow-lg shadow-slate-900/50 overflow-hidden">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={company.width}
                      height={company.height}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-slate-300 text-sm whitespace-nowrap">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* Testimonials Section */}
      <Suspense fallback={<SectionSkeleton className="py-20 bg-slate-900/30" />}>
        <TestimonialsSection />
      </Suspense>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('whyChooseUs.title')}</h2>
              <div className="space-y-4">
                {whyChooseItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-2xl p-8 border border-blue-500/20 transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="text-center">
                <div className="text-5xl font-bold gradient-text mb-4">{t('whyChooseUs.hours24')}</div>
                <p className="text-xl text-white mb-2">{t('whyChooseUs.serviceDesc')}</p>
                <p className="text-slate-300">{t('whyChooseUs.serviceSub')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-slate-300 text-lg mb-8">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => openConsultation()}
              className="bg-blue-600 hover:bg-blue-500 hover:brightness-110 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-95 inline-flex items-center justify-center gap-2 text-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              {t('cta.primary')}
            </button>
            <a
              href="https://x.com/thechainsec"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 hover:brightness-110 text-white font-semibold py-4 px-10 rounded-lg border border-slate-700 transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-1 active:scale-95 inline-flex items-center justify-center gap-2 text-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              {t('cta.twitter')}
            </a>
          </div>
          <p className="text-sm text-slate-400">
            {t('cta.responseTime')}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-300 text-sm">
              {t('footer.copyright')}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-slate-400">
              <Link href="/privacy" className="hover:text-slate-300 hover:brightness-110 transition-all duration-200 py-2 px-2 md:px-0 min-h-[44px] flex items-center">{t('footer.privacy')}</Link>
              <Link href="/terms" className="hover:text-slate-300 hover:brightness-110 transition-all duration-200 py-2 px-2 md:px-0 min-h-[44px] flex items-center">{t('footer.terms')}</Link>
              <a href="https://t.me/xi_ao_duo" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 hover:brightness-110 transition-all duration-200 py-2 px-2 md:px-0 min-h-[44px] flex items-center">{t('footer.telegram')}</a>
              <a href="https://x.com/thechainsec" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 hover:brightness-110 transition-all duration-200 py-2 px-2 md:px-0 min-h-[44px] flex items-center">{t('footer.twitter')}</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
