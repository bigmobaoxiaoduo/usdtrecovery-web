'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, TrendingUp, Users, Clock, ArrowRight, CheckCircle, Bitcoin, Wallet, Scale, FileText, Globe, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

// 数字滚动动画组件
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])
  
  return <span>{count}{suffix}</span>
}

// 动画配置
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const stats = [
    { label: '完结案例', value: 357, suffix: '+', icon: Shield },
    { label: '挽回资产', value: 35, suffix: 'M+', prefix: '$', icon: TrendingUp },
    { label: '挽回率', value: 57, suffix: '%', icon: Users },
    { label: '平均响应', value: 2, suffix: '小时', icon: Clock },
  ]

  const services = [
    { icon: Bitcoin, title: 'USDT/Token被盗', desc: '快速追踪/冻结/监控被盗加密资产' },
    { icon: Shield, title: 'Web3诈骗', desc: '专业团队协助追回被骗资金' },
    { icon: Globe, title: '项目方跑路', desc: '多维度追踪项目方资金流向' },
    { icon: Wallet, title: '交易所账户冻结', desc: '跨境律师，US/CN司法、风控解决方案' },
    { icon: Scale, title: '出金被冻卡', desc: '协助处理银行卡冻结问题' },
    { icon: FileText, title: '涉虚拟币被传唤', desc: '专业法律援助支持' },
  ]

  const process = [
    { step: '01', title: '咨询评估', desc: '免费评估案件追回可能性，提供专业建议' },
    { step: '02', title: '专家接入', desc: '2小时内匹配专业分析师，深入了解案情' },
    { step: '03', title: '制定方案', desc: '链上追踪+司法协助，定制专属追回方案' },
    { step: '04', title: '执行交付', desc: 'Case小组持续跟进，直至资产追回' },
  ]

  const chains = ['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'TRON', 'ARB', 'OP', 'AVAX', 'Polygon']

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold gradient-text">Web3Recovery</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#services" className="hover:text-white transition-colors">服务</a>
            <a href="#process" className="hover:text-white transition-colors">流程</a>
            <Link href="/blog" className="hover:text-white transition-colors">博客</Link>
            <Link href="/about" className="hover:text-white transition-colors">关于</Link>
            <a href="#contact" className="btn-primary text-sm py-2 px-4">立即咨询</a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-slate-950" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-300">专业团队 · 7×24小时服务</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              虚拟币被盗？
              <br />
              <span className="gradient-text">专业团队帮您追回</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeInUp} className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              链上追踪 + 司法协助，
              <motion.span className="text-white font-semibold"><AnimatedNumber value={357} suffix="+"></AnimatedNumber>成功案例</motion.span>，
              <motion.span className="text-white font-semibold">$35M+资产挽回</motion.span>。
              <br />
              支持BTC、ETH、USDT等60+主流公链。
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center justify-center gap-2 group"
              >
                立即免费咨询
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary"
              >
                了解服务流程
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 text-center backdrop-blur-sm"
                >
                  <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.prefix}
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-slate-500"
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">受理类型</h2>
            <p className="text-slate-400">擅长处理区块链挽损和司法协助相关事务</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 hover:border-blue-500/30 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <service.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">服务流程</h2>
            <p className="text-slate-400">全链路紧急响应流程，最快2小时内启动</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 h-full">
                  <div className="text-4xl font-bold text-blue-500/20 mb-4">{step.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-slate-700" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chains Section */}
      <section id="chains" className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">支持的公链</h2>
            <p className="text-slate-400">覆盖60+主流公链、数万种Token、DEX和智能合约分析</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {chains.map((chain, index) => (
              <motion.div
                key={chain}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-6 py-3 text-slate-300 font-medium"
              >
                {chain}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">为什么选择我们？</h2>
              <div className="space-y-4">
                {[
                  '专业团队：链上分析师 + 司法专家 + 律师',
                  '快速响应：2小时内启动紧急冻结',
                  '全程透明：实时同步案件进展',
                  '保密安全：严格保护客户隐私',
                  '成功付费：部分服务按结果收费',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 border border-blue-500/20"
            >
              <div className="text-center">
                <div className="text-5xl font-bold gradient-text mb-4">7×24</div>
                <p className="text-xl text-white mb-2">小时全天候服务</p>
                <p className="text-slate-400">无论何时何地，我们都在您身边</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">还在犹豫？</h2>
            <p className="text-slate-400 text-lg mb-8">
              免费咨询，评估您的案件追回可能性。
              <br />
              专业的事交给专业的团队。
            </p>
            <motion.a
              href="https://t.me/xi_ao_duo"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-10"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              Telegram 咨询
            </motion.a>

            <p className="mt-6 text-sm text-slate-500">
              平均响应时间：<span className="text-slate-300">2小时内</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © 2025 Web3Recovery. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-slate-300 transition-colors">隐私政策</a>
              <a href="#" className="hover:text-slate-300 transition-colors">服务条款</a>
              <a href="#" className="hover:text-slate-300 transition-colors">联系我们</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
