'use client'

import Link from 'next/link'

interface Partner {
  name: string
  url: string
  logo: React.ReactNode
}

// 团队背景公司 - 基于prismsec.net展示的正确公司
const partners: Partner[] = [
  {
    name: 'MetaMask',
    url: 'https://metamask.io',
    logo: (
      <svg viewBox="0 0 120 24" fill="currentColor" className="h-6 w-auto">
        <path d="M12 2l-8 4v12l8 4 8-4V6l-8-4zm0 2l6 3-6 3-6-3 6-3z"/>
        <text x="28" y="17" fontSize="13" fontWeight="600" fontFamily="system-ui">MetaMask</text>
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
    name: 'TikTok',
    url: 'https://www.tiktok.com',
    logo: (
      <svg viewBox="0 0 90 24" fill="currentColor" className="h-6 w-auto">
        <path d="M16 2v14c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.7 0 1.3.1 1.9.3V2h4z"/>
        <text x="26" y="17" fontSize="14" fontWeight="600" fontFamily="system-ui">TikTok</text>
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
  {
    name: '360',
    url: 'https://www.360.cn',
    logo: (
      <svg viewBox="0 0 70 24" fill="currentColor" className="h-6 w-auto">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
        <text x="6" y="16" fontSize="10" fontWeight="700" fontFamily="system-ui">360</text>
      </svg>
    ),
  },
  {
    name: 'Deloitte',
    url: 'https://www2.deloitte.com',
    logo: (
      <svg viewBox="0 0 100 24" fill="currentColor" className="h-6 w-auto">
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
        <path d="M12 4v4M12 16v4M4 12h4M16 12h4" stroke="currentColor" strokeWidth="1.5"/>
        <text x="26" y="17" fontSize="13" fontWeight="600" fontFamily="system-ui">Deloitte</text>
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
      
      {/* CSS动画滚动容器 - 替代 framer-motion 避免强制重排 */}
      <div className="relative flex overflow-hidden py-4">
        <div 
          className="flex gap-8 md:gap-12 pr-8 md:pr-12 animate-marquee-partners"
          style={{ willChange: 'transform' }}
        >
          {duplicatedPartners.map((partner, index) => (
            <Link
              key={`${partner.name}-${index}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 flex-shrink-0 px-4 py-2 rounded-lg bg-slate-700/30 transition-all duration-300 hover:bg-slate-700/50"
            >
              <div className="text-slate-300 grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:text-slate-200">
                {partner.logo}
              </div>
              <span className="text-sm text-slate-400 transition-all duration-300 group-hover:text-slate-300 whitespace-nowrap">
                {partner.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
