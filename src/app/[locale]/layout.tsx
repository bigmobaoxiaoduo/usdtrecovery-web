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
    authors: [{ name: 'USDTRecovery', url: 'https://www.usdtrecovery.xyz' }],
    creator: 'USDTRecovery',
    publisher: 'USDTRecovery',
    metadataBase: new URL('https://www.usdtrecovery.xyz'),
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
      url: `https://www.usdtrecovery.xyz/${locale}`,
      siteName: 'USDTRecovery',
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: locale === 'en' ? 'USDTRecovery - Professional Crypto Recovery Service' : 'USDTRecovery - 专业虚拟币追回服务',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.zh,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.zh,
      images: ['/og-image.jpg'],
      creator: '@thechainsec',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // TODO: 添加 Google Search Console 验证代码
      // google: 'YOUR_GOOGLE_VERIFICATION_CODE',
      // TODO: 添加 Bing Webmaster 验证代码
      // yandex: 'YOUR_BING_VERIFICATION_CODE',
      // bing: 'YOUR_BING_VERIFICATION_CODE',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          url: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          url: '/favicon-16x16.png',
        },
      ],
    },
    other: {
      'msvalidate.01': 'BING_VERIFICATION_PLACEHOLDER', // Bing验证预留
      'yandex-verification': 'YANDEX_VERIFICATION_PLACEHOLDER', // Yandex验证预留
      'baidu-site-verification': 'BAIDU_VERIFICATION_PLACEHOLDER', // 百度验证预留
    },
  }
}

export default function RootLayout({
  children,
  params: { locale }
}: Props) {
  return (
    <html lang={locale === 'en' ? 'en' : 'zh-CN'} className="dark" dir="ltr">
      <head>
        <GoogleAnalytics />
        
        {/* 语言切换链接 */}
        <link rel="alternate" hrefLang="zh-CN" href="https://www.usdtrecovery.xyz/zh" />
        <link rel="alternate" hrefLang="en" href="https://www.usdtrecovery.xyz/en" />
        <link rel="alternate" hrefLang="x-default" href="https://www.usdtrecovery.xyz/zh" />
        
        {/* DNS预连接优化 - 限制到2个以提升首屏性能 */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 预加载关键资源 */}
        <link rel="preload" as="image" href="/images/hero-bg-new.jpg" fetchPriority="high" />
        <link rel="preload" as="image" href="/logo.png" />
        
        {/* Bing Site Ownership Verification - 需要填入实际验证代码 */}
        <meta name="msvalidate.01" content="BING_VERIFICATION_CODE_HERE" />
        
        {/* 百度站长验证 - 需要填入实际验证代码 */}
        <meta name="baidu-site-verification" content="BAIDU_VERIFICATION_CODE_HERE" />
        
        {/* 360搜索验证 - 需要填入实际验证代码 */}
        <meta name="360-site-verification" content="360_VERIFICATION_CODE_HERE" />
        
        {/* sogou验证 - 需要填入实际验证代码 */}
        <meta name="sogou_site_verification" content="SOGOU_VERIFICATION_CODE_HERE" />
        
        {/* 应用图标配置 */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0f172a" />
        
        {/* Windows Tile */}
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        
        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
      </head>
      <body className={`${inter.className} bg-slate-950 text-white antialiased`}>
        <StructuredData />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  )
}
