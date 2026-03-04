'use client'

import Layout from '@/components/Layout'
import Breadcrumb from '@/components/Breadcrumb'
import { useTranslation } from '@/hooks/useTranslation'

export default function PrivacyPage() {
  const { isEn } = useTranslation()
  
  const sections = isEn ? [
    {
      title: '1. Information Collection',
      content: 'We may collect the following information:',
      items: ['Contact information (Telegram, email, etc.)', 'Case-related information (wallet addresses, transaction records, etc.)', 'Communication records']
    },
    {
      title: '2. Information Usage',
      content: 'We use your information solely for:',
      items: ['Assessing case recovery possibilities', 'Providing recovery services', 'Communicating case progress with you', 'Legal proceedings as required']
    },
    {
      title: '3. Information Protection',
      content: 'We employ industry-standard encryption technology to protect your information security. All case information is strictly confidential and will not be disclosed to third parties without your consent.'
    },
    {
      title: '4. Information Sharing',
      content: 'We do not sell or rent your personal information to third parties. We may share necessary information with judicial authorities or exchanges when required for case handling.'
    },
    {
      title: '5. Contact Us',
      content: 'For privacy-related questions, please contact us via Telegram.'
    }
  ] : [
    {
      title: '1. 信息收集',
      content: '我们可能收集以下信息：',
      items: ['联系方式（Telegram、邮箱等）', '案件相关信息（钱包地址、交易记录等）', '沟通记录']
    },
    {
      title: '2. 信息使用',
      content: '我们使用您的信息仅用于：',
      items: ['评估案件追回可能性', '提供追回服务', '与您沟通案件进展', '法律程序所需']
    },
    {
      title: '3. 信息保护',
      content: '我们采用行业标准的加密技术保护您的信息安全。所有案件信息严格保密，未经您的同意不会向第三方透露。'
    },
    {
      title: '4. 信息共享',
      content: '我们不会向第三方出售或出租您的个人信息。仅在案件处理需要时，可能会与司法机构或交易所共享必要信息。'
    },
    {
      title: '5. 联系我们',
      content: '如有隐私相关问题，请通过 Telegram 联系我们。'
    }
  ]

  return (
    <Layout>
      <main className="min-h-screen bg-slate-950 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb />

          <h1 className="text-3xl font-bold mb-8 mt-4">{isEn ? 'Privacy Policy' : '隐私政策'}</h1>
          
          <div className="space-y-6 text-slate-300">
            {sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl font-semibold mb-4 text-white">{section.title}</h2>
                <p className={section.items ? '' : 'text-slate-400'}>{section.content}</p>
                {section.items && (
                  <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                    {section.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}
