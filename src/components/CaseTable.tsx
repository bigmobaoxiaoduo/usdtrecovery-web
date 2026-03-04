'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, AlertCircle, Shield, Wallet, ExternalLink, RefreshCw } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

// 案件类型定义 - 使用翻译键
type CaseTypeKey = 'usdtStolen' | 'exchangeFrozen' | 'rugPull' | 'walletStolen' | 'phishing'
type CaseStatusKey = 'processing' | 'frozen' | 'recovered'

interface CaseItem {
  id: string
  typeKey: CaseTypeKey
  amount: string
  amountNum: number
  statusKey: CaseStatusKey
  duration: string
  lastUpdate: string
  description: string
  address: string
  txHash: string
}

// 模拟数据 - 使用翻译键
const mockCases: CaseItem[] = [
  {
    id: 'C2025030101',
    typeKey: 'usdtStolen',
    amount: '$1,280,000',
    amountNum: 1280000,
    statusKey: 'recovered',
    duration: '3天12小时',
    lastUpdate: '2分钟前',
    description: '用户遭遇钓鱼网站，USDT被转走至Tornado Cash混币器',
    address: '0x7a2f...9e3d',
    txHash: '0x8f2a...3c1b'
  },
  {
    id: 'C2025030202',
    typeKey: 'exchangeFrozen',
    amount: '$85,000',
    amountNum: 85000,
    statusKey: 'frozen',
    duration: '1天8小时',
    lastUpdate: '5分钟前',
    description: '用户OKX账户因涉嫌洗钱被风控冻结',
    address: 'bc1q9x...m2p5',
    txHash: '0x3d7e...9a2f'
  },
  {
    id: 'C2025030203',
    typeKey: 'rugPull',
    amount: '$2,300,000',
    amountNum: 2300000,
    statusKey: 'processing',
    duration: '5天6小时',
    lastUpdate: '刚刚',
    description: 'DeFi项目方卷款跑路，涉及500+用户资金',
    address: '0x4c8b...7f2a',
    txHash: '0x9e1c...4d8b'
  },
  {
    id: 'C2025030204',
    typeKey: 'walletStolen',
    amount: '$450,000',
    amountNum: 450000,
    statusKey: 'processing',
    duration: '12小时',
    lastUpdate: '8分钟前',
    description: '私钥泄露导致钱包资产被批量转移',
    address: '0x2f5e...8c1a',
    txHash: '0x6a3d...2e9c'
  },
  {
    id: 'C2025030205',
    typeKey: 'phishing',
    amount: '$78,500',
    amountNum: 78500,
    statusKey: 'recovered',
    duration: '2天4小时',
    lastUpdate: '15分钟前',
    description: '假空投网站诱导授权，ERC20代币被恶意转移',
    address: '0x9a1c...5d7e',
    txHash: '0x4b8f...1a3d'
  },
  {
    id: 'C2025030206',
    typeKey: 'exchangeFrozen',
    amount: '$320,000',
    amountNum: 320000,
    statusKey: 'frozen',
    duration: '2天18小时',
    lastUpdate: '12分钟前',
    description: 'Binance账户因异常登录被安全锁定',
    address: '0x5d2a...9c4b',
    txHash: '0x7e3c...8f1a'
  },
  {
    id: 'C2025030207',
    typeKey: 'usdtStolen',
    amount: '$56,000',
    amountNum: 56000,
    statusKey: 'recovered',
    duration: '1天2小时',
    lastUpdate: '20分钟前',
    description: '社交工程攻击诱导用户签署恶意交易',
    address: '0x3e8c...6a2d',
    txHash: '0x1f5b...4e7a'
  },
  {
    id: 'C2025030208',
    typeKey: 'rugPull',
    amount: '$890,000',
    amountNum: 890000,
    statusKey: 'processing',
    duration: '3天9小时',
    lastUpdate: '刚刚',
    description: 'NFT项目方Rug Pull，转移流动性池资金',
    address: '0x8a2d...3f5c',
    txHash: '0x2c6e...9b1d'
  }
]

// 状态配置 - 使用翻译键
const getStatusConfig = (t: (key: string) => string): Record<CaseStatusKey, { color: string; bg: string; label: string }> => ({
  processing: {
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/30',
    label: t('cases.table.processing')
  },
  frozen: {
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30',
    label: t('cases.table.frozen')
  },
  recovered: {
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/30',
    label: t('cases.table.recovered')
  }
})

// 类型图标
const typeIcons: Record<CaseTypeKey, React.ReactNode> = {
  usdtStolen: <Wallet className="w-4 h-4" />,
  exchangeFrozen: <Shield className="w-4 h-4" />,
  rugPull: <AlertCircle className="w-4 h-4" />,
  walletStolen: <Wallet className="w-4 h-4" />,
  phishing: <AlertCircle className="w-4 h-4" />
}

// 案件类型翻译映射
const typeKeyToTranslation: Record<CaseTypeKey, string> = {
  usdtStolen: 'cases.types.usdtStolen',
  exchangeFrozen: 'cases.types.exchangeFrozen',
  rugPull: 'cases.types.rugPull',
  walletStolen: 'cases.types.usdtStolen',
  phishing: 'cases.types.usdtStolen'
}

