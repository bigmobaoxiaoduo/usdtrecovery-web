'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Partner {
  name: string
  url: string
  logo: React.ReactNode
}

// 合作伙伴数据 - 使用SVG logo确保清晰度
const partners: Partner[] = [
  {
    name: 'Chainalysis',
    url: 'https://www.chainalysis.com',
    logo: (
      <svg viewBox="0 0 120 24" fill="currentColor" className="h-6 w-auto">
        <path d="M12.4 2.4c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c2.1 0 4.1-.7 5.7-1.9l-2.3-3.4c-1 .7-2.2 1.1-3.4 1.1-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8c1.2 0 2.4.4 3.4 1.1l2.3-3.4c-1.6-1.2-3.6-1.9-5.7-1.9z"/>
        <text x="28" y="17" fontSize="14" fontWeight="600" fontFamily="system-ui">Chainalysis</text>
      </svg>
    ),
  },
  {
    name: 'SlowMist',
    url: 'https://www.slowmist.com',
    logo: (
      <svg viewBox="0 0 100 24" fill="currentColor" className="h-6 w-auto">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" fill="none" stroke="currentColor" strokeWidth="2"/>
        <text x="26" y="17" fontSize="13" fontWeight="600" fontFamily="system-ui">慢雾</text>
      </svg>
    ),
  },
  {
    name: 'CertiK',
    url: 'https://www.certik.com',
    logo: (
      <svg viewBox="0 0 80 24" fill="currentColor" className="h-6 w-auto">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 3l5 3-5 3-5-3 5-3z"/>
        <text x="26" y="17" fontSize="14" fontWeight="700" fontFamily="system-ui">CertiK</text>
      </svg>
    ),
  },
  {
    name: 'PeckShield',
    url: 'https://peckshield.com',
    logo: (
      <svg viewBox="0 0 100 24" fill="currentColor" className="h-6 w-auto">
        <path d="M12 2L4 6v8c0 4.4 3.6 8 8 8s8-3.6 8-8V6l-8-4zm0 3l5 2.5v6c0 2.8-2.2 5-5 5s-5-2.2-5-5v-6l5-2.5z"/>
        <text x="26" y="17" fontSize="13" fontWeight="600" fontFamily="system-ui">派盾</text>
      </svg>
    ),
  },
  {
    name: 'Binance',
    url: 'https://www.binance.com',
    logo: (
      <svg viewBox="0 0 100 24" fill="currentColor" className="h-6 w-auto">
        <path d="M12 2l3 3-3 3-3-3 3-3zm7 7l3 3-3 3-3-3 3-3zM5 9l3 3-3 3-3-3 3-3zm7 0l3 3-3 3-3-3 3-3zm0 7l3 3-3 3-3-3 3-3z"/>
        <text x="28" y="17" fontSize="14" fontWeight="600" fontFamily="system-ui">Binance</text>
      </svg>
    ),
  },
  {
    name: 'OKX',
    url: 'https://www.okx.com',
    logo: (
      <svg viewBox="0 0 60 24" fill="currentColor" className="h-6 w-auto">
        <rect x="2" y="2" width="8" height="8" rx="1"/>
        <rect x="14" y="2" width="8" height="8" rx="1"/>
        <rect x="2" y="14" width="8" height="8" rx="1"/>
        <rect x="14" y="14" width="8" height="8" rx="1"/>
        <text x="28" y="17" fontSize="14" fontWeight="700" fontFamily="system-ui">OKX</text>
      </svg>
    ),
  },
  {
    name: 'Huobi',
    url: 'https://www.huobi.com',
    logo: (
      <svg viewBox="0 0 80 24" fill="currentColor" className="h-6 w-auto">
        <path d="M12 2c-1.1 0-2 .9-2 2v8c0 3.3-2.7 6-6 6h16c-3.3 0-6-2.7-6-6V4c0-1.1-.9-2-2-2z"/>
        <text x="24" y="17" fontSize="14" fontWeight="600" fontFamily="system-ui">Huobi</text>
      </svg>
    ),
  },
  {
    name: 'Tencent',
    url: 'https://www.tencent.com',
    logo: (
      <svg viewBox="0 0 90 24" fill="currentColor" className="h-6 w-auto">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3l7 3.5-7 3.5-7-3.5L12 5z"/>
        <text x="28" y="17" fontSize="13" fontWeight="600" fontFamily="system-ui">腾讯</text>
      </svg>
    ),
  },
]

// 复制一份用于无缝滚动
const duplicatedPartners = [...partners, ...partners]

export default function PartnerLogos() {
  return (
    <div className="relative overflow-hidden">
      {/* 渐变遮罩 */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-slate-800/30 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-slate-800/30 to-transparent z-10 pointer-events-none" />
      
      {/* 滚动容器 */}
      <div className="relative flex overflow-hidden py-4">
        <motion.div
          className="flex gap-8 md:gap-12 pr-8 md:pr-12"
          animate={{
            x: [0, -50 * partners.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <Link
              key={`${partner.name}-${index}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 flex-shrink-0"
            >
              <div className="relative flex items-center justify-center h-12 px-4 rounded-lg bg-slate-700/30 transition-all duration-300 group-hover:bg-slate-700/50">
                {/* 灰度效果 */}
                <div className="text-slate-400 grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:text-slate-200">
                  {partner.logo}
                </div>
              </div>
              <span className="text-xs text-slate-500 grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:text-slate-300 whitespace-nowrap">
                {partner.name}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
