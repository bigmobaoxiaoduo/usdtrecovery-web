import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StructuredData from '@/components/StructuredData'
import CookieConsentBanner from '@/components/CookieConsent'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const locales = ['zh', 'en']
export const defaultLocale = 'zh'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || 'zh'
  
  const titles = {
    zh: '虚拟币被盗追回服务 | USDT/加密货币专业追回团队',
    en: 'Crypto Asset Recovery Services | USDT/Cryptocurrency Recovery Experts'
  }
  
  const descriptions = {
    zh: '专业团队帮您追回被盗的USDT、ETH、BTC等加密货币。链上追踪+司法协助，357+成功案例，$35M+资产挽回。7×24小时服务，支持60+主流公链。',
    en: 'Professional team helps recover stolen USDT, ETH, BTC and other cryptocurrencies. On-chain tracking + legal assistance, 357+ successful cases, $35M+ recovered. 24/7 service, supporting 60+ major blockchains.'
  }
  
  const keywords = {
    zh: '虚拟币被盗,USDT追回,加密货币被盗,链上追踪,虚拟币被骗,USDT被盗追回,加密货币追回,虚拟币安全',
    en: 'crypto stolen,USDT recovery,cryptocurrency theft,on-chain tracking,crypto scam,USDT stolen recovery,crypto asset recovery,blockchain security'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.zh,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.zh,
    keywords: keywords[locale as keyof typeof keywords] || keywords.zh,
    authors: [{ name: 'USDTRecovery' }],
    creator: 'USDTRecovery',
    metadataBase: new URL('https://usdtrecovery.xyz'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'zh-CN': '/zh',
        'en': '/en',
      },
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.zh,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.zh,
      url: `https://usdtrecovery.xyz/${locale}`,
      siteName: 'USDTRecovery',
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'USDTRecovery - Crypto Recovery Service',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.zh,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.zh,
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
  }
}

export default function RootLayout({
  children,
  params: { locale }
}: Props) {
  return (
    <html lang={locale === 'en' ? 'en' : 'zh-CN'} className="dark">
      <head>
        <GoogleAnalytics />
        <link rel="alternate" hrefLang="zh-CN" href="https://usdtrecovery.xyz/zh" />
        <link rel="alternate" hrefLang="en" href="https://usdtrecovery.xyz/en" />
        <link rel="alternate" hrefLang="x-default" href="https://usdtrecovery.xyz/zh" />
      </head>
      <body className={`${inter.className} bg-slate-950 text-white`}>
        <StructuredData />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  )
}
