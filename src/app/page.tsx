'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Shield, TrendingUp, Users, Clock, ArrowRight, CheckCircle, Menu, X } from 'lucide-react'
import { useEffect, useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'
import CaseTable from '@/components/CaseTable'
import { TestimonialsSection } from '@/components/Testimonials'
import ConsultationModal from '@/components/ConsultationModal'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { FormData } from '@/components/ConsultationForm'
import { useTranslation } from '@/hooks/useTranslation'

// 简化的数字动画 - 使用CSS动画替代JS动画，只在桌面端启用
function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // 只在桌面端启用动画
    setIsDesktop(window.innerWidth >= 768)
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isDesktop) {
    return <span>{prefix}{value}{suffix}</span>
  }

  return <CssAnimatedNumber value={value} suffix={suffix} prefix={prefix} />
}

// CSS动画版本 - 性能更好
function CssAnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    const duration = 1200
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // 使用更简单的缓动函数
      const easeOut = 1 - (1 - progress) * (1 - progress)
      setCount(Math.floor(value * easeOut))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [value])

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

  // 复制一份用于无缝滚动
  const chainsDouble = useMemo(() => [...chains, ...chains], [chains])

  const navLinks = useMemo(() => [
    { href: '#services', label: '服务' },
    { href: '#pricing', label: '定价' },
    { href: '#process', label: '流程' },
    { href: '#chains', label: '公链' },
    { href: '/about', label: '关于', isPage: true },
    { href: '/blog', label: '博客', isPage: true },
  ], [])

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={closeConsultation}
        onSubmit={handleFormSubmit}
        defaultPlan={selectedPlan}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
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
                立即咨询
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-all duration-200 active:scale-95 touch-manipulation"
              aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
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

        {/* Mobile Navigation - 简化动画 */}
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
                  立即咨询
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - 简化背景和动画 */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* 简化背景 - 使用纯色渐变替代图片 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className={`text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-300">专业团队 · 7×24小时服务</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              虚拟币被盗？
              <br />
              <span className="gradient-text">专业团队帮您追回</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              链上追踪 + 司法协助，<span className="text-white font-semibold">357+成功案例</span>，
              <span className="text-white font-semibold">$35M+资产挽回</span>。
              <br />
              支持BTC、ETH、USDT等60+主流公链。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => openConsultation()}
                className="bg-blue-600 hover:bg-blue-500 hover:brightness-110 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-95 inline-flex items-center justify-center gap-2"
              >
                立即免费咨询
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <a href="#process" className="bg-slate-800 hover:bg-slate-700 hover:brightness-110 text-white font-semibold py-4 px-8 rounded-lg border border-slate-700 transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-0.5 active:scale-95">
                了解服务流程
              </a>
            </div>

            {/* 简化统计卡片动画 */}
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
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - 简化hover效果 */}
      <section id="services" className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">受理类型</h2>
            <p className="text-slate-400">擅长处理区块链挽损和司法协助相关事务</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:bg-slate-800/60 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 group cursor-pointer"
              >
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2 transition-colors duration-200 group-hover:text-blue-400">{service.title}</h3>
                <p className="text-slate-400 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* 服务区域CTA */}
          <div className="text-center mt-10">
            <button
              onClick={() => openConsultation()}
              className="bg-slate-800 hover:bg-slate-700 hover:brightness-110 text-white font-semibold py-3 px-8 rounded-lg border border-slate-700 transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-0.5 active:scale-95"
            >
              了解更多
            </button>
          </div>
        </div>
      </section>

      {/* CaseTable - 实时案件追踪 (移到 Process 之前) */}
      <CaseTable />

      {/* Process Section - 简化动画和hover */}
      <section id="process" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">服务流程</h2>
            <p className="text-slate-400">全链路紧急响应流程，最快2小时内启动</p>
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

                {/* 连接线（除最后一个） */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-700" />
                )}

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <span className="text-blue-400 font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm mb-3">{step.desc}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chains Section - 带图标和marquee滚动效果 */}
      <section id="chains" className="py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">支持的公链</h2>
            <p className="text-slate-400">覆盖60+主流公链、数万种Token、DEX和智能合约分析</p>
          </div>

          {/* Marquee 滚动容器 */}
          <div className="relative">
            {/* 左侧渐变遮罩 */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            {/* 右侧渐变遮罩 */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            {/* 滚动轨道 */}
            <div className="flex animate-marquee hover:[animation-play-state:paused]">
              {chainsDouble.map((chain, index) => (
                <div
                  key={`${chain.id}-${index}`}
                  className="flex-shrink-0 mx-3"
                >
                  <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-3 transition-all duration-300 hover:bg-slate-800 hover:border-blue-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10">
                    <div className="text-slate-300">
                      <ChainIcon chain={chain.id} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-slate-200 font-medium whitespace-nowrap">{chain.id}</span>
                      <span className="text-slate-500 text-xs whitespace-nowrap">{chain.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 静态展示（移动端备用） */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:hidden">
            {chains.slice(0, 6).map((chain) => (
              <div
                key={chain.id}
                className="flex items-center gap-2 bg-slate-800/30 border border-slate-700 rounded-lg px-3 py-2"
              >
                <span className="text-slate-400">
                  <ChainIcon chain={chain.id} />
                </span>
                <span className="text-slate-300 text-sm">{chain.id}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - 使用静态卡片 */}
      <section id="pricing" className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">咨询服务方案</h2>
            <p className="text-slate-400">根据您的需求选择合适的方案，所有方案均可免费初步评估</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* 免费方案 */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="text-sm text-blue-400 mb-2">求助 & 举报</div>
              <div className="text-3xl font-bold mb-2">免费</div>
              <p className="text-slate-400 text-sm mb-4">记录您的求助信息，有机会获得我们的免费协助</p>
              <ul className="text-sm text-slate-400 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  实习分析师免费出具追溯方案
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  1周内响应
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  举报非法项目赢取奖励
                </li>
              </ul>
              <button
                onClick={() => openConsultation('免费方案')}
                className="block w-full text-center bg-slate-700 hover:bg-slate-600 hover:brightness-110 text-white font-semibold py-3 rounded-lg transition-all duration-200 active:scale-95"
              >
                提交信息
              </button>
            </div>

            {/* 199方案 */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="text-sm text-blue-400 mb-2">链上专家咨询</div>
              <div className="text-3xl font-bold mb-2">199 USDT</div>
              <p className="text-slate-400 text-sm mb-4">适合个人用户快速咨询和基础分析服务</p>
              <ul className="text-sm text-slate-400 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  4小时内响应
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  60分钟电话深度沟通
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  基础追踪分析
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  资产追回可行性分析
                </li>
              </ul>
              <button
                onClick={() => openConsultation('199 USDT方案')}
                className="block w-full text-center bg-blue-600 hover:bg-blue-500 hover:brightness-110 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
              >
                选择方案
              </button>
            </div>

            {/* 1499方案 - 推荐 */}
            <div className="relative bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-2 border-blue-500/50 rounded-xl p-6 transition-all duration-300 hover:border-blue-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                推荐方案
              </div>

              <div className="text-sm text-blue-400 mb-2 font-medium">专家综合会诊</div>
              <div className="text-3xl font-bold mb-1">1499 USDT</div>
              <div className="text-sm text-slate-500 line-through mb-3">原价 2499 USDT</div>
              <p className="text-slate-400 text-sm mb-4">溯源分析师 + 司法专家综合会诊</p>
              <ul className="text-sm text-slate-300 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Web3资深律师专业咨询
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  技术专家团队联合会诊
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  详细资产追踪方案
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  专业维权行动指导
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  跨链资产分析追踪
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  7天不限时沟通
                </li>
              </ul>
              <button
                onClick={() => openConsultation('1499 USDT推荐方案')}
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/40 active:scale-95"
              >
                选择方案
              </button>
            </div>

            {/* VIP方案 */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="text-sm text-blue-400 mb-2">VIP定制方案</div>
              <div className="text-3xl font-bold mb-2">待定</div>
              <p className="text-slate-400 text-sm mb-4">面向重大损失案件的专属服务</p>
              <ul className="text-sm text-slate-400 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  重点专项追踪工作组
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  高级定制维权方案
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  全程一对一跟进
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  跨境法律援助支持
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  CTO负责交付
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  未挽损可退款
                </li>
              </ul>
              <button
                onClick={() => openConsultation('VIP定制方案')}
                className="block w-full text-center bg-slate-700 hover:bg-slate-600 hover:brightness-110 text-white font-semibold py-3 rounded-lg transition-all duration-200 active:scale-95"
              >
                立即沟通
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - 使用静态布局 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">专业团队</h2>
            <p className="text-slate-400">链上分析与司法协作专家团队</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center transition-all duration-300 hover:-translate-y-1 p-4 rounded-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">链上安全专家</h3>
              <p className="text-slate-400 text-sm">10年+网络安全经验，专注区块链分析与追踪技术，覆盖60+主流公链</p>
            </div>

            <div className="text-center transition-all duration-300 hover:-translate-y-1 p-4 rounded-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">司法协作专家</h3>
              <p className="text-slate-400 text-sm">跨境法律协作专家，与全球500+交易所建立司法合作关系</p>
            </div>

            <div className="text-center transition-all duration-300 hover:-translate-y-1 p-4 rounded-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Web3法律顾问</h3>
              <p className="text-slate-400 text-sm">专注区块链与数字资产法律，提供跨境法律支持和专业维权指导</p>
            </div>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 overflow-hidden">
            <h3 className="text-center text-lg font-semibold mb-4">团队背景</h3>
            <p className="text-center text-slate-400 mb-6">我们的团队曾在以下企业或单位就职</p>

            {/* 横排滚动Logo墙 */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-800/30 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-800/30 to-transparent z-10 pointer-events-none" />

              <div className="flex overflow-x-auto scrollbar-hide gap-8 py-4 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {[
                  { name: 'Chainalysis', logo: '🔍' },
                  { name: '慢雾科技', logo: '🛡️' },
                  { name: '知道创宇', logo: '🔒' },
                  { name: '派盾科技', logo: '🛡️' },
                  { name: 'CertiK', logo: '✓' },
                  { name: '火币', logo: '🔥' },
                  { name: '币安', logo: '💰' },
                  { name: 'OKX', logo: '⚡' },
                ].map((company, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex flex-col items-center gap-2"
                  >
                    <div className="w-14 h-14 rounded-full bg-slate-700/50 flex items-center justify-center text-2xl">
                      {company.logo}
                    </div>
                    <span className="text-slate-400 text-sm whitespace-nowrap">
                      {company.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">为什么选择我们？</h2>
              <div className="space-y-4">
                {[
                  '专业团队：链上分析师 + 司法专家 + 律师',
                  '快速响应：2小时内启动紧急冻结',
                  '全程透明：实时同步案件进展',
                  '保密安全：严格保护客户隐私',
                  '成功付费：部分服务按结果收费',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-2xl p-8 border border-blue-500/20 transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="text-center">
                <div className="text-5xl font-bold gradient-text mb-4">7×24</div>
                <p className="text-xl text-white mb-2">小时全天候服务</p>
                <p className="text-slate-400">无论何时何地，我们都在您身边</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">还在犹豫？</h2>
          <p className="text-slate-400 text-lg mb-8">
            免费咨询，评估您的案件追回可能性。
            <br />
            专业的事交给专业的团队。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => openConsultation()}
              className="bg-blue-600 hover:bg-blue-500 hover:brightness-110 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-95 inline-flex items-center justify-center gap-2 text-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              立即免费咨询
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
              Twitter/X
            </a>
          </div>
          <p className="text-sm text-slate-500">
            平均响应时间：<span className="text-slate-300">2小时内</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © 2025 USDTRecovery. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-slate-500">
              <a href="/privacy" className="hover:text-slate-300 hover:brightness-110 transition-all duration-200 py-2 px-2 md:px-0 min-h-[44px] flex items-center">隐私政策</a>
              <a href="/terms" className="hover:text-slate-300 hover:brightness-110 transition-all duration-200 py-2 px-2 md:px-0 min-h-[44px] flex items-center">服务条款</a>
              <a href="https://t.me/xi_ao_duo" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 hover:brightness-110 transition-all duration-200 py-2 px-2 md:px-0 min-h-[44px] flex items-center">Telegram</a>
              <a href="https://x.com/thechainsec" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 hover:brightness-110 transition-all duration-200 py-2 px-2 md:px-0 min-h-[44px] flex items-center">Twitter/X</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