export default function CaseTable() {
  const { t, locale } = useTranslation()
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [isPaused, setIsPaused] = useState(false)

  const statusConfig = getStatusConfig(t)

  // 自动轮播高亮
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setHighlightedIndex((prev) => {
        if (prev === null) return 0
        return (prev + 1) % mockCases.length
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused])

  // 更新时间显示
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // 计算总挽损金额
  const totalRecovered = useMemo(() => {
    return mockCases
      .filter(c => c.statusKey === 'recovered')
      .reduce((sum, c) => sum + c.amountNum, 0)
  }, [])

  // 状态统计
  const stats = useMemo(() => {
    const processing = mockCases.filter(c => c.statusKey === 'processing').length
    const frozen = mockCases.filter(c => c.statusKey === 'frozen').length
    const recovered = mockCases.filter(c => c.statusKey === 'recovered').length
    return { processing, frozen, recovered }
  }, [])

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('cases.table.title')}</h2>
          <p className="text-slate-400 mb-8">{t('cases.table.subtitle')}</p>
          
          {/* 统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-white">{mockCases.length}</div>
              <div className="text-xs text-slate-400">{t('cases.table.activeCases')}</div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-400">{stats.processing}</div>
              <div className="text-xs text-orange-400/70">{t('cases.table.processing')}</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400">{stats.frozen}</div>
              <div className="text-xs text-blue-400/70">{t('cases.table.frozen')}</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400">{stats.recovered}</div>
              <div className="text-xs text-green-400/70">{t('cases.table.recovered')}</div>
            </div>
          </div>
        </div>

        {/* 案件表格 */}
        <div 
          className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* 表头 */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-800/50 border-b border-slate-700/50 text-sm text-slate-400">
            <div className="col-span-2">{t('cases.table.caseType')}</div>
            <div className="col-span-2">{t('cases.table.amount')}</div>
            <div className="col-span-2">{t('cases.table.status')}</div>
            <div className="col-span-2">{t('cases.table.duration')}</div>
            <div className="col-span-3">{t('cases.table.lastUpdate')}</div>
            <div className="col-span-1 text-right"></div>
          </div>

          {/* 表体 */}
          <div className="divide-y divide-slate-700/30">
            {mockCases.map((caseItem, index) => {
              const isHighlighted = highlightedIndex === index
              const isHovered = hoveredIndex === index
              const statusStyle = statusConfig[caseItem.statusKey]

              return (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    backgroundColor: isHighlighted ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                  }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`
                    relative px-6 py-4 cursor-pointer transition-all duration-300
                    ${isHighlighted ? 'bg-blue-500/5' : 'hover:bg-slate-800/30'}
                  `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* 高亮指示器 */}
                  {isHighlighted && (
                    <motion.div
                      layoutId="highlight"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  {/* 桌面端布局 */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center text-sm">
                    {/* 案件类型 */}
                    <div className="col-span-2 flex items-center gap-2">
                      <span className="text-slate-400">{typeIcons[caseItem.typeKey]}</span>
                      <span className="text-slate-200">{t(typeKeyToTranslation[caseItem.typeKey])}</span>
                    </div>

                    {/* 损失金额 */}
                    <div className="col-span-2">
                      <span className="font-mono text-white font-semibold">{caseItem.amount}</span>
                    </div>

                    {/* 处理状态 */}
                    <div className="col-span-2">
                      <span className={`
                        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                        ${statusStyle.bg} ${statusStyle.color}
                      `}>
                        {statusStyle.label}
                      </span>
                    </div>

                    {/* 处理时长 */}
                    <div className="col-span-2 flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{caseItem.duration}</span>
                    </div>

                    {/* 最后更新 */}
                    <div className="col-span-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-slate-300">{caseItem.lastUpdate}</span>
                    </div>

                    {/* 详情按钮 */}
                    <div className="col-span-1 text-right">
                      <button className="text-slate-500 hover:text-blue-400 transition-colors">
                        <ExternalLink className="w-4 h-4 inline" />
                      </button>
                    </div>
                  </div>

                  {/* 移动端布局 */}
                  <div className="md:hidden space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">{typeIcons[caseItem.typeKey]}</span>
                        <span className="text-slate-200">{t(typeKeyToTranslation[caseItem.typeKey])}</span>
                      </div>
                      <span className={`
                        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border
                        ${statusStyle.bg} ${statusStyle.color}
                      `}>
                        {statusStyle.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-mono text-white font-semibold text-lg">{caseItem.amount}</span>
                      <span className="text-slate-400 text-xs">{caseItem.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-slate-400">{caseItem.lastUpdate}</span>
                      </div>
                      <span className="text-slate-500 font-mono">{caseItem.id}</span>
                    </div>
                  </div>

                  {/* 悬停详情 */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pb-2 border-t border-slate-700/30 mt-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            <div>
                              <span className="text-slate-500 block mb-1">{locale === 'zh' ? '案件描述' : 'Description'}</span>
                              <span className="text-slate-300">{caseItem.description}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block mb-1">{locale === 'zh' ? '相关地址' : 'Address'}</span>
                              <span className="text-slate-300 font-mono">{caseItem.address}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block mb-1">{locale === 'zh' ? '交易哈希' : 'Tx Hash'}</span>
                              <span className="text-slate-300 font-mono">{caseItem.txHash}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* 底部统计 */}
          <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-700/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
              <div className="flex items-center gap-6">
                <span className="text-slate-400">
                  {t('cases.table.totalRecovered')}: <span className="text-green-400 font-mono font-semibold">{formatAmount(totalRecovered)}</span>
                </span>
                <span className="text-slate-400">
                  {t('cases.table.successRate')}: <span className="text-blue-400 font-semibold">57%</span>
                  <span className="text-slate-500 text-xs ml-1">({locale === 'zh' ? '基于完结案件统计' : 'Based on completed cases'})</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                <span>{t('cases.table.autoUpdate')} · {currentTime.toLocaleTimeString(locale === 'zh' ? 'zh-CN' : 'en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 提示文字 */}
        <p className="text-center text-xs text-slate-500 mt-4">
          {t('cases.table.privacyNote')}
        </p>
      </div>
    </section>
  )
}
