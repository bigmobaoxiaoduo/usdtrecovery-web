import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StructuredData from '@/components/StructuredData'
import CookieConsentBanner from '@/components/CookieConsent'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '虚拟币被盗追回服务 | USDT/加密货币专业追回团队',
  description: '专业团队帮您追回被盗的USDT、ETH、BTC等加密货币。链上追踪+司法协助，357+成功案例，$35M+资产挽回。7×24小时服务，支持60+主流公链。',
  keywords: '虚拟币被盗,USDT追回,加密货币被盗,链上追踪,虚拟币被骗,USDT被盗追回,加密货币追回,虚拟币安全',
  authors: [{ name: 'USDTRecovery' }],
  creator: 'USDTRecovery',
  metadataBase: new URL('https://usdtrecovery.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '虚拟币被盗追回服务 | USDT/加密货币专业追回团队',
    description: '专业团队帮您追回被盗的USDT、ETH、BTC等加密货币。链上追踪+司法协助，357+成功案例。',
    url: 'https://usdtrecovery.xyz',
    siteName: 'USDTRecovery',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'USDTRecovery - 虚拟币追回服务',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '虚拟币被盗追回服务 | USDT/加密货币专业追回团队',
    description: '专业团队帮您追回被盗的USDT、ETH、BTC等加密货币。链上追踪+司法协助，357+成功案例。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} bg-slate-950 text-white`}>
        <StructuredData />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  )
}
