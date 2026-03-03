'use client'

import { motion } from 'framer-motion'
import { Shield, TrendingUp, Users, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import Logo from '@/components/Logo'

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
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#services" className="hover:text-white transition-colors">服务</a>
            <a href="#pricing" className="hover:text-white transition-colors">定价</a>
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

      {/* Pricing Section - 新增 */}
      <section id="pricing" className="py-20 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">咨询服务方案</h2>
            <p className="text-slate-400">根据您的需求选择合适的方案，所有方案均可免费初步评估</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* 免费方案 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all"
            >
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
              <a
                href="https://t.me/xi_ao_duo"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                提交信息
              </a>
            </motion.div>

            {/* 199方案 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all"
            >
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
              <a
                href="https://t.me/xi_ao_duo"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                选择方案
              </a>
            </motion.div>

            {/* 1499方案 - 推荐 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border border-blue-500/30 rounded-xl p-6 relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                推荐方案
              </div>
              <div className="text-sm text-blue-400 mb-2">专家综合会诊</div>
              <div className="text-3xl font-bold mb-2">1499 USDT</div>
              <div className="text-sm text-slate-500 line-through mb-2">原价 2499 USDT</div>
              <p className="text-slate-400 text-sm mb-4">溯源分析师 + 司法专家综合会诊</p>
              <ul className="text-sm text-slate-400 space-y-2 mb-6">
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
              <a
                href="https://t.me/xi_ao_duo"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                选择方案
              </a>
            </motion.div>

            {/* VIP方案 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all"
            >
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
              <a
                href="https://t.me/xi_ao_duo"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                立即沟通
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section - 新增 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">专业团队</h2>
            <p className="text-slate-400">链上分析与司法协作专家团队</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">链上安全专家</h3>
              <p className="text-slate-400 text-sm">10年+网络安全经验，专注区块链分析与追踪技术，覆盖60+主流公链</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">司法协作专家</h3>
              <p className="text-slate-400 text-sm">跨境法律协作专家，与全球500+交易所建立司法合作关系</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Web3法律顾问</h3>
              <p className="text-slate-400 text-sm">专注区块链与数字资产法律，提供跨境法律支持和专业维权指导</p>
            </motion.div>
          </div>

          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8">
            <h3 className="text-center text-lg font-semibold mb-6">团队背景</h3>
            <p className="text-center text-slate-400 mb-8">我们的团队曾在以下企业或单位就职</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Chainalysis', '慢雾科技', '知道创宇', '派盾科技', 'CertiK', '火币', '币安', 'OKX'].map((company) => (
                <span key={company} className="text-slate-400 font-medium text-lg">{company}</span>
              ))}
            </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://t.me/xi_ao_duo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-10 rounded-lg transition-colors inline-flex items-center justify-center gap-2 text-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              Telegram 咨询
            </a>
            <a
              href="https://x.com/thechainsec"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-10 rounded-lg border border-slate-700 transition-colors inline-flex items-center justify-center gap-2 text-lg"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
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
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © 2025 USDTRecovery. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="/privacy" className="hover:text-slate-300 transition-colors">隐私政策</a>
              <a href="/terms" className="hover:text-slate-300 transition-colors">服务条款</a>
              <a href="https://t.me/xi_ao_duo" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Telegram</a>
              <a href="https://x.com/thechainsec" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Twitter/X</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
