'use client'

import { motion } from 'framer-motion'
import { Shield, TrendingUp, Users, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

// 简化的数字动画 - 减少重渲染
function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)
  
  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true
    
    const duration = 1500
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(value * easeOut))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [value])
  
  return <span>{prefix}{count}{suffix}</span>
}

// 简化动画配置
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { label: '完结案例', value: 357, suffix: '+', icon: Shield },
    { label: '挽回资产', value: 35, suffix: 'M+', prefix: '$', icon: TrendingUp },
    { label: '挽回率', value: 57, suffix: '%', icon: Users },
    { label: '平均响应', value: 2, suffix: '小时', icon: Clock },
  ]

  const services = [
    { icon: '🔒', title: 'USDT/Token被盗', desc: '快速追踪/冻结/监控被盗加密资产' },
    { icon: '🛡️', title: 'Web3诈骗', desc: '专业团队协助追回被骗资金' },
    { icon: '🌐', title: '项目方跑路', desc: '多维度追踪项目方资金流向' },
    { icon: '💼', title: '交易所账户冻结', desc: '跨境律师，US/CN司法、风控解决方案' },
    { icon: '⚖️', title: '出金被冻卡', desc: '协助处理银行卡冻结问题' },
    { icon: '📋', title: '涉虚拟币被传唤', desc: '专业法律援助支持' },
  ]

  const process = [
    { step: '01', title: '咨询评估', desc: '免费评估案件追回可能性，提供专业建议', detail: '提交案件信息，专家初步分析链上数据，评估追回可行性' },
    { step: '02', title: '专家接入', desc: '2小时内匹配专业分析师，深入了解案情', detail: '资深链上分析师介入，追踪资金流向，锁定关键证据' },
    { step: '03', title: '制定方案', desc: '链上追踪+司法协助，定制专属追回方案', detail: '整合技术手段与法律途径，制定最优追回策略' },
    { step: '04', title: '执行交付', desc: 'Case小组持续跟进，直至资产追回', detail: '全程透明同步进展，协助完成资产回收与法律程序' },
  ]

  const cases = [
    { type: 'USDT被盗', amount: '$128,000', result: '成功追回', time: '3天', desc: '用户遭遇钓鱼网站，USDT被转走。通过链上追踪锁定交易所账户，协助司法冻结并追回。' },
    { type: '交易所冻结', amount: '$85,000', result: '账户解冻', time: '7天', desc: '用户OKX账户被冻结，资金无法提取。通过法律途径与交易所沟通，成功解冻账户。' },
    { type: '项目方跑路', amount: '$230,000', result: '部分追回', time: '14天', desc: 'DeFi项目方卷款跑路。通过多维度追踪资金流向，协助警方抓获嫌疑人并追回部分资产。' },
  ]

  const chains = ['BTC', 'ETH', 'USDT', 'SOL', 'BNB', 'TRON', 'ARB', 'OP', 'AVAX', 'Polygon', 'Base', 'Fantom']

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold gradient-text">USDTRecovery</div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#services" className="hover:text-white transition-colors">服务</a>
            <a href="#process" className="hover:text-white transition-colors">流程</a>
            <a href="#cases" className="hover:text-white transition-colors">案例</a>
            <a href="#chains" className="hover:text-white transition-colors">公链</a>
            <a href="/about" className="hover:text-white transition-colors">关于</a>
            <a href="/blog" className="hover:text-white transition-colors">博客</a>
            <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors">立即咨询</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-slate-950" />
        
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
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
              <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center justify-center gap-2 group">
                立即免费咨询
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#process" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-8 rounded-lg border border-slate-700 transition-colors">
                了解服务流程
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 text-center hover:bg-slate-800/50 transition-colors"
                >
                  <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">受理类型</h2>
            <p className="text-slate-400">擅长处理区块链挽损和司法协助相关事务</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 hover:border-blue-500/30 transition-all group cursor-pointer"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">服务流程</h2>
            <p className="text-slate-400">全链路紧急响应流程，最快2小时内启动</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 h-full hover:bg-slate-800/50 transition-colors"
              >
                <div className="text-4xl font-bold text-blue-500/20 mb-4">{step.step}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{step.desc}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section - 新增 */}
      <section id="cases" className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">成功案例</h2>
            <p className="text-slate-400">部分已完结案例展示（隐私信息已脱敏）</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((caseItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-400">{caseItem.type}</span>
                  <span className="text-sm font-semibold text-green-400">{caseItem.result}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">{caseItem.amount}</div>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{caseItem.desc}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>处理时长：{caseItem.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chains Section */}
      <section id="chains" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">支持的公链</h2>
            <p className="text-slate-400">覆盖60+主流公链、数万种Token、DEX和智能合约分析</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {chains.map((chain) => (
              <span
                key={chain}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-5 py-2 text-slate-300 font-medium hover:bg-slate-800 hover:border-blue-500/30 transition-all cursor-default"
              >
                {chain}
              </span>
            ))}
          </div>
        </div>
      </section>

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

            <div className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-2xl p-8 border border-blue-500/20">
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
          <a
            href="https://t.me/xi_ao_duo"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-10 rounded-lg transition-colors inline-flex items-center gap-2 text-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
            Telegram 咨询
          </a>
          <p className="mt-6 text-sm text-slate-500">
            平均响应时间：<span className="text-slate-300">2小时内</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © 2025 USDTRecovery. All rights reserved.
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
